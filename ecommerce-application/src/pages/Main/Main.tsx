import { Link } from 'react-router-dom';

function Main() {
    return (
        <>
            <h1 className="py-2 text-2xl text-center">Welcome to Chilly!</h1>
            <Link className="block text-center py-2 text-xl text-[blue] underline" to="../login">
                to login
            </Link>
            <Link className="block text-center py-2 text-xl text-[blue] underline" to="../registration">
                to registration
            </Link>
        </>
    );
}

export default Main;
