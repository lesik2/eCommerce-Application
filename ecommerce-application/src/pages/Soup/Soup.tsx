import Products from '../../components/Products';
import { IProductsPage } from '../../data/interfaces';

function Soup(pageSoup: IProductsPage) {
    const { header, link, query } = pageSoup;
    return <Products header={header} link={link} query={query} key={header} />;
}

export default Soup;
