// transition-all duration-${ANIM_TIME} ${filterMenu ? 'right-0' : 'right-[-320px]'}

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
                        ? `${
                              type === 'main' &&
                              'relative flex flex-col gap-1 hover:bg-bntActive/80  cursor-pointer z-40'
                          } ${type === 'aside' && 'hover:none'} px-[15px] py-[5px] rounded-3xl bg-bntActive`
                        : `${
                              type === 'main' && 'relative flex flex-col gap-1 hover:bg-btnHover  cursor-pointer z-40'
                          } ${type === 'aside' && 'hover:bg-bgBody'} px-[15px] py-[5px] rounded-3xl`
                }
            >
                <div className="flex items-center gap-1 z-30">
                    {item.name}
                    {item.submenu && type === 'main' && <KeyboardArrowDownIcon fontSize="inherit" color="inherit" />}
                </div>
            </NavLink>
            {item.submenu && type === 'aside' && (
                <CreateIconButton type="arrow" size="small" hoverColor="#D9D9D9" onClick={onArrow} />
            )}

            {item.submenu && (
                <ul
                    className={`absolute top-0  w-full px-[20px] py-[5px] rounded-3xl z-20 duration-${ANIM_TIME} ${
                        type === 'main' && 'left-0 bg-btnHover'
                    } ${type === 'aside' && 'left-full bg-gray-400 transition-all'} ${
                        dropdown ? 'visible opacity-100' : 'invisible opacity-0'
                    }`}
                >
                    {type === 'main' && <div className="h-[42px]" />}
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
