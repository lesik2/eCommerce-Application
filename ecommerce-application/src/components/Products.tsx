/* eslint-disable max-len */
import { ClientResponse } from '@commercetools/platform-sdk';
import { useContext, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { ProductsContext } from '../context/ProductsContext';
import { QUERIES, toastProps } from '../data/data';
import { QueryArgs } from '../data/types';
import handleFlows from '../services/handleFlows';
import processProducts from '../services/processProducts';
import { ProductCard } from './ProductCard';

interface ProductsProps {
    header: string;
    query: QueryArgs;
}

function Products(props: ProductsProps) {
    const { productsQuery, setProductsQuery, data, setData } = useContext(ProductsContext);
    const { header, query } = props;
    const currentPage = useRef('');

    // eslint-disable-next-line consistent-return
    const fetchData = async (q: QueryArgs) => {
        try {
            let res: ClientResponse;
            if (q.filter === QUERIES.MENU_QUERY.filter) {
                res = await handleFlows()
                    .productProjections()
                    .get({ queryArgs: { limit: 30 } })
                    .execute();
            } else {
                res = await handleFlows()
                    .productProjections()
                    .search()
                    .get({
                        queryArgs: {
                            filter: q.filter,
                            sort: q.sort,
                            'text.en-us': q.search,
                        },
                    })
                    .execute();
            }

            return res;
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'unexpected error in fetch product data', toastProps);
        }
    };

    useEffect(() => {
        fetchData(query)
            .then((res) => {
                if (res) {
                    const processedProducts = processProducts(res);
                    setData(processedProducts);
                }
            })
            .catch((error) => {
                toast.error(
                    error instanceof Error ? error.message : 'unexpected error in fetch product data',
                    toastProps
                );
            });
        currentPage.current = query.filter as string;
    }, []);
    // &${productsQuery}
    useEffect(() => {
        if (productsQuery !== null) {
            const req: QueryArgs = {
                filter: [currentPage.current, ...productsQuery.filter],
                sort: productsQuery.sort,
                search: productsQuery.search,
            };
            fetchData(req)
                .then((res) => {
                    if (res) {
                        const processedProducts = processProducts(res);
                        setData(processedProducts);
                    }
                })
                .catch((error) => {
                    toast.error(
                        error instanceof Error ? error.message : 'unexpected error in fetch product data',
                        toastProps
                    );
                });
        }
        return () => {
            setProductsQuery(null);
        };
    }, [productsQuery]);
    return (
        <>
            <h1 className="mt-4 text-2xl text-center">{header}</h1>
            <div className="mt-2 px-5 grid grid-cols-1 justify-around gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
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
                    <p className="text-center text-bgMenu animate-pulse text-2xl">Loading...</p>
                )}
            </div>
            <ToastContainer {...toastProps} position="bottom-center" />
        </>
    );
}

export default Products;
