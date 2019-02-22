import jwtDecode from "jwt-decode";
import http from "./httpService_internal";
import Cookies from 'universal-cookie';
// import { apiUrl } from "../config.json";

// const apiEndpoint = apiUrl.server + "/auth";
const apiEndpoint = "/auth";
const tokenKey = "token";
const cookies = new Cookies();

http.setJwt(getJwt());

export async function login(email, password_login, callback) {
    http.post(apiEndpoint, { email, password_login })
    .then(response => {
        console.log(response.data);
        const { data: jwt } = response;
        cookies.set(tokenKey, jwt);
        // localStorage.setItem(tokenKey, jwt);

        callback(null, response);
    })
    .catch(err => {console.log(err);callback(err, null)});
}

export function loginWithJwt(jwt) {
    cookies.set(tokenKey, jwt);
    // localStorage.setItem(tokenKey, jwt);
}

// export function logout() {
//     cookies.remove(tokenKey);
//     // localStorage.removeItem(tokenKey);
// }

export function getCurrentUser() {
    try {
        const jwt = cookies.get(tokenKey);
        // const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}

export function getJwt() {
    return cookies.get(tokenKey);
    // return localStorage.getItem(tokenKey);
}

export default {
    login,
    loginWithJwt,
    // logout,
    getCurrentUser,
    getJwt
};
