import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Root';
import './index.css';
import Login from './pages/Login';
import Registration from './pages/Registrarion';
import Menu from './pages/Menu';
import NavBar from './components/NavBar';
import Soup from './pages/Soup';
import Poke from './pages/Poke';
import Beverages from './pages/Beverages';
import Cart from './pages/Cart';
import About from './pages/About';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
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
