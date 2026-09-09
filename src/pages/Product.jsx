import ProductCard from "../components/ProductCard";
import products from "../data/product";

export default function Product(){

    return(
        <section className="product-section">

            <h2 className="product-heading">
                Our Products
            </h2>

            <div className="product-container">

                <div className="products">

                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}

                </div>

            </div>

        </section>
    )
}