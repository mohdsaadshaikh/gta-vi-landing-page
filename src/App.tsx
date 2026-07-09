import { useState } from "react"
import Navbar from "./components/Navbar"
import HeroSection from "./components/Hero"
import Loader from "./components/Loader"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"


gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <main>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Navbar />
      <HeroSection />
    </main>
  )
}

export default App
