/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Image from './ui/Image';
import Logo from '../assets/img/logo.svg';
import CreateIconButton from './ui/IconButton';
import { HeaderData } from '../data/data';
import { ModalContext } from '../context/ModalContext';
import Modal from './Modal';
import { LoginContext } from '../context/LoginContext';
import LoginStatus from '../data/enums';
import logout from '../services/logout';

const headerBg = 'bg-gradient-menu from-bgStart from-0% via-bgMid via-90% to-bgEnd to-100%';

export default function Header() {
    // const [openUser, setOpenUser] = useState(false);

    const { modalStatus, openModal, closeModal } = useContext(ModalContext);

    const { loginStatus, loginMenu, logoutMenu } = useContext(LoginContext);

    const navigate = useNavigate();

    const checkLoginStatus = () => {
        if (localStorage.getItem('token') && localStorage.getItem('status') === 'loggedIn') {
            loginMenu();
        }
    };
    const handleUserMenu = () => {
        // setOpenUser(!openUser);
        if (modalStatus) {
            closeModal();
        } else {
            openModal();
        }
    };

    const handleLogout = () => {
        logoutMenu();
        closeModal();
        logout();
        navigate('../');
    };

    useEffect(() => {
        checkLoginStatus();
    });

    // checkLoginStatus();

    return (
        <header
            className={`
            w-full h-[70px] flex justify-between items-center
            bg-red-200 shadow-md ${headerBg} px-[10px] py-[5px] sm:px-[30px] sm:h-[80px] md:h-[100px]`}
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
                    <div onClick={handleUserMenu}>
                        <CreateIconButton type="logged" size="large" />
                    </div>
                )}
            </div>
            {modalStatus && (
                <Modal onClose={closeModal}>
                    <div className="w-[320px] px-3 py-3 text-center rounded-md bg-white/95 absolute top-[60px] right-0 z-10">
                        <h3 className="mb-5">Hello, Username!</h3>
                        <span onClick={handleLogout}>
                            <CreateIconButton type="logout" size="large" />
                        </span>
                    </div>
                </Modal>
            )}
        </header>
    );
}
