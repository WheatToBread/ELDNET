
import { useState } from "react";
import libraryBg from "../assets/library-bg.jpg";

export default function Login({ onRegister }) {
  const MAX = 50;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("Login will be connected to ASP.NET later.");
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: `url(${libraryBg})` }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white/95 p-8 shadow-2xl backdrop-blur-md">

        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-amber-900 text-3xl text-white">
            📚
          </div>

          <h1 className="text-4xl font-bold text-amber-950">
            ELDNET
          </h1>

          <p className="mt-2 text-gray-600">
            School Book Marketplace
          </p>
        </div>

        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Welcome!
        </h2>

        

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="login-email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              School Email
            </label>

            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={MAX}
              autoComplete="email"
              placeholder="Enter your school email"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-200"
            />

            <p className="mt-1 text-right text-xs text-gray-500">
              {email.length} / {MAX} characters
            </p>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="login-password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={MAX}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-20 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-3 cursor-pointer text-sm font-semibold text-amber-900 hover:text-amber-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <p className="mt-1 text-right text-xs text-gray-500">
              {password.length} / {MAX} characters
            </p>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-amber-900 py-3 font-semibold text-white transition duration-200 hover:bg-amber-800"
          >
            Login
          </button>
        </form>

        {message && (
          <p
            role="status"
            className="mt-4 text-center text-sm text-amber-900"
          >
            {message}
          </p>
        )}

        {/* Register button */}
        <div className="mt-6 text-center">
          <p className="mb-3 text-sm text-gray-600">
            Don't have an account yet?
          </p>

          <button
            type="button"
            onClick={onRegister}
            className="w-full cursor-pointer rounded-lg border-2 border-amber-900 py-3 font-semibold text-amber-900 transition duration-200 hover:bg-amber-50"
          >
            Create an Account
          </button>
        </div>

      </div>
    </div>
  );
}
