/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Attribute } from '@commercetools/platform-sdk';
import CustomizedButton from '../../../components/ui/CustomizedButton';
import QuantitySelector from '../../../components/ui/QuantitySelector';
import Spicy from '../../../assets/img/spiciness.svg';
import ImageSlider from './ImageSlider';
import PortionButton from './PortionButton';

export interface IProductPageLayoutProps {
    productName?: string;
    productPrice?: number;
    productDiscountPrice?: number;
    ingredients?: string;
    picPaths?: string[];
    attributes?: Attribute[] | undefined;
    variants?: IProductPageLayoutProps[] | never[];
}

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'minmax(120px, 1fr) minmax(150px, 400px)',
    gap: '10px',
    margin: '10px',
    placeContent: 'center start',
};

export function ProductPageLayout(props: IProductPageLayoutProps) {
    const { productName, productPrice, productDiscountPrice, ingredients, picPaths, attributes, variants } = props;
    const spiciness = attributes?.find((attribute) => attribute.name === 'spiciness')?.value;
    const portion = attributes?.find((attribute) => attribute.name === 'portion')?.value.key;
    const portionVariants = variants?.length
        ? variants.map((variant) => variant.attributes?.find((attr) => attr.name === 'portion')?.value.key)
        : undefined;
    const portions = portionVariants ? [portion, ...portionVariants] : [portion];
    const [messageOnLimit, setMessageOnLimit] = useState('');
    const handleOrderLimit = (isLimit: boolean) => {
        isLimit
            ? setMessageOnLimit(
                  `Planning a big order? Connect with us directly for special arrangements and personalized assistance. Let's make your meal for a larger group memorable!`
              )
            : setMessageOnLimit('');
    };
    const productPrices = variants?.length
        ? [productPrice, ...variants.map((variant) => variant.productPrice)]
        : [productPrice];
    const productDiscountPrices = variants?.length
        ? [productDiscountPrice, ...variants.map((variant) => variant.productDiscountPrice)]
        : [productDiscountPrice];

    const [price, setPrice] = useState(productPrice);
    const [discountPrice, setDiscountPrice] = useState(productDiscountPrice);
    useEffect(() => {
        setPrice(productPrice);
        setDiscountPrice(productDiscountPrice);
    }, [productPrice, productDiscountPrice]);
    const [activeButton, setActiveButton] = useState(0);
    const handleButtonClick = (index: number) => {
        setActiveButton(index);
        setPrice(productPrices[index]);
        setDiscountPrice(productDiscountPrices[index]);
    };

    return (
        <div className="max-w-full">
            <h3 className="text-2xl pl-[20%] max-w-2xl max-sm:pl-0 pt-5 tracking-tighter whitespace-nowrap max-sm:text-center">
                {productName}
            </h3>
            <div className="bg-white flex items-center max-sm:justify-center max-sm:flex-col justify-start">
                <div className="basis-2/5 max-sm:w-[90%] max-sm:mt-4">
                    <ImageSlider images={picPaths} productName={productName} />
                </div>
                <div style={gridStyle} className="flex-2 flex-grow-1">
                    <h4 className="items-center">Ingredients</h4>
                    {ingredients !== '' && <p className="font-serif items-center text-xl">{ingredients}</p>}
                    <h4>Price </h4>
                    <div className="flex items-center text-xl flex-wrap">
                        {productDiscountPrice !== 0 && (
                            <span className="mr-3 font-medium" style={{ textDecoration: 'line-through' }}>
                                {price} €
                            </span>
                        )}
                        {!productDiscountPrice && <p className="font-medium">{price} €</p>}
                        {productDiscountPrice !== 0 && (
                            <p className="font-medium text-mainRed whitespace-nowrap">{discountPrice} €</p>
                        )}
                    </div>

                    {spiciness !== undefined && (
                        <>
                            <h4 className="inline-block items-center">Spiciness </h4>
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
                        </>
                    )}

                    {portions && (
                        <>
                            <h4>Portion </h4>
                            <div className="flex justify-start gap-2">
                                {portions?.length &&
                                    portions.map((name, index) => {
                                        const key = index;
                                        return (
                                            <PortionButton
                                                name={name}
                                                active={activeButton === key}
                                                key={key}
                                                onClick={() => handleButtonClick(key)}
                                            />
                                        );
                                    })}
                            </div>
                        </>
                    )}

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
    attributes: undefined,
    variants: [],
};
