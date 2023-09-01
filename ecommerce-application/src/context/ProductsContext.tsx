import React, { createContext, useState } from 'react';
import { QUERIES } from '../data/data';
/* eslint-disable react/jsx-no-constructed-context-values */
import { IProductsContext } from '../data/interfaces';

export const ProductsContext = createContext<IProductsContext>({
    productsQuery: QUERIES.NO_QUERY,
    setProductsQuery: () => {},
});

export function ProductsState({ children }: { children: React.ReactNode }) {
    const [productsQuery, setProducts] = useState(QUERIES.NO_QUERY);

    const setProductsQuery = (query: string) => {
        setProducts(query);
        console.log('inside');
        console.log(query);
    };

    return <ProductsContext.Provider value={{ productsQuery, setProductsQuery }}>{children}</ProductsContext.Provider>;
}
