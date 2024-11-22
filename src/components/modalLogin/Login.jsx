import { useState } from 'react';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import loginApi from '../../hooks/useLogin';

const LoginPage = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    passWord: '',
    verifyToken: '',
  });

  const verifyUser = async () => {
    try {
        const queryParams = new URLSearchParams(window.location.search);
        const verifyToken = queryParams.get("verifyToken");
        if (verifyToken) {
          localStorage.setItem("verifyToken", verifyToken);
          window.history.replaceState({}, document.title, "/");
          const response =  loginApi.verifyUser({
            verifyToken: formData.verifyToken,
          });
          setSuccess(true);
          setError(null);
          if(response?.data?.message === "verify success"){
            localStorage.setItem("token", response?.data?.token);
            console.log("11111",response?.data?.token);
            window.location.href = "/";
          }
        }
    }catch(error) {
      setSuccess(false);
        setError("Login failed");
        window.alert(error.response?.data?.message || "Error login");
        console.error("API Error:", error);
    }
   }
   const handleGoogleLogin = async () => {
    try {
      window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
      
      console.log('Đăng nhập thành công');
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/facebook`;
      console.log('Đăng nhập thành công');
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
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
      const response = await loginApi.postLogin({
        email: formData.email,
        passWord: formData.passWord,
      });

      setSuccess(true);
      setError(null);

      console.log('API Response:', response.data);
      console.log('ABC: ', formData.email, formData.passWord);
      if(response?.data?.message == "Login success"){
      formData.verifyToken = response.data.verifyToken;
      localStorage.setItem('verifyToken', formData.verifyToken);
      console.log(formData.verifyToken);
      window.location.href = '/';
      }
    } catch (error) {
      setSuccess(false);
      setError('Login failed');
      window.alert(error.response?.data?.message || 'Error login');
      console.error('API Error:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await loginUser();
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold mb-4'>Login to BigFour Books</h1>
      <form className='space-y-4 w-full max-w-sm' onSubmit={handleSubmit}>
        <input
          type='text'
          name='email'
          placeholder='Username'
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none'
        />
        <input
          type='password'
          name='passWord'
          placeholder='Password'
          onChange={handleChange}
          className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none'
        />
        <button
          type='submit'
          className='w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition'
        >
          Login
        </button>
      </form>
      <div className='mt-4 text-sm text-gray-500'>
        <a href='#' className='text-red-500 hover:underline'>
          Forgot Password?
        </a>
      </div>
      <div className='flex items-center justify-center space-x-4 mt-4'>
        <button 
        onClick={handleFacebookLogin}
        className='flex items-center px-4 py-2 border rounded-lg hover:bg-gray-100 transition'
        >
          <FacebookOutlined className='text-blue-600 mr-2' />
          Login with Facebook
        </button>
        <button
          onClick={handleGoogleLogin}
          className='flex items-center px-4 py-2 border rounded-lg hover:bg-gray-100 transition'
        >
          <GoogleOutlined className='text-red-600 mr-2' />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
