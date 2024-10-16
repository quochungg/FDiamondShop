import { TailSpin } from 'react-loader-spinner'
import { useState, useEffect } from 'react'
import { cancelOrder } from 'src/features/Order/api/APIs'
import { useNavigate } from 'react-router-dom';
import { OrderStatusStepper } from 'src/features/Order/components/index'


const OrderListItem = ({ orderItem, setResetAfterCancel, setResetThePage }) => {

    const navigate = useNavigate();

    const [has2MinutesPassed, setHas2MinutesPassed] = useState(false);


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
    const checkIf2MinutesPassed = () => {
        const today = new Date();

        const differenceInMilliseconds = today.getTime() - orderDate.getTime();

        const has2MinutesPassed = differenceInMilliseconds >= 2 * 60 * 1000;

        return has2MinutesPassed;
    }


    useEffect(() => {
        const has2MinutesPassed = checkIf2MinutesPassed();
        if (has2MinutesPassed) {
            setHas2MinutesPassed(true);
        }
    }, [])



    const statusColor = ['Ordered', 'Preparing', 'Shipping', 'Idle', 'Pending'].includes(orderItem.status) ? 'text-emerald-600' :
        orderItem.status === 'Delivered' ? 'text-yellow-600' : 'text-red-700';


    const handleCancelOrder = async (orderId) => {
        const has2MinutesPassed = checkIf2MinutesPassed();
        if (has2MinutesPassed) {
            alert('You can only cancel your order within 4 minutes of placing it. After 4 minutes, it might be processed.');
            setResetThePage(prev => !prev); //Rerender the component after 4 minutes
        } else {
            const result = confirm('Are you sure you want to cancel this order?');
            if (result) {
                setIsLoading(true);
                const response = await cancelOrder(orderId);
                if (response.status === 200) {
                    setResetAfterCancel(prev => !prev);
                }
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
                                You can only cancel your order within 2 minutes of placing it. After 2 minutes, it might be processed.
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
                                                    disabled={checkIf2MinutesPassed()}
                                                >
                                                    <p className={`text-white text-md font-[650] py-4 px-16 rounded-md uppercase 
                                                    ${has2MinutesPassed ? 'bg-gray-400' : 'bg-red-800 hover:bg-red-700 transition-colors duration-200'}`}
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
