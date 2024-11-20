import { apiClient } from "../ApiConfig/apiConfig";

const userAPI = {
    loginUserGG: () => {
      return apiClient.get("/auth/google");
    },

    loginUser: (loginData) => {
      return apiClient.post("/loginWithPassword", loginData);
    },
  };
  


export {
  userAPI,
  
};
