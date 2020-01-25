import axios from "axios";

//API Auth as a function

export function getToken() {
    return localStorage.getItem("token");
}

export function api() {
    return axios
            .create({
                baseURL: "http://localhost:5000",
                headers: {
                    Authorization: getToken()
                }
    });
}
//API Auth as a component
export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios
            .create ({
                baseURL: "http://localhost:5000/",
                headers: {
                    Authorization: token
                }
    })
}