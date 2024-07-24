import { ChangeEvent, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

const NewProduct = () => {
  const [photo, setPhoto] = useState<string>();
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();

  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    const reader: FileReader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhoto(reader.result);
        }
      };
    }
  };
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form>
            <h2>New Product</h2>
            <div>
              <label htmlFor="">Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
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
                value={price}
                onChange={(e) => {
                  setPrice(Number(e.target.value));
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
                value={stock}
                onChange={(e) => {
                  setStock(Number(e.target.value));
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
            {photo && <img src={photo} alt="New Image" />}
            <button>Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
