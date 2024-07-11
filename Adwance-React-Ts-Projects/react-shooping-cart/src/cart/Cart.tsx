import CartItem from "../cardItem/CartItem";
import { Wrapper } from "./Cart.Styles";
import { ProductTypes } from "../shared/typs";

type Props = {
  cartItems: ProductTypes[];
  addToCart: (clickedItem: ProductTypes) => void;
  removeFromCart: (id: number) => void;
};
const Cart = ({ cartItems, addToCart, removeFromCart }: Props) => {
  const calculateTotal = (items: ProductTypes[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
  return (
    <Wrapper>
      <h2>Your Shooping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Totel : ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
