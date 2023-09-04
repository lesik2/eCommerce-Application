import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Root';
import './index.css';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import Menu from './pages/Menu/Menu';
import NavBar from './components/NavBar';
import Soup from './pages/Soup/Soup';
import Poke from './pages/Poke/Poke';
import Beverages from './pages/Beverages/Beverages';
import Cart from './pages/Cart/Cart';
import About from './pages/About/About';
import ErrorPage from './pages/Error/Error';
import Main from './pages/Main/Main';
import { ProductsState } from './context/ProductsContext';
import { ModalState } from './context/ModalContext';
import { LoginState } from './context/LoginContext';
import ProductPage from './pages/ProductPage/ProductPage';

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
                        path: '/',
                        element: <Main />,
                    },
                    {
                        path: 'menu',
                        element: <Menu />,
                    },
                    {
                        path: 'menu/:key',
                        element: <ProductPage />,
                    },
                    {
                        path: 'soup',
                        element: <Soup />,
                    },
                    {
                        path: 'soup/:key',
                        element: <ProductPage />,
                    },
                    {
                        path: 'poke',
                        element: <Poke />,
                    },
                    {
                        path: 'poke/:key',
                        element: <ProductPage />,
                    },
                    {
                        path: 'beverages',
                        element: <Beverages />,
                    },
                    {
                        path: 'beverages/:key',
                        element: <ProductPage />,
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
        <ModalState>
            <LoginState>
                <ProductsState>
                    <RouterProvider router={router} />
                </ProductsState>
            </LoginState>
        </ModalState>
    </React.StrictMode>
);
