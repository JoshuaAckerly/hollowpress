import Footer from '@/components/footer';
import Header from '@/components/header';
import { useFlash } from '@/hooks/use-flash';
import React from 'react';
import { Toaster } from 'sonner';

const Main = ({ children }: { children: React.ReactNode }) => {
    useFlash();

    return (
        <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:rounded focus:bg-[var(--background)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:ring-2 focus:ring-current focus:outline-none"
            >
                Skip to content
            </a>
            <Header />
            <main id="main-content" className="flex-grow">{children}</main>
            <Footer />
            <Toaster position="bottom-right" richColors closeButton />
        </div>
    );
};
export default Main;
