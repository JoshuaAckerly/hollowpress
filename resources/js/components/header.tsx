import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-[var(--background)] text-[var(--foreground)] p-4">
            <h1>Website Title</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;