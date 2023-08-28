import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductPageLayout, IProductPageLayoutProps } from './components/ProductPageLayout';
import handleFlows from '../../services/handleFlows';

const toastProps = {
    autoClose: 3000,
    hideProgressBar: true,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
};
// const productPath = 'wok_pork_ried_rice';
const productPath = 'chicken_broth';
// eslint-disable-next-line consistent-return
const fetchData = async () => {
    try {
        const res = await handleFlows().productProjections().withKey({ key: productPath }).get().execute();
        return res;
    } catch (error) {
        toast.error(error instanceof Error ? error.message : 'unexpected error in fetch product data', toastProps);
    }
};

function ProductPage() {
    const [data, setData] = useState<IProductPageLayoutProps>({
        productName: '',
        productPrice: 0,
        productDiscountPrice: 0,
        ingredients: '',
        picPath: '',
        spiciness: false,
    });
    useEffect(() => {
        fetchData()
            .then((res) => {
                if (res) {
                    const mainData = res.body;
                    const productName = mainData.name['en-US'];
                    const prices = mainData.masterVariant.prices?.find((price) => price.country === 'PT');
                    const productPrice = prices
                        ? prices.value.centAmount / 10 ** prices.value.fractionDigits
                        : undefined;
                    const productDiscountPrice = prices?.discounted
                        ? prices.discounted.value.centAmount / 10 ** prices.discounted.value.fractionDigits
                        : undefined;
                    const ingredients = mainData.description ? mainData.description['en-US'] : undefined;
                    const images = mainData.masterVariant.images ? mainData.masterVariant.images : undefined;
                    const picPath = images ? images[0].url : undefined;
                    const { attributes } = mainData.masterVariant;
                    const spicinessAttribute = attributes
                        ? attributes.find((attr) => attr.name === 'spiciness')
                        : undefined;
                    const spiciness = spicinessAttribute ? spicinessAttribute.value : false;
                    setData({
                        productName,
                        productPrice,
                        productDiscountPrice,
                        ingredients,
                        picPath,
                        spiciness,
                    });
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
            <ProductPageLayout
                productName={data.productName}
                productPrice={data.productPrice}
                productDiscountPrice={data.productDiscountPrice}
                spiciness={data.spiciness}
                ingredients={data.ingredients}
                picPath={data.picPath}
            />
            <ToastContainer {...toastProps} position="bottom-center" />
        </>
    );
}

export default ProductPage;
