export default function Product(){
    return(
        <>
            <section className="product-section">
                <h2 className="product-heading">Our Products</h2>
                <div className="product-container">
                    <div className="products">
                        <div className="product-card">
                            <div className="product-image">
                                <img src="/src/assets/Vector.png" className="heart-icon"></img>
                                <img src="/src/assets/products/p1.png" className="product-img" alt="Product 1" />
                            </div>
                            <div className="product-info">
                                <div className="product-name">cofee</div>
                                <div className="product-price"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}