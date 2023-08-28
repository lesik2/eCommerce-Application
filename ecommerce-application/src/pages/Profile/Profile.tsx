/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import './Profile.css';
import { Checkbox, FormControlLabel, ThemeProvider } from '@mui/material';
import { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import theme from '../../utils/theme';
import CustomizedButton from '../../components/ui/CustomizedButton';
import FormInput from '../Registration/components/formInput';
import { IAddress } from '../../data/interfaces';
import Address from './components/Address';
import Modal from '../../components/Modal';
import CreateIconButton from '../../components/ui/IconButton';
import { BillingAddressInputs, Inputs } from '../../data/data';
import FormSelect from '../Registration/components/formSelect';

import { getCustomer, updateCustomer } from '../../services/Customer';
import { CustomerActions } from '../../data/enums';

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
    const [editMode, setEditMode] = useState(false);
    const ADDRESSES: IAddress[] = [];
    const [addresses, setAddresses] = useState(ADDRESSES);
    const [shippingAddresses, setShippingAddresses] = useState(['']);
    const [billingAddresses, setBillingAddresses] = useState(['']);
    const [modalVisible, setModalVisible] = useState(false);
    const [version, setVesrion] = useState(0);
    const [updateAddressId, setUpdateAddressId] = useState('');
    const [additionalAddresses, setAdditionalAddresses] = useState({
        defaultShipping: false,
        defaultBilling: false,
        shipping: false,
        billing: false,
    });
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
        const { firstName, lastName, dateOfBirth, email } = customer;
        if (firstName && lastName && dateOfBirth) {
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
    const handleSaveAdditionalAddress = (newVersion: number, newAddresses: IAddress[]) => {
        const actions: MyCustomerUpdateAction[] = [];
        const id = updateAddressId || newAddresses[newAddresses.length - 1].id;
        actions.push({
            action: additionalAddresses.defaultShipping
                ? CustomerActions.SET_DEF_SHIPPING_ADDRESS
                : CustomerActions.REMOVE_SHIPPING_ADDRESS,
            addressId: id,
        });
        actions.push({
            action: additionalAddresses.defaultBilling
                ? CustomerActions.SET_DEF_BILLING_ADDRESS
                : CustomerActions.REMOVE_BILLING_ADDRESS,
            addressId: id,
        });
        if (additionalAddresses.shipping) {
            actions.push({
                action: CustomerActions.ADD_SHIPPING_ADDRESS,
                addressId: id,
            });
        }
        if (additionalAddresses.billing) {
            actions.push({
                action: CustomerActions.ADD_BILLING_ADDRESS,
                addressId: id,
            });
        }
        if (actions.length > 0) {
            updateCustomer(newVersion, actions).then((res) => {
                changeStateOfAddress(res.body);
                setVesrion(res.body.version);
            });
        }
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
        updateCustomer(version, actions).then((res) => {
            changeStateOfAddress(res.body);
            const newVersion = res.body.version;
            setVesrion(newVersion);
            closeModal();
            setValues({ ...values, BillingCountry: '', BillingCity: '', BillingStreet: '', BillingPostalCode: '' });
            setUpdateAddressId('');
            handleSaveAdditionalAddress(newVersion, res.body.addresses);
        });
    };
    const handleDeleteAddress = (id: string) => {
        const actions: MyCustomerUpdateAction[] = [];
        actions.push({
            action: CustomerActions.REMOVE_ADDRESS,
            addressId: id,
        });
        updateCustomer(version, actions).then((res) => {
            changeStateOfAddress(res.body);
            setVesrion(res.body.version);
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
        updateCustomer(version, actions).then((res) => {
            changeStateOfPersonalInfo(res.body);
            setVesrion(res.body.version);
            setEditMode(false);
        });
    };
    const handleChangeAdditionalAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdditionalAddresses({ ...additionalAddresses, [event.target.name]: event.target.checked });
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
                >
                    Edit
                </CustomizedButton>
            </div>

            <div className="personal-data">
                <h2 className="personal-data__title">Personal data</h2>
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
                            />
                        )
                    )}
                    {editMode ? (
                        <CustomizedButton
                            sx={{
                                '&&': {
                                    fontSize: 14,
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
                                    position: 'absolute',
                                    bottom: '2px',
                                    right: '10px',
                                },
                            }}
                            variant="contained"
                            onClick={handleSavePersonalInfo}
                        >
                            Save
                        </CustomizedButton>
                    ) : null}
                </div>
            </div>
            <div className="personal-data">
                <h2 className="personal-data__title">Addresses</h2>
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
            {modalVisible && (
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
            )}
        </div>
    );
}

export default Profile;
