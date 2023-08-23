import { useContext, useMemo, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { AlertColor } from '@mui/material/Alert';
import { FormControlLabel, ThemeProvider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from './components/formInput';
import { Inputs, addressInputs } from '../../data/data';
import './styles/register.css';
import FormSelect from './components/formSelect';
import CustomizedButton from '../../components/ui/CustomizedButton';
import FetchResultAlert from '../../components/FetchResultAlert';
import theme from '../../utils/theme';
import AddressInputs from './components/addressInputs';
import registerUser from '../../services/registration';
import { registrationErrorMappings } from '../../services/errors/errors';
import { LoginContext } from '../../context/LoginContext';
import { IAddress } from '../../data/interfaces';

function Registration() {
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
    const [shippingValues, setShippingValues] = useState({
        city: '',
        street: '',
        postalCode: '',
    });
    const [billingValues, setBillingValues] = useState({
        city: '',
        street: '',
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
    const [defaultShippingAddress, setDefaultShippingAddress] = useState(false);
    const [defaultBillingAddress, setDefaultBillingAddress] = useState(false);
    const [sameBillingAddress, setSameBillingAddress] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [sev, setSeverity] = useState<AlertColor>('error');
    const [error, setError] = useState('');
    const { loginMenu } = useContext(LoginContext);
    const [alertOpen, setAlertOpen] = useState(true);
    const handleAlertToggle = () => {
        setAlertOpen(!alertOpen);
    };

    const handleChangeSameBilling = (event: React.ChangeEvent<HTMLInputElement>) => {
        Object.assign(billingValues, shippingValues);
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
        const DSA = defaultShippingAddress ? 0 : undefined;
        const DBA = defaultBillingAddress ? 0 : undefined;
        const baseAddress = {
            country: values.country,
            city: values.city,
            streetName: values.street,
            postalCode: values.postalCode,
        };
        const addresses = [baseAddress];
        const shippingAddress =
            Object.values(shippingValues).filter((el) => el.length > 0).length > 0
                ? {
                      country: values.country,
                      city: shippingValues.city,
                      streetName: shippingValues.street,
                      postalCode: shippingValues.postalCode,
                      additionalAddressInfo: 'shipping',
                  }
                : null;
        const billingAddress =
            Object.values(billingValues).filter((el) => el.length > 0).length > 0
                ? {
                      country: values.country,
                      city: billingValues.city,
                      streetName: billingValues.street,
                      postalCode: billingValues.postalCode,
                      additionalAddressInfo: 'billing',
                  }
                : null;
        if (shippingAddress) addresses.push(shippingAddress);
        if (billingAddress) addresses.push(billingAddress);
        await registerUser(values.email, values.password, values.firstname, values.lastname, addresses, DSA, DBA)
            .then((res) => {
                if (res && res.statusCode === 201) {
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
            })
            .catch((err) => {
                const message = registrationErrorMappings[err.message] || `${err.message}`;
                setError(message);
                setSeverity('error');
                setAlertOpen(true);
            });
    };
    const checkValidationAddress = (valuesAddress: IAddress) => {
        const arr = Object.values(valuesAddress)
            .filter((el) => el.length > 0)
            .map((value, i) => {
                const { pattern } = addressInputs[i];
                if (pattern) {
                    return pattern.test(value);
                }
                return false;
            });
        return arr.includes(false);
    };
    const disableButton = useMemo(() => {
        const validValues = Object.values(validInputs);
        const Values = Object.values(values);
        const validation = validValues.includes(false);
        const emptyValues = Values.includes('');
        return (
            validation || emptyValues || checkValidationAddress(shippingValues) || checkValidationAddress(billingValues)
        );
    }, [validInputs, values, billingValues, shippingValues]);
    return (
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
                            />
                        ))}
                    </fieldset>
                    <fieldset className="register-form__address">
                        <div className="register-form__default">
                            <p className="adrees-title">Address*:</p>
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
                                        />
                                    }
                                    label="Set billing as shipping address"
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
                                />
                            </ThemeProvider>

                            {addressInputs.map((input) => (
                                <FormInput
                                    key={input.id}
                                    input={input}
                                    values={values}
                                    setValues={setValues}
                                    validInputs={validInputs}
                                    setValidInputs={setValidInputs}
                                />
                            ))}
                        </div>
                    </fieldset>
                    <fieldset className="address-wrapper">
                        <AddressInputs
                            values={shippingValues}
                            setValues={setShippingValues}
                            nameOFType="Shipping address"
                        />
                        <AddressInputs
                            values={billingValues}
                            setValues={setBillingValues}
                            nameOFType="Billing address"
                        />
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
    );
}
export default Registration;
