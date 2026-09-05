import Navbar from "../components/Navbar";
import Product from "./Product";

export default function Home(){
    return (
        <>
            <div className="hero-wrapper">
                <Navbar/>
                <section className="home">
                    <div className="hero-content">
                        <p className="welcome-text">WELCOME</p>
                        <h1 className="hero-heading">We serve the richest coffee in the city!</h1>
                        <p className="hero-subheading">Experience the perfect blend of flavor and aroma with our premium coffee selection.</p>
                        <button className="hero-button">Order Now</button>
                    </div>
                </section>
            </div>
            <Product/>
        </>
    )
}