import { Link } from 'react-router-dom';
import { PiHeadphones } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";
import { ItemListOD, SummarySectionOD } from 'src/features/Order/components/index';

const OrderDetailsRightSection = ({ orderDetails }) => {

    const numberOfItems = Object.keys(orderDetails.cartLines).length;

    return (
        <>
            <section>
                <summary className='w-full h-auto rounded-md border-[1px] bg-white list-none p-10'>

                    <div className='flex justify-between items-center border-b-[1px] pb-3'>
                        <p className='font-[750] text-lg'>{numberOfItems} ITEMS</p>
                    </div>


                    <ItemListOD
                        orderDetails={orderDetails}
                    />


                    <SummarySectionOD
                        orderDetails={orderDetails}
                    />


                </summary>


                {/* Customer Service  */}
                <div className='mt-8 mb-10'>
                    <p className='text-center font-[700] mb-5'>24/7 Customer Service</p>

                    <div className='flex items-center justify-center space-x-14 text-sm'>

                        <Link
                            to="tel:1800545457"
                            className="flex items-center gap-2"
                        >
                            <span><PiHeadphones size={22} color='#949494' /></span>
                            <p>1800 54 54 57</p>
                        </Link>


                        <Link
                            to='mailto:fdiamondshop391@gmail.com'
                            className="flex items-center gap-2"
                        >
                            <span><TfiEmail size={22} color='#949494' /></span>
                            <p>Email Us</p>
                        </Link>

                    </div>

                </div>

            </section>
        </>
    )
};

export default OrderDetailsRightSection;
