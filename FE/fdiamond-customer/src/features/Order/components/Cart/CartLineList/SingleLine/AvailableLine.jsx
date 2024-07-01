import { Link } from 'react-router-dom';
import diamondSvg from 'src/features/Order/assets/diamondSvg.svg';
import earringSvg from 'src/features/Order/assets/earringSvg.svg';
import necklaceSvg from 'src/features/Order/assets/necklaceSvg.svg';

const AvailableLine = ({ cartLine }) => {

    console.log(cartLine)

    return (
        <>
            <div>
                {/* BEGIN ONE CART LINE */}
                <ul>
                    <li className='shadow-cartline bg-white mb-7 rounded-md relative'>
                        <div className='px-6 pt-4 pb-7'>

                            {/*BEGIN CART NUMBER && REMOVE BUTTON */}
                            <div className='flex justify-between items-center mb-4'>
                                <p className='text-base font-[500] text-[#656565] uppercase'>CART {cartLine.cartLineId}</p>
                                <button
                                    className='text-[#656565] font-[400] text-xs uppercase transition-colors duration-400 hover:underline hover:text-black'
                                >
                                    Remove
                                </button>
                            </div>
                            {/*END CART NUMBER && REMOVE BUTTON */}

                            {/*BEGIN PRODUCT IMAGE && INFORMATION */}
                            <div>
                                <div className='h-full flex space-x-5'>

                                    {/* Product Image */}
                                    <div className='w-[40%]'>
                                        <div className='w-full max-w-[420px] text-center'>
                                            <img
                                                src={cartLine.cartLineItems[0].product.productImages[0].imageUrl}
                                                className='w-full object-cover rounded-md'
                                            />
                                        </div>
                                    </div>

                                    {/* Product Information */}
                                    <div className=' w-full flex flex-col items-start'>

                                        {/* Name && ProductID */}
                                        <ul className='flex flex-col space-y-5 mb-6'>
                                            <li className='flex flex-row space-x-3'>
                                                <span>
                                                    <img src={diamondSvg} />
                                                </span>

                                                <div className='flex flex-col w-full'>
                                                    <Link
                                                        to=""
                                                        className='hover:underline underline-offset-4 text-base'
                                                    >
                                                        {cartLine.cartLineItems[0].product.productName}
                                                    </Link>
                                                    <p className='text-sm mt-3 text-[#343434] tracking-wide'>PID-{cartLine.cartLineItems[0].product.productId}</p>
                                                </div>
                                            </li>
                                        </ul>



                                        {/* Add to ring button */}
                                        <div className='w-full px-5'>
                                            <button
                                                className='w-[40%] h-12 text-[#343434] text-sm font-[400]
                                                rounded-full border-2 border-dotted border-[#c7c7c7] hover:border-[#939393] transition-colors duration-200'>
                                                + Add a Ring
                                            </button>
                                        </div>

                                    </div>

                                    {/* Price */}
                                    <div className='absolute bottom-4 right-6'>
                                        <span className='font-[600] text-[1.07rem]'>${cartLine.cartLineItems[0].product.basePrice.toLocaleString()}</span>
                                    </div>

                                </div>
                            </div>
                            {/*BEGIN PRODUCT IMAGE && INFORMATION */}

                        </div>
                    </li>
                </ul>
                {/* BEGIN ONE CART LINE */}
            </div>
        </>
    )
};

export default AvailableLine;
