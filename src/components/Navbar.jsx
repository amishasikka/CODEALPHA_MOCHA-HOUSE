import { Link } from "react-router-dom";

export default function Navbar(){
    return (
        <>
            <section className="navbar">
                <div className="nav">
                    <Link to="/" className="logo">
                        <img src="/src/assets/coffee-logo.png" alt="Coffee Logo"/>
                    </Link>
                    <div className="nav-links">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Menu</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                    </div>
                    
                </div>
            </section>
        </>
    )
}