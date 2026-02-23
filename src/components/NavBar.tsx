import { Link } from "react-router-dom";
import { BRAND } from "../constants";

interface NavBarProps {
  /** Slot for the right-side action (button, link, etc.) */
  action?: React.ReactNode;
}

function NavBar({ action }: NavBarProps) {
  return (
    <header className="flex items-center justify-between border-b border-black/8 bg-white/50 px-6 py-4 backdrop-blur-sm md:px-10">
      <Link to="/" className="inline-flex items-center gap-3">
        <img
          src={BRAND.logo}
          alt={`${BRAND.name} logo`}
          className="h-9 w-9 rounded-xl object-cover"
        />
        <span className="text-lg font-bold text-slate-900">{BRAND.name}</span>
      </Link>

      {action && <div>{action}</div>}
    </header>
  );
}

export default NavBar;
