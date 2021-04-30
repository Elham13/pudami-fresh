import {
    PRODUCT_FETCH_REQUEST,
    PRODUCT_FETCH_SUCCESS,
    PRODUCT_FETCH_FAIL
} from './productTypes'

const initialState = {
    loading: false,
    products: [],
    error: ''
}

const productReducer = (state = initialState, action) => {
    switch(action.type){
        case PRODUCT_FETCH_REQUEST: 
            return {
                ...state,
                loading: true
            };
        case PRODUCT_FETCH_SUCCESS:
            return {
                loading: false,
                products: action.payload,
                error: ''
            };
        case PRODUCT_FETCH_FAIL: 
            return {
                loading: false,
                products: [],
                error: action.payload
            }
        default: return state;
    }
}

export default productReducer;