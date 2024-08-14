import { useNavigate, useLocation } from "react-router-dom";

const SideMenuBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menus = [
        {
        
            optionRoute: '/register',
            displayOptionName: 'Home',
            activeImage: '/images/usercolored.png',
            inactiveImage: '/images/user.png'
        
    },
        {
            optionRoute: '/calendar',
            displayOptionName: 'Calendar',
            activeImage: '/images/learnercolored.png',
            inactiveImage: '/images/learner.png'
        },
        {
            optionRoute: '/events',
            displayOptionName: 'Events',
            activeImage: '/images/usercolored.png',
            inactiveImage: '/images/user.png'
        },
       
    ];


    const navigatetoRoute = (route:any) => {
        navigate(route);
    };

    return (
        <div className="w-full h-full z-50 cursor">
            <ul className="list-unstyled mt-4 p-4">
                {menus.map((menu) => (
                    <li
                        key={menu.displayOptionName}
                        className={`mt-4 flex align-items-center cursor ${location.pathname === menu.optionRoute ? 'active-menu' : ''}`}
                        onClick={() => navigatetoRoute(menu.optionRoute)}
                    >
                        <img
                            src={location.pathname === menu.optionRoute ? menu.activeImage : menu.inactiveImage}
                            alt=""
                            className="imgheight cursor"
                        />
                        <div className="px-1 py-1 ms-2 text-black cursor">
                            {menu.displayOptionName}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideMenuBar;
