import { ADD_TO_CART, REMOVE_FROM_CART, REDUCE_QUANTITY, INITIAL_DATA } from '../actions/action-types/bcCart-actions';
import { calculateTotal } from '../utils/BigCUtils';


const initState = {
  items: [],
  addedItems: [],
  total: 0
};
 
const bcReducer = (state = initState, action) => {
  switch (action.type) {
    case INITIAL_DATA:
        return loadProducts(action.products, state);
    case ADD_TO_CART:
      return performAddToCart(action.id, state);
    case REMOVE_FROM_CART:
      return performRemoveFromCart(action.id, state);
    case REDUCE_QUANTITY:
      return performReduceQuantity(action.id, state);
    default:
      return state;
  }
}
//method to reduce quantity of provided product in cart and update state accordingly.
const performReduceQuantity = (id, state) => {
  let existing_item = state.addedItems.find(item => id === item.id);
  // If item doesn't exists in cart - return same last state - Its Error scenario.
  if (!existing_item) {
    return state;
  }
  // Reduce the quantity of product.
  existing_item.quantity -= 1;
  // If Item Quentity goes down to zero - means remove this product from cart.
  if (existing_item.quantity <= 0) {
    return performRemoveFromCart(id, state);
  }
  return {
    ...state,
    total: calculateTotal(state.addedItems)
  }
}
//method to remove provided product from cart and update state.
const performRemoveFromCart = (id, state) => {
  let remainingItems = removeProductFromCart(id, state);
  let newTotal = calculateTotal(remainingItems);
  return {
    ...state,
    addedItems: remainingItems,
    total: newTotal
  }
}
//method to remove Object from cart added items array; for id provided.
const removeProductFromCart = (id, state) => {
  return state.addedItems.filter(ele => {
    if (ele.id !== id) {
      return ele;
    }
    return null;
  });
}
const loadProducts = (products, state) => {
  return {
    ...state,
    items: products
  }
}
// add new Product Or update product quantity to the cart
const performAddToCart = (product, state) => {
  let addItemWithObject = false;
  //check if id has been passed to add Or an object been sent from product details to update.
  if (product.hasOwnProperty("quantity")) {
    addItemWithObject = true;
  }
  let id = addItemWithObject ? product.id : product;
  //check if the action id exists in the addedItems
  let existing_item = state.addedItems.find(item => id === item.id)
  // Ideally i should use deep copy (lodash/cloneDeep) method here - this is a shallow copy of object.
  let addedItem = addItemWithObject ? id : JSON.parse(JSON.stringify(state.items.find(item => item.id === product)));
  if (existing_item) {
    addedItem = existing_item;
    if (addItemWithObject) {
      addedItem.quantity = product.quantity;
    } else {
      addedItem.quantity += 1;
    }

    return {
      ...state,
      total: calculateTotal(state.addedItems)
    }
  }
  else {
    if (addItemWithObject) {
      addedItem = product;
    } else {
      addedItem.quantity = 1;
    }
    const addedItemsNew = [...state.addedItems, addedItem];
    return {
      ...state,
      addedItems: addedItemsNew,
      total: calculateTotal(addedItemsNew)
    }

  }
}

export default bcReducer;