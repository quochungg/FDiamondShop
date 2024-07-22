// bg-slate-400
// border-t-[1px] border-t-blue-950
//bg-[#061E47] (good)

import { Link } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";

const Footer = () => {

    const noContentPath = '/no-content';

    return (
        <>
            <div className='font-gantari'>
                {/* <div className="flex items-center justify-center h-72 border-t-[1px] bg-[#000035] text-white"> */}
                <div className='py-3'>

                    <ul className='flex flex-row'>
                        <li className='flex flex-col'>
                            <Link to={noContentPath}
                            >
                                <p className='font-semibold'>Customer Care</p>
                            </Link>

                            <Link to='tel:1800545457'>
                                <div className='flex space-x-2'>
                                    <img src='https://ecommo--ion.bluenile.com/bn-main/phone.447b6.svg' />
                                    <p>1800-54-54-57</p>
                                </div>
                            </Link>
                            <Link to='mailto:fdiamondshop391@gmail.com'
                            >
                                <div className='flex space-x-2'>
                                    <img src='https://ecommo--ion.bluenile.com/bn-main/email.6041e.svg' />
                                    <p>Email Us</p>
                                </div>
                            </Link>
                            <Link to={noContentPath}>Contact Us</Link>
                            <Link to={noContentPath}>FAQ</Link>
                        </li>



                        <li className='flex flex-col'>
                            <Link to={noContentPath}
                            >
                                <p className='font-semibold'>About FDIAMOND</p>
                            </Link>

                            <Link to={noContentPath}>Quality & Value</Link>
                            <Link to={noContentPath}>Review</Link>
                            <Link to={noContentPath}>Blog</Link>
                            <Link to={noContentPath}>Diamond Sustainability</Link>
                            <Link to={noContentPath}>Location</Link>
                            <Link to={noContentPath}>Career</Link>
                        </li>



                        <li className='flex flex-col capitalize'>
                            <Link to={noContentPath}
                            >
                                <p className='font-semibold'>Legal Area</p>
                            </Link>

                            <Link to={noContentPath}>terms of use</Link>
                            <Link to={noContentPath}>privacy policy</Link>
                            <Link to={noContentPath}>conditions of sale</Link>
                            <Link to={noContentPath}>credits</Link>
                            <Link to={noContentPath}>accessibility statement</Link>
                            <Link to={noContentPath}>Career</Link>
                        </li>


                        <li className='flex flex-col capitalize'>
                            <Link to={noContentPath}
                            >
                                <p className='font-semibold'>Follow Us</p>
                            </Link>

                            <div className='flex flex-row'>
                                <Link to={noContentPath}>terms of use</Link>
                                <Link to={noContentPath}>privacy policy</Link>
                                <Link to={noContentPath}>conditions of sale</Link>
                                <Link to={noContentPath}>credits</Link>
                                <Link to={noContentPath}>accessibility statement</Link>
                                <Link to={noContentPath}>Career</Link>
                            </div>

                        </li>
                    </ul>

                </div>

                <div>


                </div>
            </div>
        </>
    )
};

export default Footer;
