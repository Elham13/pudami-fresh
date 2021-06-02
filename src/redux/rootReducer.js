import {combineReducers} from 'redux'
import productReducer from './products/productReducers'
import routeReducer from './checkoutRoutes/routeReducer'
import addTocartReducer from './addToCart/addToCartReducer'
import registerReducer from './users/registerReducers'
import loginReducer from './users/loginReducer'
import editProfileReducer from './users/editProfileReducer'
import verifyPasswordReducer from './users/verifyPasswordReducer'
import createOrderReducer from './orders/createOrderReducer'
import razorPayReducer from './orders/razorpayRequestReducer'
 
const rootReducer = combineReducers({ 
  products: productReducer,
  route: routeReducer,
  addToCart: addTocartReducer,
  register: registerReducer,
  login: loginReducer,
  editProfile: editProfileReducer,
  verifyPassword: verifyPasswordReducer,
  createOrder: createOrderReducer,
  razorpay: razorPayReducer,
});

export default rootReducer;
