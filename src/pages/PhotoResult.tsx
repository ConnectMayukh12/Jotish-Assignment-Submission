import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { PAGE_GRADIENT, PHOTO_CACHE_KEY } from "../constants";

interface PhotoData {
  dataUrl: string;
  employeeName: string;
  employeeId: string | number;
  timestamp: string;
}

function PhotoResult() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<PhotoData | null>(null);

  useEffect(() => {
    document.title = "Photo Result – Jotish";
    const cached = sessionStorage.getItem(PHOTO_CACHE_KEY);
    if (cached) {
      setPhoto(JSON.parse(cached) as PhotoData);
    }
  }, []);

  const handleRetake = () => {
    sessionStorage.removeItem(PHOTO_CACHE_KEY);
    if (photo?.employeeId !== undefined) {
      navigate(`/employee/${photo.employeeId}`);
    } else {
      navigate("/dashboard");
    }
  };

  const formatDate = (iso: string) => {
    try {
      return new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  if (!photo) {
    return (
      <div
        className={`flex min-h-screen flex-col items-center justify-center gap-4 ${PAGE_GRADIENT}`}
      >
        <p className="text-slate-600">No photo found.</p>
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
            onClick={handleRetake}
            className="rounded-xl border border-slate-300 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white"
          >
            ← Back
          </button>
        }
      />

      <main className="mx-auto max-w-xl px-4 py-10 md:px-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Photo Result
          </p>
          <h1 className="mt-1 text-3xl font-extrabold text-slate-900">
            {photo.employeeName}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Captured on {formatDate(photo.timestamp)}
          </p>
        </div>

        {/* Photo card */}
        <div className="overflow-hidden rounded-2xl border border-black/8 bg-white/60 shadow-xl backdrop-blur-sm">
          <img
            src={photo.dataUrl}
            alt={`Photo of ${photo.employeeName}`}
            className="w-full"
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={handleRetake}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/70 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-white"
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Retake Photo
          </button>

          <a
            href={photo.dataUrl}
            download={`${photo.employeeName.replace(/\s+/g, "_")}_photo.png`}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Photo
          </a>
        </div>
      </main>
    </div>
  );
}

export default PhotoResult;
