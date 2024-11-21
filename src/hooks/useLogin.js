import { apiClient } from '../ApiConfig/apiConfig';

const userAPI = {
  // loginUserGG: () => {
  //   return apiClient.get("/auth/google/callback");
  // },

  loginUserFB: () => {
    return apiClient.get('/auth/google/callback');
  },

  loginUser: (loginData) => {
    return apiClient.post('/loginWithPassword', loginData);
  },
};

export { userAPI };
