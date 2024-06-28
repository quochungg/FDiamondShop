import AppLayout from "src/layout/AppLayout";
import { getAllCartLines } from "../api/APIs";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addToCartLine } from "src/features/Order/api/APIs";
import { c } from "vite/dist/node/types.d-aGj9QkWt";


//This page can only be accessed after log in
const CartPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [cartLineArr, setCartLineArr] = useState(null);
    const [handleAddedItem, setHandleAddedItem] = useState(false);

    // Handle new added item
    useEffect(() => {
        const addedItemArr = location.state.addedItemArr;
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

    return (
        <>
            <AppLayout>
                <div className="h-auto">
                    CART PAGE
                </div>
                {cartLineArr && (
                    cartLineArr.length > 0 ? (
                        <div>
                            <div>
                                {cartLineArr.map((cartLine) => (
                                    cartLine.cartLineItems.map((cartLineItem) => (
                                        <div
                                            key={cartLine.cartLineId}
                                        >
                                            ProductID: {cartLineItem.productId}
                                            CartLineID: {cartLine.cartLineId}
                                        </div>
                                    )



                                    )))}
                            </div>

                            <button
                                className="p-3 bg-slate-400"
                                onClick={handleCheckout}
                            >
                                Checkout
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p>Your cart is empty</p>
                        </div>
                    )
                )}
            </AppLayout>
        </>
    )
};

export default CartPage;
