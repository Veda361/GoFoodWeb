import React, { useMemo, useState } from "react";
import FoodCard from "../components/FoodCard";

const Menu = () => {
  // Mock names representing each card’s cuisine; align with actual data source if available
  const allItems = [
    { id: 1, name: "Pizza Margherita" },
    { id: 2, name: "Tacos" },
    { id: 3, name: "Biryani" },
    { id: 4, name: "Pasta Alfredo" },
    // Add more if rendering more cards
  ];

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems;
    return allItems.filter((it) => it.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="relative min-h-screen w-full">
      {/* Background with gradient overlay */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, rgba(17,24,39,0.65), rgba(147,51,234,0.45)), url('https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2000&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

      <div className="relative z-10 p-6">
        {/* Sticky search bar */}
        <div className="sticky top-0 z-20 -mx-6 px-6 pt-2 pb-4 backdrop-blur bg-white/10">
          <div className="max-w-4xl mx-auto">
            <label htmlFor="menu-search" className="sr-only">Search food</label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-white/80">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm8.32 12.9 3.39 3.39-1.41 1.41-3.39-3.39A8 8 0 1 1 10 2a8 8 0 0 1 8.32 14.9Z" />
                </svg>
              </span>
              <input
                id="menu-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search food (e.g., pizza, biryani, tacos)"
                className="block w-full rounded-2xl border border-white/20 bg-white/15 text-white placeholder-white/70 pl-10 pr-28 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-yellow-400 px-4 py-2 text-black font-semibold hover:bg-yellow-300 active:scale-95"
              >
                Clear
              </button>
            </div>
            <p className="mt-2 text-sm text-white/80">
              {query ? `${filtered.length} results` : "Type to filter cuisines"}
            </p>
          </div>
        </div>

        {/* Grid filtered by search */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center text-white/90">
              No matches. Try another keyword.
            </div>
          ) : (
            filtered.map((it) => (
              <FoodCard key={it.id} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Menu;
