import axios from 'axios';
import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
} from './userTypes';
import {baseUrlLocal} from '../api'

const registerUser = (user) => { 
    return async (dispatch) => {
        dispatch({type: REGISTER_USER_REQUEST});
        try {
            const {data} = await axios.post(`${baseUrlLocal}/api/users/register`, user)
            // const {data} = await axios.post('http://172.20.10.13:3000/api/users/register', user)
            dispatch({type: REGISTER_USER_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type: REGISTER_USER_FAILURE, payload: error.message})
        }
    }
}

export default registerUser;