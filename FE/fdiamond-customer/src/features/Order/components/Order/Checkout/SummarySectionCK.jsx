
const SummarySectionCK = ({ promoCode, cartLineArr, onMakePayment }) => {

    const calculateAmountOff = () => {
        let amountOff = 0;
        if (promoCode) {
            amountOff = subTotal * promoCode.discountPercent * 0.01;

        }
        return amountOff;
    }

    const calculateSubtotal = () => {
        let subtotal = 0;
        for (const cartLine of cartLineArr) {
            subtotal = cartLine.cartLineItems.reduce((acc, item) => {
                return acc + item.product.basePrice;
            }, subtotal)
        }
        return subtotal;
    }

    const calculateTotal = () => {
        let total = 0;
        if (promoCode) {
            total = subTotal - (subTotal * promoCode.discountPercent * 0.01);
        } else {
            total = subTotal;
        }
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
                    <p>{promoCode ? promoCode.discountCodeName.toUpperCase() : 'None'}</p>


                </div>

                {promoCode && (
                    <div className='flex justify-between'>
                        <p>Discount ({promoCode.discountPercent}%)</p>
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

            <div className='w-full mt-6'>
                <button onClick={() => onMakePayment(promoCode)} className='w-full'>
                    <p className='uppercase text-center text-lg text-white font-[600] tracking-wide 
                            rounded-md py-4 bg-blue-950 hover:bg-[#34427b] transition-colors duration-200'
                    >
                        Make payment
                    </p>
                </button>
            </div>
        </>
    )
};

export default SummarySectionCK;
