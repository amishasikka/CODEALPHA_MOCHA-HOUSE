import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please login to view your orders");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/orders", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (!response.ok) {
                    setError(data.message);
                    return;
                }

                setOrders(data);
            } catch (error) {
                setError("Unable to connect to the server");
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <section className="orders-section">
                <div className="orders-message">
                    <p>Loading your orders...</p>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="orders-section">
                <div className="orders-message">
                    <p>{error}</p>
                    <Link to="/login" className="continue-shopping-button">
                        Login
                    </Link>
                </div>
            </section>
        )
    }

    return (
        <section className="orders-section">
            <div className="orders-heading">
                <p>YOUR HISTORY</p>
                <h1>My Orders</h1>
            </div>
            {orders.length === 0 ? (
                <div className="orders-message">
                    <ShoppingBag size={42} strokeWidth={1.5} />
                    <h2>No Orders Yet</h2>
                    <p>Once you place an order, it will appear here.</p>
                    <Link to="/products" className="continue-shopping-button">
                        Browse Menu
                        <ArrowRight size={17} />
                    </Link>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div className="order-card" key={order._id}>
                            <div className="order-card-heading">
                                <div>
                                    <p>ORDER</p>
                                    <h2>#{order._id.slice(-6).toUpperCase()}</h2>
                                </div>
                                <span>{order.status}</span>
                            </div>
                            <div className="order-items">
                                {order.items.map((item) => (
                                    <div className="order-item" key={item.productId}>
                                        <div>
                                            <h3>{item.name}</h3>
                                            <p>Qty: {item.quantity}</p>
                                        </div>
                                        <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                                    </div>
                                ))}
                            </div>
                            <div className="order-card-bottom">
                                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                                <strong>${order.total.toFixed(2)}</strong>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}