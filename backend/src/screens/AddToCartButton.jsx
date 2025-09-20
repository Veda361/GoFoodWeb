import { useRef } from "react";

function AddToCartButton({ onAdd }) {
  const btnRef = useRef(null);

  const handleClick = () => {
    const el = btnRef.current;
    if (!el) return;
    el.classList.add("fly");
    setTimeout(() => {
      el.classList.remove("fly");
      el.classList.add("added");
      onAdd?.();
      setTimeout(() => el.classList.remove("added"), 1200);
    }, 500);
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      className="group relative w-full mt-5 overflow-hidden rounded-xl bg-yellow-400 text-black font-semibold py-3 px-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 active:scale-[0.98]"
    >
      <span className="inline-flex items-center gap-2 transition-transform duration-300 group-[.added]:translate-y-[-150%]">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 4h-2l-1 2v2h2l3.6 7.59-1.35 2.41A1.99 1.99 0 0 0 10 20h10v-2H10l1.1-2h7.45a2 2 0 0 0 1.79-1.11l3.24-6.49A1 1 0 0 0 23.7 6H6.21l-.94-2H1V2h4a1 1 0 0 1 .92.62L7 4Z" />
        </svg>
        Add to Cart
      </span>

      <span className="pointer-events-none absolute inset-0 flex translate-y-[150%] items-center justify-center gap-2 text-emerald-900 transition-transform duration-300 group-[.added]:translate-y-0">
        <svg className="h-5 w-5 text-emerald-700" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
        </svg>
        Added!
      </span>

      <svg
        className="pointer-events-none absolute -right-8 top-1/2 h-6 w-6 -translate-y-1/2 text-black opacity-0 transition-all duration-500 group-[.fly]:right-3 group-[.fly]:opacity-100"
        viewBox="0 0 24 24" fill="currentColor"
      >
        <path d="M7 4h-2l-1 2v2h2l3.6 7.59-1.35 2.41A1.99 1.99 0 0 0 10 20h10v-2H10l1.1-2h7.45a2 2 0 0 0 1.79-1.11l3.24-6.49A1 1 0 0 0 23.7 6H6.21l-.94-2H1V2h4a1 1 0 0 1 .92.62L7 4Z" />
      </svg>
    </button>
  );
}

export default AddToCartButton;