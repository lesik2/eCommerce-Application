import { useContext, useMemo, useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { AlertColor } from '@mui/material/Alert';
import { FormControlLabel, ThemeProvider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from './components/formInput';
import { Inputs, ShippingAddressInputs, BillingAddressInputs } from '../../data/data';
import './styles/register.css';
import FormSelect from './components/formSelect';
import CustomizedButton from '../../components/ui/CustomizedButton';
import FetchResultAlert from '../../components/FetchResultAlert';
import theme from '../../utils/theme';
import registerUser from '../../services/registration';
import { registrationErrorMappings } from '../../services/errors/errors';
import { LoginContext } from '../../context/LoginContext';
import handleLogin from '../../services/login';
import { CartContext } from '../../context/CartContext';

function Registration() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        birthday: '',
        email: '',
        password: '',
        confirmPassword: '',
        ShippingCountry: '',
        ShippingStreet: '',
        ShippingCity: '',
        ShippingPostalCode: '',
        BillingCountry: '',
        BillingStreet: '',
        BillingCity: '',
        BillingPostalCode: '',
    });
    const [validInputs, setValidInputs] = useState({
        firstname: true,
        lastname: true,
        birthday: true,
        email: true,
        password: true,
        confirmPassword: true,
        ShippingCountry: true,
        ShippingStreet: true,
        ShippingCity: true,
        ShippingPostalCode: true,
        BillingCountry: true,
        BillingStreet: true,
        BillingCity: true,
        BillingPostalCode: true,
    });
    useEffect(() => {
        if (localStorage.getItem('token') && localStorage.getItem('status') === 'loggedIn') {
            navigate('../');
        }
    }, [navigate]);
    const [defaultShippingAddress, setDefaultShippingAddress] = useState(false);
    const [defaultBillingAddress, setDefaultBillingAddress] = useState(false);
    const [sameBillingAddress, setSameBillingAddress] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [sev, setSeverity] = useState<AlertColor>('error');
    const [error, setError] = useState('');
    const { loginMenu } = useContext(LoginContext);
    const { state } = useContext(CartContext);
    const [alertOpen, setAlertOpen] = useState(true);
    const handleAlertToggle = () => {
        setAlertOpen(!alertOpen);
    };

    const handleChangeSameBilling = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setValues({
                ...values,
                BillingCountry: values.ShippingCountry,
                BillingCity: values.ShippingCity,
                BillingStreet: values.ShippingStreet,
                BillingPostalCode: values.ShippingPostalCode,
            });
        } else {
            setValues({
                ...values,
                BillingCountry: '',
                BillingCity: '',
                BillingStreet: '',
                BillingPostalCode: '',
            });
        }
        setSameBillingAddress(event.target.checked);
    };
    const handleChangeShipping = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDefaultShippingAddress(event.target.checked);
    };
    const handleChangeBilling = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDefaultBillingAddress(event.target.checked);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const addresses = [];
        const shippingAddress = {
            country: values.ShippingCountry,
            city: values.ShippingCity,
            streetName: values.ShippingStreet,
            postalCode: values.ShippingPostalCode,
        };
        const billingAddress = {
            country: values.BillingCountry,
            city: values.BillingCity,
            streetName: values.BillingStreet,
            postalCode: values.BillingPostalCode,
        };
        addresses.push(shippingAddress);
        if (!sameBillingAddress) addresses.push(billingAddress);

        const DSA = defaultShippingAddress ? 0 : undefined;
        let DBA: number | undefined;
        if (defaultBillingAddress && sameBillingAddress) {
            DBA = 0;
        } else if (defaultBillingAddress) {
            DBA = 1;
        } else {
            DBA = undefined;
        }

        await registerUser(
            values.email,
            values.password,
            values.firstname,
            values.lastname,
            addresses,
            values.birthday,
            DSA,
            DBA
        )
            .then((res) => {
                if (res && res.statusCode === 201) {
                    if (res) {
                        localStorage.setItem('idOFCustomer', res.body.customer.id);
                        if (state && res && res.body.cart) {
                            state.cartId = res.body.cart.id;
                            state.cartVersion = res.body.cart.version;
                            state.cartLineItems = res.body.cart.lineItems;
                        }
                    }
                    setSuccessMessage(`You've successfully registered. You'll be redirected to the main page`);
                    setSeverity('success');
                    setError('');
                    setAlertOpen(true);
                    localStorage.setItem('status', 'loggedIn');
                    setTimeout(() => {
                        navigate('../');
                        loginMenu();
                    }, 1000);
                }
                localStorage.removeItem('token');
                localStorage.removeItem('status');
                handleLogin(values.email, values.password);
            })
            .catch((err) => {
                const message = registrationErrorMappings[err.message] || `${err.message}`;
                if (err.message === 'invalid_token') {
                    localStorage.removeItem('token');
                    localStorage.removeItem('status');
                }
                setError(message);
                setSeverity('error');
                setAlertOpen(true);
            });
    };
    const disableButton = useMemo(() => {
        const validValues = Object.values(validInputs);
        const Values = Object.values(values);
        const validation = validValues.includes(false);
        const emptyValues = Values.includes('');
        return validation || emptyValues;
    }, [validInputs, values]);
    const disableCheckBox = useMemo(() => {
        const validValues = [
            validInputs.ShippingCity,
            validInputs.ShippingCountry,
            validInputs.ShippingPostalCode,
            validInputs.ShippingStreet,
        ];
        const Values = [values.ShippingCity, values.ShippingCountry, values.ShippingPostalCode, values.ShippingStreet];
        const validation = validValues.includes(false);
        const emptyValues = Values.includes('');
        return validation || emptyValues;
    }, [validInputs, values]);
    return (
        <>
            {/* empty div instead of Navbar(layout) */}
            <div className="" />

            <div className="register-wrapper">
                <div className="register">
                    <div className="register-menu">
                        <h2 className="register-title">SIGN UP</h2>
                        <div className="register-signIn">
                            <p>Have an account?</p>
                            <Link to="/login">
                                <CustomizedButton
                                    sx={{ '&&': { fontSize: 15, paddingLeft: '20px', paddingRight: '20px' } }}
                                    variant="contained"
                                >
                                    +LOG IN
                                </CustomizedButton>
                            </Link>
                        </div>
                    </div>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <fieldset className="register-form__user">
                            {Inputs.map((input) => (
                                <FormInput
                                    key={input.id}
                                    input={input}
                                    values={values}
                                    setValues={setValues}
                                    validInputs={validInputs}
                                    setValidInputs={setValidInputs}
                                    passwordValue={input.name === 'confirmPassword' ? values.password : ''}
                                    required
                                />
                            ))}
                        </fieldset>
                        <fieldset className="register-form__address">
                            <div className="register-form__default">
                                <p className="adrees-title">Shipping address*:</p>
                                <ThemeProvider theme={theme}>
                                    <FormControlLabel
                                        sx={{ m: 0 }}
                                        control={
                                            <Checkbox
                                                checked={defaultShippingAddress}
                                                onChange={handleChangeShipping}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                color="default"
                                            />
                                        }
                                        label="defaultShippingAddress"
                                    />
                                </ThemeProvider>
                            </div>
                            <div className="register-form__user">
                                <ThemeProvider theme={theme}>
                                    <FormSelect
                                        values={values}
                                        setValues={setValues}
                                        validInputs={validInputs}
                                        setValidInputs={setValidInputs}
                                        name="ShippingCountry"
                                    />
                                </ThemeProvider>

                                {ShippingAddressInputs.map((input) => (
                                    <FormInput
                                        key={input.id}
                                        input={input}
                                        values={values}
                                        setValues={setValues}
                                        validInputs={validInputs}
                                        setValidInputs={setValidInputs}
                                        required
                                    />
                                ))}
                            </div>
                        </fieldset>
                        <fieldset className="register-form__address">
                            <div className="register-form__default">
                                <p className="adrees-title">Billing address*:</p>
                                <ThemeProvider theme={theme}>
                                    <FormControlLabel
                                        sx={{ m: 0 }}
                                        control={
                                            <Checkbox
                                                checked={defaultBillingAddress}
                                                onChange={handleChangeBilling}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                color="default"
                                            />
                                        }
                                        label="defaultBillingAddress"
                                    />
                                    <FormControlLabel
                                        sx={{ m: 0 }}
                                        control={
                                            <Checkbox
                                                checked={sameBillingAddress}
                                                onChange={handleChangeSameBilling}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                color="default"
                                                disabled={disableCheckBox}
                                            />
                                        }
                                        label="Set billing as shipping address"
                                    />
                                </ThemeProvider>
                            </div>

                            <div className={sameBillingAddress ? 'register-form__user close' : 'register-form__user'}>
                                <ThemeProvider theme={theme}>
                                    <FormSelect
                                        values={values}
                                        setValues={setValues}
                                        validInputs={validInputs}
                                        setValidInputs={setValidInputs}
                                        name="BillingCountry"
                                    />
                                </ThemeProvider>

                                {BillingAddressInputs.map((input) => (
                                    <FormInput
                                        key={input.id}
                                        input={input}
                                        values={values}
                                        setValues={setValues}
                                        validInputs={validInputs}
                                        setValidInputs={setValidInputs}
                                        required
                                    />
                                ))}
                            </div>
                        </fieldset>
                        {error && (
                            <FetchResultAlert
                                severity={sev}
                                message={error}
                                isOpen={alertOpen}
                                onChange={handleAlertToggle}
                            />
                        )}
                        {successMessage && (
                            <FetchResultAlert
                                severity={sev}
                                message={successMessage}
                                isOpen={alertOpen}
                                onChange={handleAlertToggle}
                            />
                        )}

                        <CustomizedButton
                            type="submit"
                            sx={{ fontSize: 17, marginTop: 5 }}
                            className="register-form__submit"
                            variant="contained"
                            disabled={disableButton}
                        >
                            SIGN UP
                        </CustomizedButton>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Registration;
