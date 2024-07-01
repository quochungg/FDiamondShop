import AppLayout from "src/layout/AppLayout";
import { getAllCartLines } from "../api/APIs";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addToCartLine } from "src/features/Order/api/APIs";
import { EmptyCart, MainCartSection } from "../components/index";
import { LoadingSpinner } from "src/components";

//This page can only be accessed after log in
const CartPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [cartLineArr, setCartLineArr] = useState(null);
    const [handleAddedItem, setHandleAddedItem] = useState(false);

    // Handle new added item
    useEffect(() => {
        const addedItemArr = location?.state?.addedItemArr;
        if (addedItemArr) {
            const addToCart = async () => {
                await addToCartLine(addedItemArr);

                const newState = location.state = {
                    ...location.state,
                    addedItemArr: null
                }

                setHandleAddedItem(true);

                navigate('/cart', { state: newState, replace: true });  //reset location.state right after adding new items to cart by rerendering. This won't unmount and remount the component.
            }
            addToCart();
        } else {
            setHandleAddedItem(true);
        }
    }, [])


    useEffect(() => {
        if (handleAddedItem) {
            const getCartLines = async () => {
                const response = await getAllCartLines();
                const cartLines = response.data.result;
                if (cartLines) {
                    setCartLineArr(cartLines);
                } else {    //if cartLines = null => cart is empty
                    setCartLineArr([]);
                }
            }
            getCartLines();
        }
    }, [handleAddedItem])


    const handleCheckout = () => {

    }

    if (cartLineArr === null) {
        return <LoadingSpinner />
    }



    return (
        <>
            {cartLineArr && (
                <AppLayout>
                    {cartLineArr.length > 0 ?
                        (
                            <div className="h-auto w-screen bg-white overflow-visible">
                                <div className="h-auto w-full max-w-7xl mx-auto bg-white">
                                    <MainCartSection
                                        cartLineArr={cartLineArr}
                                    />
                                </div>
                            </div>
                        ) : (
                            <EmptyCart />
                        )
                    }
                </AppLayout>
            )}
        </>
    )
};

export default CartPage;


// {cartLineArr && (
//     cartLineArr.length > 0 ? (
//         <div>
//             <div>
//                 {cartLineArr.map((cartLine) => (
//                     <div
//                         className="p-3 bg-slate-200 border-[1px] border-black"
//                         key={cartLine.cartLineId}
//                     >
//                         CartLineID: {cartLine.cartLineId}

//                         {cartLine.cartLineItems.map((cartLineItem, index) => (
//                             <ul
//                                 className="list-disc px-10 border-[1px] border-black"
//                                 key={index}
//                             >
//                                 <li>Product ID: {cartLineItem.productId}</li>
//                                 <li>Price: {cartLineItem.price}</li>
//                             </ul>
//                         ))}
//                     </div>

//                 )
//                 )}
//             </div>

//             <button
//                 className="p-3 bg-slate-400"
//                 onClick={handleCheckout}
//             >
//                 Checkout
//             </button>
//         </div>
//     ) : (
//         <div>
//             <p>Your cart is empty</p>
//         </div>
//     )
// )}