import Main from '@/layouts/main';
import React from 'react';
const cdn = import.meta.env.VITE_ASSET_URL;

interface Artist {
    img: string;
    id: number;
    name: string;
    description: string;
}

interface Blogs {
    img: string;
    id: number;
    title: string;
    content: string;
}

const products: Artist[] = [
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

const blogs: Blogs[] = [
    {
        img: `${cdn}/images/AdobeStock_1423234483.webp`,
        id: 1,
        title: 'Blog Post 1',
        content: 'This is the content for blog post 1.',
    },
    {
        img: `${cdn}/images/eviltranscendencealbumcoversleekdigitalrenderforthealbumbeyondrealitiesstyle.generativeAI copy.webp`,
        id: 2,
        title: 'Blog Post 2',
        content: 'This is the content for blog post 2.',
    },
    {
        img: `${cdn}/images/VintageoldblurreddustedabstractbackgroundWornmusicAlbumCoverwithRingwearSquareimage.EasytoaddasOverlayorScreenFilter.IdealperfectForposterflyerormusicalbumcoverdesign.webp`,
        id: 3,
        title: 'Blog Post 3',
        content: 'This is the content for blog post 3.',
    },
];

const Welcome: React.FC = () => {
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
                                <a className="btn btn-primary" href="#about">Meet Our Artist</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About section with mapped items */}
            <section id="about" className="py-12">
                <div className="container">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="heading">Featured Artist</h4>
                        <a className="muted underline" href="#">View All</a>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <div key={product.id} className="card text-center">
                                <img src={product.img} alt={product.name} className="h-48 w-full object-cover rounded" />
                                <h4 className="mt-4 text-xl font-bold">{product.name}</h4>
                                <p className="mt-2 muted">{product.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="blogs" className="py-12">
                <div className="container">
                    <h4 className="heading">Latest Blogs</h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        {blogs.map((blog) => (
                            <div key={blog.id} className="card">
                                <img src={blog.img} alt={blog.title} className="h-40 w-full object-cover rounded" />
                                <h4 className="mt-3 text-lg font-semibold">{blog.title}</h4>
                                <p className="mt-2 muted">{blog.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </Main>
    );
};

export default Welcome;
