import { ClientResponse, Customer, CustomerChangePassword, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import handleFlows from './handleFlows';

export async function getCustomer(id: string): Promise<ClientResponse<Customer>> {
    const result = handleFlows()
        .me()
        .get({ queryArgs: { where: `id=${id}` } })
        .execute();
    return result;
}
export async function updateCustomer(version: number, actions: MyCustomerUpdateAction[]) {
    const result = handleFlows()
        .me()
        .post({
            body: {
                version,
                actions,
            },
        })
        .execute();
    return result;
}
export async function changePasswordOfCustomer(
    id: string,
    version: number,
    currentPassword: string,
    newPassword: string
) {
    const customerChangePassword: CustomerChangePassword = {
        id,
        version,
        currentPassword,
        newPassword,
    };
    const result = handleFlows()
        .me()
        .password()
        .post({
            body: {
                ...customerChangePassword,
            },
        })
        .execute();

    return result;
}
