import React from 'react';

const Footer: React.FC = () => (
    <footer className="border-t border-border bg-[var(--background)] py-6">
        <div className="muted container text-center">
            <p>&copy; {new Date().getFullYear()} Hollow Press. All rights reserved.</p>
        </div>
    </footer>
);

export default Footer;
