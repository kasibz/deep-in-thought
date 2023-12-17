/*
 * A service module for managing credit card related operations.
 * It utilizes a pre-configured Axios instance from './axiosConfig' to handle HTTP requests to the backend server.
 */
import api from "./axiosConfig";

const creditCardService = {
    // Need to adjust with the correct API address.
    addCreditCard: () => api.post('/'),
    getCreditCardInfo: () => api.get('/'),
}

export default creditCardService