import { useState } from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type QuantitySelectorProps = {
    onQuantityReached: (isLimit: boolean) => void;
};

function QuantitySelector({ onQuantityReached }: QuantitySelectorProps) {
    const [quantity, setQuantity] = useState(1);
    const [addDisabled, setAddDisabled] = useState(false);
    const [removeDisabled, setRemoveDisabled] = useState(true);
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
        <div className="ml-2 bg-white rounded-md font-serif text-2xl flex items-center">
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
