<?php

namespace App\Http\Controllers;

use App\Models\CaseStudy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CaseStudyController extends Controller
{
    public function index(Request $request)
    {
        try {
            $search = trim((string) $request->query('q', ''));
            $projectType = $request->query('project_type');
            $clientName = $request->query('client_name');
            $technology = $request->query('technology');
            $dateFrom = $request->query('date_from');
            $dateTo = $request->query('date_to');
            $sortBy = $request->query('sort', 'relevance');

            $selectedColumns = [
                'id',
                'title',
                'slug',
                'description',
                'client_name',
                'project_type',
                'project_date',
                'technologies',
                'featured_image',
                'project_url',
                'is_featured',
                'created_at',
            ];

            $caseStudyQuery = CaseStudy::query()->select($selectedColumns);

            // Apply search query with advanced syntax support
            if ($search !== '') {
                $this->applyAdvancedSearch($caseStudyQuery, $search);
            }

            // Apply filters
            if ($projectType) {
                $caseStudyQuery->where('project_type', $projectType);
            }

            if ($clientName) {
                $caseStudyQuery->where('client_name', 'like', "%{$clientName}%");
            }

            if ($technology) {
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
        $prefixSearch = "{$normalizedSearch}%";

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
            $terms = array_map('trim', explode(' or ', $normalizedSearch));
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
            })->selectRaw(
                "(\n                        CASE WHEN LOWER(title) = ? THEN 400 ELSE 0 END +\n                        CASE WHEN LOWER(title) LIKE ? THEN 250 ELSE 0 END +\n                        CASE WHEN LOWER(title) LIKE ? THEN 180 ELSE 0 END +\n                        CASE WHEN LOWER(client_name) = ? THEN 140 ELSE 0 END +\n                        CASE WHEN LOWER(client_name) LIKE ? THEN 90 ELSE 0 END +\n                        CASE WHEN LOWER(project_type) LIKE ? THEN 80 ELSE 0 END +\n                        CASE WHEN LOWER(description) LIKE ? THEN 60 ELSE 0 END +\n                        CASE WHEN LOWER(challenge) LIKE ? THEN 40 ELSE 0 END +\n                        CASE WHEN LOWER(solution) LIKE ? THEN 40 ELSE 0 END +\n                        CASE WHEN LOWER(results) LIKE ? THEN 40 ELSE 0 END\n                    ) as search_score",
                [
                    $normalizedSearch,
                    $prefixSearch,
                    $likeSearch,
                    $normalizedSearch,
                    $likeSearch,
                    $likeSearch,
                    $likeSearch,
                    $likeSearch,
                    $likeSearch,
                    $likeSearch,
                ]
            );
        }
    }

    /**
     * Get filter options for the UI
     */
    private function getFilterOptions()
    {
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
    }
