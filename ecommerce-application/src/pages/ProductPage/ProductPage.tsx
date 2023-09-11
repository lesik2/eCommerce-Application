import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductVariant } from '@commercetools/platform-sdk';
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

function ProductPage() {
    const { key } = useParams();
    const [pathError, setPathError] = useState(false);
    const navigate = useNavigate();

    const [data, setData] = useState<IProductPageLayoutProps>({
        productId: '',
        productName: '',
        productPrice: 0,
        productDiscountPrice: 0,
        ingredients: '',
        picPaths: [],
        attributes: undefined,
        variants: undefined,
    });
    useEffect(() => {
        console.log(key);
        // eslint-disable-next-line consistent-return
        const fetchData = async () => {
            try {
                if (key) {
                    const res = await handleFlows().productProjections().withKey({ key }).get().execute();
                    return res;
                }
                throw new Error('incorrect path');
            } catch (error) {
                if (error instanceof Error) {
                    setPathError(true);
                    navigate('/404');
                }
                toast.error(error instanceof Error ? error.name : 'unexpected error in fetch product data', toastProps);
            }
        };
        fetchData()
            .then((res) => {
                if (res) {
                    const mainData = res.body;
                    const productId = mainData.id;
                    const productName = mainData.name['en-US'];
                    const ingredients = mainData.description ? mainData.description['en-US'] : undefined;
                    const getProductData = (variant: ProductVariant) => {
                        const variantId = variant.id;
                        const prices = variant.prices?.find((price) => price.value.centAmount);
                        const productPrice = prices
                            ? prices.value.centAmount / 10 ** prices.value.fractionDigits
                            : undefined;
                        const productDiscountPrice = prices?.discounted
                            ? prices.discounted.value.centAmount / 10 ** prices.discounted.value.fractionDigits
                            : undefined;
                        const images = variant.images ? variant.images : undefined;
                        const picPaths = images ? images.map((el) => el.url) : [];
                        const { attributes } = variant;
                        return { variantId, productPrice, productDiscountPrice, picPaths, attributes };
                    };
                    const masterProductData = {
                        productId,
                        productName,
                        ingredients,
                        ...getProductData(mainData.masterVariant),
                    };
                    if (!mainData.variants.length) {
                        setData(masterProductData);
                    } else {
                        const variantsProductData = mainData.variants.map((product) => getProductData(product));
                        const combinedProductData = { variants: variantsProductData, ...masterProductData };
                        setData(combinedProductData);
                    }
                }
            })
            .catch((error) => {
                toast.error(
                    error instanceof Error ? error.message : 'unexpected error in fetch product data',
                    toastProps
                );
            });
    }, [key]);

    return (
        <>
            {!pathError && (
                <ProductPageLayout
                    productId={data.productId}
                    productName={data.productName}
                    productPrice={data.productPrice}
                    productDiscountPrice={data.productDiscountPrice}
                    attributes={data.attributes}
                    ingredients={data.ingredients}
                    picPaths={data.picPaths}
                    variants={data.variants}
                />
            )}
            <ToastContainer {...toastProps} position="bottom-center" />
        </>
    );
}

export default ProductPage;
