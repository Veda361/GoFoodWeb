import React, { useEffect, useMemo, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer.jsx";


const currency = (v) => `$${Number(v).toFixed(2)}`;

export default function PersonalizedHome() {
  const dispatch = useDispatchCart();
  const cart = useCart();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load user snapshot
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  // Fetch all orders for header stats and last order summary
  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (res.ok && json.success && Array.isArray(json.orders)) {
          setOrders(json.orders);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const lastOrder = orders[0] || null;
  const ordersCount = orders.length;
  const ordersTotal = useMemo(
    () => orders.reduce((s, o) => s + Number(o.subtotal || 0), 0),
    [orders]
  );
  const cartCount = cart.reduce((s, it) => s + (Number(it.qty) || 1), 0);
  const cartTotal = cart.reduce(
    (s, it) => s + (Number(it.qty) || 1) * (Number(it.price) || 0),
    0
  );

  const handleReorder = () => {
    if (!lastOrder) return;
    for (const it of lastOrder.items) {
      dispatch({
        type: "ADD",
        item: {
          id: it.id,
          name: it.name,
          img: it.img,
          price: Number(it.price) || 0,
          qty: Number(it.qty) || 1,
        },
      });
    }
    alert("Items added from your last order!");
  };

  return (
    <div className="mx-auto mt-4 max-w-6xl px-4">
      {/* Header: user + stats */}
      <div className="mb-4 rounded-2xl border border-yellow-400/20 bg-gradient-to-r from-[#1f2937] to-[#0b1125] p-5 shadow-[0_0_10px_rgba(255,215,0,0.06)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <h2 className="truncate text-2xl font-bold text-yellow-300">
              {user ? `Welcome, ${user.name}!` : "Welcome to GoFood"}
            </h2>
            <p className="text-sm text-gray-300">
              {user?.location ? `Delivering to ${user.location}` : "Sign in to personalize your menu"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-lg border border-white/10 bg-[#0f172a] px-3 py-2 text-center">
              <div className="text-xs text-gray-300">Orders</div>
              <div className="text-lg font-semibold text-yellow-300">{ordersCount}</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#0f172a] px-3 py-2 text-center">
              <div className="text-xs text-gray-300">Total Spent</div>
              <div className="text-lg font-semibold text-yellow-300">{currency(ordersTotal)}</div>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#0f172a] px-3 py-2 text-center">
              <div className="text-xs text-gray-300">Cart</div>
              <div className="text-lg font-semibold text-yellow-300">
                {cartCount} • {currency(cartTotal)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Last order */}
      {loading ? (
        <div className="mb-6 rounded-xl border border-white/10 bg-[#111827] p-4 text-gray-300">
          Loading your recent order…
        </div>
      ) : lastOrder ? (
        <div className="mb-6 rounded-2xl border border-white/10 bg-[#0f172a] p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="font-semibold text-yellow-300">Last Order</div>
            <div className="text-sm text-gray-300">
              {new Date(lastOrder.placedAt || lastOrder.createdAt).toLocaleString()} · {lastOrder.status}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {lastOrder.items.slice(0, 4).map((it, idx) => (
              <div
                key={`${lastOrder._id}-${it.id}-${idx}`}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#111827] p-3"
              >
                <img
                  src={it.img}
                  alt={it.name}
                  className="h-10 w-10 rounded object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=120&q=80";
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-yellow-200">{it.name}</p>
                  <p className="text-xs text-gray-300">
                    {it.qty} × ${Number(it.price).toFixed(2)}
                  </p>
                </div>
                <div className="text-sm font-semibold text-yellow-300">
                  {currency((Number(it.price) || 0) * (Number(it.qty) || 1))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm text-gray-300">
              {lastOrder.items.reduce((s, it) => s + (Number(it.qty) || 1), 0)} items
            </div>
            <div className="flex gap-3">
              <button
                className="rounded-lg border border-yellow-400/40 px-4 py-2 text-yellow-300 hover:bg-yellow-400/10"
                onClick={handleReorder}
              >
                Re‑order
              </button>
              <div className="text-lg font-bold text-yellow-400">
                {currency(lastOrder.subtotal)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6 rounded-xl border border-white/10 bg-[#111827] p-4 text-gray-300">
          No previous orders found — start by adding items to the cart.
        </div>
      )}

      {/* Current cart snapshot */}
      {cart.length > 0 && (
        <div className="mb-6 rounded-2xl border border-yellow-400/20 bg-[#0b132b] p-5">
          <div className="mb-2 flex items-center justify-between">
            <div className="font-semibold text-yellow-300">In Your Cart</div>
            <div className="text-sm text-gray-300">
              {cartCount} items • {currency(cartTotal)}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {cart.slice(0, 4).map((it) => (
              <div key={it.id} className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#111827] p-3">
                <img
                  src={it.img}
                  alt={it.name}
                  className="h-10 w-10 rounded object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=120&q=80";
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-yellow-200">{it.name}</p>
                  <p className="text-xs text-gray-300">
                    {it.qty} × ${Number(it.price).toFixed(2)}
                  </p>
                </div>
                <div className="text-sm font-semibold text-yellow-300">
                  {currency((Number(it.price) || 0) * (Number(it.qty) || 1))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
