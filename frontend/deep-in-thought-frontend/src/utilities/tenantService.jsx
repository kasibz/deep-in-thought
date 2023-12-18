/*
 * A service module for handling accessing tenant information.
 * It uses a configured Axios instance from './axiosConfig' to perform HTTP requests to the backend server.
 */

import api from "./axiosConfig";


const tenantService = {
    login: (userInfo) => api.post('/tenant/login', userInfo),
  };

export default tenantService