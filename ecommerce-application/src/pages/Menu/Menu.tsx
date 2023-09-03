import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductCard, IProductCardProps } from '../../components/ProductCard';
import handleFlows from '../../services/handleFlows';
import { toastProps } from '../../data/data';

// eslint-disable-next-line consistent-return
const fetchData = async () => {
    try {
        const res = await handleFlows()
            .productProjections()
            .get({
                queryArgs: {
                    limit: 30,
                },
            })
            .execute();
        return res;
    } catch (error) {
        toast.error(error instanceof Error ? error.message : 'unexpected error in fetch product data', toastProps);
    }
};

function Menu() {
    const [data, setData] = useState<IProductCardProps[]>([]);
    useEffect(() => {
        fetchData()
            .then((res) => {
                if (res) {
                    const mainData = res.body.results.filter((product) => product.published === true);
                    const processedProducts = mainData.map((publishedProd) => {
                        const productName = publishedProd.name['en-US'];
                        const prices = publishedProd.masterVariant.prices?.find((price) => price.country === 'PT');
                        const productPrice = prices
                            ? prices.value.centAmount / 10 ** prices.value.fractionDigits
                            : undefined;
                        const productDiscountPrice = prices?.discounted
                            ? prices.discounted.value.centAmount / 10 ** prices.discounted.value.fractionDigits
                            : undefined;
                        const ingredients = publishedProd.description ? publishedProd.description['en-US'] : undefined;
                        const productPath = publishedProd.key;
                        const images = publishedProd.masterVariant.images
                            ? publishedProd.masterVariant.images
                            : undefined;
                        const picPath = images ? images[0].url : undefined;
                        const { attributes } = publishedProd.masterVariant;
                        const spicinessAttribute = attributes
                            ? attributes.find((attr) => attr.name === 'spiciness')
                            : undefined;
                        const spiciness = spicinessAttribute ? spicinessAttribute.value : false;
                        return {
                            productName,
                            productPrice,
                            productDiscountPrice,
                            ingredients,
                            productPath,
                            picPath,
                            spiciness,
                        };
                    });
                    setData(processedProducts);
                }
            })
            .catch((error) => {
                toast.error(
                    error instanceof Error ? error.message : 'unexpected error in fetch product data',
                    toastProps
                );
            });
    }, []);

    return (
        <>
            <h1 className="py-2 text-2xl text-center">Menu page</h1>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {data.length > 0 ? (
                    data.map((product) => (
                        <ProductCard
                            key={Math.random()}
                            productName={product.productName}
                            productPrice={product.productPrice}
                            productDiscountPrice={product.productDiscountPrice}
                            spiciness={product.spiciness}
                            ingredients={product.ingredients}
                            productPath={product.productPath}
                            picPath={product.picPath}
                        />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <ToastContainer {...toastProps} position="bottom-center" />
        </>
    );
}

export default Menu;
