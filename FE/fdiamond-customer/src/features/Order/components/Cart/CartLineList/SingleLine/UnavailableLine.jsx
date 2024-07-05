import { Link } from 'react-router-dom';
import diamondSvg from 'src/features/Order/assets/diamondSvg.svg';
import earringSvg from 'src/features/Order/assets/earringSvg.svg';
import necklaceSvg from 'src/features/Order/assets/necklaceSvg.svg';

const UnavailableLine = ({ cartLine, onRemoveCartline, onReplaceCartline, checkoutErrors }) => {
    const symbol = cartLine.cartLineItems[0].product.categoryName === 'Earring' ? earringSvg :
        cartLine.cartLineItems[0].product.categoryName === 'Necklace' ? necklaceSvg : diamondSvg;

    const isErrorCartline = checkoutErrors.errorCartlinesId?.includes(cartLine.cartLineId);

    return (
        <>

            {/* UNAVAILABLE PRODUCT */}
            <div className={isErrorCartline ? 'border-[1px] border-red-500 mb-7 rounded-md' : 'mb-7'}>

                {/* BEGIN ONE CART LINE */}
                <ul>
                    <li className='shadow-cartline bg-white rounded-md relative'>
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
                                <div className='h-full flex space-x-3'>

                                    {/* Product Image */}
                                    <div className='w-[40%]'>
                                        <div className='w-full max-w-[420px] text-center
                                    border-[1px] border-dashed border-yellow-500'>
                                            <img
                                                src={cartLine.cartLineItems[0].product.productImages[0].imageUrl}
                                                className='w-full object-cover rounded-md
                                                 opacity-40'
                                            />
                                        </div>
                                    </div>

                                    {/* Product Information */}
                                    <div className=' w-full flex flex-col items-start
                                border-[1px] border-dashed border-yellow-500 px-3 py-2 bg-[#fffcf6] rounded-sm pointer-events-none'>

                                        {/* Name && ProductID */}
                                        <ul className='flex flex-col space-y-5 mb-6'>
                                            <li className='flex flex-row space-x-3'>
                                                <span>
                                                    <img src={symbol} />
                                                </span>

                                                <div className='flex flex-col w-full'>
                                                    <Link
                                                        to=""
                                                        className='hover:underline underline-offset-4 text-base'
                                                    >
                                                        {cartLine.cartLineItems[0].product.productName}
                                                    </Link>
                                                    <div className='flex items-center gap-x-8 mt-1'>
                                                        <p className='text-sm mt-3 text-[#343434] tracking-wide'>PID-{cartLine.cartLineItems[0].product.productId}</p>
                                                        <p className='text-sm mt-3 mr-2 font-[600] text-red-700'>Not Available</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>



                                        {/* Add to ring button */}
                                        <div className='w-full px-5 hidden'>
                                            <button
                                                className='w-[40%] h-12 text-[#343434] text-sm font-[400]
                                                rounded-full border-2 border-dotted border-[#c7c7c7] hover:border-[#939393] transition-colors duration-200'>
                                                + Add a Ring
                                            </button>
                                        </div>

                                    </div>

                                    {/* Price */}
                                    {/* to locale string */}
                                    <div className='absolute bottom-11 right-11 flex flex-col space-y-1'>
                                        <button
                                            onClick={() => onReplaceCartline(cartLine)}
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
