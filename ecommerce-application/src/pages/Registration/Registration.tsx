import { useMemo, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, SelectChangeEvent, ThemeProvider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from './components/formInput';
import { Inputs, addressInputs } from '../../data/data';
import './styles/register.css';
import FormSelect from './components/formSelect';
import CustomizedButton from '../../components/ui/CustomizedButton';
import theme from '../../utils/theme';
import AddressInputs from './components/addressInputs';

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
        street: '',
        city: '',
        postalCode: '',
    });
    const [billingValues, setBillingValues] = useState({
        street: '',
        city: '',
        postalCode: '',
    });
    const [validInputs, setValidInputs] = useState({
        firstname: false,
        lastname: false,
        birthday: false,
        email: false,
        password: false,
        confirmPassword: false,
        street: false,
        city: false,
        country: false,
        postalCode: false,
    });
    const [defaultShippingAddress, setDefaultShippingAddress] = useState(false);
    const [defaultBillingAddress, setDefaultBillingAddress] = useState(false);
    const [sameBillingAddress, setSameBillingAddress] = useState(false);
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
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const onChangeSelect = (event: SelectChangeEvent) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/menu');
    };
    const disableButton = useMemo(() => {
        const validValues = Object.values(validInputs);
        const Values = Object.values(values);
        const validation = validValues.includes(false);
        const emptyValues = Values.includes('');
        return validation || emptyValues;
    }, [validInputs, values]);
    return (
        <div className="register-wrapper">
            <div className="register">
                <div className="register-menu">
                    <h2 className="register-title">SIGN UP</h2>
                    <div className="register-signIn">
                        <p>Have an account?</p>
                        <Link to="/login">
                            <CustomizedButton sx={{ fontSize: 15 }} variant="contained">
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
                                value={values[input.name]}
                                onChange={onChange}
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
                                    value={values.country}
                                    onChangeSelect={onChangeSelect}
                                    validInputs={validInputs}
                                    setValidInputs={setValidInputs}
                                />
                            </ThemeProvider>

                            {addressInputs.map((input) => (
                                <FormInput
                                    key={input.id}
                                    input={input}
                                    value={values[input.name]}
                                    onChange={onChange}
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