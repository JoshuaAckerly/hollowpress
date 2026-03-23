import MainLayout from '@/layouts/main';
import { Head } from '@inertiajs/react';
import { getProjectUrl } from '../env';

export default function About() {
    return (
        <MainLayout>
            <Head title="About Hollow Press">
                <meta
                    name="description"
                    content="Learn about Hollow Press - a platform where unconventional art thrives. We're a sanctuary for artists who find beauty in the shadows and celebrate authentic creative expression."
                />
                <meta name="keywords" content="about hollow press, artist platform, creative community, unconventional art, artist sanctuary" />
                <link rel="canonical" href={getProjectUrl('hollowpress') + '/about'} />
                <meta property="og:title" content="About Hollow Press" />
                <meta
                    property="og:description"
                    content="A sanctuary for artists who find beauty in the unconventional. Learn about our mission to celebrate authentic creative expression."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={getProjectUrl('hollowpress') + '/about'} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="About Hollow Press" />
                <meta name="twitter:description" content="A sanctuary for artists who find beauty in the unconventional" />
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
                                About Hollow Press
                            </h1>
                            <p className="mx-auto max-w-3xl text-2xl leading-relaxed text-gray-300">
                                A sanctuary for artists who find beauty in the unconventional
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <section className="bg-gradient-to-br from-gray-900 to-black py-16">
                    <div className="mx-auto max-w-5xl px-6">
                        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-10 shadow-2xl">
                            <div className="mb-8 flex items-center justify-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-slate-600">
                                    <span className="text-4xl">🌙</span>
                                </div>
                            </div>
                            <h2 className="mb-6 text-center text-4xl font-bold text-white">Faith in Shadows</h2>
                            <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-gray-300">
                                Hollow Press is more than just a platform—it's a movement. We believe that every artist has a unique voice that
                                deserves to be heard, celebrated, and shared with the world. In the shadows, we find light. In darkness, we discover
                                beauty. This is a space where unconventional art thrives and authenticity reigns supreme.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="bg-gradient-to-br from-black to-gray-900 py-16">
                    <div className="mx-auto max-w-5xl px-6">
                        <h2 className="mb-12 text-center text-4xl font-bold text-white">Our Story</h2>
                        <div className="space-y-8">
                            <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm">
                                <h3 className="mb-4 flex items-center text-2xl font-semibold text-white">
                                    <span className="mr-3 text-3xl">🎨</span>
                                    Born from Passion
                                </h3>
                                <p className="leading-relaxed text-gray-300">
                                    Hollow Press was created to fill a void in the creative community—a space where artists could express themselves
                                    freely without conforming to mainstream expectations. We embrace the dark, the mysterious, and the unconventional
                                    aspects of art that often go unnoticed.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm">
                                <h3 className="mb-4 flex items-center text-2xl font-semibold text-white">
                                    <span className="mr-3 text-3xl">🌍</span>A Global Community
                                </h3>
                                <p className="leading-relaxed text-gray-300">
                                    What started as a small blog has grown into a thriving community of artists, musicians, writers, and creators from
                                    around the world. Each member brings their unique perspective, enriching our collective creative tapestry with
                                    diverse voices and visions.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm">
                                <h3 className="mb-4 flex items-center text-2xl font-semibold text-white">
                                    <span className="mr-3 text-3xl">✨</span>
                                    Future Vision
                                </h3>
                                <p className="leading-relaxed text-gray-300">
                                    We're constantly evolving, adding new features and opportunities for artists to showcase their work, connect with
                                    others, and grow their creative presence. Our vision is to become the premier destination for alternative art and
                                    underground culture.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values Section */}
                <section className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 py-16">
                    <div className="mx-auto max-w-6xl px-6">
                        <h2 className="mb-12 text-center text-4xl font-bold text-white">Our Core Values</h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-xl border border-gray-700 bg-gray-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:transform hover:border-gray-600">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-slate-600">
                                    <span className="text-2xl">🎭</span>
                                </div>
                                <h3 className="mb-3 text-center text-xl font-semibold text-white">Authenticity</h3>
                                <p className="text-center text-gray-300">
                                    Be true to yourself and your art. We celebrate originality and genuine creative expression.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-700 bg-gray-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:transform hover:border-gray-600">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-slate-600">
                                    <span className="text-2xl">🤝</span>
                                </div>
                                <h3 className="mb-3 text-center text-xl font-semibold text-white">Community</h3>
                                <p className="text-center text-gray-300">
                                    Support and uplift fellow artists. Together, we're stronger and more creative.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-700 bg-gray-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:transform hover:border-gray-600">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-slate-600">
                                    <span className="text-2xl">🚀</span>
                                </div>
                                <h3 className="mb-3 text-center text-xl font-semibold text-white">Innovation</h3>
                                <p className="text-center text-gray-300">
                                    Push boundaries and explore new creative territories. Embrace experimentation.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-700 bg-gray-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:transform hover:border-gray-600">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-slate-600">
                                    <span className="text-2xl">🌟</span>
                                </div>
                                <h3 className="mb-3 text-center text-xl font-semibold text-white">Excellence</h3>
                                <p className="text-center text-gray-300">
                                    Strive for quality in everything you create. Your craft deserves your best effort.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-700 bg-gray-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:transform hover:border-gray-600">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-slate-600">
                                    <span className="text-2xl">💡</span>
                                </div>
                                <h3 className="mb-3 text-center text-xl font-semibold text-white">Inclusivity</h3>
                                <p className="text-center text-gray-300">
                                    Welcome all perspectives and backgrounds. Diversity makes our community richer.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-700 bg-gray-800 p-6 transition-all duration-300 hover:-translate-y-1 hover:transform hover:border-gray-600">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-slate-600">
                                    <span className="text-2xl">🔥</span>
                                </div>
                                <h3 className="mb-3 text-center text-xl font-semibold text-white">Passion</h3>
                                <p className="text-center text-gray-300">
                                    Create with heart and soul. Passion is the fuel that drives extraordinary work.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What We Offer Section */}
                <section className="bg-gradient-to-br from-black to-gray-900 py-16">
                    <div className="mx-auto max-w-5xl px-6">
                        <h2 className="mb-12 text-center text-4xl font-bold text-white">What We Offer</h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div className="rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 p-8 shadow-lg">
                                <h3 className="mb-4 text-2xl font-semibold text-white">✍️ Blogging Platform</h3>
                                <p className="leading-relaxed text-gray-300">
                                    Share your creative journey, insights, and stories with a dedicated audience that appreciates authentic artistic
                                    expression.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 p-8 shadow-lg">
                                <h3 className="mb-4 text-2xl font-semibold text-white">🎵 Artist Profiles</h3>
                                <p className="leading-relaxed text-gray-300">
                                    Showcase your albums, events, and creative work in a professional portfolio that highlights your unique artistic
                                    voice.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 p-8 shadow-lg">
                                <h3 className="mb-4 text-2xl font-semibold text-white">🌐 Global Reach</h3>
                                <p className="leading-relaxed text-gray-300">
                                    Connect with art enthusiasts and fellow creators from around the world, expanding your audience beyond
                                    geographical boundaries.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 p-8 shadow-lg">
                                <h3 className="mb-4 text-2xl font-semibold text-white">⭐ Sponsorship Opportunities</h3>
                                <p className="leading-relaxed text-gray-300">
                                    Get featured as a sponsored artist and gain increased visibility within our growing community of creative minds.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Join Us CTA */}
                <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-20">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <h2 className="mb-6 text-4xl font-bold text-white">Join Our Creative Community</h2>
                        <p className="mb-10 text-xl leading-relaxed text-gray-300">
                            Whether you're an established artist or just starting your creative journey, Hollow Press welcomes you. Share your voice,
                            find your tribe, and let your art shine in the shadows.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <a
                                href="/posts"
                                className="inline-flex transform items-center justify-center rounded-xl bg-gradient-to-r from-gray-700 to-slate-700 px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-gray-600 hover:to-slate-600 hover:shadow-xl"
                            >
                                Explore Stories
                                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </a>
                            <a
                                href="/artists"
                                className="inline-flex transform items-center justify-center rounded-xl border-2 border-gray-600 bg-gray-800 px-8 py-4 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-500 hover:bg-gray-700"
                            >
                                Discover Artists
                                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
