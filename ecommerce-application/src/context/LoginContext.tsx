/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';
import LoginStatus from '../data/enums';
import { ILoginContext } from '../data/interfaces';

export const LoginContext = createContext<ILoginContext>({
    loginStatus: LoginStatus.anonim,
    loginMenu: () => {},
    logoutMenu: () => {},
});

export function LoginState({ children }: { children: React.ReactNode }) {
    const [loginStatus, setLogin] = useState(LoginStatus.anonim);

    const loginMenu = () => setLogin(LoginStatus.loggedIn);

    const logoutMenu = () => setLogin(LoginStatus.anonim);

    return <LoginContext.Provider value={{ loginStatus, loginMenu, logoutMenu }}>{children}</LoginContext.Provider>;
}
