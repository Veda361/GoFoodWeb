import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer.jsx";

const currency = (v) => `$${Number(v).toFixed(2)}`;

const MyCart = () => {
  const cart = useCart();
  const dispatch = useDispatchCart();

  const handleInc = (id, qty) =>
    dispatch({ type: "UPDATE_QTY", id, qty: Number(qty) + 1 });

  const handleDec = (id, qty) => {
    const next = Number(qty) - 1;
    if (next <= 0) return dispatch({ type: "REMOVE", id });
    dispatch({ type: "UPDATE_QTY", id, qty: next });
  };

  const handleRemove = (id) => dispatch({ type: "REMOVE", id });
  const handleClear = () => dispatch({ type: "CLEAR" });

  const subtotal = cart.reduce(
    (sum, it) => sum + (Number(it.price) || 0) * (Number(it.qty) || 1),
    0
  );

  const placeOrder = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return alert("Please login to place order");
    if (cart.length === 0) return alert("Cart is empty");

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          address: "", // can be filled from a form later
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        return alert(json?.error || "Failed to place order");
      }
      alert("Order placed!");
      dispatch({ type: "CLEAR" });
    } catch (e) {
      console.error(e);
      alert("Network error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1125] text-white">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">🛒 My Cart</h1>

        {cart.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-[#111827] p-8 text-center text-gray-300">
            Cart is empty. Add some delicious items from the menu!
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center gap-4 rounded-xl border border-yellow-400/20 bg-[#0f172a] p-4 shadow-[0_0_10px_rgba(255,215,0,0.05)]"
                >
                  <img
                    src={it.img}
                    alt={it.name}
                    className="h-16 w-16 flex-none rounded-lg object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80";
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-lg font-semibold text-yellow-300">
                      {it.name}
                    </p>
                    <p className="text-sm text-gray-300">
                      {currency(it.price)} each
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="rounded-md bg-white/10 px-3 py-1 text-lg hover:bg-white/20"
                      onClick={() => handleDec(it.id, it.qty)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{it.qty}</span>
                    <button
                      className="rounded-md bg-white/10 px-3 py-1 text-lg hover:bg-white/20"
                      onClick={() => handleInc(it.id, it.qty)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className="w-24 text-right font-semibold text-yellow-400">
                    {currency((Number(it.price) || 0) * (Number(it.qty) || 1))}
                  </div>

                  <button
                    className="rounded-md bg-red-500/80 px-3 py-1 text-sm font-semibold text-white hover:bg-red-500"
                    onClick={() => handleRemove(it.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-[#111827] p-4">
              <div className="flex items-center justify-between">
                <p className="text-lg text-gray-200">
                  Subtotal ({cart.reduce((s, it) => s + (Number(it.qty) || 1), 0)} items)
                </p>
                <p className="text-2xl font-bold text-yellow-400">
                  {currency(subtotal)}
                </p>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  className="rounded-lg border border-yellow-400/40 px-4 py-2 text-yellow-300 hover:bg-yellow-400/10"
                  onClick={handleClear}
                >
                  Clear Cart
                </button>
                <button
                  className="rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 px-5 py-2 font-semibold text-black hover:from-yellow-300 hover:to-yellow-400"
                  onClick={placeOrder}
                >
                  Place Order
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyCart;
