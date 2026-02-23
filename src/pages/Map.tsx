import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import NavBar from "../components/NavBar";
import { useEmployeeData } from "../hooks/useEmployeeData";
import type { Row } from "../types";

// ── city coordinates ───────────────────────────────────────────────────────
const CITY_COORDS: Record<string, [number, number]> = {
  Edinburgh: [55.9533, -3.1883],
  Tokyo: [35.6762, 139.6503],
  "New York": [40.7128, -74.006],
  London: [51.5074, -0.1278],
  Singapore: [1.3521, 103.8198],
  "San Francisco": [37.7749, -122.4194],
  Austin: [30.2672, -97.7431],
  Sydney: [-33.8688, 151.2093],
  Melbourne: [-37.8136, 144.9631],
  "Hong Kong": [22.3193, 114.1694],
  Zürich: [47.3769, 8.5417],
  Zurich: [47.3769, 8.5417],
  Paris: [48.8566, 2.3522],
  Seoul: [37.5665, 126.978],
  Berlin: [52.52, 13.405],
  Jakarta: [-6.2088, 106.8456],
  Mumbai: [19.076, 72.8777],
  Shanghai: [31.2304, 121.4737],
  Dubai: [25.2048, 55.2708],
  "Cape Town": [-33.9249, 18.4241],
};

function markerColor(count: number): string {
  if (count >= 10) return "#6366f1";
  if (count >= 5) return "#f59e0b";
  return "#10b981";
}

function markerRadius(count: number): number {
  return Math.max(12, Math.min(32, 10 + count * 2));
}

export default function OfficeMap() {
  const navigate = useNavigate();
  const { rows, loading } = useEmployeeData();

  useEffect(() => {
    document.title = "Office Map – Jotish";
  }, []);

  // Group employees by office
  const officeGroups: Record<string, Row[]> = {};
  rows.forEach((r) => {
    const city = r[2];
    if (!officeGroups[city]) officeGroups[city] = [];
    officeGroups[city].push(r);
  });

  const cities = Object.entries(officeGroups).map(([city, employees]) => ({
    city,
    employees,
    coords: CITY_COORDS[city],
  }));

  const mapped = cities.filter((c) => c.coords);
  const unmapped = cities.filter((c) => !c.coords).map((c) => c.city);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(160deg,#ffe6c7_0%,#cfe0ff_55%,#b6f3e3_100%)]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-800" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-[linear-gradient(160deg,#ffe6c7_0%,#cfe0ff_55%,#b6f3e3_100%)]">
      <NavBar
        action={
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl border border-slate-300 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white"
          >
            ← Dashboard
          </button>
        }
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
            Office Map
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {rows.length} employees across {cities.length} offices worldwide.
            Click a marker to see who's there.
          </p>
        </div>

        {/* Map container */}
        <div
          className="relative overflow-hidden rounded-2xl border border-black/8 shadow-lg"
          style={{ height: "520px" }}
        >
          <MapContainer
            center={[20, 10]}
            zoom={2}
            minZoom={2}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {mapped.map(({ city, employees, coords }) => (
              <CircleMarker
                key={city}
                center={coords!}
                radius={markerRadius(employees.length)}
                pathOptions={{
                  fillColor: markerColor(employees.length),
                  fillOpacity: 0.85,
                  color: "#fff",
                  weight: 2,
                }}
              >
                {/* Always-visible label */}
                <Tooltip
                  permanent
                  direction="top"
                  offset={[0, -markerRadius(employees.length) - 2]}
                  className="map-label"
                >
                  <span className="text-xs font-semibold">
                    {city} · {employees.length}
                  </span>
                </Tooltip>

                {/* Click popup */}
                <Popup maxWidth={260} minWidth={220}>
                  <div className="py-1">
                    <p className="mb-2 font-extrabold text-slate-900 text-sm">
                      {city}
                    </p>
                    <p className="mb-2 text-xs text-slate-500">
                      {employees.length} employee
                      {employees.length !== 1 ? "s" : ""}
                    </p>
                    <ul className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                      {employees.map((e, i) => (
                        <li key={i} className="flex flex-col">
                          <span className="text-xs font-semibold text-slate-800">
                            {e[0]}
                          </span>
                          <span className="text-xs text-slate-500">{e[1]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* Legend + stats */}
        <div className="mt-5 flex flex-wrap items-start gap-4">
          {/* Colour legend */}
          <div className="flex-shrink-0 rounded-xl border border-black/8 bg-white/60 px-5 py-4 text-sm backdrop-blur-sm shadow-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Marker size / colour
            </p>
            <div className="flex flex-col gap-2">
              {[
                { color: "#6366f1", label: "10+ employees" },
                { color: "#f59e0b", label: "5–9 employees" },
                { color: "#10b981", label: "1–4 employees" },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <span
                    className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white shadow-sm"
                    style={{ background: color }}
                  />
                  <span className="text-xs text-slate-600">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Office summary */}
          <div className="flex-1 rounded-xl border border-black/8 bg-white/60 px-5 py-4 text-sm backdrop-blur-sm shadow-sm min-w-0">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Offices on map ({mapped.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {mapped
                .sort((a, b) => b.employees.length - a.employees.length)
                .map(({ city, employees }) => (
                  <span
                    key={city}
                    className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                  >
                    {city} <span className="text-slate-400">·</span>{" "}
                    {employees.length}
                  </span>
                ))}
            </div>

            {unmapped.length > 0 && (
              <p className="mt-3 text-xs text-slate-400">
                No coordinates for: {unmapped.join(", ")}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
