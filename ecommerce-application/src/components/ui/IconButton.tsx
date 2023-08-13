import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { IconButtonTypes } from '../../utils/types/icon-buttons-types';
import { ButtonSize } from '../../utils/types/button-size';

type ButtonProps = {
    type: IconButtonTypes;
    size: ButtonSize;
};

export default function CreateIconButton({ type, size }: ButtonProps) {
    return (
        <IconButton aria-label={type} size={size}>
            {type === 'cart' && <ShoppingCartIcon fontSize="inherit" />}
            {type === 'login' && <LoginIcon fontSize="inherit" />}
            {type === 'logout' && <LogoutIcon fontSize="inherit" />}
        </IconButton>
    );
}
