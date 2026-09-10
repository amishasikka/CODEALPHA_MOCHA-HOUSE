import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    const updateCart = (id, change) => {
        const updatedCart = cart.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: Math.max(1, item.quantity + change) };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    const removeFromCart = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <section className="cart-section">
                <div className="empty-cart">
                    <ShoppingBag size={42} strokeWidth={1.5} />
                    <h1>Your Cart is Empty</h1>
                    <p>Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/products" className="continue-shopping-button">
                        Browse Menu
                        <ArrowRight size={17} />
                    </Link>
                </div>
            </section>
        )
    }

    return (
        <section className="cart-section">
            <div className="cart-heading">
                <div>
                    <p>YOUR ORDER</p>
                    <h1>Your Cart</h1>
                </div>
                <Link to="/products" className="continue-cart-button">
                    Add more products
                    <ArrowRight size={16} />
                </Link>
            </div>
            <div className="cart-container">
                <div className="cart-items">
                    {cart.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <div className="cart-item-image">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className="cart-item-info">
                                <h2>{item.name}</h2>
                                <p>${item.price.toFixed(2)}</p>
                                <div className="cart-item-bottom">
                                    <div className="quantity-controls">
                                        <button onClick={() => updateCart(item.id, -1)}>
                                            <Minus size={15} />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateCart(item.id, 1)}>
                                            <Plus size={15} />
                                        </button>
                                    </div>
                                    <button className="remove-cart-button" onClick={() => removeFromCart(item.id)}>
                                        <Trash2 size={16} />
                                        <span>Remove</span>
                                    </button>
                                </div>
                            </div>
                            <h3 className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</h3>
                        </div>
                    ))}
                </div>
                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-line">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="summary-line">
                        <span>Delivery</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-total">
                        <span>Total</span>
                        <strong>${total.toFixed(2)}</strong>
                    </div>
                    <Link to="/checkout" className="checkout-button">
                        Proceed to Checkout
                        <ArrowRight size={17} />
                    </Link>
                </div>
            </div>
        </section>
    )
}