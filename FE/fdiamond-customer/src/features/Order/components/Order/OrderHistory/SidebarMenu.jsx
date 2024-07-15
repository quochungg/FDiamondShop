
const SidebarMenu = ({ orderTypes, selectedStatus, setSelectedStatus }) => {

    const activeTag = 'border-b-[1px] py-5 px-6 text-left text-md font-[550] uppercase bg-blue-950 text-white';
    const inactiveTag = 'border-b-[1px] py-5 px-6 text-left text-md font-[550] uppercase bg-white hover:bg-gray-100';

    return (
        <>


            <div className='w-full rounded-md '>

                <div className='shadow-cartline h-auto sticky top-10'>

                    <div>
                        <button
                            onClick={() => setSelectedStatus('')}
                            className='w-full'>
                            <p
                                className={selectedStatus === '' ? activeTag : inactiveTag}
                            >
                                All ({orderTypes.All})
                            </p>
                        </button>
                    </div>



                    <div>
                        <button
                            onClick={() => setSelectedStatus('Ordered')}
                            className='w-full'>
                            <p
                                className={selectedStatus === 'Ordered' ? activeTag : inactiveTag}
                            >
                                Ordered ({orderTypes.Ordered})
                            </p>
                        </button>
                    </div>

                    <div>
                        <button
                            onClick={() => setSelectedStatus('Completed')}
                            className='w-full'
                        >
                            <p
                                className={selectedStatus === 'Completed' ? activeTag : inactiveTag}
                            >
                                Completed ({orderTypes.Completed})
                            </p>
                        </button>
                    </div>

                    <div>
                        <button
                            onClick={() => setSelectedStatus('Cancelled')}
                            className='w-full'
                        >
                            <p
                                className={selectedStatus === 'Cancelled' ? activeTag : inactiveTag}
                            >
                                Cancelled ({orderTypes.Cancelled})
                            </p>
                        </button>
                    </div>


                    <div>
                        <button
                            onClick={() => setSelectedStatus('Pending')}
                            className='w-full'
                        >
                            <p
                                className={selectedStatus === 'Pending' ? activeTag : inactiveTag}
                            >
                                Pending ({orderTypes.Pending})
                            </p>
                        </button>
                    </div>


                    <div>
                        <button
                            onClick={() => setSelectedStatus('Failed')}
                            className='w-full'
                        >
                            <p
                                className={selectedStatus === 'Failed' ? activeTag : inactiveTag}
                            >
                                Failed ({orderTypes.Failed})
                            </p>
                        </button>
                    </div>
                </div>


            </div>


        </>
    )
};

export default SidebarMenu;
