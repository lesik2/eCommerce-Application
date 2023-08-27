enum LoginStatus {
    'loggedIn',
    'anonim',
}

export default LoginStatus;

export enum CustomerActions {
    EMAIL = 'changeEmail',
    FIRST_NAME = 'setFirstName',
    LAST_NAME = 'setLastName',
    ADD_ADDRESS = 'addAddress',
    CHANGE_ADDRESS = 'changeAddress',
    REMOVE_ADDRESS = 'removeAddress',
    SET_DEF_SHIPPING_ADDRESS = 'setDefaultShippingAddress',
    ADD_SHIPPING_ADDRESS = 'addShippingAddressId',
    REMOVE_SHIPPING_ADDRESS = 'removeShippingAddressId',
    SET_DEF_BILLING_ADDRESS = 'setDefaultBillingAddress',
    ADD_BILLING_ADDRESS = 'addBillingAddressId',
    REMOVE_BILLING_ADDRESS = 'removeBillingAddressId',
    DATE_OF_BIRTH = 'setDateOfBirth',
}
