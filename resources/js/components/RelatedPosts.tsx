import { Link } from '@inertiajs/react';

interface RelatedPost {
  id: number;
  title: string;
  author_name: string;
  author_type: 'artist' | 'user';
  created_at: string;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Related Stories</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col gap-3 rounded-xl border border-gray-700 bg-gray-900/60 p-5 hover:border-gray-500 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${
                  post.author_type === 'artist'
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                    : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                }`}
              >
                {post.author_name.charAt(0)}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-200 truncate">{post.author_name}</p>
                <span
                  className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                    post.author_type === 'artist'
                      ? 'bg-purple-500/20 text-purple-200 border border-purple-400/30'
                      : 'bg-blue-500/20 text-blue-200 border border-blue-400/30'
                  }`}
                >
                  {post.author_type === 'artist' ? '🎨 Artist' : '👤 Creator'}
                </span>
              </div>
            </div>

            <h3 className="text-gray-100 font-semibold leading-snug line-clamp-2">
              {post.title}
            </h3>

            <div className="mt-auto flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>

              <Link
                href={`/posts/${post.id}`}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Read story →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
