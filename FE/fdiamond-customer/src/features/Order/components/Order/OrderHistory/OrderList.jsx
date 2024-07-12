import { OrderListItem } from 'src/features/Order/components/index';


const OrderList = ({ orderArr, setResetAfterCancel }) => {

    return (
        <>
            <div>

                <div className='w-full flex flex-col space-y-10'>


                    {orderArr.length === 0 ? (
                        <div className='w-full h-96 shadow-cartline flex flex-col justify-center items-center'>
                            <p>Currently, you have no orders</p>
                            <p>Shop now</p>
                        </div>
                    ) : (
                        orderArr.map((orderItem, index) => (
                            <div key={index}>
                                <OrderListItem
                                    orderItem={orderItem}
                                    setResetAfterCancel={setResetAfterCancel}
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
