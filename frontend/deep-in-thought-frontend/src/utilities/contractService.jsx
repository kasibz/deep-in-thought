import api from "./axiosConfig";

// const { addUser, user } = UserContext()
const contractService = {
  createContract: (contractInfo) => api.post("/contract", contractInfo),
  editContract: (contractId, contractInfo) =>
    api.put(`/contract/${contractId}`, contractInfo),
  getContractByPropertyId: (id) => api.get(`/contract/${id}`)
};

export default contractService;
