import { useEffect, useState } from 'react';
import { AttachmentAvailableLine, AttachmentUnavailableLine } from 'src/features/Order/components/index';


const AttachmentLineItem = ({ cartLine, onRemoveCartline }) => {
    const [isAvailable, setIsAvailable] = useState(null);

    useEffect(() => {
        let isAvailable = true;
        for (const item of cartLine.cartLineItems) {
            if (!item.product.isVisible) {
                isAvailable = false;
                break;
            }
        }
        setIsAvailable(isAvailable);
    }, [])

    return (
        <>
            {isAvailable && isAvailable ? (
                <AttachmentAvailableLine
                    cartLine={cartLine}
                    onRemoveCartline={onRemoveCartline}
                />
            ) : (
                <AttachmentUnavailableLine
                    cartLine={cartLine}
                    onRemoveCartline={onRemoveCartline}
                />
            )}
        </>
    )
};

export default AttachmentLineItem;
