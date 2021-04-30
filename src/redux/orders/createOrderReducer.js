import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE
} from './orderTypes'

const initialState = {
    orderLoading: false,
    orderData: {},
    orderError: ''
}

const createOrderReducer = (state=initialState, action) => {
    switch(action.payload){
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                orderLoading: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                orderLoading: false,
                orderData: action.payload,
                orderError: ''
            }
        case CREATE_ORDER_FAILURE:
            return {
                orderLoading: false,
                orderData: {},
                orderError: action.payload
            }
        default: return state
    }
}

export default createOrderReducer