import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, removeFromCart } from "../../store/slice/cartSlice";
import "./Cart.css";
import PaymentSummary from "./paymentSummary";
export default function CartPage() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className="cart-item-details-grid">
      <div className="checkout-page">
        <div className="page-title">Review your order</div>
        {cartItems.length === 0 ? (
          <div className="empty-cart">There is nothing in your cart</div>
        ) : (
          <div className="checkout-grid">
            {cartItems.map((cartItem) => (
              <div className="cart-item" key={cartItem.id}>
                <img className="product-image" src={cartItem.image} />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.title}</div>
                  <div className="product-price">${cartItem.price}</div>

                  <div className="product-quantity">
                    <span>
                      Quantity:{" "}
                      <span className="quantity-label">
                        {cartItem.quantity}
                      </span>
                    </span>

                    <input
                      type="number"
                      value={cartItem.quantity}
                      min="1"
                      onChange={(e) =>
                        dispatch(
                          updateQuantity({
                            id: cartItem.id,
                            quantity: Number(e.target.value),
                          })
                        )
                      }
                    />

                    <span
                      className="delete-quantity-link link-primary"
                      onClick={() => dispatch(removeFromCart(cartItem.id))}
                    >
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <PaymentSummary />
          </div>
        )}
      </div>
    </div>
  );
}
