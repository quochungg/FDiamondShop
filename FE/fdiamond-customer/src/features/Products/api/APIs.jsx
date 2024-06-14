import axios from "axios";

const API_ROOT = "https://fdiamond-api.azurewebsites.net";

export const getProducts = async ({ category, searchParams }) => {
    let response;
    const queryStr = searchParams.toString();
    const URL_str = API_ROOT + `/api/product/GetProductWithFilter?categoryName=${category}&${queryStr}&PageSize=20`;
    const API_url = URL_str.replace(/ /g, '+');

    console.log(API_url);

    try {
        response = await axios.get(API_url);
    } catch (error) {
        console.error("There was an error!", error);
    }
    return response;
};

export const getCategory = async ({ category }) => {
    let response;
    const URL_str = API_ROOT + `/api//category?category Name=${category}`
    const API_url = URL_str.replace(/ /g, '+');

    console.log(API_url)

    try {
        response = await axios.get(API_url);
    } catch (error) {
        console.error("There was an error!", error);
    }
    return response;
};



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




