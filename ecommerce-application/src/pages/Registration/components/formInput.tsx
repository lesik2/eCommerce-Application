import { useState } from 'react';
import { TextField } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import '../styles/formInput.css';
import PasswordInput from './passwordInput';
import theme from '../../../utils/theme';
import { IFormInput } from '../../../data/interfaces';
import { CountryValidation } from '../../../data/data';

function FormInput(props: IFormInput) {
    const { input, values, setValues, validInputs, setValidInputs, passwordValue, setAlertOpen } = props;
    let { pattern, errormessage } = input;
    const [errorText, setErrorText] = useState(errormessage);

    const changePatternForCountry = () => {
        if (input.name === 'ShippingPostalCode') {
            if (values.ShippingCountry === 'DE') {
                errormessage = CountryValidation.DE.errorMessage;
                pattern = CountryValidation.DE.pattern;
            }
            if (values.ShippingCountry === 'PT') {
                errormessage = CountryValidation.PT.errorMessage;
                pattern = CountryValidation.PT.pattern;
            }
        } else if (input.name === 'BillingPostalCode') {
            if (values.BillingCountry === 'DE') {
                errormessage = CountryValidation.DE.errorMessage;
                pattern = CountryValidation.DE.pattern;
            }
            if (values.BillingCountry === 'PT') {
                errormessage = CountryValidation.PT.errorMessage;
                pattern = CountryValidation.PT.pattern;
            }
        }
    };
    const checkValidInput = (value: string) => {
        if (input.name === 'ShippingPostalCode' || input.name === 'BillingPostalCode') {
            changePatternForCountry();
        }

        if (value === '') {
            setErrorText(`${input.name} should be filled`);
        } else {
            setErrorText(errormessage);
        }
        if (pattern) {
            const result = pattern.test(value);
            setValidInputs({ ...validInputs, [input.name]: result });
        } else if (input.validdate) {
            const userDate = new Date(value);
            const result = input.validdate >= userDate.getTime();
            setValidInputs({ ...validInputs, [input.name]: result });
        } else if (passwordValue) {
            const result = passwordValue === value;
            setValidInputs({ ...validInputs, [input.name]: result });
        }
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        checkValidInput(e.target.value);
        if (setAlertOpen) {
            setAlertOpen(false);
        }
    };
    return (
        <div className={`${input.name}-input`}>
            {input.name === 'confirmPassword' || input.name === 'password' ? (
                <ThemeProvider theme={theme}>
                    <PasswordInput
                        onChange={onChange}
                        value={values[input.name]}
                        label={input.label}
                        name={input.name}
                        validInputs={validInputs}
                        errormessage={errorText}
                    />
                </ThemeProvider>
            ) : (
                <ThemeProvider theme={theme}>
                    <TextField
                        required
                        variant="standard"
                        {...input}
                        autoComplete="off"
                        value={values[input.name]}
                        onChange={onChange}
                        error={!validInputs[input.name]}
                        helperText={!validInputs[input.name] ? errorText : ''}
                    />
                </ThemeProvider>
            )}
        </div>
    );
}
export default FormInput;
