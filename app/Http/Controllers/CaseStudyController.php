<?php

namespace App\Http\Controllers;

use App\Models\CaseStudy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class CaseStudyController extends Controller
{
    public function index(Request $request)
    {
        try {
            $search = trim((string) $request->query('q', ''));
            $projectType = trim((string) $request->query('project_type', ''));
            $clientName = trim((string) $request->query('client_name', ''));
            $technology = trim((string) $request->query('technology', ''));
            $dateFrom = $request->query('date_from');
            $dateTo = $request->query('date_to');
            $sortBy = trim((string) $request->query('sort', 'relevance'));

            $selectedColumns = [
                'id',
                'title',
                'slug',
                'client_name',
                'project_type',
                'project_date',
                'technologies',
                'is_featured',
                'created_at',
            ];

            $caseStudyQuery = CaseStudy::query()
                ->select($selectedColumns)
                ->selectRaw('LEFT(description, 1200) as description');

            // Apply search query with advanced syntax support
            if ($search !== '') {
                $this->applyAdvancedSearch($caseStudyQuery, $search);

                [$scoreSql, $scoreBindings] = $this->buildSearchScore($search);
                $caseStudyQuery->selectRaw("({$scoreSql}) as search_score", $scoreBindings);
            } else {
                $caseStudyQuery->selectRaw('0 as search_score');
            }

            // Apply filters
            if ($projectType !== '') {
                $caseStudyQuery->where('project_type', $projectType);
            }

            if ($clientName !== '') {
                $caseStudyQuery->where('client_name', 'like', "%{$clientName}%");
            }

            if ($technology !== '') {
                $caseStudyQuery->whereJsonContains('technologies', $technology);
            }

            if ($dateFrom) {
                $caseStudyQuery->where('project_date', '>=', $dateFrom);
            }

            if ($dateTo) {
                $caseStudyQuery->where('project_date', '<=', $dateTo);
            }

            // Apply sorting
            if ($search !== '' && $sortBy === 'relevance') {
                $caseStudyQuery->orderByDesc('search_score')->orderByDesc('created_at');
            } elseif ($sortBy === 'date') {
                $caseStudyQuery->orderByDesc('project_date');
            } elseif ($sortBy === 'title') {
                $caseStudyQuery->orderBy('title');
            } else {
                $caseStudyQuery->latest();
            }

            $caseStudies = $caseStudyQuery
                ->paginate(12)
                ->withQueryString();

            // Get filter options for the UI
            $filterOptions = $this->getFilterOptions();

            return Inertia::render('CaseStudies/Index', [
                'caseStudies' => $caseStudies,
                'filters' => [
                    'q' => $search,
                    'project_type' => $projectType,
                    'client_name' => $clientName,
                    'technology' => $technology,
                    'date_from' => $dateFrom,
                    'date_to' => $dateTo,
                    'sort' => $sortBy,
                ],
                'filterOptions' => $filterOptions,
                'searchQuery' => $search,
            ]);
        } catch (\Exception $e) {
            return redirect()->route('home')->with('error', 'Unable to load case studies. Please try again.');
        }
    }

    /**
     * Apply advanced search with query syntax support
     */
    private function applyAdvancedSearch($query, string $search)
    {
        $normalizedSearch = mb_strtolower($search);
        $likeSearch = "%{$normalizedSearch}%";

        // Check for advanced syntax (quotes for exact phrases, OR/AND operators)
        if (preg_match('/"([^"]+)"/', $search, $matches)) {
            // Exact phrase search
            $exactPhrase = mb_strtolower($matches[1]);
            $query->where(function ($subQuery) use ($exactPhrase) {
                $subQuery->whereRaw('LOWER(title) like ?', ["%{$exactPhrase}%"])
                    ->orWhereRaw('LOWER(description) like ?', ["%{$exactPhrase}%"])
                    ->orWhereRaw('LOWER(challenge) like ?', ["%{$exactPhrase}%"])
                    ->orWhereRaw('LOWER(solution) like ?', ["%{$exactPhrase}%"])
                    ->orWhereRaw('LOWER(results) like ?', ["%{$exactPhrase}%"]);
            });
        } elseif (stripos($search, ' or ') !== false) {
            // OR search
            $terms = preg_split('/\s+or\s+/i', $normalizedSearch, -1, PREG_SPLIT_NO_EMPTY) ?: [];
            $query->where(function ($subQuery) use ($terms) {
                foreach ($terms as $term) {
                    $term = "%{$term}%";
                    $subQuery->orWhereRaw('LOWER(title) like ?', [$term])
                        ->orWhereRaw('LOWER(description) like ?', [$term])
                        ->orWhereRaw('LOWER(client_name) like ?', [$term])
                        ->orWhereRaw('LOWER(project_type) like ?', [$term]);
                }
            });
        } else {
            // Standard search with relevance scoring
            $query->where(function ($subQuery) use ($likeSearch) {
                $subQuery->whereRaw('LOWER(title) like ?', [$likeSearch])
                    ->orWhereRaw('LOWER(description) like ?', [$likeSearch])
                    ->orWhereRaw('LOWER(challenge) like ?', [$likeSearch])
                    ->orWhereRaw('LOWER(solution) like ?', [$likeSearch])
                    ->orWhereRaw('LOWER(results) like ?', [$likeSearch])
                    ->orWhereRaw('LOWER(client_name) like ?', [$likeSearch])
                    ->orWhereRaw('LOWER(project_type) like ?', [$likeSearch]);
            });
        }
    }

    /**
     * @return array<int, string>
     */
    private function extractSearchTerms(string $search): array
    {
        preg_match_all('/"([^"]+)"|(\S+)/', $search, $matches, PREG_SET_ORDER);

        $terms = [];
        foreach ($matches as $match) {
            $term = trim($match[1] !== '' ? $match[1] : $match[2]);

            if ($term === '' || in_array(mb_strtolower($term), ['and', 'or'], true)) {
                continue;
            }

            $terms[] = mb_strtolower($term);
        }

        return array_values(array_unique($terms));
    }

    /**
     * @return array{0: string, 1: array<int, string>}
     */
    private function buildSearchScore(string $search): array
    {
        $terms = $this->extractSearchTerms($search);

        if ($terms === []) {
            return ['0', []];
        }

        $scoreParts = [];
        $bindings = [];

        foreach ($terms as $term) {
            $exact = $term;
            $prefix = "{$term}%";
            $contains = "%{$term}%";

            $scoreParts[] = 'CASE WHEN LOWER(title) = ? THEN 420 ELSE 0 END';
            $bindings[] = $exact;
            $scoreParts[] = 'CASE WHEN LOWER(title) LIKE ? THEN 260 ELSE 0 END';
            $bindings[] = $prefix;
            $scoreParts[] = 'CASE WHEN LOWER(title) LIKE ? THEN 180 ELSE 0 END';
            $bindings[] = $contains;

            $scoreParts[] = 'CASE WHEN LOWER(client_name) = ? THEN 140 ELSE 0 END';
            $bindings[] = $exact;
            $scoreParts[] = 'CASE WHEN LOWER(client_name) LIKE ? THEN 100 ELSE 0 END';
            $bindings[] = $contains;

            $scoreParts[] = 'CASE WHEN LOWER(project_type) = ? THEN 90 ELSE 0 END';
            $bindings[] = $exact;
            $scoreParts[] = 'CASE WHEN LOWER(project_type) LIKE ? THEN 80 ELSE 0 END';
            $bindings[] = $contains;

            $scoreParts[] = 'CASE WHEN LOWER(description) LIKE ? THEN 60 ELSE 0 END';
            $bindings[] = $contains;
            $scoreParts[] = 'CASE WHEN LOWER(challenge) LIKE ? THEN 40 ELSE 0 END';
            $bindings[] = $contains;
            $scoreParts[] = 'CASE WHEN LOWER(solution) LIKE ? THEN 40 ELSE 0 END';
            $bindings[] = $contains;
            $scoreParts[] = 'CASE WHEN LOWER(results) LIKE ? THEN 40 ELSE 0 END';
            $bindings[] = $contains;
        }

        return [implode(' + ', $scoreParts), $bindings];
    }

    /**
     * Get filter options for the UI
     */
    private function getFilterOptions()
    {
        return Cache::remember('case_studies.filter_options', now()->addMinutes(10), function () {
            return [
                'project_types' => CaseStudy::distinct('project_type')
                    ->whereNotNull('project_type')
                    ->pluck('project_type')
                    ->sort()
                    ->values()
                    ->toArray(),
                'clients' => CaseStudy::distinct('client_name')
                    ->whereNotNull('client_name')
                    ->pluck('client_name')
                    ->sort()
                    ->values()
                    ->toArray(),
                'technologies' => CaseStudy::select('technologies')
                    ->whereNotNull('technologies')
                    ->get()
                    ->pluck('technologies')
                    ->flatten()
                    ->unique()
                    ->sort()
                    ->values()
                    ->toArray(),
            ];
        });
    }

    public function show($slug)
    {
        try {
            $caseStudy = CaseStudy::where('slug', $slug)->firstOrFail();
            return Inertia::render('CaseStudies/Show', [
                'caseStudy' => $caseStudy
            ]);
        } catch (\Exception $e) {
            return redirect()->route('case-studies.index')->with('error', 'Case study not found.');
        }
    }
}
