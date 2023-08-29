/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ThemeProvider } from '@mui/material';
import { useMemo, useState } from 'react';
import Modal from '../../../components/Modal';
import CustomizedButton from '../../../components/ui/CustomizedButton';
import CreateIconButton from '../../../components/ui/IconButton';
import { IModalPassword } from '../../../data/interfaces';
import PasswordInput from '../../Registration/components/passwordInput';
import theme from '../../../utils/theme';
import { PasswordInputsData } from '../../../data/data';
import { changePasswordOfCustomer } from '../../../services/Customer';

function ModalPassword(props: IModalPassword) {
    const { closeModal, version, setVersion } = props;
    const [values, setValues] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [validInputs, setValidInputs] = useState({
        currentPassword: true,
        newPassword: true,
        confirmPassword: true,
    });
    const ErrorMessages = {
        currentPassword: PasswordInputsData[0].errormessage,
        newPassword: PasswordInputsData[1].errormessage,
        confirmPassword: PasswordInputsData[2].errormessage,
    };
    const [errorText, setErrorText] = useState(ErrorMessages);
    const checkValidInput = (name: string, value: string) => {
        if (value === '') {
            setErrorText({ ...errorText, [name]: `${name} should be filled` });
        } else if (name === 'currentPassword' || name === 'newPassword' || name === 'confirmPassword') {
            setErrorText({ ...errorText, [name]: ErrorMessages[name] });
        }
        const passwordInput = PasswordInputsData.find((input) => input.name === name);
        if (!passwordInput) return;
        if (passwordInput.pattern) {
            const result = passwordInput.pattern.test(value);
            setValidInputs({ ...validInputs, [name]: result });
        } else {
            const result = values.newPassword === value;
            setValidInputs({ ...validInputs, [name]: result });
        }
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        checkValidInput(e.target.name, e.target.value);
    };
    const disableButton = useMemo(() => {
        const validValues = Object.values(validInputs);
        const Values = Object.values(values);
        const validation = validValues.includes(false);
        const emptyValues = Values.includes('');
        return validation || emptyValues;
    }, [validInputs, values]);
    const handleSaveNewPassword = () => {
        const id = localStorage.getItem('idOFCustomer');
        if (id) {
            changePasswordOfCustomer(id, version, values.currentPassword, values.newPassword).then((res) => {
                setVersion(res.body.version);
                closeModal();
            });
        }
    };
    return (
        <Modal onClose={closeModal}>
            <div onClick={closeModal} className="modal-wrapper">
                <div
                    onClick={(event: React.MouseEvent<HTMLElement>) => event.stopPropagation()}
                    className="modal-context"
                >
                    <div className="modal-inputs mb-10">
                        {PasswordInputsData.map((input) => (
                            <ThemeProvider key={input.name} theme={theme}>
                                <PasswordInput
                                    onChange={onChange}
                                    value={values[input.name]}
                                    label={input.label}
                                    name={input.name}
                                    validInput={validInputs[input.name]}
                                    errormessage={errorText[input.name]}
                                />
                            </ThemeProvider>
                        ))}
                    </div>

                    <CustomizedButton
                        sx={{ '&&': { fontSize: 18, margin: '15px 0px 0px 0px', width: '100%' } }}
                        variant="contained"
                        disabled={disableButton}
                        onClick={handleSaveNewPassword}
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
export default ModalPassword;
