import MainLayout from '@/layouts/main';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';

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
    featured_image: string | null;
    tags: string[] | null;
}

interface Props {
    post: Post;
}

export default function Edit({ post }: Props) {
    const { flash } = usePage<PageProps>().props;
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
        form.transform((d) => ({ ...d, tags: parsedTags }));
        form.put(`/posts/${post.id}`, { forceFormData: true });
    };

    return (
        <MainLayout>
            <Head title={`Edit ${post.title}`} />

            <div className="mx-auto max-w-2xl p-6">
                <h1 className="mb-6 text-3xl font-bold">Edit Post</h1>

                {flash?.success && <div className="mb-4 rounded border border-green-400 bg-green-100 p-4 text-green-700">{flash.success}</div>}

                {flash?.error && <div className="mb-4 rounded border border-red-400 bg-red-100 p-4 text-red-700">{flash.error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full rounded border px-3 py-2"
                            required
                        />
                        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">Author Name</label>
                        <input
                            type="text"
                            value={data.author_name}
                            onChange={(e) => setData('author_name', e.target.value)}
                            className="w-full rounded border px-3 py-2"
                            required
                        />
                        {errors.author_name && <p className="text-sm text-red-500">{errors.author_name}</p>}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">Author Type</label>
                        <select
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
                        <label className="mb-1 block text-sm font-medium">Content</label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="h-32 w-full rounded border px-3 py-2"
                            required
                        />
                        {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                    </div>

                    {/* Featured Image */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">Featured Image</label>
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
                        <label className="mb-1 block text-sm font-medium">Tags</label>
                        <input
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
                            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
                        >
                            Update Post
                        </button>
                        <a href={`/posts/${post.id}`} className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
                            Cancel
                        </a>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
