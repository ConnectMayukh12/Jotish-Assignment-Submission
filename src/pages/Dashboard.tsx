import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";
import { useEmployeeData } from "../hooks/useEmployeeData";
import type { Row } from "../types";
import { PAGE_GRADIENT, TABLE_COLUMNS } from "../constants";
import { signOut } from "../utils/auth";

function Dashboard() {
  const navigate = useNavigate();
  const { rows, loading, error } = useEmployeeData();
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Dashboard – Jotish";
  }, []);

  const filtered = rows.filter((row) =>
    row.some((cell) => cell.toLowerCase().includes(search.toLowerCase())),
  );

  const handleRowClick = (row: Row) => {
    const index = rows.indexOf(row);
    navigate(`/employee/${index}`);
  };

  return (
    <div className={`min-h-screen w-full ${PAGE_GRADIENT}`}>
      <NavBar
        action={
          <button
            onClick={() => {
              signOut();
              navigate("/signin");
            }}
            className="rounded-xl border border-slate-300 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white"
          >
            Sign out
          </button>
        }
      />

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
              Employee Directory
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {loading ? "Loading…" : `${filtered.length} records`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => navigate("/charts")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Charts
            </button>
            <button
              onClick={() => navigate("/map")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              Map
            </button>
            <input
              type="search"
              placeholder="Search name, role, office…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white/70 px-4 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition sm:w-64"
            />
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader />
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-hidden rounded-2xl border border-black/8 bg-white/60 shadow-sm backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-black/8 bg-white/80">
                    {TABLE_COLUMNS.map((col) => (
                      <th
                        key={col}
                        className="whitespace-nowrap px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-16 text-center text-sm text-slate-400"
                      >
                        No results found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((row, i) => (
                      <tr
                        key={i}
                        onClick={() => handleRowClick(row)}
                        className="cursor-pointer border-b border-black/5 transition hover:bg-white/70 last:border-0"
                      >
                        <td className="whitespace-nowrap px-5 py-3.5 font-medium text-slate-900">
                          {row[0]}
                        </td>
                        <td className="px-5 py-3.5 text-slate-700">{row[1]}</td>
                        <td className="whitespace-nowrap px-5 py-3.5 text-slate-600">
                          {row[2]}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5 font-mono text-slate-600">
                          {row[3]}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5 text-slate-600">
                          {row[4]}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5 font-semibold text-slate-800">
                          {row[5]}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
