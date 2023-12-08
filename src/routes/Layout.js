import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../index.css';

const Layout = () => (
  <>
    <div className='flex'>
      <div className='flex flex-col justify-between h-screen basis-1/4 p-8'>
        <Header />
        <Footer />
      </div>
      <main className='flex items-center bg-slate-300 w-full'>
        <Outlet />
      </main>
    </div>
  </>
);

export default Layout;
