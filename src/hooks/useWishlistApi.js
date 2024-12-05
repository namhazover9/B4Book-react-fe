import { axiosClient } from '../ApiConfig/apiConfig';


const WishlistApi = {
  getWishlist: async (page = 1, limit = 10) => {
    return await axiosClient.get('/showWishlist', {
      params: {
        page, 
        limit,
      },
    });
  },

  // Thêm sản phẩm vào giỏ hàng
  addProductToWishList: async (id) => {
    const url = `addWishlistProduct/${id}`;
    return await axiosClient.post(url);
  },

  // Xóa sản phẩm khỏi giỏ hàng
  deleteWishlistItem: async (id) => {
    try {
      const url = `deleteWishlistProduct/${id}`; // Địa chỉ endpoint xóa sản phẩm khỏi giỏ
      const response = await axiosClient.delete(url, {});
      return response.data; // Trả về dữ liệu giỏ hàng sau khi xóa sản phẩm
    } catch (error) {
      console.error('Error deleting product from cart:', error);
      throw error; // Quăng lỗi nếu có lỗi xảy ra
    }
  },
};

export default WishlistApi;
