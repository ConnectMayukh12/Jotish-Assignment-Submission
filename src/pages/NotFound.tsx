import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CapybaraLoader from "../components/CapybaraLoader";
import { PAGE_GRADIENT } from "../constants";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 – Jotish";
  }, []);

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center gap-6 ${PAGE_GRADIENT}`}
    >
      <CapybaraLoader />

      <div className="text-center">
        <p className="text-6xl font-extrabold text-slate-900">404</p>
        <p className="mt-2 text-lg font-semibold text-slate-700">
          Page not found
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Even the capybara couldn't find what you're looking for.
        </p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Go home
      </button>
    </div>
  );
}

export default NotFound;
