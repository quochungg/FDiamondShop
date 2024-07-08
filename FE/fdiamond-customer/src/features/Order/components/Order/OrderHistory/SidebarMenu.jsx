
const SidebarMenu = () => {

    const activeTag = 'border-b-[1px] py-5 px-6 text-left text-md font-[550] uppercase bg-blue-950 text-white';
    const inactiveTag = 'border-b-[1px] py-5 px-6 text-left text-md font-[550] uppercase bg-white hover:bg-gray-100';

    return (
        <>


            <div className='w-full rounded-md '>


                <div className='shadow-cartline h-auto sticky top-10'>

                    <div>
                        <button className='w-full'>
                            <p className={activeTag}
                            >
                                All Orders (10)
                            </p>
                        </button>
                    </div>



                    <div>
                        <button className='w-full'>
                            <p className={inactiveTag}
                            >
                                Pending (0)
                            </p>
                        </button>
                    </div>

                    <div>
                        <button className='w-full'>
                            <p className={inactiveTag}
                            >
                                Completed (5)
                            </p>
                        </button>
                    </div>

                    <div>
                        <button className='w-full'>
                            <p className={inactiveTag}
                            >
                                Cancelled (1)
                            </p>
                        </button>
                    </div>
                </div>


            </div>


        </>
    )
};

export default SidebarMenu;
