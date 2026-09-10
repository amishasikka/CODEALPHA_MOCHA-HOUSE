import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserRound, Mail, Lock, ArrowRight, Coffee } from "lucide-react";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
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

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            navigate("/login");
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
                    <p>JOIN MOCHA HOUSE</p>
                    <h1>Your perfect coffee is just a sip away.</h1>
                    <span>Create an account and make your next coffee break better.</span>
                </div>
                <div className="auth-form-container">
                    <div className="auth-heading">
                        <p>ACCOUNT</p>
                        <h2>Create Account</h2>
                    </div>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="auth-input-group">
                            <label htmlFor="name">Full Name</label>
                            <div className="auth-input">
                                <UserRound size={17} />
                                <input type="text" id="name" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                            </div>
                        </div>
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
                                <input type="password" id="password" name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="auth-input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="auth-input">
                                <Lock size={17} />
                                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} required />
                            </div>
                        </div>
                        {error && <p className="auth-error">{error}</p>}
                        <button type="submit" className="auth-button">
                            Create Account
                            <ArrowRight size={17} />
                        </button>
                    </form>
                    <p className="auth-switch">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}