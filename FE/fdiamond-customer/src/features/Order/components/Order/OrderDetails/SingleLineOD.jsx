import diamondSvg from 'src/features/Order/assets/diamondSvg.svg';
import earringSvg from 'src/features/Order/assets/earringSvg.svg';
import necklaceSvg from 'src/features/Order/assets/necklaceSvg.svg';

const SingleLineOD = ({ cartLine }) => {
    const symbol = cartLine.cartLineItems[0].product.categoryName === 'Earring' ? earringSvg :
        cartLine.cartLineItems[0].product.categoryName === 'Necklace' ? necklaceSvg : diamondSvg;

    return (
        <>
            {/* START SINGLE ITEM*/}
            <li className='py-5 border-b-[1px]'>

                {/* START PRODUCT INFO */}
                <div className='flex items-start space-x-4'>

                    {/* Product img */}
                    <div className='w-[33%] flex items-center justify-center'>
                        <img
                            src={cartLine.cartLineItems[0].product.productImages[0].imageUrl}
                            className='object-cover w-full h-full rounded-md'
                        />
                    </div>


                    {/* Item Info */}
                    <div className='w-[67%] flex items-start space-x-3 text-sm'>
                        <img src={symbol} />
                        <p>
                            {cartLine.cartLineItems[0].product.productName}
                        </p>
                    </div>

                </div>
                {/* END PRODUCT INFO */}

                {/* Price */}
                <div className='w-full flex justify-end mt-4'>
                    <p>
                        ${cartLine.cartLineItems[0].price.toLocaleString()}
                    </p>
                </div>

            </li>
            {/* END SINGLE ITEM*/}
        </>
    )
};

export default SingleLineOD;
