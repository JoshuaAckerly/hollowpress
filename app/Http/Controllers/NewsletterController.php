<?php

namespace App\Http\Controllers;

use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $key = 'newsletter-subscribe:'.$request->ip();

        if (RateLimiter::tooManyAttempts($key, 5)) {
            $seconds = RateLimiter::availableIn($key);

            return response()->json([
                'success' => false,
                'message' => 'Too many requests. Please try again in '.ceil($seconds / 60).' minutes.',
            ], 429);
        }

        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
        ]);

        if (NewsletterSubscriber::where('email', $validated['email'])->exists()) {
            RateLimiter::hit($key, 3600);

            return response()->json([
                'success' => false,
                'message' => 'This email address is already subscribed.',
            ], 422);
        }

        try {
            NewsletterSubscriber::create([
                'email' => $validated['email'],
                'subscribed_at' => now(),
                'unsubscribe_token' => NewsletterSubscriber::generateToken(),
            ]);

            RateLimiter::hit($key, 3600);

            Log::info('Newsletter subscription', ['email' => $validated['email']]);

            return response()->json([
                'success' => true,
                'message' => 'You\'re subscribed! Thank you for signing up.',
            ]);
        } catch (\Exception $e) {
            Log::error('Newsletter subscription failed', ['error' => $e->getMessage()]);

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again.',
            ], 500);
        }
    }

    public function unsubscribe(string $token)
    {
        $subscriber = NewsletterSubscriber::where('unsubscribe_token', $token)->first();

        if (! $subscriber) {
            return redirect()->route('home')->with('error', 'Invalid or expired unsubscribe link.');
        }

        $subscriber->delete();

        Log::info('Newsletter unsubscription', ['email' => $subscriber->email]);

        return redirect()->route('home')->with('success', 'You have been unsubscribed successfully.');
    }
}
