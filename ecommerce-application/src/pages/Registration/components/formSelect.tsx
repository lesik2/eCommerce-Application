import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { IValidInputs } from '../../../data/interfaces';

export interface ISelectInput {
    validInputs: IValidInputs;
    setValidInputs: React.Dispatch<React.SetStateAction<IValidInputs>>;
    value: string;
    onChangeSelect: (event: SelectChangeEvent) => void;
}
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
