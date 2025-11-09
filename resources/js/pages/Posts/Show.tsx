import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/layouts/main';

interface Post {
  id: number;
  title: string;
  content: string;
  author_name: string;
  author_type: 'artist' | 'user';
  created_at: string;
}

interface Props {
  post: Post;
}

export default function Show({ post }: Props) {
  return (
    <MainLayout>
      <Head title={post.title} />
      
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