import { axiosClient } from "../ApiConfig/apiConfig";

const ACCOUNT_API_ENDPOINT = '/shop';

const shopApi = {
  // fn: get all shop
  getAllShop: () => {
    const url = ACCOUNT_API_ENDPOINT  ;
    return axiosClient.get(url);
  },

 
};

export default shopApi;
