import Footer from '@/components/footer';
import Header from '@/components/header';
import { useFlash } from '@/hooks/use-flash';
import React from 'react';
import { Toaster } from 'sonner';

const Main = ({ children }: { children: React.ReactNode }) => {
    useFlash();

    return (
        <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster position="bottom-right" richColors closeButton />
        </div>
    );
};
export default Main;
