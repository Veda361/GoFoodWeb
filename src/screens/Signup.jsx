import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accepted) return alert("Please accept the Terms & Conditions");

    try {
      setSubmitting(true);
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const json = await response.json();
      console.log("Submitted credentials:", credentials);
      console.log("Backend response:", json);

      if (!response.ok || !json.success) {
        const msg =
          json?.error ??
          (json?.errors?.map((e) => `${e.param}: ${e.msg}`).join(", ") || "Signup failed");
        return alert(msg);
      }

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Network error — is the backend running on :5000?");
    } finally {
      setSubmitting(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-gray-950/70 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-purple-500/30"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center text-purple-400 mb-6 tracking-wide"
          >
            Create an Account
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <label className="block text-purple-300 font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 mt-1 rounded-lg border-2 border-purple-500 text-purple-100 bg-transparent placeholder-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)] focus:shadow-[0_0_20px_rgba(217,70,239,0.9)] focus:border-pink-500 transition outline-none"
                name="name"
                value={credentials.name}
                onChange={onChange}
                required
              />
            </motion.div>

            <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              <label className="block text-purple-300 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-1 rounded-lg border-2 border-purple-500 text-purple-100 bg-transparent placeholder-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)] focus:shadow-[0_0_20px_rgba(217,70,239,0.9)] focus:border-pink-500 transition outline-none"
                name="email"
                value={credentials.email}
                onChange={onChange}
                required
              />
            </motion.div>

            <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              <label className="block text-purple-300 font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-1 rounded-lg border-2 border-purple-500 text-purple-100 bg-transparent placeholder-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)] focus:shadow-[0_0_20px_rgba(217,70,239,0.9)] focus:border-pink-500 transition outline-none"
                name="password"
                value={credentials.password}
                onChange={onChange}
                required
              />
            </motion.div>

            <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
              <label className="block text-purple-300 font-medium">Location</label>
              <input
                type="text"
                placeholder="Enter your location"
                className="w-full px-4 py-2 mt-1 rounded-lg border-2 border-purple-500 text-purple-100 bg-transparent placeholder-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.6)] focus:shadow-[0_0_20px_rgba(217,70,239,0.9)] focus:border-pink-500 transition outline-none"
                name="location"
                value={credentials.location}
                onChange={onChange}
                required
              />
            </motion.div>

            <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="flex items-center gap-3 pt-2">
              <input
                id="accept"
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                aria-label="Accept terms and conditions"
                className="h-4 w-4 cursor-pointer accent-purple-500"
              />
              <label htmlFor="accept" className="cursor-pointer select-none text-sm text-purple-200">
                Accept Terms & Conditions
              </label>
            </motion.div>

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 py-2 font-semibold text-white shadow-[0_0_10px_rgba(168,85,247,0.8),0_0_20px_rgba(217,70,239,0.8)] transition hover:shadow-[0_0_20px_rgba(217,70,239,1),0_0_30px_rgba(168,85,247,1)] disabled:opacity-60"
            >
              Sign Up
            </motion.button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-purple-400 hover:underline">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Signup;
