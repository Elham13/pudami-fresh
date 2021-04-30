import {
    SHOW_INFORMATION,
    SHOW_SHIPPING,
    SHOW_PAYMENT,
} from './routeTypes'

const initialState = {
    showInformation: true,
    showShipping: false,
    showPayment: false,
}

const routeReducer = (state=initialState, action) => {
    switch(action.type) {
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
        case SHOW_SHIPPING:
            return {
                showInformation: false,
                showShipping: true,
                showPayment: false,
            };
        default: return state;
    }
}

export default routeReducer