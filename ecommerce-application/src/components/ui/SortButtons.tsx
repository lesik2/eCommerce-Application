import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { SortButtonsTypes, SortTypes } from '../../data/types';

type SortButtonsProps = {
    state: string;
    setState: (newSort: SortTypes) => void;
    type: SortButtonsTypes;
};

export default function SortButtons(props: SortButtonsProps) {
    const { state, setState, type } = props;

    const handleSort = (event: React.MouseEvent<HTMLElement>, newSort: SortTypes) => {
        setState(newSort);
    };

    return (
        <>
            {(type === 'name' || type === 'price') && (
                <ToggleButtonGroup value={state} exclusive onChange={handleSort} aria-label="sort">
                    {type === 'name' && (
                        <ToggleButton value="icon" aria-label="sort by name" disabled>
                            <SortByAlphaIcon color="secondary" />
                        </ToggleButton>
                    )}
                    {type === 'price' && (
                        <ToggleButton value="icon" aria-label="sort by price" disabled>
                            <AttachMoneyIcon color="secondary" />
                        </ToggleButton>
                    )}
                    <ToggleButton value="nosort" aria-label="nosorting">
                        <FilterListOffIcon />
                    </ToggleButton>
                    <ToggleButton value="asc" aria-label="ascending">
                        <KeyboardDoubleArrowUpIcon />
                    </ToggleButton>
                    <ToggleButton value="desc" aria-label="descending">
                        <KeyboardDoubleArrowDownIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            )}
            {type === 'spicy' && (
                <ToggleButtonGroup value={state} exclusive onChange={handleSort} aria-label="spicy">
                    <ToggleButton value="icon" aria-label="spicy" disabled>
                        <LocalFireDepartmentIcon color="error" />
                    </ToggleButton>
                    <ToggleButton value="nosort" aria-label="all">
                        <FilterListOffIcon />
                    </ToggleButton>
                    <ToggleButton value="notspicy" aria-label="notspicy" color="success">
                        <CloseIcon />
                    </ToggleButton>
                    <ToggleButton value="spicy" aria-label="spicy" color="warning">
                        <CheckIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            )}
        </>
    );
}
