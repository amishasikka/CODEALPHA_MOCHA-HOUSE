import { Link } from "react-router-dom";

export default function PageBanner({ title, current }) {
    return (
        <section className="page-banner">
            <div className="page-banner-content">
                <div className="page-breadcrumb">
                    <Link to="/">Home</Link>
                    <span>›</span>
                    <p>{current}</p>
                </div>
                <h1>{title}</h1>
                <p className="page-banner-text">Fresh coffee, warm moments.</p>
            </div>
        </section>
    )
}