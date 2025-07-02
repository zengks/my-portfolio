"use client";

export default function AboutSection({ about }: { about: string }) {
  return (
    <div className="glass-container glass-section">
      <p className="section-title">About Myself</p>
      <p>{about ? about : "Loading..."}</p>
    </div>
  );
}
