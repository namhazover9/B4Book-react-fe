import React from "react";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import {userAPI} from "../../hooks/useLogin"; // Đảm bảo đường dẫn đúng

const LoginPage = () => {
  const handleGoogleLogin = async () => {


    try {
      const response = await userAPI.loginUser(); // Gửi yêu cầu đến API
      console.log("Đăng nhập thành công:", response.data);
      // Thực hiện thêm, ví dụ: lưu thông tin người dùng hoặc chuyển hướng
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Login to BigFour Books</h1>
      <form className="space-y-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
        />
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-sm text-gray-500">
        <a href="#" className="text-red-500 hover:underline">
          Forgot Password?
        </a>
      </div>
      <div className="flex items-center justify-center space-x-4 mt-4">
        <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-100 transition">
          <FacebookOutlined className="text-blue-600 mr-2" />
          Login with Facebook
        </button>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
        >
          <GoogleOutlined className="text-red-600 mr-2" />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
