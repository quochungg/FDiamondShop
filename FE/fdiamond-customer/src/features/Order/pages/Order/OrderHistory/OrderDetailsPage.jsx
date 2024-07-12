import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getAllOrdersByUserId } from 'src/features/Order/api/APIs'
import { SlArrowLeft } from "react-icons/sl";
import { OrderDetailsLeftSection, OrderDetailsRightSection } from 'src/features/Order/components/index';
import { LoadingSpinner } from 'src/components/index';

const OrderDetailsPage = () => {
    const navigate = useNavigate();
    const param = useParams();
    const orderId = param.orderId;

    const [orderDetails, setOrderDetails] = useState(null);


    //Check if Order ID belongs to the user. If it does, set the order details.
    const checkOrderBelongsToUser = async () => {
        const response = await getAllOrdersByUserId();
        const orderArr = response.data.result;

        if (orderArr && orderArr.length > 0) {  // OrderArr is null if there are no orders
            const order = orderArr.find(order => {
                return order.orderId === Number.parseInt(orderId);
            })

            if (order) {
                setOrderDetails(order);
            } else {
                navigate('/order-not-found', { replace: true });
            }

        } else {
            navigate('/order-not-found', { replace: true });
        }
    }

    useEffect(() => {
        // Order ID is not a valid number
        if (isNaN(Number.parseInt(orderId))) {
            navigate('/order-not-found', { replace: true });
            return;
        }

        //Check if Order ID belongs to the user. If it does, set the order details.
        checkOrderBelongsToUser();

    }, [orderId])

    return (
        <>
            {orderDetails &&

                <div className='w-screen h-screen font-gantari bg-gray-50'>

                    {/* BEGIN HEADER */}
                    <header>
                        <div className='w-full shadow-sm border-[1px] py-5'>
                            <div className='w-[75%] mx-auto'>
                                <p
                                    // onClick={handleLogoClick}
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
                            <div className='grid grid-cols-[1fr_36.69%] gap-x-10'>

                                <div className='col-span-full mb-4'>
                                    <p className='uppercase text-center text-[2.5rem] font-[700] font-gantari text-[#151541] py-9'
                                    >
                                        Order Details
                                    </p>

                                    <Link to='/order-history'>
                                        <div className='flex items-center space-x-1'>
                                            <span><SlArrowLeft size={12} color='#0C1636' /></span>
                                            <p className='uppercase text-sm underline underline-offset-2 hover:text-[#17203e]'
                                            >
                                                Back to order history
                                            </p>
                                        </div>

                                    </Link>
                                </div>



                                {/* CHECKOUT LEFT SECTION */}
                                <OrderDetailsLeftSection />


                                {/* CHECKOUT RIGHT SECTION */}
                                <OrderDetailsRightSection
                                    orderDetails={orderDetails}
                                />

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
            }
        </>
    )
};

export default OrderDetailsPage;
