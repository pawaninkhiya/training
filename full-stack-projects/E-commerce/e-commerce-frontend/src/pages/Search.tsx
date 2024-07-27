import { useState } from "react";
import ProductCard from "../components/ProductCard";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState<number>(1);

  const addToCartHander = () => {};
  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price ( Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price : {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select
            value={maxPrice}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="sample1">Sample 1</option>
            <option value="sample2">Sample 2</option>
          </select>
        </div>
      </aside>
      <main>
        <h1>Product</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="search-product-list">
          <ProductCard
            name="MacBook"
            photo="https://m.media-amazon.com/images/I/316ArzLeJ2L._SY445_SX342_QL70_FMwebp_.jpg"
            productId="sssasa"
            handler={addToCartHander}
            price={3474}
            stock={0}
          />
        </div>
        <article>
          <button onClick={() => setPage((prev) => prev - 1)}>Prev</button>
          <span>
            {page} of {6}
          </span>
          <button onClick={() => setPage((prev) => prev + 2)}>Next</button>
        </article>
      </main>
    </div>
  );
};

export default Search;
