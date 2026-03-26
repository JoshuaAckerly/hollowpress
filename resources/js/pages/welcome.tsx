import Main from '@/layouts/main';
import { Head } from '@inertiajs/react';
import React from 'react';
import { getProjectUrl } from '../env';
const cdn = import.meta.env.VITE_ASSET_URL;

interface Post {
    id: number;
    title: string;
    content: string;
    author_name: string;
    author_type: 'artist' | 'user';
    created_at: string;
}

interface Artist {
    id: number;
    name: string;
    bio: string;
    genre: string;
    website: string;
    albums: Album[];
    events: Event[];
}

interface Album {
    id: number;
    title: string;
}

interface Event {
    id: number;
    title: string;
}

interface Props {
    posts?: Post[];
    artists?: Artist[];
}

const blogImages = [
    `${cdn}/images/AdobeStock_1423234483.webp`,
    `${cdn}/images/eviltranscendencealbumcoversleekdigitalrenderforthealbumbeyondrealitiesstyle.generativeAI copy.webp`,
    `${cdn}/images/VintageoldblurreddustedabstractbackgroundWornmusicAlbumCoverwithRingwearSquareimage.EasytoaddasOverlayorScreenFilter.IdealperfectForposterflyerormusicalbumcoverdesign.webp`,
];

const Welcome: React.FC<Props> = ({ posts = [], artists = [] }) => {
    const displayPosts = posts.slice(0, 3);

    return (
        <Main>
            <Head>
                <title>Hollow Press - Artist Blogging & Creative Showcase Platform</title>
                <meta
                    name="description"
                    content="A sanctuary for artists who find beauty in the unconventional. Discover unique stories, music, art, and creative expressions from independent artists and creators."
                />
                <meta
                    name="keywords"
                    content="artist blog, creative platform, independent artists, music blog, art showcase, creative writing, artist community"
                />

                {/* Open Graph */}
                <meta property="og:title" content="Hollow Press - Artist Blogging & Creative Showcase Platform" />
                <meta
                    property="og:description"
                    content="A sanctuary for artists who find beauty in the unconventional. Discover unique stories, music, art, and creative expressions."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={getProjectUrl('hollowpress')} />
                <meta property="og:image" content={`${cdn}/images/HollowPressLandingPageImage.webp`} />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Hollow Press - Artist Blogging Platform" />
                <meta name="twitter:description" content="A sanctuary for artists who find beauty in the unconventional" />
                <meta name="twitter:image" content={`${cdn}/images/HollowPressLandingPageImage.webp`} />
            </Head>
            {/* Hero section with background image */}
            <section className="relative z-0 bg-cover bg-center" style={{ backgroundImage: `url(${cdn}/images/HollowPressLandingPageImage.webp)` }}>
                <div className="bg-black/40">
                    <div className="container py-28 text-center">
                        <div className="card mx-auto max-w-3xl bg-black/60">
                            <h2 className="text-5xl font-extrabold text-white">Hollow Press</h2>
                            <h3 className="mt-3 text-2xl text-white/90">Faith in Shadows</h3>
                            <div className="mt-6">
                                <a className="btn btn-primary" href="#about">
                                    Discover More
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Hollow Press Section */}
            <section className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 py-16">
                <div className="container">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="mb-6 text-4xl font-bold text-white">What is Hollow Press?</h2>
                        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-slate-600">
                                    <span className="text-2xl text-white">✍️</span>
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-white">Artist Blogging Platform</h3>
                                <p className="text-gray-300">
                                    A dedicated space where artists can share their creative journey, insights, and stories with a community that
                                    understands their passion.
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-gray-600">
                                    <span className="text-2xl text-white">🎨</span>
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-white">Creative Community</h3>
                                <p className="text-gray-300">
                                    Connect with fellow artists, discover new perspectives, and build meaningful relationships within our vibrant
                                    creative community.
                                </p>
                            </div>
                            <div className="rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-700 to-slate-700">
                                    <span className="text-2xl text-white">🌐</span>
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-white">Global Reach</h3>
                                <p className="text-gray-300">
                                    Share your work with artists and art enthusiasts from around the world, expanding your reach beyond geographical
                                    boundaries.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-gray-800 bg-black p-8 text-white">
                            <h3 className="mb-4 text-2xl font-bold">Faith in Shadows</h3>
                            <p className="text-lg leading-relaxed text-gray-300">
                                Hollow Press is more than just a blog site—it's a sanctuary for artists who find beauty in the unconventional,
                                strength in vulnerability, and light within darkness. We believe every artist has a unique voice that deserves to be
                                heard, celebrated, and shared with the world.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Artists section */}
            <section id="about" className="py-12">
                <div className="container">
                    <div className="mb-6 flex items-center justify-between">
                        <h4 className="heading">Featured Artist</h4>
                        <a className="muted underline" href="/artists">
                            View All
                        </a>
                    </div>

                    {artists && artists.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {artists.map((artist) => (
                                <a key={artist.id} href={`/artists/${artist.id}`} className="card text-center transition-shadow hover:shadow-lg">
                                    <h4 className="mt-4 text-xl font-bold">{artist.name}</h4>
                                    <p className="muted mt-2">{artist.bio.substring(0, 100)}...</p>
                                    <div className="mt-2 text-sm text-gray-600">
                                        <span className="rounded bg-gray-100 px-2 py-1">{artist.genre}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <p className="muted">No featured artists yet. Check back soon.</p>
                        </div>
                    )}
                </div>
            </section>

            <section id="blogs" className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 py-20">
                {/* Background decorative elements */}
                <div className="absolute top-10 left-10 h-20 w-20 rounded-full bg-gray-600/20 blur-xl"></div>
                <div className="absolute top-32 right-20 h-32 w-32 rounded-full bg-slate-600/15 blur-2xl"></div>
                <div className="absolute bottom-20 left-1/4 h-24 w-24 rounded-full bg-gray-700/20 blur-xl"></div>
                <div className="absolute right-1/3 bottom-40 h-16 w-16 rounded-full bg-slate-700/25 blur-lg"></div>
                <div className="container">
                    <div className="mb-12 text-center">
                        <h4 className="heading mb-4 text-3xl font-bold text-white">Latest Stories</h4>
                        <p className="mx-auto max-w-2xl text-gray-300">Fresh writing from artists and creators in the Hollow Press community</p>
                    </div>

                    {displayPosts.length === 0 ? (
                        <div className="py-16 text-center">
                            <p className="mb-2 text-5xl">✍️</p>
                            <h5 className="mb-3 text-xl font-semibold text-white">No stories yet</h5>
                            <p className="mb-8 text-gray-400">Be the first to share your work with the community.</p>
                            <a
                                href="/posts/create"
                                className="inline-flex items-center rounded-xl bg-gradient-to-r from-gray-700 to-slate-700 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-gray-600 hover:to-slate-600"
                            >
                                <span className="mr-2">✨</span>
                                Share Your Story
                            </a>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {displayPosts.map((post, index) => (
                                <div
                                    key={post.id}
                                    className="group relative overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 shadow-xl transition-all duration-500 hover:border-gray-600 hover:shadow-2xl"
                                >
                                    {/* Decorative corner elements */}
                                    <div className="absolute top-0 left-0 h-20 w-20 rounded-br-full bg-gradient-to-br from-gray-600/30 to-transparent"></div>
                                    <div className="absolute right-0 bottom-0 h-16 w-16 rounded-tl-full bg-gradient-to-tl from-slate-600/30 to-transparent"></div>

                                    {/* Floating particles */}
                                    <div className="absolute top-4 left-4 h-2 w-2 animate-pulse rounded-full bg-gray-400"></div>
                                    <div className="absolute top-8 left-8 h-1 w-1 animate-ping rounded-full bg-slate-400"></div>
                                    <div className="absolute bottom-8 left-6 h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500"></div>

                                    <div className="relative overflow-hidden">
                                        <img
                                            src={blogImages[index % blogImages.length]}
                                            alt={post.title}
                                            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />

                                        {/* Image overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                        {/* Author type badge */}
                                        <div className="absolute top-4 right-4">
                                            <span
                                                className={`rounded-full border border-white/20 px-4 py-2 text-xs font-bold shadow-lg backdrop-blur-sm ${
                                                    post.author_type === 'artist'
                                                        ? 'bg-gradient-to-r from-gray-700/90 to-slate-700/90 text-white'
                                                        : 'bg-gradient-to-r from-slate-600/90 to-gray-600/90 text-white'
                                                }`}
                                            >
                                                {post.author_type === 'artist' ? '✨ Artist' : '💫 Creator'}
                                            </span>
                                        </div>

                                        {/* Reading time estimate */}
                                        <div className="absolute bottom-4 left-4">
                                            <span className="rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
                                                📖 {Math.ceil(post.content.length / 200)} min read
                                            </span>
                                        </div>
                                    </div>

                                    <div className="relative p-6">
                                        {/* Decorative line */}
                                        <div className="absolute top-0 right-6 left-6 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

                                        <h4 className="mt-2 mb-4 line-clamp-2 text-xl font-bold text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-gray-300 group-hover:to-slate-300 group-hover:bg-clip-text group-hover:text-transparent">
                                            {post.title}
                                        </h4>

                                        <div className="mb-4 flex items-center text-sm">
                                            <div
                                                className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full font-bold text-white shadow-md ${
                                                    post.author_type === 'artist'
                                                        ? 'bg-gradient-to-br from-gray-600 to-slate-600'
                                                        : 'bg-gradient-to-br from-slate-700 to-gray-700'
                                                }`}
                                            >
                                                {post.author_name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-200">{post.author_name}</p>
                                                <p className="flex items-center text-xs text-gray-400">
                                                    📅 {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                    <span className="mx-2">•</span>
                                                    ❤️ {Math.floor(Math.random() * 50) + 10} likes
                                                </p>
                                            </div>
                                        </div>

                                        <p className="mb-6 line-clamp-3 leading-relaxed text-gray-300">{post.content.substring(0, 130)}...</p>

                                        {/* Tags */}
                                        <div className="mb-4 flex flex-wrap gap-2">
                                            <span className="rounded-full bg-gray-700 px-2 py-1 text-xs text-gray-300">#creative</span>
                                            <span className="rounded-full bg-slate-700 px-2 py-1 text-xs text-slate-300">#inspiration</span>
                                            {post.author_type === 'artist' && (
                                                <span className="rounded-full bg-gray-600 px-2 py-1 text-xs text-gray-300">#art</span>
                                            )}
                                        </div>

                                        <a
                                            href={`/posts/${post.id}`}
                                            className="group inline-flex transform items-center rounded-lg bg-gradient-to-r from-gray-700 to-slate-700 px-4 py-2 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-gray-600 hover:to-slate-600 hover:shadow-lg"
                                        >
                                            ✨ Read Story
                                            <svg
                                                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="relative mt-16 text-center">
                        {/* Decorative elements around button */}
                        <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-gradient-to-r from-gray-600/10 to-slate-600/10"></div>
                        <div className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 transform animate-ping rounded-full bg-gradient-to-r from-slate-600/20 to-gray-600/20"></div>

                        <a
                            href="/posts"
                            className="bg-size-200 bg-pos-0 hover:bg-pos-100 relative inline-flex transform items-center rounded-2xl bg-gradient-to-r from-gray-700 via-slate-700 to-gray-700 px-8 py-4 font-bold text-white shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:shadow-gray-500/25"
                        >
                            <span className="mr-2">🚀</span>
                            Explore All Stories
                            <svg className="ml-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </Main>
    );
};

export default Welcome;
