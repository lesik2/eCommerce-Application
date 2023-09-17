import { Link } from 'react-router-dom';

function Main() {
    const PROMO_TEXT = ['Apply Promo Code ', ' and get ', ' discount'];
    const promoCode = "'yummy'";
    const discount = '10%';

    return (
        <div className="relative h-full bg-[url('./assets/img/bg_main.png')] bg-cover">
            <div className="absolute top-1/3 left-0 w-full flex justify-center animate-bounce ">
                <Link
                    to="/menu"
                    className="w-fit text-center font-serif tracking-wider py-2 text-6xl text-white transition-all duration-[500ms] ease-out hover:text-mainRed hover:underline"
                >
                    Try our <span className="text-mainRed">Chilli</span> menu!
                </Link>
            </div>
            <div className="absolute w-full bottom-6 left-0 h-8 bg-white">
                <div className="absolute top-1 w-full whitespace-nowrap animate-ticker">
                    {PROMO_TEXT[0]}
                    <span className="text-mainRed">{promoCode}</span>
                    {PROMO_TEXT[1]}
                    <span className="text-mainRed">{discount}</span>
                    {PROMO_TEXT[2]}
                </div>
                <div className="absolute top-1 w-full whitespace-nowrap animate-ticker2">
                    {' '}
                    {PROMO_TEXT[0]}
                    <span className="text-mainRed">{promoCode}</span>
                    {PROMO_TEXT[1]}
                    <span className="text-mainRed">{discount}</span>
                    {PROMO_TEXT[2]}
                </div>
            </div>
        </div>
    );
}

export default Main;
