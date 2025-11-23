import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/layouts/main';

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
  caseStudies: CaseStudy[];
}

export default function Index({ caseStudies }: Props) {
  const featuredStudies = caseStudies.filter(cs => cs.is_featured);
  const regularStudies = caseStudies.filter(cs => !cs.is_featured);

  return (
    <MainLayout>
      <Head title="Case Studies" />
      
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
                              {caseStudy.description}
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
                          {caseStudy.description}
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
