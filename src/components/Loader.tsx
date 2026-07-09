import { useEffect } from "react";
import gsap from "gsap";

interface LoaderProps {
    onComplete?: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
    useEffect(() => {
        const handleLoad = () => {
            // Keep loader visible for at least 2.5 seconds for a premium feel
            setTimeout(fadeOut, 2500);
        };

        const fadeOut = () => {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onComplete) onComplete();
                }
            });

            // Fade out the loader container smoothly
            tl.to(".rockstar-loader", {
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
            });
        };

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, [onComplete]);

    return (
        <div className="rockstar-loader">
            <div className="rockstar-logo-container">
                {/* Base Outlined Logo */}
                <img 
                    src="/images/rockstargames.svg" 
                    alt="Rockstar Games Base" 
                    className="rockstar-logo-base" 
                />
                
                {/* Masked Shining Logo */}
                <div className="rockstar-logo-masked">
                    <div className="rockstar-logo-shine"></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
