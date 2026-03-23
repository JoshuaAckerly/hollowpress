import Main from '@/layouts/main';
import { Head, Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

interface PageProps {
    [key: string]: unknown;
    flash: {
        success?: string;
        error?: string;
    };
}

interface DashboardStats {
    publishedPostsCount: number;
    draftPostsCount: number;
    artistsCount: number;
    caseStudiesCount: number;
}

interface RecentPost {
    id: number;
    title: string;
    author_name: string;
    created_at: string;
}

interface RecentCaseStudy {
    id: number;
    title: string;
    slug: string;
    created_at: string;
}

interface RecentComment {
    id: number;
    post_id: number;
    author_name: string;
    content: string;
    is_approved: boolean;
    created_at: string;
    post?: {
        id: number;
        title: string;
    } | null;
}

interface Props {
    stats: DashboardStats;
    recentPosts: RecentPost[];
    recentCaseStudies: RecentCaseStudy[];
    recentComments: RecentComment[];
}

const formatDate = (value: string): string => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return 'Unknown date';
    }

    return date.toLocaleDateString();
};

const Dashboard: React.FC<Props> = ({ stats, recentPosts, recentCaseStudies, recentComments }) => {
    const { flash } = usePage<PageProps>().props;
    const [dashboardToken, setDashboardToken] = useState('');
    const hasAnyPosts = stats.publishedPostsCount + stats.draftPostsCount > 0;
    const hasAnyCaseStudies = stats.caseStudiesCount > 0;

    return (
        <Main>
            <Head>
                <title>Dashboard | Hollow Press</title>
                <meta name="description" content="Hollow Press dashboard with core content and publishing metrics." />
            </Head>

            <section className="py-12">
                <div className="container space-y-8">
                    <div>
                        <h1 className="heading text-3xl">HollowPress Dashboard</h1>
                        <p className="muted">Core publishing overview and quick navigation.</p>
                    </div>

                    {flash?.success && <div className="rounded border border-green-700 bg-green-900/30 p-3 text-green-200">{flash.success}</div>}

                    {flash?.error && <div className="rounded border border-red-700 bg-red-900/30 p-3 text-red-200">{flash.error}</div>}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="card">
                            <p className="muted">Published posts</p>
                            <p className="mt-2 text-3xl font-bold">{stats.publishedPostsCount}</p>
                        </div>
                        <div className="card">
                            <p className="muted">Demo drafts</p>
                            <p className="mt-2 text-3xl font-bold">{stats.draftPostsCount}</p>
                        </div>
                        <div className="card">
                            <p className="muted">Artists</p>
                            <p className="mt-2 text-3xl font-bold">{stats.artistsCount}</p>
                        </div>
                        <div className="card">
                            <p className="muted">Case studies</p>
                            <p className="mt-2 text-3xl font-bold">{stats.caseStudiesCount}</p>
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="heading">Content health</h2>
                        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div className="rounded border border-border p-3">
                                <p className="font-semibold">Posts pipeline</p>
                                <p className="muted mt-1">
                                    {hasAnyPosts
                                        ? `Live with ${stats.publishedPostsCount} published and ${stats.draftPostsCount} demo drafts.`
                                        : 'No post content yet — create your first draft from quick actions.'}
                                </p>
                            </div>
                            <div className="rounded border border-border p-3">
                                <p className="font-semibold">Case studies coverage</p>
                                <p className="muted mt-1">
                                    {hasAnyCaseStudies
                                        ? `${stats.caseStudiesCount} case studies available for portfolio proof.`
                                        : 'No case studies yet — seed at least one to support trust and conversion.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="card space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="heading m-0">Recent posts</h2>
                                <a className="btn btn-outline" href="/posts">
                                    View all
                                </a>
                            </div>
                            {recentPosts.length > 0 ? (
                                <ul className="space-y-3">
                                    {recentPosts.map((post) => (
                                        <li key={post.id} className="rounded border border-border p-3">
                                            <a className="font-semibold hover:underline" href={`/posts/${post.id}`}>
                                                {post.title}
                                            </a>
                                            <p className="muted mt-1">
                                                By {post.author_name} • {formatDate(post.created_at)}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="rounded border border-dashed border-border p-4">
                                    <p className="font-semibold">No posts yet</p>
                                    <p className="muted mt-1">Create a demo post to start populating the feed.</p>
                                    <a className="btn btn-primary mt-3" href="/demo/posts/create">
                                        Create demo post
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="card space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="heading m-0">Recent case studies</h2>
                                <a className="btn btn-outline" href="/case-studies">
                                    View all
                                </a>
                            </div>
                            {recentCaseStudies.length > 0 ? (
                                <ul className="space-y-3">
                                    {recentCaseStudies.map((caseStudy) => (
                                        <li key={caseStudy.id} className="rounded border border-border p-3">
                                            <a className="font-semibold hover:underline" href={`/case-studies/${caseStudy.slug}`}>
                                                {caseStudy.title}
                                            </a>
                                            <p className="muted mt-1">Updated {formatDate(caseStudy.created_at)}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="rounded border border-dashed border-border p-4">
                                    <p className="font-semibold">No case studies yet</p>
                                    <p className="muted mt-1">Add at least one case study entry to strengthen your portfolio section.</p>
                                    <a className="btn btn-outline mt-3" href="/case-studies">
                                        Open case studies
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="card space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="heading m-0">Recent comments</h2>
                            <p className="muted">Approve or unapprove visibility</p>
                        </div>

                        <div className="rounded border border-border p-3">
                            <label htmlFor="dashboardToken" className="block text-sm font-semibold">
                                Moderation token
                            </label>
                            <input
                                id="dashboardToken"
                                type="password"
                                value={dashboardToken}
                                onChange={(event) => setDashboardToken(event.target.value)}
                                className="mt-2 w-full rounded border border-border bg-background px-3 py-2"
                                placeholder="Enter DASHBOARD_ADMIN_TOKEN"
                            />
                            <p className="muted mt-2 text-xs">Required for approve/unapprove actions.</p>
                        </div>

                        {recentComments.length > 0 ? (
                            <ul className="space-y-3">
                                {recentComments.map((comment) => (
                                    <li key={comment.id} className="rounded border border-border p-3">
                                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                            <div>
                                                <p className="font-semibold">{comment.author_name}</p>
                                                <p className="muted mt-1">
                                                    On{' '}
                                                    <a className="hover:underline" href={`/posts/${comment.post_id}`}>
                                                        {comment.post?.title ?? `Post #${comment.post_id}`}
                                                    </a>{' '}
                                                    • {formatDate(comment.created_at)}
                                                </p>
                                                <p className="mt-2 text-sm text-foreground/90">
                                                    {comment.content.length > 140 ? `${comment.content.slice(0, 140)}...` : comment.content}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {comment.is_approved ? (
                                                    <>
                                                        <span className="rounded border border-green-700 bg-green-900/20 px-2 py-1 text-xs text-green-300">
                                                            Approved
                                                        </span>
                                                        <Link
                                                            href={`/dashboard/comments/${comment.id}/unapprove`}
                                                            method="patch"
                                                            as="button"
                                                            data={{ dashboard_token: dashboardToken }}
                                                            className={`btn btn-outline ${dashboardToken.trim() === '' ? 'pointer-events-none opacity-50' : ''}`}
                                                            preserveScroll
                                                        >
                                                            Unapprove
                                                        </Link>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="rounded border border-yellow-700 bg-yellow-900/20 px-2 py-1 text-xs text-yellow-300">
                                                            Pending
                                                        </span>
                                                        <Link
                                                            href={`/dashboard/comments/${comment.id}/approve`}
                                                            method="patch"
                                                            as="button"
                                                            data={{ dashboard_token: dashboardToken }}
                                                            className={`btn btn-primary ${dashboardToken.trim() === '' ? 'pointer-events-none opacity-50' : ''}`}
                                                            preserveScroll
                                                        >
                                                            Approve
                                                        </Link>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="rounded border border-dashed border-border p-4">
                                <p className="font-semibold">No comments yet</p>
                                <p className="muted mt-1">Comments submitted on post pages will appear here for moderation.</p>
                            </div>
                        )}
                    </div>

                    <div className="card">
                        <h2 className="heading">Quick actions</h2>
                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            <a className="btn btn-primary" href="/demo/posts/create">
                                Create demo post
                            </a>
                            <a className="btn btn-outline" href="/posts">
                                View all posts
                            </a>
                            <a className="btn btn-outline" href="/artists">
                                Browse artists
                            </a>
                            <a className="btn btn-outline" href="/case-studies">
                                Review case studies
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </Main>
    );
};

export default Dashboard;
