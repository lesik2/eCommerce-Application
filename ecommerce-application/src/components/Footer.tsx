import Image from './ui/Image';
import LogoFooter from '../assets/img/footer_logo.svg';
import { FooterData } from '../data/data';

export default function Footer() {
    return (
        <footer
            className={`
        w-full h-[95px] border-b-[50px] border-bgBody flex justify-between items-center
        bg-bgFooter shadow-md px-[10px] py-[5px] sm:px-[30px] sm:h-[100px] md:px-[40px] md:h-[80px] md:border-b-[25px]`}
        >
            <Image className="w-[35px] sm:w-[40px] md:w-[50px]" image={LogoFooter} alt="Logo" />
            <div className="text-white text-center leading-3 sm:leading-4">
                <div className="text-xs sm:text-sm md:mt-1 md:text-m">{FooterData.titleLine}</div>
                <div className="text-sm sm:text-base md:text-xl">{FooterData.subtitleLine}</div>
            </div>
        </footer>
    );
}
