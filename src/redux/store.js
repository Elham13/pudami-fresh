import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer'


// const fn = async () => {
//     const obj = {
//         data: await AsyncStorage.getItem("CartItem")
//     }
//     return obj
// }

// console.log("Data", fn())

var initialState = {
    // addToCart: {
    //     cart: 
    // }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, initialState,  composeEnhancer(applyMiddleware(thunk)));

export default store;