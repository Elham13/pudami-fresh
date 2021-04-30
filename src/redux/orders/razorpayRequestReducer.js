import {
    RAZORPAY_REQUEST,
    RAZORPAY_SUCCESS,
    RAZORPAY_FAILURE
} from './orderTypes'

const initialState = {
    razorpayLoading: false,
    razorpayData: {},
    razorpayError: '',
}

const razorPayReducer = (state=initialState, action) => {
    switch(action.type){
        case RAZORPAY_REQUEST: 
            return {
                ...state,
                razorpayLoading: true
            }
        case RAZORPAY_SUCCESS:
            return {
                razorpayLoading: false,
                razorpayData: action.payload,
                razorpayError: ''
            }
        case RAZORPAY_FAILURE:
            return {
                razorpayLoading: false,
                razorpayData: {},
                razorpayError: action.payload
            }
        default: return state
    }
}

export default razorPayReducer