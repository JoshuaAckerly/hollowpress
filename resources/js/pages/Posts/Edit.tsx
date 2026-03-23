import MainLayout from '@/layouts/main';
import { Head, useForm, usePage } from '@inertiajs/react';

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
}

interface Props {
    post: Post;
}

export default function Edit({ post }: Props) {
    const { flash } = usePage<PageProps>().props;
    const { data, setData, put, processing, errors } = useForm({
        title: post.title,
        content: post.content,
        author_name: post.author_name,
        author_type: post.author_type,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/posts/${post.id}`);
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
