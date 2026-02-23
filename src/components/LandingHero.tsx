import { Link, useNavigate } from "react-router-dom";
import { BRAND } from "../constants";

const taskImages = [
  "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1505506874110-6a7a69069a08?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=900&q=80",
];

const loopImages = [...taskImages, ...taskImages];

function LandingHero() {
  const navigate = useNavigate();

  return (
    <section className="h-screen w-full bg-[linear-gradient(135deg,#ffe6c7_0%,#cfe0ff_52%,#b6f3e3_100%)]">
      <div className="flex h-full w-full flex-col md:flex-row">
        {/* Left: content */}
        <div className="order-1 flex w-full flex-col justify-center px-6 py-6 md:basis-3/5 md:px-12 lg:px-16">
          <Link
            to="/"
            className="mb-12 inline-flex w-fit items-center gap-3 rounded-xl"
          >
            <img
              src={BRAND.logo}
              alt={`${BRAND.name} logo`}
              className="h-12 w-12 rounded-xl object-cover"
            />
            <span className="text-2xl font-bold text-slate-900">
              {BRAND.name}
            </span>
          </Link>

          <h1 className="max-w-xl text-5xl font-extrabold leading-tight text-slate-900 sm:text-6xl md:text-7xl">
            Read Stars, Shape Life
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
            {BRAND.name} helps you explore astrology insights, track planetary
            trends, and understand your day with clear, personalized guidance.
          </p>

          <button
            type="button"
            onClick={() => navigate("/signin")}
            className="mt-8 w-fit rounded-xl bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Get Started
          </button>
        </div>

        {/* Right: image gallery */}
        <div className="order-2 mt-auto flex h-[40vh] w-full flex-col gap-2 p-2 md:ml-auto md:mt-0 md:h-full md:basis-2/5 md:flex-row md:gap-2 md:p-3">
          {/* Track 1 — scrolls down on desktop, left on mobile */}
          <div className="relative h-1/2 w-full overflow-hidden rounded-2xl md:h-full md:w-1/2">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black/30 to-transparent md:hidden" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black/30 to-transparent md:hidden" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-16 bg-gradient-to-b from-black/30 to-transparent md:block" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden h-16 bg-gradient-to-t from-black/30 to-transparent md:block" />
            <div className="image-track-down flex w-max gap-[3px] md:h-full md:w-full md:flex-col">
              {loopImages.map((image, index) => (
                <div
                  key={`down-${index}`}
                  className="h-36 w-44 shrink-0 overflow-hidden rounded-xl shadow-sm md:h-52 md:w-full"
                >
                  <img
                    src={image}
                    alt="Astrology preview"
                    className="block h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Track 2 — scrolls up on desktop, right on mobile */}
          <div className="relative h-1/2 w-full overflow-hidden rounded-2xl md:h-full md:w-1/2">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black/30 to-transparent md:hidden" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black/30 to-transparent md:hidden" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-16 bg-gradient-to-b from-black/30 to-transparent md:block" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden h-16 bg-gradient-to-t from-black/30 to-transparent md:block" />
            <div className="image-track-up flex w-max gap-[3px] md:h-full md:w-full md:flex-col">
              {loopImages.map((image, index) => (
                <div
                  key={`up-${index}`}
                  className="h-36 w-44 shrink-0 overflow-hidden rounded-xl shadow-sm md:h-52 md:w-full"
                >
                  <img
                    src={image}
                    alt="Zodiac and stars preview"
                    className="block h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingHero;
