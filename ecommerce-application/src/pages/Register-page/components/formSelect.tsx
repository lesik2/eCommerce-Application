import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { ISelectInput } from '../../../data/types';

function FormSelect(props: ISelectInput) {
    const { setValidInputs, validInputs, value, onChangeSelect } = props;
    const [focused, setFocused] = useState(false);
    const checkValidInput = () => {
        setFocused(true);
        setValidInputs({ ...validInputs, country: !!value });
    };
    return (
        <FormControl variant="standard" error={!value && focused}>
            <InputLabel sx={{ fontSize: 15 }} required id="select-label">
                Country
            </InputLabel>
            <Select
                name="country"
                sx={{ fontSize: 16 }}
                labelId="select-label"
                id="select"
                value={value}
                label="Country"
                onChange={onChangeSelect}
                onFocus={() => setFocused(false)}
                onBlur={checkValidInput}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value="DE">Germany</MenuItem>
                <MenuItem value="PT">Portugal</MenuItem>
            </Select>
            {!value && focused ? <FormHelperText>You have to choose a country</FormHelperText> : null}
        </FormControl>
    );
}
export default FormSelect;
