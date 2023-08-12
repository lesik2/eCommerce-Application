import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { IFormInput } from '../../data/types';
import './formInput.css';

function FormInput(props: IFormInput) {
    const { value, input, onChange, validInputs, setValidInputs } = props;
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
        }
    };
    return (
        <div>
            <TextField
                sx={{ marginBottom: 2 }}
                inputProps={{ style: { fontSize: 18 } }}
                InputLabelProps={{ style: { fontSize: 18 } }}
                variant="standard"
                {...input}
                autoComplete="off"
                value={value}
                onFocus={() => setFocused(false)}
                onBlur={checkValidInput}
                onChange={onChange}
                error={!validInputs[input.name] && focused}
                helperText={
                    !validInputs[input.name] && focused ? errormessage : ''
                }
            />
        </div>
    );
}
export default FormInput;
