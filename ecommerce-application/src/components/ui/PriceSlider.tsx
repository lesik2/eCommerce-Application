import { Slider } from '@mui/material';

type PriceSliderProps = {
    state: number[];
    setState: (value: number[]) => void;
    min: number;
    max: number;
};

export default function PriceSlider(props: PriceSliderProps) {
    const { state, setState, min, max } = props;

    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        setState(newValue as number[]);
    };

    const calculateValue = (value: number) => +((value / max) * max).toFixed(1);

    return (
        <Slider
            value={state}
            onChange={handleSliderChange}
            valueLabelDisplay="on"
            scale={calculateValue}
            step={0.1}
            min={min}
            max={max}
        />
    );
}
