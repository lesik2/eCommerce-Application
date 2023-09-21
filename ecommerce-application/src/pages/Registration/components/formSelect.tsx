import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { IValidInputs, IValuesInputs } from '../../../data/interfaces';
import { InputTypes } from '../../../data/types';

export interface ISelectInput {
    validInputs: IValidInputs;
    setValidInputs: React.Dispatch<React.SetStateAction<IValidInputs>>;
    values: IValuesInputs;
    setValues: React.Dispatch<React.SetStateAction<IValuesInputs>>;
    name: InputTypes;
}
function FormSelect(props: ISelectInput) {
    const { setValidInputs, validInputs, values, setValues, name } = props;
    const checkValidInput = (value: string) => {
        setValidInputs({ ...validInputs, [name]: !!value });
    };
    const onChangeSelect = (event: SelectChangeEvent) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        checkValidInput(event.target.value);
    };
    return (
        <FormControl variant="standard" error={!validInputs[name]}>
            <InputLabel sx={{ fontSize: 15 }} required id="select-label">
                Country
            </InputLabel>
            <Select
                name={name}
                sx={{ fontSize: 16 }}
                labelId="select-label"
                id="select"
                value={values[name]}
                label="Country"
                onChange={onChangeSelect}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value="DE">Germany</MenuItem>
                <MenuItem value="PT">Portugal</MenuItem>
            </Select>
            {!validInputs[name] ? <FormHelperText>You have to choose a country</FormHelperText> : null}
        </FormControl>
    );
}
export default FormSelect;
