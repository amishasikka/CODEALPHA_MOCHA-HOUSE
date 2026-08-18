import { Link } from "react-router-dom";

export default function Navbar(){
    return (
        <>
            <section className="navbar">
                <div className="nav">
                    <Link to="/" className="logo">
                        <img src="/src/assets/logo.png" alt="Coffee Logo"/>
                    </Link>
                    <div className="nav-links">
                        <ul>
                            <li><Link to="/">home</Link></li>
                            <li><Link to="/products">menu</Link></li>
                            <li><Link to="/cart">cart</Link></li>
                        </ul>
                    </div>

                    <div className="menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <div className="nav-btns">
                        <Link to="/login" className="login-btn">login</Link>
                    </div>
                    
                </div>
            </section>
        </>
    )
}