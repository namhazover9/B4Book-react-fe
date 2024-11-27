import Cart from './Cart';
import { useState } from 'react';

function PopupCart() {
  const [totalPriceBeforeDiscount, setTotalPriceBeforeDiscount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    // gửi dữ liệu bằng API
  };

  return (
    <form
      className="popup-cart p-4 bg-gray-100 rounded shadow-md"
      onSubmit={handleSubmit}
    >
      <Cart
        onTotalPriceChange={setTotalPriceBeforeDiscount}
        onCartItemsChange={setCartItems}
        showUI={true}
      />

      <div className="total-price mt-4 text-lg font-semibold">
        Total Price Before Discount: ${totalPriceBeforeDiscount.toFixed(2)}
      </div>
      <h3 className="cart-items-title mt-6 text-xl font-bold">Cart Items:</h3>
      {cartItems.length > 0 ? (
        <>
          <ul className="cart-items-list mt-2 space-y-2">
            {cartItems.map((item, index) => (
              <li
                key={item.id}
                className="cart-item flex justify-between items-center bg-white p-2 rounded shadow"
              >
                <span className="item-name font-medium">{item.name}</span>
                <span className="item-details text-sm text-gray-500">
                  ${item.price} x {item.quantity}
                </span>
                <input
                  type="hidden"
                  name={`cartItems[${index}][id]`}
                  value={item.id}
                />
                <input
                  type="hidden"
                  name={`cartItems[${index}][name]`}
                  value={item.name}
                />
                <input
                  type="hidden"
                  name={`cartItems[${index}][price]`}
                  value={item.price}
                />
                <input
                  type="hidden"
                  name={`cartItems[${index}][quantity]`}
                  value={item.quantity}
                />
              </li>
            ))}
          </ul>
          <input
            type="hidden"
            name="totalPriceBeforeDiscount"
            value={totalPriceBeforeDiscount}
          />
        </>
      ) : (
        <p className="empty-cart mt-4 text-gray-500">Your cart is empty.</p>
      )}
      <button
        type="submit"
        className="submit-button mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit Cart
      </button>
    </form>
  );
}

export default PopupCart;
