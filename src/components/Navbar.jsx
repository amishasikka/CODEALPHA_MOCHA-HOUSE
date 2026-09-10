import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserRound, LogOut } from "lucide-react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        navigate("/login");
    }

    return (
        <>
            <section className="navbar">
                <div className="nav">
                    <Link to="/" className="logo">
                        <img src="/src/assets/logo.png" alt="Coffee Logo" />
                    </Link>
                    <div className="nav-links">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Menu</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                            {user && <li><Link to="/orders">My Orders</Link></li>}
                        </ul>
                    </div>
                    <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                        <ul>
                            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                            <li><Link to="/products" onClick={() => setMenuOpen(false)}>Menu</Link></li>
                            <li><Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link></li>
                            {user && <li><Link to="/orders" onClick={() => setMenuOpen(false)}>My Orders</Link></li>}
                            {!user && <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>}
                            {user && <li><button className="mobile-logout" onClick={handleLogout}><LogOut size={16} /> Logout</button></li>}
                            <li><img src="/src/assets/mobile-menu-logo.png" alt="coffee logo" /></li>
                        </ul>
                    </div>
                    <div className="nav-btns">
                        {user ? (
                            <button className="logout-button" onClick={handleLogout}>
                                <UserRound size={18} />
                                <span>{user.name}</span>
                                <LogOut size={16} />
                            </button>
                        ) : (
                            <Link to="/login">
                                <UserRound strokeWidth={2} color="var(--dark)" className="login-icon" />
                            </Link>
                        )}
                    </div>
                    <div className="menu">
                        <img src={menuOpen ? "/src/assets/menu-close.png" : "/src/assets/menu-open.png"} onClick={() => setMenuOpen(!menuOpen)} alt={menuOpen ? "Menu Close" : "Menu Open"} />
                    </div>
                </div>
            </section>
        </>
    )
}