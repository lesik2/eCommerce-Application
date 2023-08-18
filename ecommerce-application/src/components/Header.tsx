import { Link } from 'react-router-dom';
import Image from './ui/Image';
import Logo from '../assets/img/logo.svg';
import CreateIconButton from './ui/IconButton';
import { HeaderData } from '../data/data';

const headerBg = 'bg-gradient-menu from-bgStart from-0% via-bgMid via-90% to-bgEnd to-100%';

export default function Header() {
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
                <Link to="login">
                    <CreateIconButton type="login" size="large" />
                </Link>
            </div>
        </header>
    );
}
