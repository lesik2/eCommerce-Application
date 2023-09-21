/* eslint-disable react/require-default-props */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import { useState } from 'react';
import '../styles/formInput.css';
import FormHelperText from '@mui/material/FormHelperText';

export interface IPasswordInput {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string | undefined;
    name: string;
    errormessage: string | undefined;
    validInput: boolean;
    setAlertOpen?: () => void;
}
function PasswordInput(props: IPasswordInput) {
    const { onChange, label, value, name, errormessage, validInput, setAlertOpen } = props;
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <div style={{ height: '40px' }}>
            <FormControl variant="standard">
                <InputLabel error={!validInput} htmlFor="standard-adornment-password" required>
                    {label}
                </InputLabel>
                <Input
                    error={!validInput}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onFocus={setAlertOpen}
                    autoComplete="off"
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            {!validInput ? <FormHelperText error>{errormessage}</FormHelperText> : null}
        </div>
    );
}
export default PasswordInput;
