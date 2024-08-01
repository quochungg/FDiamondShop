import AppLayout from 'src/layout/AppLayout';
import { SidebarMenu, OrderList, ModalAfterCancel } from 'src/features/Order/components/index';
import { getAllFilterOrders } from 'src/features/Order/api/APIs'
import { useEffect, useState } from 'react';
import { LoadingSpinner } from 'src/components/index';



const OrderHistoryPage = () => {

    const [orderArr, setOrderArr] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [resetAfterCancel, setResetAfterCancel] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [resetThePage, setResetThePage] = useState(false);


    const handleCloseModal = () => {
        setOpenModal(false);
    }


    const [orderTypes, setOrderTypes] = useState({
        All: 0,
        Ordered: 0,
        Delivered: 0,
        Cancelled: 0,
        Pending: 0,
        Failed: 0,
    })


    // Call API to get all orders of a specific status
    const getAllOrdersByStatus = async (status) => {
        let response;
        if (status === 'Ordered') {
            response = await Promise.all([
                getAllFilterOrders('Ordered'),
                getAllFilterOrders('Preparing'),
                getAllFilterOrders('Shipping'),
                getAllFilterOrders('Idle')
            ])
            const orderedOrders = response[0].data.result ? response[0].data.result : [];
            const preparingOrders = response[1].data.result ? response[1].data.result : [];
            const shippingOrders = response[2].data.result ? response[2].data.result : [];
            const idleOrders = response[3].data.result ? response[3].data.result : [];

            const allOrders = [...orderedOrders, ...preparingOrders, ...shippingOrders, ...idleOrders];
            setOrderArr(allOrders)

        }
        else {
            response = await getAllFilterOrders(status);
            let ordersList = response.data.result
            if (ordersList) {
                setOrderArr(ordersList)
            }
        }
    }



    // Call API to get a number of all types of orders based on status
    const getAllOrderTypes = async () => {
        const response = await Promise.all([
            getAllFilterOrders(''),
            getAllFilterOrders('Ordered'),
            getAllFilterOrders('Preparing'),
            getAllFilterOrders('Shipping'),
            getAllFilterOrders('Idle'),
            getAllFilterOrders('Delivered'),
            getAllFilterOrders('Cancelled'),
            getAllFilterOrders('Pending'),
            getAllFilterOrders('Failed')
        ])

        const allOrders = response[0].data.result;

        const orderedOrders = response[1].data.result;
        const preparingOrders = response[2].data.result;
        const shippingOrders = response[3].data.result;
        const idleOrders = response[4].data.result;

        const deliveredOrders = response[5].data.result;

        const cancelledOrders = response[6].data.result;
        const pendingOrders = response[7].data.result;
        const failedOrders = response[8].data.result;


        setOrderTypes({
            All: allOrders.length,
            Ordered: orderedOrders.length + preparingOrders.length + shippingOrders.length + idleOrders.length,
            Delivered: deliveredOrders.length,
            Cancelled: cancelledOrders.length,
            Pending: pendingOrders.length,
            Failed: failedOrders.length
        })

    }


    useEffect(() => {
        getAllOrdersByStatus(selectedStatus);   // Call API to get all orders of a specific status
        getAllOrderTypes();  // Call API to get a number of all types of orders based on status
    }, [selectedStatus, resetAfterCancel])


    useEffect(() => {
        if (orderArr && orderArr.length > 0) {
            setOpenModal(true);
        }
    }, [resetAfterCancel])


    if (!orderArr) {
        return <LoadingSpinner />
    }

    return (
        <>
            {
                orderArr &&
                <AppLayout>

                    {openModal && <ModalAfterCancel handleCloseModal={handleCloseModal} />}

                    <div className='w-screen h-auto font-gantari bg-gray-50 mb-16'>

                        <div className='w-[80%] mx-auto'>
                            <header>
                                <div className='w-full text-start mt-12 mb-10'>
                                    <p className='text-4xl font-gantari font-[750] text-[#000035] uppercase'
                                    >
                                        Order History
                                    </p>
                                </div>
                            </header>
                        </div>


                        <div className='w-[80%] mx-auto'>

                            <main>
                                <div className='grid grid-cols-[26%_1fr] gap-x-10'>


                                    <SidebarMenu
                                        orderTypes={orderTypes}
                                        selectedStatus={selectedStatus}
                                        setSelectedStatus={setSelectedStatus}
                                    />

                                    <OrderList
                                        key={resetThePage}
                                        selectedStatus={selectedStatus}
                                        orderArr={orderArr}
                                        orderTypes={orderTypes}
                                        setResetAfterCancel={setResetAfterCancel}
                                        setResetThePage={setResetThePage}
                                    />

                                </div>
                            </main>

                        </div>



                    </div>




                </AppLayout>
            }

        </>
    )
};

export default OrderHistoryPage;
