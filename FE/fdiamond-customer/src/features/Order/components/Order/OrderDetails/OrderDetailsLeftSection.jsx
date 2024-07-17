
const OrderDetailsLeftSection = ({ orderDetails }) => {
    const userName = JSON.parse(localStorage.getItem('user')).userName;

    const formattedDate = new Date(orderDetails.orderDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });

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
                        <p>{formattedDate}</p>
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
                        <p className="">{orderDetails.status}</p>
                    </div>

                </div>

                {/* Contact Information */}
                <div className='shadow-cartline w-full rounded-md  bg-white p-12 mt-8'>
                    <p className='uppercase text-xl font-[680]'>Contact information</p>
                    <p className='mt-5 font-[650]'>Email Address</p>
                    <p className='p-3 mt-2 border-[1px] border-gray-400 rounded-md bg-gray-100 text-gray-700'
                    >
                        {userName}
                    </p>
                </div>

                {/* Shipping Address */}
                <div className='shadow-cartline w-full rounded-md bg-white p-12 mt-8'>
                    <p className='uppercase text-xl font-[680]'>SHIPPING</p>
                </div>

            </div>

        </>
    )
};

export default OrderDetailsLeftSection;
