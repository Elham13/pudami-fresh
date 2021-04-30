import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE
} from './orderTypes'
import axios from 'axios'
import {baseUrlLocal} from '../api'

const createOrder = (order) => {
    return async (dispatch) => { 
        dispatch({type: CREATE_ORDER_REQUEST})
        try {
            const res = await axios.post(`${baseUrlLocal}/api/orders`, order, { 
                headers: {
                    'Authorization': `Bearer ${order.token}`
                }
            })
            dispatch({type: CREATE_ORDER_SUCCESS, payload: res})
        } catch (error) {
            dispatch({type: CREATE_ORDER_FAILURE, payload: error.message})
        }
    }
}

export default createOrder;