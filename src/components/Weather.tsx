"use client";

import { useState, useEffect, useCallback } from "react";
import ClothingIcon, { getClothingLevel } from "./ClothingIcon";

interface WeatherData {
  temperature: number;
  humidity: number;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  isDay: boolean;
  temp7am: number | null;
  temp7pm: number | null;
}

interface Props {
  city: string;
  lat: number;
  lon: number;
}

function getWeatherIcon(code: number, isDay: boolean): string {
  if (isDay) {
    const dayIcons: Record<number, string> = {
      0: "☀️", 1: "🌤", 2: "⛅", 3: "☁️",
      45: "🌫", 48: "🌫",
      51: "🌦", 53: "🌧", 55: "🌧",
      56: "🌧", 57: "🌧",
      61: "🌧", 63: "🌧", 65: "🌧",
      66: "🌧", 67: "🌧",
      71: "🌨", 73: "❄️", 75: "❄️", 77: "🌨",
      80: "🌦", 81: "🌧", 82: "⛈",
      85: "🌨", 86: "❄️",
      95: "⛈", 96: "⛈", 99: "⛈",
    };
    return dayIcons[code] ?? "❓";
  } else {
    const nightIcons: Record<number, string> = {
      0: "🌙", 1: "🌙", 2: "☁️", 3: "☁️",
      45: "🌫", 48: "🌫",
      51: "🌧", 53: "🌧", 55: "🌧",
      56: "🌧", 57: "🌧",
      61: "🌧", 63: "🌧", 65: "🌧",
      66: "🌧", 67: "🌧",
      71: "🌨", 73: "❄️", 75: "❄️", 77: "🌨",
      80: "🌧", 81: "🌧", 82: "⛈",
      85: "🌨", 86: "❄️",
      95: "⛈", 96: "⛈", 99: "⛈",
    };
    return nightIcons[code] ?? "❓";
  }
}

export default function WeatherRow({ city, lat, lon }: Props) {
  const [data, setData] = useState<WeatherData | null>(null);

  const fetchWeather = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m&timezone=Asia%2FTokyo&forecast_days=1`
      );
      const json = await res.json();

      const hours: string[] = json.hourly.time;
      const temps: number[] = json.hourly.temperature_2m;
      let temp7am: number | null = null;
      let temp7pm: number | null = null;
      hours.forEach((t: string, i: number) => {
        const h = new Date(t).getHours();
        if (h === 7) temp7am = temps[i];
        if (h === 19) temp7pm = temps[i];
      });

      setData({
        temperature: json.current.temperature_2m,
        humidity: json.current.relative_humidity_2m,
        weatherCode: json.current.weather_code,
        isDay: json.current.is_day === 1,
        tempMax: json.daily.temperature_2m_max[0],
        tempMin: json.daily.temperature_2m_min[0],
        temp7am,
        temp7pm,
      });
    } catch {
      /* retry next interval */
    }
  }, [lat, lon]);

  useEffect(() => {
    fetchWeather();
    const timer = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(timer);
  }, [fetchWeather]);

  const baseFontSize = "min(3vw, 2.2rem)";

  if (!data) {
    return (
      <div
        className="flex items-center gap-3 opacity-40 whitespace-nowrap font-light"
        style={{ fontSize: baseFontSize }}
      >
        <span style={{ fontSize: "0.85em" }}>{city}</span>
        <span>--.-<span style={{ fontSize: "0.55em" }}>℃</span></span>
      </div>
    );
  }

  const clothingLevel = getClothingLevel(data.temp7am, data.temp7pm);

  return (
    <div
      className="flex items-center select-none whitespace-nowrap text-white/85"
      style={{ fontSize: baseFontSize, gap: "min(1.5vw, 1rem)", fontFeatureSettings: "'tnum' 1" }}
    >
      <span className="font-normal" style={{ fontSize: "0.85em" }}>{city}</span>
      <span style={{ fontSize: "1.15em" }}>{getWeatherIcon(data.weatherCode, data.isDay)}</span>
      <ClothingIcon level={clothingLevel} size={28} />
      <span className="font-light">
        {data.temperature.toFixed(1)}
        <span style={{ fontSize: "0.55em" }} className="ml-[0.05em]">℃</span>
      </span>
      <span className="text-white/40 font-light" style={{ fontSize: "0.7em" }}>
        <span className="text-red-400/70">{data.tempMax.toFixed(1)}</span>
        <span className="mx-[0.1em] text-white/30">/</span>
        <span className="text-blue-400/70">{data.tempMin.toFixed(1)}</span>
      </span>
      <span className="text-white/40 font-light ml-auto">
        {data.humidity}
        <span style={{ fontSize: "0.55em" }} className="ml-[0.05em]">%</span>
      </span>
    </div>
  );
}
