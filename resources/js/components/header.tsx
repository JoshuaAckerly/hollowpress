import React from 'react';
import ApplicationLogo from '@/components/ApplicationLogo';

const Header: React.FC = () => {
    return (
        <header className="bg-[var(--background)] p-4">
            <ApplicationLogo />
            <nav>
                <ul className="flex space-x-4 justify-center">
                    <li><a href="/">Home</a></li>
                    <li><a href="/#about">About</a></li>
                    <li><a href="/#contact">Sponsored Artist</a></li>
                    <li><a href="/#blogs">Blogs</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
