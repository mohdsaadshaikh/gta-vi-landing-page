import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useFrameSequence } from "../hooks/useFrameSequence";

const FRAME_COUNT = 59;
const FRAME_PATH = (i: number) =>
  `/videos/frames/jason/jason_${String(i + 1).padStart(4, "0")}.webp`;

const Jason = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { readyToAnimate, getBestAvailableFrame } = useFrameSequence({
    frameCount: FRAME_COUNT,
    getFramePath: FRAME_PATH,
    priorityCount: 10,
  });

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = getBestAvailableFrame(index);
    if (!img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  useGSAP(() => {
    if (!readyToAnimate) return;

    drawFrame(0);

    gsap.set(".first-vd-wrapper", { marginTop: "-150vh", opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".first-vd-wrapper",
        start: "top top",
        end: "+=200% top",
        scrub: true,
        pin: true,
      },
    });

    tl.to(".hero-section", { delay: 0.5, opacity: 0, ease: "power1.inOut" });
    tl.to(".first-vd-wrapper", {
      opacity: 1,
      duration: 2,
      ease: "power1.inOut",
    });

    const frameProxy = { frame: 0 };
    tl.to(
      frameProxy,
      {
        frame: FRAME_COUNT - 1,
        duration: 3,
        ease: "power1.inOut",
        onUpdate: () => drawFrame(Math.round(frameProxy.frame)),
      },
      "<",
    );

    gsap.set(".jason", { marginTop: "-80vh" });

    // Fade out previous section's video
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".jason",
          start: "top 90%",
          end: "10% center",
          scrub: 2,
        },
      })
      .to(".first-vd", { opacity: 0, duration: 1, ease: "power1.inOut" });

    // Text content staggered reveal
    gsap.from(".jason-content h1, .jason-content h2, .jason-content p", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".jason",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    gsap.to(".jason .img-box", {
      scrollTrigger: {
        trigger: ".jason",
        start: "top center",
        end: "80% center",
        scrub: 2,
      },
      y: -300,
      duration: 1,
      ease: "power1.inOut",
    });
  }, [readyToAnimate]);

  return (
    <>
      <section className="first-vd-wrapper">
        <div className="h-dvh">
          {!readyToAnimate && (
            <div className="size-full flex items-center justify-center bg-black text-white">
              Loading...
            </div>
          )}
          <canvas
            ref={canvasRef}
            width={1280}
            height={720}
            className="size-full object-cover first-vd"
            style={{
              objectPosition: "15% 0%",
              display: readyToAnimate ? "block" : "none",
            }}
          />
        </div>
      </section>
      <section className="jason">
        <div className="max-w-lg jason-content">
          <h1>Jason Duval</h1>
          <h2>
            Jason wants an easy life, but things just keep getting harder.
          </h2>
          <p>
            Jason grew up around grifters and crooks. After a stint in the Army
            trying to shake off his troubled teens, he found himself in the Keys
            doing what he knows best, working for local drug runners. It might
            be time to try something new.
          </p>

          <div className="jason-2 overflow-hidden">
            <div className="jason-reveal-2 h-full w-full overflow-hidden">
              <img src="/images/jason-2.webp" />
            </div>
          </div>
        </div>

        <div className="space-y-5 mt-96 img-box">
          <div className="jason-1 overflow-hidden">
            <div className="jason-reveal-1 h-full w-full overflow-hidden">
              <img src="/images/jason-1.webp" />
            </div>
          </div>
          <div className="jason-3 overflow-hidden">
            <div className="jason-reveal-3 h-full w-full overflow-hidden">
              <img src="/images/jason-3.webp" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Jason;
