import { Link } from "react-router-dom"


const Home = () => {
  return (
    <div className="home">
      <section></section>
      <h1>Latest Products
      <Link to="/search" className="find-more" >More</Link>
      </h1>
    </div>
  )
}

export default Home