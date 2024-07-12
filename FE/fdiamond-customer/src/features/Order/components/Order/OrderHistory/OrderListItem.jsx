import { TailSpin } from 'react-loader-spinner'
import { useState } from 'react'
import { cancelOrder } from 'src/features/Order/api/APIs'
import { useNavigate } from 'react-router-dom';


const OrderListItem = ({ orderItem, setResetAfterCancel }) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);


    const orderDate = new Date(orderItem.orderDate).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });


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
            <div className='w-full h-auto shadow-cartline font-gantari'>

                <div className="flex flex-col">

                    <div>
                        <p className="text-2xl border-b-[1px] bg-gray-100 py-4 px-7">
                            Order #{orderItem.orderId}
                        </p>
                    </div>

                    <div className="flex flex-col space-y-5 px-7 py-5">
                        <p>Order Total: ${orderItem.totalPrice.toLocaleString()}</p>
                        <p>Order Placed: {orderDate}</p>
                        <p>Order Status: {orderItem.status}</p>
                    </div>

                    <div className="self-end flex space-x-4 px-7 pb-3">
                        <div>
                            <button onClick={handleViewOrderDetails}>
                                <p className="border-[1px] text-white bg-blue-950 text-md font-[550] py-4 px-7 rounded-md uppercase">
                                    View Order Details
                                </p>
                            </button>
                        </div>

                        <div>
                            {orderItem.status === 'Ordered' ? (
                                isLoading ?
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
                                        >
                                            <p className="text-white text-md font-[550] bg-red-800 py-4 px-16 rounded-md uppercase">
                                                Cancel
                                            </p>
                                        </button>
                                    )
                            ) : (
                                <button disabled>
                                    <p className="text-white text-md font-[550] bg-gray-300 py-4 px-16 rounded-md uppercase">
                                        Cancel
                                    </p>
                                </button>
                            )
                            }

                        </div>
                    </div>

                </div>

            </div>
        </>
    )
};

export default OrderListItem;
