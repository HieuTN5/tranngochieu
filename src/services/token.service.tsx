import request from "../utils/request";


export function getTokenPricesService() {
    return request(`${process.env.REACT_APP_BASE_URL}prices.json`, {
        method: 'GET',
    });
}