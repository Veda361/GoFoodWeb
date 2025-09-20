import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext(null);
const CartDispatchContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.item];
    case "REMOVE":
      return state.filter((it) => it.id !== action.id);
    case "UPDATE_QTY":
      return state.map((it) =>
        it.id === action.id ? { ...it, qty: action.qty } : it
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, []);
  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartStateContext);
  if (ctx === null) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const useDispatchCart = () => {
  const ctx = useContext(CartDispatchContext);
  if (ctx === null)
    throw new Error("useDispatchCart must be used within CartProvider");
  return ctx;
};

export default CartProvider;
