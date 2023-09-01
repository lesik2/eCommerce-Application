import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
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
        productName: '',
        productPrice: 0,
        productDiscountPrice: 0,
        ingredients: '',
        picPaths: [],
        spiciness: false,
    });
    useEffect(() => {
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
                    const picPaths = images ? images.map((el) => el.url) : [];
                    const { attributes } = mainData.masterVariant;
                    const spicinessAttribute = attributes
                        ? attributes.find((attr) => attr.name === 'spiciness')
                        : undefined;
                    const spiciness = spicinessAttribute ? spicinessAttribute.value : undefined;
                    setData({
                        productName,
                        productPrice,
                        productDiscountPrice,
                        ingredients,
                        picPaths,
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
    }, [key]);

    return (
        <>
            {!pathError && (
                <ProductPageLayout
                    productName={data.productName}
                    productPrice={data.productPrice}
                    productDiscountPrice={data.productDiscountPrice}
                    spiciness={data.spiciness}
                    ingredients={data.ingredients}
                    picPaths={data.picPaths}
                />
            )}
            <ToastContainer {...toastProps} position="bottom-center" />
        </>
    );
}

export default ProductPage;
