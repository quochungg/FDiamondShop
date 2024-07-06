import AppLayout from 'src/layout/AppLayout';

const OrderHistoryPage = () => {
    return (
        <>
            <AppLayout>

                <div className='w-screen h-auto font-gantari'>

                    <div className='w-[85%] mx-auto py-10 bg-gray-50'>
                        <main>

                            <div className='grid grid-cols-[25%_1fr] gap-x-10'>

                                <div className='w-full rounded-md'>

                                    <div className='shadow-cartline h-auto'>

                                        <div>
                                            <button className='w-full'>
                                                <p className='border-b-[1px] py-5 px-6 text-left text-md font-[550] uppercase text-white bg-blue-950 rounded-t-sm'
                                                >
                                                    All Orders
                                                </p>
                                            </button>
                                        </div>

                                        <div>
                                            <button className='w-full'>
                                                <p className='border-b-[1px] py-5 px-6 text-left text-md font-[550] uppercase hover:bg-slate-200'>Processing</p>
                                            </button>
                                        </div>

                                        <div>
                                            <button className='w-full'>
                                                <p className='border-b-[1px] py-5 px-6 text-left text-md font-[550] uppercase '>Completed</p>
                                            </button>
                                        </div>

                                        <div>
                                            <button className='w-full'>
                                                <p className='border-b-[1px] py-5 px-6 text-left text-md font-[550] uppercase '>Cancelled</p>
                                            </button>
                                        </div>
                                    </div>


                                </div>


                                <div>

                                    <div className='w-full flex flex-col space-y-10'>
                                        <div className='w-full h-56 shadow-cartline'>

                                        </div>

                                        <div className='w-full h-56 shadow-cartline'>

                                        </div>

                                        <div className='w-full h-56 shadow-cartline'>

                                        </div>

                                        <div className='w-full h-56 shadow-cartline'>

                                        </div>

                                        <div className='w-full h-56 shadow-cartline'>

                                        </div>
                                    </div>

                                </div>
                            </div>


                        </main>
                    </div>



                </div>




            </AppLayout>
        </>
    )
};

export default OrderHistoryPage;
