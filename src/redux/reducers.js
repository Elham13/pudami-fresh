import {SHOW_SHIPPING, SHOW_INFORMATION, SHOW_PAYMENT} from './constants'
export const counterReducer = (state={count: 432}, action) => {
    return state
};

export const addToCartReducer = (state=[], action) => {
    switch(action.type){
        case 'GET_DATA':
            return {
                productItem: action.payload
            };
        default:
            return state;
    }
}

const checkoutInitialState = {
    showInformation: true,
    showShipping: false,
    showPayment: false,
}
export const checkoutRoutesReducer = (state=checkoutInitialState, action) => {
    switch(action.type){
        case SHOW_SHIPPING:
            return {
                showInformation: false,
                showShipping: true,
                showPayment: false,
            };
        case SHOW_INFORMATION:
            return {
                showInformation: true,
                showShipping: false,
                showPayment: false,
            };
        case SHOW_PAYMENT:
            return {
                showInformation: false,
                showShipping: false,
                showPayment: true,
            };
        default:
            return state;
    }
}
