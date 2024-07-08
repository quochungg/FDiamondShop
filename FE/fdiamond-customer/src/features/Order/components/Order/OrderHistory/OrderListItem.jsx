
const OrderListItem = () => {
    return (
        <>

            {/* <div className='w-full h-96 shadow-cartline flex flex-col justify-center items-center'>
                <p>Currently, you have no orders</p>
                <p>Shop now</p>

            </div> */}


            <div className='w-full h-auto shadow-cartline font-gantari'>

                <div className="flex flex-col">

                    <div>
                        <p className="text-2xl border-b-[1px] bg-gray-100 py-4 px-7">
                            Order #123456
                        </p>
                    </div>


                    <div className="flex flex-col space-y-5 px-7 py-5">

                        {/* <p>Number of Items: 5</p> */}

                        <p>Order Total: $15</p>

                        <p>Order Placed: 28-09-2024</p>

                        <p>Order Status: Completed</p>
                    </div>

                    <div className="self-end flex space-x-4 px-7 pb-3">
                        <div>
                            <button>
                                <p className="border-[1px] text-white bg-blue-950 text-md font-[550]  py-4 px-7 rounded-md uppercase"
                                >
                                    View Order Details
                                </p>
                            </button>
                        </div>

                        <div>
                            <button>
                                <p className="text-white text-md font-[550] bg-red-800 py-4 px-16 rounded-md uppercase"
                                >
                                    Cancel
                                </p>
                            </button>
                        </div>
                    </div>

                </div>


            </div>

            <div className='w-full h-auto shadow-cartline font-gantari'>

                <div className="flex flex-col">

                    <div>
                        <p className="text-2xl border-b-[1px] bg-gray-100 py-4 px-7">
                            Order #123456
                        </p>
                    </div>


                    <div className="flex flex-col space-y-5 px-7 py-5">

                        {/* <p>Number of Items: 5</p> */}

                        <p>Order Total: $15</p>

                        <p>Order Placed: 28-09-2024</p>

                        <p>Order Status: Completed</p>
                    </div>

                    <div className="self-end flex space-x-4 px-7 pb-3">
                        <div>
                            <button>
                                <p className="border-[1px] text-white bg-blue-950 text-md font-[550]  py-4 px-7 rounded-md uppercase"
                                >
                                    View Order Details
                                </p>
                            </button>
                        </div>

                        <div>
                            <button>
                                <p className="text-white text-md font-[550] bg-red-800 py-4 px-16 rounded-md uppercase"
                                >
                                    Cancel
                                </p>
                            </button>
                        </div>
                    </div>

                </div>


            </div>

            <div className='w-full h-auto shadow-cartline font-gantari'>

                <div className="py-5 px-10 flex flex-col">

                    <div className="flex flex-col space-y-5">
                        <p className="text-2xl">
                            Order #123456
                        </p>

                        {/* <p>Number of Items: 5</p> */}

                        <p>Order Total: $15</p>

                        <p>Order Placed: 28-09-2024</p>

                        <p>Order Status: Completed</p>
                    </div>

                    <div className="self-end flex space-x-4">
                        <div>
                            <button>
                                <p className="border-[1px] text-white bg-blue-950 text-md font-[550]  py-4 px-7 rounded-md uppercase"
                                >
                                    View Order Details
                                </p>
                            </button>
                        </div>

                        <div>
                            <button>
                                <p className="text-white text-md font-[550] bg-red-700 py-4 px-10 rounded-md uppercase"
                                >
                                    Cancel
                                </p>
                            </button>
                        </div>
                    </div>

                </div>


            </div>

            <div className='w-full h-auto shadow-cartline font-gantari'>

                <div className="py-5 px-10 flex flex-col">

                    <div className="flex flex-col space-y-5">
                        <p className="text-2xl ">
                            Order #123456
                        </p>

                        {/* <p>Number of Items: 5</p> */}

                        <p>Order Total: $15</p>

                        <p>Order Placed: 28-09-2024</p>

                        <p>Order Status: Completed</p>
                    </div>

                    <div className="self-end flex space-x-4">
                        <div>
                            <button>
                                <p className="border-[1px] text-white bg-blue-950 text-md font-[550]  py-4 px-7 rounded-md uppercase"
                                >
                                    View Order Details
                                </p>
                            </button>
                        </div>

                        <div>
                            <button>
                                <p className="text-white text-md font-[550] bg-red-700 py-4 px-10 rounded-md uppercase"
                                >
                                    Cancel
                                </p>
                            </button>
                        </div>
                    </div>

                </div>


            </div>

            <div className='w-full h-60 shadow-cartline'>


            </div>

            <div className='w-full h-60 shadow-cartline'>


            </div>

            <div className='w-full h-60 shadow-cartline'>


            </div>


        </>
    )
};

export default OrderListItem;
