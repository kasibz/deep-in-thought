/*
 * A service module for handling accessing tenant information.
 * It uses a configured Axios instance from './axiosConfig' to perform HTTP requests to the backend server.
 */

import api from "./axiosConfig";
import { UserContext } from "../context/UserContext";


// const { addUser, user } = UserContext() 
const tenantService = {
     
    login: (userInfo) => api.post('/tenant/login', userInfo),
    // tenantInformation: () => api.get(`/tenant/${user.tenantId}`)

  };

export default tenantService