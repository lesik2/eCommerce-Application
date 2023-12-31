import { LineItem } from '@commercetools/platform-sdk';

export interface IAddToCartAction {
    type: 'ADD_TO_CART' | 'SET_INITIAL_STATE' | 'REMOVE_FROM_CART';
    payload: ICartState;
}
export type CartAction = IAddToCartAction;

export interface ICartState {
    cartLineItems: LineItem[] | [];
    cartId: string;
    cartVersion: number;
}

export function cartReducer(state: ICartState, action: CartAction): ICartState {
    switch (action.type) {
        case 'SET_INITIAL_STATE':
            return {
                cartLineItems: [...action.payload.cartLineItems],
                cartId: action.payload.cartId,
                cartVersion: action.payload.cartVersion,
            };
        case 'ADD_TO_CART':
            return {
                cartLineItems: [...action.payload.cartLineItems],
                cartId: action.payload.cartId,
                cartVersion: action.payload.cartVersion,
            };
        case 'REMOVE_FROM_CART':
            return {
                cartLineItems: [...action.payload.cartLineItems],
                cartId: action.payload.cartId,
                cartVersion: action.payload.cartVersion,
            };
        default:
            return state;
    }
}
