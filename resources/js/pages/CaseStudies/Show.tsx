import MainLayout from '@/layouts/main';
import { Head, Link } from '@inertiajs/react';

interface CaseStudy {
    id: number;
    title: string;
    slug: string;
    description: string;
    challenge: string | null;
    solution: string | null;
    results: string | null;
    client_name: string | null;
    project_type: string | null;
    project_date: string | null;
    technologies: string[] | null;
    featured_image: string | null;
    gallery_images: string[] | null;
    project_url: string | null;
    is_featured: boolean;
    created_at: string;
}

interface Props {
    caseStudy: CaseStudy;
}

export default function Show({ caseStudy }: Props) {
    const description = caseStudy.description || `${caseStudy.title} - A case study by Hollow Press`;
    const image = caseStudy.featured_image || '';

    return (
        <MainLayout>
            <Head title={caseStudy.title}>
                <meta name="description" content={description} />
                <meta name="keywords" content={`case study, ${caseStudy.project_type || 'project'}, ${caseStudy.client_name || ''}`} />

                <meta property="og:title" content={caseStudy.title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://hollowpress.graveyardjokes.com/case-studies/${caseStudy.slug}`} />
                {image && <meta property="og:image" content={image} />}

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={caseStudy.title} />
                <meta name="twitter:description" content={description} />
                {image && <meta name="twitter:image" content={image} />}
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
                {/* Navigation */}
                <div className="border-b border-gray-700 bg-gray-900">
                    <div className="mx-auto max-w-6xl px-6 py-4">
                        <Link href="/case-studies" className="group inline-flex items-center text-gray-400 transition-colors hover:text-gray-200">
                            <svg
                                className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Case Studies
                        </Link>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="relative overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black text-white">
                    <div className="absolute inset-0 opacity-10">
                        <div className="animate-gradient absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600"></div>
                    </div>
                    <div className="relative mx-auto max-w-6xl px-6 py-16">
                        <div className="mb-6 flex items-center gap-3">
                            {caseStudy.is_featured && (
                                <span className="rounded-full border border-yellow-700 bg-yellow-900/30 px-3 py-1 text-xs font-semibold text-yellow-400">
                                    ⭐ FEATURED
                                </span>
                            )}
                            {caseStudy.project_type && (
                                <span className="rounded-full bg-gray-700 px-3 py-1 text-xs font-semibold text-gray-300">
                                    {caseStudy.project_type}
                                </span>
                            )}
                        </div>

                        <h1 className="mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
                            {caseStudy.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-gray-300">
                            {caseStudy.client_name && (
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500">Client:</span>
                                    <span className="font-semibold">{caseStudy.client_name}</span>
                                </div>
                            )}
                            {caseStudy.project_date && (
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-500">Date:</span>
                                    <span className="font-semibold">
                                        {new Date(caseStudy.project_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                                    </span>
                                </div>
                            )}
                            {caseStudy.project_url && (
                                <a
                                    href={caseStudy.project_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-blue-400 transition-colors hover:text-blue-300"
                                >
                                    <span>View Live Project</span>
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-6xl px-6 py-16">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                        {/* Main Content Column */}
                        <div className="space-y-12 lg:col-span-2">
                            {/* Overview */}
                            <section>
                                <h2 className="mb-6 text-3xl font-bold text-white">Project Overview</h2>
                                <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-8">
                                    <p className="text-lg leading-relaxed text-gray-300">{caseStudy.description}</p>
                                </div>
                            </section>

                            {/* Challenge */}
                            {caseStudy.challenge && (
                                <section>
                                    <div className="mb-6 flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-red-900 to-red-800">
                                            <span className="text-2xl">🎯</span>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white">The Challenge</h2>
                                    </div>
                                    <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-8">
                                        <p className="leading-relaxed whitespace-pre-line text-gray-300">{caseStudy.challenge}</p>
                                    </div>
                                </section>
                            )}

                            {/* Solution */}
                            {caseStudy.solution && (
                                <section>
                                    <div className="mb-6 flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-900 to-blue-800">
                                            <span className="text-2xl">💡</span>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white">Our Solution</h2>
                                    </div>
                                    <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-8">
                                        <p className="leading-relaxed whitespace-pre-line text-gray-300">{caseStudy.solution}</p>
                                    </div>
                                </section>
                            )}

                            {/* Results */}
                            {caseStudy.results && (
                                <section>
                                    <div className="mb-6 flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-900 to-green-800">
                                            <span className="text-2xl">📊</span>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white">Results & Impact</h2>
                                    </div>
                                    <div className="rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 p-8">
                                        <p className="leading-relaxed whitespace-pre-line text-gray-300">{caseStudy.results}</p>
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Technologies */}
                            {caseStudy.technologies && caseStudy.technologies.length > 0 && (
                                <div className="sticky top-6 rounded-2xl border border-gray-700 bg-gray-800/50 p-6">
                                    <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                                        <span>🛠️</span>
                                        Technologies Used
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {caseStudy.technologies.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="rounded-lg bg-gray-700 px-3 py-2 text-sm text-gray-200 transition-colors hover:bg-gray-600"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Project Details */}
                            <div className="rounded-2xl border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 p-6">
                                <h3 className="mb-4 text-xl font-bold text-white">Project Details</h3>
                                <div className="space-y-4">
                                    {caseStudy.client_name && (
                                        <div>
                                            <p className="mb-1 text-sm text-gray-500">Client</p>
                                            <p className="font-semibold text-gray-200">{caseStudy.client_name}</p>
                                        </div>
                                    )}
                                    {caseStudy.project_type && (
                                        <div>
                                            <p className="mb-1 text-sm text-gray-500">Project Type</p>
                                            <p className="font-semibold text-gray-200">{caseStudy.project_type}</p>
                                        </div>
                                    )}
                                    {caseStudy.project_date && (
                                        <div>
                                            <p className="mb-1 text-sm text-gray-500">Completed</p>
                                            <p className="font-semibold text-gray-200">
                                                {new Date(caseStudy.project_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                                            </p>
                                        </div>
                                    )}
                                    {caseStudy.project_url && (
                                        <div className="border-t border-gray-700 pt-4">
                                            <a
                                                href={caseStudy.project_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-900 to-blue-800 py-3 font-semibold text-white transition-all duration-300 hover:from-blue-800 hover:to-blue-700"
                                            >
                                                View Live Site
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                    />
                                                </svg>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="rounded-2xl border border-gray-600 bg-gradient-to-br from-gray-700 to-slate-700 p-6">
                                <h3 className="mb-3 text-xl font-bold text-white">Interested in Working Together?</h3>
                                <p className="mb-4 text-sm text-gray-200">Let's discuss how we can bring your project to life.</p>
                                <Link
                                    href="/contact"
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-100"
                                >
                                    Get in Touch
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* More Projects CTA */}
                <section className="border-t border-gray-800 bg-gradient-to-r from-gray-900 via-black to-gray-900 py-16">
                    <div className="mx-auto max-w-6xl px-6 text-center">
                        <h2 className="mb-6 text-3xl font-bold text-white">Explore More Projects</h2>
                        <Link
                            href="/case-studies"
                            className="inline-flex transform items-center justify-center rounded-xl border-2 border-gray-600 bg-gray-800 px-8 py-4 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-500 hover:bg-gray-700"
                        >
                            View All Case Studies
                            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
