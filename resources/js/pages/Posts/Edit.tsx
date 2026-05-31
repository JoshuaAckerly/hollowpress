import MainLayout from '@/layouts/main';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

interface Post {
    id: number;
    title: string;
    content: string;
    author_name: string;
    author_type: 'artist' | 'user';
    featured_image: string | null;
    tags: string[] | null;
}

interface Props {
    post: Post;
}

export default function Edit({ post }: Props) {
    const form = useForm<{
        title: string;
        content: string;
        author_name: string;
        author_type: 'artist' | 'user';
        featured_image: File | null;
        tags: string[];
    }>({
        title: post.title,
        content: post.content,
        author_name: post.author_name,
        author_type: post.author_type,
        featured_image: null,
        tags: post.tags ?? [],
    });

    const { data, setData, errors, processing } = form;

    const [tagsInput, setTagsInput] = useState((post.tags ?? []).join(', '));
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const prevPreviewRef = useRef<string | null>(null);

    useEffect(() => () => { if (prevPreviewRef.current) URL.revokeObjectURL(prevPreviewRef.current); }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('featured_image', file);
        if (file) {
            if (prevPreviewRef.current) URL.revokeObjectURL(prevPreviewRef.current);
            const url = URL.createObjectURL(file);
            prevPreviewRef.current = url;
            setImagePreview(url);
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
        form.transform((d) => ({ ...d, tags: parsedTags }));
        form.put(`/posts/${post.id}`, { forceFormData: true });
    };

    return (
        <MainLayout>
            <Head title={`Edit ${post.title}`} />

            <div className="mx-auto max-w-2xl p-6">
                <h1 className="mb-6 text-3xl font-bold">Edit Post</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="edit-title" className="mb-1 block text-sm font-medium">Title</label>
                        <input
                            id="edit-title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full rounded border px-3 py-2"
                            required
                        />
                        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                    </div>

                    <div>
                        <label htmlFor="edit-author" className="mb-1 block text-sm font-medium">Author Name</label>
                        <input
                            id="edit-author"
                            type="text"
                            value={data.author_name}
                            onChange={(e) => setData('author_name', e.target.value)}
                            className="w-full rounded border px-3 py-2"
                            required
                        />
                        {errors.author_name && <p className="text-sm text-red-500">{errors.author_name}</p>}
                    </div>

                    <div>
                        <label htmlFor="edit-author-type" className="mb-1 block text-sm font-medium">Author Type</label>
                        <select
                            id="edit-author-type"
                            value={data.author_type}
                            onChange={(e) => setData('author_type', e.target.value as 'artist' | 'user')}
                            className="w-full rounded border px-3 py-2"
                        >
                            <option value="user">User</option>
                            <option value="artist">Artist</option>
                        </select>
                        {errors.author_type && <p className="text-sm text-red-500">{errors.author_type}</p>}
                    </div>

                    <div>
                        <label htmlFor="edit-content" className="mb-1 block text-sm font-medium">Content</label>
                        <textarea
                            id="edit-content"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="min-h-[128px] w-full rounded border px-3 py-2"
                            required
                        />
                        {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                    </div>

                    {/* Featured Image */}
                    <div>
                        <label htmlFor="edit-image" className="mb-1 block text-sm font-medium">Featured Image</label>
                        {post.featured_image && !imagePreview && (
                            <div className="mb-2">
                                <img src={`/storage/${post.featured_image}`} alt="Current featured image" className="h-32 rounded object-cover" />
                                <p className="mt-1 text-xs text-gray-500">Current image — upload a new one to replace it</p>
                            </div>
                        )}
                        {imagePreview && (
                            <div className="mb-2">
                                <img src={imagePreview} alt="New image preview" className="h-32 rounded object-cover" />
                            </div>
                        )}
                        <input
                            ref={fileInputRef}
                            id="edit-image"
                            type="file"
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            onChange={handleImageChange}
                            className="w-full rounded border px-3 py-2 text-sm"
                        />
                        <p className="mt-1 text-xs text-gray-500">JPG, PNG, GIF or WebP — max 2MB</p>
                        {errors.featured_image && <p className="text-sm text-red-500">{errors.featured_image}</p>}
                    </div>

                    {/* Tags */}
                    <div>
                        <label htmlFor="edit-tags" className="mb-1 block text-sm font-medium">Tags</label>
                        <input
                            id="edit-tags"
                            type="text"
                            value={tagsInput}
                            onChange={(e) => setTagsInput(e.target.value)}
                            className="w-full rounded border px-3 py-2"
                            placeholder="e.g. music, painting, poetry (comma-separated)"
                        />
                        <p className="mt-1 text-xs text-gray-500">Separate tags with commas</p>
                        {errors.tags && <p className="text-sm text-red-500">{errors.tags}</p>}
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600 disabled:opacity-50"
                        >
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Saving...
                                </span>
                            ) : (
                                'Update Post'
                            )}
                        </button>
                        <a href={`/posts/${post.id}`} className="rounded bg-gray-500 px-6 py-3 text-white hover:bg-gray-600">
                            Cancel
                        </a>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
