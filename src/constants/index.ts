export const BRAND = {
  name: "Jotish",
  logo: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=96&q=80",
} as const;

export const API_URL = "https://backend.jotish.in/backend_dev/gettabledata.php";

export const API_BODY = { username: "test", password: "123456" } as const;

export const ROWS_CACHE_KEY = "jotish_employee_rows";

export const PHOTO_CACHE_KEY = "jotish_captured_photo";

export const TABLE_COLUMNS = [
  "Name",
  "Position",
  "Office",
  "Extn.",
  "Start Date",
  "Salary",
] as const;

export const DETAIL_COLUMNS = [
  "Name",
  "Position",
  "Office",
  "Extension",
  "Start Date",
  "Salary",
] as const;

export const PAGE_GRADIENT =
  "bg-[linear-gradient(160deg,#ffe6c7_0%,#cfe0ff_55%,#b6f3e3_100%)]";
