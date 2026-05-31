<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
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
        /** @var array{name: string, email: string, subject: string, message: string} $validated */
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|min:10|max:2000',
        ]);

        $adminEmail = config('services.admin_email');

        if ($adminEmail) {
            Mail::to($adminEmail)->send(new ContactMessage($validated));
        }

        Log::channel('hollowpress')->info('Contact form submission', [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'],
        ]);

        return redirect()->back()->with('success', 'Thank you for your message! We\'ll get back to you soon.');
    }
}
