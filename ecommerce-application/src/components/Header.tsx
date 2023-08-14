import { Link } from 'react-router-dom';
import Image from './ui/Image';
import Logo from '../assets/img/logo.svg';
import CreateIconButton from './ui/IconButton';
import { HeaderData } from '../data/data';

const headerBg =
    'bg-gradient-menu from-bgStart from-0% via-bgMid via-90% to-bgEnd to-100%';

export default function Header() {
    return (
        <header
            className={`
            w-full h-[100px] flex justify-between items-center
            bg-red-200 shadow-md ${headerBg} px-[30px] py-[5px]`}
        >
            <Link to="/">
                <Image
                    className="w-[220px] ml-[20px] mb-[15px]"
                    image={Logo}
                    alt="Logo"
                />
            </Link>
            <h1 className="font-serif text-[32px] leading-[90%] text-center">
                {HeaderData.titleLine1}
                <br />
                {HeaderData.titleLine2}
            </h1>
            <div>
                <h1 className="text-[32px] text-center leading-tight">
                    {HeaderData.subtitleLine1}
                </h1>
                <h3 className="text-[20px] text-center">
                    {HeaderData.subtitleLine2}
                </h3>
            </div>
            <div className="flex gap-1">
                <Link to="cart">
                    <CreateIconButton type="cart" size="large" />
                </Link>
                <Link to="login">
                    <CreateIconButton type="login" size="large" />
                </Link>
            </div>
        </header>
    );
}
