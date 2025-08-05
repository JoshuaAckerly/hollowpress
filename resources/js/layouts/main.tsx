import React from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
export default Main;