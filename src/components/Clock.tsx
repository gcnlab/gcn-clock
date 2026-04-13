"use client";

import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return <div style={{ height: "16vw" }} />;

  const h = String(time.getHours());
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ss = String(time.getSeconds()).padStart(2, "0");

  const digitSize = "min(19.2vw, 16.8rem)";
  const colonSize = "min(12vw, 10.2rem)";
  const secSize = "min(8.4vw, 7.2rem)";

  return (
    <div
      className="flex items-baseline justify-center font-light tracking-tight select-none leading-[0.85] text-white/90"
      style={{ fontFeatureSettings: "'tnum' 1" }}
    >
      <span style={{ fontSize: digitSize }}>{h}</span>
      <span
        style={{ fontSize: colonSize }}
        className="mx-[0.02em] relative -top-[0.03em]"
      >
        :
      </span>
      <span style={{ fontSize: digitSize }}>{mm}</span>
      <span
        style={{ fontSize: secSize }}
        className="ml-[0.1em] font-light"
      >
        {ss}
      </span>
    </div>
  );
}
