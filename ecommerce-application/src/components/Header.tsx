/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Image from './ui/Image';
import Logo from '../assets/img/logo.svg';
import CreateIconButton from './ui/IconButton';
import { ANIM_TIME, HeaderData } from '../data/data';
import { ModalContext } from '../context/ModalContext';
import Modal from './Modal';
import { LoginContext } from '../context/LoginContext';
import { LoginStatus } from '../data/enums';
import logout from '../services/logout';

const headerBg = 'bg-gradient-menu from-bgStart from-0% via-bgMid via-90% to-bgEnd to-100%';

export default function Header() {
    const { userMenuStatus, openUserMenu, closeUserMenu } = useContext(ModalContext);

    const { loginStatus, loginMenu, logoutMenu } = useContext(LoginContext);

    const [userMenu, setUserMenu] = useState(false);

    const [isMenuShowed, showMenu] = useState(false);

    const navigate = useNavigate();

    const checkLoginStatus = () => {
        if (localStorage.getItem('token') && localStorage.getItem('status') === 'loggedIn') {
            loginMenu();
        }
    };

    const handleLogout = () => {
        logoutMenu();
        closeUserMenu();
        logout();
        navigate('../');
    };

    useEffect(() => {
        checkLoginStatus();
    });

    useEffect(() => {
        if (userMenuStatus) {
            setUserMenu(true);
            setTimeout(() => {
                showMenu(true);
            }, ANIM_TIME);
        } else {
            showMenu(false);
            setTimeout(() => {
                setUserMenu(false);
            }, ANIM_TIME);
        }
    }, [userMenuStatus]);

    return (
        <header
            className={`
            w-full h-[70px] flex justify-between items-center
            bg-red-200 shadow-xl ${headerBg} px-[10px] py-[5px] sm:px-[30px] sm:h-[80px] md:h-[100px]`}
        >
            <Link to="/">
                <Image
                    className="w-[120px] mb-[10px] sm:w-[170px] sm:ml-[15px] md:w-[220px] md:ml-[20px] md:mb-[15px]"
                    image={Logo}
                    alt="Logo"
                />
            </Link>
            <h1 className="hidden font-serif text-[32px] leading-[90%] text-center lg:block">
                {HeaderData.titleLine1}
                <br />
                {HeaderData.titleLine2}
            </h1>
            <div>
                <h1 className="text-[16px] text-center leading-tight sm:text-[24px] md:text-[32px]">
                    {HeaderData.subtitleLine1}
                </h1>
                <h3 className="text-[10px] text-center sm:text-[15px] md:text-[20px]">{HeaderData.subtitleLine2}</h3>
            </div>
            <div className="flex gap-1">
                <Link className="hidden md:block" to="cart">
                    <CreateIconButton type="cart" size="large" />
                </Link>
                {loginStatus === LoginStatus.anonim && (
                    <Link to="login">
                        <CreateIconButton type="login" size="large" />
                    </Link>
                )}
                {loginStatus === LoginStatus.loggedIn && (
                    <div onClick={openUserMenu}>
                        <CreateIconButton type="logged" size="large" />
                    </div>
                )}
            </div>
            {userMenu && (
                <Modal onClose={closeUserMenu}>
                    <div
                        className={`absolute w-[320px] px-5 py-3 text-center rounded-md bg-white/95 top-[60px] right-0 z-20 transition-all duration-${ANIM_TIME} ${
                            isMenuShowed ? 'right-0' : 'right-[-320px]'
                        }`}
                    >
                        <h3 className="mb-5">Hello, Username!</h3>
                        <Link
                            className="flex items-center gap-2 text-left text-serif py-2 text-xl hover:underline"
                            to="../profile"
                            onClick={closeUserMenu}
                        >
                            <PersonIcon fontSize="small" />
                            Profile
                        </Link>
                        <div
                            className="flex items-center gap-2 text-left text-serif py-2 cursor-pointer text-xl hover:underline"
                            onClick={handleLogout}
                        >
                            <LogoutIcon fontSize="small" />
                            Logout
                        </div>
                    </div>
                </Modal>
            )}
        </header>
    );
}
