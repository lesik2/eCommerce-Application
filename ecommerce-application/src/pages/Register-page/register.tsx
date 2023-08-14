import { useMemo, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, ThemeProvider } from '@mui/material';
import FormInput from './components/formInput';
import Inputs, { addressInputs } from '../../data/data';
import './styles/register.css';
import FormSelect from './components/formSelect';
import CustomizedButton from '../../components/ui/CustomizedButton';
import theme from '../../utils/theme';

function Register() {
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
    const handleChangeShipping = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDefaultShippingAddress(event.target.checked);
    };
    const handleChangeBilling = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDefaultBillingAddress(event.target.checked);
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    };
    const disableButton = useMemo(() => {
        const validValues = Object.values(validInputs);

        return validValues.includes(false);
    }, [validInputs]);
    return (
        <div className="register">
            <div className="register-menu">
                <h2 className="register-title">SIGN UP</h2>
                <div className="register-signIn">
                    <p>Have an account?</p>
                    <CustomizedButton sx={{ fontSize: 15 }} variant="contained">
                        +LOG IN
                    </CustomizedButton>
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
                        </ThemeProvider>
                    </div>
                    <div className="register-form__user">
                        <FormSelect validInputs={validInputs} setValidInputs={setValidInputs} />
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

                <CustomizedButton
                    sx={{ fontSize: 17, marginTop: 3 }}
                    className="register-form__submit"
                    variant="contained"
                    disabled={disableButton}
                >
                    SIGN UP
                </CustomizedButton>
            </form>
        </div>
    );
}
export default Register;
