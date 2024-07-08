import { OrderListItem } from 'src/features/Order/components/index';


const OrderList = () => {
    return (
        <>
            <div>

                <div className='w-full flex flex-col space-y-10'>
                    <OrderListItem />
                </div>

            </div>
        </>
    )
};

export default OrderList;
