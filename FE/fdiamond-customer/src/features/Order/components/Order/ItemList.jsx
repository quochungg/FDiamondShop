import { SingleLineCK, AttachmentLineCK } from '../index'

const ItemList = ({ cartLineArr }) => {



    return (
        <>
            {/* START ITEM LIST */}
            <ul>
                {cartLineArr.map((cartLine) => (
                    cartLine.cartLineItems.length > 1 ? (
                        <AttachmentLineCK
                            key={cartLine.cartLineId}
                            cartLine={cartLine}
                        />
                    ) : (
                        <SingleLineCK
                            key={cartLine.cartLineId}
                            cartLine={cartLine}
                        />
                    )
                ))}

            </ul>
            {/* END ITEM LIST */}
        </>
    )
};

export default ItemList;
