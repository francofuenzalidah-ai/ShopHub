import { createContext, useContext } from "react";

export const CartContext = createContext(null);

export default function useCart() {
    return useContext(CartContext);
}