import AppLayout from 'src/layout/AppLayout';
import { SidebarMenu, OrderList } from 'src/features/Order/components/index';
import { getAllFilterOrders } from 'src/features/Order/api/APIs'
import { useEffect, useState } from 'react';

const OrderHistoryPage = () => {
    const [orderArr, setOrderArr] = useState(null);

    const getAllOrders = async (status) => {
        const response = await getAllFilterOrders('');
        if (response.data.result) {
            setOrderArr(response.data.result)
        }
    }
    useEffect(() => {
        getAllOrders('')
    }, [])

    console.log(orderArr)

    return (
        <>
            {
                orderArr &&
                <AppLayout>

                    <div className='w-screen h-auto font-gantari bg-gray-50'>

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


                                    <SidebarMenu />

                                    <OrderList
                                        orderArr={orderArr}
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
