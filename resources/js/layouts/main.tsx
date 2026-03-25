import Footer from '@/components/footer';
import Header from '@/components/header';
import React from 'react';

const Main = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
};
export default Main;
