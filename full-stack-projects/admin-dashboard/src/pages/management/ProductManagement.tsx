import { ChangeEvent, FormEvent, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

const img =
  "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8";
const ProductManagement = () => {
  const [photo, setPhoto] = useState<string>(img);
  const [name, setName] = useState<string>("Puma Shoes");
  const [price, setPrice] = useState<number>(1234);
  const [stock, setStock] = useState<number>(0);
  const [photoUpdate, setPhotoUpdate] = useState<string>(photo);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    const reader: FileReader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
        }
      };
    }
  };
  const updateProductData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("update product data");
    setPhoto(photoUpdate);
    setName(nameUpdate);
    setPrice(priceUpdate);
    setStock(stockUpdate);
  };
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section>
          <strong>ID - asnmdkasndmsan</strong>
          <img src={photo} alt="Product" />
          <p>{name}</p>
          {stock > 0 ? (
            <span className="green">{stock} Available</span>
          ) : (
            <span className="red">Not Available</span>
          )}
          <h3>${price}</h3>
        </section>
        <article>
          <form onSubmit={updateProductData}>
            <h2>New Product</h2>
            <div>
              <label htmlFor="">Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                name="name"
                value={nameUpdate}
                onChange={(e) => {
                  setNameUpdate(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="">Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                name="price"
                value={priceUpdate}
                onChange={(e) => {
                  setPriceUpdate(Number(e.target.value));
                }}
              />
            </div>
            <div>
              <label htmlFor="">Stock</label>
              <input
                required
                type="number"
                placeholder="Name"
                name="stock"
                value={stockUpdate}
                onChange={(e) => {
                  setStockUpdate(Number(e.target.value));
                }}
              />
            </div>
            <div>
              <label htmlFor="">Photo</label>
              <input
                type="file"
                placeholder="Name"
                name="photo"
                // value={photo}
                onChange={imageChange}
              />
            </div>
            {photoUpdate && <img src={photoUpdate} alt="New Image" />}
            <button>Update</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default ProductManagement;
