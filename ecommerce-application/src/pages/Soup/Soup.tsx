import Products from '../../components/Products';
import { QUERIES } from '../../data/data';

function Soup() {
    return <Products header="Soup" query={QUERIES.SOUP_QUERY} />;
}

export default Soup;
