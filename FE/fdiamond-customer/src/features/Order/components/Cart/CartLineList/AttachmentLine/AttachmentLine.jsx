import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import diamondSvg from 'src/features/Order/assets/diamondSvg.svg';
import ringSvg from 'src/features/Order/assets/ringSvg.svg';
import { AttachmentAvailableLine, AttachmentUnavailableLine } from 'src/features/Order/components/index';


const AttachmentLineItem = ({ cartLine }) => {

    const [isAvailable, setIsAvailable] = useState(null);

    console.log(cartLine)

    // useEffect(() => {
    //     const isAvailable = cartLine.map(item => {
    //         if (!item.product.isVisible)
    //     })
    // }, [])


    return (
        <>
            {/* {isAvailable &&} */}
            <AttachmentAvailableLine />
            <AttachmentUnavailableLine />

        </>
    )
};

export default AttachmentLineItem;
