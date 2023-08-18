import { NavLink, Outlet } from 'react-router-dom';
import { NavLinks } from '../data/data';
import List from './ui/List';

export default function NavBar() {
    return (
        <>
            <nav className="hidden h-[70px] px-[10px] py-[10px] items-center bg-bgMenu md:flex">
                <ul className="w-full mx-[60px] font-serif text-xl text-white flex justify-items-start gap-[3%] lg:text-2xl lg:gap-[5%]">
                    {NavLinks.map((navlink) => (
                        <NavLink
                            to={navlink.url}
                            className={({ isActive }) =>
                                isActive
                                    ? 'px-[15px] py-[5px] rounded-3xl hover:none cursor-auto bg-bntActive last:ml-auto'
                                    : 'px-[15px] py-[5px] rounded-3xl hover:bg-btnHover cursor-pointer last:ml-auto'
                            }
                            key={navlink.id}
                        >
                            <List className="">{navlink.name}</List>
                        </NavLink>
                    ))}
                </ul>
            </nav>
            <Outlet />
        </>
    );
}
