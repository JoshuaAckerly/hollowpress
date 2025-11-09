import Main from '@/layouts/main';
import React from 'react';
const cdn = import.meta.env.VITE_ASSET_URL;

interface Product {
    img: string;
    id: number;
    name: string;
    description: string;
}

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

const products: Product[] = [
    {
        img: `${cdn}/images/Abstractillustrationofalabyrinthmaze.Creativedigitalartbackground.Texturedwithsubtlelightnoiseanddust.Canbeusedasamusicalbumcoverdesign..webp`,
        id: 1,
        name: 'Lorem ipsum',
        description: 'A deep dive into the world of velvet textures.',
    },
    {
        img: `${cdn}/images/
Mandreamsofahousebytheseaatsunsetsurrealartforalbumcoverposterorbookillustration.webp`,
        id: 2,
        name: 'Lorem ipsum',
        description: 'Exploring the ethereal sounds of synth music.',
    },
    { img: `${cdn}/images/AdobeStock_565842769.webp`, id: 3, name: 'Lorem ipsum', description: 'A journey through the phases of the moon.' },
];

const blogImages = [
    `${cdn}/images/AdobeStock_1423234483.webp`,
    `${cdn}/images/eviltranscendencealbumcoversleekdigitalrenderforthealbumbeyondrealitiesstyle.generativeAI copy.webp`,
    `${cdn}/images/VintageoldblurreddustedabstractbackgroundWornmusicAlbumCoverwithRingwearSquareimage.EasytoaddasOverlayorScreenFilter.IdealperfectForposterflyerormusicalbumcoverdesign.webp`,
];

const defaultPosts: Post[] = [
    {
        id: 999,
        title: 'Lorem Ipsum Dolor Sit',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        author_name: 'John Doe',
        author_type: 'artist',
        created_at: new Date().toISOString(),
    },
    {
        id: 998,
        title: 'Consectetur Adipiscing Elit',
        content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
        author_name: 'Jane Smith',
        author_type: 'user',
        created_at: new Date().toISOString(),
    },
    {
        id: 997,
        title: 'Sed Do Eiusmod Tempor',
        content: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati.',
        author_name: 'Mike Johnson',
        author_type: 'artist',
        created_at: new Date().toISOString(),
    },
];

const Welcome: React.FC<Props> = ({ posts = [], artists = [] }) => {
    const displayPosts = posts.length > 0 ? posts.slice(0, 3) : defaultPosts;
    const displayArtists = artists.length > 0 ? artists.slice(0, 3) : products;
    
    return (
        <Main>
            {/* Hero section with background image */}
            <section
                className="relative z-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${cdn}/images/HollowPressLandingPageImage.webp)` }}
            >
                <div className="bg-black/40">
                    <div className="container py-28 text-center">
                        <div className="card mx-auto max-w-3xl bg-black/60">
                            <h2 className="text-5xl font-extrabold text-white">Hollow Press</h2>
                            <h3 className="mt-3 text-2xl text-white/90">Faith in Shadows</h3>
                            <div className="mt-6">
                                <a className="btn btn-primary" href="#about">Discover More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Hollow Press Section */}
            <section className="py-16 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6 text-white">What is Hollow Press?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white text-2xl">✍️</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-white">Artist Blogging Platform</h3>
                                <p className="text-gray-300">A dedicated space where artists can share their creative journey, insights, and stories with a community that understands their passion.</p>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                                <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white text-2xl">🎨</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-white">Creative Community</h3>
                                <p className="text-gray-300">Connect with fellow artists, discover new perspectives, and build meaningful relationships within our vibrant creative community.</p>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
                                <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white text-2xl">🌐</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-white">Global Reach</h3>
                                <p className="text-gray-300">Share your work with artists and art enthusiasts from around the world, expanding your reach beyond geographical boundaries.</p>
                            </div>
                        </div>
                        <div className="bg-black rounded-2xl p-8 text-white border border-gray-800">
                            <h3 className="text-2xl font-bold mb-4">Faith in Shadows</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Hollow Press is more than just a blog site—it's a sanctuary for artists who find beauty in the unconventional, 
                                strength in vulnerability, and light within darkness. We believe every artist has a unique voice that deserves 
                                to be heard, celebrated, and shared with the world.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Artists section */}
            <section id="about" className="py-12">
                <div className="container">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="heading">Featured Artist</h4>
                        <a className="muted underline" href="/artists">View All</a>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {artists && artists.length > 0 ? artists.map((artist, index) => (
                            <a key={artist.id} href={`/artists/${artist.id}`} className="card text-center hover:shadow-lg transition-shadow">
                                <img src={products[index % products.length].img} alt={artist.name} className="h-48 w-full object-cover rounded" />
                                <h4 className="mt-4 text-xl font-bold">{artist.name}</h4>
                                <p className="mt-2 muted">{artist.bio.substring(0, 100)}...</p>
                                <div className="mt-2 text-sm text-gray-600">
                                    <span className="bg-gray-100 px-2 py-1 rounded">{artist.genre}</span>
                                </div>
                            </a>
                        )) : products.map((product) => (
                            <div key={product.id} className="card text-center">
                                <img src={product.img} alt={product.name} className="h-48 w-full object-cover rounded" />
                                <h4 className="mt-4 text-xl font-bold">{product.name}</h4>
                                <p className="mt-2 muted">{product.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="blogs" className="py-20 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-gray-600/20 rounded-full blur-xl"></div>
                <div className="absolute top-32 right-20 w-32 h-32 bg-slate-600/15 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gray-700/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-slate-700/25 rounded-full blur-lg"></div>
                <div className="container">
                    <div className="text-center mb-12">
                        <h4 className="heading text-3xl font-bold mb-4 text-white">Lorem Ipsum Blog</h4>
                        <p className="text-gray-300 max-w-2xl mx-auto">Lorem ipsum dolor sit amet consectetur adipiscing elit</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {displayPosts.map((post, index) => (
                            <div key={post.id} className="group relative bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-700 hover:border-gray-600">
                                {/* Decorative corner elements */}
                                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-gray-600/30 to-transparent rounded-br-full"></div>
                                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-slate-600/30 to-transparent rounded-tl-full"></div>
                                
                                {/* Floating particles */}
                                <div className="absolute top-4 left-4 w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                <div className="absolute top-8 left-8 w-1 h-1 bg-slate-400 rounded-full animate-ping"></div>
                                <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                                
                                <div className="relative overflow-hidden">
                                    <img 
                                        src={blogImages[index % blogImages.length]} 
                                        alt={post.title} 
                                        className="h-52 w-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                    />
                                    
                                    {/* Image overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    {/* Author type badge */}
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-4 py-2 text-xs font-bold rounded-full shadow-lg backdrop-blur-sm border border-white/20 ${
                                            post.author_type === 'artist' 
                                                ? 'bg-gradient-to-r from-gray-700/90 to-slate-700/90 text-white' 
                                                : 'bg-gradient-to-r from-slate-600/90 to-gray-600/90 text-white'
                                        }`}>
                                            {post.author_type === 'artist' ? '✨ Artist' : '💫 Creator'}
                                        </span>
                                    </div>
                                    
                                    {/* Reading time estimate */}
                                    <div className="absolute bottom-4 left-4">
                                        <span className="px-3 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
                                            📖 {Math.ceil(post.content.length / 200)} min read
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="p-6 relative">
                                    {/* Decorative line */}
                                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                                    
                                    <h4 className="text-xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-300 group-hover:to-slate-300 transition-all duration-300 line-clamp-2 mt-2">
                                        {post.title}
                                    </h4>
                                    
                                    <div className="flex items-center mb-4 text-sm">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3 shadow-md ${
                                            post.author_type === 'artist'
                                                ? 'bg-gradient-to-br from-gray-600 to-slate-600'
                                                : 'bg-gradient-to-br from-slate-700 to-gray-700'
                                        }`}>
                                            {post.author_name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-200">{post.author_name}</p>
                                            <p className="text-gray-400 text-xs flex items-center">
                                                📅 {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                <span className="mx-2">•</span>
                                                ❤️ {Math.floor(Math.random() * 50) + 10} likes
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                                        {post.content.substring(0, 130)}...
                                    </p>
                                    
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">#creative</span>
                                        <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full">#inspiration</span>
                                        {post.author_type === 'artist' && <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded-full">#art</span>}
                                    </div>
                                    
                                    <a 
                                        href={`/posts/${post.id}`} 
                                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-700 to-slate-700 text-white font-semibold rounded-lg hover:from-gray-600 hover:to-slate-600 transition-all duration-300 shadow-md hover:shadow-lg group transform hover:-translate-y-0.5"
                                    >
                                        ✨ Read Story
                                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-16 relative">
                        {/* Decorative elements around button */}
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-gray-600/10 to-slate-600/10 rounded-full animate-pulse"></div>
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-slate-600/20 to-gray-600/20 rounded-full animate-ping"></div>
                        
                        <a 
                            href="/posts" 
                            className="relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-700 via-slate-700 to-gray-700 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold rounded-2xl transition-all duration-500 shadow-2xl hover:shadow-gray-500/25 transform hover:-translate-y-1 hover:scale-105"
                        >
                            <span className="mr-2">🚀</span>
                            Explore All Stories
                            <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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