import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/slice/cartSlice";
import Header from "../../components/header";

export default function Cart() {
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  return (
    <section className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="mx-auto max-w-screen-xl">
        <div className="mx-auto max-w-4xl">
          <Header title="🛒 Your Shopping Cart" />

          {cartItems.length === 0 ? (
            <p className="mt-10 text-center text-lg text-gray-500">
              Your cart is empty.
            </p>
          ) : (
            <>
              <ul className="mt-8 space-y-6">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-center gap-4 sm:gap-6 bg-white shadow-sm rounded-xl p-4 border"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1 min-w-[200px]">
                      <h3 className="text-md font-semibold text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </p>

                      <div className="mt-4 flex items-center gap-2 sm:gap-3">
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          className="w-8 h-8 rounded border hover:bg-gray-100 text-lg font-semibold"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          readOnly
                          value={item.quantity}
                          className="w-12 h-8 text-center border rounded text-sm"
                        />
                        <button
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className="w-8 h-8 rounded border hover:bg-gray-100 text-lg font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 hover:text-red-700 transition ml-auto"
                      title="Remove"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-6">
                <p className="text-lg font-medium text-center sm:text-left">
                  Total:{" "}
                  <span className="text-green-600 font-bold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </p>

                <button className="w-full sm:w-auto rounded bg-yellow-800 px-6 py-3 text-white hover:bg-gray-700 transition">
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
