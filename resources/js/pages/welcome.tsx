import Main from '@/layouts/main';
import React from 'react';

interface Blog {
    img: string;
    id: number;
    name: string;
    description: string;
}
const cdn = import.meta.env.VITE_ASSET_URL;

const products: Blog[] = [
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

const Welcome: React.FC = () => {
    return (
        <Main>
            {/* Hero section with background image */}
            <section
                className="relative z-0 bg-[var(--background)] bg-cover bg-center"
                style={{
                    backgroundImage: `url(${cdn}/images/HollowPressLandingPageImage.webp)`,
                }}
            >
                <div className="flex flex-col items-center bg-black/50 py-24">
                    <h2 className="rounded bg-[var(--primary-foreground)] p-2 text-5xl text-white">Hollow Press</h2>
                    <h3 className="mt-4 rounded bg-[var(--primary-foreground)] p-2 text-3xl text-white">Faith in Shadows</h3>
                    <button className="mt-6 rounded bg-[var(--background)] p-2 text-3xl text-white">Meet Our Artist</button>
                </div>
            </section>

            {/* About section with mapped items */}
            <section className="bg-[var(--foreground)] py-8">
                <div className="container mx-auto">
                    <div className="flex justify-between">
                        <h4 className="mb-4 text-2xl font-bold text-white left-0">Featured Artist</h4>
                        <h4 className="mb-4 text-2xl font-bold text-white right-0 underline">View All</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <div key={product.id} className="rounded bg-[var(--background)] p-4">
                                <img src={product.img} alt={product.name} className="h-auto w-full rounded" />
                                <h4 className="text-xl font-bold text-white">{product.name}</h4>
                                <p className="text-lg text-white">{product.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Main>
    );
};

export default Welcome;
