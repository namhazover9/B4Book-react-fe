import { apiClient } from "../ApiConfig/apiConfig";

const userAPI = {
    loginUser: () => {
      return apiClient.get("/auth/google");
    },

    // verifyGoogleToken: () => {
    //   return apiClient.get('/auth/verifyGoogleToken');
    // },
  };

export { userAPI };
