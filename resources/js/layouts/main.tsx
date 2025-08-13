import React from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main className="flex-grow text-white">{children}</main>
      <Footer />
    </div>
  );
}
export default Main;
