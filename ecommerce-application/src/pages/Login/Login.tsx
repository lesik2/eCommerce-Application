import { Link, useNavigate } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { AlertColor } from '@mui/material/Alert';
import handleLogin from '../../services/login';
import FetchResultAlert from '../../components/FetchResultAlert';
import { loginErrorMappings } from '../../services/errors/errors';
import CustomizedButton from '../../components/ui/CustomizedButton';
import { Inputs } from '../../data/data';
import FormInput from '../Registration/components/formInput';

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        birthday: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: '',
        street: '',
        city: '',
        postalCode: '',
    });
    const [validInputs, setValidInputs] = useState({
        firstname: true,
        lastname: true,
        birthday: true,
        email: true,
        password: true,
        confirmPassword: true,
        street: true,
        city: true,
        country: true,
        postalCode: true,
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [sev, setSeverity] = useState<AlertColor>('error');
    const [error, setError] = useState('');
    useEffect(() => {
        if (localStorage.getItem('token') && localStorage.getItem('status') === 'loggedIn') {
            navigate('../');
        }
    }, [navigate]);
    const disableButton = useMemo(() => {
        const validValues = [validInputs.email, validInputs.password];
        const Values = [values.email, values.password];
        const validation = validValues.includes(false);
        const emptyValues = Values.includes('');
        return validation || emptyValues;
    }, [validInputs, values]);
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const loginData = await handleLogin(values.email, values.password)
            .then(() => {
                setSuccessMessage(`Successful login. You'll be redirected to the main page`);
                setSeverity('success');
                setError('');
                setTimeout(() => {
                    navigate('../');
                }, 500);
            })
            .catch((e) => {
                if (e.message === 'invalid_token') {
                    localStorage.removeItem('token');
                }
                const message = loginErrorMappings[e.body.errors[0].code] || `${e.message}`;
                setError(message);
                setSeverity('error');
            });
        return loginData;
    };
    return (
        <div className="register-wrapper">
            <div className="register">
                <div className="register-menu">
                    <h2 className="register-title">LOGIN</h2>
                    <div className="register-signIn">
                        <p>Do not have an account?</p>
                        <Link to="/registration">
                            <CustomizedButton
                                sx={{ '&&': { fontSize: 15, paddingLeft: '20px', paddingRight: '20px' } }}
                                variant="contained"
                            >
                                +SIGN UP
                            </CustomizedButton>
                        </Link>
                    </div>
                </div>
                <form className="register-form" onSubmit={handleSubmit}>
                    <fieldset className="register-form__user">
                        {Inputs.filter((input) => input.name === 'email' || input.name === 'password').map((input) => (
                            <FormInput
                                key={input.id}
                                input={input}
                                values={values}
                                setValues={setValues}
                                validInputs={validInputs}
                                setValidInputs={setValidInputs}
                            />
                        ))}
                    </fieldset>
                    {error && <FetchResultAlert severity={sev} message={error} />}
                    {successMessage && <FetchResultAlert severity={sev} message={successMessage} />}
                    <CustomizedButton
                        type="submit"
                        sx={{ fontSize: 17, marginTop: 5 }}
                        className="register-form__submit"
                        variant="contained"
                        disabled={disableButton}
                    >
                        SIGN IN
                    </CustomizedButton>
                </form>
            </div>
        </div>
    );
}

export default Login;
