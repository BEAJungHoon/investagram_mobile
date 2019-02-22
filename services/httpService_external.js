import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.defaults.headers = {
    // 'Content-Type': 'application/x-www-form-urlencoded'
};

axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        logger.log(error);
        toast.error("An unexpected error occurrred.");
    }

    return Promise.reject(error);
});

function removeJwt() {
    if(axios.defaults.headers.common && axios.defaults.headers.common["x-auth-token"]) {
        delete axios.defaults.headers.common["x-auth-token"];
        console.log('removeJwt:', axios.defaults.headers.common);
    }
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    removeJwt,
    axios
};
