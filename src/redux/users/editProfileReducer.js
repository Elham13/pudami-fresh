import {
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILURE
} from './userTypes'

const initialState = {
    loading: false,
    editedData: {},
    editedError: ''
}

const editProfileReducer = (state=initialState, action) => {
    switch(action.type){
        case EDIT_PROFILE_REQUEST: 
            return {
                ...state,
                loading: true
            }
        case EDIT_PROFILE_SUCCESS:
            return {
                loading: false,
                editedData: action.payload,
                editedError: ''
            }
        case EDIT_PROFILE_FAILURE: 
            return {
                loading: false,
                editedData: {},
                editedError: action.payload
            }
        default: return state 
    }
}

export default editProfileReducer