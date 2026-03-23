import ApplicationLogo from '@/components/ApplicationLogo';
import MobileMenu from '@/components/MobileMenu';
import NotificationBell from '@/components/NotificationBell';
import React from 'react';
import { getLoginUrl } from '../env';

const Header: React.FC = () => {
    return (
        <header className="border-b border-border bg-[var(--background)]">
            <div className="container flex items-center justify-between py-4">
                <ApplicationLogo />

                {/* Desktop nav */}
                <nav aria-label="Main navigation" className="hidden md:flex md:items-center md:gap-4">
                    <ul className="flex space-x-6 text-sm">
                        <li>
                            <a className="hover:underline" href="/">
                                Home
                            </a>
                        </li>
                        <li>
                            <a className="hover:underline" href="/dashboard">
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a className="hover:underline" href="/about">
                                About
                            </a>
                        </li>
                        <li>
                            <a className="hover:underline" href="/case-studies">
                                Case Studies
                            </a>
                        </li>
                        <li>
                            <a className="hover:underline" href="/sponsored">
                                Sponsored Artist
                            </a>
                        </li>
                        <li>
                            <a className="hover:underline" href="/posts">
                                Blogs
                            </a>
                        </li>
                        <li>
                            <a className="hover:underline" href="/contact">
                                Contact
                            </a>
                        </li>
                        <li>
                            <a className="hover:underline" href={getLoginUrl('hollowpress')}>
                                Login
                            </a>
                        </li>
                    </ul>
                    <NotificationBell />
                </nav>

                {/* Mobile nav */}
                <div className="md:hidden">
                    <MobileMenu />
                </div>
            </div>
        </header>
    );
};

export default Header;
