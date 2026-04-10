import Breadcrumb from '@/components/Breadcrumb';
import RelatedPosts from '@/components/RelatedPosts';
import { trackFormSubmission } from '@/hooks/use-google-analytics';
import MainLayout from '@/layouts/main';
import type HCaptchaType from '@hcaptcha/react-hcaptcha';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { lazy, Suspense, useRef } from 'react';

const HCaptcha = lazy(() => import('@hcaptcha/react-hcaptcha'));

interface PageProps {
    [key: string]: unknown;
    flash: {
        success?: string;
        error?: string;
    };
}

interface Post {
    id: number;
    title: string;
    content: string;
    author_name: string;
    author_type: 'artist' | 'user';
    created_at: string;
}

interface Comment {
    id: number;
    author_name: string;
    content: string;
    created_at: string;
}

interface RelatedPost {
    id: number;
    title: string;
    author_name: string;
    author_type: 'artist' | 'user';
    created_at: string;
}

interface Props {
    post: Post;
    comments: Comment[];
    relatedPosts: RelatedPost[];
}

export default function Show({ post, comments, relatedPosts }: Props) {
    const { flash } = usePage<PageProps>().props;
    const captchaRef = useRef<HCaptchaType>(null);
    const {
        data,
        setData,
        post: submitComment,
        processing,
        errors,
        reset,
    } = useForm({
        author_name: '',
        content: '',
        hcaptcha_token: '',
    });

    const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Track comment form submission
        trackFormSubmission('comment_form', {
            post_id: post.id.toString(),
        });

        submitComment(`/posts/${post.id}/comments`, {
            preserveScroll: true,
            onSuccess: () => {
                reset('content');
                setData('hcaptcha_token', '');
                captchaRef.current?.resetCaptcha();
            },
            onError: () => {
                setData('hcaptcha_token', '');
                captchaRef.current?.resetCaptcha();
            },
        });
    };

    const excerpt = post.content.substring(0, 155) + (post.content.length > 155 ? '...' : '');

    return (
        <MainLayout>
            <Head title={post.title}>
                <meta name="description" content={excerpt} />
                <meta name="keywords" content={`${post.author_type} blog, creative writing, ${post.author_name}`} />
                <meta name="author" content={post.author_name} />

                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={excerpt} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://hollowpress.graveyardjokes.com/posts/${post.id}`} />
                <meta property="article:author" content={post.author_name} />
                <meta property="article:published_time" content={post.created_at} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={excerpt} />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
                {/* Breadcrumbs */}
                <div className="border-b border-gray-700 bg-gray-900">
                    <div className="mx-auto max-w-4xl px-6 py-4">
                        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Stories', href: '/posts' }, { label: post.title }]} />
                    </div>
                </div>

                <div className="mx-auto max-w-4xl px-6 py-12">
                    {flash?.success && (
                        <div className="mb-8 rounded-r-lg border-l-4 border-green-500 bg-green-900/50 p-4 text-green-300 shadow-sm">
                            <div className="flex items-center">
                                <span className="mr-2 text-green-400">✓</span>
                                {flash.success}
                            </div>
                        </div>
                    )}

                    {flash?.error && (
                        <div className="mb-8 rounded-r-lg border-l-4 border-red-500 bg-red-900/50 p-4 text-red-300 shadow-sm">
                            <div className="flex items-center">
                                <span className="mr-2 text-red-400">⚠</span>
                                {flash.error}
                            </div>
                        </div>
                    )}

                    <article className="overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 shadow-xl">
                        {/* Article Header */}
                        <div className="bg-gradient-to-r from-black to-gray-900 p-8 text-white">
                            <div className="mb-6 flex items-start justify-between">
                                <div className="flex-1">
                                    <h1 className="mb-4 text-4xl leading-tight font-bold">{post.title}</h1>

                                    <div className="flex items-center space-x-4">
                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white ${
                                                post.author_type === 'artist'
                                                    ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                                                    : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                                            }`}
                                        >
                                            {post.author_name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-lg font-semibold">{post.author_name}</p>
                                            <div className="flex items-center space-x-3 text-gray-300">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                        post.author_type === 'artist'
                                                            ? 'border border-purple-400/30 bg-purple-500/20 text-purple-200'
                                                            : 'border border-blue-400/30 bg-blue-500/20 text-blue-200'
                                                    }`}
                                                >
                                                    {post.author_type === 'artist' ? '🎨 Artist' : '👤 Creator'}
                                                </span>
                                                <span className="text-sm">
                                                    {new Date(post.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Article Content */}
                        <div className="p-8">
                            <div className="prose prose-lg prose-invert max-w-none">
                                <div className="text-lg leading-relaxed whitespace-pre-wrap text-gray-300">{post.content}</div>
                            </div>
                        </div>

                        {/* Article Footer */}
                        <div className="border-t border-gray-700 bg-gray-900 px-8 py-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-gray-400">
                                    <span className="flex items-center">
                                        <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        {Math.ceil(post.content.length / 200)} min read
                                    </span>
                                    <span className="flex items-center">
                                        <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            />
                                        </svg>
                                        {post.content.length} characters
                                    </span>
                                </div>

                                <Link
                                    href={`/posts/${post.id}/edit`}
                                    className="inline-flex items-center rounded-lg bg-gray-700 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-600"
                                >
                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                    Edit Story
                                </Link>
                            </div>
                        </div>
                    </article>

                    <div className="mt-8 grid grid-cols-1 gap-8">
                        <RelatedPosts posts={relatedPosts} />

                        <section className="rounded-2xl border border-gray-700 bg-gray-800 p-8 shadow-xl">
                            <h2 className="mb-6 text-2xl font-bold text-white">Leave a Comment</h2>

                            <form onSubmit={handleCommentSubmit} className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-200">Your Name</label>
                                    <input
                                        type="text"
                                        value={data.author_name}
                                        onChange={(event) => setData('author_name', event.target.value)}
                                        className="w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-gray-100 placeholder:text-gray-500"
                                        placeholder="Enter your name"
                                        required
                                    />
                                    {errors.author_name && <p className="mt-2 text-sm text-red-400">{errors.author_name}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-200">Comment</label>
                                    <textarea
                                        value={data.content}
                                        onChange={(event) => setData('content', event.target.value)}
                                        className="w-full resize-none rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-gray-100 placeholder:text-gray-500"
                                        placeholder="Share your thoughts on this story..."
                                        rows={4}
                                        required
                                    />
                                    {errors.content && <p className="mt-2 text-sm text-red-400">{errors.content}</p>}
                                </div>

                                <div>
                                    <Suspense fallback={<div className="h-16" />}>
                                        <HCaptcha
                                            sitekey={import.meta.env.VITE_HCAPTCHA_SITEKEY}
                                            onVerify={(token) => setData('hcaptcha_token', token)}
                                            onExpire={() => setData('hcaptcha_token', '')}
                                            ref={captchaRef}
                                            theme="dark"
                                        />
                                    </Suspense>
                                    {errors.hcaptcha_token && <p className="mt-2 text-sm text-red-400">{errors.hcaptcha_token}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing || !data.hcaptcha_token}
                                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-gray-600 hover:to-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? 'Submitting...' : 'Submit Comment'}
                                </button>
                            </form>
                        </section>

                        <section className="rounded-2xl border border-gray-700 bg-gray-800 p-8 shadow-xl">
                            <h2 className="mb-6 text-2xl font-bold text-white">Comments ({comments.length})</h2>

                            {comments.length === 0 ? (
                                <p className="text-gray-400">No approved comments yet. Be the first to share your thoughts.</p>
                            ) : (
                                <div className="space-y-6">
                                    {comments.map((comment) => (
                                        <article key={comment.id} className="rounded-xl border border-gray-700 bg-gray-900/60 p-5">
                                            <div className="mb-3 flex items-center justify-between">
                                                <p className="font-semibold text-gray-200">{comment.author_name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(comment.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                            <p className="leading-relaxed whitespace-pre-wrap text-gray-300">{comment.content}</p>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Related Actions */}
                    <div className="mt-8 text-center">
                        <Link
                            href="/posts/create"
                            className="inline-flex transform items-center rounded-xl bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-gray-600 hover:to-gray-500 hover:shadow-xl"
                        >
                            <span className="mr-2">✨</span>
                            Share Your Own Story
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
