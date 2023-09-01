import { Slider } from '@mui/material';

type PriceSliderProps = {
    state: number[];
    setState: (value: number[]) => void;
    min: number;
    max: number;
};

export default function PriceSlider(props: PriceSliderProps) {
    const { state, setState, min, max } = props;

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setState(newValue as number[]);
    };

    const calculateValue = (value: number) => Math.floor((value / max) * max);

    return (
        <Slider
            value={state}
            onChange={handleSliderChange}
            valueLabelDisplay="on"
            scale={calculateValue}
            min={min}
            max={max}
        />
    );
}
