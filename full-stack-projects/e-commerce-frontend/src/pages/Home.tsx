import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const addToCart = () => {};
  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="find-more">
          More
        </Link>
      </h1>
      <main>
        <ProductCard
          name="MacBook"
          photo="https://m.media-amazon.com/images/I/316ArzLeJ2L._SY445_SX342_QL70_FMwebp_.jpg"
          productId="sssasa"
          handler={addToCart}
          price={3474} stock={0}        />
      </main>
    </div>
  );
};

export default Home;
    