/*
 * A service module for managing payment-related operations.
 * It utilizes a pre-configured Axios instance from './axiosConfig' to handle HTTP requests to the backend server.
 */
import api from "./axiosConfig";

const paymentService = {
    // Need to adjust with the correct API address.
    makePayment: (info) => api.post('/payment', info),
    getPaymentInfo: (id) => api.get(`/payment/${id}`),
    getPaymentHistory: (id) => api.get(`/payment/property/${id}`),
    getAllPaymnetHistoryByTenantId: (id) => api.get(`/payment/tenant/${id}`)
}

export default paymentService