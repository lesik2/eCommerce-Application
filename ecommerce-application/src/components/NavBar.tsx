/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { NavLink, Outlet } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { useContext, useEffect, useState } from 'react';
import { ANIM_TIME, NavLinks } from '../data/data';
import { ModalContext } from '../context/ModalContext';
import Modal from './Modal';
import CreateIconButton from './ui/IconButton';
import SubMenuItem from './ui/SubMenuItem';

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
    burgerStyle: 'w-[36px] h-[28px] p-0 rounded-md bg-menuBtnColor hover:bg-menuBtnColorHover',
    activeStyle: 'rounded-2xl bg-bntActive hover:none',
    inactiveStyle: 'rounded-2xl bg-menuBtnColor hover:bg-menuBtnColorHover',
    burgerSpanStyle: 'block h-0.5 w-5 m-auto bg-white',
};

export default function NavBar() {
    const { navMenuStatus, openNavMenu, closeNavMenu } = useContext(ModalContext);

    const [navMenu, setNavMenu] = useState(false);

    const [isNavMenuShowed, showNavMenu] = useState(false);

    useEffect(() => {
        if (navMenuStatus) {
            showNavMenu(true);
            setTimeout(() => {
                setNavMenu(true);
            }, ANIM_TIME);
        } else {
            setNavMenu(false);
            setTimeout(() => {
                showNavMenu(false);
            }, ANIM_TIME);
        }
    }, [navMenuStatus]);

    return (
        <>
            <nav className="relative hidden h-[70px] px-[10px] py-[10px] items-center bg-bgMenu md:flex">
                <ul className="w-full mx-[40px] font-serif text-xl text-white flex justify-items-start gap-[2%] lg:mx-[50px] lg:text-2xl lg:gap-[5%]">
                    {NavLinks.map((navlink) => (
                        <SubMenuItem item={navlink} type="main" key={navlink.id} />
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
                <Button variant="filled" onClick={openNavMenu} className={`${FixedMenu.burgerStyle}`}>
                    <div className="space-y-1">
                        <span className={`${FixedMenu.burgerSpanStyle}`} />
                        <span className={`${FixedMenu.burgerSpanStyle}`} />
                        <span className={`${FixedMenu.burgerSpanStyle}`} />
                    </div>
                </Button>
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
            {isNavMenuShowed && (
                <Modal onClose={closeNavMenu}>
                    <nav
                        className={`fixed top-0 left-0 items-center w-[320px] h-full px-[10px] py-20 bg-bgMenu/75 z-50 transition-all duration-${ANIM_TIME} ${
                            navMenu ? 'left-0' : 'left-[-320px]'
                        }`}
                    >
                        <ul className="w-full font-serif text-2xl text-white flex flex-col items-center gap-3">
                            {NavLinks.map((navlink) => (
                                <SubMenuItem item={navlink} type="aside" key={navlink.id} onClose={closeNavMenu} />
                            ))}
                        </ul>
                        <div onClick={closeNavMenu} className="absolute top-6 right-6 text-white">
                            <CreateIconButton type="close" size="large" />
                        </div>
                    </nav>
                </Modal>
            )}
        </>
    );
}
