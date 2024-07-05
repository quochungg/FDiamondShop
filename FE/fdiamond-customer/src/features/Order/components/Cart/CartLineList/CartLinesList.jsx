import { SingleLine, AttachmentLine } from '../../index';

const CartLinesList = ({ cartLineArr, checkoutErrors,
    onRemoveCartline, onUpdateRingSize, onReplaceCartline
}) => {

    return (
        <>
            <div className='font-gantari'>
                <div>
                    <p className='text-xl font-[700] uppercase mb-6'>my cart (10 items)</p>
                </div>
                {cartLineArr.map((cartLine) => (
                    cartLine.cartLineItems.length > 1 ? (
                        <AttachmentLine
                            key={cartLine.cartLineId}
                            cartLine={cartLine}
                            onRemoveCartline={onRemoveCartline}
                            onUpdateRingSize={onUpdateRingSize}
                            onReplaceCartline={onReplaceCartline}
                            checkoutErrors={checkoutErrors}
                        />
                    ) : (
                        <SingleLine
                            key={cartLine.cartLineId}
                            cartLine={cartLine}
                            onRemoveCartline={onRemoveCartline}
                            onReplaceCartline={onReplaceCartline}
                            checkoutErrors={checkoutErrors}
                        />
                    )
                ))}

            </div>
        </>
    )
};

export default CartLinesList;
