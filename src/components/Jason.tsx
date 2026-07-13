import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const Jason  = () => {
  const videoRef = useRef(null);

  useGSAP(() => {
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

    videoRef.current.onloadedmetadata = () => {
      tl.to(
        videoRef.current,
        {
          currentTime: videoRef.current.duration,
          duration: 3,
          ease: "power1.inOut",
        },
        "<",
      );
    };

    gsap.set('.jason', { marginTop: '-80vh' });

    // Fade out previous section's video
    gsap.timeline({
      scrollTrigger: {
        trigger: '.jason',
        start: 'top 90%',
        end: '10% center',
        scrub: 2,
      }
    }).to('.first-vd', { opacity: 0, duration: 1, ease: 'power1.inOut' });

    // Text content staggered reveal
    gsap.from('.jason-content h1, .jason-content h2, .jason-content p', {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.jason',
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    });

    // Parallax for Jason-1 (Top Right)
    gsap.fromTo('.jason-1', 
      { y: 150 },
      {
        y: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: '.jason',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      }
    );

    // Parallax for Jason-2 (Bottom Left)
    gsap.fromTo('.jason-2', 
      { y: 80 },
      {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: '.jason',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      }
    );

    // Parallax for Jason-3 (Bottom Right)
    gsap.fromTo('.jason-3', 
      { y: 220 },
      {
        y: -250,
        ease: 'none',
        scrollTrigger: {
          trigger: '.jason',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        }
      }
    );

    // Reveal Animations (Wipe and Zoom)
    gsap.fromTo('.jason-reveal-1', 
      { clipPath: 'inset(100% 0 0 0)', scale: 1.25 },
      {
        clipPath: 'inset(0% 0 0 0)',
        scale: 1,
        duration: 1.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.jason-1',
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        }
      }
    );

    gsap.fromTo('.jason-reveal-2', 
      { clipPath: 'inset(100% 0 0 0)', scale: 1.25 },
      {
        clipPath: 'inset(0% 0 0 0)',
        scale: 1,
        duration: 1.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.jason-2',
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        }
      }
    );

    gsap.fromTo('.jason-reveal-3', 
      { clipPath: 'inset(100% 0 0 0)', scale: 1.25 },
      {
        clipPath: 'inset(0% 0 0 0)',
        scale: 1,
        duration: 1.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.jason-3',
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        }
      }
    );
  }, []);


  return (
    <>
    <section className="first-vd-wrapper">
      <div className="h-dvh">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output1.mp4"
          className="first-vd"
        />
      </div>
    </section>
        <section className="jason">
      <div className="max-w-lg jason-content">
        <h1>Jason Duval</h1>
        <h2>Jason wants an easy life, but things just keep getting harder.</h2>
        <p>Jason grew up around grifters and crooks. After a stint in the Army trying to shake off his troubled teens, he found himself in the Keys doing what he knows best, working for local drug runners. It might be time to try something new.</p>

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
