import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      // ADD TO CART

      const newItem = action.payload;
      //   CHECK IF THE ITEM ALREADY EXISTS IN CART SO AS NOT TO ADD DUPLICATE ITEMS
      const existItem = state.cart.cartItems.find((x) => x._id === newItem._id);

      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      // SAVE THE CART ITEMS TO LOCAL STORAGE
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return {
        ...state,
        cart: { ...state.cart, cartItems },
      };

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      // SAVE CART ITEMS TO LOCAL STORAGE BEFORE THE RETURN STATEMENT
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } };
    }

    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{children}</Store.Provider>;
};
