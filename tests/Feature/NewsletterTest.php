<?php

namespace Tests\Feature;

use App\Models\NewsletterSubscriber;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NewsletterTest extends TestCase
{
    use RefreshDatabase;

    public function test_subscribe_creates_subscriber(): void
    {
        $response = $this->postJson('/newsletter/subscribe', [
            'email' => 'test@example.com',
        ]);

        $response->assertOk()
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('newsletter_subscribers', ['email' => 'test@example.com']);
    }

    public function test_subscribe_requires_valid_email(): void
    {
        $response = $this->postJson('/newsletter/subscribe', [
            'email' => 'not-an-email',
        ]);

        $response->assertStatus(422);
    }

    public function test_subscribe_requires_email_field(): void
    {
        $response = $this->postJson('/newsletter/subscribe', []);

        $response->assertStatus(422);
    }

    public function test_duplicate_subscribe_returns_error(): void
    {
        NewsletterSubscriber::create([
            'email' => 'already@example.com',
            'subscribed_at' => now(),
            'unsubscribe_token' => NewsletterSubscriber::generateToken(),
        ]);

        $response = $this->postJson('/newsletter/subscribe', [
            'email' => 'already@example.com',
        ]);

        $response->assertStatus(422)
            ->assertJson(['success' => false]);
    }

    public function test_unsubscribe_removes_subscriber(): void
    {
        $token = NewsletterSubscriber::generateToken();

        NewsletterSubscriber::create([
            'email' => 'remove@example.com',
            'subscribed_at' => now(),
            'unsubscribe_token' => $token,
        ]);

        $response = $this->get("/newsletter/unsubscribe/{$token}");

        $response->assertRedirect('/');
        $this->assertDatabaseMissing('newsletter_subscribers', ['email' => 'remove@example.com']);
    }

    public function test_unsubscribe_with_invalid_token_redirects_with_error(): void
    {
        $response = $this->get('/newsletter/unsubscribe/invalid-token-that-does-not-exist');

        $response->assertRedirect('/');
        $response->assertSessionHas('error');
    }

    public function test_subscriber_has_unsubscribe_token_set(): void
    {
        $this->postJson('/newsletter/subscribe', ['email' => 'token@example.com']);

        $subscriber = NewsletterSubscriber::where('email', 'token@example.com')->first();
        $this->assertNotNull($subscriber->unsubscribe_token);
        $this->assertEquals(64, strlen($subscriber->unsubscribe_token));
    }
}
