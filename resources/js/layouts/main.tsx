import React from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
export default Main;
