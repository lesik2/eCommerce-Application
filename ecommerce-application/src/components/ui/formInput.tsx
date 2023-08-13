import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { IFormInput } from '../../data/types';
import './formInput.css';
import PasswordInput from './passwordInput';

function FormInput(props: IFormInput) {
    const { value, input, onChange, validInputs, setValidInputs, passwordValue } = props;
    const { pattern, errormessage } = input;
    const [focused, setFocused] = useState(false);
    const checkValidInput = () => {
        setFocused(true);
        if (pattern) {
            const result = pattern.test(value);
            setValidInputs({ ...validInputs, [input.name]: result });
        } else if (input.validdate) {
            const userDate = new Date(value);
            const result = input.validdate >= userDate.getTime();
            setValidInputs({ ...validInputs, [input.name]: result });
        } else if (passwordValue !== undefined) {
            const result = passwordValue === value;
            setValidInputs({ ...validInputs, [input.name]: result });
        }
    };
    return (
        <div>
            {input.name === 'confirmPassword' || input.name === 'password' ? (
                <PasswordInput
                    onChange={onChange}
                    value={value}
                    label={input.label}
                    name={input.name}
                    checkValidInput={checkValidInput}
                    setFocused={setFocused}
                    focused={focused}
                    validInputs={validInputs}
                    errormessage={errormessage}
                />
            ) : (
                <TextField
                    required
                    inputProps={{ style: { fontSize: 16 } }}
                    InputLabelProps={{ style: { fontSize: 15 } }}
                    variant="standard"
                    {...input}
                    autoComplete="off"
                    value={value}
                    onFocus={() => setFocused(false)}
                    onBlur={checkValidInput}
                    onChange={onChange}
                    error={!validInputs[input.name] && focused}
                    helperText={!validInputs[input.name] && focused ? errormessage : ''}
                />
            )}
        </div>
    );
}
export default FormInput;
