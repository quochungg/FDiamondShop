import diamondSvg from 'src/features/Order/assets/diamondSvg.svg';
import earringSvg from 'src/features/Order/assets/earringSvg.svg';
import necklaceSvg from 'src/features/Order/assets/necklaceSvg.svg';
import { SingleAvailableLine, SingleUnavailableLine } from 'src/features/Order/components/index';


const SingleLineItem = ({ cartLine }) => {

    const handleReplace = () => {
        // Remove first 
        // Replace later
    }

    return (
        <>
            {cartLine.cartLineItems[0].product.isVisible ? (
                <SingleAvailableLine
                    cartLine={cartLine}
                />
            ) : (
                <SingleUnavailableLine
                    cartLine={cartLine}
                />
            )}
        </>
    )
};

export default SingleLineItem;
