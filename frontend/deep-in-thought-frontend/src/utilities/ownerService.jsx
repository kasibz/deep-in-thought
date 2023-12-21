import api from "./axiosConfig";

const ownerService = {
  login: (userInfo) => api.post("/owner/login", userInfo),
  register: (ownerInfo) => api.post("/owner", ownerInfo),
  getOwnerByProperty: (propertyId) => api.get(`/owner/property/${propertyId}`),
  getAllOwners: () => api.get("/owner"),
  getOwnerById: (ownerId) => api.get(`/owner/${ownerId}}`),
  editOwner: (ownerId, ownerInfo) => api.put(`/owner/${ownerId}`, ownerInfo),
};

export default ownerService;
