import ClothingIcon from "@/components/ClothingIcon";

const levels = [
  { level: 0, temp: "28℃〜", label: "半袖Tシャツ" },
  { level: 1, temp: "23〜28℃", label: "薄手シャツ" },
  { level: 2, temp: "18〜23℃", label: "長袖シャツ" },
  { level: 3, temp: "13〜18℃", label: "ジャケット" },
  { level: 4, temp: "8〜13℃", label: "コート" },
  { level: 5, temp: "3〜8℃", label: "厚手コート" },
  { level: 6, temp: "〜3℃", label: "ダウン" },
];

export default function IconsPage() {
  return (
    <main className="min-h-screen p-10 flex flex-col items-center gap-8">
      <h1 className="text-2xl font-light mb-4">服装アイコン一覧</h1>
      <div className="grid grid-cols-7 gap-8">
        {levels.map(({ level, temp, label }) => (
          <div key={level} className="flex flex-col items-center gap-4">
            <div className="text-sm opacity-50">{temp}</div>
            <div className="bg-white/10 rounded-xl p-6">
              <ClothingIcon level={level} size={80} />
            </div>
            <div className="text-sm">{label}</div>
            <div className="bg-white/10 rounded-lg p-3">
              <ClothingIcon level={level} size={40} />
            </div>
            <div className="bg-white/10 rounded-md p-2">
              <ClothingIcon level={level} size={28} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
