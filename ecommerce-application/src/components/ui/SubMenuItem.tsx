import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuItem, MenuType } from '../../data/types';
import CreateIconButton from './IconButton';
import { ANIM_TIME } from '../../data/data';

interface ItemsProps {
    item: MenuItem;
    type: MenuType;
    onClose?: () => void;
}

export default function SubMenuItem(props: ItemsProps) {
    const { item, type, onClose } = props;
    const [dropdown, setDropdown] = useState(false);

    const onMouseEnter = () => setDropdown(true);
    const onMouseLeave = () => setDropdown(false);
    const onArrow = () => setDropdown((prev) => !prev);

    return (
        <li
            className={`relative ${type === 'main' && 'last:ml-auto'} ${type === 'aside' && 'flex gap-1'}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <NavLink
                to={item.url}
                onClick={(type === 'aside' && onClose) || undefined}
                className={({ isActive }) =>
                    isActive
                        ? `${type === 'main' && 'flex flex-col gap-1 hover:bg-bntActive/80  cursor-pointer'} ${
                              type === 'aside' && 'hover:none'
                          } px-[15px] py-[5px] rounded-3xl bg-bntActive`
                        : `${type === 'main' && 'flex flex-col gap-1 hover:bg-btnHover  cursor-pointer'} ${
                              type === 'aside' && 'hover:bg-bgBody'
                          } px-[15px] py-[5px] rounded-3xl`
                }
            >
                <div className="flex items-center gap-1">
                    {item.name}
                    {item.submenu && type === 'main' && <KeyboardArrowDownIcon fontSize="inherit" color="inherit" />}
                </div>
            </NavLink>
            {item.submenu && type === 'aside' && (
                <CreateIconButton type="arrow" size="small" hoverColor="#D9D9D9" onClick={onArrow} />
            )}

            {item.submenu && (
                <ul
                    className={`absolute  w-auto px-[20px] py-[5px] rounded-3xl z-20 duration-${ANIM_TIME} ${
                        type === 'main' && 'left-2/3 bg-btnHover'
                    } ${type === 'aside' && 'left-full bg-gray-400 transition-all'} ${
                        dropdown ? 'top-8 visible opacity-100' : 'top-0 invisible opacity-0'
                    }`}
                >
                    {item.submenu.map((l) => (
                        <NavLink
                            key={l.id}
                            onClick={(type === 'aside' && onClose) || undefined}
                            className={({ isActive }) => (isActive ? 'underline' : '')}
                            to={`${item.url}/${l.url}`}
                        >
                            <li className="hover:underline">{l.name}</li>
                        </NavLink>
                    ))}
                </ul>
            )}
        </li>
    );
}

SubMenuItem.defaultProps = {
    onClose: () => {},
};
