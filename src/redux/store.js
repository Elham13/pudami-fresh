import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {counterReducer, addToCartReducer, checkoutRoutesReducer} from './reducers';

const reducer = combineReducers({ 
    counterReducer,
    addToCartReducer,
    checkoutRoutesReducer
});

const initialState = {};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;