import { ClientResponse } from '@commercetools/platform-sdk';
import { Box, TextField } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import { ProductsContext } from '../context/ProductsContext';
import { QUERIES } from '../data/data';
import { LoadStates } from '../data/enums';
import { QueryArgs } from '../data/types';
import handleFlows from '../services/handleFlows';
import processProducts from '../services/processProducts';
import FilterMenu from './FilterMenu';
import Modal from './Modal';
import { ProductCard } from './ProductCard';
import CreateIconButton from './ui/IconButton';

interface ProductsProps {
    header: string;
    query: QueryArgs;
}

function Products(props: ProductsProps) {
    const { header, query } = props;

    const { productsQuery, setProductsQuery, data, setData, currentSearch } = useContext(ProductsContext);
    const { filterMenuStatus, openFilterMenu, closeFilterMenu } = useContext(ModalContext);

    const [loadState, setLoadState] = useState(LoadStates.loading);
    const [searchValue, setSearch] = useState('');
    // const [searchButtonState, setSearchButton] = useState(true);

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
                            limit: 30,
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

    const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const regex = /[a-z,A-Z,\s]/g;
        setSearch(input.match(regex)?.join('') || '');

        // if (e.target.value.length > 0) {
        //     setSearchButton(false);
        // } else {
        //     setSearchButton(true);
        // }
    };

    const onSearchButton = (e: React.FormEvent) => {
        e.preventDefault();
        setProductsQuery({
            filter: [''],
            search: searchValue,
        });
    };

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
            if (productsQuery.search !== undefined) {
                currentSearch.current =
                    productsQuery.search !== currentSearch.current ? productsQuery.search : currentSearch.current;
            }
            const req: QueryArgs = {
                filter: [currentPage.current, ...productsQuery.filter],
                sort: productsQuery.sort,
                search: currentSearch.current,
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
            <header className="flex justify-around">
                <h1 className="mt-4 mx-10 text-3xl text-center">{header}</h1>
                <Box sx={{ display: 'flex', gap: '5px', alignItems: 'flex-end', marginTop: '5px' }}>
                    <form onSubmit={onSearchButton}>
                        <TextField
                            id="standard-basic"
                            sx={{ mb: 1 }}
                            placeholder="Enter search request"
                            variant="standard"
                            autoComplete="off"
                            value={searchValue}
                            onChange={onSearchInput}
                        />
                        <CreateIconButton type="search" size="large" onClick={onSearchButton} />
                    </form>

                    <CreateIconButton type="filter" size="large" onClick={openFilterMenu} />
                </Box>
            </header>

            <div className="mt-2 px-5 grid grid-cols-1 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
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
            {filterMenuStatus && (
                <Modal onClose={closeFilterMenu}>
                    <FilterMenu onClose={closeFilterMenu} />
                </Modal>
            )}
        </>
    );
}

export default Products;
