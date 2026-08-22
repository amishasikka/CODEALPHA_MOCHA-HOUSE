import { Link } from "react-router-dom";
import { useState } from "react";
import {
    CircleUser,
    ShoppingBag,
    Coffee,
    Heart,
    Leaf,
    ArrowRight
} from "lucide-react";
export default function Navbar(){

    const [menuOpen , setMenuOpen] = useState(false);
    return (
        <>
            <section className="navbar">
                <div className="nav">
                    <Link to="/" className="logo">
                        <img src="/src/assets/logos.png" alt="Coffee Logo"/>
                    </Link>
                    <div className="nav-links">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Menu</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                        </ul>
                    </div>

                    <div className={`mobile-menu : ${menuOpen ? "open" : ""}`}>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Menu</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><img src="/src/assets/mobile-menu-logo.png" alt="coffee logo" /></li>
                        </ul>
                    </div>

                    <div className="nav-btns">
                        <Link to="/login" className="login-btn">
                            <CircleUser size={18} strokeWidth={2} color="var(--cards)" />
                            login
                        </Link>
                    </div>

                    <div className="menu">
                        <img src={menuOpen ? "/src/assets/menu-close.png" : 
                        "/src/assets/menu-open.png"} onClick={() => setMenuOpen(!menuOpen)} 
                        alt={menuOpen ? "Menu Close" : "Menu Open"}/>
                    </div>
                    
                </div>
            </section>
        </>
    )
}