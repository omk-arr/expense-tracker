import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/ExpenseTrackerLanding';
import About from './pages/About';
import NotFound from './pages/NotFound';
import AuthPage from './pages/AuthPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'auth', element: <AuthPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
