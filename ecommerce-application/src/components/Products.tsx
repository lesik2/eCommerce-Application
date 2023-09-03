import { ClientResponse } from '@commercetools/platform-sdk';
import { useContext, useEffect, useRef, useState } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { QUERIES } from '../data/data';
import { LoadStates } from '../data/enums';
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
    const [loadState, setLoadState] = useState(LoadStates.loading);
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
            console.log(error);
        }
    };

    function responseHandler(res: ClientResponse) {
        const processedProducts = processProducts(res);
        if (processedProducts.length === 0) {
            setLoadState(LoadStates.notfound);
        } else if (processedProducts.length > 0) {
            setData(processedProducts);
            setLoadState(LoadStates.success);
        }
    }

    useEffect(() => {
        fetchData(query)
            .then((res) => {
                if (res) {
                    responseHandler(res);
                }
            })
            .catch(console.log);
        currentPage.current = query.filter as string;
    }, []);
    // &${productsQuery}
    useEffect(() => {
        setLoadState(LoadStates.loading);
        if (productsQuery !== null) {
            const req: QueryArgs = {
                filter: [currentPage.current, ...productsQuery.filter],
                sort: productsQuery.sort,
                search: productsQuery.search,
            };
            fetchData(req)
                .then((res) => {
                    if (res) {
                        responseHandler(res);
                    }
                })
                .catch(console.log);
        }
        return () => {
            setProductsQuery(null);
        };
    }, [productsQuery]);
    return (
        <>
            <h1 className="mt-4 text-2xl text-center">{header}</h1>
            <div className="mt-2 px-5 grid grid-cols-1 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {/* {data.length > 0
                    ? data.map((product) => (
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
                    : loadState === LoadStates.loading && (
                          <p className="text-center text-bgMenu animate-pulse text-2xl">Loading...</p>
                      )} */}
                {loadState === LoadStates.loading && (
                    <p className="text-center text-bgMenu animate-pulse text-2xl">Loading...</p>
                )}

                {loadState === LoadStates.success &&
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
                    ))}

                {loadState === LoadStates.notfound && (
                    <p className="text-center text-bgMenu text-2xl">Products not found</p>
                )}
            </div>
        </>
    );
}

export default Products;
