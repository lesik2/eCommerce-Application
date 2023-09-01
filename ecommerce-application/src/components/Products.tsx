import { ClientResponse } from '@commercetools/platform-sdk';
import { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { QUERIES } from '../data/data';
import handleFlows from '../services/handleFlows';
import processProducts from '../services/processProducts';
import { IProductCardProps, ProductCard } from './ProductCard';

interface ProductsProps {
    header: string;
    query: string;
}

function Products(props: ProductsProps) {
    const { productsQuery, setProductsQuery } = useContext(ProductsContext);
    const { header, query } = props;

    const [data, setData] = useState<IProductCardProps[]>([]);

    // eslint-disable-next-line consistent-return
    const fetchData = async () => {
        try {
            let res: ClientResponse;
            if (productsQuery === QUERIES.MENU_QUERY) {
                res = await handleFlows().productProjections().get().execute();
            } else {
                res = await handleFlows()
                    .productProjections()
                    .search()
                    .get({
                        queryArgs: {
                            filter: productsQuery,
                        },
                    })
                    .execute();
            }

            return res;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log('render');
        console.log(query);
        setProductsQuery(query);
    }, []);

    useEffect(() => {
        console.log(productsQuery);
        if (productsQuery !== QUERIES.NO_QUERY) {
            fetchData()
                .then((res) => {
                    if (res) {
                        const processedProducts = processProducts(res);
                        setData(processedProducts);
                    }
                })
                .catch(console.log);
        }
    }, [productsQuery]);
    return (
        <>
            <h1 className="mt-4 text-2xl text-center">{header}</h1>
            <div className="mt-2 px-5 grid grid-cols-1 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {data.length > 0 ? (
                    data.map((product) => (
                        <ProductCard
                            key={product.productName}
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
        </>
    );
}

export default Products;
