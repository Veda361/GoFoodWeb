import React, { useEffect, useState } from "react";

const currency = (v) => `$${Number(v).toFixed(2)}`;

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
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
      if (res.ok && json.success) setOrders(json.orders || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1125] text-white">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">📦 My Orders</h1>
        {loading ? (
          <div className="rounded-xl border border-white/10 bg-[#111827] p-8 text-center text-gray-300">
            Loading...
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-[#111827] p-8 text-center text-gray-300">
            No orders yet.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((o) => (
              <div key={o._id} className="rounded-xl border border-yellow-400/20 bg-[#0f172a] p-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-yellow-400 px-3 py-1 text-sm font-bold text-black">
                      {o.status}
                    </span>
                    <span className="text-sm text-gray-300">
                      Placed: {new Date(o.placedAt || o.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xl font-bold text-yellow-400">{currency(o.subtotal)}</div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(o.items || []).map((it, idx) => (
                    <div
                      key={`${o._id}-${it.id}-${idx}`}
                      className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#111827] p-3"
                    >
                      <img
                        src={it.img}
                        alt={it.name}
                        className="h-12 w-12 rounded object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=200&q=80";
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-yellow-300">{it.name}</p>
                        <p className="text-sm text-gray-300">
                          {it.qty} × {currency(it.price)}
                        </p>
                      </div>
                      <div className="w-20 text-right font-semibold">
                        {currency((Number(it.price) || 0) * (Number(it.qty) || 1))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
