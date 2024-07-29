import { TailSpin } from 'react-loader-spinner'
import { useState } from 'react'
import { cancelOrder } from 'src/features/Order/api/APIs'
import { useNavigate } from 'react-router-dom';
import { OrderStatusStepper } from 'src/features/Order/components/index'


const OrderListItem = ({ orderItem, setResetAfterCancel }) => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const dateString = orderItem.orderDate;

    const orderDate = new Date(dateString);

    const formattedDate = orderDate.toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    })

    const formattedTime = orderDate.toLocaleTimeString("en-US", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true // Ensures the time is in AM/PM format
    });


    // Compare today's date with the order date based on milliseconds
    const today = new Date();

    const differenceInMilliseconds = today.getTime() - orderDate.getTime();

    const has12HoursPassed = differenceInMilliseconds >= 12 * 60 * 60 * 1000;

    const statusColor = ['Ordered', 'Preparing', 'Shipping', 'Idle', 'Pending'].includes(orderItem.status) ? 'text-emerald-600' :
        orderItem.status === 'Delivered' ? 'text-yellow-600' : 'text-red-700';


    const handleCancelOrder = async (orderId) => {
        const result = confirm('Are you sure you want to cancel this order?');
        if (result) {
            setIsLoading(true);
            const response = await cancelOrder(orderId);
            if (response.status === 200) {
                setResetAfterCancel(prev => !prev);
            }
        }
        setIsLoading(false);
    }

    const handleViewOrderDetails = async () => {
        navigate(`/order-details/${orderItem.orderId}`);
    }


    return (
        <>
            <div className='w-full h-auto shadow-cartline font-gantari rounded-md'>

                <div className="flex flex-col">

                    <div>
                        <p className="text-2xl border-b-[1px] bg-blue-950 text-white py-4 px-8 font-[600] rounded-t-md tracking-wide">
                            Order #{orderItem.orderId}
                        </p>
                    </div>

                    <ul className="flex flex-col space-y-5 px-16 py-6 list-disc">
                        <li><span className='font-[550]'>Order Total:</span> ${orderItem.totalPrice.toLocaleString()}</li>
                        <li><span className='font-[550]'>Order Placed:</span> {formattedDate} at {formattedTime}</li>
                        <li>
                            <span className='font-[550]'>Order Status: </span>
                            <span className={statusColor + ' font-[650]'}>{orderItem.status}</span>

                            {/* Order Status Stepper */}
                            {!['Pending', 'Failed', 'Cancelled'].includes(orderItem.status) &&
                                (
                                    <div className='mt-10 mb-3'>
                                        <OrderStatusStepper status={orderItem.status} />
                                    </div>
                                )
                            }
                        </li>

                    </ul>

                    {orderItem.status === 'Ordered' &&
                        <div className='w-auto self-start mb-7 px-12'>
                            <p className='text-red-700 text-md bg-red-100 py-3 px-5 rounded-full border-[1px] border-red-800'
                            >
                                You can only cancel your order within 12 hours of placing it. After 12 hours, it will be processed.
                            </p>
                        </div>
                    }


                    <div className='flex justify-end border-t-[1px] border-gray-300'>
                        {orderItem.status === 'Ordered' ?
                            (
                                <>
                                    <div className="self-end flex space-x-4 px-7 py-3">
                                        <div>
                                            <button onClick={handleViewOrderDetails}>
                                                <p className="border-[1px] text-white bg-[#000035] hover:bg-[#26265c] transition-colors duration-200
                                                 text-md font-[650] py-4 px-7 rounded-md uppercase">
                                                    View Order Details
                                                </p>
                                            </button>
                                        </div>

                                        {isLoading ?
                                            (
                                                <p className="text-white text-md font-[550] bg-red-800 py-4 px-14 rounded-md uppercase">
                                                    <TailSpin
                                                        visible={true}
                                                        height="25"
                                                        color="#e5e5e5"
                                                        ariaLabel="tail-spin-loading"
                                                        radius="1"
                                                        wrapperClass="flex justify-center items-center"
                                                    />
                                                </p>
                                            ) : (
                                                <button
                                                    onClick={() => handleCancelOrder(orderItem.orderId)}
                                                    disabled={has12HoursPassed}
                                                >
                                                    <p className={`text-white text-md font-[650] py-4 px-16 rounded-md uppercase 
                                                    ${has12HoursPassed ? 'bg-gray-400' : 'bg-red-800 hover:bg-red-700 transition-colors duration-200'}`}
                                                    >
                                                        Cancel
                                                    </p>
                                                </button>
                                            )
                                        }
                                    </div>

                                </>
                            ) : (
                                <div className='px-7 py-3'>
                                    <button onClick={handleViewOrderDetails}>
                                        <p className="border-[1px] text-white bg-[#000035] hover:bg-[#26265c] transition-colors duration-200
                                        text-md font-[650] py-4 px-7 rounded-md uppercase">
                                            View Order Details
                                        </p>
                                    </button>
                                </div>
                            )

                        }

                    </div>


                </div>

            </div>
        </>
    )
};

export default OrderListItem;
