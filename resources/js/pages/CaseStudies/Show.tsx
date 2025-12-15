import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/layouts/main';

interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  description: string;
  challenge: string | null;
  solution: string | null;
  results: string | null;
  client_name: string | null;
  project_type: string | null;
  project_date: string | null;
  technologies: string[] | null;
  featured_image: string | null;
  gallery_images: string[] | null;
  project_url: string | null;
  is_featured: boolean;
  created_at: string;
}

interface Props {
  caseStudy: CaseStudy;
}

export default function Show({ caseStudy }: Props) {
  const description = caseStudy.description || `${caseStudy.title} - A case study by Hollow Press`;
  const image = caseStudy.featured_image || '';
  
  return (
    <MainLayout>
      <Head title={caseStudy.title}>
        <meta name="description" content={description} />
        <meta name="keywords" content={`case study, ${caseStudy.project_type || 'project'}, ${caseStudy.client_name || ''}`} />
        
        <meta property="og:title" content={caseStudy.title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://hollowpress.graveyardjokes.com/case-studies/${caseStudy.slug}`} />
        {image && <meta property="og:image" content={image} />}
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={caseStudy.title} />
        <meta name="twitter:description" content={description} />
        {image && <meta name="twitter:image" content={image} />}
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Navigation */}
        <div className="bg-gray-900 border-b border-gray-700">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <Link
              href="/case-studies"
              className="inline-flex items-center text-gray-400 hover:text-gray-200 transition-colors group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Case Studies
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 animate-gradient"></div>
          </div>
          <div className="relative max-w-6xl mx-auto px-6 py-16">
            <div className="flex items-center gap-3 mb-6">
              {caseStudy.is_featured && (
                <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 text-xs font-semibold rounded-full border border-yellow-700">
                  ⭐ FEATURED
                </span>
              )}
              {caseStudy.project_type && (
                <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs font-semibold rounded-full">
                  {caseStudy.project_type}
                </span>
              )}
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {caseStudy.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              {caseStudy.client_name && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Client:</span>
                  <span className="font-semibold">{caseStudy.client_name}</span>
                </div>
              )}
              {caseStudy.project_date && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-semibold">
                    {new Date(caseStudy.project_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </span>
                </div>
              )}
              {caseStudy.project_url && (
                <a 
                  href={caseStudy.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>View Live Project</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">Project Overview</h2>
                <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {caseStudy.description}
                  </p>
                </div>
              </section>

              {/* Challenge */}
              {caseStudy.challenge && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-900 to-red-800 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white">The Challenge</h2>
                  </div>
                  <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                      {caseStudy.challenge}
                    </p>
                  </div>
                </section>
              )}

              {/* Solution */}
              {caseStudy.solution && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white">Our Solution</h2>
                  </div>
                  <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                      {caseStudy.solution}
                    </p>
                  </div>
                </section>
              )}

              {/* Results */}
              {caseStudy.results && (
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-900 to-green-800 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📊</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white">Results & Impact</h2>
                  </div>
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                      {caseStudy.results}
                    </p>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Technologies */}
              {caseStudy.technologies && caseStudy.technologies.length > 0 && (
                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 sticky top-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>🛠️</span>
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-2 bg-gray-700 text-gray-200 text-sm rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Details */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
                <div className="space-y-4">
                  {caseStudy.client_name && (
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Client</p>
                      <p className="text-gray-200 font-semibold">{caseStudy.client_name}</p>
                    </div>
                  )}
                  {caseStudy.project_type && (
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Project Type</p>
                      <p className="text-gray-200 font-semibold">{caseStudy.project_type}</p>
                    </div>
                  )}
                  {caseStudy.project_date && (
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Completed</p>
                      <p className="text-gray-200 font-semibold">
                        {new Date(caseStudy.project_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                      </p>
                    </div>
                  )}
                  {caseStudy.project_url && (
                    <div className="pt-4 border-t border-gray-700">
                      <a 
                        href={caseStudy.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white font-semibold rounded-lg hover:from-blue-800 hover:to-blue-700 transition-all duration-300"
                      >
                        View Live Site
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-gray-700 to-slate-700 rounded-2xl p-6 border border-gray-600">
                <h3 className="text-xl font-bold text-white mb-3">Interested in Working Together?</h3>
                <p className="text-gray-200 mb-4 text-sm">
                  Let's discuss how we can bring your project to life.
                </p>
                <Link 
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Get in Touch
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* More Projects CTA */}
        <section className="py-16 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Explore More Projects</h2>
            <Link 
              href="/case-studies" 
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-800 text-white font-bold rounded-xl border-2 border-gray-600 hover:bg-gray-700 hover:border-gray-500 transition-all duration-300 transform hover:-translate-y-1"
            >
              View All Case Studies
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
