import api from "./axiosConfig";
import { UserContext } from "../context/UserContext";


// const { addUser, user } = UserContext() 
const contractService = {
    createContract: (contractInfo) => api.post('/contract', contractInfo),
  };

export default contractService