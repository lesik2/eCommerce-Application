/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
import { useState, useEffect, useContext } from 'react';
import { Attribute } from '@commercetools/platform-sdk';
import CustomizedButton from '../../../components/ui/CustomizedButton';
import Spicy from '../../../assets/img/spiciness.svg';
import ImageSlider from './ImageSlider';
import PortionButton from './PortionButton';
import { CartContext } from '../../../context/CartContext';
import { addItem } from '../../../services/cart';

export interface IProductPageLayoutProps {
    productId: string;
    productName?: string;
    productPrice?: number;
    productDiscountPrice?: number;
    ingredients?: string;
    picPaths?: string[];
    attributes?: Attribute[] | undefined;
    variants?: Partial<IProductPageLayoutProps>[] | never[];
}

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'minmax(120px, 1fr) minmax(150px, 400px)',
    gap: '10px',
    margin: '10px',
    placeContent: 'center start',
};

export function ProductPageLayout(props: IProductPageLayoutProps) {
    const { productId, productName, productPrice, productDiscountPrice, ingredients, picPaths, attributes, variants } =
        props;
    const { state, dispatch } = useContext(CartContext);
    const spiciness = attributes?.find((attribute) => attribute.name === 'spiciness')?.value;
    const portion = attributes?.find((attribute) => attribute.name === 'portion')?.value.key;
    const portionVariants = variants?.length
        ? variants.map((variant) => variant.attributes?.find((attr) => attr.name === 'portion')?.value.key)
        : undefined;
    const portions = portionVariants ? [portion, ...portionVariants] : [portion];
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
    const disabled = state
        ? state.cartLineItems?.map((item) => item.productId)?.some((item) => item === productId)
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

                    {portion && (
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
                    <div className="flex items-center">
                        <CustomizedButton
                            sx={{
                                '&&': {
                                    fontSize: 18,
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
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
