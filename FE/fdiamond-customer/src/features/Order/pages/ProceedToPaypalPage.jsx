import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThreeDots } from "react-loader-spinner";


const ProceedToPaypalPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [accessible, setAccessible] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    //This page must be accessed from clicking 'Make Payment' from Checkout Page
    useEffect(() => {
        window.scrollTo(0, 0);
        if (location.state === null || location.state.paymentUrl === null) {
            navigate('/cart');
        } else {
            setAccessible(true);
        }
    }, []);


    useEffect(() => {
        let timer;
        if (accessible) {
            timer = setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [accessible]);


    if (!isLoading) {
        window.location.href = location.state.paymentUrl;
    }

    return (
        <>
            {accessible &&
                <>
                    {isLoading &&

                        <div className="flex flex-col justify-center items-center h-screen">
                            <div className='font-gantari text-[4.7rem] font-[750] text-gray-400'>
                                Proceeding to {""}
                                <span className='italic text-[#003087] font-poppins'>Pay</span>
                                <span className='italic text-[#009cde] font-poppins'>Pal</span>
                            </div>

                            <div className='mt-4'>
                                <ThreeDots
                                    visible={true}
                                    height="80"
                                    width="90"
                                    color="#bababa"
                                    radius="9"
                                    ariaLabel="three-dots-loading"
                                    wrapperClass=""
                                />
                            </div>

                        </div>
                    }

                </>
            }
        </>
    )
};

export default ProceedToPaypalPage;

// #e5e5e5

// #009cde
// #003087
// #012169