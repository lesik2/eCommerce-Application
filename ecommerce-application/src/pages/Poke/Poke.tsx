import Products from '../../components/Products';
import { QUERIES } from '../../data/data';

function Poke() {
    return <Products header="Poke" query={QUERIES.POKE_QUERY} />;
}

export default Poke;
