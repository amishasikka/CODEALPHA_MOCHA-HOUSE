import Navbar from "../components/Navbar";
import { Coffee, Leaf, Heart } from "lucide-react";

export default function Home(){
    return(
        <>
            <div className="hero-wrapper">
                <Navbar/>
                <section className="home">
                    <div className="hero-content">
                        <p className="welcome-text">WELCOME</p>
                        <h1 className="hero-heading">We serve the richest coffee in the city!</h1>
                        <p className="hero-subheading">Experience the perfect blend of flavor and aroma with our premium coffee selection.</p>
                    </div>
                </section>
            </div>
            <section className="why-section">
                <div className="why-heading">
                    <p>WHY MOCHA HOUSE</p>
                    <h2>Made for your perfect coffee moment.</h2>
                </div>
                <div className="why-cards">
                    <div className="why-card">
                        <span><Coffee size={24}/></span>
                        <h3>Freshly Brewed</h3>
                        <p>Every cup is freshly prepared for a rich and smooth taste.</p>
                    </div>
                    <div className="why-card">
                        <span><Leaf size={24}/></span>
                        <h3>Quality Ingredients</h3>
                        <p>We use carefully selected ingredients in every drink.</p>
                    </div>
                    <div className="why-card">
                        <span><Heart size={24}/></span>
                        <h3>Made With Care</h3>
                        <p>Good coffee, warm moments and a little care in every order.</p>
                    </div>
                </div>
            </section>
        </>
    )
}