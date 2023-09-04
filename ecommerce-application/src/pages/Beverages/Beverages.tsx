import Products from '../../components/Products';
import { IProductsPage } from '../../data/interfaces';

function Beverages(pageBev: IProductsPage) {
    const { header, link, query, key } = pageBev;
    return <Products header={header} link={link} query={query} key={key} />;
    // return <Products {...pageBev} />;
}

export default Beverages;
