import { Cart, MyCartDraft } from '@commercetools/platform-sdk';
import handleFlows from './handleFlows';
import getApiRootAnon from './anonymousClient';

const cartDraft: MyCartDraft = {
    currency: 'EUR',
    country: 'PT',
};

async function hasActiveCart(): Promise<boolean | Cart> {
    const status = await handleFlows()
        .me()
        .activeCart()
        .get()
        .execute()
        .then((res) => (res.statusCode === 200 ? res.body : false))
        .catch(() => false);
    return status;
}

async function createCart() {
    return (
        localStorage.getItem('token') && localStorage.getItem('status') === 'loggedIn'
            ? handleFlows()
            : getApiRootAnon()
    )
        .me()
        .carts()
        .post({ body: cartDraft })
        .execute()
        .then((res) => res.body)
        .catch(console.log);
}

export async function getCartItems(): Promise<Cart | undefined> {
    const data = await hasActiveCart();
    if (typeof data !== 'boolean') return data;
    const result = await createCart();
    return result || undefined;
}
type IAddItem = {
    productId: string;
    quantity?: number;
    variantId?: number;
    id?: string;
    version?: number;
};
type IChangeItem = {
    lineId: string;
    quantity: number;
    id?: string;
    version?: number;
};
// eslint-disable-next-line consistent-return
export async function addItem({ productId, quantity = 1, variantId = 1, id, version = 1 }: IAddItem) {
    const ID = id || (await createCart().then((res: void | Cart) => (typeof res === 'object' ? res.id : undefined)));
    if (ID) {
        return handleFlows()
            .me()
            .carts()
            .withId({ ID })
            .post({
                body: {
                    version,
                    actions: [{ action: 'addLineItem', productId, variantId, quantity }],
                },
            })
            .execute()
            .then((res) => res.body)
            .catch(console.log);
    }
}
// eslint-disable-next-line consistent-return
export async function changeItem({ lineId, quantity, id, version = 1 }: IChangeItem) {
    const ID = id || (await createCart().then((res: void | Cart) => (typeof res === 'object' ? res.id : undefined)));
    if (ID) {
        return handleFlows()
            .me()
            .carts()
            .withId({ ID })
            .post({
                body: {
                    version,
                    actions: [{ action: 'changeLineItemQuantity', lineItemId: lineId, quantity }],
                },
            })
            .execute()
            .then((res) => res.body)
            .catch(console.log);
    }
}
// eslint-disable-next-line consistent-return
export async function addDiscountCode(id: string, version: number, code: string) {
    return handleFlows()
        .me()
        .carts()
        .withId({ ID: id })
        .post({
            body: {
                version,
                actions: [{ action: 'addDiscountCode', code }],
            },
        })
        .execute()
        .then((res) => res.body);
}
// eslint-disable-next-line consistent-return
export async function removeCart(id: string, version: number) {
    return handleFlows()
        .me()
        .carts()
        .withId({ ID: id })
        .delete({ queryArgs: { version } })
        .execute()
        .then((res) => res.body)
        .catch(console.log);
}
// eslint-disable-next-line consistent-return
export async function removeItem({ productId, variantId = 1, id, version = 1 }: IAddItem) {
    const ID = id || (await createCart().then((res: void | Cart) => (typeof res === 'object' ? res.id : undefined)));
    if (ID) {
        const lineItem = await handleFlows()
            .me()
            .carts()
            .withId({ ID })
            .get()
            .execute()
            .then((res) =>
                res.body.lineItems.find((item) => item.productId === productId && item.variant.id === variantId)
            );
        if (lineItem)
            return handleFlows()
                .me()
                .carts()
                .withId({ ID })
                .post({
                    body: {
                        version,
                        actions: [{ action: 'removeLineItem', lineItemId: lineItem.id }],
                    },
                })
                .execute()
                .then((res) => res.body)
                .catch(console.log);
    }
}
