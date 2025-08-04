<?php

namespace App\Http\Controllers;

use App\Models\CaseStudy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CaseStudyController extends Controller
{
    public function index()
    {
        try {
            $caseStudies = CaseStudy::latest()->get();
            return Inertia::render('CaseStudies/Index', [
                'caseStudies' => $caseStudies
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
