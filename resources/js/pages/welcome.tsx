import React from 'react';
import Main from '@/layouts/main';


const Welcome: React.FC = () => {
    
    const cdn = import.meta.env.VITE_ASSET_URL;
    console.log('CDN:', import.meta.env.VITE_ASSET_URL);
console.log('All ENV:', import.meta.env);


    return (
        <Main>
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>Welcome to Hollow Press</h2>
                <p>Your gateway to amazing content.</p>
            </div>
        </Main>
    );
};

export default Welcome;