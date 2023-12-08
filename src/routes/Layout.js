import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../index.css";
import { useState } from "react";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
  <>
    <div className="flex flex-col md:flex-row">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
        <i className={`fa-solid ${ isMenuOpen ? "fa-circle-xmark" : "fa-bars"}`}></i>
      </button>
      <div className={`flex border-b-2 md:border-b-0 md:border-r-2 flex-col justify-between md:h-screen md:basis-1/4 p-8 md:block ${isMenuOpen ? "block" : "hidden"}`}>
        <Header />
        <Footer />
      </div>
      <main className="pt-8 flex items-center bg-slate-50 w-full">
        <Outlet />
      </main>
    </div>
  </>
)};

export default Layout;
