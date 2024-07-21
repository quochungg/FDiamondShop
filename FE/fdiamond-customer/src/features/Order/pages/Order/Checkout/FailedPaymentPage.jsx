import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import shoppingBagIcon from 'src/assets/failed-shopping-bag.svg';


const FailedPaymentPage = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className='w-screen h-auto font-gantari bg-gray-50'>

                {/* BEGIN HEADER */}
                <header>
                    <div className='w-full shadow-sm border-[1px] py-5'>
                        <div className='w-[75%] mx-auto'>
                            <p
                                onClick={() => navigate('/')}
                                className="text-[2.5rem] font-[700] tracking-wide font-playfair text-[#000035] cursor-pointer"
                            >
                                FDIAMOND
                            </p>

                        </div>
                    </div>
                </header>
                {/* END HEADER */}


                {/* BEGIN BODY SECTION */}
                <div className='w-[75%] mx-auto'>

                    {/* BEGIN MAIN */}
                    <main>
                        <div className="my-20 flex justify-center items-center">
                            <div className="w-[55%] shadow-cartline h-auto flex justify-center items-center flex-col p-12">

                                <div className="w-32">
                                    <img src={shoppingBagIcon} />
                                </div>

                                <p className="capitalize mt-10 text-2xl font-lora font-[600] text-red-700"
                                >
                                    Oh <span className='lowercase'>no</span>, your payment failed !
                                </p>

                                <p className="mt-6 text-center text-lg">
                                    Could not process order. Order status changed from <b>Pending</b> payment to <b>Failed</b>.
                                </p>

                                <div className="flex flex-row text-white space-x-5 font-gantari w-full mt-9 text-[1.05rem] mb-6">
                                    <button
                                        onClick={() => { navigate('/order-history') }}
                                        className="flex-1">
                                        <p className="w-full border-[1px] border-blue-950 text-black py-4 rounded-md hover:bg-blue-950 hover:text-white transition-colors duration-300 capitalize"
                                        >
                                            View your order history
                                        </p>
                                    </button>

                                    <button
                                        onClick={() => { navigate('/product') }}
                                        className="flex-1">
                                        <p className="w-full bg-yellow-500 py-4 rounded-md hover:bg-yellow-400 hover:text-white transition-colors duration-300 font-[550] capitalize"
                                        >
                                            Continue shopping
                                        </p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                    {/* END MAIN */}




                    {/* BEGIN FOOTER */}
                    <footer>
                        <div className='py-5 border-t-[2px]'>
                            <p className='text-xs'>© 2024 FDIAMOND. All Rights Reserved.</p>
                        </div>
                    </footer>
                    {/* END FOOTER  */}



                </div>
                {/* END BODY SECTION */}

            </div>

        </>
    )
};

export default FailedPaymentPage;
