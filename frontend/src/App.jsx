import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Footer from './pages/Footer';

function App() {
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
      <Outlet />
      <Footer/>
    </div>
  );
}

export default App;
