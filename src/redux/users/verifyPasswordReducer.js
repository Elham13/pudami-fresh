import {
    VERIFY_PASSWORD_REQUEST,
    VERIFY_PASSWORD_SUCCESS,
    VERIFY_PASSWORD_FAILURE
} from './userTypes'

const initialState = {
    verifyLoading: false,
    verifyData: {},
    verifyError: ''
}

const verifyPasswordReducer = (state=initialState, action) => {
    switch(action.type){
        case VERIFY_PASSWORD_REQUEST:
            return {
                ...state,
                verifyLoading: true
            }
        case VERIFY_PASSWORD_SUCCESS:
            return {
                verifyLoading: false,
                verifyData: action.payload,
                verifyError: ''
            }
        case VERIFY_PASSWORD_FAILURE:
            return {
                verifyLoading: false,
                verifyData: {},
                verifyError: action.payload
            }
        default: return state
    }
}

export default verifyPasswordReducer;