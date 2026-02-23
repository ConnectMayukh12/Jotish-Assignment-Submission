import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BRAND, PAGE_GRADIENT } from "../constants";
import { isAuthenticated, signIn } from "../utils/auth";

const VALID_USERNAME = import.meta.env.VITE_VALID_USERNAME as string;
const VALID_PASSWORD = import.meta.env.VITE_VALID_PASSWORD as string;

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = `Sign In – ${BRAND.name}`;
    if (isAuthenticated()) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        signIn();
        navigate("/dashboard");
      } else {
        setError("Invalid username or password. Please try again.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left: form */}
      <div
        className={`flex w-full flex-col justify-center ${PAGE_GRADIENT} px-6 py-10 sm:px-10 md:w-1/2 md:px-14 lg:px-20`}
      >
        <Link to="/" className="mb-12 inline-flex w-fit items-center gap-3">
          <img
            src={BRAND.logo}
            alt={`${BRAND.name} logo`}
            className="h-10 w-10 rounded-xl object-cover"
          />
          <span className="text-xl font-bold text-slate-900">{BRAND.name}</span>
        </Link>

        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to continue your cosmic journey.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="username"
              className="text-sm font-medium text-slate-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="testuser"
              className="rounded-xl border border-slate-300 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-xl border border-slate-300 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Don't have an account?{" "}
          <Link to="/" className="font-semibold text-slate-800 hover:underline">
            Get started
          </Link>
        </p>
      </div>

      {/* Right: astrology image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=85"
          alt="Starry night sky"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

export default SignIn;
