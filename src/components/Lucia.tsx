import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useFrameSequence } from "../hooks/useFrameSequence";

const FRAME_COUNT = 89;
const FRAME_PATH = (i: number) =>
  `/videos/frames/lucia/lucia_${String(i + 1).padStart(4, "0")}.webp`;

const Lucia = () => {
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

    gsap.set(".lucia", { marginTop: "-60vh", opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".lucia",
        start: "top top",
        end: "bottom top",
        scrub: 2,
        pin: true,
      },
    });

    tl.to(".lucia", { opacity: 1, duration: 1, ease: "power1.inOut" });

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

    gsap.set(".lucia-life", { marginTop: "-80vh" });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".lucia-life",
          start: "top 80%",
          end: "10% center",
          scrub: 2,
        },
      })
      .to(".second-vd", { opacity: 0, duration: 1, ease: "power1.inOut" });

    gsap.to(".lucia-life .img-box", {
      scrollTrigger: {
        trigger: ".lucia-life",
        start: "top center",
        end: "80% center",
        scrub: 2,
      },
      y: -200,
      duration: 1,
      ease: "power1.inOut",
    });
  }, [readyToAnimate]);

  return (
    <>
      <section className="lucia">
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
            className="size-full object-cover second-vd"
            style={{
              objectPosition: "15% 0%",
              display: readyToAnimate ? "block" : "none",
            }}
          />
        </div>
      </section>
      <section className="lucia-life">
        <div className="flex flex-col gap-5 items-end img-box lg:1/2 ps-10 mt-96">
          <div className="lucia-1 overflow-hidden">
            <div className="lucia-reveal-1 h-full w-full overflow-hidden">
              <img src="/images/lucia-1.png" />
            </div>
          </div>
          <div className="lucia-3 overflow-hidden">
            <div className="lucia-reveal-3 h-full w-full overflow-hidden">
              <img src="/images/lucia-3.webp" />
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 lucia-life-content">
          <div className="max-w-xl lg:ps-16 ps-10">
            <h1>Lucia Caminos</h1>
            <h2>
              Lucia’s father taught her to fight as soon as she could walk.
            </h2>
            <p>
              Life has been coming at her swinging ever since. Fighting for her
              family landed her in the Leonida Penitentiary. Sheer luck got her
              out. Lucia’s learned her lesson — only smart moves from here.
            </p>
          </div>

          <div className="lucia-2 overflow-hidden">
            <div className="lucia-reveal-2 h-full w-full overflow-hidden">
              <img src="/images/lucia-2.png" />
            </div>
          </div>

          <p className="max-w-xl lg:ps-16 ps-10">
            More than anything, Lucia wants the good life her mom has dreamed of
            since their days in Liberty City — but instead of half-baked
            fantasies, Lucia is prepared to take matters into her own hands.
          </p>
        </div>
      </section>
    </>
  );
};

export default Lucia;
