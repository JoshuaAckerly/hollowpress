import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '@/layouts/main';
import React, { useState, useEffect } from 'react';

interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  description: string;
  client_name: string | null;
  project_type: string | null;
  project_date: string | null;
  technologies: string[] | null;
  featured_image: string | null;
  project_url: string | null;
  is_featured: boolean;
  created_at: string;
}

interface Props {
  caseStudies: {
    data: CaseStudy[];
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
  };
  filters?: {
    q?: string;
    project_type?: string;
    client_name?: string;
    technology?: string;
    date_from?: string;
    date_to?: string;
    sort?: string;
  };
  filterOptions?: {
    project_types: string[];
    clients: string[];
    technologies: string[];
  };
  searchQuery?: string;
}

export default function Index({ caseStudies, filters, filterOptions, searchQuery }: Props) {
  const [query, setQuery] = useState(filters?.q ?? '');
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    project_type: filters?.project_type ?? '',
    client_name: filters?.client_name ?? '',
    technology: filters?.technology ?? '',
    date_from: filters?.date_from ?? '',
    date_to: filters?.date_to ?? '',
    sort: filters?.sort ?? 'relevance',
  });

  const featuredStudies = caseStudies.data.filter(cs => cs.is_featured);
  const regularStudies = caseStudies.data.filter(cs => !cs.is_featured);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    applyFilters({ ...localFilters, q: query });
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    applyFilters({ ...newFilters, q: query });
  };

  const applyFilters = (filterData: any) => {
    const params: any = {};
    if (filterData.q?.trim()) params.q = filterData.q.trim();
    if (filterData.project_type) params.project_type = filterData.project_type;
    if (filterData.client_name) params.client_name = filterData.client_name;
    if (filterData.technology) params.technology = filterData.technology;
    if (filterData.date_from) params.date_from = filterData.date_from;
    if (filterData.date_to) params.date_to = filterData.date_to;
    if (filterData.sort && filterData.sort !== 'relevance') params.sort = filterData.sort;

    router.get('/case-studies', params, { preserveState: true, preserveScroll: true, replace: true });
  };

  const clearFilters = () => {
    setQuery('');
    setLocalFilters({
      project_type: '',
      client_name: '',
      technology: '',
      date_from: '',
      date_to: '',
      sort: 'relevance',
    });
    router.get('/case-studies', {}, { preserveState: true, preserveScroll: true, replace: true });
  };

  const highlightSearchTerms = (text: string, searchTerm: string) => {
    if (!searchTerm || !text) return text;

    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? <mark key={index} className="bg-yellow-200 text-gray-900 px-1 rounded">{part}</mark> : part
    );
  };

  const getSearchSnippet = (text: string, searchTerm: string, maxLength: number = 150) => {
    if (!searchTerm || !text) return text;

    const lowerText = text.toLowerCase();
    const lowerSearch = searchTerm.toLowerCase();
    const index = lowerText.indexOf(lowerSearch);

    if (index === -1) return text.substring(0, maxLength) + (text.length > maxLength ? '...' : '');

    const start = Math.max(0, index - 50);
    const end = Math.min(text.length, index + searchTerm.length + 50);
    let snippet = text.substring(start, end);

    if (start > 0) snippet = '...' + snippet;
    if (end < text.length) snippet = snippet + '...';

    return snippet;
  };

  const hasActiveFilters = Object.values(localFilters).some(v => v) || query.trim();

  return (
    <MainLayout>
      <Head title="Case Studies">
        <meta name="description" content="Explore our portfolio of successful projects and creative collaborations. View detailed case studies showcasing our work with artists and creative professionals." />
        <meta name="keywords" content="case studies, portfolio, creative projects, artist collaborations, project showcase" />
        
        <meta property="og:title" content="Case Studies - Hollow Press" />
        <meta property="og:description" content="Explore our portfolio of successful projects and creative collaborations" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hollowpress.graveyardjokes.com/case-studies" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Case Studies" />
        <meta name="twitter:description" content="Explore our portfolio of successful projects" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 animate-gradient"></div>
          </div>
          <div className="relative max-w-6xl mx-auto px-6 py-20">
            <div className="text-center">
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Case Studies
              </h1>
              <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Explore our portfolio of successful projects and creative collaborations
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters Section */}
        <section className="py-10 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="card">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex-1 relative">
                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder='Search case studies... Try: "web design" OR mobile OR "e-commerce"'
                      className="w-full rounded-lg border border-gray-600 bg-gray-900 px-12 py-3 text-gray-100 placeholder:text-gray-500"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className="btn btn-outline"
                  >
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filters
                    {showFilters ? 
                      <svg className="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg> : 
                      <svg className="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    }
                  </button>
                  {hasActiveFilters && (
                    <button type="button" onClick={clearFilters} className="btn btn-secondary">
                      <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear
                    </button>
                  )}
                </div>
              </form>

              {/* Advanced Search Help */}
              <div className="mb-4 p-3 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-300">
                  <strong>Advanced Search:</strong> Use quotes for exact phrases ("web design"), OR for multiple terms (mobile OR responsive), or search across titles, descriptions, and content.
                </p>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <div className="border-t border-gray-700 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {/* Project Type Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <svg className="h-4 w-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        Project Type
                      </label>
                      <select
                        value={localFilters.project_type}
                        onChange={(e) => handleFilterChange('project_type', e.target.value)}
                        className="w-full rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100"
                      >
                        <option value="">All Types</option>
                        {filterOptions?.project_types.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    {/* Client Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <svg className="h-4 w-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Client
                      </label>
                      <select
                        value={localFilters.client_name}
                        onChange={(e) => handleFilterChange('client_name', e.target.value)}
                        className="w-full rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100"
                      >
                        <option value="">All Clients</option>
                        {filterOptions?.clients.map(client => (
                          <option key={client} value={client}>{client}</option>
                        ))}
                      </select>
                    </div>

                    {/* Technology Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Technology
                      </label>
                      <select
                        value={localFilters.technology}
                        onChange={(e) => handleFilterChange('technology', e.target.value)}
                        className="w-full rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100"
                      >
                        <option value="">All Technologies</option>
                        {filterOptions?.technologies.map(tech => (
                          <option key={tech} value={tech}>{tech}</option>
                        ))}
                      </select>
                    </div>

                    {/* Date Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <svg className="h-4 w-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        From Date
                      </label>
                      <input
                        type="date"
                        value={localFilters.date_from}
                        onChange={(e) => handleFilterChange('date_from', e.target.value)}
                        className="w-full rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <svg className="h-4 w-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        To Date
                      </label>
                      <input
                        type="date"
                        value={localFilters.date_to}
                        onChange={(e) => handleFilterChange('date_to', e.target.value)}
                        className="w-full rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100"
                      />
                    </div>

                    {/* Sort Options */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Sort By
                      </label>
                      <select
                        value={localFilters.sort}
                        onChange={(e) => handleFilterChange('sort', e.target.value)}
                        className="w-full rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-gray-100"
                      >
                        <option value="relevance">Relevance</option>
                        <option value="date">Date</option>
                        <option value="title">Title</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Search Results Info */}
              {filters?.q && (
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-gray-300">
                    {caseStudies.data.length === 0 ? (
                      <>No results found for "<strong>{filters.q}</strong>"</>
                    ) : (
                      <>Found <strong>{caseStudies.data.length}</strong> result{caseStudies.data.length !== 1 ? 's' : ''} for "<strong>{filters.q}</strong>"</>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured Case Studies */}
        {featuredStudies.length > 0 && (
          <section className="py-16 bg-gradient-to-br from-gray-900 to-black">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-white mb-12 text-center">Featured Projects</h2>
              <div className="space-y-8">
                {featuredStudies.map((caseStudy) => (
                  <Link
                    key={caseStudy.id}
                    href={`/case-studies/${caseStudy.slug}`}
                    className="block group"
                  >
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
                      <div className="p-8 md:p-10">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                              <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 text-xs font-semibold rounded-full border border-yellow-700">
                                ⭐ FEATURED
                              </span>
                              {caseStudy.project_type && (
                                <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs font-semibold rounded-full">
                                  {caseStudy.project_type}
                                </span>
                              )}
                            </div>
                            
                            <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-gray-200 transition-colors">
                              {caseStudy.title}
                            </h3>
                            
                            {caseStudy.client_name && (
                              <p className="text-gray-400 mb-4">Client: {caseStudy.client_name}</p>
                            )}
                            
                            <p className="text-gray-300 leading-relaxed mb-6">
                              {searchQuery ? highlightSearchTerms(getSearchSnippet(caseStudy.description, searchQuery), searchQuery) : caseStudy.description}
                            </p>
                            
                            {caseStudy.technologies && caseStudy.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {caseStudy.technologies.map((tech, idx) => (
                                  <span 
                                    key={idx}
                                    className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-lg"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-200 transition-colors">
                            <span className="font-medium">View Details</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Regular Case Studies Grid */}
        <section className="py-16 bg-gradient-to-br from-black to-gray-900">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              {featuredStudies.length > 0 ? 'More Projects' : 'Our Projects'}
            </h2>
            
            {regularStudies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {regularStudies.map((caseStudy) => (
                  <Link
                    key={caseStudy.id}
                    href={`/case-studies/${caseStudy.slug}`}
                    className="group"
                  >
                    <div className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl h-full">
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          {caseStudy.project_type && (
                            <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs font-semibold rounded-full">
                              {caseStudy.project_type}
                            </span>
                          )}
                          {caseStudy.project_date && (
                            <span className="text-xs text-gray-500">
                              {new Date(caseStudy.project_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gray-200 transition-colors">
                          {caseStudy.title}
                        </h3>
                        
                        {caseStudy.client_name && (
                          <p className="text-gray-400 text-sm mb-3">Client: {caseStudy.client_name}</p>
                        )}
                        
                        <p className="text-gray-300 leading-relaxed mb-4 line-clamp-3">
                          {searchQuery ? highlightSearchTerms(getSearchSnippet(caseStudy.description, searchQuery), searchQuery) : caseStudy.description}
                        </p>
                        
                        {caseStudy.technologies && caseStudy.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {caseStudy.technologies.slice(0, 4).map((tech, idx) => (
                              <span 
                                key={idx}
                                className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded"
                              >
                                {tech}
                              </span>
                            ))}
                            {caseStudy.technologies.length > 4 && (
                              <span className="px-2 py-1 text-gray-400 text-xs">
                                +{caseStudy.technologies.length - 4} more
                              </span>
                            )}
                          </div>
                        )}
                        
                        <div className="flex items-center text-gray-400 group-hover:text-gray-200 transition-colors">
                          <span className="text-sm font-medium">Read Case Study</span>
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : featuredStudies.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">No Case Studies Yet</h3>
                <p className="text-gray-400">Check back soon for detailed project case studies.</p>
              </div>
            ) : null}

            {caseStudies.links.length > 3 && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                {caseStudies.links.map((link, index) => {
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
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-gray-900 via-black to-gray-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Let's collaborate and create something amazing together. Get in touch to discuss your ideas.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gray-700 to-slate-700 text-white font-bold rounded-xl hover:from-gray-600 hover:to-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Contact Us
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
