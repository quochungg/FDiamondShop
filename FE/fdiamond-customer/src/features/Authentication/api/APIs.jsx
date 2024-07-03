import axios from "axios";

const API_ROOT = "https://fdiamond-api.azurewebsites.net/api/Users";

export const loginAPI = async (loginCredentials) => {
  let response;

  const API_url = API_ROOT + "/login";
  // console.log(API_url);

  try {
    response = await axios.post(API_url, loginCredentials);
  } catch (error) {
    if (error.response) {
      response = error.response;
    } else {
      console.error("There was an error!", error);
    }
  }
  return response;
};

export const registerAPI = async (data) => {
  let response;

  const API_url = API_ROOT + "/register";
  // console.log(API_url);

  try {
    response = await axios.post(API_url, data);
  } catch (error) {
    if (error.response) {
      response = error.response;
    } else {
      console.error("There was an error!", error);
    }
  }
  return response;
};

export const loginGoogleAPI = async (accessToken) => {
  let response;

  const API_url = API_ROOT + "/GoogleLogin";
  // console.log(API_url);

  const headers = {
    "Content-Type": "application/json;charset=UTF-8",
  };

  try {
    response = await axios.post(API_url, accessToken, { headers: headers });
  } catch (error) {
    if (error.response) {
      response = error.response;
      console.log(error);
    } else {
      console.error("There was an error!", error);
    }
  }
  return response;
};

export const updateUserAPI = async (dataToSend) => {
  let response;
  const accessToken = localStorage.getItem("accessToken");
  const API_url = API_ROOT + "/update";
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    response = await axios.put(API_url, dataToSend, { headers: headers });
  } catch (error) {
    if (error.response) {
      response = error.response;
    } else {
      console.error("There was an error!", error);
    }
  }
  return response;
};

export const getUser = async () => {
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  const accessToken = localStorage.getItem("accessToken");

  let API_url = API_ROOT + `?userId=${userId}`;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  let response;

  try {
    response = await axios.get(API_url, { headers: headers });
  } catch (error) {
    console.error("There was an error", error);
  }
  return response;
};
