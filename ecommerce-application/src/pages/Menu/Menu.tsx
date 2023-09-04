import Products from '../../components/Products';
import { PRODUCT_PAGES } from '../../data/data';

function Menu() {
    return (
        <Products header={PRODUCT_PAGES.Menu.header} link={PRODUCT_PAGES.Menu.link} query={PRODUCT_PAGES.Menu.query} />
    );
}

export default Menu;
