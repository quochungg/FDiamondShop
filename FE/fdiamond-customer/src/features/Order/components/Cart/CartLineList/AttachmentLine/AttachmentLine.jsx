import { useEffect, useState } from 'react';
import { AttachmentAvailableLine, AttachmentUnavailableLine } from 'src/features/Order/components/index';


const AttachmentLineItem = ({ cartLine, onRemoveCartline, onUpdateRingSize, onReplaceCartline, checkoutErrors }) => {
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
    }, [cartLine])


    return (
        <>
            {isAvailable && isAvailable ? (
                <AttachmentAvailableLine
                    cartLine={cartLine}
                    onRemoveCartline={onRemoveCartline}
                    onUpdateRingSize={onUpdateRingSize}
                    checkoutErrors={checkoutErrors}
                />
            ) : (
                <AttachmentUnavailableLine
                    cartLine={cartLine}
                    onRemoveCartline={onRemoveCartline}
                    onReplaceCartline={onReplaceCartline}
                    checkoutErrors={checkoutErrors}
                />
            )}
        </>
    )
};

export default AttachmentLineItem;
