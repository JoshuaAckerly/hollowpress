import Main from '@/layouts/main';
import { Head } from '@inertiajs/react';
import React from 'react';

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

interface Props {
    stats: DashboardStats;
    recentPosts: RecentPost[];
    recentCaseStudies: RecentCaseStudy[];
}

const formatDate = (value: string): string => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return 'Unknown date';
    }

    return date.toLocaleDateString();
};

const Dashboard: React.FC<Props> = ({ stats, recentPosts, recentCaseStudies }) => {
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
                                <a className="btn btn-outline" href="/posts">View all</a>
                            </div>
                            {recentPosts.length > 0 ? (
                                <ul className="space-y-3">
                                    {recentPosts.map((post) => (
                                        <li key={post.id} className="rounded border border-border p-3">
                                            <a className="font-semibold hover:underline" href={`/posts/${post.id}`}>{post.title}</a>
                                            <p className="muted mt-1">By {post.author_name} • {formatDate(post.created_at)}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="rounded border border-dashed border-border p-4">
                                    <p className="font-semibold">No posts yet</p>
                                    <p className="muted mt-1">Create a demo post to start populating the feed.</p>
                                    <a className="btn btn-primary mt-3" href="/demo/posts/create">Create demo post</a>
                                </div>
                            )}
                        </div>

                        <div className="card space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="heading m-0">Recent case studies</h2>
                                <a className="btn btn-outline" href="/case-studies">View all</a>
                            </div>
                            {recentCaseStudies.length > 0 ? (
                                <ul className="space-y-3">
                                    {recentCaseStudies.map((caseStudy) => (
                                        <li key={caseStudy.id} className="rounded border border-border p-3">
                                            <a className="font-semibold hover:underline" href={`/case-studies/${caseStudy.slug}`}>{caseStudy.title}</a>
                                            <p className="muted mt-1">Updated {formatDate(caseStudy.created_at)}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="rounded border border-dashed border-border p-4">
                                    <p className="font-semibold">No case studies yet</p>
                                    <p className="muted mt-1">Add at least one case study entry to strengthen your portfolio section.</p>
                                    <a className="btn btn-outline mt-3" href="/case-studies">Open case studies</a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="heading">Quick actions</h2>
                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            <a className="btn btn-primary" href="/demo/posts/create">Create demo post</a>
                            <a className="btn btn-outline" href="/posts">View all posts</a>
                            <a className="btn btn-outline" href="/artists">Browse artists</a>
                            <a className="btn btn-outline" href="/case-studies">Review case studies</a>
                        </div>
                    </div>
                </div>
            </section>
        </Main>
    );
};

export default Dashboard;
