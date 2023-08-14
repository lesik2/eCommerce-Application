import { Link } from 'react-router-dom';

function Login() {
    return (
        <>
            <h1 className="py-2 text-2xl text-center">Login page</h1>
            <Link
                className="block text-center py-2 text-xl text-[blue] underline"
                to="../registration"
            >
                to registration
            </Link>
        </>
    );
}

export default Login;
