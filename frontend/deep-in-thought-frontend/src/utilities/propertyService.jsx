/*
 * A service module for managing property-related operations.
 * It utilizes a pre-configured Axios instance from './axiosConfig' to handle HTTP requests to the backend server.
 */
import api from "./axiosConfig";

const propertyService = {
    // Need to adjust with the correct API address.
    addProperty: (property) => api.post('/property', property),
    getPropertyByIdForOwner: (id) => api.get(`/property/${id}`),
    getAllPropertiesByIdForOwner: (id) => api.get(`/property/owner/${id}`),
    getPropertyByIdForResident: (id) => api.get(`/property/${id}`),
}

export default propertyService