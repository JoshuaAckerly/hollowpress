import { Head, Link, router, usePage } from '@inertiajs/react';
import MainLayout from '@/layouts/main';
import React, { useState } from 'react';

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
  is_demo?: boolean;
}

interface Props {
  posts: {
    data: Post[];
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
  };
  filters?: {
    q?: string;
    author?: string;
    category?: string;
    date_from?: string;
    date_to?: string;
  };
  filterOptions?: {
    categories: string[];
    authors: string[];
  };
}

export default function Index({ posts, filters, filterOptions }: Props) {
  const { flash } = usePage<PageProps>().props;
  const [query, setQuery] = useState(filters?.q ?? '');
  const [author, setAuthor] = useState(filters?.author ?? '');
  const [category, setCategory] = useState(filters?.category ?? '');
  const [dateFrom, setDateFrom] = useState(filters?.date_from ?? '');
  const [dateTo, setDateTo] = useState(filters?.date_to ?? '');

  const extractSearchTerms = (search: string): string[] => {
    if (!search.trim()) return [];

    const matches = search.match(/"[^"]+"|\S+/g) ?? [];

    return matches
      .map((term) => term.replace(/^"|"$/g, '').trim())
      .filter((term) => term && term.toLowerCase() !== 'and' && term.toLowerCase() !== 'or');
  };

  const highlightSearchTerms = (text: string, searchTerm: string) => {
    if (!searchTerm || !text) return text;

    const terms = extractSearchTerms(searchTerm);
    if (terms.length === 0) return text;

    const escapedTerms = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escapedTerms.join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part)
        ? <mark key={index} className="bg-yellow-200 text-gray-900 px-1 rounded">{part}</mark>
        : part
    );
  };

  const getSearchSnippet = (text: string, searchTerm: string, maxLength: number = 140) => {
    if (!searchTerm || !text) {
      return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    }

    const terms = extractSearchTerms(searchTerm).map((term) => term.toLowerCase());
    const lowerText = text.toLowerCase();
    const firstMatch = terms
      .map((term) => lowerText.indexOf(term))
      .filter((index) => index >= 0)
      .sort((a, b) => a - b)[0];

    if (firstMatch === undefined) {
      return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    }

    const start = Math.max(0, firstMatch - 45);
    const end = Math.min(text.length, firstMatch + maxLength - 45);

    let snippet = text.substring(start, end);
    if (start > 0) snippet = `...${snippet}`;
    if (end < text.length) snippet = `${snippet}...`;

    return snippet;
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.get('/posts', {
      q: query || undefined,
      author: author || undefined,
      category: category || undefined,
      date_from: dateFrom || undefined,
      date_to: dateTo || undefined,
    }, { preserveState: true, preserveScroll: true, replace: true });
  };

  const clearFilters = () => {
    setQuery('');
    setAuthor('');
    setCategory('');
    setDateFrom('');
    setDateTo('');
    router.get('/posts', {}, { preserveState: true, preserveScroll: true, replace: true });
  };
  
  const handleDelete = (id: number, isDemo: boolean = false) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const url = isDemo ? `/demo/posts/${id}` : `/posts/${id}`;
      router.delete(url);
    }
  };

  return (
    <MainLayout>
      <Head title="Creative Stories">
        <meta name="description" content="Explore creative stories and blog posts from independent artists and creators. Discover unique perspectives, artistic journeys, and unconventional narratives." />
        <meta name="keywords" content="creative stories, artist blogs, creative writing, artist posts, independent creators" />
        
        <meta property="og:title" content="Creative Stories - Hollow Press" />
        <meta property="og:description" content="Explore creative stories from independent artists and creators" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hollowpress.graveyardjokes.com/posts" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Creative Stories" />
        <meta name="twitter:description" content="Explore creative stories from independent artists" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Creative Stories
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Discover inspiring tales from artists and creators around the world
              </p>
              <Link
                href="/demo/posts/create"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="mr-2">✨</span>
                Create a Post
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="mb-8 card">
            <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder='Search posts... Try: "neon city" OR vinyl'
                className="flex-1 rounded-lg border border-gray-600 bg-gray-900 px-4 py-3 text-gray-100 placeholder:text-gray-500"
              />
              <button type="submit" className="btn btn-primary">Search</button>
              {(filters?.q || filters?.author || filters?.category || filters?.date_from || filters?.date_to) && (
                <button type="button" onClick={clearFilters} className="btn btn-outline">Clear</button>
              )}
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100"
              >
                <option value="">All Categories</option>
                {filterOptions?.categories.map((item) => (
                  <option key={item} value={item}>{item === 'artist' ? 'Artist' : 'Creator'}</option>
                ))}
              </select>

              <select
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                className="rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100"
              >
                <option value="">All Authors</option>
                {filterOptions?.authors.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>

              <input
                type="date"
                value={dateFrom}
                onChange={(event) => setDateFrom(event.target.value)}
                className="rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100"
              />

              <input
                type="date"
                value={dateTo}
                onChange={(event) => setDateTo(event.target.value)}
                className="rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100"
              />
            </div>

            <p className="muted mt-3">Advanced syntax: use quotes for exact phrases and `OR` for alternatives.</p>
            {filters?.q && (
              <p className="muted mt-1">Results are ranked by relevance, then recency.</p>
            )}
          </div>

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

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.data.map((post, _index) => (
              <article key={post.id} className="group bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-700 hover:border-gray-600">
                {/* Post Header */}
                <div className="relative p-6 pb-4">
                  {/* Demo Badge */}
                  {post.is_demo && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                      <span>🎯</span>
                      DEMO
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-200 mb-2 group-hover:text-gray-100 transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h2>
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                          post.author_type === 'artist' 
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                            : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                        }`}>
                          {post.author_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-300">{post.author_name}</p>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              post.author_type === 'artist' 
                                ? 'bg-purple-900/50 text-purple-300' 
                                : 'bg-blue-900/50 text-blue-300'
                            }`}>
                              {post.author_type === 'artist' ? '🎨 Artist' : '👤 Creator'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(post.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 leading-relaxed line-clamp-3 mb-4">
                    {filters?.q
                      ? highlightSearchTerms(getSearchSnippet(post.content, filters.q), filters.q)
                      : getSearchSnippet(post.content, '')}
                  </p>
                </div>

                {/* Post Actions */}
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/posts/${post.id}`}
                      className="inline-flex items-center text-gray-400 hover:text-gray-200 font-medium transition-colors group"
                    >
                      Read Story
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/posts/${post.id}/edit`}
                        className="p-2 text-gray-500 hover:text-green-400 hover:bg-green-900/30 rounded-lg transition-all duration-200"
                        title="Edit post"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.is_demo)}
                        className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-all duration-200"
                        title="Delete post"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {posts.data.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">No stories yet</h3>
              <p className="text-gray-400 mb-6">Be the first to share your creative journey</p>
              <Link
                href="/demo/posts/create"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create First Post
              </Link>
            </div>
          )}

          {posts.links.length > 3 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {posts.links.map((link, index) => {
                const key = `${link.label}-${index}`;

                if (!link.url) {
                  return (
                    <span
                      key={key}
                      className="rounded-md border border-gray-700 px-3 py-2 text-sm text-gray-500"
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  );
                }

                return (
                  <Link
                    key={key}
                    href={link.url}
                    preserveScroll
                    className={`rounded-md border px-3 py-2 text-sm transition ${
                      link.active
                        ? 'border-gray-300 bg-gray-100 text-gray-900'
                        : 'border-gray-700 text-gray-300 hover:border-gray-500 hover:text-gray-100'
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}