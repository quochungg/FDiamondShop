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
        console.log(response)
    } catch (error) {
        if (error.response) {
            console.log(error.response)
            response = error.response;
        } else {
            console.error('There was an error!', error)
        }
    }
    return response;
}





//201 success
/*400 validation
- name: only characters
- address: string
- phoneNum: Only 10 digits and start with 0
- mail: @sdfd.comcom
*/

//500 trung gmail: ko co response body?

