import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineShopping } from "react-icons/ai";
import { SlLocationPin } from "react-icons/sl";
import { PiHeadphones } from "react-icons/pi";
import { useAuth } from "src/context/AuthProvider";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, token } = useAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            const userLocalStorage = JSON.parse(localStorage.getItem('user'));
            setUser(userLocalStorage);
        } else {
            setUser(null);
        }
    }, [token]);


    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/login', { state: { previousUrl: location.pathname } })
    }

    const handleSignOut = (e) => {
        e.preventDefault();
        logout();

    }

    const iconSize = 25;

    return (
        <>
            <div className={`flex items-center font-gantari text-[14px] font-[500] py-5 border-b-[1px] px-12`}>

                <div className="flex-1 flex gap-5 items-center">
                    <Link
                        to=''
                        className="flex items-center gap-2"
                    >
                        <span><PiHeadphones size={iconSize} /></span>
                        <p>1800 54 54 57</p>
                    </Link>

                    <Link
                        to=''
                        className="flex items-center gap-2"
                    >
                        <span><SlLocationPin size={iconSize} /></span>
                        <p>Stores</p>
                    </Link>
                </div>


                <div className="flex flex-1 justify-center text-[40px] font-[550] tracking-wider pl-12">
                    <Link to='/'>
                        <div className="font-playfair">FDIAMOND</div>
                    </Link>
                </div>


                <div className="flex-1 flex justify-end items-center gap-7">
                    <div>
                        <Link title="Search">
                            <IoIosSearch size={iconSize} />
                        </Link>
                    </div>

                    {user
                        ? (
                            <div className="relative group w-[140px] px-2 hover:shadow hover:shadow-gray-400/50 py-3 rounded-t-md">
                                <div className="flex gap-2 items-center w-full">
                                    <Link title="Login" className="">
                                        <VscAccount size={iconSize} />
                                    </Link>
                                    <p className="text-[14px] font-gantari w-full whitespace-nowrap overflow-hidden text-ellipsis">
                                        {user.firstName} {user.lastName}
                                    </p>
                                </div>

                                <div
                                    className="mt-[12px] z-10 absolute left-0 w-full hidden group-hover:block group-hover:shadow group-hover:shadow-gray-400/50 bg-white rounded-b-md"
                                >
                                    <Link className="text-[14px] block pl-8 py-4 hover:text-slate-600">My Account</Link>
                                    <Link className="text-[14px] block pl-8 py-4 hover:text-slate-600">My Orders</Link>
                                    <Link onClick={handleSignOut} className="text-[14px] block pl-8 py-4 hover:font-[800] border-t-[1px] font-[700]">Sign Out</Link>
                                </div>
                            </div>
                        )
                        : (
                            <div>
                                <Link onClick={handleLogin} title="Login">
                                    <VscAccount size={iconSize} />
                                </Link>
                            </div>
                        )
                    }

                    <div >
                        <Link title="Cart">
                            <AiOutlineShopping size={iconSize} />
                        </Link>
                    </div>

                </div>

            </div>

            {/* 
            <nav className="bg-gray-800">
                <ul className="flex space-x-4 p-4">
                    <Link to='/' className="relative group">
                        <Link to='/' className="text-white px-4 py-2 block">Men</Link>
                        <ul className="absolute left-0 hidden group-hover:block bg-white text-black shadow-md">
                            <li><a href="/men/tops" className="block px-4 py-2 hover:bg-gray-200">Tops Tops Tops Tops Tops</a></li>
                            <li><a href="/men/bottoms" className="block px-4 py-2 hover:bg-gray-200">Bottoms</a></li>
                            <li><a href="/men/outerwear" className="block px-4 py-2 hover:bg-gray-200">Outerwear</a></li>
                        </ul>
                    </Link>
                    <Link className="relative group">
                        <a href="#" className="text-white px-4 py-2 block">Women</a>
                        <ul className="absolute left-0 hidden group-hover:block bg-white text-black shadow-md">
                            <li><a href="/women/tops" className="block px-4 py-2 hover:bg-gray-200">Tops</a></li>
                            <li><a href="/women/bottoms" className="block px-4 py-2 hover:bg-gray-200">Bottoms</a></li>
                            <li><a href="/women/outerwear" className="block px-4 py-2 hover:bg-gray-200">Outerwear</a></li>
                        </ul>
                    </Link>

                </ul>
            </nav> */}

            <div className="relative flex justify-center gap-x-16 font-gantari text-[16px] py-[15px] border-b-[1px] uppercase font-[450]">
                {/* <ul className="group"> */}
                <Link
                    className="no-underline hover:underline hover:underline-offset-8"
                    to="/product/diamond"
                >
                    Diamonds
                </Link>
                {/* <ul className="absolute left-0 right-0 hidden group-hover:block bg-white text-black shadow-md]">
                        <li><a href="/women/tops" className="border-t-[1px] mt-3 block px-4 py-2 hover:bg-gray-200">Tops</a></li>
                        <li><a href="/women/bottoms" className="block px-4 py-2 hover:bg-gray-200">Bottoms</a></li>
                        <li><a href="/women/outerwear" className="block px-4 py-2 hover:bg-gray-200">Outerwear</a></li>
                    </ul>
                </ul> */}




                <Link
                    className="no-underline hover:underline hover:underline-offset-8"
                    to="/product/engagement ring"
                >
                    Engagement Rings
                </Link>


                <Link
                    className="no-underline hover:underline hover:underline-offset-8"
                    to="/product/earring"
                >
                    Earrings
                </Link>
                <Link
                    className="no-underline hover:underline hover:underline-offset-8"
                    to="/product/necklace"
                >
                    Necklaces
                </Link>
            </div>

            <div className="invisible h-0 group-hover/diamond:visible group-hover/diamond:h-10">
                <p>abc</p>
            </div>



        </>
    );
};

export default Header;

