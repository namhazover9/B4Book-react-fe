import Cart from './Cart';
import { useState } from 'react';

function PopupCart() {
  const [totalPriceBeforeDiscount, setTotalPriceBeforeDiscount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  return (
    <div>
      <Cart
        onTotalPriceChange={setTotalPriceBeforeDiscount}
        onCartItemsChange={setCartItems}
        showUI={true}
      />
      <p>Total Price Before Discount: ${totalPriceBeforeDiscount.toFixed(2)}</p>
      <h3>Cart Items:</h3>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopupCart;
