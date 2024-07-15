import { SingleLineOD, AttachmentLineOD } from 'src/features/Order/components/index'


const ItemListOD = ({ orderDetails }) => {

    return (
        <>
            <ul>
                {orderDetails.cartLines.map((cartLine) => {
                    return cartLine.cartLineItems.length === 2 ?
                        (
                            <AttachmentLineOD
                                key={cartLine.cartLineId}
                                cartLine={cartLine}
                            />
                        )
                        :
                        (
                            <SingleLineOD
                                key={cartLine.cartLineId}
                                cartLine={cartLine}
                            />
                        )
                })}
            </ul>
        </>
    )
};

export default ItemListOD;
