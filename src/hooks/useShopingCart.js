import { axiosClient } from '../ApiConfig/apiConfig';

const SPC_API_ENDPOINT = '/cart';

const ShopingCartApi = {
  getCart: async (page = 1, limit = 10) => {
    return await axiosClient.get(SPC_API_ENDPOINT, {
      params: {
        page, // Thêm tham số page
        limit, // Thêm tham số limit
      },
    });
  },

  // Thêm sản phẩm vào giỏ hàng
  addProductToCart: async (cartData) => {
    const url = SPC_API_ENDPOINT + '/add';
    return await axiosClient.post(url, cartData);
  },

  // Xóa sản phẩm khỏi giỏ hàng
  deleteProductFromCart: async (itemId) => {
    try {
      const url = `${SPC_API_ENDPOINT}/${itemId}`; // Địa chỉ endpoint xóa sản phẩm khỏi giỏ
      const response = await axiosClient.delete(url, {});
      return response.data; // Trả về dữ liệu giỏ hàng sau khi xóa sản phẩm
    } catch (error) {
      console.error('Error deleting product from cart:', error);
      throw error; // Quăng lỗi nếu có lỗi xảy ra
    }
  },

  // Xóa toàn bộ giỏ hàng
  clearCart: async () => {
    try {
      const url = `${SPC_API_ENDPOINT}/`; // Endpoint dành cho clearCart
      const response = await axiosClient.delete(url, {});
      return response.data; // Trả về phản hồi (nếu cần)
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error; // Quăng lỗi nếu có lỗi xảy ra
    }
  },

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartItemQuantity: async (itemId, quantity) => {
    try {
      const url = `${SPC_API_ENDPOINT}/${itemId}`; // Endpoint API
      const response = await axiosClient.put(url, { quantity }); // Gửi yêu cầu cập nhật số lượng
      return response.data; // Trả về dữ liệu giỏ hàng đã cập nhật
    } catch (error) {
      console.error('Error updating product quantity in cart:', error);
      throw error; // Quăng lỗi nếu có lỗi xảy ra
    }
  },
};

export default ShopingCartApi;
