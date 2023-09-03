import Products from '../../components/Products';
import { QUERIES } from '../../data/data';

function Menu() {
    return <Products header="Menu" query={QUERIES.MENU_QUERY} />;
}

export default Menu;
