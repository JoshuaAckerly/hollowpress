<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Contact');
    }

    public function store(Request $request): RedirectResponse
    {
        /** @var array<string, mixed> $validated */
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|min:10|max:2000',
        ]);

        // TODO: Implement email sending or database storage
        // For now, just return success
        // You can use Laravel's Mail facade here later:
        // Mail::to('admin@hollowpress.com')->send(new ContactMessage($validated));

        return redirect()->back()->with('success', 'Thank you for your message! We\'ll get back to you soon.');
    }
}
