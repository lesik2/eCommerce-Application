import React, { createContext, useRef, useState } from 'react';
/* eslint-disable react/jsx-no-constructed-context-values */
import { IProductCardProps, IProductsContext } from '../data/interfaces';
import { QueryArgs } from '../data/types';

export const ProductsContext = createContext<IProductsContext>({
    productsQuery: null,
    setProductsQuery: () => {},
    data: [],
    setData: () => {},
    currentSearch: { current: '' },
});

export function ProductsState({ children }: { children: React.ReactNode }) {
    const [productsQuery, setProducts] = useState<QueryArgs | null>(null);
    const [data, setData] = useState<IProductCardProps[]>([]);

    const currentSearch = useRef<string>('');

    const setProductsQuery = (query: QueryArgs | null) => {
        setProducts(query);
    };

    return (
        <ProductsContext.Provider value={{ productsQuery, setProductsQuery, data, setData, currentSearch }}>
            {children}
        </ProductsContext.Provider>
    );
}
