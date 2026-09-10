import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Coffee } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("loggedInUser", JSON.stringify(data.user));
            navigate("/");
        } catch (error) {
            setError("Unable to connect to the server");
        }
    }

    return (
        <section className="auth-section">
            <div className="auth-container">
                <div className="auth-brand">
                    <div className="auth-icon">
                        <Coffee size={25} />
                    </div>
                    <p>WELCOME BACK</p>
                    <h1>Good coffee starts with good company.</h1>
                    <span>Sign in to continue your Mocha House experience.</span>
                </div>
                <div className="auth-form-container">
                    <div className="auth-heading">
                        <p>ACCOUNT</p>
                        <h2>Login</h2>
                    </div>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="auth-input-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="auth-input">
                                <Mail size={17} />
                                <input type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="auth-input-group">
                            <label htmlFor="password">Password</label>
                            <div className="auth-input">
                                <Lock size={17} />
                                <input type="password" id="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
                            </div>
                        </div>
                        {error && <p className="auth-error">{error}</p>}
                        <button type="submit" className="auth-button">
                            Login
                            <ArrowRight size={17} />
                        </button>
                    </form>
                    <p className="auth-switch">
                        Don't have an account? <Link to="/register">Create one</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}