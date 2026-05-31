import MainLayout from '@/layouts/main';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';

interface PageProps {
    [key: string]: unknown;
    flash: {
        success?: string;
        error?: string;
    };
}

export default function Create() {
    const { flash } = usePage<PageProps>().props;
    const form = useForm<{
        title: string;
        content: string;
        author_name: string;
        author_type: 'artist' | 'user';
        featured_image: File | null;
        tags: string[];
    }>({
        title: '',
        content: '',
        author_name: '',
        author_type: 'user',
        featured_image: null,
        tags: [],
    });

    const { data, setData, errors, processing } = form;

    const [tagsInput, setTagsInput] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('featured_image', file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parsedTags = tagsInput
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);
        form.transform((d) => ({ ...d, tags: parsedTags })).post('/posts', { forceFormData: true });
    };

    return (
        <MainLayout>
            <Head title="Share Your Story" />

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
                {/* Header */}
                <div className="bg-gradient-to-r from-black to-gray-900 text-white">
                    <div className="mx-auto max-w-4xl px-6 py-12">
                        <div className="text-center">
                            <h1 className="mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-4xl font-bold text-transparent">
                                Share Your Creative Story
                            </h1>
                            <p className="text-lg text-gray-300">Inspire others with your unique journey and creative insights</p>
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
                                        className="w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-lg text-gray-200 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-gray-500"
                                        placeholder="Give your story a compelling title..."
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
                                            className="w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-gray-200 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-gray-500"
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
                                        className="w-full resize-none rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-gray-200 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-gray-500"
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

                                {/* Featured Image */}
                                <div className="space-y-2">
                                    <label className="mb-2 block text-sm font-semibold text-gray-200">Featured Image</label>
                                    <div
                                        className="cursor-pointer rounded-xl border-2 border-dashed border-gray-600 bg-gray-700 p-6 text-center transition-colors hover:border-gray-500"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" className="mx-auto max-h-48 rounded-lg object-cover" />
                                        ) : (
                                            <div className="text-gray-400">
                                                <svg className="mx-auto mb-2 h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p className="text-sm">Click to upload a featured image</p>
                                                <p className="mt-1 text-xs text-gray-500">JPG, PNG, GIF or WebP — max 2MB</p>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/gif,image/webp"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    {errors.featured_image && (
                                        <p className="mt-2 flex items-center text-sm text-red-400">
                                            <span className="mr-1">⚠</span>
                                            {errors.featured_image}
                                        </p>
                                    )}
                                </div>

                                {/* Tags */}
                                <div className="space-y-2">
                                    <label className="mb-2 block text-sm font-semibold text-gray-200">Tags</label>
                                    <input
                                        type="text"
                                        value={tagsInput}
                                        onChange={(e) => setTagsInput(e.target.value)}
                                        onBlur={handleTagsBlur}
                                        className="w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-gray-200 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-gray-500"
                                        placeholder="e.g. music, painting, poetry (comma-separated)"
                                    />
                                    <p className="text-xs text-gray-500">Separate tags with commas</p>
                                    {errors.tags && (
                                        <p className="mt-2 flex items-center text-sm text-red-400">
                                            <span className="mr-1">⚠</span>
                                            {errors.tags}
                                        </p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-4 border-t border-gray-700 pt-6 sm:flex-row">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 transform rounded-xl bg-gradient-to-r from-gray-700 to-slate-700 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-gray-600 hover:to-slate-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
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
                                                Publishing...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center">
                                                <span className="mr-2">✨</span>
                                                Publish Story
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
