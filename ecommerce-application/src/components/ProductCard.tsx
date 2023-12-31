/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import CustomizedButton from './ui/CustomizedButton';
import Chili from '../assets/img/chili.svg';
import Image from './ui/Image';
import { addItem } from '../services/cart';
import { CartContext } from '../context/CartContext';
import { IProductCardProps } from '../data/interfaces';

export default function ProductCard({ product }: { product: IProductCardProps }) {
    const { productName, productPrice, productDiscountPrice, ingredients, productPath, picPath, spiciness, productId } =
        product;
    const { state, dispatch } = useContext(CartContext);
    const disabled = state
        ? state.cartLineItems?.map((item) => item.productKey)?.some((item) => item === productPath)
        : false;
    const addToCart: () => void = () => {
        addItem({ productId, id: state?.cartId, version: state?.cartVersion }).then((res) => {
            if (res && dispatch)
                dispatch({
                    type: 'ADD_TO_CART',
                    payload: { cartLineItems: res.lineItems, cartId: res.id, cartVersion: res.version },
                });
        });
    };
    return (
        <div className="w-[320px] last:ml-0 flex flex-col justify-end items-center overflow-hidden">
            <div className="group relative h-full min-w-[311px] flex items-center flex-col justify-end">
                <div className="overflow-hidden shrink h-3/4 w-3/4 transition-transform transform group-hover:opacity-75">
                    <img
                        className="object-top mx-auto w-3/4 aspect-w-1 transition-transform origin-bottom group-hover:scale-105"
                        src={picPath}
                        alt={productName}
                    />
                </div>
                <div className="flex justify-center items-center">
                    <h3 className="text-2xl tracking-tighter text-center">
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
                        className="min-h-[4rem] text-center font-serif mt-1 text-xl leading-4 overflow-hidden"
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
