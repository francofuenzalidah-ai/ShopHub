import { useState } from "react";
import { CartContext } from "../hooks/useCart";
import { getProductById } from "../data/products";

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function addToCart(productId) {
        const existing = cartItems.find((item) => item.productId === productId);
        if (existing) {
            const updatedCartItems = cartItems.map(
                (item) => item.productId === productId
                    ? { productId: item.productId, quantity: item.quantity + 1 }
                    : item);
            setCartItems(updatedCartItems)
        }
        else {
            setCartItems([...cartItems, { productId: productId, quantity: 1 }])
        }
    }

    function removeItemFromCart(productId) {
        const updatedCartItems = cartItems.filter(item => item.productId !== productId);
        setCartItems(updatedCartItems);
    }

    function updateQuantity(productId, quantity) {
        if (quantity < 1) {
            removeItemFromCart(productId);
            return;
        }
        setCartItems(cartItems.map((item) => (
            item.productId === productId ? { ...item, quantity: quantity } : item
        )));
    }

    function productQuantityInCart(productId) {

        const product = cartItems.find((item) => item.productId === productId);
        if (product) {
            return "(" + product.quantity + ")";
        }
        return "";
    }

    function getCartItemsWithProducts() {
        return cartItems.map((item) => ({
            ...item, product: getProductById(item.productId)
        })).filter(item => item.product);
    }

    function getCartTotal() {
        const total = cartItems.reduce((total, item) => {
            const product = getProductById(item.productId);
            console.log(product);
            return total + (product ? (product.price * item.quantity) : 0);
        }, 0);
        return total;
    }

    function PlaceOrder() {
        alert("Successful Order!")
        ClearCart();
    }

    function ClearCart() {
        setCartItems([]);
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                productQuantityInCart,
                getCartItemsWithProducts,
                updateQuantity,
                removeItemFromCart,
                getCartTotal,
                PlaceOrder
            }}
        >
            {children}
        </CartContext.Provider>
    );
}