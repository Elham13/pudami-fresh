import axios from 'axios'
import {
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILURE
} from './userTypes'
import { baseUrlLocal } from '../api'

const editProfile = (user) => {
    return async (dispatch) => {
        dispatch({type: EDIT_PROFILE_REQUEST})
        try {
            const {data} = await axios.put(`${baseUrlLocal}/api/users/profile`, user, {
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                }
            })
            dispatch({type: EDIT_PROFILE_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type: EDIT_PROFILE_FAILURE, payload: error.message})
        }
    }
}

export default editProfile;