/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CustomizedButton from '../../../components/ui/CustomizedButton';
import QuantitySelector from '../../../components/ui/QuantitySelector';
import Spicy from '../assets/img/spiciness.svg';

export interface IProductPageLayoutProps {
    productName?: string;
    productPrice?: number;
    productDiscountPrice?: number;
    ingredients?: string;
    picPath?: string;
    spiciness?: boolean;
}

export function ProductPageLayout(props: IProductPageLayoutProps) {
    const { productName, productPrice, productDiscountPrice, ingredients, picPath, spiciness } = props;
    const [messageOnLimit, setMessageOnLimit] = useState('');
    const handleOrderLimit = (isLimit: boolean) => {
        isLimit
            ? setMessageOnLimit(
                  `Planning a big order? Connect with us directly for special arrangements and personalized assistance. Let's make your meal for a larger group memorable!`
              )
            : setMessageOnLimit('');
    };

    return (
        <div className="max-w-full">
            <h3 className="text-2xl pl-20 pt-5 tracking-tighter whitespace-nowrap overflow-hidden">{productName}</h3>
            <div className="bg-white flex items-center">
                <div className="overflow-hidden text-center h-1/2 w-1/2 transition-transform transform group-hover:opacity-75">
                    <img
                        className="object-top mx-auto w-3/4 aspect-w-1 transition-transform origin-bottom group-hover:scale-105"
                        src={picPath}
                        alt={productName}
                    />
                </div>
                <div className="flex flex-col w-1/2 text-left relative">
                    <h4>Ingredients</h4>
                    {ingredients !== '' && (
                        <p
                            className="min-h-[2rem] max-w-sm font-serif mt-1 text-xl leading-4"
                            style={{ lineHeight: '18px' }}
                        >
                            {ingredients}
                        </p>
                    )}
                    <h4 className="mt-5">Price </h4>
                    <div className="flex items-center">
                        {productDiscountPrice !== 0 && (
                            <span
                                className="text-2xl mr-3 font-medium"
                                style={{ color: '#ff5757', textDecoration: 'line-through' }}
                            >
                                {productDiscountPrice}
                            </span>
                        )}
                        <span className="text-2xl font-medium">{productPrice}</span>
                        <span className="text-2xl ml-2 mr-8 font-medium">€</span>
                        <QuantitySelector onQuantityReached={handleOrderLimit} />
                        <p className="text-xs pt-4 text-center">{messageOnLimit}</p>
                    </div>
                    <h4 className="mt-5">Spiciness </h4>
                    {spiciness === true && (
                        <img
                            className="w-[35px] mt-1 border border-mainRed p-1 rounded-full"
                            src={Spicy}
                            alt="spicy icon"
                        />
                    )}
                    {spiciness === false && (
                        <div className="relative mt-1">
                            <img
                                className="w-[30px] border border-mainRed p-1 rounded-full"
                                src={Spicy}
                                alt="spicy icon"
                            />
                            <span className="absolute left-3 -top-1 transform rotate-45 h-[35px] border-2 rounded border-mainRed" />
                        </div>
                    )}

                    <div className="flex mt-10 items-center">
                        <Link to="./">
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
                            >
                                + SELECT
                            </CustomizedButton>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

ProductPageLayout.defaultProps = {
    productName: '',
    productPrice: 0,
    productDiscountPrice: 0,
    ingredients: '',
    picPath: '../',
    spiciness: false,
};
