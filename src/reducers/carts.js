//======= imports =======//
import constants from '../constants/constants';
import ShopingCartApi from '../hooks/useShopingCart';

//======= constant action types =======//
const ADD_PRODUCT = 'ADD_PRODUCT';
const RESET_CART = 'RESET_CART';
const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
const FETCH_CART_FAILURE = 'FETCH_CART_FAILURE';
const START_LOADING = 'START_LOADING';
const STOP_LOADING = 'STOP_LOADING';
const SET_SELECTED_ITEMS = 'SET_SELECTED_ITEMS';

//======= initial state =======//
const initialState = {
  items: [], // Danh sách sản phẩm trong giỏ
  loading: false, // Trạng thái đang tải
  error: null, // Lỗi nếu có
  selectedItems: [], // Sản phẩm được chọn
};

//======= reducer =======//
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true, error: null };
    case STOP_LOADING:
      return { ...state, loading: false };
    case FETCH_CART_SUCCESS:
      return { ...state, items: action.payload, loading: false, error: null };
    case FETCH_CART_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case ADD_PRODUCT:
      return { ...state, items: action.payload, loading: false };
    case RESET_CART:
      return { ...state, items: [], loading: false };
    case DELETE_CART_ITEM:
      return { ...state, items: action.payload, loading: false };
    case UPDATE_CART_ITEM:
      return { ...state, items: action.payload, loading: false };
    case SET_SELECTED_ITEMS:
      return {
        ...state,
        selectedItems: action.payload,
      };
    default:
      return state;
  }
};

//======= action creators =======//

const setSelectedItems = (selectedItems) => ({
  type: SET_SELECTED_ITEMS,
  payload: selectedItems,
});

// Bắt đầu tải
const startLoading = () => ({ type: START_LOADING });

// Dừng tải
const stopLoading = () => ({ type: STOP_LOADING });

// Lấy giỏ hàng từ API
const fetchCart = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await ShopingCartApi.getCart();
    dispatch({ type: FETCH_CART_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: FETCH_CART_FAILURE, payload: error.message });
  } finally {
    dispatch(stopLoading());
  }
};

// Thêm sản phẩm vào giỏ
const addToCart = (cartData) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await ShopingCartApi.addProductToCart(cartData); // Gửi cả productId và quantity
    dispatch({
      type: ADD_PRODUCT,
      payload: response.data.data.cartItems,
    });
  } catch (error) {
    dispatch({ type: FETCH_CART_FAILURE, payload: error.message });
    throw error; // Ném lỗi để handle bên ngoài
  } finally {
    dispatch(stopLoading());
  }
};

// Xóa một sản phẩm khỏi giỏ
const deleteCartItem = (itemId) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await ShopingCartApi.deleteProductFromCart(itemId);
    dispatch({ type: DELETE_CART_ITEM, payload: response.data.data });
  } catch (error) {
    dispatch({ type: FETCH_CART_FAILURE, payload: error.message });
  } finally {
    dispatch(stopLoading());
  }
};

// Xóa toàn bộ giỏ hàng
const resetCart = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    await ShopingCartApi.clearCart();
    dispatch({ type: RESET_CART });
  } catch (error) {
    dispatch({ type: FETCH_CART_FAILURE, payload: error.message });
  } finally {
    dispatch(stopLoading());
  }
};

// Cập nhật số lượng sản phẩm
const updateCartItem = (itemId, quantity) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await ShopingCartApi.updateCartItemQuantity(itemId, quantity);
    dispatch({ type: UPDATE_CART_ITEM, payload: response.data.data });
  } catch (error) {
    dispatch({ type: FETCH_CART_FAILURE, payload: error.message });
  } finally {
    dispatch(stopLoading());
  }
};

//======= exports =======//
export {
  fetchCart,
  addToCart,
  deleteCartItem,
  resetCart,
  updateCartItem,
  setSelectedItems,
  ADD_PRODUCT,
  RESET_CART,
  DELETE_CART_ITEM,
  UPDATE_CART_ITEM,
  FETCH_CART_SUCCESS,
  SET_SELECTED_ITEMS,
};

export default cartReducer;
