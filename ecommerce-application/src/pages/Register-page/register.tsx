import Button from '@mui/material/Button';
import { useMemo, useState } from 'react';
import FormInput from '../../components/ui/formInput';
import Inputs from '../../data/data';
import './register.css';

function Register() {
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        birthday: '',
        email: '',
    });
    const [validInputs, setValidInputs] = useState({
        firstname: false,
        lastname: false,
        birthday: false,
        email: false,
    });
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
                    <Button variant="contained">+LOG IN</Button>
                </div>
            </div>
            <form className="register-form" onSubmit={handleSubmit}>
                <fieldset>
                    {Inputs.map((input) => (
                        <FormInput
                            key={input.id}
                            input={input}
                            value={values[input.name]}
                            onChange={onChange}
                            validInputs={validInputs}
                            setValidInputs={setValidInputs}
                        />
                    ))}
                </fieldset>

                <Button
                    className="register-form__submit"
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
