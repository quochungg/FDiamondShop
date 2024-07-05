import { useEffect, useState } from 'react';
import { getPromoCode } from 'src/features/Order/api/APIs'


const SummarySection = ({ cartLineArr, onCheckout }) => {
    const [isVisibleAll, setIsVisibleAll] = useState(null);
    const [promoCode, setPromoCode] = useState(null);
    const [invalidPromoCode, setInvalidPromoCode] = useState(false)
    const [subTotal, setSubtotal] = useState(null);
    const [amountOff, setAmountOff] = useState(null);
    const [totalPayment, setTotalPayment] = useState(null);


    const handleCheckout = () => {
        onCheckout(promoCode);
    }


    useEffect(() => {
        checkIsVisibleAll();
        calculateSubtotal();
    }, [cartLineArr])


    useEffect(() => {
        if (promoCode) {
            calculateAmountOff();
        }
    }, [promoCode])


    useEffect(() => {
        if (subTotal) {
            calculateTotal();
        }
    }, [subTotal, promoCode])


    const checkIsVisibleAll = () => {
        let isValid = true;
        for (const cartLine of cartLineArr) {
            for (const item of cartLine.cartLineItems) {
                if (!item.product.isVisible) {
                    isValid = false;
                    break;
                }
            }
            if (!isValid) break;
        }
        setIsVisibleAll(isValid);
    };


    const handleCheckPromoCode = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const promoCodeValue = formData.get('promoCode').trim();

        if (promoCodeValue.length > 0) {
            const checkPromoCode = async () => {
                const response = await getPromoCode(promoCodeValue);
                if (response.data.result) {
                    setPromoCode(response.data.result);
                    setInvalidPromoCode(false);
                } else {
                    setPromoCode(null);
                    setInvalidPromoCode(true);
                }
            }
            checkPromoCode();
        } else {
            setPromoCode(null);
            setInvalidPromoCode(true);
        }
    }


    const calculateAmountOff = () => {
        let amountOff = 0;
        if (promoCode) {
            amountOff = subTotal * promoCode.discountPercent * 0.01;

        }
        setAmountOff(amountOff);
    }


    const calculateSubtotal = () => {
        let subtotal = 0;
        for (const cartLine of cartLineArr) {
            subtotal = cartLine.cartLineItems.reduce((acc, item) => {
                return acc + item.product.basePrice;
            }, subtotal)
        }
        setSubtotal(subtotal);
    }

    const calculateTotal = () => {
        let total = 0;
        if (promoCode) {
            total = subTotal - (subTotal * promoCode.discountPercent * 0.01);
        } else {
            total = subTotal;
        }
        setTotalPayment(total);
    }


    return (
        <>
            <div className='h-full font-gantari text-[1.05rem]'>
                <div>
                    <p className='text-xl font-[700] uppercase mb-6'>Summary</p>
                </div>

                <section
                    className="h-auto sticky top-0 shadow-summary bg-white rounded-md p-10
                    flex flex-col"
                >

                    {/* Subtotal & Shipping*/}
                    <div className="pb-7 border-b-[1px] border-gray-300">
                        <ul className='flex flex-col space-y-4'>
                            <li className="flex justify-between">
                                <p>Subtotal</p>
                                {isVisibleAll && isVisibleAll ?
                                    (
                                        <p>${subTotal.toLocaleString()}</p>
                                    ) : (
                                        <p>Not Available</p>
                                    )
                                }

                            </li>
                            <li className="flex justify-between">
                                <p>US & Int. Shipping</p>
                                <p>Free</p>
                            </li>
                        </ul>
                    </div>


                    {/* Promo Code */}
                    <div className='pt-6 pb-6 border-b-[1px] border-gray-300'>
                        <p className='font-[600]'>Promo Code</p>

                        <div className='pt-3 pb-2'>
                            <form
                                onSubmit={handleCheckPromoCode}
                                className='flex space-x-4'>
                                <input
                                    className='border-[1px] border-black rounded-md px-4 py-1 w-[75%] focus:outline-none'
                                    name='promoCode'
                                />
                                <button
                                    type="submit"
                                    className='px-4 py-1 text-sm bg-gray-200 rounded-full w-[25%] hover:bg-gray-300 transition-colors duration-500'
                                >
                                    Apply
                                </button>
                            </form>
                        </div>

                        {/* Error message: Invalid discount */}
                        {invalidPromoCode &&
                            (
                                <div>
                                    <p className="font-gantari text-red-700 mt-3 font-[470]">Invalid promo code</p>
                                </div>
                            )
                        }

                    </div>

                    {/* Discount Amount */}
                    {promoCode &&
                        <div className="pt-6 mb-2">
                            <ul>
                                <li className="flex justify-between">
                                    <p>Discount ({promoCode.discountPercent}%)</p>
                                    {isVisibleAll && isVisibleAll ?
                                        (
                                            amountOff && <p>- ${amountOff.toLocaleString()}</p>
                                        ) : (
                                            <p>Not Available</p>
                                        )
                                    }
                                </li>
                            </ul>
                        </div>
                    }


                    {/* Total */}
                    <div className="pb-4 pt-4 border-b-[1px] border-gray-300">
                        <ul>
                            <li className="flex justify-between text-lg font-[600]">
                                <p>Total</p>
                                {isVisibleAll && isVisibleAll ? (
                                    totalPayment && <p>${totalPayment.toLocaleString()}</p>
                                ) : (
                                    <p>Not Available</p>
                                )}
                            </li>

                        </ul>
                    </div>



                    {/* Checkout button */}
                    <div className='mt-5'>
                        <button className=' w-full py-3 text-white  text-lg uppercase tracking-wide font-[600]
                         bg-blue-950 hover:bg-[#34427b] transition-colors duration-200 rounded-md'
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>
                    </div>

                </section>


            </div>
        </>
    )
};

export default SummarySection;
