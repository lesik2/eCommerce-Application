/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { LineItem } from '@commercetools/platform-sdk/dist/declarations/src';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import { CartContext } from '../../context/CartContext';
import CartItem from './components/CartItem';
import './Cart.css';
import CreateIconButton from '../../components/ui/IconButton';
import CustomizedButton from '../../components/ui/CustomizedButton';
import { addDiscountCode, getCartItems, removeCart } from '../../services/cart';
import roundValue from '../../utils/MathFunctions';
import { toastProps } from '../../data/data';

function Cart() {
    const { state, dispatch } = useContext(CartContext);
    const [code, setCode] = useState('');
    const [promoCode, setPromoCode] = useState(false);
    const [itemsCount, setItemsCount] = useState(state?.cartLineItems.length || 0);
    const calculateDiscountPrice = (item: LineItem) => {
        const { discounted } = item.price;
        if (discounted) {
            return discounted.value.centAmount / 10 ** discounted.value.fractionDigits;
        }
        return 0;
    };
    const defineImageUrl = (item: LineItem) => {
        const { images } = item.variant;
        return images?.find((el) => el.url)?.url || '';
    };
    const definePortion = (item: LineItem) => {
        const { attributes } = item.variant;
        const portion = attributes?.find((attribute) => attribute.name === 'portion')?.value.key;
        return portion;
    };
    const defineSpiciness = (item: LineItem) => {
        const { attributes } = item.variant;
        const spiciness = attributes?.find((attribute) => attribute.name === 'spiciness')?.value;
        return spiciness;
    };
    const calculateTotalPrice = () => {
        const result = state?.cartLineItems
            .map((item) => item.totalPrice.centAmount / 10 ** item.totalPrice.fractionDigits)
            .reduce((sum, prev) => sum + prev, 0);
        return result || 0;
    };
    const calculateTotalPriceWithoutPromoCode = () => {
        const result = state?.cartLineItems
            .map((item) => {
                const discount = calculateDiscountPrice(item);
                const price = item.price.value.centAmount / 10 ** item.price.value.fractionDigits;
                return discount === 0 ? price * item.quantity : discount * item.quantity;
            })
            .reduce((sum, prev) => sum + prev, 0);
        return result || 0;
    };

    const clearCart = async () => {
        const id = state?.cartId;
        const version = state?.cartVersion;
        if (id && version) {
            removeCart(id, version).then(async () => {
                const res = await getCartItems();
                const initialState = {
                    cartLineItems: res?.lineItems || [],
                    cartId: res?.id || '',
                    cartVersion: res?.version || 1,
                };
                if (dispatch) {
                    dispatch({ type: 'SET_INITIAL_STATE', payload: initialState });
                }
            });
        }
    };
    const applyPromoCode = (e: React.FormEvent) => {
        e.preventDefault();
        if (code === '') return;
        const id = state?.cartId;
        const version = state?.cartVersion;
        if (id && version) {
            addDiscountCode(id, version, code.trim())
                .then((res) => {
                    if (res && dispatch) {
                        setCode('');
                        setPromoCode(true);
                        dispatch({
                            type: 'ADD_TO_CART',
                            payload: { cartLineItems: res.lineItems, cartId: res.id, cartVersion: res.version },
                        });
                    }
                })
                .catch((error) => {
                    toast.error(
                        error instanceof Error ? error.message : 'This discount code was not found',
                        toastProps
                    );
                    setCode('');
                });
        }
    };
    useEffect(() => {
        if (calculateTotalPrice() !== calculateTotalPriceWithoutPromoCode()) {
            setPromoCode(true);
        }
        setItemsCount(state?.cartLineItems.length || 0);
    }, [state]);
    return (
        <div className="cart">
            <div className="cart-header">
                <h1 className="cart-title font-sans">Cart page</h1>
                {itemsCount ? (
                    <div className="remove-cart">
                        <p>Clear cart: </p>
                        <CreateIconButton onClick={clearCart} type="remove-cart" size="large" />
                    </div>
                ) : null}
            </div>
            {itemsCount ? (
                <>
                    <div className="cart-items">
                        <p className="cart-items__amount font-sans">
                            in the shopping cart <span className="cart-items__amount-color">{itemsCount}</span> items
                        </p>
                        {state?.cartLineItems.map((item, i) => (
                            <CartItem
                                key={item.id}
                                productId={item.productId}
                                name={item.name['en-US']}
                                price={item.price.value.centAmount / 10 ** item.price.value.fractionDigits}
                                discountPrice={calculateDiscountPrice(item)}
                                imgPath={defineImageUrl(item)}
                                totalPrice={item.totalPrice.centAmount / 10 ** item.totalPrice.fractionDigits}
                                initialQuantity={item.quantity}
                                portion={definePortion(item)}
                                spiciness={defineSpiciness(item)}
                                dispatch={dispatch}
                                index={i + 1}
                                state={state}
                                lineId={item.id}
                                promoCode={item.discountedPricePerQuantity.length}
                            />
                        ))}
                    </div>
                    <form className="cart-promo-code" onSubmit={applyPromoCode}>
                        <TextField
                            className="cart-promocode"
                            id="standard-basic"
                            placeholder="Enter Promo Code"
                            variant="standard"
                            autoComplete="off"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <CustomizedButton
                            sx={[{ '&&': { fontSize: 12, padding: '7px 16px 7px 16px', fontWeight: 'bold' } }]}
                            variant="contained"
                            className="font-serif"
                            onClick={applyPromoCode}
                        >
                            Apply Promo Code
                        </CustomizedButton>
                    </form>
                    <div className="cart-total-price">
                        <p style={{ fontSize: '24px' }}>Total price:</p>
                        {promoCode ? (
                            <div className="flex">
                                <p className="price text-4xl ml-2  " style={{ textDecoration: 'line-through' }}>
                                    {roundValue(calculateTotalPriceWithoutPromoCode())}
                                </p>
                                <span className="price text-4xl ml-2  "> / </span>
                                <p className="price text-4xl ml-2 font-medium text-mainRed whitespace-nowrap">
                                    {roundValue(calculateTotalPrice())} €
                                </p>
                            </div>
                        ) : (
                            <p className="text-4xl">{roundValue(calculateTotalPrice())} €</p>
                        )}
                    </div>
                    <ToastContainer {...toastProps} position="bottom-center" />
                </>
            ) : (
                <div className="empty-cart">
                    <p>Cart is empty</p>
                    <Link to="../menu">
                        <CustomizedButton
                            sx={{
                                '&&': {
                                    fontSize: 22,
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
                                },
                            }}
                            variant="contained"
                            className="font-serif"
                        >
                            Catalog page
                        </CustomizedButton>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Cart;
