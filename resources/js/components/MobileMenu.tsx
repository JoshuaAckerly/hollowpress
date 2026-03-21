import React, { MouseEvent, useState } from 'react';
import { getLoginUrl } from '../env';

const MobileMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            {/* Hamburger Button */}
            <button
                onClick={toggleMenu}
                aria-label="Toggle Menu"
                aria-expanded={isOpen}
                className="relative z-[9999] text-[var(--foreground)] focus:outline-none"
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
                    />

                    {/* Menu */}
                    <nav className="fixed inset-0 z-[9995] flex items-center justify-center" aria-label="Mobile navigation">
                        <ul className="flex flex-col space-y-4 text-center text-lg font-semibold">
                            <li><a className="text-gray-900 dark:text-white hover:underline" href="/" onClick={() => setIsOpen(false)}>Home</a></li>
                            <li><a className="text-gray-900 dark:text-white hover:underline" href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</a></li>
                            <li><a className="text-gray-900 dark:text-white hover:underline" href="/about" onClick={() => setIsOpen(false)}>About</a></li>
                            <li><a className="text-gray-900 dark:text-white hover:underline" href="/case-studies" onClick={() => setIsOpen(false)}>Case Studies</a></li>
                            <li><a className="text-gray-900 dark:text-white hover:underline" href="/sponsored" onClick={() => setIsOpen(false)}>Sponsored Artist</a></li>
                            <li><a className="text-gray-900 dark:text-white hover:underline" href="/posts" onClick={() => setIsOpen(false)}>Blogs</a></li>
                            <li><a className="text-gray-900 dark:text-white hover:underline" href="/contact" onClick={() => setIsOpen(false)}>Contact</a></li>
                            <li><a className="text-gray-900 dark:text-white hover:underline" href={getLoginUrl('hollowpress')} onClick={() => setIsOpen(false)}>Login</a></li>
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
};

export default MobileMenu;
