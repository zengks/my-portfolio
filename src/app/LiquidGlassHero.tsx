"use client";
import { useRef, useState, useEffect } from "react";

export default function LiquidGlassHero() {
  const menuRef = useRef(null);
  const bubbleRef = useRef(null);
  const [bubbleStyle, setBubbleStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const items = menuRef.current?.querySelectorAll("a") || [];
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
    <div className="relative min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-teal-400 animate-gradient-xy text-white overflow-hidden">
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
            className="relative text-white font-medium z-10 px-4 py-2 flex items-center justify-center"
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
        <p className="mt-4 text-lg md:text-xl text-white/80 max-w-xl">
          A frosted, fluid, and elegant Apple-inspired interface crafted with
          Next.js & Tailwind CSS.
        </p>
        <div className="mt-6 flex gap-4">
          <button className="px-6 py-3 bg-white/10 border border-white/30 rounded-full text-white font-semibold shadow-md hover:shadow-xl transition-all">
            Get Started
          </button>
          <button className="px-6 py-3 bg-white/5 border border-white/20 rounded-full text-white/70 hover:text-white font-medium">
            Learn More
          </button>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative z-20 py-24 px-6 bg-black/20 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center text-white/90">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/20 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Frosted Design</h3>
            <p>
              Use backdrop blur and transparency to create stunning visual
              depth.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/20 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Adaptive Layout</h3>
            <p>
              Fully responsive and optimized for mobile, tablet, and desktop.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/20 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Tailwind Powered</h3>
            <p>
              Built with utility-first CSS using Tailwind for maximum
              flexibility.
            </p>
          </div>
        </div>
      </section>

      <footer className="w-full backdrop-blur-md bg-white/10 dark:bg-black/20 border-t border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-t-2xl px-6 py-4 flex flex-col md:flex-row items-center justify-between text-white text-sm">
        <div className="mb-2 md:mb-0">
          © {new Date().getFullYear()} Steven Zeng. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a
            href="#"
            className="hover:underline transition-opacity opacity-80 hover:opacity-100"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:underline transition-opacity opacity-80 hover:opacity-100"
          >
            Terms
          </a>
          <a
            href="#"
            className="hover:underline transition-opacity opacity-80 hover:opacity-100"
          >
            Contact
          </a>
        </div>
      </footer>

      {/* Gradient animation keyframes */}
      <style jsx>{`
        @keyframes gradient-xy {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
