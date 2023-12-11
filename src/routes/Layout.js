import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../index.css';

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <button type="button" aria-label="Navbar" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
          <i className={`fa-solid ${isMenuOpen ? 'fa-circle-xmark' : 'fa-bars'}`} />
        </button>
        <div className={`flex border-b-2 md:border-b-0 md:border-r-2 flex-col justify-between md:h-screen md:basis-1/4 p-8 md:block ${isMenuOpen ? 'block' : 'hidden'}`}>
          <Header />
          <Footer />
        </div>
        <main className="py-12 flex items-center w-full">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
