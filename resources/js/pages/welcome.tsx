import React from 'react';
import Main from '@/layouts/main';

interface Blog {
  id: number;
  name: string;
  description: string;
}

const products: Blog[] = [
  { id: 1, name: "Velvet Pulse", description: "A deep dive into the world of velvet textures." },
  { id: 2, name: "SynthVeil", description: "Exploring the ethereal sounds of synth music." },
  { id: 3, name: "Lunar Blood", description: "A journey through the phases of the moon." },
];

const Welcome: React.FC = () => {
  const cdn = import.meta.env.VITE_ASSET_URL;

  return (
    <Main>
      {/* Hero section with background image */}
      <section
        className="bg-[var(--background)] relative z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${cdn}/images/HollowPressLandingPageImage.webp)`,
        }}
      >
        <div className="flex flex-col items-center py-24 bg-black/50">
          <h2 className="bg-[var(--primary-foreground)] text-5xl text-white p-2 rounded">
            Hollow Press
          </h2>
          <h3 className="bg-[var(--primary-foreground)] text-3xl text-white p-2 rounded mt-4">
            Faith in Shadows
          </h3>
          <button className="bg-[var(--background)] text-3xl text-white p-2 rounded mt-6">
            Meet Our Artist
          </button>
        </div>
      </section>

      {/* About section with mapped items */}
      <section className="bg-[var(--foreground)] py-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-4">
            About Hollow Press
          </h2>
          <p className="text-lg text-center text-white mb-8">
            Hollow Press is a creative studio dedicated to exploring the intersection of art and technology.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-[var(--background)] p-4 rounded"
              >
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
