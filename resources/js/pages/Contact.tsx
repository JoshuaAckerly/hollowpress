import MainLayout from '@/layouts/main';
import { trackFormSubmission } from '@/hooks/use-google-analytics';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface PageProps {
    [key: string]: unknown;
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function Contact() {
    const { flash } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        // Track contact form submission
        trackFormSubmission('contact_form', {
            subject: data.subject || 'general',
        });
        
        post('/contact', {
            onSuccess: () => reset(),
        });
    };

    return (
        <MainLayout>
            <Head title="Contact Us">
                <meta
                    name="description"
                    content="Get in touch with Hollow Press. Have questions, ideas, or want to collaborate? We'd love to hear from you. Reach out to our artist community team."
                />
                <meta name="keywords" content="contact hollow press, artist collaboration, get in touch, support" />

                <meta property="og:title" content="Contact Hollow Press" />
                <meta property="og:description" content="Get in touch with Hollow Press. We'd love to hear from you." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://hollowpress.graveyardjokes.com/contact" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Contact Hollow Press" />
                <meta name="twitter:description" content="Get in touch - we'd love to hear from you" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black text-white">
                    <div className="absolute inset-0 opacity-10">
                        <div className="animate-gradient absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600"></div>
                    </div>
                    <div className="relative mx-auto max-w-5xl px-6 py-20">
                        <div className="text-center">
                            <h1 className="mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-6xl font-bold text-transparent">
                                Get in Touch
                            </h1>
                            <p className="mx-auto max-w-3xl text-2xl leading-relaxed text-gray-300">
                                Have questions, ideas, or want to collaborate? We'd love to hear from you.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-5xl px-6 py-16">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm">
                                <h2 className="mb-6 text-3xl font-bold text-white">Let's Connect</h2>
                                <p className="mb-8 leading-relaxed text-gray-300">
                                    Whether you're an artist looking to join our community, have a question about our platform, or interested in
                                    partnership opportunities, we're here to help.
                                </p>

                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gray-600 to-slate-600">
                                            <span className="text-2xl">📧</span>
                                        </div>
                                        <div>
                                            <h3 className="mb-1 text-lg font-semibold text-white">Email</h3>
                                            <p className="text-gray-400">info@hollowpress.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gray-600 to-slate-600">
                                            <span className="text-2xl">⏱️</span>
                                        </div>
                                        <div>
                                            <h3 className="mb-1 text-lg font-semibold text-white">Response Time</h3>
                                            <p className="text-gray-400">We typically respond within 24-48 hours</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gray-600 to-slate-600">
                                            <span className="text-2xl">🌍</span>
                                        </div>
                                        <div>
                                            <h3 className="mb-1 text-lg font-semibold text-white">Location</h3>
                                            <p className="text-gray-400">Operating worldwide, serving artists globally</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 p-8">
                                <h3 className="mb-4 text-2xl font-bold text-white">Why Reach Out?</h3>
                                <ul className="space-y-3 text-gray-300">
                                    <li className="flex items-start">
                                        <span className="mr-2 text-gray-400">✦</span>
                                        Join our community of artists
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-gray-400">✦</span>
                                        Inquire about sponsorship opportunities
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-gray-400">✦</span>
                                        Report technical issues
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-gray-400">✦</span>
                                        Collaborate on creative projects
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2 text-gray-400">✦</span>
                                        Share feedback or suggestions
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm">
                            <h2 className="mb-6 text-3xl font-bold text-white">Send us a Message</h2>

                            {/* Success Message */}
                            {flash?.success && (
                                <div className="mb-6 rounded-lg border border-green-700 bg-green-900/50 p-4 text-green-300">{flash.success}</div>
                            )}

                            {/* Error Message */}
                            {flash?.error && (
                                <div className="mb-6 rounded-lg border border-red-700 bg-red-900/50 p-4 text-red-300">{flash.error}</div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                                        Your Name *
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full rounded-lg border border-gray-600 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-gray-500 focus:outline-none"
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                                        Email Address *
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full rounded-lg border border-gray-600 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-gray-500 focus:outline-none"
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
                                </div>

                                {/* Subject Field */}
                                <div>
                                    <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-300">
                                        Subject *
                                    </label>
                                    <input
                                        id="subject"
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        className="w-full rounded-lg border border-gray-600 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-gray-500 focus:outline-none"
                                        placeholder="How can we help you?"
                                    />
                                    {errors.subject && <p className="mt-2 text-sm text-red-400">{errors.subject}</p>}
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className="w-full resize-none rounded-lg border border-gray-600 bg-gray-900/50 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-transparent focus:ring-2 focus:ring-gray-500 focus:outline-none"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                    {errors.message && <p className="mt-2 text-sm text-red-400">{errors.message}</p>}
                                    <p className="mt-2 text-xs text-gray-500">Minimum 10 characters</p>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full transform rounded-lg bg-gradient-to-r from-gray-700 to-slate-700 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-gray-600 hover:to-slate-600 hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center">
                                            <svg
                                                className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            Send Message
                                            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <section className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 py-16">
                    <div className="mx-auto max-w-5xl px-6">
                        <h2 className="mb-12 text-center text-4xl font-bold text-white">Frequently Asked Questions</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                                <h3 className="mb-2 text-lg font-semibold text-white">How do I join Hollow Press?</h3>
                                <p className="text-gray-300">
                                    Simply create an account and start sharing your creative work. It's free to join and easy to get started!
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                                <h3 className="mb-2 text-lg font-semibold text-white">What kind of content can I share?</h3>
                                <p className="text-gray-300">
                                    We welcome all forms of artistic expression—music, visual art, writing, and more. As long as it's creative and
                                    authentic!
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                                <h3 className="mb-2 text-lg font-semibold text-white">How does sponsorship work?</h3>
                                <p className="text-gray-300">
                                    Contact us to discuss sponsorship opportunities. We feature select artists and provide additional exposure for
                                    their work.
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                                <h3 className="mb-2 text-lg font-semibold text-white">Is there a cost to use the platform?</h3>
                                <p className="text-gray-300">
                                    Hollow Press is free to use for all artists. Premium features and sponsorship options may be available in the
                                    future.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
