import { axiosClient } from '../ApiConfig/apiConfig';

const SPC_API_ENDPOINT = '/cart';

const ShopingCartApi = {
    getCart: async ( page = 1, limit = 10) => {
        return await axiosClient.get(SPC_API_ENDPOINT, {      
            params: {
                page,    // Thêm tham số page
                limit,   // Thêm tham số limit
            },
        });
    },
};

export default ShopingCartApi;
