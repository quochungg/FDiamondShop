import { Link } from 'react-router-dom';
import diamondSvg from 'src/features/Order/assets/diamondSvg.svg';
import ringSvg from 'src/features/Order/assets/ringSvg.svg';


const UnavailableLine = ({ cartLine, onRemoveCartline }) => {

    const selectedSize = cartLine.cartLineItems.find((item) => (
        item.product.categoryName === 'Engagement Ring'
    )).ringSize;


    const diamondItem = cartLine.cartLineItems.find((item) => (
        item.product.categoryName === 'Diamond'
    ))

    const ringItem = cartLine.cartLineItems.find((item) => (
        item.product.categoryName === 'Engagement Ring'
    ))


    return (
        <>
            <div>
                {/* BEGIN ONE CART LINE */}
                <ul>
                    <li className='shadow-cartline bg-white mb-7 rounded-md relative'>
                        <div className='px-6 pt-4 pb-6'>

                            {/*BEGIN CART NUMBER && REMOVE BUTTON */}
                            <div className='flex justify-between items-center mb-3'>
                                <p className='text-base font-[500] text-[#656565]'>CART {cartLine.cartLineId}</p>
                                <button
                                    className='text-[#656565] font-[400] text-xs uppercase transition-colors duration-400 hover:underline hover:text-black'
                                    onClick={() => onRemoveCartline(cartLine.cartLineId)}
                                >
                                    Remove
                                </button>
                            </div>
                            {/*END CART NUMBER && REMOVE BUTTON */}


                            {/*BEGIN PRODUCT IMAGE && INFORMATION */}
                            <div>
                                <div className='h-full flex space-x-4'>

                                    {/* Product Image */}
                                    <div className='w-[40%] relative'>

                                        {/* Ring */}
                                        {ringItem.product.isVisible ?
                                            (
                                                <div className='w-full max-w-[420px] text-center'>
                                                    <img
                                                        src={ringItem.product.productImages[0].imageUrl}
                                                        className='w-full object-cover rounded-md'
                                                    />
                                                </div>
                                            ) : (
                                                <div className='w-full h-full max-w-[420px] text-center absolute top-4'>
                                                    <img
                                                        src={ringItem.product.productImages[0].imageUrl}
                                                        className='w-full object-cover rounded-md
                                                                opacity-40'
                                                    />
                                                </div>
                                            )
                                        }

                                        {/* Diamond */}
                                        {diamondItem.product.isVisible ?
                                            (
                                                <div className='w-full max-w-[30%] text-center absolute top-2'>
                                                    <img
                                                        src={diamondItem.product.productImages[0].imageUrl}
                                                        className='w-full object-cover rounded-md'
                                                    />
                                                </div>
                                            ) : (
                                                <div className='w-full max-w-[30%] text-center absolute top-2
                                                               border-[1px] border-dashed border-yellow-500'>
                                                    <img
                                                        src={diamondItem.product.productImages[0].imageUrl}
                                                        className='w-full object-cover rounded-md
                                                                opacity-40'
                                                    />
                                                </div>
                                            )
                                        }

                                    </div>

                                    {/* Product Information */}
                                    <div className=' w-full flex flex-col items-start
                                        border-[1px] border-dashed border-yellow-500 px-3 py-2 bg-[#fffcf6] rounded-sm pointer-events-none'>

                                        <ul className='flex flex-col space-y-4 mb-7'>

                                            {/* Ring */}
                                            <li className='flex flex-row space-x-3'>
                                                <span>
                                                    <img src={ringSvg} />
                                                </span>

                                                <div className='flex flex-col'>
                                                    <Link
                                                        to=""
                                                        className='hover:underline underline-offset-4 text-base'
                                                    >
                                                        {ringItem.product.productName}
                                                    </Link>

                                                    <div className='flex items-center gap-x-8'>
                                                        {ringItem.product.isVisible ?
                                                            (
                                                                <>
                                                                    <p className='text-sm mt-3 text-[#343434] tracking-wide'>PID-{ringItem.product.productId}</p>
                                                                    <p className='text-sm mt-3 mr-2'>${ringItem.product.basePrice.toLocaleString()}</p>

                                                                    <select
                                                                        name="size"
                                                                        id="size"
                                                                        className="self-end w-16 cursor-pointer block text-center  text-sm bg-transparent border-b-[1px] border-gray-200 text-gray-600 dark:border-gray-700  focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                                                        value={selectedSize}
                                                                        readOnly
                                                                    >
                                                                        <option value={selectedSize}>{selectedSize}</option>
                                                                    </select>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <p className='text-sm mt-3 text-[#343434] tracking-wide'>PID-{ringItem.product.productId}</p>
                                                                    <p className='text-sm mt-3 mr-2 font-[600] text-red-700'>Not Available</p>
                                                                </>
                                                            )
                                                        }
                                                    </div>


                                                    <div className='border-b-[1px] mt-4'></div>

                                                </div>
                                            </li>


                                            {/* Diamond */}
                                            <li className='flex flex-row space-x-3'>
                                                <span>
                                                    <img src={diamondSvg} />
                                                </span>

                                                <div className='flex flex-col w-full'>
                                                    <Link
                                                        to=""
                                                        className='hover:underline underline-offset-4 text-base'
                                                    >
                                                        {diamondItem.product.productName}
                                                    </Link>

                                                    <div className='flex items-center gap-x-8'>
                                                        <p className='text-sm mt-3 text-[#343434] tracking-wide'>PID-{diamondItem.product.productId}</p>
                                                        {diamondItem.product.isVisible ?
                                                            (
                                                                <p className='text-sm mt-3 mr-2'>${diamondItem.product.basePrice.toLocaleString()}</p>
                                                            ) : (
                                                                <p className='text-sm mt-3 mr-2 font-[600] text-red-700'>Not Available</p>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>

                                    </div>

                                    {/* Price */}
                                    <div className='absolute bottom-11 right-11 flex flex-col space-y-1'>
                                        <button
                                            // onClick={handleReplace}
                                            className='bg-blue-950 hover:bg-[#34427b] w-full text-white rounded-lg py-1 px-3 transition-colors duration-200'
                                        >
                                            Replace
                                        </button>
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

export default UnavailableLine;

