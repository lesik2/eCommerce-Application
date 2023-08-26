import { ClientResponse, Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import handleFlows from './handleFlows';

export async function getCustomer(id: string): Promise<ClientResponse<Customer>> {
    const result = handleFlows()
        .me()
        .get({ queryArgs: { where: `id=${id}` } })
        .execute();
    return result;
}
export async function updateCustomer(version: number, actions: MyCustomerUpdateAction[]) {
    const result = handleFlows().me().post({
        body: {
            version,
            actions,
        },
    });
    return result;
}
