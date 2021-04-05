import axios from "axios";

const token = window.localStorage.getItem("token")

const ecomAxios = axios.create({
    baseURL : "http://localhost:7000/",
    // headers : {
    //     "Authorization" : token
    // }
});

export default ecomAxios;