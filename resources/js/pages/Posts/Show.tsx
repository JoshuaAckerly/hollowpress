import { Head, Link, useForm, usePage } from '@inertiajs/react';
import MainLayout from '@/layouts/main';
import RelatedPosts from '@/components/RelatedPosts';

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
  const { data, setData, post: submitComment, processing, errors, reset } = useForm({
    author_name: '',
    content: '',
  });

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submitComment(`/posts/${post.id}/comments`, {
      preserveScroll: true,
      onSuccess: () => reset('content'),
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
        {/* Navigation */}
        <div className="bg-gray-900 border-b border-gray-700">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <Link
              href="/posts"
              className="inline-flex items-center text-gray-400 hover:text-gray-200 transition-colors group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Stories
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          {flash?.success && (
            <div className="mb-8 p-4 bg-green-900/50 border-l-4 border-green-500 text-green-300 rounded-r-lg shadow-sm">
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                {flash.success}
              </div>
            </div>
          )}

          {flash?.error && (
            <div className="mb-8 p-4 bg-red-900/50 border-l-4 border-red-500 text-red-300 rounded-r-lg shadow-sm">
              <div className="flex items-center">
                <span className="text-red-400 mr-2">⚠</span>
                {flash.error}
              </div>
            </div>
          )}

          <article className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
            {/* Article Header */}
            <div className="bg-gradient-to-r from-black to-gray-900 text-white p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-4 leading-tight">
                    {post.title}
                  </h1>
                  
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      post.author_type === 'artist' 
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                        : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                    }`}>
                      {post.author_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{post.author_name}</p>
                      <div className="flex items-center space-x-3 text-gray-300">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          post.author_type === 'artist' 
                            ? 'bg-purple-500/20 text-purple-200 border border-purple-400/30' 
                            : 'bg-blue-500/20 text-blue-200 border border-blue-400/30'
                        }`}>
                          {post.author_type === 'artist' ? '🎨 Artist' : '👤 Creator'}
                        </span>
                        <span className="text-sm">
                          {new Date(post.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
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
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
                  {post.content}
                </div>
              </div>
            </div>

            {/* Article Footer */}
            <div className="bg-gray-900 px-8 py-6 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {Math.ceil(post.content.length / 200)} min read
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    {post.content.length} characters
                  </span>
                </div>
                
                <Link
                  href={`/posts/${post.id}/edit`}
                  className="inline-flex items-center px-4 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Story
                </Link>
              </div>
            </div>
          </article>

          <div className="mt-8 grid grid-cols-1 gap-8">
            <RelatedPosts posts={relatedPosts} />

            <section className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Leave a Comment</h2>

              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Your Name</label>
                  <input
                    type="text"
                    value={data.author_name}
                    onChange={(event) => setData('author_name', event.target.value)}
                    className="w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-gray-100 placeholder:text-gray-500"
                    placeholder="Enter your name"
                    required
                  />
                  {errors.author_name && (
                    <p className="text-red-400 text-sm mt-2">{errors.author_name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-2">Comment</label>
                  <textarea
                    value={data.content}
                    onChange={(event) => setData('content', event.target.value)}
                    className="w-full rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-gray-100 placeholder:text-gray-500 resize-none"
                    placeholder="Share your thoughts on this story..."
                    rows={4}
                    required
                  />
                  {errors.content && (
                    <p className="text-red-400 text-sm mt-2">{errors.content}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white font-semibold rounded-xl hover:from-gray-600 hover:to-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  {processing ? 'Submitting...' : 'Submit Comment'}
                </button>
              </form>
            </section>

            <section className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Comments ({comments.length})</h2>

              {comments.length === 0 ? (
                <p className="text-gray-400">No approved comments yet. Be the first to share your thoughts.</p>
              ) : (
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <article key={comment.id} className="border border-gray-700 rounded-xl p-5 bg-gray-900/60">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold text-gray-200">{comment.author_name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(comment.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{comment.content}</p>
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
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white font-semibold rounded-xl hover:from-gray-600 hover:to-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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