import React, { useState } from "react";
import { useDispatchCart } from "./ContextReducer.jsx";

const FoodCard = ({ item, cartIconRef }) => {
  const dispatch = useDispatchCart();
  const [qty, setQty] = useState(1);

  const handleAddToCart = (e) => {
    // 1) Update cart state
    dispatch({
      type: "ADD",
      item: {
        id: item.id,
        name: item.name,
        price: Number(item.price) || 8.99,
        img: item.img,
        qty: Number(qty),
      },
    });

    // 2) Optional animation
    if (!cartIconRef?.current) return; // no target => skip animation
    const root = e.currentTarget?.closest(".food-card");
    if (!root) return;
    const img = root.querySelector("img");
    if (!img) return;

    const imgClone = img.cloneNode(true);
    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIconRef.current.getBoundingClientRect();

    Object.assign(imgClone.style, {
      position: "fixed",
      top: `${imgRect.top}px`,
      left: `${imgRect.left}px`,
      width: `${imgRect.width}px`,
      height: `${imgRect.height}px`,
      borderRadius: "12px",
      zIndex: 9999,
      transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 0 25px rgba(255,215,0,0.8)",
    });

    document.body.appendChild(imgClone);

    requestAnimationFrame(() => {
      Object.assign(imgClone.style, {
        top: `${cartRect.top + cartRect.height / 2 - 20}px`,
        left: `${cartRect.left + cartRect.width / 2 - 20}px`,
        width: "40px",
        height: "40px",
        opacity: "0.6",
        borderRadius: "50%",
      });
    });

    imgClone.addEventListener(
      "transitionend",
      () => {
        imgClone.remove();
      },
      { once: true }
    );
  };

  return (
    <div className="food-card overflow-hidden rounded-2xl border border-yellow-400/30 bg-gradient-to-br from-[#1c2541] via-[#3a506b] to-[#5bc0be] text-white shadow-lg transition hover:-translate-y-1 hover:scale-[1.02] hover:shadow-yellow-400/30">
      <div className="relative h-44 w-full bg-[#0b132b]">
        <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col gap-2 p-4 ">
        <h3 className="line-clamp-1 text-lg font-bold text-yellow-300">{item.name}</h3>
        <p className="line-clamp-2 text-sm text-gray-200">{item.description || "Delicious food item."}</p>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-lg font-bold text-yellow-400">${item.price || "8.99"}</p>
          <p className="text-sm text-gray-100">⭐ {item.rating} ({item.reviews} reviews)</p>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <select
            className="rounded-md border border-yellow-300 bg-[#0b132b] px-2 py-1 text-sm text-white focus:ring-2 focus:ring-yellow-400"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
          <button
            className="flex-1 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 py-2 text-sm font-semibold text-black transition hover:scale-105 hover:shadow-[0_0_15px_rgba(255,215,0,0.8)]"
            onClick={handleAddToCart}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
