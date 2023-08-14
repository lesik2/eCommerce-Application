import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { ISelectInput } from '../../../data/types';

function FormSelect(props: ISelectInput) {
    const { setValidInputs, validInputs } = props;
    const [country, setCountry] = useState('');
    const [focused, setFocused] = useState(false);
    const handleChange = (event: SelectChangeEvent) => {
        setCountry(event.target.value.toString());
    };
    const checkValidInput = () => {
        setFocused(true);
        setValidInputs({ ...validInputs, country: !!country });
    };
    return (
        <FormControl variant="standard" error={!country && focused}>
            <InputLabel sx={{ fontSize: 15 }} required id="select-label">
                Country
            </InputLabel>
            <Select
                sx={{ fontSize: 16 }}
                labelId="select-label"
                id="select"
                value={country}
                label="Country"
                onChange={handleChange}
                onFocus={() => setFocused(false)}
                onBlur={checkValidInput}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value="DE">Germany</MenuItem>
                <MenuItem value="PT">Portugal</MenuItem>
            </Select>
            {!country && focused ? <FormHelperText>You have to choose a country</FormHelperText> : null}
        </FormControl>
    );
}
export default FormSelect;