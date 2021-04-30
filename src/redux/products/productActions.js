import {
    PRODUCT_FETCH_REQUEST,
    PRODUCT_FETCH_SUCCESS,
    PRODUCT_FETCH_FAIL
} from './productTypes'
import axios from 'axios'
import {baseUrlLocal} from '../api'

const fetchProducts = () => {
    return async (dispatch) =>  {
        dispatch({type: PRODUCT_FETCH_REQUEST})
        try {
            const { data } = await axios.get(`${baseUrlLocal}/api`)
            // const { data } = await axios.get('http://172.20.10.13:3000/api')
            dispatch({type: PRODUCT_FETCH_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type: PRODUCT_FETCH_FAIL, payload: error.message})
        }
    }
}

export default fetchProducts