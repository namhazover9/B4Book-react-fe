import React from "react";
import { useState } from "react";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import {userAPI} from "../../hooks/useLogin"; // Đảm bảo đường dẫn đúng
import { message } from "antd";


const LoginPage = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    passWord: "",
    verifyToken: "" 
  });
  localStorage.setItem("verifyToken", formData.email);
  const handleGoogleLogin = async () => {
    try {
      window.open('http://localhost:8000/auth/google', "_self");
      console.log("Đăng nhập thành công");
      window.alert("Login Success!");

    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      window.open('http://localhost:8000/auth/facebook', "_self")
      console.log("Đăng nhập thành công");
      window.alert("Login Success!");
      // Thực hiện thêm, ví dụ: lưu thông tin người dùng hoặc chuyển hướng
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginUser = async () => {
    try {
      const response = await userAPI.loginUser({
        email: formData.email,
        passWord: formData.passWord,
      });
      
      setSuccess(true);
      setError(null);

      console.log("API Response:", response.data);
      console.log("ABC: ",formData.email, formData.passWord);
      window.alert(response?.data?.message);
      if(response?.data?.message === "Login success"){
        localStorage.setItem("verifyToken", response?.data?.verifyToken);
        console.log("11111",response?.data?.verifyToken);
        window.location.href = "/";
      }
      
    } catch (error) {
      setSuccess(false);
      setError("Login failed");
      window.alert(error.response?.data?.message || "Error login");
      console.error("API Error:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await loginUser();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Login to BigFour Books</h1>
      <form className="space-y-4 w-full max-w-sm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Username"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
        />
        <input
          type="password"
          name="passWord"
          placeholder="Password"
          onChange={handleChange}
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
        <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
        onClick={handleFacebookLogin}>
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
