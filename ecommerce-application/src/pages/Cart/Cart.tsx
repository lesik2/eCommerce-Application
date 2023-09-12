import { useContext, useEffect, useState } from 'react';
import { LineItem } from '@commercetools/platform-sdk/dist/declarations/src';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import CartItem from './components/CartItem';
import './Cart.css';
import CreateIconButton from '../../components/ui/IconButton';
import CustomizedButton from '../../components/ui/CustomizedButton';

function Cart() {
    const { state, dispatch } = useContext(CartContext);
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
        return state?.cartLineItems
            .map((item) => item.totalPrice.centAmount / 10 ** item.totalPrice.fractionDigits)
            .reduce((sum, prev) => sum + prev, 0);
    };
    useEffect(() => {
        setItemsCount(state?.cartLineItems.length || 0);
    }, [state]);
    return (
        <div className="cart">
            <div className="cart-header">
                <h1 className="cart-title font-sans">Cart page</h1>
                {itemsCount ? (
                    <div className="remove-cart">
                        <p>Clear cart: </p>
                        <CreateIconButton type="remove-cart" size="large" />
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
                                id={item.id}
                                name={item.name['en-US']}
                                price={item.price.value.centAmount / 10 ** item.price.value.fractionDigits}
                                discountPrice={calculateDiscountPrice(item)}
                                imgPath={defineImageUrl(item)}
                                totalPrice={item.totalPrice.centAmount / 10 ** item.totalPrice.fractionDigits}
                                quantity={item.quantity}
                                portion={definePortion(item)}
                                spiciness={defineSpiciness(item)}
                                dispatch={dispatch}
                                index={i + 1}
                                setItemsCount={setItemsCount}
                            />
                        ))}
                    </div>
                    <div className="cart-order">
                        <p style={{ fontSize: '24px' }}>Total price:</p>
                        <p style={{ fontSize: '38px' }}>{calculateTotalPrice()} €</p>
                    </div>
                </>
            ) : (
                <div className="empty-cart">
                    <p style={{ fontSize: '30px' }}>Cart is empty</p>
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
