import { Head, Link, useForm, usePage } from '@inertiajs/react';
import MainLayout from '@/layouts/main';

interface PageProps {
  flash: {
    success?: string;
    error?: string;
  };
}

export default function Create() {
  const { flash } = usePage<PageProps>().props;
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    content: '',
    author_name: '',
    author_type: 'user' as 'artist' | 'user',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/posts');
  };

  return (
    <MainLayout>
      <Head title="Share Your Story" />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-black to-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Share Your Creative Story
              </h1>
              <p className="text-gray-300 text-lg">
                Inspire others with your unique journey and creative insights
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Flash Messages */}
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

          {/* Form Card */}
          <div className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Title Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    Story Title
                  </label>
                  <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 text-lg bg-gray-700 text-gray-200"
                    placeholder="Give your story a compelling title..."
                    required
                  />
                  {errors.title && (
                    <p className="text-red-400 text-sm flex items-center mt-2">
                      <span className="mr-1">⚠</span>
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Author Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={data.author_name}
                      onChange={(e) => setData('author_name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 bg-gray-700 text-gray-200"
                      placeholder="Enter your name"
                      required
                    />
                    {errors.author_name && (
                      <p className="text-red-400 text-sm flex items-center mt-2">
                        <span className="mr-1">⚠</span>
                        {errors.author_name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      I am a...
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className={`flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        data.author_type === 'user' 
                          ? 'border-blue-500 bg-blue-900/30 text-blue-300' 
                          : 'border-gray-600 hover:border-gray-500 text-gray-400'
                      }`}>
                        <input
                          type="radio"
                          value="user"
                          checked={data.author_type === 'user'}
                          onChange={(e) => setData('author_type', e.target.value as 'artist' | 'user')}
                          className="sr-only"
                        />
                        <span className="text-sm font-medium">👤 Creator</span>
                      </label>
                      <label className={`flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        data.author_type === 'artist' 
                          ? 'border-purple-500 bg-purple-900/30 text-purple-300' 
                          : 'border-gray-600 hover:border-gray-500 text-gray-400'
                      }`}>
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
                      <p className="text-red-400 text-sm flex items-center mt-2">
                        <span className="mr-1">⚠</span>
                        {errors.author_type}
                      </p>
                    )}
                  </div>
                </div>

                {/* Content Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-200 mb-2">
                    Your Story
                  </label>
                  <textarea
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 resize-none bg-gray-700 text-gray-200"
                    rows={8}
                    placeholder="Share your creative journey, insights, challenges, or inspiration..."
                    required
                  />
                  <div className="flex justify-between items-center mt-2">
                    {errors.content ? (
                      <p className="text-red-400 text-sm flex items-center">
                        <span className="mr-1">⚠</span>
                        {errors.content}
                      </p>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        Minimum 10 characters required
                      </p>
                    )}
                    <p className="text-gray-500 text-sm">
                      {data.content.length} characters
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700">
                  <button
                    type="submit"
                    disabled={processing}
                    className="flex-1 sm:flex-none px-8 py-4 bg-gradient-to-r from-gray-700 to-slate-700 text-white font-semibold rounded-xl hover:from-gray-600 hover:to-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {processing ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
                    className="flex-1 sm:flex-none px-8 py-4 bg-gray-700 text-gray-300 font-semibold rounded-xl hover:bg-gray-600 transition-all duration-200 text-center"
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