import { axiosClient } from '../ApiConfig/apiConfig';

const SPC_API_ENDPOINT = '/cart';

const ShopingCartApi = {
    getCart: async (userId, page = 1, limit = 10) => {
        return await axiosClient.get(SPC_API_ENDPOINT, {
            headers: {
                'id': userId,
            },
            params: {
                page,    // Thêm tham số page
                limit,   // Thêm tham số limit
            },
        });
    },
};

export default ShopingCartApi;
