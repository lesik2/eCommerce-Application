/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useRef, useState } from 'react';
import { ModalContext } from '../context/ModalContext';
import { ProductsContext } from '../context/ProductsContext';
import { SortTypes } from '../data/types';
import CustomizedButton from './ui/CustomizedButton';
import CreateIconButton from './ui/IconButton';
import PriceSlider from './ui/PriceSlider';
import SortButtons from './ui/SortButtons';

type FilterMenuProps = {
    onClose: () => void;
    className: string;
};

export default function FilterMenu(props: FilterMenuProps) {
    const { onClose, className } = props;

    const { setProductsQuery, data, currentSearch, filterState } = useContext(ProductsContext);

    const { openFilterMenu, closeFilterMenu } = useContext(ModalContext);

    let pricesArray = data
        .map((item) => item.productPrice as number)
        .reduce((acc, item) => {
            if (item) {
                (acc as number[]).push(item);
            }
            return acc;
        }, []);

    const minPrice = useRef(Math.min(...pricesArray));
    const maxPrice = useRef(Math.max(...pricesArray));

    const [sliderValue, setSlider] = useState<number[]>([minPrice.current, maxPrice.current]);

    const [sortName, setSortName] = useState<SortTypes>(filterState.current.sortByName);

    const [sortPrice, setSortPrice] = useState<SortTypes>(filterState.current.sortByPrice);

    const [spiciness, setSpiciness] = useState<SortTypes>(filterState.current.spiciness);

    const onReset = () => {
        setSlider([minPrice.current, maxPrice.current]);
        setSortName('nosort');
        setSortPrice('nosort');
        setSpiciness('nosort');
        currentSearch.current = '';
    };

    const onFilter = () => {
        setProductsQuery({
            filter: [
                minPrice.current + maxPrice.current !== sliderValue[0] + sliderValue[1]
                    ? `variants.price.centAmount:range (${sliderValue[0] * 100} to ${sliderValue[1] * 100})`
                    : '',
                // `variants.price.centAmount:range (${sliderValue[0] * 100} to ${sliderValue[1] * 100})`,
                spiciness === 'spicy' ? 'variants.attributes.spiciness:true' : '',
                spiciness === 'notspicy' ? 'variants.attributes.spiciness:missing' : '',
            ],
            sort: [
                sortName !== 'nosort' ? `name.en-US ${sortName}` : '',
                sortPrice !== 'nosort' ? `price ${sortPrice}` : '',
            ],
        });
        filterState.current.sortByName = sortName;
        filterState.current.spiciness = spiciness;
        filterState.current.sortByPrice = sortPrice;
        closeFilterMenu();
    };

    useEffect(() => {
        pricesArray = data
            .map((item) => item.productPrice as number)
            .reduce((acc, item) => {
                if (item) {
                    (acc as number[]).push(item);
                }
                return acc;
            }, []);

        minPrice.current = Math.min(...pricesArray);
        maxPrice.current = Math.max(...pricesArray);
    }, [openFilterMenu]);

    return (
        <aside className={`absolute top-0 right-0 w-96 h-full py-10 px-5 bg-white/95 z-20 ${className}`}>
            <div className="flex flex-col gap-6 items-center">
                <div className="w-full flex flex-col items-center px-4">
                    <h2 className="text-2xl">Filter</h2>
                    <h3 className="self-start mb-8">Price:</h3>
                    <PriceSlider
                        state={sliderValue}
                        setState={setSlider}
                        min={minPrice.current}
                        max={maxPrice.current}
                    />
                    <h3 className="self-start my-2">Spicy:</h3>
                    <SortButtons type="spicy" state={spiciness} setState={setSpiciness} />
                </div>

                <div className="w-full flex flex-col items-center px-4">
                    <h2 className="text-2xl">Sort</h2>
                    <h3 className="self-start mb-2">By name:</h3>
                    <SortButtons type="name" state={sortName} setState={setSortName} />
                    <h3 className="self-start mt-3 text-left mb-2">By price:</h3>
                    <SortButtons type="price" state={sortPrice} setState={setSortPrice} />
                </div>
            </div>
            <div className="flex justify-around">
                <CustomizedButton
                    onClick={onFilter}
                    sx={{ width: 120, fontSize: 15, marginTop: 4 }}
                    variant="contained"
                >
                    FILTER
                </CustomizedButton>
                <CustomizedButton onClick={onReset} sx={{ width: 120, fontSize: 15, marginTop: 4 }} variant="contained">
                    RESET
                </CustomizedButton>
            </div>

            <div onClick={onClose} className="absolute top-6 right-6 text-black">
                <CreateIconButton type="close" size="large" />
            </div>
        </aside>
    );
}
