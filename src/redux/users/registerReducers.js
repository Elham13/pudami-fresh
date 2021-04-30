import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGOUT
} from './userTypes';

const initialState = {
    loading: false,
    userData: {},
    userError: ''
}

const registerReducer = (state=initialState, action) => {
    switch(action.type){
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case REGISTER_USER_SUCCESS:
            return {
                loading: false,
                userData: action.payload,
                userError: ''
            }
        case REGISTER_USER_FAILURE:
            return {
                loading: false,
                userData: {},
                userError: action.payload
            }
        case LOGOUT:
            return initialState
        default:
            return state
    }
}

export default registerReducer;