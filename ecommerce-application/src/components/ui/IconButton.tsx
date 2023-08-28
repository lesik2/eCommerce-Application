/* eslint-disable react/require-default-props */
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { IconButtonTypes, ButtonSize } from '../../data/types';

type ButtonProps = {
    type: IconButtonTypes;
    size: ButtonSize;
};

export default function CreateIconButton({ type, size }: ButtonProps) {
    return (
        <IconButton aria-label={type} size={size} color="inherit">
            {type === 'cart' && <ShoppingCartIcon fontSize="inherit" />}
            {type === 'login' && <LoginIcon fontSize="inherit" />}
            {type === 'logout' && <LogoutIcon fontSize="inherit" />}
            {type === 'logged' && <PersonIcon fontSize="inherit" />}
            {type === 'close' && <CloseIcon fontSize="inherit" color="inherit" />}
            {type === 'pen' && <CreateOutlinedIcon fontSize="inherit" color="inherit" />}
            {type === 'delete' && <BackspaceIcon fontSize="inherit" color="inherit" />}
        </IconButton>
    );
}
