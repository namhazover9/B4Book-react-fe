import userApi from "../hooks/userApi";

const GET_USER = 'GET_USER';

const getUserRequest = () => {
  return async (dispatch) => {
    try {
      const response = await userApi.getUser();
      const { user } = response.data;
      dispatch(getUser(user));
    } catch (error) {
      throw error;
    }
  };
};

const getUser = (user) => {
  return {
    type: GET_USER,
    payload: user,
  };
};

const initialState = {role: ''};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER: {
      return { ...action.payload };
    }

    default:
      return { ...state };
  }
};

export {
  getUserRequest,
  getUser,
  GET_USER
};

export default userReducer;