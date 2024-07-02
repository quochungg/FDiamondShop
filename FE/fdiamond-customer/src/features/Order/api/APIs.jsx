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
        console.error('There was an error', error);

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
        console.error('There was an error', error);
    }
    return response;

}


// =======================================================================
//                                  ORDER                         
// =======================================================================

// Order all cart lines
export const order = async (paymentMethod) => {
    const userName = JSON.parse(localStorage.getItem('user')).userName;
    const accessToken = localStorage.getItem('accessToken');

    let API_url = API_root + `/Order`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }

    const reqData = {
        userName: userName,
        paymentMethod: paymentMethod
    }

    let response;

    try {
        response = await axios.post(API_url, reqData, { headers: headers })
    } catch (error) {
        console.error('There was an error', error);

    }
    return response;
}

// Get all orders
export const getAllOrders = async () => {
    const userId = JSON.parse(localStorage.getItem('user')).userId;
    const accessToken = localStorage.getItem('accessToken');

    let API_url = API_root + `/Order/GetAllOrder?userId=${userId}`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    }

    let response;

    try {
        response = await axios.get(API_url, { headers: headers })
    } catch (error) {
        console.error('There was an error', error);

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
        console.error('There was an error', error);

    }
    return response;
}


// =======================================================================
//                                  DISCOUNT
// =======================================================================
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
