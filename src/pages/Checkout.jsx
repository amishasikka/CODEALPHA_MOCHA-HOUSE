import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CreditCard, ShoppingBag, Check } from "lucide-react";

export default function Checkout() {
    const navigate = useNavigate();
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        payment: "Cash on Delivery"
    });

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const token = localStorage.getItem("token");
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
        setError("Please login before placing your order.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                customer: formData,
                items: cart.map((item) => ({
                    productId: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                paymentMethod: formData.payment,
                total
            })
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.message);
            return;
        }

        localStorage.removeItem("cart");
        setOrderPlaced(true);
    } catch (error) {
        setError("Unable to connect to the server");
    }
}
if (!token && !orderPlaced) {
    return (
        <section className="checkout-section">
            <div className="empty-checkout">
                <ShoppingBag size={42} strokeWidth={1.5} />
                <h1>Login Required</h1>
                <p>Please login to your account before placing an order.</p>
                <Link to="/login" className="continue-shopping-button">
                    Login
                    <ArrowRight size={17} />
                </Link>
            </div>
        </section>
    )
}
    if (cart.length === 0 && !orderPlaced) {
        return (
            <section className="checkout-section">
                <div className="empty-checkout">
                    <ShoppingBag size={42} strokeWidth={1.5} />
                    <h1>No Items to Checkout</h1>
                    <p>Add some products to your cart before proceeding.</p>
                    <Link to="/products" className="continue-shopping-button">
                        Browse Menu
                    </Link>
                </div>
            </section>
        )
    }

    if (orderPlaced) {
        return (
            <section className="checkout-section">
                <div className="order-success">
                    <div className="success-icon">
                        <Check size={28} />
                    </div>
                    <p className="success-label">ORDER CONFIRMED</p>
                    <h1>Thank You for Your Order!</h1>
                    <p>Your order has been placed successfully. We’ll prepare your items fresh for you.</p>
                    <Link to="/products" className="continue-shopping-button">
                        Continue Shopping
                    </Link>
                </div>
            </section>
        )
    }

    return (
        <section className="checkout-section">
            <div className="checkout-navigation">
                <Link to="/cart" className="checkout-back-link">
                    <ArrowLeft size={16} />
                    <span>Back to Cart</span>
                </Link>
                <Link to="/products" className="checkout-shopping-link">
                    Continue Shopping
                    <ArrowRight size={16} />
                </Link>
            </div>
            <div className="checkout-heading">
                <p>FINAL STEP</p>
                <h1>Checkout</h1>
            </div>
            <div className="checkout-container">
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <div className="checkout-form-section">
                        <h2>Delivery Details</h2>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Delivery Address</label>
                            <textarea id="address" name="address" rows="3" value={formData.address} onChange={handleChange} required></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="checkout-form-section">
                        <h2>Payment Method</h2>
                        <label className="payment-option">
                            <input type="radio" name="payment" value="Cash on Delivery" checked={formData.payment === "Cash on Delivery"} onChange={handleChange} />
                            <span>Cash on Delivery</span>
                        </label>
                        <label className="payment-option">
                            <input type="radio" name="payment" value="Card Payment" checked={formData.payment === "Card Payment"} onChange={handleChange} />
                            <span>Card Payment</span>
                        </label>
                    </div>
                    <button type="submit" className="place-order-button">
                        <CreditCard size={17} />
                        {error && <p className="checkout-error">{error}</p>}
                        <span>Place Order</span>
                    </button>
                </form>
                <div className="checkout-summary">
                    <h2>Your Order</h2>
                    <div className="checkout-summary-items">
                        {cart.map((item) => (
                            <div className="checkout-summary-item" key={item.id}>
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>Qty: {item.quantity}</p>
                                </div>
                                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                            </div>
                        ))}
                    </div>
                    <div className="checkout-summary-line"></div>
                    <div className="checkout-total">
                        <span>Total</span>
                        <strong>${total.toFixed(2)}</strong>
                    </div>
                </div>
            </div>
        </section>
    )
}