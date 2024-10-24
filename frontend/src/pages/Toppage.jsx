import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Toppage = ({ setToppage }) => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();

      t1.from("#intro-slider", {
        xPercent: "-100",
        duration: 1.3,
        delay: 0.3,
      })
        .from(["#title-1", "#title-2", "#title-3"], {
          opacity: 0,
          y: "+=30",
          stagger: 0.5,
        })
        .to(["#title-1", "#title-2", "#title-3"], {
          opacity: 0,
          y: "-=30",
          delay: 0.3,
          stagger: 0.5,
        })
        .to("#intro-slider", {
          xPercent: "-100",
          duration: 1.3,
        })
        .from("#welcome", {
          opacity: 0,
          duration: 0.5,
        })
        .to("#welcome", {
          delay: 0.5,
          duration: 1,
        })
        .to("#intro-slider", { 
          opacity: 0,
          duration: 1, 
          onComplete: () => {
            setToppage(false);
          },
        });
    }, comp);

    return () => ctx.revert();
  }, [setToppage]);

  return (
    <div className="relative z-20" ref={comp}>
      <div
        id="intro-slider"
        className="h-screen p-10 bg-[#8ABFA3] text-[#E9EED9] absolute top-0 left-0 font-spaceGrotesk z-10 w-full flex flex-col gap-10 tracking-tight"
      >
        <h1 className="text-9xl" id="title-1">
          Elevate Your Style
        </h1>
        <h1 className="text-7xl" id="title-2">
          Unleash Your Unique Look
        </h1>
        <h1 className="text-6xl" id="title-3">
          Discover Fashion, Redefined
        </h1>
      </div>
      <div className="h-screen flex bg-[#507687] justify-center place-items-center">
        <h1
          id="welcome"
          className="text-9xl font-bold text-gray-100 font-spaceGrotesk"
        >
          Welcome{" "}
          <span className="flex flex-col text-7xl text-orange-500">
            To Shoptopia
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Toppage;
