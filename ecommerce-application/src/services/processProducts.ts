import { ClientResponse, ProductProjection } from '@commercetools/platform-sdk';

function processProducts(res: ClientResponse) {
    const mainData = res.body.results.filter((product: ProductProjection) => product.published === true);
    const processedProducts = mainData.map((publishedProd: ProductProjection) => {
        const productName = publishedProd.name['en-US'];
        const prices = publishedProd.masterVariant.prices?.find((price) => price.country === 'PT');
        const productPrice = prices ? prices.value.centAmount / 10 ** prices.value.fractionDigits : undefined;
        const productDiscountPrice = prices?.discounted
            ? prices.discounted.value.centAmount / 10 ** prices.discounted.value.fractionDigits
            : undefined;
        const ingredients = publishedProd.description ? publishedProd.description['en-US'] : undefined;
        const productPath = publishedProd.key;
        const images = publishedProd.masterVariant.images ? publishedProd.masterVariant.images : undefined;
        const picPath = images ? images[0].url : undefined;
        const { attributes } = publishedProd.masterVariant;
        const spicinessAttribute = attributes ? attributes.find((attr) => attr.name === 'spiciness') : undefined;
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
    return processedProducts;
}

export default processProducts;
