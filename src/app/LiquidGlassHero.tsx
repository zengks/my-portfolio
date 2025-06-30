"use client";
import { useRef, useState, useEffect } from "react";
import GlassContainer from "./components/GlassContainer";
export default function LiquidGlassHero() {
  const menuRef = useRef<HTMLAnchorElement>(null);
  const bubbleRef = useRef(null);
  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const items =
      menuRef.current?.querySelectorAll<HTMLAnchorElement>("a") || [];
    if (items.length > 0) {
      const firstItem = items[0];
      const { offsetLeft, offsetWidth } = firstItem;
      setBubbleStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, []);

  const handleHover = (e) => {
    const { offsetLeft, offsetWidth } = e.target;
    setBubbleStyle({ left: offsetLeft, width: offsetWidth });
  };

  return (
    // <div className="relative min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#c7d2fe] to-[#94a3b8] animate-gradient-xy text-black overflow-hidden">
    <div className="relative min-h-screen bg-gradient-to-br animate-gradient-xy text-black overflow-hidden">
      {/* Overlay glass effect */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl z-10" />

      {/* Menu Bar */}
      <nav
        ref={menuRef}
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-30 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-8 py-3 shadow-md flex space-x-6 items-center"
      >
        {["Home", "Features", "Pricing", "Contact"].map((item) => (
          <a
            key={item}
            href="#"
            onMouseEnter={handleHover}
            className="relative text-black font-medium z-10 px-4 py-2 flex items-center justify-center"
          >
            {item}
          </a>
        ))}
        <span
          ref={bubbleRef}
          className="absolute h-full bg-white/20 backdrop-blur rounded-full transition-[left,width] duration-500 ease-linear -z-10"
          style={{
            left: bubbleStyle.left,
            width: bubbleStyle.width,
          }}
        />
      </nav>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-screen px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
          Welcome to Liquid Glass UI
        </h1>
        <p className="mt-4 text-lg md:text-xl text-black/80 max-w-xl">
          A frosted, fluid, and elegant Apple-inspired interface crafted with
          Next.js & Tailwind CSS.
        </p>
        <GlassContainer />
        <div className="mt-6 flex gap-4">
          <button className="px-6 py-3 bg-white/10 border border-white/30 rounded-full text-black font-semibold shadow-md hover:shadow-xl transition-all">
            Get Started
          </button>
          <button className="px-6 py-3 bg-white/5 border border-white/20 rounded-full text-black/70 hover:text-black font-medium">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
