import React, { MouseEvent, useEffect, useState } from 'react';
import { getLoginUrl } from '../env';

const MobileMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    return (
        <div className="relative">
            {/* Hamburger Button */}
            <button
                onClick={toggleMenu}
                aria-label="Toggle Menu"
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
                className="relative z-[9999] flex min-h-[44px] min-w-[44px] items-center justify-center text-[var(--foreground)] focus:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2"
            >
                <div className="space-y-2">
                    <span className={`block h-0.5 w-7 bg-current transition-transform ${isOpen ? 'translate-y-[10px] rotate-45' : ''}`} />
                    <span className={`block h-0.5 w-7 bg-current transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                    <span className={`block h-0.5 w-7 bg-current transition-transform ${isOpen ? '-translate-y-[10px] -rotate-45' : ''}`} />
                </div>
            </button>

            {/* Fullscreen Modal Menu */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-[9990] bg-[var(--background)] opacity-90 backdrop-blur-md"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Menu */}
                    <nav
                        id="mobile-nav"
                        className="fixed inset-0 z-[9995] flex items-center justify-center"
                        aria-label="Mobile navigation"
                        role="dialog"
                        aria-modal="true"
                    >
                        <ul className="flex flex-col space-y-4 text-center text-lg font-semibold">
                            <li>
                                <a className="text-gray-900 hover:underline dark:text-white" href="/" onClick={() => setIsOpen(false)}>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-900 hover:underline dark:text-white" href="/dashboard" onClick={() => setIsOpen(false)}>
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-900 hover:underline dark:text-white" href="/about" onClick={() => setIsOpen(false)}>
                                    About
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-900 hover:underline dark:text-white" href="/sponsored" onClick={() => setIsOpen(false)}>
                                    Sponsored Artist
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-900 hover:underline dark:text-white" href="/posts" onClick={() => setIsOpen(false)}>
                                    Blogs
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-900 hover:underline dark:text-white" href="/projects" onClick={() => setIsOpen(false)}>
                                    Projects
                                </a>
                            </li>
                            <li>
                                <a className="text-gray-900 hover:underline dark:text-white" href="/contact" onClick={() => setIsOpen(false)}>
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-gray-900 hover:underline dark:text-white"
                                    href={getLoginUrl('hollowpress')}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </a>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
};

export default MobileMenu;
