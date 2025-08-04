import React from 'react';

const Footer: React.FC = () => (
    <footer className="py-6 bg-[var(--background)] border-t border-border">
        <div className="container text-center muted">
            <p>&copy; {new Date().getFullYear()} Hollow Press. All rights reserved.</p>
        </div>
    </footer>
);

export default Footer;
