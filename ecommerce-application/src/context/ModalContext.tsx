/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import { IModalContext } from '../data/interfaces';

export const ModalContext = createContext<IModalContext>({
    userMenuStatus: false,
    openUserMenu: () => {},
    closeUserMenu: () => {},
    navMenuStatus: false,
    openNavMenu: () => {},
    closeNavMenu: () => {},
    filterMenuStatus: false,
    openFilterMenu: () => {},
    closeFilterMenu: () => {},
});

export function ModalState({ children }: { children: React.ReactNode }) {
    const [userMenuStatus, setUserMenu] = useState(false);
    const [navMenuStatus, setNavMenu] = useState(false);
    const [filterMenuStatus, setFilterMenu] = useState(false);

    const openUserMenu = () => setUserMenu(true);

    const closeUserMenu = () => setUserMenu(false);

    const openNavMenu = () => setNavMenu(true);

    const closeNavMenu = () => setNavMenu(false);

    const openFilterMenu = () => setFilterMenu(true);

    const closeFilterMenu = () => setFilterMenu(false);

    return (
        <ModalContext.Provider
            value={{
                userMenuStatus,
                openUserMenu,
                closeUserMenu,
                navMenuStatus,
                openNavMenu,
                closeNavMenu,
                filterMenuStatus,
                openFilterMenu,
                closeFilterMenu,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}
