import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const handleNavigate = () =>{
    navigate("/login");
  }
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
      // Optionally clear form
      // setCredentials({ name: "", email: "", password: "", location: "" });
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
      <style>{`
.checkbox-wrapper-12 { display: flex; align-items: center; }
.checkbox-wrapper-12 * { box-sizing: border-box; }
.checkbox-wrapper-12 .cbx { width: 24px; height: 24px; position: relative; }
.checkbox-wrapper-12 .cbx input {
  position: absolute; top: 0; left: 0; width: 24px; height: 24px;
  border: 2px solid #bfbfc0; border-radius: 50%; background: transparent;
  -webkit-appearance: none; -moz-appearance: none; appearance: none;
  -webkit-tap-highlight-color: transparent; cursor: pointer; margin: 0;
}
.checkbox-wrapper-12 .cbx input:focus { outline: 0; }
.checkbox-wrapper-12 .cbx label {
  width: 24px; height: 24px; background: none; border-radius: 50%;
  position: absolute; top: 0; left: 0; transform: translate3d(0, 0, 0); pointer-events: none;
}
.checkbox-wrapper-12 .cbx svg {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; display: block;
  width: 24px; height: 24px; z-index: 1; pointer-events: none;
}
.checkbox-wrapper-12 .cbx svg path {
  stroke: #fff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round;
  stroke-dasharray: 19; stroke-dashoffset: 19; transition: stroke-dashoffset 0.3s ease; transition-delay: 0.2s;
}
.checkbox-wrapper-12 .cbx input:checked + label { animation: splash-12 0.6s ease forwards; }
.checkbox-wrapper-12 .cbx input:checked + label + svg path { stroke-dashoffset: 0; }
@keyframes splash-12 {
  40% {
    background: #866efb;
    box-shadow:
      0 -18px 0 -8px #866efb,
      16px -8px 0 -8px #866efb,
      16px 8px 0 -8px #866efb,
      0 18px 0 -8px #866efb,
      -16px 8px 0 -8px #866efb,
      -16px -8px 0 -8px #866efb;
  }
  100% {
    background: #866efb;
    box-shadow:
      0 -36px 0 -10px transparent,
      32px -16px 0 -10px transparent,
      32px 16px 0 -10px transparent,
      0 36px 0 -10px transparent,
      -32px 16px 0 -10px transparent,
      -32px -16px 0 -10px transparent;
  }
}
      `}</style>

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

            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3 pt-2"
            >
              <div className="checkbox-wrapper-12">
                <div className="cbx">
                  <input
                    id="accept"
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    aria-label="Accept terms and conditions"
                  />
                  <label htmlFor="accept"></label>
                  <svg width="24px" height="24px" viewBox="0 0 24 24">
                    <path d="M6 12l4 4 8-8"></path>
                  </svg>
                </div>
              </div>
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
              onClick={handleNavigate}
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
