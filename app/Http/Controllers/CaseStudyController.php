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

            if ($search !== '') {
                $normalizedSearch = mb_strtolower($search);
                $likeSearch = "%{$normalizedSearch}%";

                $caseStudyQuery->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('client_name', 'like', "%{$search}%")
                        ->orWhere('project_type', 'like', "%{$search}%");
                })->selectRaw(
                    "(\n                        CASE WHEN LOWER(title) = ? THEN 400 ELSE 0 END +\n                        CASE WHEN LOWER(title) LIKE ? THEN 250 ELSE 0 END +\n                        CASE WHEN LOWER(title) LIKE ? THEN 180 ELSE 0 END +\n                        CASE WHEN LOWER(client_name) = ? THEN 140 ELSE 0 END +\n                        CASE WHEN LOWER(client_name) LIKE ? THEN 90 ELSE 0 END +\n                        CASE WHEN LOWER(project_type) LIKE ? THEN 80 ELSE 0 END +\n                        CASE WHEN LOWER(description) LIKE ? THEN 60 ELSE 0 END\n                    ) as search_score",
                    [
                        $normalizedSearch,
                        "{$normalizedSearch}%",
                        $likeSearch,
                        $normalizedSearch,
                        $likeSearch,
                        $likeSearch,
                        $likeSearch,
                    ]
                );

                $caseStudyQuery->orderByDesc('search_score')->orderByDesc('created_at');
            } else {
                $caseStudyQuery->latest();
            }

            $caseStudies = $caseStudyQuery
                ->paginate(8)
                ->withQueryString();

            return Inertia::render('CaseStudies/Index', [
                'caseStudies' => $caseStudies,
                'filters' => [
                    'q' => $search,
                ],
            ]);
        } catch (\Exception $e) {
            return redirect()->route('home')->with('error', 'Unable to load case studies. Please try again.');
        }
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
