import React from 'react';
import Main from '@/layouts/main';


const Welcome: React.FC = () => {
    
    const cdn = import.meta.env.VITE_ASSET_URL;

    return (
        <Main>
            <section className="bg-[var(--background)] text-[var(--foreground)] relative">
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
                </div>
            </section>
        </Main>
    );
};

export default Welcome;