/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { TextField } from '@mui/material';
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
};

export default function FilterMenu(props: FilterMenuProps) {
    const { onClose } = props;

    const { setProductsQuery, data } = useContext(ProductsContext);

    const { openFilterMenu, closeFilterMenu } = useContext(ModalContext);

    let pricesArray = data.map((item) => item.productPrice as number);

    const minPrice = useRef(Math.min(...pricesArray));
    const maxPrice = useRef(Math.max(...pricesArray));

    const [searchValue, setSearch] = useState('');

    const [sliderValue, setSlider] = useState<number[]>([minPrice.current, maxPrice.current]);

    const [sortName, setSortName] = useState<SortTypes>('nosort');

    const [sortPrice, setSortPrice] = useState<SortTypes>('nosort');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const onReset = () => {
        setSlider([minPrice.current, maxPrice.current]);
        setSortName('nosort');
        setSortPrice('nosort');
        setSearch('');
    };

    const onFilter = () => {
        setProductsQuery({
            filter: [
                '',
                minPrice.current + maxPrice.current !== sliderValue[0] + sliderValue[1]
                    ? `variants.price.centAmount:range (${sliderValue[0] * 100} to ${sliderValue[1] * 100})`
                    : '',
            ],
            search: searchValue,
            sort: [
                sortName !== 'nosort' ? `name.en-US ${sortName}` : '',
                sortPrice !== 'nosort' ? `price ${sortPrice}` : '',
            ],
        });
        closeFilterMenu();
    };

    useEffect(() => {
        pricesArray = data.map((item) => item.productPrice as number);
        minPrice.current = Math.min(...pricesArray);
        maxPrice.current = Math.max(...pricesArray);
    }, [openFilterMenu]);

    return (
        <aside className="absolute top-0 left-0 w-96 h-full py-10 px-5 bg-white/95">
            <div className="flex flex-col gap-6 items-center">
                <div className="w-full">
                    <h2 className="text-center text-2xl">Search</h2>
                    <TextField
                        className="w-full"
                        required
                        variant="standard"
                        autoComplete="off"
                        value={searchValue}
                        onChange={onChange}
                        helperText="Enter search line"
                    />
                </div>

                <div className="w-full px-4">
                    <h2 className="text-center text-2xl">Filter</h2>
                    <h3 className="text-left mb-8">Price:</h3>
                    <PriceSlider
                        state={sliderValue}
                        setState={setSlider}
                        min={minPrice.current}
                        max={maxPrice.current}
                    />
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
