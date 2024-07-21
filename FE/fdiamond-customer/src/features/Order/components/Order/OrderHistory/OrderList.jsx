import { Link } from 'react-router-dom'
import { OrderListItem } from 'src/features/Order/components/index';
import emptyOrderSvg from 'src/features/Order/assets/emptyOrderSvg.svg'

const OrderList = ({ orderTypes, selectedStatus, orderArr, setResetAfterCancel }) => {

    const status = selectedStatus === 'Ordered' ? 'Processing' : selectedStatus;

    return (
        <>
            <div>

                <div className='w-full flex flex-col space-y-11 font-gantari'>

                    {/* Empty Order List */}
                    {orderArr.length === 0 ? (
                        <div className='w-full h-[35rem] shadow-cartline flex flex-col justify-center items-center'>

                            <div>
                                <img src={emptyOrderSvg} className='object-cover' />
                            </div>

                            {selectedStatus === '' ? (
                                <>
                                    <div className="font-gantari flex flex-col space-y-5 text-center mt-5 w-[45%]">
                                        <h2 className="text-2xl font-[650] font-lora">No Orders Found</h2>
                                        <p className="text-lg font-[350]">
                                            It looks like you haven't placed any orders yet.
                                            Start exploring our amazing products and make your first purchase!
                                        </p>
                                    </div>

                                    <div className='mt-12'>
                                        <Link
                                            to="/product"
                                            className="text-white text-lg uppercase font-gantari font-[450] bg-blue-950 hover:bg-[#34427b] px-20 py-5 rounded-sm "
                                        >
                                            Shop Now
                                        </Link>
                                    </div>
                                </>

                            ) : (
                                <div className="font-gantari flex flex-col space-y-6 text-center mt-6 w-[45%]">
                                    <h2 className="text-2xl font-[650] font-lora">No Orders Found</h2>
                                    <p className="text-lg font-[350]">
                                        Currently, you have no {status.toLowerCase()} orders.
                                    </p>
                                </div>
                            )}

                        </div>
                    ) : (
                        orderArr.map((orderItem, index) => (
                            <div key={index}>
                                <OrderListItem
                                    orderItem={orderItem}
                                    setResetAfterCancel={setResetAfterCancel}
                                    orderTypes={orderTypes}
                                />
                            </div>
                        ))
                    )}

                </div>

            </div>
        </>
    )
};

export default OrderList;
