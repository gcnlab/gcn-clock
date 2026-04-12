import Clock from "@/components/Clock";
import DateDisplay from "@/components/DateDisplay";
import WeatherRow from "@/components/Weather";

export default function Home() {
  return (
    <main
      className="flex flex-col justify-between mx-auto px-[4vw] py-[3vh]"
      style={{
        width: "100vw",
        height: "100vh",
        maxWidth: "1280px",
        maxHeight: "1024px",
      }}
    >
      {/* Clock - upper area */}
      <div className="flex items-center justify-center" style={{ flex: "1.2" }}>
        <Clock />
      </div>

      {/* Horizontal divider */}
      <div className="w-full border-t border-white/40" />

      {/* Bottom: Weather (left) | Date (right) */}
      <div className="flex w-full" style={{ flex: "0.8" }}>
        {/* Weather panel - left */}
        <div className="flex-1 flex flex-col justify-center gap-[2.5vh] pr-[3vw]">
          <WeatherRow city="京都" lat={35.0116} lon={135.7681} />
          <WeatherRow city="大阪" lat={34.6937} lon={135.5023} />
        </div>

        {/* Vertical divider */}
        <div className="border-l border-white/40" />

        {/* Date panel - right */}
        <div className="flex-1 flex items-center justify-center pl-[3vw]">
          <DateDisplay />
        </div>
      </div>
    </main>
  );
}
