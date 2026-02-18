
import React from 'react';
import ApplicationLogo from '@/components/ApplicationLogo';
import { getLoginUrl } from '../env';

const Header: React.FC = () => {
    return (
        <header className="bg-[var(--background)] border-b border-border">
            <div className="container flex items-center justify-between py-4">
                <ApplicationLogo />
                <nav aria-label="Main navigation">
                    <ul className="flex space-x-6 text-sm">
                        <li><a className="hover:underline" href="/">Home</a></li>
                        <li><a className="hover:underline" href="/dashboard">Dashboard</a></li>
                        <li><a className="hover:underline" href="/about">About</a></li>
                        <li><a className="hover:underline" href="/case-studies">Case Studies</a></li>
                        <li><a className="hover:underline" href="/sponsored">Sponsored Artist</a></li>
                        <li><a className="hover:underline" href="/posts">Blogs</a></li>
                        <li><a className="hover:underline" href="/contact">Contact</a></li>
                        <li><a className="hover:underline" href={getLoginUrl('hollowpress')}>Login</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
