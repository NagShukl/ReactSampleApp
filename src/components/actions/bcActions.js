import { ADD_TO_CART, REMOVE_FROM_CART, REDUCE_QUANTITY,INITIAL_DATA} from './action-types/bcCart-actions';
//add cart action
export const addToCart= (id)=>{
    return{
        type: ADD_TO_CART,
        id
    }
}
export const removeFromCart= (id)=>{
    return{
        type: REMOVE_FROM_CART,
        id
    }
}
export const reduceQuantity = (id) => {
    return{
        type: REDUCE_QUANTITY,
        id
    }
}
export const loadProducts = (products) => {
    return{
        type: INITIAL_DATA,
        products
    }
}