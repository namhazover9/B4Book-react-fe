import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
  withCredentials: true,
});

export { axiosClient };

// // Hàm kiểm tra kết nối
// export const testBackendConnection = async () => {
//     console.log(import.meta.env.VITE_API_BASE_URL);
//   try {
//     const response = await axiosClient.get("/auth/google"); // Thay /ping bằng endpoint test của bạn
//     console.log("Kết nối thành công:", response.data);
//     return true;
//   } catch (error) {
//     console.error("Kết nối thất bại:", error.message);
//     return false;
//   }
// };
