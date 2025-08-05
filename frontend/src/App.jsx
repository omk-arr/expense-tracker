import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Footer from './pages/Footer';
import ExpenseTrackerLanding from './pages/Dashboard';
import Navbar from './pages/Navbar';
import useAppStore from './store/useAppStore';
import { useEffect } from 'react';

function App() {
  const isAuthenticated = !!localStorage.getItem('authToken');

  const setIsMobile = useAppStore((state) => state.setIsMobile);

  useEffect(() => {
    const isMobileDevice = window.innerWidth <= 640;
    setIsMobile(isMobileDevice);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobile]);

  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      {isAuthenticated ? (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      ) : (
        <Outlet/>
      )}
    </div>
  );
}

export default App;
