import AppLayout from 'src/layout/AppLayout';
import { SidebarMenu, OrderList } from 'src/features/Order/components/index';
import { getAllFilterOrders } from ''

const OrderHistoryPage = () => {

    const getAllOrders = () => {

    }

    return (
        <>
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

                                <OrderList />

                            </div>
                        </main>

                    </div>



                </div>




            </AppLayout>
        </>
    )
};

export default OrderHistoryPage;
