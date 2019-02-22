import http from "./httpService_internal";
import DeviceStorage from '../services/deviceStorage';

const apiEndpoint = "/apiData";

export const checkApiData = (exchange, apiKey, apiSecret, callback) => {
    http.post(apiEndpoint, {exchange: exchange, apiKey: apiKey, apiSecret: apiSecret})
    .then(response => callback(null, response.data)) // true or false
    .catch(err => callback(err, null));
}

export const getApiData = async (callback) => {
    const url = 'http://localhost:8080/api/apiData';
    http.axios.defaults.headers = {
        common: {
            'x-auth-token': await DeviceStorage.AsyncStorage.getItem('token')
        }
    }
    http.get(url)
    .then(response => {
        const sets = response.data.apiKeySets;
        console.log('apiDataService.getApiData:sets:', sets); 
        callback(null, sets);
    })
    .catch(err => callback(err, null));
}

export const deleteApiData = (_id, callback) => {
    http.delete(apiEndpoint, {data: {_id}})
    .then(response => {
        console.log('apiDataService.deleteApiData.response.data:', response.data); callback(null, response.data)})
        .catch(err => callback(err, null));
}

export default {
    checkApiData,
    getApiData,
    deleteApiData
}