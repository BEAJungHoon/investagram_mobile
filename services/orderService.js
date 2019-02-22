import http from "./httpService_internal";
import DeviceStorage from '../services/deviceStorage';

const apiEndpoint = "/orders";

export const postOrder = async (order, callback) => {
    http.axios.defaults.headers = {common: {
        'x-auth-token': await DeviceStorage.AsyncStorage.getItem('token')
    }}
    http.post('http://localhost:8080/api/orders', order)
    .then(response => callback(null, response.data))
    .catch(err => callback(err, null));
}

export const new_getOrders = (status, type, callback) => {
    console.log('orderService.status:', status);
    console.log('orderService.type:', type);
    console.log('orderService.getOrders to:', apiEndpoint);

    http.get(apiEndpoint, {
        params: {status, type}
    })
    .then(response => callback(null, response.data))
    .catch(err => callback(err, null));
}


export const getOrders = (query, callback, extraPath='') => {
    console.log('orderService.query:', query);
    console.log('orderService.getOrders to:', apiEndpoint + extraPath);
    http.get(apiEndpoint + extraPath, {
        params: query
    })
    .then(response => callback(null, response.data))
    .catch(err => callback(err, null));
}

export const getOpenOrders = (callback) => {
    getOrders({}, callback, '/open');
}

export const getClosedOrders = (callback) => {
    getOrders({}, callback, '/closed');
}

export const cancelOrder = (query, callback) => {
    http.delete(apiEndpoint, {data: query})
    .then(response => {
        console.log('response.data:', response.data);
        callback(null, response.data)
    })
    .catch(err => callback(err, null));
}

export default {
    new_getOrders,


    postOrder,
    getOrders,
    getOpenOrders,
    getClosedOrders,
    cancelOrder,
}



