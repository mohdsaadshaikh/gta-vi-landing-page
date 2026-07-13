import { useState } from "react"
import Navbar from "./components/Navbar"
import HeroSection from "./components/Hero"
import Loader from "./components/Loader"
import gsap from "gsap"
import { ScrollTrigger, ScrollSmoother } from "gsap/all"
import { useGSAP } from "@gsap/react"
import Jason from "./components/Jason"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  const [loading, setLoading] = useState(true);

  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2,
      effects: true,
    });
  }, []);

  return (
    <main>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HeroSection />
          <Jason />
        </div>
      </div>
    </main>
  )
}

export default App
