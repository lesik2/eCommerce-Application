/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useState } from 'react';
import QuantitySelector from '../../../components/ui/QuantitySelector';
import { IAddToCartAction, ICartState } from '../../../reducer/cartReducer';
import './CartItem.css';
import Chili from '../../../assets/img/chili.svg';
import Image from '../../../components/ui/Image';
import CreateIconButton from '../../../components/ui/IconButton';
import { removeItem } from '../../../services/cart';

export interface ICArtItem {
    id: string;
    name: string;
    price: number;
    discountPrice: number;
    imgPath: string;
    totalPrice: number;
    quantity: number;
    portion: string;
    spiciness: boolean;
    index: number;
    dispatch: React.Dispatch<IAddToCartAction> | null;
    setItemsCount: React.Dispatch<React.SetStateAction<number>>;
    state: ICartState | null;
}
// eslint-disable-next-line max-len
export const MessageOnLimit = `Planning a big order? Connect with us directly for special arrangements and personalized assistance. Let's make your meal for a larger group memorable!`;
function CartItem(props: ICArtItem) {
    const {
        id,
        name,
        price,
        discountPrice,
        imgPath,
        totalPrice,
        quantity,
        portion,
        spiciness,
        index,
        dispatch,
        setItemsCount,
        state,
    } = props;
    const [messageOnLimit, setMessageOnLimit] = useState('');
    const handleOrderLimit = (isLimit: boolean) => {
        isLimit ? setMessageOnLimit(MessageOnLimit) : setMessageOnLimit('');
    };
    console.log(quantity);
    console.log(setItemsCount);
    const removeFromCart: () => void = () => {
        removeItem({ productId: id, id: state?.cartId, version: state?.cartVersion }).then((res) => {
            if (res && dispatch)
                dispatch({
                    type: 'REMOVE_FROM_CART',
                    payload: { cartLineItems: res.lineItems, cartId: res.id, cartVersion: res.version },
                });
        });
    };
    return (
        <div className="cart-item" id={id}>
            <p className="number-item">{index}</p>
            <img className="img-item" src={imgPath} alt={name} />
            <div className="main-info-item">
                <p className="name-item">{name}</p>
                <QuantitySelector onQuantityReached={handleOrderLimit} />
                <p className="text-xs pt-4 text-center">{messageOnLimit}</p>
                {discountPrice !== 0 && (
                    <div className="flex">
                        <p className="text-2xl ml-2 font-medium" style={{ textDecoration: 'line-through' }}>
                            {price}
                        </p>
                        <p className="text-2xl ml-2 font-medium text-mainRed whitespace-nowrap">{discountPrice} €</p>
                    </div>
                )}
                {discountPrice === 0 && <p className="text-2xl ml-2 font-medium whitespace-nowrap">{price} €</p>}
            </div>
            <div className="additional-info-item">
                {spiciness === true && <Image className="w-10" image={Chili} alt="chili" />}
                {portion && <div className="portion">{portion}</div>}
            </div>

            <div className="delete-item" onClick={removeFromCart}>
                <CreateIconButton type="close" size="large" />
            </div>
            <p className="text-2xl ml-2 font-medium whitespace-nowrap item-total-price">{totalPrice} €</p>
        </div>
    );
}

export default CartItem;
