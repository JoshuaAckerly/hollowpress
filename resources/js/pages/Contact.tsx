import { Head, useForm, usePage } from '@inertiajs/react';
import MainLayout from '@/layouts/main';
import { FormEventHandler } from 'react';

interface PageProps {
  flash?: {
    success?: string;
    error?: string;
  };
  [key: string]: any;
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
    post('/contact', {
      onSuccess: () => reset(),
    });
  };

  return (
    <MainLayout>
      <Head title="Contact Us" />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 animate-gradient"></div>
          </div>
          <div className="relative max-w-5xl mx-auto px-6 py-20">
            <div className="text-center">
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Get in Touch
              </h1>
              <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Have questions, ideas, or want to collaborate? We'd love to hear from you.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-white mb-6">Let's Connect</h2>
                <p className="text-gray-300 leading-relaxed mb-8">
                  Whether you're an artist looking to join our community, have a question about our platform, 
                  or interested in partnership opportunities, we're here to help.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📧</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                      <p className="text-gray-400">info@hollowpress.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">⏱️</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Response Time</h3>
                      <p className="text-gray-400">We typically respond within 24-48 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">🌍</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Location</h3>
                      <p className="text-gray-400">Operating worldwide, serving artists globally</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4">Why Reach Out?</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">✦</span>
                    Join our community of artists
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">✦</span>
                    Inquire about sponsorship opportunities
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">✦</span>
                    Report technical issues
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">✦</span>
                    Collaborate on creative projects
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">✦</span>
                    Share feedback or suggestions
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>

              {/* Success Message */}
              {flash?.success && (
                <div className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-lg text-green-300">
                  {flash.success}
                </div>
              )}

              {/* Error Message */}
              {flash?.error && (
                <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300">
                  {flash.error}
                </div>
              )}

              <form onSubmit={submit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={data.subject}
                    onChange={(e) => setData('subject', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                    placeholder="How can we help you?"
                  />
                  {errors.subject && (
                    <p className="mt-2 text-sm text-red-400">{errors.subject}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-400">{errors.message}</p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">Minimum 10 characters</p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-4 bg-gradient-to-r from-gray-700 to-slate-700 text-white font-bold rounded-lg hover:from-gray-600 hover:to-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {processing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Send Message
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <section className="py-16 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">How do I join Hollow Press?</h3>
                <p className="text-gray-300">
                  Simply create an account and start sharing your creative work. It's free to join and easy to get started!
                </p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">What kind of content can I share?</h3>
                <p className="text-gray-300">
                  We welcome all forms of artistic expression—music, visual art, writing, and more. As long as it's creative and authentic!
                </p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">How does sponsorship work?</h3>
                <p className="text-gray-300">
                  Contact us to discuss sponsorship opportunities. We feature select artists and provide additional exposure for their work.
                </p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Is there a cost to use the platform?</h3>
                <p className="text-gray-300">
                  Hollow Press is free to use for all artists. Premium features and sponsorship options may be available in the future.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
