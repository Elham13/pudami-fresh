import { 
    ADD_TO_CART, 
    REMOVE_FROM_CART,
    INCREASE_QTY,
    DECREASE_QTY,
    RESET_AND_ADD,
    EMPTY_CART,
} from './addToCartTypes'

const initialState = { 
    cart: []
}

const addToCartReducer = (state=initialState, action) => {
    switch(action.type) {
        case RESET_AND_ADD: 
            return { 
                cart: action.payload
            }
        case ADD_TO_CART:
            return {
                cart: [...state.cart, action.payload]
            };
        case EMPTY_CART: 
            return {
                cart: []
            }
        case REMOVE_FROM_CART:
            const product2 = state.cart.find(prod => prod.id == action.payload.pId)
            const index = state.cart.findIndex(p => p.id == product2.id)
            state.cart.splice(index, 1);
            return{
                cart: state.cart
            }

        case INCREASE_QTY: 
            const product = state.cart.find(prod => prod.id == action.payload.pId)
            product.qty += action.payload.increseLimit
            product.totalPrice = product.qty * product.price
            const newCart = state.cart.map(obj => {
                if(obj.id == product.id){
                   return obj = product
                }else {
                    return obj
                }
            })
            return {
                cart: newCart
            }
        
        case DECREASE_QTY: 
            const product1 = state.cart.find(prod => prod.id == action.payload.pId)
            product1.qty -= action.payload.decreseLimit
            product1.totalPrice = product1.totalPrice - (action.payload.decreseLimit * product1.price)
            const newCart1 = state.cart.map(obj => {
                if(obj.id == product1.id){
                    return obj = product1
                }else{
                    return obj
                }
            })
            return {
                cart: newCart1
            }

        default: return state
    }
}

export default addToCartReducer