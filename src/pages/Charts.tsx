import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import NavBar from "../components/NavBar";
import { useEmployeeData } from "../hooks/useEmployeeData";
import { PAGE_GRADIENT } from "../constants";

// ── helpers ────────────────────────────────────────────────────────────────
const parseSalary = (s: string) => parseInt(s.replace(/[$,]/g, ""), 10) || 0;

const formatSalary = (v: number) => `$${v.toLocaleString("en-US")}`;

const PALETTE = [
  "#6366f1",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
  "#8b5cf6",
  "#06b6d4",
  "#84cc16",
];

// ── custom tooltip for salary bar chart ────────────────────────────────────
function SalaryTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: { fullName: string; salary: number } }[];
}) {
  if (!active || !payload?.length) return null;
  const { fullName, salary } = payload[0].payload;
  return (
    <div className="rounded-xl border border-black/8 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm text-sm">
      <p className="font-bold text-slate-900">{fullName}</p>
      <p className="mt-0.5 text-slate-600">{formatSalary(salary)}</p>
    </div>
  );
}

// ── custom tooltip for pie chart ───────────────────────────────────────────
function PieTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number }[];
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-black/8 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm text-sm">
      <p className="font-bold text-slate-900">{payload[0].name}</p>
      <p className="mt-0.5 text-slate-600">
        {payload[0].value} employee{payload[0].value !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

export default function Charts() {
  const navigate = useNavigate();
  const { rows, loading } = useEmployeeData();

  useEffect(() => {
    document.title = "Charts – Jotish";
  }, []);

  // ── derived data ──────────────────────────────────────────────────────────

  // 1. Top-10 salary bar chart
  const top10Salary = rows.slice(0, 10).map((r) => ({
    fullName: r[0],
    name: r[0].split(" ")[0], // first name only for axis label
    salary: parseSalary(r[5]),
    office: r[2],
  }));

  // 2. Employee count by office (pie)
  const officeMap: Record<string, number> = {};
  rows.forEach((r) => {
    officeMap[r[2]] = (officeMap[r[2]] ?? 0) + 1;
  });
  const officeData = Object.entries(officeMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // 3. Employee count by position (horizontal bar, top 8)
  const roleMap: Record<string, number> = {};
  rows.forEach((r) => {
    roleMap[r[1]] = (roleMap[r[1]] ?? 0) + 1;
  });
  const roleData = Object.entries(roleMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  if (loading) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center ${PAGE_GRADIENT}`}
      >
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-800" />
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
            ← Dashboard
          </button>
        }
      />

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 space-y-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Visual summary of {rows.length} employees across {officeData.length}{" "}
            offices.
          </p>
        </div>

        {/* ── Chart 1: Salary Bar ─────────────────────────────────────────── */}
        <div className="rounded-2xl border border-black/8 bg-white/60 shadow-sm backdrop-blur-sm p-6">
          <h2 className="text-base font-bold text-slate-900 mb-1">
            Salary — First 10 Employees
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Annual compensation in USD. Hover a bar for details.
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={top10Salary}
              margin={{ top: 4, right: 16, left: 16, bottom: 4 }}
            >
              <defs>
                {top10Salary.map((_, i) => (
                  <linearGradient
                    key={i}
                    id={`bar-grad-${i}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={PALETTE[i % PALETTE.length]}
                      stopOpacity={0.95}
                    />
                    <stop
                      offset="100%"
                      stopColor={PALETTE[i % PALETTE.length]}
                      stopOpacity={0.55}
                    />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                width={52}
              />
              <Tooltip
                content={<SalaryTooltip />}
                cursor={{ fill: "rgba(99,102,241,0.06)" }}
              />
              <Bar dataKey="salary" radius={[6, 6, 0, 0]} maxBarSize={56}>
                {top10Salary.map((_, i) => (
                  <Cell key={i} fill={`url(#bar-grad-${i})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ── Charts 2 & 3: side by side on large screens ─────────────────── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Pie: employees by office */}
          <div className="rounded-2xl border border-black/8 bg-white/60 shadow-sm backdrop-blur-sm p-6">
            <h2 className="text-base font-bold text-slate-900 mb-1">
              Employees by Office
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Distribution of staff across office locations.
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={officeData}
                  cx="50%"
                  cy="50%"
                  innerRadius="42%"
                  outerRadius="68%"
                  paddingAngle={3}
                  dataKey="value"
                >
                  {officeData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={PALETTE[i % PALETTE.length]}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(v) => (
                    <span className="text-xs text-slate-600">{v}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Horizontal bar: headcount by role */}
          <div className="rounded-2xl border border-black/8 bg-white/60 shadow-sm backdrop-blur-sm p-6">
            <h2 className="text-base font-bold text-slate-900 mb-1">
              Top Roles by Headcount
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Most common job titles in the organisation.
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                layout="vertical"
                data={roleData}
                margin={{ top: 4, right: 24, left: 8, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  allowDecimals={false}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={130}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(v) => [`${v} employees`, "Count"]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid rgba(0,0,0,0.08)",
                    background: "rgba(255,255,255,0.92)",
                    fontSize: "13px",
                  }}
                  cursor={{ fill: "rgba(99,102,241,0.06)" }}
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={28}>
                  {roleData.map((_, i) => (
                    <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
