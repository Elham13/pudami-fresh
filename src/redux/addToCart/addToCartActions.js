import { 
    ADD_TO_CART, 
    REMOVE_FROM_CART,
    INCREASE_QTY,
    DECREASE_QTY,
    RESET_AND_ADD,
} from './addToCartTypes'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const addToCart = (item) => {
    return async (dispatch, getState) => {
        dispatch({type: ADD_TO_CART, payload: item});
        await AsyncStorage.setItem("CartItem", JSON.stringify(getState().addToCart.cart))
        console.log("Action: ", getState().addToCart.cart);
    }
}