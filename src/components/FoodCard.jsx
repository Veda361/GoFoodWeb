import React from "react";

const FoodCard = ({ item }) => {
  const handleAddToCart = () => {

  }
  return (
    <div className="overflow-hidden rounded-2xl border border-yellow-400/30 bg-gradient-to-br from-[#1c2541] via-[#3a506b] to-[#5bc0be] text-white shadow-lg transition hover:-translate-y-1 hover:scale-[1.02] hover:shadow-yellow-400/30">
      <div className="relative h-44 w-full bg-[#0b132b]">
        <img
          src={item.img}
          alt={item.name}
          className="h-full w-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";
          }}
        />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h3 className="line-clamp-1 text-lg font-bold text-yellow-300">{item.name}</h3>
        <p className="line-clamp-2 text-sm text-gray-200">{item.description || "Delicious food item."}</p>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-bold text-yellow-400">${item.price || "8.99"}</p>
          <p className="text-sm text-gray-100">⭐ {item.rating} ({item.reviews} reviews)</p>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <select className="rounded-md border border-yellow-300 bg-[#0b132b] px-2 py-1 text-sm text-white focus:ring-2 focus:ring-yellow-400">
            <option>1</option><option>2</option><option>3</option>
          </select>
          <button
           className="flex-1 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 py-2 text-sm font-semibold text-black transition hover:from-yellow-300 hover:to-yellow-400"
           onClick={handleAddToCart}>
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
