
const SummarySectionOD = ({ orderDetails }) => {

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


                <div className='flex justify-between'>
                    <p>US & Int. Shipping</p>
                    <p>Free</p>
                </div>

            </div>

            <div className='py-6 border-b-[1px] pl-2'>
                <div className='flex justify-between text-xl font-[700]'>
                    <p>Total</p>
                    <p>${totalPayment.toLocaleString()}</p>
                </div>
            </div>
        </>
    )
};

export default SummarySectionOD;
