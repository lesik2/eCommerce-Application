/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CustomizedButton from '../../../components/ui/CustomizedButton';
import QuantitySelector from '../../../components/ui/QuantitySelector';
import Spicy from '../../../assets/img/spiciness.svg';
import ImageSlider from './ImageSlider';

export interface IProductPageLayoutProps {
    productName?: string;
    productPrice?: number;
    productDiscountPrice?: number;
    ingredients?: string;
    picPaths?: string[];
    spiciness?: boolean;
}

export function ProductPageLayout(props: IProductPageLayoutProps) {
    const { productName, productPrice, productDiscountPrice, ingredients, picPaths, spiciness } = props;
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
            <div className="bg-white flex items-center flex-wrap max-[550px]:flex-col">
                <div className="text-center h-1/2 w-1/2 transition-transform transform max-[550px]:w-[90%]">
                    {/* {picPaths?.map((url) => (
                        <img
                            className="object-top mx-auto w-3/4 aspect-w-1 transition-transform origin-bottom"
                            src={url}
                            alt={productName}
                        />
                    ))} */}
                    <ImageSlider images={picPaths} productName={productName} />
                </div>
                <div className="flex flex-col w-1/2 text-left relative max-[550px]:w-[90%]">
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
                    <div className="flex items-center flex-wrap">
                        {productDiscountPrice !== 0 && (
                            <span className="text-2xl mr-3 font-medium" style={{ textDecoration: 'line-through' }}>
                                {productPrice}
                            </span>
                        )}
                        {!productDiscountPrice && <p className="text-2xl font-medium">{productPrice} €</p>}
                        {productDiscountPrice !== 0 && (
                            <p className="text-2xl font-medium text-mainRed whitespace-nowrap">
                                {productDiscountPrice} €
                            </p>
                        )}
                        <QuantitySelector onQuantityReached={handleOrderLimit} />
                        <p className="text-xs pt-4 text-left">{messageOnLimit}</p>
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
                                        marginBottom: 2,
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
    picPaths: [],
    spiciness: false,
};
