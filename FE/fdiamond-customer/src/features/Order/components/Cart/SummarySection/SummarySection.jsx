const SummarySection = () => {


    const handleCheckDiscountCode = (e) => {
        e.preventDefault();
        console.log('Checking Discount Code');
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
                                <p>Not Available</p>
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
                                onClick={handleCheckDiscountCode}
                                className='flex space-x-4'>
                                <input
                                    className='border-[1px] border-black rounded-md px-4 py-1 w-[75%] focus:outline-none'
                                />
                                <button
                                    type="submit"
                                    className='px-4 py-1 text-sm bg-gray-200 rounded-full w-[25%] hover:bg-gray-300 transition-colors duration-500'
                                >
                                    Apply
                                </button>
                            </form>
                        </div>

                    </div>

                    {/* Discount Amount */}
                    <div className="pt-6 mb-2">
                        <ul>
                            <li className="flex justify-between">
                                <p>Discount (20%)</p>
                                <p>- $50</p>
                            </li>
                        </ul>
                    </div>

                    {/* Total */}
                    <div className="pb-4 pt-4 border-b-[1px] border-gray-300">
                        <ul>
                            <li className="flex justify-between text-lg font-[600]">
                                <p>Total</p>
                                <p>Not Available</p>
                            </li>
                        </ul>
                    </div>


                    {/* Checkout button */}
                    <div className='mt-5'>
                        <button className=' w-full py-3 text-white  text-lg uppercase tracking-wide font-[600]
                         bg-blue-950 hover:bg-[#34427b] transition-colors duration-200 rounded-md'>
                            Checkout
                        </button>
                    </div>

                </section>



            </div>
        </>
    )
};

export default SummarySection;
