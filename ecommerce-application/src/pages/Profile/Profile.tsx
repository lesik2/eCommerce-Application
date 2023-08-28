/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { getCustomer } from '../../services/Customer';
import './Profile.css';
import CustomizedButton from '../../components/ui/CustomizedButton';
import FormInput from '../Registration/components/formInput';
import { Inputs } from '../../data/data';
import { IAddress } from '../../data/interfaces';
import Address from './components/Address';
import Modal from '../../components/Modal';
import CreateIconButton from '../../components/ui/IconButton';

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
    useEffect(() => {
        const id = localStorage.getItem('idOFCustomer');
        if (id) {
            getCustomer(id)
                .then((res) => {
                    const newAddress: IAddress[] = res.body.addresses;
                    const {
                        firstName,
                        lastName,
                        dateOfBirth,
                        email,
                        defaultBillingAddressId,
                        defaultShippingAddressId,
                        shippingAddressIds,
                        billingAddressIds,
                    } = res.body;
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
                    if (firstName && lastName && dateOfBirth) {
                        setValues({
                            ...values,
                            firstname: firstName,
                            lastname: lastName,
                            birthday: dateOfBirth,
                            email,
                        });
                    }
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
    return (
        <div className="profile">
            <div className="profile__header">
                <h1 className="profile__title">Profile</h1>
                <CustomizedButton
                    sx={{ '&&': { fontSize: 14, paddingLeft: '7px', paddingRight: '7px' } }}
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
                    />
                ))}
                <button className="personal-data__add-address" type="button" onClick={openModal}>
                    + Add address
                </button>
            </div>
            <CustomizedButton sx={{ '&&': { fontSize: 18, margin: '30px 0px 10px 20px' } }} variant="contained">
                Save
            </CustomizedButton>
            {modalVisible && (
                <Modal onClose={closeModal}>
                    <div onClick={closeModal} className="modal-wrapper">
                        <div
                            onClick={(event: React.MouseEvent<HTMLElement>) => event.stopPropagation()}
                            className="modal-context"
                        >
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
