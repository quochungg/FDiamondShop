import { Link } from 'react-router-dom';
import diamondSvg from 'src/features/Order/assets/diamondSvg.svg';
import ringSvg from 'src/features/Order/assets/ringSvg.svg';

const AvailableLine = () => {
    return (
        <>

            {/* AVAILABLE PRODUCTS */}
            <div>
                {/* BEGIN ONE CART LINE */}
                <ul>
                    <li className='shadow-cartline bg-white mb-7 rounded-md relative'>
                        <div className='px-6 pt-4 pb-6'>

                            {/*BEGIN CART NUMBER && REMOVE BUTTON */}
                            <div className='flex justify-between items-center mb-4'>
                                <p className='text-base font-[500] text-[#656565]'>CART 10</p>
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
                                    <div className='w-[40%] relative'>
                                        <div className='w-full max-w-[420px] text-center'>
                                            <img
                                                src='https://ion.bluenile.com/sets/Jewelry-bn/195402/RND/Images/stage.jpg'
                                                className='w-full object-cover rounded-md'
                                            />
                                        </div>

                                        <div className='w-full max-w-[30%] text-center absolute top-2'>
                                            <img
                                                src='https://ion.bluenile.com/sgmdirect/photoID/33951933/Diamond/20816136/nl/Diamond-princess-1-Carat_4_first_.jpg'
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
                                                        to=""
                                                        className='hover:underline underline-offset-4 text-base'
                                                    >
                                                        Petite Micropavé Diamond Engagement Ring in 14k White Gold (1/10 ct. tw.)
                                                    </Link>
                                                    <div className='flex items-center gap-x-8'>
                                                        <p className='text-sm mt-3 text-[#343434] tracking-wide'>PID-1</p>
                                                        <p className='text-sm mt-3 mr-2 font-[600]'>$580</p>

                                                        {/* Ring size */}
                                                        <select
                                                            name="size"
                                                            id="size"
                                                            className="self-end w-16 cursor-pointer block text-center  text-sm bg-transparent border-b-[1px] border-gray-200 text-gray-600 dark:border-gray-700  focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                                        // value={selectedSize}
                                                        // onChange={(e) => setSelectedSize(e.target.value)}
                                                        >
                                                            {/* <option value="Ring size">Ring size</option> */}
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                            <option value="7">7</option>
                                                            <option value="8">8</option>
                                                            <option value="9">9</option>
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
                                                        to=""
                                                        className='hover:underline underline-offset-4 text-base'
                                                    >
                                                        1.00 Carat I-SI1 Princess Cut Diamond
                                                    </Link>
                                                    <div className='flex items-center gap-x-8'>
                                                        <p className='text-sm mt-3 text-[#343434] tracking-wide'>PID-1</p>
                                                        <p className='text-sm mt-3 mr-2 font-[600]'>$580</p>
                                                    </div>
                                                </div>
                                            </li>

                                        </ul>


                                    </div>

                                    {/* Price */}
                                    {/* to locale string */}
                                    <div className='absolute bottom-4 right-7'>
                                        <span className='font-[620] text-[1.07rem]'>$1650</span>
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
