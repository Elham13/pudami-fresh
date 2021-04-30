import axios from "axios";
import {
    RAZORPAY_REQUEST,
    RAZORPAY_SUCCESS,
    RAZORPAY_FAILURE
} from './orderTypes'
import {baseUrlLocal} from '../api'

const razorpayRequest = () => {
    return async (dispatch) => {
        dispatch({type: RAZORPAY_REQUEST})
        try {
            const {data} = await axios.post(`${baseUrlLocal}/api/orders/razorpay`)
            dispatch({type: RAZORPAY_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type: RAZORPAY_FAILURE, payload: error.message})
        }
        
    }
}

export default razorpayRequest