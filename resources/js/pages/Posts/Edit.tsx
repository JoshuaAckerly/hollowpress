import { Head, useForm, usePage } from '@inertiajs/react';
import MainLayout from '@/layouts/main';

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
      
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
        
        {flash?.success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {flash.success}
          </div>
        )}
        
        {flash?.error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {flash.error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Author Name</label>
            <input
              type="text"
              value={data.author_name}
              onChange={(e) => setData('author_name', e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
            {errors.author_name && <p className="text-red-500 text-sm">{errors.author_name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Author Type</label>
            <select
              value={data.author_type}
              onChange={(e) => setData('author_type', e.target.value as 'artist' | 'user')}
              className="w-full border rounded px-3 py-2"
            >
              <option value="user">User</option>
              <option value="artist">Artist</option>
            </select>
            {errors.author_type && <p className="text-red-500 text-sm">{errors.author_type}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              value={data.content}
              onChange={(e) => setData('content', e.target.value)}
              className="w-full border rounded px-3 py-2 h-32"
              required
            />
            {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Update Post
            </button>
            <a
              href={`/posts/${post.id}`}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}