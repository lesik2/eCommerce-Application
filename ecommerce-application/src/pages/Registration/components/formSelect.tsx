import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { IValidInputs, IValuesInputs } from '../../../data/interfaces';

export interface ISelectInput {
    validInputs: IValidInputs;
    setValidInputs: React.Dispatch<React.SetStateAction<IValidInputs>>;
    values: IValuesInputs;
    setValues: React.Dispatch<React.SetStateAction<IValuesInputs>>;
}
function FormSelect(props: ISelectInput) {
    const { setValidInputs, validInputs, values, setValues } = props;
    const checkValidInput = (value: string) => {
        setValidInputs({ ...validInputs, country: !!value });
    };
    const onChangeSelect = (event: SelectChangeEvent) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        checkValidInput(event.target.value);
    };
    return (
        <FormControl variant="standard" error={!validInputs.country}>
            <InputLabel sx={{ fontSize: 15 }} required id="select-label">
                Country
            </InputLabel>
            <Select
                name="country"
                sx={{ fontSize: 16 }}
                labelId="select-label"
                id="select"
                value={values.country}
                label="Country"
                onChange={onChangeSelect}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value="DE">Germany</MenuItem>
                <MenuItem value="PT">Portugal</MenuItem>
            </Select>
            {!validInputs.country ? <FormHelperText>You have to choose a country</FormHelperText> : null}
        </FormControl>
    );
}
export default FormSelect;
