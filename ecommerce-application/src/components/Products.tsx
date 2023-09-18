/* eslint-disable max-len */
import { ClientResponse } from '@commercetools/platform-sdk';
import { Box, TextField } from '@mui/material';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import SyncIcon from '@mui/icons-material/Sync';
import { ModalContext } from '../context/ModalContext';
import { ProductsContext } from '../context/ProductsContext';
import { ANIM_TIME, toastProps } from '../data/data';
import { LoadStates } from '../data/enums';
import { IProductsPage } from '../data/interfaces';
import { QueryArgs } from '../data/types';
import handleFlows from '../services/handleFlows';
import processProducts from '../services/processProducts';
import FilterMenu from './FilterMenu';
import Modal from './Modal';
import CreateIconButton from './ui/IconButton';
import ProductCard from './ProductCard';

function Products(props: IProductsPage) {
    const LIMIT_OF_PRODS = 4;
    const DEFAULT_SORT = 'createdAt desc';

    const { header, link, query } = props;

    const { productsQuery, setProductsQuery, data, setData, currentSearch, clearFilterState } =
        useContext(ProductsContext);
    const { filterMenuStatus, openFilterMenu, closeFilterMenu } = useContext(ModalContext);

    const [loadState, setLoadState] = useState(LoadStates.loading);
    const [searchValue, setSearch] = useState('');
    const [filterMenu, setFilterMenu] = useState(false);
    const [isMenuShowed, showMenu] = useState(false);
    const [isMore, setIsMore] = useState(true);

    const currentPage = useRef<QueryArgs>({});
    const errorMessage = useRef('');
    const currentLimit = useRef(LIMIT_OF_PRODS);
    const currentSort = useRef<string | string[]>(DEFAULT_SORT);
    const currentFilter = useRef<string | string[]>('');
    const observer = useRef<IntersectionObserver>();

    // eslint-disable-next-line consistent-return
    const fetchData = async (q: QueryArgs) => {
        try {
            const res = await handleFlows()
                .productProjections()
                .search()
                .get({
                    queryArgs: {
                        filter: q.filter,
                        sort: q.sort,
                        'text.en-us': q.search,
                        limit: q.limit || LIMIT_OF_PRODS,
                    },
                })
                .execute();

            return res;
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'unexpected error in fetch product data', toastProps);
        }
    };

    function responseHandler(res: ClientResponse) {
        setIsMore(res.body.total > res.body.limit);
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
    };

    const onSearchButton = (e: React.FormEvent) => {
        e.preventDefault();
        setProductsQuery({
            search: searchValue,
        });
    };

    const lastProductRef = useCallback(
        (node: HTMLDivElement) => {
            if (loadState !== LoadStates.success) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && isMore) {
                    currentLimit.current += LIMIT_OF_PRODS;
                    setProductsQuery({
                        limit: currentLimit.current,
                    });
                }
            });
            if (node) observer.current.observe(node);
        },
        [loadState, isMore]
    );

    useEffect(() => {
        // currentLimit.current = 0;
        setData([]);
        clearFilterState();
        currentSearch.current = '';
        query.sort = [DEFAULT_SORT];
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
    }, []);
    // &${productsQuery}
    useEffect(() => {
        setLoadState(LoadStates.loading);
        if (productsQuery !== null && currentPage.current.filter !== undefined) {
            if (productsQuery.search !== undefined) {
                currentSearch.current =
                    productsQuery.search !== currentSearch.current ? productsQuery.search : currentSearch.current;
            }
            if (Array.isArray(productsQuery.sort) && productsQuery.sort !== undefined) {
                currentSort.current = productsQuery.sort.join('') === '' ? DEFAULT_SORT : productsQuery.sort;
            }
            if (Array.isArray(productsQuery.filter) && productsQuery.filter !== undefined) {
                currentFilter.current = productsQuery.filter.join('') === '' ? '' : productsQuery.filter;
            }

            const req: QueryArgs = {
                filter: [currentPage.current.filter as string, ...currentFilter.current],
                sort: currentSort.current || DEFAULT_SORT,
                search: currentSearch.current,
                limit: currentLimit.current,
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

    useEffect(() => {
        if (filterMenuStatus) {
            setFilterMenu(true);
            setTimeout(() => {
                showMenu(true);
            }, ANIM_TIME);
        } else {
            showMenu(false);
            setTimeout(() => {
                setFilterMenu(false);
            }, ANIM_TIME);
        }
    }, [filterMenuStatus]);
    return (
        <div className="h-full bg-[url('./assets/img/bg_product.svg'),_url('./assets/img/bg_product2.svg')] bg-content bg-no-repeat bg-fixed bg-[position:right_top_-100px,_left_0px_top_400px]">
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
                                        to={`../${l.split(' ').join('').toLowerCase()}`}
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
            <div className="mt-1 pb-16 mx-auto px-5 max-sm:px-0 2xl:w-[80%] max-lg:w-[100%] flex flex-wrap justify-center gap-x-6 gap-y-10">
                {loadState !== LoadStates.notfound &&
                    data.map((product, index) => {
                        if (data.length === index + 1) {
                            return (
                                <div key={product.productName} ref={lastProductRef}>
                                    <ProductCard product={product} />
                                </div>
                            );
                        }
                        return <ProductCard key={product.productName} product={product} />;
                    })}
            </div>
            {loadState === LoadStates.loading && (
                <div className="w-[80px] h-[80px] mx-auto mt-6 text-bgMenu animate-spin">
                    <SyncIcon fontSize="inherit" sx={{ fontSize: '80px' }} />
                </div>
            )}
            {loadState === LoadStates.notfound && (
                <p className="mt-3 text-center text-bgMenu text-2xl">Products not found</p>
            )}
            {loadState === LoadStates.error && (
                <p className="mt-3 text-center text-bgMenu text-2xl">{errorMessage.current}</p>
            )}
            {filterMenu && (
                <Modal onClose={closeFilterMenu}>
                    <FilterMenu
                        onClose={closeFilterMenu}
                        className={`transition-all duration-${ANIM_TIME} ${
                            isMenuShowed ? 'right-0' : 'right-[-384px]'
                        }`}
                    />
                </Modal>
            )}
            <ToastContainer {...toastProps} position="bottom-center" />
        </div>
    );
}

export default Products;
