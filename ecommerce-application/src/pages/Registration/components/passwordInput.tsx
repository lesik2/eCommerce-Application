import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import { useState } from 'react';
import '../styles/formInput.css';
import FormHelperText from '@mui/material/FormHelperText';
import { InputTypes } from '../../../data/types';
import { IValidInputs } from '../../../data/interfaces';

export interface IPasswordInput {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string | undefined;
    name: InputTypes;
    errormessage: string | undefined;
    validInputs: IValidInputs;
    checkValidInput: () => void;
    setFocused: React.Dispatch<React.SetStateAction<boolean>>;
    focused: boolean;
}
function PasswordInput(props: IPasswordInput) {
    const { onChange, label, value, name, errormessage, setFocused, focused, validInputs, checkValidInput } = props;
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <div>
            <FormControl variant="standard">
                <InputLabel error={!validInputs[name] && focused} htmlFor="standard-adornment-password" required>
                    {label}
                </InputLabel>
                <Input
                    onFocus={() => setFocused(false)}
                    onBlur={checkValidInput}
                    error={!validInputs[name] && focused}
                    name={name}
                    value={value}
                    onChange={onChange}
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
            {!validInputs[name] && focused ? <FormHelperText error>{errormessage}</FormHelperText> : null}
        </div>
    );
}
export default PasswordInput;
