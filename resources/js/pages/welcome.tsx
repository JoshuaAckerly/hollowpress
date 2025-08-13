import React from 'react';
import Main from '@/layouts/main';


const Welcome: React.FC = () => {

    const cdn = import.meta.env.VITE_ASSET_URL;

    return (
        <Main>
            <section className="bg-[var(--background)] relative">
                <div className="absolute inset-0 ">
                    <img
                        src={`${cdn}/images/HollowPressLandingPageImage.webp`}
                        alt="Hollow Press Landing"
                        className="w-full h-auto mb-8 absolute"
                    />
                </div>
                <div className='flex flex-col items-center relative'>
                    <h2 className='bg-[var(--primary-foreground)] text-5xl  text-white p-2 rounded'>Hollow Press</h2>
                    <h3 className='bg-[var(--primary-foreground)] text-3xl text-white p-2 rounded'>Faith in Shadows</h3>
                    <button className='bg-[var(--background)] text-3xl text-white p-2 rounded'>Meet Our Artist</button>
                </div>
            </section>
            <section className="bg-[var(--foreground)] py-8">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-center text-white mb-4">About Hollow Press</h2>
                    <p className="text-lg text-center text-white">
                        Hollow Press is a creative studio dedicated to exploring the intersection of art and technology.
                    </p>
                </div>
            </section>
        </Main>
    );
};

export default Welcome;
