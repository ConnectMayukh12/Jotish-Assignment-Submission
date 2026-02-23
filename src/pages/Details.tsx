import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import CameraCapture from "../components/CameraCapture";
import { useEmployeeData } from "../hooks/useEmployeeData";
import { DETAIL_COLUMNS, PAGE_GRADIENT } from "../constants";

function Details() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { rows, loading } = useEmployeeData();
  const row = loading ? null : (rows[Number(id)] ?? null);

  useEffect(() => {
    if (row) document.title = `${row[0]} – Jotish`;
  }, [row]);

  if (loading) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center ${PAGE_GRADIENT}`}
      >
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-800" />
      </div>
    );
  }

  if (!row) {
    return (
      <div
        className={`flex min-h-screen flex-col items-center justify-center gap-4 ${PAGE_GRADIENT}`}
      >
        <p className="text-slate-600">Employee not found.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Back to dashboard
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full ${PAGE_GRADIENT}`}>
      <NavBar
        action={
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl border border-slate-300 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white"
          >
            ← Back
          </button>
        }
      />

      <main className="mx-auto max-w-2xl px-4 py-10 md:px-8">
        {/* Detail card */}
        <div className="overflow-hidden rounded-2xl border border-black/8 bg-white/60 shadow-sm backdrop-blur-sm">
          <div className="bg-slate-900 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Employee Profile
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-white">
              {row[0]}
            </h1>
            <p className="mt-0.5 text-sm text-slate-300">{row[1]}</p>
          </div>

          <div className="grid grid-cols-1 divide-y divide-black/5 sm:grid-cols-2 sm:divide-y-0">
            {DETAIL_COLUMNS.slice(1).map((label, i) => (
              <div
                key={label}
                className={`flex flex-col gap-0.5 border-b border-black/5 px-6 py-4 ${
                  i % 2 === 0 ? "sm:border-r sm:border-black/5" : ""
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {label}
                </span>
                <span
                  className={`text-base font-medium text-slate-800 ${
                    label === "Salary" ? "font-bold text-slate-900" : ""
                  }`}
                >
                  {row[i + 1]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <CameraCapture employeeName={row[0]} employeeId={id!} />
      </main>
    </div>
  );
}

export default Details;
