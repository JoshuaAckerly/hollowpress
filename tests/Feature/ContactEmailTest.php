<?php

namespace Tests\Feature;

use App\Mail\ContactMessage;
use Illuminate\Foundation\Testing\TestCase;
use Illuminate\Support\Facades\Mail;

class ContactEmailTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        config(['services.admin_email' => 'admin@example.com']);
    }

    public function test_contact_form_sends_email_to_admin(): void
    {
        Mail::fake();

        $this->post('/contact', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'subject' => 'Test Subject',
            'message' => 'This is a test message with enough characters.',
        ]);

        Mail::assertSent(ContactMessage::class, function (ContactMessage $mail) {
            return $mail->hasTo('admin@example.com')
                && $mail->formData['name'] === 'John Doe'
                && $mail->formData['email'] === 'john@example.com'
                && $mail->formData['subject'] === 'Test Subject';
        });
    }

    public function test_contact_form_does_not_send_email_when_admin_email_not_configured(): void
    {
        Mail::fake();
        config(['services.admin_email' => null]);

        $this->post('/contact', [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'subject' => 'Another Subject',
            'message' => 'This is another test message with enough characters.',
        ]);

        Mail::assertNothingSent();
    }

    public function test_contact_form_returns_success_message(): void
    {
        Mail::fake();

        $response = $this->post('/contact', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'subject' => 'Hello',
            'message' => 'This is a test message with enough characters.',
        ]);

        $response->assertSessionHas('success');
    }

    public function test_contact_form_validates_required_fields(): void
    {
        Mail::fake();

        $response = $this->post('/contact', []);

        $response->assertSessionHasErrors(['name', 'email', 'subject', 'message']);
        Mail::assertNothingSent();
    }
}
