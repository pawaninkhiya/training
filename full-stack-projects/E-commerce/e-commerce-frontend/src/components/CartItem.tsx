import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

type CarItemsProps = {
  cartItem: any;
};
const CartItem = ({ cartItem }: CarItemsProps) => {
  const { photo, productId, name, price, quantity, stock } = cartItem;
  return (
    <div className="cart-item">
      <img src={photo} alt={name} />
      <article>
        <Link to={`/product/${productId}`}></Link>
        <span>{name}</span>
        <span>
          ₹<b>{price}</b>
        </span>
      </article>
      <div>
        <button>-</button>
        <span>1</span>
        <button>+</button>
      </div>
      <button>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
