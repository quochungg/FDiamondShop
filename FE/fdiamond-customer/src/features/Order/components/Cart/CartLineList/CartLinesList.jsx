import { SingleLine, AttachmentLine } from '../../index';

const CartLinesList = ({ cartLineArr }) => {

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
                        />
                    ) : (
                        <SingleLine
                            key={cartLine.cartLineId}
                            cartLine={cartLine}
                        />
                    )
                ))}

            </div>
        </>
    )
};

export default CartLinesList;
