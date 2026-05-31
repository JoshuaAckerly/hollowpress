<?php

namespace Tests\Feature;

use App\Mail\NewsletterWelcome;
use App\Models\NewsletterSubscriber;
use Illuminate\Foundation\Testing\TestCase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class NewsletterEmailTest extends TestCase
{
    protected function tearDown(): void
    {
        DB::table('newsletter_subscribers')->delete();

        parent::tearDown();
    }

    public function test_subscribing_sends_welcome_email(): void
    {
        Mail::fake();

        $this->postJson('/newsletter/subscribe', [
            'email' => 'newuser@example.com',
        ]);

        Mail::assertSent(NewsletterWelcome::class, function (NewsletterWelcome $mail) {
            return $mail->hasTo('newuser@example.com');
        });
    }

    public function test_welcome_email_contains_unsubscribe_token(): void
    {
        Mail::fake();

        $this->postJson('/newsletter/subscribe', [
            'email' => 'tokentest@example.com',
        ]);

        $subscriber = NewsletterSubscriber::where('email', 'tokentest@example.com')->first();
        $this->assertNotNull($subscriber);
        $this->assertNotEmpty($subscriber->unsubscribe_token);

        Mail::assertSent(NewsletterWelcome::class, function (NewsletterWelcome $mail) use ($subscriber) {
            return $mail->subscriber->is($subscriber);
        });
    }

    public function test_duplicate_subscription_does_not_send_email(): void
    {
        Mail::fake();

        NewsletterSubscriber::create([
            'email' => 'duplicate@example.com',
            'subscribed_at' => now(),
            'unsubscribe_token' => NewsletterSubscriber::generateToken(),
        ]);

        $this->postJson('/newsletter/subscribe', [
            'email' => 'duplicate@example.com',
        ]);

        Mail::assertNothingSent();
    }
}
