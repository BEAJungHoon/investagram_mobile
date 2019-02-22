import http from "./httpService_internal";
import authService from './authService';
// import { apiUrl } from "../config.json";

// const apiEndpoint = apiUrl.server + "/accounts";
const apiEndpoint = "/accounts";

export const getBalance = (exchange, market, callback) => {
    http.setJwt(authService.getJwt());
    console.log('http.axios.defaults.headers:', http.axios.defaults.headers);

    let currency; // currency: BTC, ETH, ...
    console.log('exchange:', exchange);
    switch(exchange.toLowerCase()) {
        case 'upbit':
            currency = market.substring(market.indexOf('-') + 1);
        break;
        default: return;
    }
    
    http.get(apiEndpoint + '/' + exchange + '/' + currency )
    .then(response => {callback(null, response.data.balance)})
    .catch(err => {console.log(err); callback(err, null)});
}

export default {
    getBalance
}



