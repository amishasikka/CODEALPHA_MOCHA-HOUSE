import { Link } from "react-router-dom";
import { Coffee, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        <img src="/src/assets/logo.png" alt="Mocha House Logo" />
                    </Link>
                    <p>Rich coffee, warm moments and everything you need for your perfect coffee break.</p>
                </div>
                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <Link to="/">Home</Link>
                    <Link to="/products">Menu</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/orders">My Orders</Link>
                </div>
                <div className="footer-contact">
                    <h3>Contact</h3>
                    <div>
                        <MapPin size={15} />
                        <span>Remote</span>
                    </div>
                    <div>
                        <Mail size={15} />
                        <span>hello@mochahouse.com</span>
                    </div>
                    <div>
                        <Phone size={15} />
                        <span>+91 98765 43210</span>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2026 Mocha House. All rights reserved.</p>
                <Coffee size={16} />
            </div>
        </footer>
    )
}