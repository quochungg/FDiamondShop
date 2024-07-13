import { useNavigate, Link } from "react-router-dom";
import AppLayout from "src/layout/AppLayout";

const OrderNotFound = () => {
    const navigate = useNavigate()


    return (
        <>
            <AppLayout>
                <div className='h-screen grid grid-cols-2'>
                    <div className="flex flex-col px-[3.5rem] justify-center bg-gray-50">
                        <div className=' font-gantari flex flex-col text-center'>
                            <p className='text-[3.5rem] font-[650] text-[#000035]'>NO ORDER FOUND</p>
                            <p className='text-[1.5rem] font-[380] mt-5'>We’re sorry, the order you’re looking for is not available.</p>
                            {/* mt-[4.3rem] */}
                            <div className=' flex justify-center items-start space-x-5 mt-3'>
                                <button className='text-white text-center mt-10 text-lg  py-5 font-gantari uppercase font-[530]
                            bg-blue-950 hover:bg-[#34427b] transition-colors duration-200 rounded-sm w-[35%]'
                                    onClick={() => navigate(-1)}
                                >
                                    Go Back
                                </button>

                                <Link className='text-white text-center mt-10 text-lg  py-5 font-gantari uppercase font-[530]
                            bg-blue-950 hover:bg-[#34427b] transition-colors duration-200 rounded-sm w-[35%]'
                                    to='/'
                                >
                                    Go to Homepage
                                </Link>
                            </div>

                        </div>

                    </div>
                    <div className='w-full h-full'>
                        <img
                            src='https://ecommo--ion.bluenile.com/bn-main/media_404.8d215.jpg'
                            className='object-cover w-full h-full'
                        />
                    </div>
                </div>
            </AppLayout>

        </>
    )
};

export default OrderNotFound;
