import Breadcrumb from '@/components/Breadcrumb';
import MainLayout from '@/layouts/main';
import { Head, Link } from '@inertiajs/react';

interface Project {
    id: number;
    title: string;
    slug: string;
    summary: string;
    description: string | null;
    status: 'active' | 'completed' | 'archived';
    year: number | null;
    tags: string[] | null;
    cover_image: string | null;
    project_url: string | null;
    is_featured: boolean;
    created_at: string;
}

interface Props {
    project: Project;
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
    active: { label: 'Active', className: 'bg-green-900/40 text-green-400 border border-green-700' },
    completed: { label: 'Completed', className: 'bg-blue-900/40 text-blue-400 border border-blue-700' },
    archived: { label: 'Archived', className: 'bg-gray-700/50 text-gray-400 border border-gray-600' },
};

export default function Show({ project }: Props) {
    const statusInfo = STATUS_LABELS[project.status] ?? STATUS_LABELS.active;
    const description = project.summary || `${project.title} — a project by Hollow Press`;

    return (
        <MainLayout>
            <Head title={project.title}>
                <meta name="description" content={description} />
                <meta name="keywords" content={`project, ${project.tags?.join(', ') ?? ''}, hollow press`} />

                <meta property="og:title" content={`${project.title} - Hollow Press`} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://hollowpress.graveyardjokes.com/projects/${project.slug}`} />
                {project.cover_image && <meta property="og:image" content={project.cover_image} />}

                <meta name="twitter:card" content={project.cover_image ? 'summary_large_image' : 'summary'} />
                <meta name="twitter:title" content={project.title} />
                <meta name="twitter:description" content={description} />
                {project.cover_image && <meta name="twitter:image" content={project.cover_image} />}
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
                {/* Breadcrumb */}
                <div className="border-b border-gray-700 bg-gray-900">
                    <div className="mx-auto max-w-4xl px-6 py-4">
                        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }, { label: project.title }]} />
                    </div>
                </div>

                {/* Hero */}
                <div className="relative overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black text-white">
                    <div className="relative mx-auto max-w-4xl px-6 py-16">
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                            {project.is_featured && (
                                <span className="rounded-full border border-yellow-700 bg-yellow-900/30 px-3 py-1 text-xs font-semibold text-yellow-400">
                                    ⭐ FEATURED
                                </span>
                            )}
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusInfo.className}`}>{statusInfo.label}</span>
                            {project.year && <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">{project.year}</span>}
                        </div>

                        <h1 className="mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-5xl font-bold text-transparent">
                            {project.title}
                        </h1>

                        <p className="max-w-2xl text-lg leading-relaxed text-gray-300">{project.summary}</p>

                        {project.project_url && (
                            <a
                                href={project.project_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 font-semibold text-gray-900 transition-colors hover:bg-gray-200"
                            >
                                View Project
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

                {/* Cover image */}
                {project.cover_image && (
                    <div className="mx-auto max-w-4xl px-6 pt-8">
                        <div className="overflow-hidden rounded-xl border border-gray-700">
                            <img src={project.cover_image} alt={project.title} className="w-full object-cover" />
                        </div>
                    </div>
                )}

                {/* Main content */}
                <div className="mx-auto max-w-4xl px-6 py-12">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Description */}
                        <div className="lg:col-span-2">
                            {project.description && (
                                <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-8">
                                    <h2 className="mb-4 text-xl font-bold text-white">About this project</h2>
                                    <div className="prose prose-invert max-w-none text-gray-300">
                                        {project.description.split('\n').map((paragraph, i) =>
                                            paragraph.trim() ? (
                                                <p key={i} className="mb-4 leading-relaxed">
                                                    {paragraph}
                                                </p>
                                            ) : null,
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar metadata */}
                        <aside className="space-y-6">
                            {/* Status */}
                            <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                                <h3 className="mb-4 text-sm font-semibold tracking-wide text-gray-400 uppercase">Details</h3>
                                <dl className="space-y-3 text-sm">
                                    <div>
                                        <dt className="text-gray-500">Status</dt>
                                        <dd>
                                            <span
                                                className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusInfo.className}`}
                                            >
                                                {statusInfo.label}
                                            </span>
                                        </dd>
                                    </div>
                                    {project.year && (
                                        <div>
                                            <dt className="text-gray-500">Year</dt>
                                            <dd className="text-white">{project.year}</dd>
                                        </div>
                                    )}
                                    {project.project_url && (
                                        <div>
                                            <dt className="text-gray-500">Link</dt>
                                            <dd>
                                                <a
                                                    href={project.project_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="break-all text-gray-300 underline hover:text-white"
                                                >
                                                    Visit site
                                                </a>
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>

                            {/* Tags */}
                            {project.tags && project.tags.length > 0 && (
                                <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                                    <h3 className="mb-4 text-sm font-semibold tracking-wide text-gray-400 uppercase">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((t) => (
                                            <Link
                                                key={t}
                                                href={`/projects?tag=${encodeURIComponent(t)}`}
                                                className="rounded-full bg-gray-700 px-3 py-1 text-xs text-gray-300 transition-colors hover:bg-gray-600 hover:text-white"
                                            >
                                                {t}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>

                    {/* Back link */}
                    <div className="mt-12 border-t border-gray-700 pt-8">
                        <Link href="/projects" className="inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Projects
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
