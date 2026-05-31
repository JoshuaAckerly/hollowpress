<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMessage extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @param  array{name: string, email: string, subject: string, message: string}  $formData
     */
    public function __construct(public readonly array $formData) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            replyTo: [$this->formData['email']],
            subject: 'Contact Form: '.$this->formData['subject'],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.contact-message',
        );
    }
}
