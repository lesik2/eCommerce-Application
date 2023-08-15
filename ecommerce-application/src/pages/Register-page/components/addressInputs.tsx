import { ThemeProvider } from '@emotion/react';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { IAddressInputs, IInput } from '../../../data/types';
import { addressInputs } from '../../../data/data';
import theme from '../../../utils/theme';
import '../styles/addressInputs.css';

function AddressInputs(props: IAddressInputs) {
    const { values, setValues, nameOFType } = props;
    const [clicked, setClicked] = useState(false);
    const [focused, setFocused] = useState({
        street: false,
        city: false,
        postalCode: false,
    });
    const getValue = (input: IInput) => {
        const { name } = input;
        if (name === 'postalCode' || name === 'street' || name === 'city') {
            return values[name];
        }
        return '';
    };
    const getFocusValue = (input: IInput) => {
        const { name } = input;
        if (name === 'postalCode' || name === 'street' || name === 'city') {
            return focused[name];
        }
        return false;
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleClick = () => {
        setClicked((prev) => !prev);
    };
    const checkValidation = (input: IInput) => {
        const { pattern } = input;
        if (pattern) {
            return !pattern.test(getValue(input));
        }
        return true;
    };
    return (
        <div className="address">
            <div className="address-header">
                <p className="address-title">{nameOFType}</p>
                <button
                    type="button"
                    onClick={handleClick}
                    className={clicked ? 'address-open clicked' : 'address-open'}
                >
                    +
                </button>
            </div>

            <div className={clicked ? 'address-inputs clicked' : 'address-inputs'}>
                {addressInputs.map((input) => (
                    <ThemeProvider key={input.id} theme={theme}>
                        <TextField
                            onFocus={() => setFocused({ ...focused, [input.name]: false })}
                            onBlur={() => setFocused({ ...focused, [input.name]: true })}
                            variant="standard"
                            {...input}
                            autoComplete="off"
                            value={getValue(input)}
                            onChange={onChange}
                            error={checkValidation(input) && getFocusValue(input)}
                            helperText={checkValidation(input) && getFocusValue(input) ? input.errormessage : ''}
                        />
                    </ThemeProvider>
                ))}
            </div>
        </div>
    );
}
export default AddressInputs;
