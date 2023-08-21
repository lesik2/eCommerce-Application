import { ThemeProvider } from '@emotion/react';
import { TextField } from '@mui/material';
import React from 'react';
import { IAddress, IInput } from '../../../data/interfaces';
import { addressInputs } from '../../../data/data';
import theme from '../../../utils/theme';
import '../styles/addressInputs.css';

export interface IAddressInputs {
    values: IAddress;
    setValues: React.Dispatch<React.SetStateAction<IAddress>>;
    nameOFType: string;
}
function AddressInputs(props: IAddressInputs) {
    const { values, setValues, nameOFType } = props;
    const [clicked, setClicked] = React.useState(false);
    const getValue = (input: IInput) => {
        const { name } = input;
        if (name === 'postalCode' || name === 'street' || name === 'city') {
            return values[name];
        }
        return '';
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleClick = () => {
        setClicked((prev) => !prev);
    };
    const checkValidation = (input: IInput) => {
        const value = getValue(input);
        if (value === '') {
            return false;
        }
        const { pattern } = input;
        if (pattern) {
            return !pattern.test(value);
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

            <div data-testid="address-list" className={clicked ? 'address-inputs clicked' : 'address-inputs'}>
                {addressInputs.map((input) => (
                    <ThemeProvider key={input.id} theme={theme}>
                        <TextField
                            variant="standard"
                            {...input}
                            autoComplete="off"
                            value={getValue(input)}
                            onChange={onChange}
                            error={checkValidation(input)}
                            helperText={checkValidation(input) ? input.errormessage : ''}
                        />
                    </ThemeProvider>
                ))}
            </div>
        </div>
    );
}
export default AddressInputs;
