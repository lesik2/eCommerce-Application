import Products from '../../components/Products';
import { PRODUCT_PAGES } from '../../data/data';

function Soup() {
    return (
        <Products header={PRODUCT_PAGES.Soup.header} link={PRODUCT_PAGES.Soup.link} query={PRODUCT_PAGES.Soup.query} />
    );
}

export default Soup;
