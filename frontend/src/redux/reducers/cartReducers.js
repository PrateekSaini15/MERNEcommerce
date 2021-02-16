import { ADD_PRODUCT_TO_CART } from "../actions/actionTypes";

const initialState = {
  items: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      state = addItemToCart(state, action.payload);
      return state;
    default:
      return state;
  }
}

function addItemToCart(state, item) {
  let items = state.items;
  let itemInCart = false;
  for (let i = 0; i < items.length; i++) {
    if (items[i]._id == item._id) {
      items[i].cartQuantity++;
      itemInCart = true;
    }
  }
  if (!itemInCart) {
    item.cartQuantity = 1;
    items.push(item);
  }
  return { ...state, items: items };
}
