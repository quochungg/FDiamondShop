import { SingleLineCK, AttachmentLineCK } from 'src/features/Order/components/index'

const ItemListCK = ({ cartLineArr }) => {

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

export default ItemListCK;
