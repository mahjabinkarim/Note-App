import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import app from "../../Firebase.config";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const auth = getAuth(app);

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!username || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Update user profile with display name
        updateProfile(user, {
          displayName: username,
          photoURL:
            "https://static.vecteezy.com/system/resources/thumbnails/021/907/518/small/asian-blonde-girl-anime-avatar-ai-art-photo.jpg",
        })
          .then(() => {
            // Send email verification
            sendEmailVerification(user)
              .then(() => {
                toast.success(
                  "Registration successful! Verification email sent. Please check your email."
                );
                setTimeout(() => {
                  navigate("/login");
                }, 3000);
              })
              .catch((error) => {
                toast.error("Failed to send verification email.");
              });
          })
          .catch((error) => {
            toast.error("Failed to update profile: " + error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen w-full bg-cover bg-gradient-to-br from-blue-700 to-purple-800 relative"
      style={{
        backgroundImage: `url('/images/loginbg.png')`, // Background image from public folder
      }}
    >
      <section id="back-div">
        <div className="border-8 border-transparent rounded-xl bg-[#4fdcff79] dark:bg-gray-900 shadow-2xl px-20 py-4 m-2">
          <h1 className="text-4xl text-green-400 font-bold text-center cursor-default mb-3 dark:text-zinc-50">
            Register
          </h1>
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Username Input */}
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-green-400 text-lg dark:text-zinc-100"
              >
                Username
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-green-700" />
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border outline-none bg-[#027fa5ad] focus:outline-none focus:ring-2 focus:ring-green-400 p-3 pl-10 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full transition transform hover:scale-105 duration-300"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-green-400 mb-2 text-lg dark:text-gray-300"
              >
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-green-800" />
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border outline-none bg-[#027fa5ad] focus:outline-none focus:ring-2 focus:ring-green-400 p-3 pl-10 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full  transition transform hover:scale-105 duration-300"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-green-400 mb-2 text-lg dark:text-gray-300"
              >
                Password
              </label>
              <div className="relative flex items-center justify-between">
                <FaLock className="absolute left-3 top-3 text-green-800" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border outline-none bg-[#027fa5ad] p-3 pl-10 pr-10 shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full  transition transform hover:scale-105 duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-2 text-gray-500 items-center"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-white" />
                  ) : (
                    <FaEye className="text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-green-400 mb-2 text-lg dark:text-gray-300"
              >
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-green-800" />
                <input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border outline-none bg-[#027fa5ad] focus:outline-none focus:ring-2 focus:ring-green-400 p-3 pl-10 pr-10 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full  transition transform hover:scale-105 duration-300"
                  required
                />
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-3 font-bold mt-4 text-white focus:ring-2 focus:ring-green-400 bg-green-400 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg focus:outline-none"
            >
              REGISTER
            </button>
          </form>
          {/* Login Redirect */}
        <div className="flex flex-col mt-4 text-sm text-center dark:text-gray-300">
          <p className="text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-green-400 transition hover:underline">Log In</a>
          </p>
        </div>
        </div>
      </section>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Register;



