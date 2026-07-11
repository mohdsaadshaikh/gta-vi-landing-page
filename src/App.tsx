import { useState } from "react"
import Navbar from "./components/Navbar"
import HeroSection from "./components/Hero"
import Loader from "./components/Loader"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import FirstVideo from "./components/FirstVideo"


gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <main>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <Navbar />
      <HeroSection />
      <FirstVideo />
    </main>
  )
}

export default App
