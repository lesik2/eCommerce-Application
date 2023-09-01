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
    spiciness?: boolean | undefined;
}
// grid mt-5 auto-rows-min items-start row-auto m-2 gap-3 sm:grid-cols-2 max-sm:grid-rows-4 max-w-[40vw] max-sm:max-w-[90vw]
const gridStyle = {
    minWidth: '40vw',
    display: 'grid',
    gridTemplateColumns: 'minmax(100px, 150px) minmax(150px, 500px)',
    gap: '10px',
    margin: '10px',
    placeContent: 'center start',
};

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
            <h3 className="text-2xl pl-[20%] max-w-2xl max-sm:pl-0 pt-5 tracking-tighter whitespace-nowrap max-sm:text-center">
                {productName}
            </h3>
            <div className="bg-white flex items-center max-sm:justify-center max-sm:flex-col justify-start">
                <div className="text-center transition-transform transform max-w-2xl max-sm:w-[90%] max-sm:mt-4">
                    <ImageSlider images={picPaths} productName={productName} />
                </div>
                <div style={gridStyle}>
                    <h4>Ingredients</h4>
                    {ingredients !== '' && <p className="font-serif text-xl">{ingredients}</p>}
                    <h4>Price </h4>
                    <div className="flex items-center text-xl flex-wrap">
                        {productDiscountPrice !== 0 && (
                            <span className="mr-3 font-medium" style={{ textDecoration: 'line-through' }}>
                                {productPrice}
                            </span>
                        )}
                        {!productDiscountPrice && <p className="font-medium">{productPrice} €</p>}
                        {productDiscountPrice !== 0 && (
                            <p className="font-medium text-mainRed whitespace-nowrap">{productDiscountPrice} €</p>
                        )}
                    </div>
                    <h4>Spiciness </h4>
                    <div className="max-[550px]:text-center">
                        {spiciness === true && (
                            <img
                                className="w-[35px] mt-1 border border-mainRed p-1 rounded-full max-[550px]:text-center"
                                src={Spicy}
                                alt="spicy icon"
                            />
                        )}
                        {spiciness === false && (
                            <div className="relative mt-1 mb-4">
                                <img
                                    className="w-[30px] border border-mainRed p-1 rounded-full"
                                    src={Spicy}
                                    alt="spicy icon"
                                />
                                <span className="absolute left-3 -top-1 transform rotate-45 h-[35px] border-2 rounded border-mainRed" />
                            </div>
                        )}
                    </div>

                    <QuantitySelector onQuantityReached={handleOrderLimit} />
                    <p className="text-xs text-left max-w-[400px] max-sm:order-last max-sm:col-span-2">
                        {messageOnLimit}
                    </p>
                    <div className="flex items-center">
                        <Link to="./">
                            <CustomizedButton
                                sx={{
                                    '&&': {
                                        fontSize: 20,
                                        paddingLeft: '20px',
                                        paddingRight: '20px',
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
    ingredients: 'No ingredient details provided',
    picPaths: [],
    spiciness: undefined,
};
