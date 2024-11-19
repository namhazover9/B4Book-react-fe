import { apiClient } from "../ApiConfig/apiConfig";

const userAPI = {
    loginUser: () => {
      return apiClient.get("/auth/google");
    },
  };
  

export {
  userAPI,
  
};
