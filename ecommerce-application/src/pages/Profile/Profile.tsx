/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import './styles/Profile.css';
import { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { AlertColor, TextField, ThemeProvider } from '@mui/material';
import CustomizedButton from '../../components/ui/CustomizedButton';
import { IAddress } from '../../data/interfaces';
import Address from './components/Address';
import { getCustomer, updateCustomer } from '../../services/Customer';
import { CustomerActions } from '../../data/enums';
import ModalAddress from './components/ModalAddress';
import theme from '../../utils/theme';
import CreateIconButton from '../../components/ui/IconButton';
import ModalPassword from './components/ModalPassword';
import FetchResultAlert from '../../components/FetchResultAlert';
import PersonalInfo from './components/PersonalInfo';

function Profile() {
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        birthday: '',
        email: '',
        password: '',
        confirmPassword: '',
        ShippingCountry: '',
        ShippingStreet: '',
        ShippingCity: '',
        ShippingPostalCode: '',
        BillingCountry: '',
        BillingStreet: '',
        BillingCity: '',
        BillingPostalCode: '',
    });
    const [validInputs, setValidInputs] = useState({
        firstname: true,
        lastname: true,
        birthday: true,
        email: true,
        password: true,
        confirmPassword: true,
        ShippingCountry: true,
        ShippingStreet: true,
        ShippingCity: true,
        ShippingPostalCode: true,
        BillingCountry: true,
        BillingStreet: true,
        BillingCity: true,
        BillingPostalCode: true,
    });
    const ADDRESSES: IAddress[] = [];
    const [addresses, setAddresses] = useState(ADDRESSES);
    const [shippingAddresses, setShippingAddresses] = useState(['']);
    const [billingAddresses, setBillingAddresses] = useState(['']);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [version, setVesrion] = useState(0);
    const [updateAddressId, setUpdateAddressId] = useState('');
    const [additionalAddresses, setAdditionalAddresses] = useState({
        defaultShipping: false,
        defaultBilling: false,
        shipping: false,
        billing: false,
    });
    const [disableEditMode, setDisableEditMode] = useState(false);
    const [successMessageAddress, setSuccessMessageAddress] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [sevAddress, setSeverityAddress] = useState<AlertColor>('error');
    const [errorAddress, setErrorAddress] = useState('');
    const [alertOpenAddress, setAlertOpenAddress] = useState(true);

    const [successMessage, setSuccessMessage] = useState('');
    const [sev, setSev] = useState<AlertColor>('error');
    const [error, setError] = useState('');
    const [alertOpen, setAlertOpen] = useState(true);
    const handleAlertToggleAddress = () => {
        setAlertOpenAddress(!alertOpenAddress);
    };
    const changeStateOfAddress = (customer: Customer) => {
        const newAddress: IAddress[] = customer.addresses;
        const { defaultBillingAddressId, defaultShippingAddressId, shippingAddressIds, billingAddressIds } = customer;
        newAddress.forEach((address) => {
            if (address.id === defaultBillingAddressId) {
                address.defaultBillingAddress = defaultBillingAddressId;
            }
            if (address.id === defaultShippingAddressId) {
                address.defaultShippingAddress = defaultShippingAddressId;
            }
        });
        if (shippingAddressIds) {
            setShippingAddresses(shippingAddressIds);
        }
        if (billingAddressIds) {
            setBillingAddresses(billingAddressIds);
        }
        setAddresses(newAddress);
    };
    const changeStateOfPersonalInfo = (customer: Customer) => {
        const { firstName, lastName, dateOfBirth, email, password } = customer;
        if (firstName && lastName && dateOfBirth && password) {
            setValues({
                ...values,
                firstname: firstName,
                lastname: lastName,
                birthday: dateOfBirth,
                email,
            });
        }
    };
    useEffect(() => {
        const id = localStorage.getItem('idOFCustomer');
        if (id) {
            getCustomer(id)
                .then((res) => {
                    changeStateOfAddress(res.body);
                    changeStateOfPersonalInfo(res.body);
                    setVesrion(res.body.version);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleEditMode = () => {
        setDisableEditMode(true);
        setEditMode((prev) => !prev);
    };
    const defineAddress = (address: IAddress, shipBillAddress: string[]) => {
        const { id } = address;
        if (id) {
            return shipBillAddress.includes(id);
        }
        return false;
    };
    const closeModal = () => {
        setModalVisible(false);
    };
    const openModal = () => {
        setModalVisible(true);
    };
    const closePasswordModal = () => {
        setPasswordModalVisible(false);
    };
    const openPasswordModal = () => {
        setPasswordModalVisible(true);
    };
    const checkAddress = (address: IAddress, nameOfAddress: string) => {
        if (nameOfAddress === 'defaultShipping') {
            return !!address?.defaultShippingAddress;
        }
        if (nameOfAddress === 'defaultBilling') {
            return !!address?.defaultBillingAddress;
        }
        return false;
    };
    const handleSaveAdditionalAddress = (
        newVersion: number,
        newAddresses: IAddress[],
        shipping: string[] | undefined,
        billing: string[] | undefined
    ) => {
        const actions: MyCustomerUpdateAction[] = [];
        const id = updateAddressId || newAddresses[newAddresses.length - 1].id;
        const certainAddress = newAddresses.find((item) => item.id === id);
        if (!id || !certainAddress || !shipping || !billing) return;
        if (additionalAddresses.defaultShipping) {
            actions.push({
                action: CustomerActions.SET_DEF_SHIPPING_ADDRESS,
                addressId: id,
            });
        } else if (checkAddress(certainAddress, 'defaultShipping')) {
            actions.push({
                action: CustomerActions.REMOVE_SHIPPING_ADDRESS,
                addressId: id,
            });
        }
        if (additionalAddresses.defaultBilling) {
            actions.push({
                action: CustomerActions.SET_DEF_BILLING_ADDRESS,

                addressId: id,
            });
        } else if (checkAddress(certainAddress, 'defaultBilling')) {
            actions.push({
                action: CustomerActions.REMOVE_BILLING_ADDRESS,
                addressId: id,
            });
        }
        if (additionalAddresses.shipping) {
            actions.push({
                action: CustomerActions.ADD_SHIPPING_ADDRESS,
                addressId: id,
            });
        } else if (defineAddress(certainAddress, shipping)) {
            actions.push({
                action: CustomerActions.REMOVE_SHIPPING_ADDRESS,
                addressId: id,
            });
        }
        if (additionalAddresses.billing) {
            actions.push({
                action: CustomerActions.ADD_BILLING_ADDRESS,
                addressId: id,
            });
        } else if (defineAddress(certainAddress, billing)) {
            actions.push({
                action: CustomerActions.REMOVE_BILLING_ADDRESS,
                addressId: id,
            });
        }
        updateCustomer(newVersion, actions)
            .then((res) => {
                changeStateOfAddress(res.body);
                setVesrion(res.body.version);
                setSuccessMessage(`You've successfully updated list of addresses.`);
                setSev('success');
                setError('');
                setAlertOpen(true);
                setTimeout(() => {
                    closeModal();
                    setAlertOpen(false);
                }, 1000);
            })
            .catch((err) => {
                setSuccessMessage('');
                setSev('error');
                setError(err.message);
                setAlertOpen(true);
            });
    };
    const handleSaveAddress = () => {
        const newAddress = {
            country: values.BillingCountry,
            city: values.BillingCity,
            streetName: values.BillingStreet,
            postalCode: values.BillingPostalCode,
        };
        const actions: MyCustomerUpdateAction[] = [];
        if (updateAddressId) {
            actions.push({
                action: CustomerActions.CHANGE_ADDRESS,
                addressId: updateAddressId,
                address: newAddress,
            });
        } else {
            actions.push({
                action: CustomerActions.ADD_ADDRESS,
                address: newAddress,
            });
        }
        updateCustomer(version, actions)
            .then((res) => {
                changeStateOfAddress(res.body);
                const newVersion = res.body.version;
                setVesrion(newVersion);
                setUpdateAddressId('');
                handleSaveAdditionalAddress(
                    newVersion,
                    res.body.addresses,
                    res.body.shippingAddressIds,
                    res.body.billingAddressIds
                );
            })
            .catch((err) => {
                setSuccessMessage('');
                setSev('error');
                setError(err.message);
                setAlertOpen(true);
            });
    };
    const handleDeleteAddress = (id: string) => {
        const actions: MyCustomerUpdateAction[] = [];
        actions.push({
            action: CustomerActions.REMOVE_ADDRESS,
            addressId: id,
        });
        updateCustomer(version, actions)
            .then((res) => {
                changeStateOfAddress(res.body);
                setVesrion(res.body.version);
                setSuccessMessageAddress(`You've successfully deleted address.`);
                setSeverityAddress('success');
                setErrorAddress('');
                setAlertOpenAddress(true);
            })
            .catch((err) => {
                setSuccessMessageAddress('');
                setSeverityAddress('error');
                setErrorAddress(err.message);
                setAlertOpenAddress(true);
            });
    };
    const handleUpdateAddress = (id: string, address: IAddress, shipping: boolean, billing: boolean) => {
        const { city, postalCode, streetName, country, defaultBillingAddress, defaultShippingAddress } = address;
        if (city && postalCode && streetName && country) {
            setValues({
                ...values,
                BillingCity: city,
                BillingCountry: country,
                BillingPostalCode: postalCode,
                BillingStreet: streetName,
            });
            const defaultShipping = !!defaultShippingAddress;
            const defaultBilling = !!defaultBillingAddress;
            setAdditionalAddresses({ defaultShipping, defaultBilling, shipping, billing });
            openModal();
            setUpdateAddressId(id);
        }
    };
    const handleOpenModal = () => {
        openModal();
        setValues({ ...values, BillingCountry: '', BillingCity: '', BillingStreet: '', BillingPostalCode: '' });
        setAdditionalAddresses({
            defaultShipping: false,
            defaultBilling: false,
            shipping: false,
            billing: false,
        });
        setUpdateAddressId('');
    };
    return (
        <div className="profile">
            <div className="profile__header">
                <h1 className="profile__title">Profile</h1>
                <CustomizedButton
                    sx={{ '&&': { fontSize: 14, paddingLeft: '10px', paddingRight: '10px' } }}
                    variant="contained"
                    onClick={handleEditMode}
                    disabled={disableEditMode}
                >
                    Edit
                </CustomizedButton>
            </div>
            <PersonalInfo
                values={values}
                validInputs={validInputs}
                setValues={setValues}
                setValidInputs={setValidInputs}
                editMode={editMode}
                version={version}
                setVersion={setVesrion}
                changeStateOfPersonalInfo={changeStateOfPersonalInfo}
                setEditMode={setEditMode}
                setDisableEditMode={setDisableEditMode}
            />
            <div className="personal-data">
                <h2 className="personal-data__title">Addresses</h2>
                {errorAddress && (
                    <FetchResultAlert
                        severity={sevAddress}
                        message={errorAddress}
                        isOpen={alertOpenAddress}
                        onChange={handleAlertToggleAddress}
                    />
                )}
                {successMessageAddress && (
                    <FetchResultAlert
                        severity={sevAddress}
                        message={successMessageAddress}
                        isOpen={alertOpenAddress}
                        onChange={handleAlertToggleAddress}
                    />
                )}
                {addresses.map((address) => (
                    <Address
                        key={address.id}
                        address={address}
                        shipping={defineAddress(address, shippingAddresses)}
                        billing={defineAddress(address, billingAddresses)}
                        onDelete={handleDeleteAddress}
                        onUpdate={handleUpdateAddress}
                    />
                ))}
                <button className="personal-data__add-address" type="button" onClick={handleOpenModal}>
                    + Add address
                </button>
            </div>
            <div className="personal-data">
                <h2 className="personal-data__title">Password</h2>
                <div className="password-wrapper">
                    <ThemeProvider theme={theme}>
                        <TextField
                            sx={{
                                '&&': {
                                    width: '100px',
                                },
                            }}
                            label="Password"
                            InputProps={{
                                readOnly: true,
                                disableUnderline: true,
                            }}
                            variant="standard"
                            autoComplete="off"
                            value="********"
                        />
                    </ThemeProvider>
                    <div onClick={openPasswordModal}>
                        <CreateIconButton type="pen" size="large" />
                    </div>
                </div>
            </div>
            {modalVisible && (
                <ModalAddress
                    values={values}
                    validInputs={validInputs}
                    setValues={setValues}
                    setValidInputs={setValidInputs}
                    additionalAddresses={additionalAddresses}
                    setAdditionalAddresses={setAdditionalAddresses}
                    closeModal={closeModal}
                    handleSaveAddress={handleSaveAddress}
                    sev={sev}
                    successMessage={successMessage}
                    alertOpen={alertOpen}
                    error={error}
                    setAlertOpen={setAlertOpen}
                />
            )}
            {passwordModalVisible && (
                <ModalPassword closeModal={closePasswordModal} version={version} setVersion={setVesrion} />
            )}
        </div>
    );
}

export default Profile;
