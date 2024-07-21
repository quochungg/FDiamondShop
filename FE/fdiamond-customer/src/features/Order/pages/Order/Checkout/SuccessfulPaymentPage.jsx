import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SuccessfulPaymentPage = () => {
    const navigate = useNavigate();


    return (
        <>
            {/* <div className="">
                <div>Successful Payment Page</div>
                <div className="mt-10">
                    <Link to='/'
                        className="bg-blue-950 text-white p-5"
                    >
                        Go To Homepage</Link>
                </div>
            </div> */}

            <div className='w-screen h-screen font-gantari bg-gray-100'>

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
                            <div className="w-[50%] shadow-cartline h-96">



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

export default SuccessfulPaymentPage;
