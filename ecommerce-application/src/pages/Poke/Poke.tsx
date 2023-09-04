import Products from '../../components/Products';
import { PRODUCT_PAGES } from '../../data/data';

function Poke() {
    return (
        <Products header={PRODUCT_PAGES.Poke.header} link={PRODUCT_PAGES.Poke.link} query={PRODUCT_PAGES.Poke.query} />
    );
}

export default Poke;
