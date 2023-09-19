import { createContext, useEffect, useMemo, useReducer } from 'react';
import { IAddToCartAction, cartReducer } from '../reducer/cartReducer';
import { getCartItems } from '../services/cart';
import { ICartContext } from '../data/interfaces';

export const CartContext = createContext<ICartContext>({
    state: null,
    dispatch: null,
});

const fetchCartData = async (dispatch: React.Dispatch<IAddToCartAction>) => {
    try {
        const res = await getCartItems();
        const initialState = {
            cartLineItems: res?.lineItems || [],
            cartId: res?.id || '',
            cartVersion: res?.version || 1,
        };
        dispatch({ type: 'SET_INITIAL_STATE', payload: initialState });
    } catch (error) {
        console.log(error);
    }
};

export function CartState({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, { cartLineItems: [], cartId: '', cartVersion: 1 });
    useEffect(() => {
        if (!localStorage.getItem('token')) return;
        fetchCartData(dispatch);
    }, [dispatch]);
    const contextValue = useMemo(() => ({ state, dispatch }), [state]);

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}
