import { axiosClient } from '../ApiConfig/apiConfig';

const SPC_API_ENDPOINT = '/cart';

const ShopingCartApi = {
    getCart: async (userId) => {
      return await axiosClient.get(SPC_API_ENDPOINT, {
        headers: {
          'id': userId,
        },
      });
    },
  };

export default ShopingCartApi;
