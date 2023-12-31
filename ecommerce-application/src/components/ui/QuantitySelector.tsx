import { useState } from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type QuantitySelectorProps = {
    onQuantityReached: (isLimit: boolean) => void;
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

function QuantitySelector({ onQuantityReached, quantity, setQuantity }: QuantitySelectorProps) {
    const [addDisabled, setAddDisabled] = useState(false);
    const [removeDisabled, setRemoveDisabled] = useState(quantity === 1);
    const orderLimit = 16;
    const handleIncrease = () => {
        setRemoveDisabled(false);
        if (quantity < orderLimit - 1) {
            setQuantity(quantity + 1);
            onQuantityReached(false);
        } else {
            setQuantity(orderLimit);
            onQuantityReached(true);
            setAddDisabled(true);
        }
    };

    const handleDecrease = () => {
        setAddDisabled(false);
        if (quantity > 1) {
            if (quantity === orderLimit) onQuantityReached(false);
            setQuantity(quantity - 1);
        }
        if (quantity === 1) setRemoveDisabled(true);
    };

    return (
        // eslint-disable-next-line max-len
        <div className="ml-2 max-h-[40px] max-w-[105px] bg-white rounded-md font-serif text-xl flex items-center shadow-[0_4px_4px_0px_rgba(0,0,0,0.3)]">
            <IconButton
                sx={[
                    { '&&': { padding: '0', borderRadius: '6px 0 0 6px', height: '40px', paddingRight: '3px' } },
                    { '&:hover': { backgroundColor: 'bgBody' } },
                ]}
                onClick={handleDecrease}
                disabled={removeDisabled}
            >
                <RemoveIcon />
            </IconButton>
            <p className="w-12 px-1 text-center">{quantity}</p>
            <IconButton
                sx={[
                    { '&&': { padding: '0', borderRadius: '0 6px 6px 0', height: '40px', paddingLeft: '3px' } },
                    { '&:hover': { backgroundColor: 'bgBody' } },
                ]}
                onClick={handleIncrease}
                disabled={addDisabled}
            >
                <AddIcon />
            </IconButton>
        </div>
    );
}

export default QuantitySelector;
