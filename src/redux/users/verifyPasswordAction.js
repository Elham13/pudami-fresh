import {
    VERIFY_PASSWORD_REQUEST,
    VERIFY_PASSWORD_SUCCESS,
    VERIFY_PASSWORD_FAILURE
} from './userTypes'
import axios from 'axios'
import {baseUrlLocal} from '../api'

const reqVerifyPass = (oldPass) => {
    return (dispatch) => {
        dispatch({type: VERIFY_PASSWORD_REQUEST});
        try {
            const data = axios.post(`${baseUrlLocal}/api/users/changePassword`, oldPass, {
                headers: {
                    'Authorization': `Bearer ${oldPass.token}`
                }
            })
            data.then(res => {
                dispatch({type: VERIFY_PASSWORD_SUCCESS, payload: res.data})
            })
        } catch (error) {
            dispatch({type: VERIFY_PASSWORD_FAILURE, payload: error.message})
        }
    }
}

export default reqVerifyPass;