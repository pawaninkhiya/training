import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { OrderItemType, OrderType } from "../../types";
import { Link } from "react-router-dom";

const img =
  "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8";
const orderItems: OrderItemType[] = [
  {
    name: "Puma",
    photo: img,
    price: 2000,
    quantity: 1,
    _id: "sadnjdaksd",
  },
];
const TransactionManagement = () => {
  const [order, setOrder] = useState<OrderType>({
    name: "Abhishek Singh",
    address: "1056 housing board colony Hisar",
    city: "Hisar",
    state: "Haryana",
    pinCode: 125001,
    country: "India",
    status: "Processing",
    subtotal: 4000,
    discount: 1200,
    _id: "236837",
    shippingCharges: 0,
    tax: 200,
    total: 4000 + 2000 + 0 - 1200,
    orderItems,
  });

  const {
    name,
    address,
    city,
    country,
    state,
    pinCode,
    subtotal,
    shippingCharges,
    tax,
    discount,
    total,
    status,
  } = order;

  const updateHandler = () => {
    return setOrder((prev) => ({
      ...prev,
      status: prev.status === "Delivered" ? "Shipped" : "Delivered",
    }));
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section
          style={{
            padding: "2rem",
          }}
        >
          <h2>Order Items</h2>

          {order.orderItems.map((i) => (
            <ProductCard
              name={i.name}
              photo={i.photo}
              _id={i._id}
              quantity={i.quantity}
              price={i.price}
            />
          ))}
        </section>

        <article className="shipping-info-card">
          <h1>Order Info</h1>
          <h5>User Info</h5>
          <p>Name: {name}</p>
          <p>
            Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
          </p>

          <h5>Amount Info</h5>
          <p>Subtotal: {subtotal}</p>
          <p>Shipping Charges: {shippingCharges}</p>
          <p>Tax: {tax}</p>
          <p>Discount: {discount}</p>
          <p>Total: {total}</p>

          <h5>Status Info</h5>
          <p>
            Status:{" "}
            <span
              className={
                status === "Delivered"
                  ? "purple"
                  : status === "Shipped"
                  ? "green"
                  : "red"
              }
            >
              {status}
            </span>
          </p>

          <button onClick={updateHandler}>Process Status</button>
        </article>
      </main>
    </div>
  );
};

const ProductCard = ({ name, photo, quantity, price, _id }: OrderItemType) => (
  <div className="transaction-product-card">
    <img src={photo} alt="image" />
    <Link to={`/product/${_id}`}>{name}</Link>
    <span>
      ${price} X {quantity} = ${price * quantity}
    </span>
  </div>
);

export default TransactionManagement;
