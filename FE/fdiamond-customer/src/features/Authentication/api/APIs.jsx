import axios from "axios";

const API_ROOT = 'https://fdiamond-api.azurewebsites.net/api/Users';

export const loginAPI = async (loginCredentials) => {
    let response;

    const API_url = API_ROOT + '/login';
    console.log(API_url);

    try {
        response = await axios.post(API_url, loginCredentials)
    } catch (error) {
        if (error.response) {
            response = error.response;
        } else {
            console.error('There was an error!', error)
        }
    }
    return response;
}

export const registerAPI = async (data) => {
    let response;

    const API_url = API_ROOT + '/register';
    console.log(API_url);

    try {
        response = await axios.post(API_url, data)
    } catch (error) {
        if (error.response) {
            response = error.response;
        } else {
            console.error('There was an error!', error)
        }
    }
    return response;
}

export const loginGoogleAPI = async (accessToken) => {
    let response;

    const API_url = API_ROOT + '/GoogleLogin'
    console.log(API_url);

    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
    }

    try {
        response = await axios.post(API_url, accessToken, { headers: headers })
    } catch (error) {
        if (error.response) {
            response = error.response;
            console.log(error);
        } else {
            console.error('There was an error!', error)
        }
    }
    return response;
}

