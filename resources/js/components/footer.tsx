import React from 'react';

const Footer: React.FC = () => (
    <footer className="py-4 text-center bg-[var(--background)]  left-0 w-full">
        <p>&copy; {new Date().getFullYear()} Hollow Press. All rights reserved.</p>
    </footer>
);

export default Footer;
