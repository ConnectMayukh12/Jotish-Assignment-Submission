import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CamState } from "../types";
import { PHOTO_CACHE_KEY } from "../constants";

interface CameraCaptureProps {
  employeeName: string;
  employeeId: string | number;
}

function CameraCapture({ employeeName, employeeId }: CameraCaptureProps) {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [camState, setCamState] = useState<CamState>("idle");
  const [camError, setCamError] = useState("");

  // Attach stream after <video> is in the DOM
  useEffect(() => {
    if (camState === "active" && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => {});
    }
  }, [camState]);

  // Stop stream on unmount
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const startCamera = async () => {
    setCamError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      setCamState("active");
    } catch {
      setCamError("Camera access denied or not available on this device.");
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0);
    }
    const dataUrl = canvas.toDataURL("image/png");
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCamState("captured");

    // Persist photo and navigate to Photo Result page
    sessionStorage.setItem(
      PHOTO_CACHE_KEY,
      JSON.stringify({
        dataUrl,
        employeeName,
        employeeId,
        timestamp: new Date().toISOString(),
      }),
    );
    navigate("/photo-result");
  };

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-black/8 bg-white/60 shadow-sm backdrop-blur-sm">
      <div className="px-6 py-5">
        <h2 className="text-base font-bold text-slate-900">Capture Photo</h2>
        <p className="mt-0.5 text-sm text-slate-500">
          Take a photo for this employee's profile using your camera.
        </p>
      </div>

      {camError && (
        <div className="mx-6 mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {camError}
        </div>
      )}

      {camState === "active" && (
        <div className="relative mx-6 mb-4 overflow-hidden rounded-xl bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full rounded-xl scale-x-[-1]"
          />
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      <div className="flex flex-wrap gap-3 px-6 pb-6">
        {camState === "idle" && (
          <button
            onClick={startCamera}
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
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Open Camera
          </button>
        )}

        {camState === "active" && (
          <button
            onClick={capturePhoto}
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
              <circle cx="12" cy="12" r="3" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
            </svg>
            Capture
          </button>
        )}
      </div>
    </div>
  );
}

export default CameraCapture;
