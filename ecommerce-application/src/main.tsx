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
import Beverages from './pages/Beverages/Beverages';
import Cart from './pages/Cart/Cart';
import About from './pages/About/About';
import ErrorPage from './pages/Error/Error';
import Main from './pages/Main/Main';
import { ProductsState } from './context/ProductsContext';
import { ModalState } from './context/ModalContext';
import { LoginState } from './context/LoginContext';
import Profile from './pages/Profile/Profile';
import { PRODUCT_PAGES } from './data/data';
import ProductPage from './pages/ProductPage/ProductPage';
import Maindish from './pages/Maindish/Maindish';
import { CartState } from './context/CartContext';
import Maindish from './pages/Maindish/Maindish';

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
                        element: <Soup {...PRODUCT_PAGES.Soup} />,
                    },
                    {
                        path: 'soup/broth',
                        element: <Soup {...PRODUCT_PAGES.Broth} />,
                    },
                    {
                        path: 'soup/broth/:key',
                        element: <ProductPage />,
                    },
                    {
                        path: 'soup/ramen/:key',
                        element: <ProductPage />,
                    },
                    {
                        path: 'soup/ramen',
                        element: <Soup {...PRODUCT_PAGES.Ramen} />,
                    },
                    {
                        path: 'soup/:key',
                        element: <ProductPage />,
                    },
                    {
                        path: 'maindish',
                        element: <Maindish {...PRODUCT_PAGES.Maindish} />,
                    },
                    {
                        path: 'maindish/:key',
                        element: <ProductPage />,
                    },
                    {
                        path: 'maindish/poke',
                        element: <Maindish {...PRODUCT_PAGES.Poke} />,
                    },
                    {
                        path: 'maindish/poke/:key',
                        element: <ProductPage />,
                    },
                    {
                        path: 'maindish/wok',
                        element: <Maindish {...PRODUCT_PAGES.Wok} />,
                    },
                    {
                        path: 'maindish/wok/:key',
                        element: <ProductPage />,
                    },
                    {
                        path: 'maindish/sides',
                        element: <Maindish {...PRODUCT_PAGES.Sides} />,
                    },
                    {
                        path: 'maindish/sides/:key',
                        element: <ProductPage />,
                    },
                    {
                        path: 'beverages',
                        element: <Beverages {...PRODUCT_PAGES.Beverages} />,
                    },
                    {
                        path: 'beverages/juices',
                        element: <Beverages {...PRODUCT_PAGES.Juices} />,
                    },
                    {
                        path: 'beverages/juices/:key',
                        element: <ProductPage />,
                    },
                    {
                        path: 'beverages/energetics',
                        element: <Beverages {...PRODUCT_PAGES.Energetic} />,
                    },
                    {
                        path: 'beverages/energetics/:key',
                        element: <ProductPage />,
                    },
                    {
                        path: 'beverages/soda',
                        element: <Beverages {...PRODUCT_PAGES.Soda} />,
                    },
                    {
                        path: 'beverages/soda/:key',
                        element: <ProductPage />,
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
                    {
                        path: 'profile',
                        element: <Profile />,
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
                    <CartState>
                        <RouterProvider router={router} />
                    </CartState>
                </ProductsState>
            </LoginState>
        </ModalState>
    </React.StrictMode>
);
