import { axiosClient } from "../ApiConfig/apiConfig";

const ACCOUNT_API_ENDPOINT = '/products';

const productsApi = {
    getAllProducts: () => {
        const url = ACCOUNT_API_ENDPOINT;
        return axiosClient.get(url);
      },
};

export default productsApi;