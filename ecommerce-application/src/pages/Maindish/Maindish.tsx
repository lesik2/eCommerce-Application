import Products from '../../components/Products';
import { IProductsPage } from '../../data/interfaces';

function Maindish(pageMaindish: IProductsPage) {
    const { header, link, query } = pageMaindish;
    return <Products header={header} link={link} query={query} key={header} />;
}

export default Maindish;
