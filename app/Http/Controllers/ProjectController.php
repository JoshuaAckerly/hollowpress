<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request): Response
    {
        $search = trim((string) $request->query('q', ''));
        $status = trim((string) $request->query('status', ''));
        $tag = trim((string) $request->query('tag', ''));
        $year = $request->query('year');

        $query = Project::query()
            ->select(['id', 'title', 'slug', 'summary', 'status', 'year', 'tags', 'cover_image', 'is_featured', 'created_at']);

        // Search across title, summary, and description
        if ($search !== '') {
            $like = '%'.mb_strtolower($search).'%';
            $query->where(function ($q) use ($like) {
                $q->whereRaw('LOWER(title) like ?', [$like])
                    ->orWhereRaw('LOWER(summary) like ?', [$like])
                    ->orWhereRaw('LOWER(description) like ?', [$like]);
            });
        }

        // Filter by status
        if (in_array($status, ['active', 'completed', 'archived'], true)) {
            $query->where('status', $status);
        }

        // Filter by tag (JSON contains)
        if ($tag !== '') {
            $query->whereJsonContains('tags', $tag);
        }

        // Filter by year
        if ($year !== null && is_numeric($year)) {
            $query->where('year', (int) $year);
        }

        // Featured first, then newest
        $query->orderByDesc('is_featured')->orderByDesc('created_at');

        $projects = $query->paginate(12)->withQueryString();

        $filterOptions = Cache::remember('projects.filter_options', now()->addMinutes(10), function () {
            return [
                'tags' => Project::select('tags')
                    ->whereNotNull('tags')
                    ->pluck('tags')
                    ->flatten()
                    ->unique()
                    ->sort()
                    ->values()
                    ->toArray(),
                'years' => Project::distinct()
                    ->whereNotNull('year')
                    ->orderByDesc('year')
                    ->pluck('year')
                    ->toArray(),
            ];
        });

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'filters' => [
                'q' => $search,
                'status' => $status,
                'tag' => $tag,
                'year' => $year,
            ],
            'filterOptions' => $filterOptions,
        ]);
    }

    public function show(string $slug): Response
    {
        $project = Project::where('slug', $slug)->firstOrFail();

        return Inertia::render('Projects/Show', [
            'project' => $project,
        ]);
    }
}
