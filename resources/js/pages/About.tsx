import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/main';

export default function About() {
  return (
    <MainLayout>
      <Head title="About Hollow Press">
        <meta name="description" content="Learn about Hollow Press - a platform where unconventional art thrives. We're a sanctuary for artists who find beauty in the shadows and celebrate authentic creative expression." />
        <meta name="keywords" content="about hollow press, artist platform, creative community, unconventional art, artist sanctuary" />
        
        <meta property="og:title" content="About Hollow Press" />
        <meta property="og:description" content="A sanctuary for artists who find beauty in the unconventional. Learn about our mission to celebrate authentic creative expression." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hollowpress.graveyardjokes.com/about" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="About Hollow Press" />
        <meta name="twitter:description" content="A sanctuary for artists who find beauty in the unconventional" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 animate-gradient"></div>
          </div>
          <div className="relative max-w-5xl mx-auto px-6 py-20">
            <div className="text-center">
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                About Hollow Press
              </h1>
              <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                A sanctuary for artists who find beauty in the unconventional
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <section className="py-16 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-5xl mx-auto px-6">
            <div className="bg-gray-800 rounded-2xl p-10 border border-gray-700 shadow-2xl">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-600 to-slate-600 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🌙</span>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white text-center mb-6">Faith in Shadows</h2>
              <p className="text-gray-300 text-lg leading-relaxed text-center max-w-3xl mx-auto">
                Hollow Press is more than just a platform—it's a movement. We believe that every artist has a unique voice 
                that deserves to be heard, celebrated, and shared with the world. In the shadows, we find light. In darkness, 
                we discover beauty. This is a space where unconventional art thrives and authenticity reigns supreme.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-gradient-to-br from-black to-gray-900">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Our Story</h2>
            <div className="space-y-8">
              <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 backdrop-blur-sm">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <span className="text-3xl mr-3">🎨</span>
                  Born from Passion
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Hollow Press was created to fill a void in the creative community—a space where artists could express 
                  themselves freely without conforming to mainstream expectations. We embrace the dark, the mysterious, 
                  and the unconventional aspects of art that often go unnoticed.
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 backdrop-blur-sm">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <span className="text-3xl mr-3">🌍</span>
                  A Global Community
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  What started as a small blog has grown into a thriving community of artists, musicians, writers, and 
                  creators from around the world. Each member brings their unique perspective, enriching our collective 
                  creative tapestry with diverse voices and visions.
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 backdrop-blur-sm">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <span className="text-3xl mr-3">✨</span>
                  Future Vision
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We're constantly evolving, adding new features and opportunities for artists to showcase their work, 
                  connect with others, and grow their creative presence. Our vision is to become the premier destination 
                  for alternative art and underground culture.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎭</span>
                </div>
                <h3 className="text-xl font-semibold text-white text-center mb-3">Authenticity</h3>
                <p className="text-gray-300 text-center">
                  Be true to yourself and your art. We celebrate originality and genuine creative expression.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold text-white text-center mb-3">Community</h3>
                <p className="text-gray-300 text-center">
                  Support and uplift fellow artists. Together, we're stronger and more creative.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-white text-center mb-3">Innovation</h3>
                <p className="text-gray-300 text-center">
                  Push boundaries and explore new creative territories. Embrace experimentation.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="text-xl font-semibold text-white text-center mb-3">Excellence</h3>
                <p className="text-gray-300 text-center">
                  Strive for quality in everything you create. Your craft deserves your best effort.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-semibold text-white text-center mb-3">Inclusivity</h3>
                <p className="text-gray-300 text-center">
                  Welcome all perspectives and backgrounds. Diversity makes our community richer.
                </p>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔥</span>
                </div>
                <h3 className="text-xl font-semibold text-white text-center mb-3">Passion</h3>
                <p className="text-gray-300 text-center">
                  Create with heart and soul. Passion is the fuel that drives extraordinary work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-16 bg-gradient-to-br from-black to-gray-900">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white text-center mb-12">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 shadow-lg">
                <h3 className="text-2xl font-semibold text-white mb-4">✍️ Blogging Platform</h3>
                <p className="text-gray-300 leading-relaxed">
                  Share your creative journey, insights, and stories with a dedicated audience that appreciates 
                  authentic artistic expression.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 shadow-lg">
                <h3 className="text-2xl font-semibold text-white mb-4">🎵 Artist Profiles</h3>
                <p className="text-gray-300 leading-relaxed">
                  Showcase your albums, events, and creative work in a professional portfolio that highlights 
                  your unique artistic voice.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 shadow-lg">
                <h3 className="text-2xl font-semibold text-white mb-4">🌐 Global Reach</h3>
                <p className="text-gray-300 leading-relaxed">
                  Connect with art enthusiasts and fellow creators from around the world, expanding your audience 
                  beyond geographical boundaries.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 shadow-lg">
                <h3 className="text-2xl font-semibold text-white mb-4">⭐ Sponsorship Opportunities</h3>
                <p className="text-gray-300 leading-relaxed">
                  Get featured as a sponsored artist and gain increased visibility within our growing community 
                  of creative minds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Join Our Creative Community</h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Whether you're an established artist or just starting your creative journey, Hollow Press welcomes you. 
              Share your voice, find your tribe, and let your art shine in the shadows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/posts" 
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gray-700 to-slate-700 text-white font-bold rounded-xl hover:from-gray-600 hover:to-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explore Stories
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a 
                href="/artists" 
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-800 text-white font-bold rounded-xl border-2 border-gray-600 hover:bg-gray-700 hover:border-gray-500 transition-all duration-300 transform hover:-translate-y-1"
              >
                Discover Artists
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
