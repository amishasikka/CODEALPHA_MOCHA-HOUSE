import ProductCard from "../components/ProductCard";
import products from "../data/product";
import PageBanner from "../components/PageBanner";

export default function Product(){

    return(
        <>
        <PageBanner title="Our Menu" current="Menu"/>
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
        </>
    )
}