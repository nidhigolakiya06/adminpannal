import { BASE_URL } from "../Shared/Base_URL"
import axios from "axios";

const axiosInstance = axios.create ({
    baseURL : 'http://localhost:3004/',
    timeout : 2000,
});

export const sendRequest = (config) => {
    return axiosInstance.request(config)
}

export const getRequest = (path) => {
    return sendRequest ({
        url : path,
        method :'GET'
    });
};

export const postRequest = (path, Data) => {
    return sendRequest ({
        url : path,
        method : 'POST',
        data : JSON.stringify(Data),
        headers: {
                'Content-Type': 'application/json',
              }
    });
};

export const deleteRequest = (path, id) => {
    return sendRequest ({
        url : path + id,
        method : 'DELETE'
    });
};

export const putRequest = (path, data) => {
    console.log(data);
    return sendRequest ({
        url : path + data.id,
        method : 'PUT',
        data : JSON.stringify(data),
        headers: {
                'Content-Type': 'application/json',
              }
    });
};