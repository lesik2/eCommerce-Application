import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { AlertColor } from '@mui/material/Alert';
import handleLogin from '../../services/login';
import FetchResultAlert from '../../components/FetchResultAlert';
import { loginErrorMappings } from '../../services/errors/errors';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [sev, setSeverity] = useState<AlertColor>('error');
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const loginData = await handleLogin(email, password)
            .then((data) => {
                setSuccessMessage(
                    `Successful login. You'll be redirected to the main page`
                );
                setSeverity('success');
                setError('');
                if (data) {
                    // to be used for greeting on main page
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const clientName = data.clientData.customer.firstName;
                }
                setTimeout(() => {
                    navigate('../');
                }, 500);
            })
            .catch((e) => {
                if (e.message === 'invalid_token') {
                    localStorage.removeItem('token');
                }
                const message =
                    loginErrorMappings[e.body.errors[0].code] || `${e.message}`;
                setError(message);
                setSeverity('error');
            });
        return loginData;
    };
    return (
        <>
            <h1 className="py-2 text-2xl text-center">Login</h1>
            <p>Do not have an account?</p>
            <Link
                className="block text-center py-2 text-xl text-[blue] underline"
                to="../registration"
            >
                to registration
            </Link>
            <form className="register-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">
                        Email:
                        <input
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => {
                                setError('');
                                setSuccessMessage('');
                            }}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="password">
                        Password:
                        <input
                            required
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => {
                                setError('');
                                setSuccessMessage('');
                            }}
                        />
                    </label>
                </div>
                <Button
                    sx={{ fontSize: 17, marginTop: 3 }}
                    className="register-form__submit register-button"
                    type="submit"
                >
                    SIGN UP
                </Button>
            </form>
            {error && <FetchResultAlert severity={sev} message={error} />}
            {successMessage && (
                <FetchResultAlert severity={sev} message={successMessage} />
            )}
        </>
    );
}

export default Login;
