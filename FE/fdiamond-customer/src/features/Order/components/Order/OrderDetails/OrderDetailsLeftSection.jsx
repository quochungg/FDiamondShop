import { OrderStatusStepper } from 'src/features/Order/components/index';

const OrderDetailsLeftSection = ({ orderDetails }) => {
    const userName = JSON.parse(localStorage.getItem('user')).userName;

    const dateString = orderDetails.orderDate;

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


    const within10days = new Date(orderDate);
    within10days.setDate(within10days.getDate() + 10)
    const within10daysFormatted = within10days.toLocaleDateString("en-GB");

    const within14days = new Date(orderDate);
    within14days.setDate(within14days.getDate() + 14)
    const within14daysFormatted = within14days.toLocaleDateString("en-GB");


    const statusColor = ['Ordered', 'Preparing', 'Shipping', 'Idle', 'Pending'].includes(orderDetails.status) ? 'text-emerald-600' :
        orderDetails.status === 'Delivered' ? 'text-yellow-600' : 'text-red-700';



    return (
        <>
            <div className='w-full font-gantari'>

                <div className='shadow-cartline w-full rounded-md  bg-white p-12'>
                    <p className='uppercase text-xl font-[680]'>Order Details</p>

                    <div className="flex mt-5">
                        <p className="font-[550]">Order ID:</p>
                        &nbsp;
                        <p>{orderDetails.orderId}</p>
                    </div>

                    <div className="flex mt-5">
                        <p className="font-[550]">Order Date:</p>
                        &nbsp;
                        <p>{formattedDate} at {formattedTime}</p>
                    </div>

                    <div className="flex mt-5">
                        <p className="font-[550]">Payment Method:</p>
                        &nbsp;
                        <p className="">
                            {orderDetails.paymentInfo?.paymentMethod ? orderDetails.paymentInfo.paymentMethod : 'N/A'}
                        </p>
                    </div>

                    <div className="flex mt-5">
                        <p className="font-[550]">Transaction ID:</p>
                        &nbsp;
                        <p className="">
                            {orderDetails.paymentInfo?.transactionId ? orderDetails.paymentInfo.transactionId : 'N/A'}
                        </p>
                    </div>

                    <div className="flex mt-5">
                        <p className="font-[550]">Order Status:</p>
                        &nbsp;
                        <p className={statusColor + ' font-[650]'}>{orderDetails.status}</p>
                    </div>

                    {!['Pending', 'Failed', 'Cancelled'].includes(orderDetails.status) &&
                        (
                            <div className='mt-10'>
                                <OrderStatusStepper status={orderDetails.status} />
                            </div>
                        )
                    }

                </div>


                {/* Contact Information */}
                <div className='shadow-cartline w-full rounded-md  bg-white p-12 mt-8'>
                    <p className='uppercase text-xl font-[680]'>Contact information</p>
                    <p className='mt-5 font-[650]'>Email Address</p>
                    <p className='p-3 mt-2 border-[1px] rounded-md border-gray-400 bg-gray-100 text-gray-700'
                    >
                        {userName}
                    </p>
                </div>


                {/* SHIPPING INFORMATION */}
                <div className='shadow-cartline w-full rounded-md  bg-white p-12 mt-10 font-gantari'>

                    <p className='uppercase text-xl font-[680] mb-5'>Shipping & Recepient Details</p>

                    <div className="flex flex-row space-x-5 mb-5">

                        <div className="flex-1 flex flex-col">
                            <label
                                htmlFor='firstName'
                                className="font-[650]"
                            >
                                First Name
                            </label>
                            <input
                                id="firstName"
                                className='p-3 mt-2 border-[1px] rounded-md border-gray-400 bg-gray-100 text-gray-700'
                                placeholder="Enter your first name"
                                value={orderDetails.deliveryDetail.firstName}
                                disabled
                            />
                        </div>


                        <div className="flex-1 flex flex-col">
                            <label
                                htmlFor='lastName'
                                className="font-[650]"
                            >
                                Last Name
                            </label>
                            <input
                                id='lastName'
                                className='p-3 mt-2 border-[1px] rounded-md border-gray-400 bg-gray-100 text-gray-700'
                                placeholder="Enter your last name"
                                value={orderDetails.deliveryDetail.lastName}
                                disabled
                            />
                        </div>

                    </div>


                    <div className="flex-1 flex flex-col mb-5">
                        <label
                            htmlFor='address'
                            className="font-[650]"
                        >
                            Address
                        </label>
                        <input
                            id="address"
                            className='p-3 mt-2 border-[1px] rounded-md border-gray-400 bg-gray-100 text-gray-700'
                            placeholder="Enter your address"
                            value={orderDetails.deliveryDetail.address}
                            disabled
                        />
                    </div>


                    <div className="flex-1 flex flex-col mb-5">
                        <label
                            htmlFor='phoneNumber'
                            className="font-[650]"
                        >
                            Phone Number
                        </label>
                        <input
                            id="phoneNumber"
                            className='p-3 mt-2 border-[1px] rounded-md border-gray-400 bg-gray-100 text-gray-700'
                            placeholder="Enter your phone number"
                            value={orderDetails.deliveryDetail.phone}
                            disabled
                        />
                    </div>


                    <div className="flex-1 flex flex-col mb-8">
                        <label
                            htmlFor='note'
                            className="font-[650]"
                        >
                            Note
                        </label>
                        <input
                            id="note"
                            className='p-3 mt-2 border-[1px] rounded-md border-gray-400 bg-gray-100 text-gray-700'
                            placeholder="Do you have any note?"
                            value={orderDetails.deliveryDetail.note ? orderDetails.deliveryDetail.note : 'N/A'}
                            disabled
                        />
                    </div>


                    {/* Estimated shipping date */}
                    <div>
                        <p className="font-[600] italic">
                            * Estimated Shipping Date (within 10-14 working days): &nbsp;
                            <span>
                                {within10daysFormatted} - &nbsp;
                            </span>

                            <span>
                                {within14daysFormatted}
                            </span>
                        </p>
                    </div>


                </div>


            </div>

        </>
    )
};

export default OrderDetailsLeftSection;
