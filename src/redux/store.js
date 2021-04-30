import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer'

AsyncStorage.getItem("CartItem").then(val => console.log(val))

const initialState = {
    // addToCart: {
    //     cart: 
    // }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, initialState,  composeEnhancer(applyMiddleware(thunk)));

export default store;