import http from "./httpService_internal";
// import { apiUrl } from "../config.json";

// const apiEndpoint = apiUrl.server + "/markets";
const apiEndpoint = "/markets";

export function getMarkets(exchange, callback) {
    http.get(apiEndpoint + '/' + exchange)
    .then(response => {
        if(response.data.success) callback(null, response.data.markets);
        else callback(null, {});
    })
    .catch(err => {
        callback(err, null);
    });
}

export default {
    getMarkets
}