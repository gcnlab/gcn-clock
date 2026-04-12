"use client";

import { useState, useEffect } from "react";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

function getVernalEquinox(year: number): number {
  if (year >= 2100) return Math.floor(21.8510 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
  return Math.floor(20.8431 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
}

function getAutumnalEquinox(year: number): number {
  if (year >= 2100) return Math.floor(24.2488 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
  return Math.floor(23.2488 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
}

function getNthMonday(year: number, month: number, n: number): number {
  const first = new Date(year, month - 1, 1).getDay();
  const firstMonday = first <= 1 ? (2 - first) : (9 - first);
  return firstMonday + (n - 1) * 7;
}

function getHolidays(year: number): Record<string, string> {
  const holidays: Record<string, string> = {};
  const add = (m: number, d: number, name: string) => {
    holidays[`${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`] = name;
  };

  add(1, 1, "元日");
  add(2, 11, "建国記念の日");
  add(2, 23, "天皇誕生日");
  add(4, 29, "昭和の日");
  add(5, 3, "憲法記念日");
  add(5, 4, "みどりの日");
  add(5, 5, "こどもの日");
  add(8, 11, "山の日");
  add(11, 3, "文化の日");
  add(11, 23, "勤労感謝の日");
  add(3, getVernalEquinox(year), "春分の日");
  add(9, getAutumnalEquinox(year), "秋分の日");
  add(1, getNthMonday(year, 1, 2), "成人の日");
  add(7, getNthMonday(year, 7, 3), "海の日");
  add(9, getNthMonday(year, 9, 3), "敬老の日");
  add(10, getNthMonday(year, 10, 2), "スポーツの日");

  const entries = Object.entries(holidays);
  for (const [key] of entries) {
    const [mm, dd] = key.split("-").map(Number);
    const d = new Date(year, mm - 1, dd);
    if (d.getDay() === 0) {
      let next = new Date(year, mm - 1, dd + 1);
      const nextKey = () =>
        `${String(next.getMonth() + 1).padStart(2, "0")}-${String(next.getDate()).padStart(2, "0")}`;
      while (holidays[nextKey()]) {
        next = new Date(next.getFullYear(), next.getMonth(), next.getDate() + 1);
      }
      holidays[nextKey()] = "振替休日";
    }
  }

  const sorted = Object.keys(holidays).sort();
  for (let i = 0; i < sorted.length - 1; i++) {
    const [m1, d1] = sorted[i].split("-").map(Number);
    const [m2, d2] = sorted[i + 1].split("-").map(Number);
    const date1 = new Date(year, m1 - 1, d1);
    const date2 = new Date(year, m2 - 1, d2);
    const diff = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 2) {
      const between = new Date(year, m1 - 1, d1 + 1);
      const bKey = `${String(between.getMonth() + 1).padStart(2, "0")}-${String(between.getDate()).padStart(2, "0")}`;
      if (!holidays[bKey] && between.getDay() !== 0) {
        holidays[bKey] = "国民の休日";
      }
    }
  }

  return holidays;
}

function toWareki(year: number): string {
  if (year >= 2019) return `令和${year - 2018}`;
  if (year >= 1989) return `平成${year - 1988}`;
  if (year >= 1926) return `昭和${year - 1925}`;
  if (year >= 1912) return `大正${year - 1911}`;
  return `明治${year - 1867}`;
}

export default function DateDisplay() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (!now) return <div className="h-full" />;

  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const dow = now.getDay();
  const wareki = toWareki(y);

  const holidays = getHolidays(y);
  const todayKey = `${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const holidayName = holidays[todayKey] ?? null;

  const dowBg =
    dow === 0 || holidayName
      ? "bg-red-600"
      : dow === 6
        ? "bg-blue-600"
        : "bg-white/15";

  const dateSize = "min(6.5vw, 5.2rem)";
  const dotSize = "min(4vw, 3rem)";
  const dowSize = "min(3.5vw, 2.8rem)";

  return (
    <div
      className="flex flex-col items-center justify-center select-none h-full"
      style={{ fontFeatureSettings: "'tnum' 1" }}
    >
      {/* Year + Era */}
      <div
        className="tracking-widest font-light text-white/90"
        style={{ fontSize: "min(3.2vw, 2.4rem)" }}
      >
        {y}（{wareki}）
      </div>

      {/* M.DD + Weekday */}
      <div className="flex items-baseline gap-[0.05em] mt-1">
        <span
          className="font-light tracking-tight leading-none text-white/90"
          style={{ fontSize: dateSize }}
        >
          {String(m)}
        </span>
        <span
          className="font-light leading-none text-white/90"
          style={{ fontSize: dotSize }}
        >
          .
        </span>
        <span
          className="font-light tracking-tight leading-none text-white/90"
          style={{ fontSize: dateSize }}
        >
          {String(d).padStart(2, "0")}
        </span>
        <span
          className={`${dowBg} text-white font-medium rounded-lg flex items-center justify-center leading-none ml-[0.2em]`}
          style={{
            fontSize: dowSize,
            padding: "0.1em 0.22em",
          }}
        >
          {WEEKDAYS[dow]}
        </span>
      </div>

      {/* Holiday name */}
      {holidayName && (
        <div
          className="mt-2 tracking-wide text-red-400/80 font-light"
          style={{ fontSize: "min(2.2vw, 1.5rem)" }}
        >
          {holidayName}
        </div>
      )}
    </div>
  );
}
