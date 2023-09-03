import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { IconButtonTypes, ButtonSize } from '../../data/types';

type ButtonProps = {
    type: IconButtonTypes;
    size: ButtonSize;
    hoverColor?: string;
    onClick?: (e: React.FormEvent) => void;
    disabled?: boolean;
};

export default function CreateIconButton({ type, size, hoverColor, onClick, disabled }: ButtonProps) {
    return (
        <IconButton
            onClick={onClick}
            aria-label={type}
            size={size}
            disabled={disabled}
            color="inherit"
            sx={{
                '&:hover': {
                    backgroundColor: hoverColor,
                },
            }}
        >
            {type === 'cart' && <ShoppingCartIcon fontSize="inherit" />}
            {type === 'login' && <LoginIcon fontSize="inherit" />}
            {type === 'logout' && <LogoutIcon fontSize="inherit" />}
            {type === 'logged' && <PersonIcon fontSize="inherit" />}
            {type === 'close' && <CloseIcon fontSize="inherit" color="inherit" />}
            {type === 'filter' && <FilterListIcon fontSize="inherit" color="inherit" />}
            {type === 'search' && <SearchIcon fontSize="inherit" color="inherit" />}
        </IconButton>
    );
}

CreateIconButton.defaultProps = {
    hoverColor: 'none',
    onClick: () => {},
    disabled: false,
};
