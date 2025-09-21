import React, { useEffect, useMemo, useState } from "react";
import FoodCard from "../components/FoodCard";

const Menu = ({ cartIconRef }) => {
  const [rawItems, setRawItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("selectedCategory") || "All"
  );

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 250);
    return () => clearTimeout(id);
  }, [query]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/foodData", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();

        const docs = data?.[0] || [];
        const flattened = docs.flatMap((doc) =>
          (doc.Items || []).map((it, idx) => {
            const base = it.Img || it.img || "";
            const img = base
              ? `${base}?auto=format&fit=crop&w=800&q=80`
              : "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";

            return {
              id: it._id || `${doc._id}-${idx}`,
              name: it.Name || it.name || "",
              description: it.Description || it.description || "",
              img,
              price: it.Price ?? it.price ?? "",
              category: doc.CategoryName || "",
              rating: it.rating ?? 4.8,
              reviews: it.reviews ?? 120,
            };
          })
        );

        setRawItems(flattened);

        const uniqueCats = Array.from(
          new Set(docs.map((d) => d.CategoryName).filter(Boolean))
        ).sort((a, b) => a.localeCompare(b));

        setCategories(["All", ...uniqueCats]);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory]);

  const filteredItems = useMemo(() => {
    const q = debounced.trim().toLowerCase();

    let base =
      selectedCategory === "All"
        ? rawItems
        : rawItems.filter((it) => it.category === selectedCategory);

    return base.filter((item) => {
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [debounced, rawItems, selectedCategory]);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const it of filteredItems) {
      const k = it.category || "Uncategorized";
      if (!map.has(k)) map.set(k, []);
      map.get(k).push(it);
    }
    return Array.from(map.entries());
  }, [filteredItems]);

  return (
    <div className="min-h-screen bg-[#0b1125] text-white">
      <div className="sticky top-0 z-20 border-b border-gray-700 bg-[#0b132b]/95 px-6 py-4 backdrop-blur">
        <h1 className="mb-3 text-center text-3xl font-bold">🍴 Our Menu</h1>

        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 sm:flex-row">
          <div className="relative w-full flex-1">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-white/70">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm8.32 12.9 3.39 3.39-1.41 1.41-3.39-3.39A8 8 0 1 1 10 2a8 8 0 0 1 8.32 14.9Z" />
              </svg>
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search food "
              className="block w-full rounded-2xl border border-white/20 bg-[#1c2541] px-10 py-3 text-white placeholder-white/60 outline-none ring-yellow-400/0 transition focus:ring-2"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20"
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="cursor-pointer rounded-xl border border-yellow-400/50 bg-[#1c2541]/60 px-4 py-3 text-white shadow-[0_0_2px_rgba(255,215,0,0.4)] backdrop-blur-md transition duration-300 hover:border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-[#1c2541]">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {grouped.map(([catName, items]) => (
          <div key={catName}>
            {/* <h2 className="mb-6 text-2xl font-bold text-yellow-400">{catName}</h2> */}
            <h2 className="mb-6 text-2xl font-bold animate-rgb">{catName}</h2>


            <div
              className="
                grid w-full gap-6
                [grid-template-columns:repeat(auto-fill,minmax(240px,1fr))]
                sm:[grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]
                md:[grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]
              "
            >
              {items.map((item) => (
                <div key={item.id} className="min-w-[240px]">
                   <FoodCard item={item} cartIconRef={cartIconRef} />
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <p className="mt-12 text-center text-lg text-gray-400">No food matches the filters. 🍽️</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
