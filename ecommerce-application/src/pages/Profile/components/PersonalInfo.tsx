import { useMemo, useState } from 'react';
import { AlertColor } from '@mui/material';
import { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { IValidInputs, IValuesInputs } from '../../../data/interfaces';
import { CustomerActions } from '../../../data/enums';
import { updateCustomer } from '../../../services/Customer';
import FetchResultAlert from '../../../components/FetchResultAlert';
import { Inputs } from '../../../data/data';
import FormInput from '../../Registration/components/formInput';
import CustomizedButton from '../../../components/ui/CustomizedButton';

export interface IPersonalInfo {
    values: IValuesInputs;
    setValues: React.Dispatch<React.SetStateAction<IValuesInputs>>;
    validInputs: IValidInputs;
    setValidInputs: React.Dispatch<React.SetStateAction<IValidInputs>>;
    editMode: boolean;
    version: number;
    setVersion: React.Dispatch<React.SetStateAction<number>>;
    changeStateOfPersonalInfo: (customer: Customer) => void;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setDisableEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function PersonalInfo(props: IPersonalInfo) {
    const {
        values,
        setValues,
        validInputs,
        setValidInputs,
        editMode,
        setVersion,
        changeStateOfPersonalInfo,
        setEditMode,
        setDisableEditMode,
        version,
    } = props;
    const [successMessage, setSuccessMessage] = useState('');
    const [sevPersonalInfo, setSeverityPersonalInfo] = useState<AlertColor>('error');
    const [error, setError] = useState('');
    const [alertOpen, setAlertOpen] = useState(true);
    const handleAlertTogglePersonalInfo = () => {
        setAlertOpen(!alertOpen);
    };
    const disableButton = useMemo(() => {
        const validValues = [validInputs.firstname, validInputs.lastname, validInputs.email, validInputs.birthday];
        const Values = [values.firstname, values.lastname, values.birthday, values.email];
        const validation = validValues.includes(false);
        const emptyValues = Values.includes('');
        return validation || emptyValues;
    }, [validInputs, values]);
    const handleSavePersonalInfo = () => {
        const actions: MyCustomerUpdateAction[] = [];
        actions.push({
            action: CustomerActions.FIRST_NAME,
            firstName: values.firstname,
        });
        actions.push({
            action: CustomerActions.LAST_NAME,
            lastName: values.lastname,
        });
        actions.push({
            action: CustomerActions.DATE_OF_BIRTH,
            dateOfBirth: values.birthday,
        });
        actions.push({
            action: CustomerActions.EMAIL,
            email: values.email,
        });
        updateCustomer(version, actions)
            .then((res) => {
                changeStateOfPersonalInfo(res.body);
                setVersion(res.body.version);
                setEditMode(false);
                setDisableEditMode(false);
                setSuccessMessage(`You've successfully updated your personal information.`);
                setSeverityPersonalInfo('success');
                setError('');
                setAlertOpen(true);
            })
            .catch((err) => {
                setSuccessMessage('');
                setSeverityPersonalInfo('error');
                setError(err.message);
                setAlertOpen(true);
            });
    };
    return (
        <div className="personal-data">
            <h2 className="personal-data__title">Personal data</h2>
            {error && (
                <FetchResultAlert
                    severity={sevPersonalInfo}
                    message={error}
                    isOpen={alertOpen}
                    onChange={handleAlertTogglePersonalInfo}
                />
            )}
            {successMessage && (
                <FetchResultAlert
                    severity={sevPersonalInfo}
                    message={successMessage}
                    isOpen={alertOpen}
                    onChange={handleAlertTogglePersonalInfo}
                />
            )}
            <div className="personal-data__wrapper">
                {Inputs.filter((input) => input.name !== 'password' && input.name !== 'confirmPassword').map(
                    (input) => (
                        <FormInput
                            key={input.name}
                            input={input}
                            values={values}
                            setValues={setValues}
                            validInputs={validInputs}
                            setValidInputs={setValidInputs}
                            readOnly={!editMode}
                            setAlertOpen={() => setAlertOpen(false)}
                        />
                    )
                )}
                {editMode ? (
                    <CustomizedButton
                        sx={{
                            '&&': {
                                fontSize: 14,
                                width: '60px',
                                height: '30px',
                            },
                        }}
                        className="personal-data-btn"
                        variant="contained"
                        onClick={handleSavePersonalInfo}
                        disabled={disableButton}
                    >
                        Save
                    </CustomizedButton>
                ) : null}
            </div>
        </div>
    );
}
export default PersonalInfo;
