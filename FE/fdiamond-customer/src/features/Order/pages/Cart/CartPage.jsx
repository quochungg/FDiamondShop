import AppLayout from "src/layout/AppLayout";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllCartLines, removeCartLine, updateRingSize, checkValidAllCartLines } from "src/features/Order/api/APIs";
import { addToCartLine } from "src/features/Order/api/APIs";
import { EmptyCart, MainCartSection, ErrorCheckoutModal } from "src/features/Order/components/index";
import { LoadingSpinner } from "src/components";


//This page can only be accessed after log in
const CartPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [cartLineArr, setCartLineArr] = useState(null);
    const [handleAddedItem, setHandleAddedItem] = useState(false);

    // Handle new added item
    useEffect(() => {

        const addedSingleItem = location?.state?.addedSingleItem;

        const addedAttachmentItems = location?.state?.addedAttachmentItems;

        if (addedSingleItem) {
            const addToCart = async () => {
                await addToCartLine(addedSingleItem);

                const newState = location.state = {
                    ...location.state,
                    addedSingleItem: null
                }

                setHandleAddedItem(true);

                navigate('/cart', { state: newState, replace: true });  //reset location.state right after adding new items to cart by rerendering. This won't unmount and remount the component.
            }
            addToCart();
        }
        else if (addedAttachmentItems) {
            const addToCart = async () => {
                await addToCartLine(addedAttachmentItems);

                const newState = location.state = {
                    ...location.state,
                    addedAttachmentItems: null
                }

                setHandleAddedItem(true);

                navigate('/cart', { state: newState, replace: true });  //reset location.state right after adding new items to cart by rerendering. This won't unmount and remount the component.

                localStorage.removeItem('selectionBar'); // set null for local storage after adding to cart

            }
            addToCart();
        }
        else {
            setHandleAddedItem(true);
        }
    }, [])


    // Get all cart lines after handling newly added item
    useEffect(() => {
        if (handleAddedItem) {
            getCartLines();
        }
    }, [handleAddedItem])


    // Call API to get all cart lines
    const getCartLines = async () => {
        const response = await getAllCartLines();
        const cartLines = response.data.result;
        if (cartLines) {
            setCartLineArr(cartLines);
        } else {    //if cartLines = null => cart is empty
            setCartLineArr([]);
        }
    }

    // Handle remove cart line
    const handleRemoveCartline = async (cartLineId) => {
        await removeCartLine(cartLineId);
        getCartLines();
    }


    // Handle update ring size
    const handleUpdateRingSize = async (cartLineId, productId, newRingSize) => {
        await updateRingSize(cartLineId, productId, newRingSize);
        getCartLines();
    }


    // Handle replace unavailable cart lines
    const handleReplaceCartline = (cartLine, ringSize) => {

        removeCartLine(cartLine.cartLineId);

        if (cartLine.cartLineItems.length === 1) {
            const categoryName = cartLine.cartLineItems[0].product.categoryName.toLowerCase();
            navigate(`/product/${categoryName}`)
        }

        if (cartLine.cartLineItems.length === 2) {

            const diamond = cartLine.cartLineItems.find((item) => item.product.categoryName === 'Diamond');

            const engagementRing = cartLine.cartLineItems.find((item) => item.product.categoryName === 'Engagement Ring');

            if (diamond.product.isVisible && !engagementRing.product.isVisible) {

                const newSelectionBar = {
                    diamond: {
                        productId: diamond.productId,
                    }
                }
                localStorage.setItem('selectionBar', JSON.stringify(newSelectionBar));
                navigate(`/product/engagement ring`)

            }
            else if (engagementRing.product.isVisible && !diamond.product.isVisible) {

                const newSelectionBar = {
                    engagementRing: {
                        productId: engagementRing.productId,
                        size: ringSize
                    }
                }
                localStorage.setItem('selectionBar', JSON.stringify(newSelectionBar));
                navigate(`/product/diamond`)

            }
        }

    }


    const [checkoutErrors, setCheckoutErrors] = useState({});

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    const handleCheckout = async (promoCode) => {
        // CART LINES : Check if all cart lines are valid. Invalid if there are DUPLICATED or UNAVAILABLE cart lines
        const response = await checkValidAllCartLines();

        const areAllCartLinesValid = response.data.result.isValid;

        let errorCartlines = {};

        if (areAllCartLinesValid) {
            //navigate to Checkout page
            const directFromCartPage = true;
            navigate('/checkout', { state: { promoCode, directFromCartPage } });

        } else {

            let errorCartlinesId = [];
            let errorMsg = [];
            let outOfQuantityProducts = [];

            const duplicatedCartLines = response.data.result.duplicateCartLine;
            const unavailableCartLines = response.data.result.invisibleCartLine;
            const outOfStockCartLines = response.data.result.outOfStockCartLines;

            if (duplicatedCartLines.length > 0 && unavailableCartLines.length > 0) {
                errorCartlinesId = [...duplicatedCartLines, ...unavailableCartLines];
                errorMsg[0] = 'Duplicated diamonds and Unavailable items in your shopping cart';
                errorMsg[1] = 'You are trying to checkout with both duplicate diamonds and unavailable items.' +
                    ' Please remove or replace them and try again. Or contact Customer Service for assistance.';

            }
            else if (duplicatedCartLines.length > 0) {
                errorCartlinesId = duplicatedCartLines;
                errorMsg[0] = 'Duplicate diamonds in your shopping cart';
                errorMsg[1] = 'You are trying to checkout with several identical diamonds.' +
                    ' Diamonds are unique, please remove duplicates and try again. Or contact Customer Service for assistance.'
            }
            else if (unavailableCartLines.length > 0) {
                errorCartlinesId = unavailableCartLines;
                errorMsg[0] = 'One or more items in your shopping cart has become unavailable.';
                errorMsg[1] = 'Please replace all unavailable items and continue, or contact Customer Service for assistance.'
            }
            else if (outOfStockCartLines.length > 0) {

                const errorProductIds = [];

                for (let i = 0; i < outOfStockCartLines.length; i++) {

                    // handle cartlines that contain out of quantity products
                    errorCartlinesId.push(outOfStockCartLines[i].cartLineId);

                    // handle out of quantity products
                    if (!errorProductIds.includes(outOfStockCartLines[i].productId)) {

                        errorProductIds.push(outOfStockCartLines[i].productId);

                        const errorProduct = {
                            productId: outOfStockCartLines[i].productId,
                            currentQuantity: outOfStockCartLines[i].currentQuantity
                        }
                        outOfQuantityProducts.push(errorProduct);
                    }

                }

                errorMsg[0] = 'One or more items exceed the available quantity in store.';
                errorMsg[1] = 'Please reduce the quantity of those items and continue, or contact Customer Service for assistance'
            }

            errorCartlines.errorCartlinesId = errorCartlinesId;
            errorCartlines.errorMsg = errorMsg;
            errorCartlines.outOfQuantityProducts = outOfQuantityProducts;

            setCheckoutErrors(errorCartlines);

            //reset cart line array to display implicit errors
            setCartLineArr(null);
            getCartLines();

            openModal();
        }
    }

    if (cartLineArr === null) {
        return <LoadingSpinner />
    }


    return (
        <>

            {cartLineArr && (

                <AppLayout>
                    <>
                        {showModal &&
                            <ErrorCheckoutModal
                                onClose={closeModal}
                                checkoutErrors={checkoutErrors}
                            />
                        }
                    </>

                    {cartLineArr.length > 0 ?
                        (
                            <div className="h-auto w-screen bg-gray-50 overflow-visible pb-20">
                                <div className="h-auto w-full max-w-7xl mx-auto bg-gray-50 ">
                                    <MainCartSection
                                        cartLineArr={cartLineArr}
                                        onRemoveCartline={handleRemoveCartline}
                                        onUpdateRingSize={handleUpdateRingSize}
                                        onReplaceCartline={handleReplaceCartline}
                                        checkoutErrors={checkoutErrors}
                                        onCheckout={handleCheckout}
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

