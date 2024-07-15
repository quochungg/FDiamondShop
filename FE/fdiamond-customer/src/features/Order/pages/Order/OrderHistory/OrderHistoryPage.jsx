import AppLayout from 'src/layout/AppLayout';
import { SidebarMenu, OrderList } from 'src/features/Order/components/index';
import { getAllFilterOrders } from 'src/features/Order/api/APIs'
import { useEffect, useState } from 'react';
import { LoadingSpinner } from 'src/components/index';


const OrderHistoryPage = () => {

    const [orderArr, setOrderArr] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [resetAfterCancel, setResetAfterCancel] = useState(false);

    const [orderTypes, setOrderTypes] = useState({
        All: 0,
        Ordered: 0,
        Completed: 0,
        Cancelled: 0,
        Pending: 0,
        Failed: 0,
    })


    const getAllOrdersByStatus = async (status) => {
        const response = await getAllFilterOrders(status);
        let ordersList = response.data.result
        if (ordersList) {
            setOrderArr(ordersList)
        }
    }

    const getAllOrderTypes = async () => {
        const response = await Promise.all([
            getAllFilterOrders(''),
            getAllFilterOrders('Ordered'),
            getAllFilterOrders('Completed'),
            getAllFilterOrders('Cancelled'),
            getAllFilterOrders('Pending'),
            getAllFilterOrders('Failed')
        ])


        setOrderTypes({
            All: response[0].data.result.length,
            Ordered: response[1].data.result.length,
            Completed: response[2].data.result.length,
            Cancelled: response[3].data.result.length,
            Pending: response[4].data.result.length,
            Failed: response[5].data.result.length
        })

    }


    useEffect(() => {
        getAllOrdersByStatus(selectedStatus);
        getAllOrderTypes();
    }, [selectedStatus, resetAfterCancel])




    if (!orderArr) {
        return <LoadingSpinner />
    }

    return (
        <>
            {
                orderArr &&
                <AppLayout>

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
                                        selectedStatus={selectedStatus}
                                        orderArr={orderArr}
                                        orderTypes={orderTypes}
                                        setResetAfterCancel={setResetAfterCancel}
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
