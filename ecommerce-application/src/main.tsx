import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Root';
import './index.css';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registrarion';
import Menu from './pages/Menu/Menu';
import NavBar from './components/NavBar';
import Soup from './pages/Soup/Soup';
import Poke from './pages/Poke/Poke';
import Beverages from './pages/Beverages/Beverages';
import Cart from './pages/Cart/Cart';
import About from './pages/About/About';
import ErrorPage from './pages/Error/Error';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <NavBar />,
                children: [
                    {
                        path: 'menu',
                        element: <Menu />,
                    },
                    {
                        path: 'soup',
                        element: <Soup />,
                    },
                    {
                        path: 'poke',
                        element: <Poke />,
                    },
                    {
                        path: 'beverages',
                        element: <Beverages />,
                    },
                    {
                        path: 'cart',
                        element: <Cart />,
                    },
                    {
                        path: 'about',
                        element: <About />,
                    },
                ],
            },
            {
                path: 'registration',
                element: <Registration />,
            },
            {
                path: 'login',
                element: <Login />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
