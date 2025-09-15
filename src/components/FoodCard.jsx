import React, { useMemo, useState } from "react";

const FoodCard = () => {
  // Local dataset: name, price, rating, reviews, and image
  const items = [
    {
      name: "Pizza Margherita",
      price: 8.99,
      rating: 4.8,
      reviews: 120,
      img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1170&auto=format&fit=crop",
    },
    {
      name: "Tacos",
      price: 6.5,
      rating: 4.6,
      reviews: 89,
      img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1000&auto=format&fit=crop&q=80",
    },
    {
      name: "Italian Pasta",
      price: 9.25,
      rating: 4.7,
      reviews: 140,
      img: "https://images.unsplash.com/photo-1522666257812-173fdc2d11fe?w=1200&auto=format&fit=crop&q=80",
    },
    {
      name: "Mexican Bowl",
      price: 7.75,
      rating: 4.5,
      reviews: 64,
      img: "https://images.unsplash.com/photo-1695088220737-9a6d901db8f1?w=1200&auto=format&fit=crop&q=80",
    },
    {
      name: "Indian Thali",
      price: 5.99,
      rating: 4.4,
      reviews: 210,
      img: "https://images.unsplash.com/photo-1728910156510-77488f19b152?w=1200&auto=format&fit=crop&q=80",
    },
    {
      name: "French Cuisine",
      price: 12.0,
      rating: 4.9,
      reviews: 45,
      img: "https://images.unsplash.com/photo-1715249792962-5359b4b17f21?w=1200&auto=format&fit=crop&q=80",
    },
  ];

  const [search, setSearch] = useState("");

  // Filter items by search text (case-insensitive)
  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return items;
    return items.filter((it) => it.name.toLowerCase().includes(s));
  }, [items, search]);

  // Choose a random item from the filtered list (fallback to first if empty)
  const chosen = useMemo(() => {
    if (filtered.length === 0) return null;
    const idx = Math.floor(Math.random() * filtered.length);
    return filtered[idx];
  }, [filtered]);

  // Background image + gradient overlay container
  return (
    <div className="min-h-screen w-full bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, rgba(253,224,71,0.25), rgba(147,51,234,0.25)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop')",
      }}
    >
      {/* subtle dark overlay to boost contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/20 to-black/30 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-md p-6">
        {/* Search input */}
        {/* <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search food (e.g., pizza, tacos, indian)"
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70 backdrop-blur px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div> */}

        {/* Card */}
        <div className="max-w-sm bg-white/90 dark:bg-gray-900/80 backdrop-blur rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Image */}
          <div className="w-full h-48">
            <img
              src={chosen?.img || "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1170&auto=format&fit=crop"}
              alt={chosen?.name || "Food Item"}
              className="h-48 w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-wide">
              {chosen?.name || "No results"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              {chosen
                ? "A delicious dish crafted with fresh ingredients and authentic flavors."
                : "Try a different keyword or clear the search to see all cuisines."}
            </p>

            {/* Price + Rating */}
            {chosen && (
              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-semibold text-yellow-500">
                  ${chosen.price.toFixed(2)}
                </span>
                <span className="text-yellow-400 flex items-center text-sm">
                  ⭐ {chosen.rating.toFixed(1)} ({chosen.reviews} reviews)
                </span>
              </div>
            )}

            {/* Controls */}
            <div>
              <select className="w-full mt-5 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400">
                {[1, 2, 3, 4, 5, 6, 7].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <button
                className="group relative w-full mt-5 overflow-hidden rounded-xl bg-yellow-400 text-black font-semibold py-3 px-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 active:scale-[0.98]"
                disabled={!chosen}
              >
                <span className="inline-flex items-center gap-2 transition-transform duration-300 group-[.added]:translate-y-[-150%]">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 4h-2l-1 2v2h2l3.6 7.59-1.35 2.41A1.99 1.99 0 0 0 10 20h10v-2H10l1.1-2h7.45a2 2 0 0 0 1.79-1.11l3.24-6.49A1 1 0 0 0 23.7 6H6.21l-.94-2H1V2h4a1 1 0 0 1 .92.62L7 4Z" />
                  </svg>
                  Add to Cart
                </span>

                {/* success state */}
                <span className="pointer-events-none absolute inset-0 flex translate-y-[150%] items-center justify-center gap-2 text-emerald-900 transition-transform duration-300 group-[.added]:translate-y-0">
                  <svg className="h-5 w-5 text-emerald-700" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                  </svg>
                  Added!
                </span>

                {/* flying cart */}
                <svg
                  className="pointer-events-none absolute -right-8 top-1/2 h-6 w-6 -translate-y-1/2 text-black opacity-0 transition-all duration-500 group-[.fly]:right-3 group-[.fly]:opacity-100"
                  viewBox="0 0 24 24" fill="currentColor"
                >
                  <path d="M7 4h-2l-1 2v2h2l3.6 7.59-1.35 2.41A1.99 1.99 0 0 0 10 20h10v-2H10l1.1-2h7.45a2 2 0 0 0 1.79-1.11l3.24-6.49A1 1 0 0 0 23.7 6H6.21l-.94-2H1V2h4a1 1 0 0 1 .92.62L7 4Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Small helper text */}
        <p className="mt-3 text-xs text-white/80">
          Tip: Try keywords like “pizza”, “tacos”, “indian”, “french” to filter cuisines.
        </p>
      </div>
    </div>
  );
};

export default FoodCard;
