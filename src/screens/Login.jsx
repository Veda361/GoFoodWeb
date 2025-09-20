import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false); // if you want T&C
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const json = await response.json();
      console.log("Submitted credentials:", credentials);
      console.log("Backend response:", json);
      if (!json.success) {
        setMsg("Enter valid credentials");
        setSuccess(false);
      } else {
        setSuccess(true);
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.getItem("authToken"));
        setMsg("Login successful! Redirecting…");
        setTimeout(() => navigate("/"), 800);
      }
    } catch (err) {
      console.error(err);
      setMsg("Network error — check backend.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Motion variants
  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { boxShadow: "0 0 40px rgba(168,85,247,0.25)" },
  };

  const fieldVariants = {
    initial: { x: -30, opacity: 0 },
    animate: (i) => ({ x: 0, opacity: 1, transition: { delay: 0.2 + i * 0.1 } }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Glow background blob */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(168,85,247,0.35), transparent 60%), radial-gradient(circle at 70% 70%, rgba(236,72,153,0.25), transparent 60%)",
        }}
      />

      {/* Loading progress bar */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="progress"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            className="fixed top-0 left-0 h-1 origin-left bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500"
            style={{ width: "100%" }}
          />
        )}
      </AnimatePresence>

      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        className="relative w-full max-w-md rounded-2xl border border-purple-500/30 bg-gray-950/60 p-8 shadow-2xl backdrop-blur-xl"
      >
        {/* Accent animated ring */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7, rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute -inset-0.5 rounded-2xl"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(168,85,247,0.25), rgba(236,72,153,0.25), rgba(168,85,247,0.25))",
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: 1,
          }}
        />

        <motion.h2
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="relative z-10 mb-6 text-center text-3xl font-bold tracking-wide text-purple-300"
        >
          Welcome Back
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10" aria-live="polite">
          {/* Email */}
          <motion.div custom={0} variants={fieldVariants} initial="initial" animate="animate">
            <label htmlFor="email" className="block font-medium text-purple-300">
              Email
            </label>
            <motion.input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 w-full rounded-lg border-2 border-purple-500 bg-transparent px-4 py-2 text-purple-100 placeholder-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)] outline-none focus:border-pink-500"
              value={credentials.email}
              onChange={onChange}
              required
              whileFocus={{ boxShadow: "0 0 20px rgba(217,70,239,0.9)" }}
            />
          </motion.div>

          {/* Password with eye toggle */}
          <motion.div custom={1} variants={fieldVariants} initial="initial" animate="animate">
            <label htmlFor="password" className="block font-medium text-purple-300">
              Password
            </label>
            <div className="relative">
              <motion.input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="mt-1 w-full rounded-lg border-2 border-purple-500 bg-transparent px-4 py-2 pr-12 text-purple-100 placeholder-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)] outline-none focus:border-pink-500"
                value={credentials.password}
                onChange={onChange}
                required
                whileFocus={{ boxShadow: "0 0 20px rgba(217,70,239,0.9)" }}
              />
              <motion.button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((s) => !s)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-pink-400"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 3l18 18M10.584 10.59A2.999 2.999 0 0012 15a3 3 0 002.828-4.001M9.88 4.24A9.99 9.99 0 0112 4c4.477 0 8.268 2.943 9.542 7a10.05 10.05 0 01-2.142 3.368M6.228 6.23C4.41 7.365 3.114 9.04 2.458 12c1.274 4.057 5.065 7 9.542 7 1.21 0 2.37-.2 3.45-.57" />
                  </svg>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Optional: Terms checkbox (animated) */}
          <motion.div custom={2} variants={fieldVariants} initial="initial" animate="animate" className="flex items-center gap-3">
            <input
              id="accept"
              type="checkbox"
              className="h-4 w-4 cursor-pointer accent-purple-500"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <label htmlFor="accept" className="cursor-pointer text-sm text-purple-200">
              Remember me
            </label>
          </motion.div>

          {/* Message */}
          <AnimatePresence>
            {msg && (
              <motion.p
                key="msg"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className={`text-sm ${success ? "text-emerald-400" : "text-rose-400"}`}
              >
                {msg}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit with success morph */}
          <motion.button
            type="submit"
            whileHover={{ scale: success ? 1 : 1.04 }}
            whileTap={{ scale: success ? 1 : 0.96 }}
            animate={
              success
                ? { backgroundColor: "rgb(16 185 129)", boxShadow: "0 0 20px rgba(16,185,129,0.7)" }
                : {}
            }
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`flex w-full items-center justify-center gap-2 rounded-lg py-2 font-semibold text-white transition
              ${success ? "bg-emerald-500" : "bg-gradient-to-r from-purple-600 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.8),0_0_20px_rgba(217,70,239,0.8)] hover:shadow-[0_0_20px_rgba(217,70,239,1),0_0_30px_rgba(168,85,247,1)]"}
            `}
            disabled={loading}
          >
            {success ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Success
              </>
            ) : loading ? (
              "Signing in..."
            ) : (
              "Submit"
            )}
          </motion.button>

          <Link
            to="/createuser"
            className="block w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 py-2 text-center font-semibold text-white shadow-[0_0_10px_rgba(168,85,247,0.8),0_0_20px_rgba(217,70,239,0.8)] transition hover:shadow-[0_0_20px_rgba(217,70,239,1),0_0_30px_rgba(168,85,247,1)]"
          >
            I'm a new user
          </Link>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
