import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../Firebase.config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUserData } from "../../slice/userslice";

const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          const { uid, email, displayName, photoURL } = user;
          const userData = { uid, email, displayName, photoURL };
          dispatch(setUserData(userData));
          localStorage.setItem("userData", JSON.stringify(userData));
          toast.success("Login successful!");
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } else {
          toast.warning("Please verify your email before logging in.");
        }
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          toast.error("No user found with this email.");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-gradient-to-br from-green-400 to-blue-500"
      style={{
        backgroundImage: `url('/images/loginbg.png')`, // Background image from public folder
      }}
    >
      <div className="w-full max-w-md p-8 bg-[#4fdcff79] rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-green-400 mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-green-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 bg-[#027fa5ad] text-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-green-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 bg-[#027fa5ad] text-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-green-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-400 text-gray-900 font-bold rounded-lg hover:bg-green-500 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link to="/Register" className="text-green-400 hover:underline">
            Register here
          </Link>
        </p>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Login;

