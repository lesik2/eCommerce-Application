/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Checkbox, FormControlLabel, ThemeProvider } from '@mui/material';
import Modal from '../../../components/Modal';
import theme from '../../../utils/theme';
import { BillingAddressInputs } from '../../../data/data';
import FormInput from '../../Registration/components/formInput';
import CustomizedButton from '../../../components/ui/CustomizedButton';
import CreateIconButton from '../../../components/ui/IconButton';
import FormSelect from '../../Registration/components/formSelect';
import { IModalAddress } from '../../../data/interfaces';

function ModalAddress(props: IModalAddress) {
    const {
        values,
        setValues,
        validInputs,
        setValidInputs,
        additionalAddresses,
        setAdditionalAddresses,
        closeModal,
        handleSaveAddress,
    } = props;
    const handleChangeAdditionalAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdditionalAddresses({ ...additionalAddresses, [event.target.name]: event.target.checked });
    };
    return (
        <Modal onClose={closeModal}>
            <div onClick={closeModal} className="modal-wrapper">
                <div
                    onClick={(event: React.MouseEvent<HTMLElement>) => event.stopPropagation()}
                    className="modal-context"
                >
                    <div className="modal-inputs">
                        <ThemeProvider theme={theme}>
                            <FormSelect
                                values={values}
                                setValues={setValues}
                                validInputs={validInputs}
                                setValidInputs={setValidInputs}
                                name="BillingCountry"
                            />
                        </ThemeProvider>
                        {BillingAddressInputs.map((input) => (
                            <FormInput
                                key={input.id}
                                input={input}
                                values={values}
                                setValues={setValues}
                                validInputs={validInputs}
                                setValidInputs={setValidInputs}
                                required
                            />
                        ))}
                    </div>
                    <div className="model-checkbox">
                        <ThemeProvider theme={theme}>
                            <FormControlLabel
                                sx={{ m: 0 }}
                                control={
                                    <Checkbox
                                        name="defaultShipping"
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        color="default"
                                        checked={additionalAddresses.defaultShipping}
                                        onChange={handleChangeAdditionalAddress}
                                    />
                                }
                                label="defaultShipping"
                            />
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <FormControlLabel
                                sx={{ m: 0 }}
                                control={
                                    <Checkbox
                                        name="shipping"
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        color="default"
                                        checked={additionalAddresses.shipping}
                                        onChange={handleChangeAdditionalAddress}
                                    />
                                }
                                label="Shipping"
                            />
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <FormControlLabel
                                sx={{ m: 0 }}
                                control={
                                    <Checkbox
                                        name="defaultBilling"
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        color="default"
                                        checked={additionalAddresses.defaultBilling}
                                        onChange={handleChangeAdditionalAddress}
                                    />
                                }
                                label="defaultBilling"
                            />
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <FormControlLabel
                                sx={{ m: 0 }}
                                control={
                                    <Checkbox
                                        name="billing"
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        color="default"
                                        checked={additionalAddresses.billing}
                                        onChange={handleChangeAdditionalAddress}
                                    />
                                }
                                label="Billing"
                            />
                        </ThemeProvider>
                    </div>
                    <CustomizedButton
                        sx={{ '&&': { fontSize: 18, margin: '15px 0px 0px 0px', width: '100%' } }}
                        variant="contained"
                        onClick={handleSaveAddress}
                    >
                        Save
                    </CustomizedButton>
                    <div onClick={closeModal} className="absolute -top-10 -right-10 text-white">
                        <CreateIconButton type="close" size="large" />
                    </div>
                </div>
            </div>
        </Modal>
    );
}
export default ModalAddress;
