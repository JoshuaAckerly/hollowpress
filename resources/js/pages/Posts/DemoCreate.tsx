import MainLayout from '@/layouts/main';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

interface PageProps {
    [key: string]: unknown;
    flash: {
        success?: string;
        error?: string;
    };
}

export default function DemoCreate() {
    const { flash } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        author_name: '',
        author_type: 'user' as 'artist' | 'user',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/demo/posts');
    };

    return (
        <MainLayout>
            <Head title="Try Demo Post" />

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-900 via-cyan-900 to-blue-900 text-white">
                    <div className="mx-auto max-w-4xl px-6 py-12">
                        <div className="text-center">
                            <div className="mb-4 inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-bold">
                                <span className="mr-2">🎯</span>
                                DEMO MODE
                            </div>
                            <h1 className="mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-4xl font-bold text-transparent">
                                Try Creating a Demo Post
                            </h1>
                            <p className="mb-2 text-lg text-gray-300">Test the post creation feature without authentication</p>
                            <p className="text-sm text-blue-300">⏱️ Demo posts are automatically removed after 48 hours</p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-4xl px-6 py-12">
                    {/* Flash Messages */}
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

                    {/* Info Banner */}
                    <div className="mb-8 rounded-xl border border-blue-700 bg-blue-900/30 p-6">
                        <h3 className="mb-2 flex items-center font-semibold text-blue-300">
                            <span className="mr-2">ℹ️</span>
                            About Demo Posts
                        </h3>
                        <ul className="ml-6 space-y-1 text-sm text-gray-300">
                            <li>• No login required - try it instantly</li>
                            <li>• Limited to 5 demo posts per hour per IP</li>
                            <li>• Automatically deleted after 48 hours</li>
                            <li>• Shows up with a "DEMO" badge in the posts list</li>
                        </ul>
                    </div>

                    {/* Form Card */}
                    <div className="overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 shadow-xl">
                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Title Field */}
                                <div className="space-y-2">
                                    <label className="mb-2 block text-sm font-semibold text-gray-200">Story Title</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-lg text-gray-200 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        placeholder="Give your demo story a compelling title..."
                                        required
                                    />
                                    {errors.title && (
                                        <p className="mt-2 flex items-center text-sm text-red-400">
                                            <span className="mr-1">⚠</span>
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                {/* Author Info */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="mb-2 block text-sm font-semibold text-gray-200">Your Name</label>
                                        <input
                                            type="text"
                                            value={data.author_name}
                                            onChange={(e) => setData('author_name', e.target.value)}
                                            className="w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-gray-200 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter your name"
                                            required
                                        />
                                        {errors.author_name && (
                                            <p className="mt-2 flex items-center text-sm text-red-400">
                                                <span className="mr-1">⚠</span>
                                                {errors.author_name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="mb-2 block text-sm font-semibold text-gray-200">I am a...</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <label
                                                className={`flex cursor-pointer items-center justify-center rounded-xl border-2 p-3 transition-all duration-200 ${
                                                    data.author_type === 'user'
                                                        ? 'border-blue-500 bg-blue-900/30 text-blue-300'
                                                        : 'border-gray-600 text-gray-400 hover:border-gray-500'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    value="user"
                                                    checked={data.author_type === 'user'}
                                                    onChange={(e) => setData('author_type', e.target.value as 'artist' | 'user')}
                                                    className="sr-only"
                                                />
                                                <span className="text-sm font-medium">👤 Creator</span>
                                            </label>
                                            <label
                                                className={`flex cursor-pointer items-center justify-center rounded-xl border-2 p-3 transition-all duration-200 ${
                                                    data.author_type === 'artist'
                                                        ? 'border-purple-500 bg-purple-900/30 text-purple-300'
                                                        : 'border-gray-600 text-gray-400 hover:border-gray-500'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    value="artist"
                                                    checked={data.author_type === 'artist'}
                                                    onChange={(e) => setData('author_type', e.target.value as 'artist' | 'user')}
                                                    className="sr-only"
                                                />
                                                <span className="text-sm font-medium">🎨 Artist</span>
                                            </label>
                                        </div>
                                        {errors.author_type && (
                                            <p className="mt-2 flex items-center text-sm text-red-400">
                                                <span className="mr-1">⚠</span>
                                                {errors.author_type}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Content Field */}
                                <div className="space-y-2">
                                    <label className="mb-2 block text-sm font-semibold text-gray-200">Your Story</label>
                                    <textarea
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        className="w-full resize-none rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-gray-200 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        rows={8}
                                        placeholder="Share your creative journey, insights, challenges, or inspiration..."
                                        required
                                    />
                                    <div className="mt-2 flex items-center justify-between">
                                        {errors.content ? (
                                            <p className="flex items-center text-sm text-red-400">
                                                <span className="mr-1">⚠</span>
                                                {errors.content}
                                            </p>
                                        ) : (
                                            <p className="text-sm text-gray-500">Minimum 10 characters required</p>
                                        )}
                                        <p className="text-sm text-gray-500">{data.content.length} characters</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-4 border-t border-gray-700 pt-6 sm:flex-row">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 transform rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-500 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                                    >
                                        {processing ? (
                                            <span className="flex items-center justify-center">
                                                <svg
                                                    className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Creating Demo...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center">
                                                <span className="mr-2">🎯</span>
                                                Create Demo Post
                                            </span>
                                        )}
                                    </button>
                                    <Link
                                        href="/posts"
                                        className="flex-1 rounded-xl bg-gray-700 px-8 py-4 text-center font-semibold text-gray-300 transition-all duration-200 hover:bg-gray-600 sm:flex-none"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
