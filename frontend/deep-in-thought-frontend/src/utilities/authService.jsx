/*
 * A service module for handling user authentication processes.
 * It uses a configured Axios instance from './axiosConfig' to perform HTTP requests to the backend server.
 */
import api from "./axiosConfig";

const authService = {
    // Need to adjust with the correct API address.
    ownerLogin: (userInfo) => api.post('/owner/login', userInfo),
    tenantLogin: (userInfo) => api.post('/tenant/login', userInfo),
    ownerSignup: (userInfo) => api.post('/owner', userInfo),
    residentSignup: (userInfo) => api.post('/resident', userInfo),
    updateOwnerInfo: () => api.put('/'),
    updateResidentInfo: () => api.put('/'),
    updatePassword: (userId, newPassword, userRole) => api.put(`/${userRole}/${userId}`, newPassword)
  };

export default authService