import { useNavigate, Link } from 'react-router-dom';
import { reorder } from 'src/features/Order/api/APIs'


const SummarySectionOD = ({ orderDetails, pendingPayPalLink }) => {
    const navigate = useNavigate();

    const discountCode = orderDetails.discountCode;

    const calculateAmountOff = () => {
        let amountOff = 0;
        if (discountCode) {
            amountOff = subTotal * discountCode.discountPercent * 0.01;
        }
        return amountOff;
    }

    const calculateSubtotal = () => {
        let subtotal = orderDetails.basePrice;
        return subtotal;
    }

    const calculateTotal = () => {
        let total = orderDetails.totalPrice;
        return total;
    }


    const handleReorder = async () => {
        await reorder(orderDetails.orderId);
        navigate('/cart');
    }


    const subTotal = calculateSubtotal();

    let amountOff = calculateAmountOff();

    let totalPayment = calculateTotal();

    return (
        <>

            <div className='flex flex-col space-y-6 border-b-[1px] py-10 pl-2'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>${subTotal.toLocaleString()}</p>
                </div>

                <div className='flex justify-between'>
                    <p>Promo Code</p>
                    <p>{discountCode ? discountCode.discountCodeName.toUpperCase() : 'None'}</p>


                </div>

                {discountCode && (
                    <div className='flex justify-between'>
                        <p>Discount ({discountCode.discountPercent}%)</p>
                        <p>- ${amountOff.toLocaleString()}</p>
                    </div>
                )}


                {/* <div className='flex justify-between'>
                    <p>US & Int. Shipping</p>
                    <p>Free</p>
                </div> */}

            </div>

            <div className='py-6 border-b-[1px] pl-2'>
                <div className='flex justify-between text-xl font-[700]'>
                    <p>Total</p>
                    <p>${totalPayment.toLocaleString()}</p>
                </div>
            </div>

            {orderDetails.status === 'Failed' && (
                <div className='w-full mt-6'>
                    <button
                        onClick={handleReorder}
                        className='w-full'
                    >
                        <p className='uppercase text-center text-lg text-white font-[600] tracking-wide 
                            rounded-md py-4 bg-blue-950 hover:bg-[#34427b] transition-colors duration-200'
                        >
                            Reorder
                        </p>
                    </button>
                </div>
            )
            }


            {orderDetails.status === 'Pending' && (
                <div className='w-full mt-6'>
                    <Link
                        to={pendingPayPalLink}
                        className='w-full'
                    >
                        <p className='uppercase text-center text-lg text-white font-[600] tracking-wide 
                            rounded-md py-4 bg-blue-950 hover:bg-[#34427b] transition-colors duration-200'
                        >
                            Continue Your Payment
                        </p>
                    </Link>
                </div>
            )
            }
        </>
    )
};

export default SummarySectionOD;
