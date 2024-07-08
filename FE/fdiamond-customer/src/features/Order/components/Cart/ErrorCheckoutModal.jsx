import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import invalidShoppingCartSvg from 'src/features/Order/assets/invalidShoppingCartSvg.svg';

const ErrorCheckoutModal = ({ onClose, checkoutErrors }) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    console.log(checkoutErrors)


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden">

            <div className="fixed inset-0 bg-black opacity-50"></div>

            <div className="z-10 bg-white p-7 rounded-lg shadow-lg w-[31%] h-auto">

                <div className='flex justify-center items-center flex-col font-gantari text-center w-full'>
                    <div className='py-3'>
                        <img src={invalidShoppingCartSvg} />
                    </div>

                    <div>
                        {/* MAIN ERROR MESSAGE */}
                        <p className='text-[1.3rem] font-[550]'>{checkoutErrors.errorMsg[0]}</p>


                        {/*IN CASE OF OUT OF QUANTITY PRODUCTS */}
                        {checkoutErrors.outOfQuantityProducts.length > 0 &&

                            <div className=' bg-gray-200 my-4 flex justify-center px-1'>
                                <ul className='text-center tracking-wider font-[330] max-h-28 overflow-y-auto py-3 w-full'>
                                    {checkoutErrors.outOfQuantityProducts.map((product, index) => (
                                        <li key={index}>
                                            <p>
                                                <span className='font-[650]'>PID-{product.productId} </span>
                                                has only
                                                <span className='font-[650] text-red-700'> {product.currentQuantity} </span>
                                                items left in stock.
                                            </p>
                                        </li>

                                    ))}
                                </ul>
                            </div>
                        }

                        {/* SECONDARY ERROR MESSAGE */}
                        <p className='mt-2 text-base text-gray-500 text-center'>{checkoutErrors.errorMsg[1]}</p>
                    </div>

                    <div className='flex mt-7 mx-auto'>
                        <div className='border-r-[1px] px-2'>
                            <Link to="tel:1800545457" className='font-[300]'
                            >
                                1800 54 54 57
                            </Link>
                        </div>
                        <div className='px-2'>
                            <Link to='mailto:fdiamondshop391@gmail.com' className='font-[500] text-base underline underline-offset-2 decoration-2'
                            >
                                fdiamondshop391@gmail.com
                            </Link>
                        </div>
                    </div>

                    <div className="mt-7 relative flex py-1 items-center w-[99%]">
                        <div className="flex-grow border-t border-[1px] border-gray-200"></div>
                        <span className="flex-shrink mx-2 text-gray-300 text-sm font-[550]">OR</span>
                        <div className="flex-grow border-t border-[1px] border-gray-200"></div>
                    </div>

                    <div className=' mt-4 w-full'>
                        <button
                            className='text-lg uppercase font-[500] text-white bg-blue-950 hover:bg-[#34427b] transition-colors duration-200 rounded-md
                            w-full text-center py-2'
                            onClick={onClose}
                        >
                            Ok
                        </button>
                    </div>

                </div>

            </div>




        </div>
    );
};


export default ErrorCheckoutModal;
