// import { useEffect, useState } from 'react';
// import { ProductCard, IProductCardProps } from '../../components/ProductCard';
// import handleFlows from '../../services/handleFlows';

// eslint-disable-next-line consistent-return
// const fetchData = async () => {
//     try {
//         const res = await handleFlows()
//             .products()
//             .withId({ ID: '4a8b8f7e-e11c-46c4-b07a-62b2bd1e400b' })
//             .get()
//             .execute();
//         return res;
//     } catch (error) {
//         console.log(error);
//     }
// };

function Menu() {
    // const [data, setData] = useState<IProductCardProps | undefined>(undefined);
    // useEffect(() => {
    //     fetchData()
    //         .then((res) => {
    //             if (res) {
    //                 const mainData = res.body.masterData.current;
    //                 const productName = mainData.name['en-US'];
    //                 const prices = mainData.masterVariant.prices?.find((price) => price.country === 'PT');
    //                 const productPrice = prices
    //                     ? prices.value.centAmount / 10 ** prices.value.fractionDigits
    //                     : undefined;
    //                 const productDiscountPrice = prices?.discounted
    //                     ? prices.discounted.value.centAmount / 10 ** prices.discounted.value.fractionDigits
    //                     : undefined;
    //                 const ingredients = mainData?.description ? mainData.description['en-US'] : undefined;
    //                 const productPath = mainData.masterVariant.key;
    //                 const images = mainData.masterVariant.images ? mainData.masterVariant.images : undefined;
    //                 const picPath = images ? images[0].url : undefined;
    //                 const { attributes } = mainData.masterVariant;
    //                 const spicinessAttribute = attributes
    //                     ? attributes.find((attr) => attr.name === 'spiciness')
    //                     : undefined;
    //                 const spiciness = spicinessAttribute ? spicinessAttribute.value : false;
    //                 setData({
    //                     productName,
    //                     productPrice,
    //                     productDiscountPrice,
    //                     ingredients,
    //                     productPath,
    //                     picPath,
    //                     spiciness,
    //                 });
    //             }
    //         })
    //         .catch(console.log);
    // }, []);

    return (
        <>
            <h1 className="py-2 text-2xl text-center">Menu page</h1>
            {/* {data ? (
                <ProductCard
                    productName={data.productName}
                    productPrice={data.productPrice}
                    productDiscountPrice={data.productDiscountPrice}
                    spiciness={data.spiciness}
                    ingredients={data.ingredients}
                    productPath={data.productPath}
                    picPath={data.picPath}
                />
            ) : (
                <p>Loading...</p>
            )} */}
        </>
    );
}

export default Menu;
