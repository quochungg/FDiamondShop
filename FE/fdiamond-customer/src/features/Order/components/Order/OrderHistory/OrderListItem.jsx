


const OrderListItem = ({ orderItem, orderArr }) => {


    return (
        <>


            {/* {orderItem.map((item, index) => { */}
            {/* return ( */}
            <div className='w-full h-auto shadow-cartline font-gantari'>

                <div className="flex flex-col">

                    <div>
                        <p className="text-2xl border-b-[1px] bg-gray-100 py-4 px-7">
                            Order #{orderItem.orderId}
                        </p>
                    </div>

                    <div className="flex flex-col space-y-5 px-7 py-5">
                        <p>Order Total: ${orderItem.totalPrice}</p>
                        <p>Order Placed: {orderItem.orderDate}</p>
                        <p>Order Status: {orderItem.status}</p> {/* Corrected from orderItem.status to item.status */}
                    </div>

                    <div className="self-end flex space-x-4 px-7 pb-3">
                        <div>
                            <button>
                                <p className="border-[1px] text-white bg-blue-950 text-md font-[550] py-4 px-7 rounded-md uppercase">
                                    View Order Details
                                </p>
                            </button>
                        </div>

                        <div>
                            <button>
                                <p className="text-white text-md font-[550] bg-red-800 py-4 px-16 rounded-md uppercase">
                                    Cancel
                                </p>
                            </button>
                        </div>
                    </div>

                </div>

            </div>
            {/* ); */}
            {/* })} */}






        </>
    )
};

export default OrderListItem;



// {orderItem.map((item, index) => {

//     <div key={index} className='w-full h-auto shadow-cartline font-gantari'>

//         <div className="flex flex-col">

//             <div>
//                 <p className="text-2xl border-b-[1px] bg-gray-100 py-4 px-7">
//                     Order #{item.orderId}
//                 </p>
//             </div>


//             <div className="flex flex-col space-y-5 px-7 py-5">

//                 {/* <p>Number of Items: 5</p> */}

//                 <p>Order Total: ${item.totalPrice}</p>

//                 <p>Order Placed: {item.orderDate}</p>

//                 <p>Order Status: {orderItem.status}</p>
//             </div>

//             <div className="self-end flex space-x-4 px-7 pb-3">
//                 <div>
//                     <button>
//                         <p className="border-[1px] text-white bg-blue-950 text-md font-[550]  py-4 px-7 rounded-md uppercase"
//                         >
//                             View Order Details
//                         </p>
//                     </button>
//                 </div>

//                 <div>
//                     <button>
//                         <p className="text-white text-md font-[550] bg-red-800 py-4 px-16 rounded-md uppercase"
//                         >
//                             Cancel
//                         </p>
//                     </button>
//                 </div>
//             </div>

//         </div>


//     </div>
// })}
