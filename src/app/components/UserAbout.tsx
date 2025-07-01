"use client";

export default function AboutSection({ data }: { data: string }) {
  return (
    <div className="glass-container glass-section">
      <p className="section-title">About Myself</p>
      <p>{data ? data : "Loading..."}</p>
    </div>
  );
}
