import { combineReducers } from 'redux';
import authReducer from './auth';
import cartsReducer from './carts';
import userReducer from './user';

const rootReducer = combineReducers({
    authenticate: authReducer,
    user: userReducer,
    carts: cartsReducer,
});

export default rootReducer;
