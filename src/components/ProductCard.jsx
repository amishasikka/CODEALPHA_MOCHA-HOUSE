import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

    return (
        <>
            <div className="product-card">
                <div className="product-image">
                    <img src={product.image}
                        className="product-img"
                        alt={product.name}/>
                </div>
                <div className="product-info">
                    <div className="product-title">
                        <h2 className="product-name">
                            {product.name}
                        </h2>
                        <p className="product-description">
                            {product.description}
                        </p>
                    </div>
                    <div className="product-price-order">
                        <h3 className="product-price">
                            ${product.price}
                        </h3>
                        <Link to={`/product/${product.id}`}
                            className="order-button">Order Now
                        </Link>
                    </div>
                </div>
            </div>  
        </>
    )
}