import NavBar from "./components/UI/NavBar";
import LiquidGlassHero from "./LiquidGlassHero";

export default function Home() {
  return (
    <div className="glass-container bg-teal-100 p-30 rounded-[10vh]">
      {/* <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl z-10" /> */}
      <NavBar />
      {/* <LiquidGlassHero /> */}
    </div>
  );
}
