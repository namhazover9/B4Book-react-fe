import loginApi from "../hooks/useLogin";


const SET_IS_AUTH = 'SET_IS_AUTH';

const refreshToken = () => {
  return async (dispatch) => {
    try {
      const refToken = localStorage.getItem(constants.REFRESH_TOKEN_KEY);
      if (!refToken) {
        return dispatch(setIsAuth(false));
      }
      const result = await loginApi.postRefreshToken({
        refresh_token: refToken,
      });
      if (result.status === 200) {
        dispatch(setIsAuth(true));
      } else {
        dispatch(setIsAuth(false));
      }
    } catch (error) {
      dispatch(setIsAuth(false));
    }
  };
};

const getIsAuth = () => {
  return async (dispatch) => {
    try {
      const result = await loginApi.getAuth();
      dispatch(setIsAuth(result.data.isAuth));
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          dispatch(refreshToken());
        }
      } else {
        dispatch(setIsAuth(false));
      }
    }
  };
};


const setIsAuth = (isAuth) => {
  return { type: SET_IS_AUTH, payload: { isAuth } };
};

const initialState = { isAuth: false };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_AUTH:
      const { isAuth } = action.payload;
      return { ...state, isAuth };
    default:
      return { ...state };
  }
};

export default {
  authReducer,
  SET_IS_AUTH,
  setIsAuth,
  getIsAuth,
};
