import MainLayout from '@/layouts/main';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState } from 'react';

interface Project {
    id: number;
    title: string;
    slug: string;
    summary: string;
    status: 'active' | 'completed' | 'archived';
    year: number | null;
    tags: string[] | null;
    cover_image: string | null;
    is_featured: boolean;
    created_at: string;
}

interface Props {
    projects: {
        data: Project[];
        links: { url: string | null; label: string; active: boolean }[];
    };
    filters?: {
        q?: string;
        status?: string;
        tag?: string;
        year?: string | null;
    };
    filterOptions?: {
        tags: string[];
        years: number[];
    };
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
    active: { label: 'Active', className: 'bg-green-900/40 text-green-400 border border-green-700' },
    completed: { label: 'Completed', className: 'bg-blue-900/40 text-blue-400 border border-blue-700' },
    archived: { label: 'Archived', className: 'bg-gray-700/50 text-gray-400 border border-gray-600' },
};

export default function Index({ projects, filters, filterOptions }: Props) {
    const [query, setQuery] = useState(filters?.q ?? '');
    const [status, setStatus] = useState(filters?.status ?? '');
    const [tag, setTag] = useState(filters?.tag ?? '');
    const [year, setYear] = useState(filters?.year ?? '');

    const applyFilters = (overrides: Record<string, string> = {}) => {
        const params: Record<string, string> = {};
        const merged = { q: query, status, tag, year: year ?? '', ...overrides };
        if (merged.q?.trim()) params.q = merged.q.trim();
        if (merged.status) params.status = merged.status;
        if (merged.tag) params.tag = merged.tag;
        if (merged.year) params.year = merged.year;
        router.get('/projects', params, { preserveState: true, preserveScroll: true, replace: true });
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        applyFilters();
    };

    const handleFilter = (key: string, value: string) => {
        if (key === 'status') setStatus(value);
        if (key === 'tag') setTag(value);
        if (key === 'year') setYear(value);
        applyFilters({ [key]: value });
    };

    const clearFilters = () => {
        setQuery('');
        setStatus('');
        setTag('');
        setYear('');
        router.get('/projects', {}, { preserveState: true, preserveScroll: true, replace: true });
    };

    const hasActiveFilters = !!(query.trim() || status || tag || year);

    const featuredProjects = projects.data.filter((p) => p.is_featured);
    const regularProjects = projects.data.filter((p) => !p.is_featured);

    return (
        <MainLayout>
            <Head title="Projects">
                <meta
                    name="description"
                    content="Explore the creative projects and ongoing work at Hollow Press — music, art, and collaborative ventures."
                />
                <meta property="og:title" content="Projects - Hollow Press" />
                <meta property="og:description" content="Creative projects and ongoing work at Hollow Press" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://hollowpress.graveyardjokes.com/projects" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Projects - Hollow Press" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
                {/* Hero */}
                <div className="relative overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black text-white">
                    <div className="relative mx-auto max-w-6xl px-6 py-20 text-center">
                        <h1 className="mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-bold text-transparent sm:text-5xl lg:text-6xl">Projects</h1>
                        <p className="mx-auto max-w-2xl text-lg text-gray-300">
                            Creative work, ongoing ventures, and completed endeavors from Hollow Press.
                        </p>
                    </div>
                </div>

                <div className="mx-auto max-w-6xl px-6 py-12">
                    {/* Search & Filters */}
                    <div className="mb-10 rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                        <form onSubmit={handleSearch} className="mb-4 flex gap-3">
                            <input
                                type="text"
                                aria-label="Search projects"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search projects…"
                                className="flex-1 rounded-lg border border-gray-600 bg-gray-900 px-4 py-2 text-white placeholder-gray-400 focus:border-gray-400 focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="rounded-lg bg-white px-5 py-2 font-semibold text-gray-900 transition-colors hover:bg-gray-200"
                            >
                                Search
                            </button>
                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="rounded-lg border border-gray-600 px-4 py-2 text-gray-300 transition-colors hover:border-gray-400 hover:text-white"
                                >
                                    Clear
                                </button>
                            )}
                        </form>

                        <div className="flex flex-wrap gap-3">
                            {/* Status filter */}
                            <select
                                aria-label="Filter by status"
                                value={status}
                                onChange={(e) => handleFilter('status', e.target.value)}
                                className="rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white focus:outline-none"
                            >
                                <option value="">All statuses</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="archived">Archived</option>
                            </select>

                            {/* Tag filter */}
                            {filterOptions && filterOptions.tags.length > 0 && (
                                <select
                                    aria-label="Filter by tag"
                                    value={tag}
                                    onChange={(e) => handleFilter('tag', e.target.value)}
                                    className="rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white focus:outline-none"
                                >
                                    <option value="">All tags</option>
                                    {filterOptions.tags.map((t) => (
                                        <option key={t} value={t}>
                                            {t}
                                        </option>
                                    ))}
                                </select>
                            )}

                            {/* Year filter */}
                            {filterOptions && filterOptions.years.length > 0 && (
                                <select
                                    aria-label="Filter by year"
                                    value={year}
                                    onChange={(e) => handleFilter('year', e.target.value)}
                                    className="rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white focus:outline-none"
                                >
                                    <option value="">All years</option>
                                    {filterOptions.years.map((y) => (
                                        <option key={y} value={String(y)}>
                                            {y}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>

                    {/* Featured Projects */}
                    {featuredProjects.length > 0 && (
                        <section className="mb-12">
                            <h2 className="mb-6 text-2xl font-bold text-white">Featured</h2>
                            <div className="grid gap-6 md:grid-cols-2">
                                {featuredProjects.map((project) => (
                                    <ProjectCard key={project.id} project={project} featured />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* All / remaining projects */}
                    {regularProjects.length > 0 ? (
                        <section>
                            {featuredProjects.length > 0 && <h2 className="mb-6 text-2xl font-bold text-white">All Projects</h2>}
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {regularProjects.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>
                        </section>
                    ) : (
                        featuredProjects.length === 0 && (
                            <div className="py-20 text-center text-gray-400">
                                <p className="text-lg">No projects found.</p>
                                {hasActiveFilters && (
                                    <button onClick={clearFilters} className="mt-4 text-sm text-gray-300 underline hover:text-white">
                                        Clear filters
                                    </button>
                                )}
                            </div>
                        )
                    )}

                    {/* Pagination */}
                    {projects.links.length > 3 && (
                        <div className="mt-12 flex flex-wrap justify-center gap-2">
                            {projects.links.map((link, i) => {
                                if (!link.url && link.label !== '...') return null;
                                return (
                                    <Link
                                        key={i}
                                        href={link.url ?? '#'}
                                        className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
                                            link.active
                                                ? 'border-white bg-white text-gray-900'
                                                : 'border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white'
                                        } ${!link.url ? 'pointer-events-none opacity-40' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
    const statusInfo = STATUS_LABELS[project.status] ?? STATUS_LABELS.active;

    return (
        <Link href={`/projects/${project.slug}`} className="group block">
            <div
                className={`h-full overflow-hidden rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40 ${
                    featured ? 'border-yellow-700/50 bg-gray-800/70' : 'border-gray-700 bg-gray-800/50'
                }`}
            >
                {/* Cover image */}
                {project.cover_image && (
                    <div className="aspect-video w-full overflow-hidden">
                        <img
                            src={project.cover_image}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            width="800"
                            height="450"
                        />
                    </div>
                )}

                <div className="p-6">
                    {/* Badges */}
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                        {featured && (
                            <span className="rounded-full border border-yellow-700 bg-yellow-900/30 px-2.5 py-0.5 text-xs font-semibold text-yellow-400">
                                ⭐ Featured
                            </span>
                        )}
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusInfo.className}`}>{statusInfo.label}</span>
                        {project.year && <span className="text-xs text-gray-400">{project.year}</span>}
                    </div>

                    <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-gray-200">{project.title}</h3>

                    <p className="mb-4 line-clamp-3 text-sm text-gray-400">{project.summary}</p>

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {project.tags.slice(0, 4).map((t) => (
                                <span key={t} className="rounded-full bg-gray-700 px-2 py-0.5 text-xs text-gray-300">
                                    {t}
                                </span>
                            ))}
                            {project.tags.length > 4 && <span className="text-xs text-gray-500">+{project.tags.length - 4} more</span>}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
