import axios from 'axios'
import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
} from './userTypes';
import {baseUrlLocal} from '../api'


const loginUser = (credentials) => {
    return async(dispatch) => {
        dispatch({type: LOGIN_USER_REQUEST})
        try {
            const {data} = await axios.post(`${baseUrlLocal}/api/users/signin`, credentials)
            // const {data} = await axios.post('http://172.20.10.13:3000/api/users/signin', credentials)
            dispatch({type: LOGIN_USER_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type: LOGIN_USER_FAILURE, payload: error.message})
        }
    }
}

export default loginUser