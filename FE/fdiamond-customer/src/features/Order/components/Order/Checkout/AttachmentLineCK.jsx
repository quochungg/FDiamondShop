import { useMemo } from 'react';
import diamondSvg from 'src/features/Order/assets/diamondSvg.svg';
import ringSvg from 'src/features/Order/assets/ringSvg.svg';

const AttachmentLineCK = ({ cartLine }) => {

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

    return (
        <>
            {/* START ATTACHMENT ITEMS*/}
            <li className='py-5 border-b-[1px]'>

                {/* START PRODUCT INFO */}
                <div className='flex items-start space-x-4'>

                    {/* Product img */}
                    <div className='w-[33%] flex items-center justify-center'>
                        <img
                            src={ringItem.product.productImages[0].imageUrl}
                            className='object-cover w-full h-full rounded-md'
                        />
                    </div>


                    {/* Ring & Diamond Info */}
                    <ul className='flex flex-col text-sm space-y-3 w-[67%]'>

                        {/* Ring */}
                        <li className='flex items-start space-x-3'>
                            <img src={ringSvg} />
                            <div className='flex flex-col gap-y-1'>
                                <p>
                                    {ringItem.product.productName}
                                </p>
                                <p className='italic font-bold'>Ring size {selectedSize}</p>
                            </div>

                        </li>

                        {/* Diamond */}
                        <li className='flex items-start space-x-3'>
                            <img src={diamondSvg} />
                            <p>
                                {diamondItem.product.productName}
                            </p>
                        </li>
                    </ul>
                </div>
                {/* END PRODUCT INFO */}


                {/* Price */}
                <div className='w-full flex justify-end mt-5'>
                    <p>${totalPrice.toLocaleString()}</p>
                </div>

            </li>
            {/* END ATTACHMENT ITEMS*/}

        </>
    )
};

export default AttachmentLineCK;
