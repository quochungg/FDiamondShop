import axios from "axios";

const API_ROOT = "https://fdiamond-api.azurewebsites.net";

export const getCategory = async (category) => {
    let response;
    const URL_str = API_ROOT + `/api/category?category Name=${category}`
    const API_url = URL_str.replace(/ /g, '+');

    // console.log(API_url)

    try {
        response = await axios.get(API_url);
    } catch (error) {
        console.error("There was an error!", error);
    }
    return response;
};

export const getProducts = async (category, searchParams) => {
    let response;
    const queryStr = searchParams.toString();
    const URL_str = API_ROOT + `/api/product/GetProductWithFilter?CategoryName=${category}&${queryStr}`;
    const API_url = URL_str.replace(/ /g, '+');

    // console.log(API_url);

    try {
        response = await axios.get(API_url);
    } catch (error) {
        console.error("There was an error!", error);
    }
    return response;
};

export const getProductByID = async (id) => {
    let response;
    const API_url = API_ROOT + `/api/product/${id}`;

    // console.log(API_url);

    try {
        response = await axios.get(API_url)
    } catch (error) {
        //Handle 404 Status Code from server
        if (error.response) {
            response = error.response;
        } else {
            //such as network errors
            console.error("There was an error!", error);
        }
    }
    return response;
}


//https://fdiamond-api.azurewebsites.net/api/Product/
//GetProductWithFilter?
//Category Name=diamond&    (******)
//Subcategory Name=round& (phải cách)
//OrderBy=ProductName& (default)
//SortBy=asc&
//PageSize=3&
//PageNumber=1&       (******)
//Clarity=VS2&
//Cut=Ideal&
//Color=K&
//CaratFrom=1&
//CaratTo=30&
//PriceFrom=100&
//PriceTo=30000
//Metal=Gold




