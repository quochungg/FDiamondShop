import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import diamondSvg from 'src/features/Order/assets/diamondSvg.svg';
import ringSvg from 'src/features/Order/assets/ringSvg.svg';

const AvailableLine = ({ cartLine, onRemoveCartline, onUpdateRingSize, checkoutErrors }) => {

    const selectedSize = cartLine.cartLineItems.find((item) => {
        return item.product.categoryName === 'Engagement Ring';
    }).ringSize


    const diamondItem = cartLine.cartLineItems.find((item) => (
        item.product.categoryName === 'Diamond'
    ))

    const ringItem = cartLine.cartLineItems.find((item) => (
        item.product.categoryName === 'Engagement Ring'
    ))

    const totalPrice = useMemo(() => {
        return cartLine.cartLineItems.reduce((total, item) => {
            return total + item.product.basePrice;
        }, 0);
    }, [cartLine]);


    const handleUpdateRingSize = (e) => {
        const newRingSize = e.target.value;
        onUpdateRingSize(cartLine.cartLineId, ringItem.product.productId, newRingSize);
    }


    const isErrorCartline = checkoutErrors.errorCartlinesId?.includes(cartLine.cartLineId);


    return (
        <>
            <div className={isErrorCartline ? 'border-[1px] border-red-500 mb-7 rounded-md' : 'mb-7'}>

                {/* BEGIN ONE CART LINE */}
                <ul>
                    <li className='shadow-cartline bg-white rounded-md relative'>
                        <div className='px-6 pt-4 pb-6'>

                            {/*BEGIN CART NUMBER && REMOVE BUTTON */}
                            <div className='flex justify-between items-center mb-4'>
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
                                <div className='h-full flex space-x-5'>

                                    {/* Product Image */}
                                    <div className='w-[40%] relative'>

                                        <div className='w-full max-w-[420px] text-center absolute top-4'>
                                            <img
                                                src={ringItem.product.productImages[0].imageUrl}
                                                className='w-full object-cover rounded-md'
                                            />
                                        </div>

                                        <div className='w-full max-w-[30%] text-center absolute top-2'>
                                            <img
                                                src={diamondItem.product.productImages[0].imageUrl}
                                                className='w-full object-cover rounded-md'
                                            />
                                        </div>

                                    </div>


                                    {/* Product Information */}
                                    <div className=' w-full flex flex-col items-start'>

                                        <ul className='flex flex-col space-y-4 mb-7'>

                                            {/* Ring */}
                                            <li className='flex flex-row space-x-3'>
                                                <span>
                                                    <img src={ringSvg} />
                                                </span>

                                                <div className='flex flex-col'>
                                                    <Link
                                                        to={`/product/product-details/${ringItem.product.productId}`}
                                                        className='hover:underline underline-offset-4 text-base'
                                                    >
                                                        {ringItem.product.productName}
                                                    </Link>
                                                    <div className='flex items-center gap-x-8'>
                                                        <p className='text-sm mt-3 text-[#343434] tracking-wide'>PID-{ringItem.product.productId}</p>
                                                        <p className='text-sm mt-3 mr-2 font-[600]'>${ringItem.product.basePrice.toLocaleString()}</p>

                                                        {/* Ring size */}
                                                        <select
                                                            name="size"
                                                            id="size"
                                                            className="self-end w-16 cursor-pointer block text-center  text-sm bg-transparent border-b-[1px] border-gray-200 text-gray-600 dark:border-gray-700  focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                                            value={selectedSize}
                                                            onChange={handleUpdateRingSize}
                                                        >
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                            <option value="9">9</option>
                                                            <option value="10">10</option>
                                                            <option value="11">11</option>
                                                            <option value="12">12</option>
                                                            <option value="13">13</option>
                                                            <option value="14">14</option>
                                                            <option value="15">15</option>
                                                            <option value="16">16</option>
                                                        </select>
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
                                                        to={`/product/product-details/${diamondItem.product.productId}`}
                                                        className='hover:underline underline-offset-4 text-base'
                                                    >
                                                        {diamondItem.product.productName}
                                                    </Link>
                                                    <div className='flex items-center gap-x-8'>
                                                        <p className='text-sm mt-3 text-[#343434] tracking-wide'>PID-{diamondItem.product.productId}</p>
                                                        <p className='text-sm mt-3 mr-2 font-[600]'>${diamondItem.product.basePrice.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            </li>


                                        </ul>

                                    </div>

                                    {/* Price */}
                                    <div className='absolute bottom-4 right-7'>
                                        <span className='font-[620] text-[1.07rem]'>${totalPrice.toLocaleString()}</span>
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
