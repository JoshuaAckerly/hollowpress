import React, { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface NewsletterFormProps {
    className?: string;
}

export default function NewsletterForm({ className }: NewsletterFormProps) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<Status>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            const csrfToken = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '';

            const response = await fetch('/newsletter/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    Accept: 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data: { success: boolean; message: string } = await response.json();

            if (data.success) {
                setStatus('success');
                setMessage(data.message);
                setEmail('');
            } else {
                setStatus('error');
                setMessage(data.message);
            }
        } catch {
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <section className={`rounded-2xl border border-gray-700 bg-gray-800 p-8 shadow-xl ${className ?? ''}`}>
            <h2 className="mb-2 text-2xl font-bold text-white">Stay in the loop</h2>
            <p className="mb-6 text-gray-400">Get new posts and updates delivered to your inbox. No spam.</p>

            {status === 'success' ? (
                <div
                    role="status"
                    className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300"
                >
                    {message}
                </div>
            ) : (
                <form onSubmit={handleSubmit} noValidate>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <label htmlFor="newsletter-email" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="newsletter-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            disabled={status === 'loading'}
                            className="flex-1 rounded-lg border border-gray-600 bg-gray-900 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-60"
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading' || email.trim() === ''}
                            className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                        </button>
                    </div>

                    {status === 'error' && (
                        <p role="alert" className="mt-2 text-sm text-red-400">
                            {message}
                        </p>
                    )}
                </form>
            )}
        </section>
    );
}
