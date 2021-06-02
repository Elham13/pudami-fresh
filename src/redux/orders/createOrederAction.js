import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE
} from './orderTypes'
import axios from 'axios'
import {baseUrlLocal} from '../api'

const createOrder = (order1) => {
    return async (dispatch) => { 
        dispatch({type: CREATE_ORDER_REQUEST})
        try {
            const {order} = await axios.post(`${baseUrlLocal}/api/orders`, order1, { 
                headers: {
                    'Authorization': `Bearer ${order.token}`
                }
            })
            console.log("From Action",order)
            dispatch({type: CREATE_ORDER_SUCCESS, payload: order})
        } catch (error) {
            dispatch({type: CREATE_ORDER_FAILURE, payload: error.message})
        }
    }
}

export default createOrder;