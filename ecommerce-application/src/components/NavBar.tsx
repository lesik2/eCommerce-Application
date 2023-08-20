import { NavLink, Outlet } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { NavLinks } from '../data/data';
import List from './ui/List';

const FixedMenu = {
    menu: {
        title: 'MENU',
        id: 'link-fixed-menu',
        url: '/menu',
    },
    burger: {
        title: '-',
        id: 'link-fixed-burger',
        url: '/',
    },
    cart: {
        title: 'CART',
        id: 'link-fixed-cart',
        url: '/cart',
    },
    buttonStyle: 'w-[100px] h-[28px] p-0 text-lg rounded-2xl',
    burgerStyle: 'w-[36px] h-[28px] p-0 rounded-md',
    activeStyle: 'rounded-2xl bg-bntActive hover:none',
    inactiveStyle: 'rounded-2xl bg-menuBtnColor hover:bg-menuBtnColorHover',
    burgerSpanStyle: 'block h-0.5 w-5 m-auto bg-white',
};

export default function NavBar() {
    return (
        <>
            <nav className="hidden h-[70px] px-[10px] py-[10px] items-center bg-bgMenu md:flex">
                <ul className="w-full mx-[60px] font-serif text-xl text-white flex justify-items-start gap-[3%] lg:text-2xl lg:gap-[5%]">
                    {NavLinks.map((navlink) => (
                        <NavLink
                            to={navlink.url}
                            className={({ isActive }) =>
                                isActive
                                    ? 'px-[15px] py-[5px] rounded-3xl hover:none cursor-auto bg-bntActive last:ml-auto'
                                    : 'px-[15px] py-[5px] rounded-3xl hover:bg-btnHover cursor-pointer last:ml-auto'
                            }
                            key={navlink.id}
                        >
                            <List className="">{navlink.name}</List>
                        </NavLink>
                    ))}
                </ul>
            </nav>
            <Outlet />
            <nav className="fixed bottom-0 font-serif w-full h-[50px] flex justify-around items-center bg-bgMenu md:hidden">
                <NavLink
                    to={FixedMenu.menu.url}
                    className={({ isActive }) => (isActive ? `${FixedMenu.activeStyle}` : `${FixedMenu.inactiveStyle}`)}
                    key={FixedMenu.menu.id}
                >
                    <Button variant="filled" className={`${FixedMenu.buttonStyle}`}>
                        {FixedMenu.menu.title}
                    </Button>
                </NavLink>

                <NavLink
                    to={FixedMenu.burger.url}
                    className={({ isActive }) => (isActive ? `${FixedMenu.activeStyle}` : `${FixedMenu.inactiveStyle}`)}
                    key={FixedMenu.burger.id}
                >
                    <Button variant="filled" className={`${FixedMenu.burgerStyle}`}>
                        <div className="space-y-1">
                            <span className={`${FixedMenu.burgerSpanStyle}`} />
                            <span className={`${FixedMenu.burgerSpanStyle}`} />
                            <span className={`${FixedMenu.burgerSpanStyle}`} />
                        </div>
                    </Button>
                </NavLink>
                <NavLink
                    to={FixedMenu.cart.url}
                    className={({ isActive }) => (isActive ? `${FixedMenu.activeStyle}` : `${FixedMenu.inactiveStyle}`)}
                    key={FixedMenu.cart.id}
                >
                    <Button variant="filled" className={`${FixedMenu.buttonStyle}`}>
                        {FixedMenu.cart.title}
                    </Button>
                </NavLink>
            </nav>
        </>
    );
}
