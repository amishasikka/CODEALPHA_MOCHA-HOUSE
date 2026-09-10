import { useParams, Link, useNavigate } from "react-router-dom";
import { Coffee, ArrowLeft, ShoppingBag } from "lucide-react";
import products from "../data/product";
import PageBanner from "../components/PageBanner";

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find((product) => product.id === Number(id));

    if (!product) {
        return (
            <section className="product-details">
                <div className="product-not-found">
                    <h2>Product not found</h2>
                    <Link to="/products">Back to Menu</Link>
                </div>
            </section>
        )
    }

    const addToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = existingCart.find((item) => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            existingCart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(existingCart));
        navigate("/cart");
    }

    return (
        <>
        <PageBanner title="Product Details" current="Product Details"/>
        <section className="product-details">
            <Link to="/products" className="details-back-link">
                <ArrowLeft size={16} />
                <span>Back to Menu</span>
            </Link>
            <div className="product-details-container">
                <div className="product-details-image">
                    <div className="image-background">
                        <Coffee className="image-decoration" size={24} strokeWidth={1.5} />
                        <img src={product.image} alt={product.name} />
                    </div>
                </div>
                <div className="product-details-info">
                    <p className="product-category">{product.category}</p>
                    <h1 className="product-details-name">{product.name}</h1>
                    <h2 className="product-details-price">${product.price}</h2>
                    <div className="details-line"></div>
                    <p className="product-details-description">{product.description}</p>
                    <div className="details-actions">
                        <button className="add-cart-button" onClick={addToCart}>
                            <ShoppingBag size={17} />
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}