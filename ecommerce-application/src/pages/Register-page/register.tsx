import Button from '@mui/material/Button';
import { useMemo, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import FormInput from '../../components/ui/formInput';
import Inputs, { addressInputs } from '../../data/data';
import './register.css';
import FormSelect from '../../components/ui/formSelect';

function Register() {
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        birthday: '',
        email: '',
        password: '',
        confirmPassword: '',
        street: '',
        city: '',
        country: '',
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
        const { target } = e;
        if (target && target instanceof HTMLInputElement) {
            setValues({ ...values, [target.name]: target.value });
        }
    };
    const handleSubmit = (e: React.FormEvent) => {
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
                    <Button sx={{ fontSize: 15 }} className="register-button" variant="contained">
                        +LOG IN
                    </Button>
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

                <Button
                    sx={{ fontSize: 18, marginTop: 3 }}
                    className="register-form__submit register-button"
                    variant="contained"
                    disabled={disableButton}
                >
                    SIGN UP
                </Button>
            </form>
        </div>
    );
}
export default Register;
