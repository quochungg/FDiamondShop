import axios from "axios";

const API_root = 'https://fdiamond-api.azurewebsites.net/api';

// =======================================================================
//                                  CART                         
// =======================================================================

// Add a product to the cart
export const addToCartLine = async (addedItemArr) => {
    const userName = JSON.parse(localStorage.getItem('user')).userName;
    const accessToken = localStorage.getItem('accessToken');

    let API_url = API_root + `/ShoppingCart/AddToCartLine`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }

    const reqData = {
        userName: userName,
        cartLineItems: addedItemArr
    }

    let response;

    try {
        response = await axios.post(API_url, reqData, { headers: headers })
    } catch (error) {
        if (error.response) {
            response = error.response;
        } else {
            console.error('There was an error', error);
        }
    }
    return response;
}


// Get all cart lines
export const getAllCartLines = async () => {
    const userId = JSON.parse(localStorage.getItem('user')).userId;
    const accessToken = localStorage.getItem('accessToken');

    let API_url = API_root + `/ShoppingCart/GetAllCartLines?userId=${userId}`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }

    let response;

    try {
        response = await axios.get(API_url, { headers: headers })
    } catch (error) {
        if (error.response) {
            response = error.response;
        } else {
            console.error('There was an error', error);
        }
    }
    return response;
}


// Check if a diamond has been added to the cart individually
export const checkExistingDiamondInCart = async (productId) => {
    const userName = JSON.parse(localStorage.getItem('user')).userName;
    const accessToken = localStorage.getItem('accessToken');

    let API_url = API_root + `/ShoppingCart/CheckDiamondExistInCart`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }

    const reqData = {
        userName: userName,
        productId: productId
    }

    let response;

    try {
        response = await axios.post(API_url, reqData, { headers: headers })
    } catch (error) {
        if (error.response) {
            response = error.response;
        } else {
            console.error('There was an error', error);
        }
    }
    return response;
}


// Check if attachment items in selection bar have existed in cart
export const checkExistingAttachmentInCart = async (attachmentItemsArr) => {
    const userName = JSON.parse(localStorage.getItem('user')).userName;
    const accessToken = localStorage.getItem('accessToken');

    let API_url = API_root + `/ShoppingCart/CheckAttachmentExistInCart`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }

    const reqData = {
        userName: userName,
        cartLineItems: attachmentItemsArr
    }

    let response;

    try {
        response = await axios.post(API_url, reqData, { headers: headers })
    } catch (error) {
        if (error.response) {
            response = error.response;
        } else {
            console.error('There was an error', error);
        }
    }
    return response;
}


export const checkValidAllCartLines = async () => {
    const userId = JSON.parse(localStorage.getItem('user')).userId;
    const accessToken = localStorage.getItem('accessToken');

    let API_url = API_root + `/ShoppingCart/ValidShoppingCart?userId=${userId}`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }

    let response;

    try {
        response = await axios.get(API_url, { headers: headers })
    } catch (error) {
        if (error.response) {
            response = error.response;
        }
        console.error('There was an error', error);
    }
    return response;
}




// Remove cart line
export const removeCartLine = async (cartLineId) => {

    const accessToken = localStorage.getItem('accessToken');

    let API_url = API_root + `/ShoppingCart/RemoveCartLine?cartLineId=${cartLineId}`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }

    let response;

    try {
        response = await axios.delete(API_url, { headers: headers })
    } catch (error) {
        if (error.response) {
            response = error.response;
        } else {
            console.error('There was an error', error);
        }
    }
    return response;

}


// Update Ring Size in Cartline
export const updateRingSize = async (cartLineId, productId, newRingSize) => {
    const API_url = API_root + '/ShoppingCart/UpdateRingSize';

    const accessToken = localStorage.getItem('accessToken');

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }

    const reqData = {
        cartLineId: cartLineId,
        productId: productId,
        ringSize: newRingSize
    }

    let response;

    try {
        response = axios.put(API_url, reqData, { headers: headers });
    } catch (error) {
        if (error.response) {
            response = error.response;
        } else {
            console.error('There was an error', error);
        }
    }

    return response;
}




// =======================================================================
//                                  ORDER                         
// =======================================================================


// Make an order
export const makeOrder = async (promoCode) => {
    const accessToken = localStorage.getItem('accessToken');
    const userName = JSON.parse(localStorage.getItem('user')).userName;

    let API_url = API_root + `/Order`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }

    let reqData;

    if (promoCode) {
        reqData = {
            userName: userName,
            discountName: promoCode.discountCodeName,
            paymentMethod: 'Paypal'
        }
    } else {
        reqData = {
            userName: userName,
            paymentMethod: 'Paypal'
        }
    }

    let response;

    try {
        response = await axios.post(API_url, reqData, { headers: headers })
    } catch (error) {
        if (error.response) {
            response = error.response;
        } else {
            console.error('There was an error', error);
        }
    }
    return response;

}

// Get all orders by userID
export const getAllOrdersByUserId = async () => {
    const userId = JSON.parse(localStorage.getItem('user')).userId;
    const accessToken = localStorage.getItem('accessToken');

    let API_url = API_root + `/Order/GetAllOrderByUserId?UserId=${userId}`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }

    let response;

    try {
        response = await axios.get(API_url, { headers: headers })
    } catch (error) {
        if (error.response) {
            response = error.response;
        } else {
            console.error('There was an error', error);
        }
    }
    return response;
}

// Get all orders
export const getAllFilterOrders = async (status) => {
    const userId = JSON.parse(localStorage.getItem('user')).userId;
    const accessToken = localStorage.getItem('accessToken');

    let API_url = API_root + `/Order/FilterOrder?userId=${userId}&status=${status}`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }

    let response;

    try {
        response = await axios.get(API_url, { headers: headers })
    } catch (error) {
        if (error.response) {
            response = error.response;
        } else {
            console.error('There was an error', error);
        }
    }
    return response;
}

// Get order details
export const getOrderDetails = async (orderId) => {
    const accessToken = localStorage.getItem('accessToken');

    let API_url = API_root + `/Order/GetOrderDetails?orderId=${orderId}`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }

    let response;

    try {
        response = await axios.get(API_url, { headers: headers })
    } catch (error) {
        if (error.response) {
            response = error.response;
        } else {
            console.error('There was an error', error);
        }
    }
    return response;
}

// Cancel an order
export const cancelOrder = async (orderId) => {
    const accessToken = localStorage.getItem('accessToken');

    let API_url = API_root + `/Order/CancelOrder?orderId=${orderId}`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }

    let response;

    try {
        response = await axios.post(API_url, { headers: headers })
    } catch (error) {
        if (error.response) {
            response = error.response;
        } else {
            console.error('There was an error', error);
        }
    }

    return response;
}

// Reorder when payment failed
export const reorder = async (orderId) => {
    const accessToken = localStorage.getItem('accessToken');

    let API_url = API_root + `/Order/RePurchase/${orderId}`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }

    let response;

    try {
        response = await axios.put(API_url, { headers: headers })
    } catch (error) {
        if (error.response) {
            response = error.response;
        } else {
            console.error('There was an error', error);
        }
    }

    return response;
}


// =======================================================================
//                                  DISCOUNT
// =======================================================================
// Get discount code by code name
export const getPromoCode = async (promoCode) => {
    const accessToken = localStorage.getItem('accessToken');

    let API_url = API_root + `/Discount/GetDiscountCodeByCodeName?discountCode=${promoCode}`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }

    let response;

    try {
        response = await axios.get(API_url, { headers: headers })
    } catch (error) {
        if (error.response)
            response = error.response;
        else
            console.error('There was an error', error);
    }
    return response;
}


// Get non-expired discount codes
export const getNonExpiredDiscountCodes = async () => {
    const accessToken = localStorage.getItem('accessToken');

    let API_url = API_root + `/Discount/GetOpenDiscountCode`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }

    let response;

    try {
        response = await axios.get(API_url, { headers: headers })
    } catch (error) {
        if (error.response)
            response = error.response;
        else
            console.error('There was an error', error);
    }
    return response;
}