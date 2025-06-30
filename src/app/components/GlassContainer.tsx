export default function GlassContainer() {
    return (
    <>
      {/* <div className="animate-gradient-xy mt-5 overflow-hidden rounded-[6.5vh] border border-transparent bg-gradient-to-br from-white/5 via-white/3 to-white/2 p-50 text-black/70 shadow-sm backdrop-blur-2xl transition-all hover:shadow-md"> */}
      <div className="animate-gradient-xy mt-5 p-30 overflow-hidden rounded-[6.5vh] glass-container">
        NEXTJS
            </div>
            <div className="glass-container glass-button">
                BUTTON
            </div>
      {/* <style jsx>{`
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
      ; */}
    </>
  );
}
