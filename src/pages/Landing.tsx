import { useEffect } from "react";
import LandingHero from "../components/LandingHero";
import { BRAND } from "../constants";

function Landing() {
  useEffect(() => {
    document.title = BRAND.name;
  }, []);

  return <LandingHero />;
}

export default Landing;
