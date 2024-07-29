import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getAllOrdersByUserId, getPayPalLinkForPending, getOnlineWarranty } from 'src/features/Order/api/APIs'
import { SlArrowLeft } from "react-icons/sl";
import { OrderDetailsLeftSection, OrderDetailsRightSection } from 'src/features/Order/components/index';
import AppLayout from "src/layout/AppLayout";

const OrderDetailsPage = () => {
    const navigate = useNavigate();
    const param = useParams();
    const orderId = param.orderId;

    const [orderDetails, setOrderDetails] = useState(null);

    const [pendingPayPalLink, setPendingPayPalLink] = useState(null);

    const [onlineWarrantyLink, setOnlineWarrantyLink] = useState(null);


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


    const getPendingPaypalLink = async () => {
        const response = await getPayPalLinkForPending(orderDetails.orderId);
        if (response.data.result) {
            setPendingPayPalLink(response.data.result);
        }
    }


    const getOnlineWarrantyLink = async () => {
        const response = await getOnlineWarranty(orderDetails.orderId);
        setOnlineWarrantyLink(response.config.url);
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


    useEffect(() => {
        if (orderDetails) {
            const orderStatuses = ['Ordered', 'Preparing', 'Shipping', 'Idle', 'Delivered'];
            if (orderStatuses.includes(orderDetails.status)) {
                getOnlineWarrantyLink();
            }
        }

        if (orderDetails && orderDetails.status === 'Pending') {
            getPendingPaypalLink();
        }
    }, [orderDetails])



    return (
        <>
            {orderDetails &&
                <AppLayout>
                    <div className='w-screen h-auto font-gantari bg-gray-50 mb-10'>


                        {/* BEGIN BODY SECTION */}
                        <div className='w-[75%] mx-auto'>

                            {/* BEGIN MAIN */}
                            <main>
                                <div className='grid grid-cols-[1fr_36.69%] gap-x-10'>

                                    <div className='col-span-full mt-16 mb-5'>

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
                                    <OrderDetailsLeftSection
                                        orderDetails={orderDetails}
                                        onlineWarrantyLink={onlineWarrantyLink}
                                    />


                                    {/* CHECKOUT RIGHT SECTION */}
                                    <OrderDetailsRightSection
                                        orderDetails={orderDetails}
                                        pendingPayPalLink={pendingPayPalLink}
                                    />

                                </div>
                            </main>
                            {/* END MAIN */}


                        </div>
                        {/* END BODY SECTION */}

                    </div>
                </AppLayout>

            }
        </>
    )
};

export default OrderDetailsPage;
