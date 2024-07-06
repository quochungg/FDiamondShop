import diamondSvg from 'src/features/Order/assets/diamondSvg.svg';
import earringSvg from 'src/features/Order/assets/earringSvg.svg';
import necklaceSvg from 'src/features/Order/assets/necklaceSvg.svg';
import { SingleAvailableLine, SingleUnavailableLine } from 'src/features/Order/components/index';


const SingleLineItem = ({ cartLine, onRemoveCartline, onReplaceCartline, checkoutErrors }) => {

    return (
        <>
            {cartLine.cartLineItems[0].product.isVisible ? (
                <SingleAvailableLine
                    cartLine={cartLine}
                    onRemoveCartline={onRemoveCartline}
                    checkoutErrors={checkoutErrors}
                />
            ) : (
                <SingleUnavailableLine
                    cartLine={cartLine}
                    onRemoveCartline={onRemoveCartline}
                    onReplaceCartline={onReplaceCartline}
                    checkoutErrors={checkoutErrors}
                />
            )}
        </>
    )
};

export default SingleLineItem;
