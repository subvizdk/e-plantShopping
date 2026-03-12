import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + parseFloat(item.cost.substring(1)) * item.quantity;
    }, 0);
  };

  const calculateTotalCost = (item) => {
    return (parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-page">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>Paradise Nursery</h2>
          <p>Where Green Meets Serenity</p>
        </div>
      </nav>

      <div className="cart-container">
        <h2>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-card" key={item.name}>
              <img src={item.image} alt={item.name} className="cart-item-image" />

              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>{item.cost}</p>

                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>

                <p>Total: ${calculateTotalCost(item)}</p>
                <button className="delete-btn" onClick={() => handleRemove(item)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

        <div className="cart-actions">
          <button onClick={handleContinueShopping}>Continue Shopping</button>
          <button onClick={handleCheckoutShopping}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;