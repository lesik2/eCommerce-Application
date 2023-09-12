import { Link } from 'react-router-dom';

function Main() {
    return (
        <div className="relative h-full bg-[url('./assets/img/bg_main.png')] bg-cover">
            <div className="absolute top-1/3 left-0 w-full flex justify-center animate-bounce ">
                <Link
                    to="/menu"
                    className="w-fit font-serif tracking-wider py-2 text-6xl text-white transition-all duration-[500ms] ease-out hover:text-mainRed hover:underline"
                >
                    Try our <span className="text-mainRed">Chilli</span> menu!
                </Link>
            </div>
        </div>
    );
}

export default Main;

// animate-bounce
