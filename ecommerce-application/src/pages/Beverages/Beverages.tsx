import Products from '../../components/Products';
import { QUERIES } from '../../data/data';

function Beverages() {
    return <Products header="Beverages" query={QUERIES.BEVERAGES_QUERY} />;
}

export default Beverages;
