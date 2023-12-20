/*
 * A service module for handling user authentication processes.
 * It uses a configured Axios instance from './axiosConfig' to perform HTTP requests to the backend server.
 */
import api from "./axiosConfig";

const authService = {
    // Need to adjust with the correct API address.
    login: (userInfo) => api.post('/', userInfo),
    ownerSignup: (userInfo) => api.post('/owner', userInfo),
    residentSignup: (userInfo) => api.post('/resident', userInfo),
    updateOwnerInfo: () => api.put('/'),
    updateResidentInfo: () => api.put('/')
  };

export default authService