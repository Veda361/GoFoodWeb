import React from "react";

const Footer = ({ onNavigate = (path) => console.log("navigate:", path) }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate mt-16">
      {/* animated glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 left-1/2 h-56 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 opacity-30 blur-3xl animate-[gradient-shift_12s_ease-in-out_infinite]"></div>
        <div className="absolute -bottom-24 right-1/2 h-56 w-[44rem] translate-x-1/2 rounded-full bg-gradient-to-r from-green-300 via-emerald-400 to-cyan-500 opacity-25 blur-3xl animate-[gradient-shift_16s_ease-in-out_infinite_reverse]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-yellow-400 to-orange-500 text-black font-bold shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  className="h-5 w-5"
                  aria-label="DevForge logo"
                >
                  <defs>
                    <linearGradient id="dfg" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#111827" />
                      <stop offset="1" stopColor="#1f2937" />
                    </linearGradient>
                  </defs>
                  {/* spark */}
                  <path d="M49 8l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" fill="white" opacity=".9" />
                  {/* hammer handle */}
                  <rect x="26" y="18" width="20" height="4" rx="2" fill="currentColor" />
                  {/* hammer head */}
                  <rect x="38" y="14" width="10" height="12" rx="2" fill="currentColor" />
                  {/* anvil */}
                  <path d="M10 40c8 0 12-6 16-6h10c2 0 4 2 4 4s-2 4-4 4h-6l4 6h10c2 0 4 2 4 4v2H10v-2c0-2 2-4 4-4h10l-4-6c-6 0-10 4-20 2v-4c2 0 4 0 6 0z" fill="url(#dfg)" />
                </svg>
              </span>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                DevForge
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Forging delightful food experiences with modern web craft.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Explore</h4>
            <div className="mt-3 grid gap-2 text-sm">
              {[
                { label: "Menu", to: "/menu" },
                { label: "Offers", to: "/offers" },
                { label: "Locations", to: "/locations" },
                { label: "Contact", to: "/contact" },
              ].map((item) => (
                <button
                  key={item.to}
                  type="button"
                  onClick={() => onNavigate(item.to)}
                  className="w-fit text-left text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Support</h4>
            <div className="mt-3 grid gap-2 text-sm">
              {[
                { label: "Help Center", to: "/help" },
                { label: "Delivery & Shipping", to: "/shipping" },
                { label: "Refunds", to: "/refunds" },
                { label: "Privacy", to: "/privacy" },
              ].map((item) => (
                <button
                  key={item.to}
                  type="button"
                  onClick={() => onNavigate(item.to)}
                  className="w-fit text-left text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Get updates</h4>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Weekly recipes and exclusive coupons.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = new FormData(e.currentTarget).get("email");
                console.log("subscribe:", email);
              }}
              className="mt-4 flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-yellow-400 dark:border-gray-700 dark:bg-gray-900"
            >
              <input
                name="email"
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-2 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none dark:text-white"
                required
                aria-label="Email address"
              />
              <button
                className="group relative m-1 inline-flex items-center gap-2 rounded-lg bg-gradient-to-tr from-yellow-400 to-orange-500 px-4 py-2 text-black font-semibold transition-all hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                type="submit"
              >
                <span className="transition-transform group-hover:-translate-y-0.5">
                  Subscribe
                </span>
                <span className="h-2 w-2 rounded-full bg-black/30 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1"></span>
              </button>
            </form>

            {/* Social as buttons */}
            <div className="mt-4 flex items-center gap-3">
              {[
                { label: "X", onClick: () => onNavigate("/x") },
                { label: "IG", onClick: () => onNavigate("/instagram") },
                { label: "YT", onClick: () => onNavigate("/youtube") },
              ].map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={s.onClick}
                  aria-label={s.label}
                  className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-700 transition-all hover:bg-gradient-to-tr hover:from-yellow-300 hover:to-orange-500 hover:text-black dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
                >
                  <span className="text-xs font-bold">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 dark:border-gray-800 md:flex-row">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            © {year} DevForge. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            {/* reuse the same inline SVG as a tiny mark if desired */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              className="h-4 w-4 opacity-80"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="dfg2" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#111827" />
                  <stop offset="1" stopColor="#1f2937" />
                </linearGradient>
              </defs>
              <path d="M49 8l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" fill="white" opacity=".9" />
              <rect x="26" y="18" width="20" height="4" rx="2" fill="currentColor" />
              <rect x="38" y="14" width="10" height="12" rx="2" fill="currentColor" />
              <path d="M10 40c8 0 12-6 16-6h10c2 0 4 2 4 4s-2 4-4 4h-6l4 6h10c2 0 4 2 4 4v2H10v-2c0-2 2-4 4-4h10l-4-6c-6 0-10 4-20 2v-4c2 0 4 0 6 0z" fill="url(#dfg2)" />
            </svg>
            <span>Crafted with ❤️ by DevForge</span>
            <button
              type="button"
              onClick={() => onNavigate("/about")}
              className="ml-2 rounded px-1.5 py-0.5 text-[11px] font-semibold text-gray-800 dark:text-white hover:text-black dark:hover:text-yellow-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
              aria-label="About DevForge"
            >
              About
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
