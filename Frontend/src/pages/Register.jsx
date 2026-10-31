
import { useState } from "react";
import libraryBg from "../assets/library-bg.jpg";

export default function Register({ onBack }) {
  const MAX = 50;

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [message, setMessage] = useState("");

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage(
      "Registration will be connected to ASP.NET later."
    );
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-8"
      style={{ backgroundImage: `url(${libraryBg})` }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Register card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white/95 p-8 shadow-2xl backdrop-blur-md">

        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-amber-900 text-3xl">
            📚
          </div>

          <h1 className="text-3xl font-bold text-amber-950">
            Create Account
          </h1>

          <p className="mt-2 text-gray-600">
            Join the ELDNET School Book Marketplace
          </p>
        </div>

        <form onSubmit={handleRegister}>

          {/* Full Name */}
          <div className="mb-4">
            <label
              htmlFor="register-name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>

            <input
              id="register-name"
              type="text"
              value={form.fullName}
              onChange={(e) =>
                updateField("fullName", e.target.value)
              }
              maxLength={MAX}
              autoComplete="name"
              placeholder="Enter your full name"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-200"
            />

            <p className="mt-1 text-right text-xs text-gray-500">
              {form.fullName.length} / {MAX} characters
            </p>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="register-email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              School Email
            </label>

            <input
              id="register-email"
              type="email"
              value={form.email}
              onChange={(e) =>
                updateField("email", e.target.value)
              }
              maxLength={MAX}
              autoComplete="email"
              placeholder="Enter your school email"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-200"
            />

            <p className="mt-1 text-right text-xs text-gray-500">
              {form.email.length} / {MAX} characters
            </p>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="register-password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) =>
                  updateField("password", e.target.value)
                }
                maxLength={MAX}
                minLength={8}
                autoComplete="new-password"
                placeholder="Create a password"
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
              {form.password.length} / {MAX} characters
            </p>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label
              htmlFor="register-confirm-password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>

            <div className="relative">
              <input
                id="register-confirm-password"
                type={
                  showConfirmPassword ? "text" : "password"
                }
                value={form.confirmPassword}
                onChange={(e) =>
                  updateField("confirmPassword", e.target.value)
                }
                maxLength={MAX}
                minLength={8}
                autoComplete="new-password"
                placeholder="Confirm your password"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-20 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-200"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                aria-pressed={showConfirmPassword}
                className="absolute inset-y-0 right-3 cursor-pointer text-sm font-semibold text-amber-900 hover:text-amber-700"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            <p className="mt-1 text-right text-xs text-gray-500">
              {form.confirmPassword.length} / {MAX} characters
            </p>
          </div>

          {/* Register button */}
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-amber-900 py-3 font-semibold text-white transition duration-200 hover:bg-amber-800"
          >
            Register
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

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?
          </p>

          <button
            type="button"
            onClick={onBack}
            className="mt-2 cursor-pointer font-semibold text-amber-900 hover:underline"
          >
            Back to Login
          </button>
        </div>

      </div>
    </div>
  );
}
