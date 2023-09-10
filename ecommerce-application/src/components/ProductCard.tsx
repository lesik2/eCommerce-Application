/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import CustomizedButton from './ui/CustomizedButton';
import Chili from '../assets/img/chili.svg';
import Image from './ui/Image';
import { IAddToCartAction, ICartState } from '../reducer/reducer';
import { addItem } from '../services/cart';

export interface IProductCardProps {
    productName: string;
    productPrice: number;
    productPath: string;
    productDiscountPrice?: number;
    ingredients?: string;
    picPath?: string;
    spiciness?: boolean;
    productId: string;
}
export const MessageOnLimit = `Planning a big order? Connect with us directly for special arrangements and personalized assistance. Let's make your meal for a larger group memorable!`;

export function ProductCard({
    product,
    state,
    dispatch,
}: {
    product: IProductCardProps;
    state: ICartState;
    dispatch: React.Dispatch<IAddToCartAction>;
}) {
    const { productName, productPrice, productDiscountPrice, ingredients, productPath, picPath, spiciness, productId } =
        product;
    const disabled = state
        ? state.cartLineItems?.map((item) => item.productKey)?.some((item) => item === productPath)
        : false;
    const addToCart: () => void = () => {
        addItem({ productId, id: state?.cartId, version: state.cartVersion }).then((res) => {
            if (res)
                dispatch({
                    type: 'ADD_TO_CART',
                    payload: { cartLineItems: res.lineItems, cartId: res.id, cartVersion: res.version },
                });
        });
    };
    return (
        <div className="max-w-[24rem] p-2 place-self-center">
            <div className="group relative flex items-center flex-col">
                <div className="overflow-hidden text-center h-3/4 w-3/4 transition-transform transform group-hover:opacity-75">
                    <img
                        className="object-top mx-auto w-3/4 aspect-w-1 transition-transform origin-bottom group-hover:scale-105"
                        src={picPath}
                        alt={productName}
                    />
                </div>
                <div className="flex justify-center items-center">
                    <h3 className="text-2xl tracking-tighter whitespace-nowrap">
                        <Link to={productPath}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {productName}
                        </Link>
                    </h3>
                    {productDiscountPrice && (
                        <>
                            <p className="text-2xl ml-2 font-medium" style={{ textDecoration: 'line-through' }}>
                                {productPrice}
                            </p>
                            <p className="text-2xl ml-2 font-medium text-mainRed whitespace-nowrap">
                                {productDiscountPrice} €
                            </p>
                        </>
                    )}
                    {!productDiscountPrice && (
                        <p className="text-2xl ml-2 font-medium whitespace-nowrap">{productPrice} €</p>
                    )}
                    {spiciness === true && <Image className="w-10" image={Chili} alt="chili" />}
                </div>
                {ingredients !== '' && (
                    <p
                        className="min-h-[4rem] text-center font-serif mt-1 text-xl leading-4"
                        style={{ lineHeight: '18px' }}
                    >
                        {ingredients}
                    </p>
                )}
            </div>
            <div className={`flex justify-center items-center ${ingredients ? 'mt-[0px]' : 'mt-[10px]'}`}>
                <CustomizedButton
                    sx={{
                        '&&': {
                            fontSize: 20,
                            paddingLeft: '20px',
                            paddingRight: '20px',
                            marginRight: 2,
                            fontFamily: 'Poiret One, ui-sans-serif',
                        },
                    }}
                    variant="contained"
                    className="font-serif"
                    onClick={addToCart}
                    disabled={disabled}
                >
                    {disabled ? 'ADDED IN CART' : '+ SELECT'}
                </CustomizedButton>
            </div>
        </div>
    );
}
