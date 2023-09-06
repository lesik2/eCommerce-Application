/* eslint-disable max-len */
import { ClientResponse } from '@commercetools/platform-sdk';
import { Box, TextField } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { ModalContext } from '../context/ModalContext';
import { ProductsContext } from '../context/ProductsContext';
import { QUERIES, toastProps } from '../data/data';
import { LoadStates } from '../data/enums';
import { IProductsPage } from '../data/interfaces';
import { QueryArgs } from '../data/types';
import handleFlows from '../services/handleFlows';
import processProducts from '../services/processProducts';
import FilterMenu from './FilterMenu';
import Modal from './Modal';
import { ProductCard } from './ProductCard';
import CreateIconButton from './ui/IconButton';

function Products(props: IProductsPage) {
    const { header, link, query } = props;

    const { productsQuery, setProductsQuery, data, setData, currentSearch } = useContext(ProductsContext);
    const { filterMenuStatus, openFilterMenu, closeFilterMenu } = useContext(ModalContext);

    const [loadState, setLoadState] = useState(LoadStates.loading);
    const [searchValue, setSearch] = useState('');
    // const [searchButtonState, setSearchButton] = useState(true);

    const currentPage = useRef<QueryArgs>({});
    const errorMessage = useRef('');

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
            toast.error(error instanceof Error ? error.message : 'unexpected error in fetch product data', toastProps);
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
            .catch((error) => {
                toast.error(
                    error instanceof Error ? error.message : 'unexpected error in fetch product data',
                    toastProps
                );
            });
        currentPage.current.filter = query.filter;
        if (query.search !== undefined) {
            currentSearch.current = query.search;
        }
    }, []);
    // &${productsQuery}
    useEffect(() => {
        setLoadState(LoadStates.loading);
        if (productsQuery !== null && currentPage.current.filter !== undefined && productsQuery.filter !== undefined) {
            if (productsQuery.search !== undefined) {
                currentSearch.current =
                    productsQuery.search !== currentSearch.current ? productsQuery.search : currentSearch.current;
            }
            const req: QueryArgs = {
                filter: [currentPage.current.filter as string, ...productsQuery.filter],
                sort: productsQuery.sort,
                search: currentSearch.current,
            };
            fetchData(req)
                .then((res) => {
                    if (res) {
                        responseHandler(res);
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
            <header>
                <title className="flex justify-between px-2 lg:px-5">
                    <h1 className="mt-4 text-3xl text-center">{header}</h1>
                    <Box sx={{ display: 'flex', gap: '5px', alignItems: 'flex-end', marginTop: '5px' }}>
                        <form className="flex" onSubmit={onSearchButton}>
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
                </title>
                <nav className="px-4 lg:px-7 text-xl text-bgMenu">
                    {link.map((l, index, array) => (
                        <span key={l}>
                            {index < array.length - 1 && (
                                <>
                                    <Link
                                        className="underline hover:text-black cursor-pointer"
                                        to={`../${l.toLowerCase()}`}
                                    >
                                        {l}
                                    </Link>
                                    <span> / </span>
                                </>
                            )}

                            {index === array.length - 1 && <span className="">{l}</span>}
                        </span>
                    ))}
                </nav>
            </header>
            {loadState === LoadStates.loading && (
                <p className="mt-3 text-center text-bgMenu animate-pulse text-2xl">Loading...</p>
            )}
            {loadState === LoadStates.notfound && (
                <p className="mt-3 text-center text-bgMenu text-2xl">Products not found</p>
            )}
            {loadState === LoadStates.error && (
                <p className="mt-3 text-center text-bgMenu text-2xl">{errorMessage.current}</p>
            )}
            <div className="mt-1 mx-auto px-5 max-sm:px-0 2xl:w-[80%] max-lg:w-[100%] flex flex-wrap justify-center gap-x-6 gap-y-10">
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
            </div>
            {filterMenuStatus && (
                <Modal onClose={closeFilterMenu}>
                    <FilterMenu onClose={closeFilterMenu} />
                </Modal>
            )}
            <ToastContainer {...toastProps} position="bottom-center" />
        </>
    );
}

export default Products;
