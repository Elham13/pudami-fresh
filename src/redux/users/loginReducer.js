import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
} from './userTypes';

const initialState = {
    loginLoading: false,
    loginData: {},
    loginError: ''
}

const loginReducer = (state=initialState, action) => {
    switch(action.type){
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                loginLoading: true
            }
        case LOGIN_USER_SUCCESS: 
            return {
                loginLoading: false,
                loginData: action.payload,
                loginError: ''
            }
        case LOGIN_USER_FAILURE:
            return {
                loginLoading: false,
                loginData: {},
                loginError: action.payload
            }
        default: return state
    }
}

export default loginReducer;