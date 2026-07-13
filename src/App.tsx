import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import HeroSection from "./components/Hero";
import Jason from "./components/Jason";
import Lucia from "./components/Lucia";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <main>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Navbar />
      <HeroSection />
      <Jason />
      <Lucia />
    </main>
  );
};

export default App;
