import React from 'react';
import Main from '@/layouts/main';

const Welcome: React.FC = () => {
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