import React, { createContext, useRef, useState } from 'react';
/* eslint-disable react/jsx-no-constructed-context-values */
import { IProductCardProps, IProductsContext } from '../data/interfaces';
import { QueryArgs, SortTypes } from '../data/types';

export const ProductsContext = createContext<IProductsContext>({
    productsQuery: null,
    setProductsQuery: () => {},
    data: [],
    setData: () => {},
    currentSearch: { current: '' },
    filterState: { current: {} },
    clearFilterState: () => {},
});

export function ProductsState({ children }: { children: React.ReactNode }) {
    const [productsQuery, setProducts] = useState<QueryArgs | null>(null);
    const [data, setData] = useState<IProductCardProps[]>([]);

    const currentSearch = useRef<string>('');

    const filterState = useRef<Record<string, SortTypes>>({
        spiciness: 'nosort',
        sortByName: 'nosort',
        sortByPrice: 'nosort',
    });

    const clearFilterState = () => {
        filterState.current.spiciness = 'nosort';
        filterState.current.sortByName = 'nosort';
        filterState.current.sortByName = 'nosort';
    };

    const setProductsQuery = (query: QueryArgs | null) => {
        setProducts(query);
    };

    return (
        <ProductsContext.Provider
            value={{ productsQuery, setProductsQuery, data, setData, currentSearch, filterState, clearFilterState }}
        >
            {children}
        </ProductsContext.Provider>
    );
}
