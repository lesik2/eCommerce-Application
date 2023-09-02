import React, { createContext, useState } from 'react';
import { IProductCardProps } from '../components/ProductCard';
/* eslint-disable react/jsx-no-constructed-context-values */
import { IProductsContext } from '../data/interfaces';
import { QueryArgs } from '../data/types';

export const ProductsContext = createContext<IProductsContext>({
    productsQuery: null,
    setProductsQuery: () => {},
    data: [],
    setData: () => {},
});

export function ProductsState({ children }: { children: React.ReactNode }) {
    const [productsQuery, setProducts] = useState<QueryArgs | null>(null);
    const [data, setData] = useState<IProductCardProps[]>([]);

    const setProductsQuery = (query: QueryArgs | null) => {
        setProducts(query);
    };

    return (
        <ProductsContext.Provider value={{ productsQuery, setProductsQuery, data, setData }}>
            {children}
        </ProductsContext.Provider>
    );
}
