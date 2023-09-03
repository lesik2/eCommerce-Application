/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CustomizedButton from './ui/CustomizedButton';
import QuantitySelector from './ui/QuantitySelector';
import Chili from '../assets/img/chili.svg';
import Image from './ui/Image';
import { MessageOnLimit } from '../data/data';

export interface IProductCardProps {
    productName?: string;
    productPrice?: number;
    productDiscountPrice?: number;
    ingredients?: string;
    productPath?: string;
    picPath?: string;
    spiciness?: boolean;
}

export function ProductCard(props: IProductCardProps) {
    const { productName, productPrice, productDiscountPrice, ingredients, productPath, picPath, spiciness } = props;
    const [messageOnLimit, setMessageOnLimit] = useState('');
    const handleOrderLimit = (isLimit: boolean) => {
        isLimit ? setMessageOnLimit(MessageOnLimit) : setMessageOnLimit('');
    };

    return (
        <div className="max-w-[23rem] p-2">
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
                        <a href={`product/${productPath}`}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {productName}
                        </a>
                    </h3>
                    {productDiscountPrice !== 0 && (
                        <p className="text-2xl ml-2 font-medium" style={{ textDecoration: 'line-through' }}>
                            {productPrice}
                        </p>
                    )}
                    {productDiscountPrice !== 0 && (
                        <>
                            <p className="text-2xl ml-2 font-medium" style={{ textDecoration: 'line-through' }}>
                                {productPrice}
                            </p>
                            <p className="text-2xl ml-2 font-medium text-mainRed whitespace-nowrap">
                                {productDiscountPrice} €
                            </p>
                        </>
                    )}
                    {!productDiscountPrice && <p className="text-2xl ml-2 font-medium">{productPrice} €</p>}
                    {spiciness === true && <Image className="" image={Chili} alt="chili" />}
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
            <div className={`flex justify-center items-center ${ingredients ? 'mt-[0px]' : 'md:mt-[68px] mt-[10px]'}`}>
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
                <QuantitySelector onQuantityReached={handleOrderLimit} />
            </div>
            <p className="text-xs pt-4 text-center">{messageOnLimit}</p>
        </div>
    );
}

ProductCard.defaultProps = {
    productName: '',
    productPrice: 0,
    productDiscountPrice: 0,
    ingredients: '',
    productPath: '',
    picPath: '../',
    spiciness: false,
};
