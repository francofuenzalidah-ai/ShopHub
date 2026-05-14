import useCart from '../hooks/useCart'

export default function AddToCartButton(productId) {
    const { addToCart, productQuantityInCart } = useCart();
    const quantity = productQuantityInCart(productId.value);
    
    return (
        <button className="btn btn-primary"
            onClick={() => { addToCart(productId.value) }}>
            Add to cart {quantity}</button>
    )
}