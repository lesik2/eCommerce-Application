/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { NavLink, Outlet } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { ANIM_TIME, NavLinks } from '../data/data';
import List from './ui/List';
import { ModalContext } from '../context/ModalContext';
import Modal from './Modal';
import CreateIconButton from './ui/IconButton';

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

    const [dropdown, setDropdown] = useState(false);

    const [navMenu, setNavMenu] = useState(false);

    const [isNavMenuShowed, showNavMenu] = useState(false);

    const haveDropDown = useRef(true);

    const onMouseEnter = () => {
        setDropdown(true);
    };

    const onMouseLeave = () => {
        setDropdown(false);
    };

    const onArrow = () => {
        setDropdown(!dropdown);
    };

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
                <ul className="w-full mx-[40px] font-serif text-xl text-white flex justify-items-start gap-[3%] lg:mx-[50px] lg:text-2xl lg:gap-[5%]">
                    {NavLinks.map((navlink) => (
                        <div
                            className="relative last:ml-auto"
                            onMouseEnter={navlink.name === 'BEVERAGES' ? onMouseEnter : undefined}
                            onMouseLeave={navlink.name === 'BEVERAGES' ? onMouseLeave : undefined}
                            key={navlink.id}
                        >
                            <NavLink
                                to={navlink.url}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'flex flex-col gap-1 px-[15px] py-[5px] rounded-3xl hover:bg-bntActive/80  cursor-pointer bg-bntActive'
                                        : 'flex flex-col gap-1 px-[15px] py-[5px] rounded-3xl hover:bg-btnHover cursor-pointer'
                                }
                            >
                                <List className="flex items-center gap-1">
                                    {navlink.name}
                                    {navlink.menu !== undefined && <CreateIconButton type="arrow" size="small" />}
                                </List>
                            </NavLink>
                            {navlink.menu !== undefined && haveDropDown.current && (
                                <ul
                                    className={`absolute left-1/2 w-auto px-[20px] py-[5px] rounded-3xl bg-btnHover z-20 ${
                                        dropdown ? 'top-8 visible opacity-100' : 'top-0 invisible opacity-0'
                                    }`}
                                >
                                    {navlink.menu.map((l) => (
                                        <NavLink
                                            key={l}
                                            className={({ isActive }) => (isActive ? 'underline' : '')}
                                            to={`beverages/${l.toLowerCase()}`}
                                        >
                                            <li className="hover:underline">{l}</li>
                                        </NavLink>
                                    ))}
                                </ul>
                            )}
                        </div>
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
                        className={`fixed top-0 left-0 items-center w-[320px] h-full px-[10px] py-20 bg-bgMenu/75 z-20 transition-all duration-${ANIM_TIME} ${
                            navMenu ? 'left-0' : 'left-[-320px]'
                        }`}
                    >
                        <ul className="w-full font-serif text-2xl text-white flex flex-col items-center gap-3">
                            {NavLinks.map((navlink) => (
                                <div className="relative flex gap-1" key={navlink.id}>
                                    <NavLink
                                        to={navlink.url}
                                        onClick={closeNavMenu}
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'px-[15px] py-[5px] rounded-3xl hover:none bg-bntActive'
                                                : 'px-[15px] py-[5px] rounded-3xl hover:bg-bgBody cursor-pointer'
                                        }
                                        key={navlink.id}
                                    >
                                        <List className="">{navlink.name}</List>
                                    </NavLink>
                                    {navlink.menu !== undefined && (
                                        <CreateIconButton
                                            type="arrow"
                                            size="small"
                                            hoverColor="#D9D9D9"
                                            onClick={onArrow}
                                        />
                                    )}
                                    {navlink.menu !== undefined && haveDropDown.current && (
                                        <ul
                                            className={`absolute left-full w-auto px-[20px] py-[5px] rounded-3xl bg-gray-400 transition-all duration-${ANIM_TIME} ${
                                                dropdown ? 'top-4 visible opacity-100' : 'top-0 invisible opacity-0'
                                            }
                                      }`}
                                        >
                                            {navlink.menu.map((l) => (
                                                <NavLink
                                                    key={l}
                                                    className={({ isActive }) => (isActive ? 'underline' : '')}
                                                    onClick={closeNavMenu}
                                                    to={`beverages/${l.toLowerCase()}`}
                                                >
                                                    <li className="hover:underline">{l}</li>
                                                </NavLink>
                                            ))}
                                        </ul>
                                    )}
                                </div>
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
