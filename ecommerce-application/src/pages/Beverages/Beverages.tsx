import Products from '../../components/Products';
import { IProductsPage } from '../../data/interfaces';

function Beverages(pageBev: IProductsPage) {
    const { header, link, query } = pageBev;
    return <Products header={header} link={link} query={query} key={header} />;
}

export default Beverages;
