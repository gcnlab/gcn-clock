"use client";

interface Props {
  level: number;
  size?: number;
}

export default function ClothingIcon({ level, size = 28 }: Props) {
  const c = "currentColor";
  const o = 0.85; // main opacity

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      {level === 0 && (
        /* 半袖Tシャツ - ミニマルシルエット */
        <path
          d="M14 8 L11 8 L4 14 L8 16 L11 12 L11 33 L29 33 L29 12 L32 16 L36 14 L29 8 L26 8 C26 8 24 13 20 13 C16 13 14 8 14 8Z"
          fill={c} opacity={o}
        />
      )}

      {level === 1 && (
        /* ポロシャツ - 襟付き半袖 */
        <>
          <path
            d="M15 10 L11 10 L4 16 L8 18 L11 14 L11 33 L29 33 L29 14 L32 18 L36 16 L29 10 L25 10 C25 10 23 14 20 14 C17 14 15 10 15 10Z"
            fill={c} opacity={o}
          />
          {/* 襟 */}
          <path
            d="M15 10 L18 15 L20 12 L22 15 L25 10"
            fill="var(--background, #0f172a)" stroke={c} strokeWidth="0.5" opacity={o}
          />
          {/* ボタン2つ */}
          <circle cx="20" cy="17" r="0.7" fill="var(--background, #0f172a)" opacity="0.6" />
          <circle cx="20" cy="20" r="0.7" fill="var(--background, #0f172a)" opacity="0.6" />
        </>
      )}

      {level === 2 && (
        /* 長袖シャツ - 襟付き、袖が長い */
        <>
          <path
            d="M15 8 L11 8 L2 26 L6 27 L11 12 L11 33 L29 33 L29 12 L34 27 L38 26 L29 8 L25 8 C25 8 23 12 20 12 C17 12 15 8 15 8Z"
            fill={c} opacity={o}
          />
          <path
            d="M15 8 L18 13 L20 10 L22 13 L25 8"
            fill="var(--background, #0f172a)" stroke={c} strokeWidth="0.5" opacity={o}
          />
          <circle cx="20" cy="16" r="0.7" fill="var(--background, #0f172a)" opacity="0.6" />
          <circle cx="20" cy="19" r="0.7" fill="var(--background, #0f172a)" opacity="0.6" />
          <circle cx="20" cy="22" r="0.7" fill="var(--background, #0f172a)" opacity="0.6" />
        </>
      )}

      {level === 3 && (
        /* ジャケット - 長袖、ジッパー */
        <>
          <path
            d="M15 7 L11 7 L2 26 L6 27 L11 11 L11 33 L29 33 L29 11 L34 27 L38 26 L29 7 L25 7 C25 7 23 12 20 12 C17 12 15 7 15 7Z"
            fill={c} opacity={o}
          />
          {/* 前開きライン */}
          <line x1="20" y1="12" x2="20" y2="33" stroke="var(--background, #0f172a)" strokeWidth="1.2" opacity="0.5" />
          {/* ポケット */}
          <rect x="13" y="23" width="5" height="3" rx="0.5" fill="none" stroke="var(--background, #0f172a)" strokeWidth="0.8" opacity="0.35" />
          <rect x="22" y="23" width="5" height="3" rx="0.5" fill="none" stroke="var(--background, #0f172a)" strokeWidth="0.8" opacity="0.35" />
        </>
      )}

      {level === 4 && (
        /* コート - 長袖、丈長、ラペル */
        <>
          <path
            d="M15 5 L11 5 L2 25 L6 26 L11 9 L10 35 L30 35 L29 9 L34 26 L38 25 L29 5 L25 5 C25 5 23 10 20 10 C17 10 15 5 15 5Z"
            fill={c} opacity={o}
          />
          {/* ラペル（襟） */}
          <path
            d="M15 5 L17 14 L20 10 L23 14 L25 5"
            fill="var(--background, #0f172a)" opacity="0.6"
          />
          {/* 前開きライン */}
          <line x1="20" y1="10" x2="20" y2="35" stroke="var(--background, #0f172a)" strokeWidth="1" opacity="0.4" />
          {/* ボタン */}
          <circle cx="20" cy="17" r="0.9" fill="var(--background, #0f172a)" opacity="0.5" />
          <circle cx="20" cy="22" r="0.9" fill="var(--background, #0f172a)" opacity="0.5" />
          <circle cx="20" cy="27" r="0.9" fill="var(--background, #0f172a)" opacity="0.5" />
        </>
      )}

      {level === 5 && (
        /* 厚手コート + マフラー */
        <>
          <path
            d="M15 9 L11 9 L2 27 L6 28 L11 13 L10 35 L30 35 L29 13 L34 28 L38 27 L29 9 L25 9 C25 9 23 13 20 13 C17 13 15 9 15 9Z"
            fill={c} opacity={o}
          />
          {/* マフラー */}
          <path
            d="M12 5 Q16 2 20 3 Q24 2 28 5 Q27 10 24 11 L23 16 L21 16 L22 10 Q20 8 18 10 L19 16 L17 16 L16 11 Q13 10 12 5Z"
            fill={c} opacity="0.95"
          />
          <path
            d="M12 5 Q16 2 20 3 Q24 2 28 5 Q27 10 24 11 L23 16 L21 16 L22 10 Q20 8 18 10 L19 16 L17 16 L16 11 Q13 10 12 5Z"
            stroke="var(--background, #0f172a)" strokeWidth="0.6" fill="none" opacity="0.4"
          />
          {/* 前開きライン */}
          <line x1="20" y1="16" x2="20" y2="35" stroke="var(--background, #0f172a)" strokeWidth="1" opacity="0.35" />
          <circle cx="20" cy="21" r="0.9" fill="var(--background, #0f172a)" opacity="0.4" />
          <circle cx="20" cy="26" r="0.9" fill="var(--background, #0f172a)" opacity="0.4" />
          <circle cx="20" cy="31" r="0.9" fill="var(--background, #0f172a)" opacity="0.4" />
        </>
      )}

      {level === 6 && (
        /* ダウンジャケット + マフラー - もこもこ、キルティング */
        <>
          {/* ボディ（少し膨らんだシルエット） */}
          <path
            d="M15 9 L10 9 L0 27 L5 28 L10 13 L9 35 L31 35 L30 13 L35 28 L40 27 L30 9 L25 9 C25 9 23 13 20 13 C17 13 15 9 15 9Z"
            fill={c} opacity={o}
          />
          {/* マフラー */}
          <path
            d="M12 5 Q16 2 20 3 Q24 2 28 5 Q27 10 24 11 L23 16 L21 16 L22 10 Q20 8 18 10 L19 16 L17 16 L16 11 Q13 10 12 5Z"
            fill={c} opacity="0.95"
          />
          <path
            d="M12 5 Q16 2 20 3 Q24 2 28 5 Q27 10 24 11 L23 16 L21 16 L22 10 Q20 8 18 10 L19 16 L17 16 L16 11 Q13 10 12 5Z"
            stroke="var(--background, #0f172a)" strokeWidth="0.6" fill="none" opacity="0.4"
          />
          {/* キルティング */}
          <line x1="9" y1="19" x2="31" y2="19" stroke="var(--background, #0f172a)" strokeWidth="0.8" opacity="0.25" />
          <line x1="9" y1="24" x2="31" y2="24" stroke="var(--background, #0f172a)" strokeWidth="0.8" opacity="0.25" />
          <line x1="9" y1="29" x2="31" y2="29" stroke="var(--background, #0f172a)" strokeWidth="0.8" opacity="0.25" />
          {/* 袖キルティング */}
          <line x1="3" y1="22" x2="9" y2="16" stroke="var(--background, #0f172a)" strokeWidth="0.7" opacity="0.2" />
          <line x1="33" y1="16" x2="37" y2="22" stroke="var(--background, #0f172a)" strokeWidth="0.7" opacity="0.2" />
        </>
      )}
    </svg>
  );
}

export function getClothingLevel(temp7am: number | null, temp7pm: number | null): number {
  let basis: number;
  if (temp7am !== null && temp7pm !== null) {
    basis = Math.min(temp7am, temp7pm);
  } else if (temp7am !== null) {
    basis = temp7am;
  } else if (temp7pm !== null) {
    basis = temp7pm;
  } else {
    return 4;
  }

  if (basis >= 28) return 0;
  if (basis >= 23) return 1;
  if (basis >= 18) return 2;
  if (basis >= 13) return 3;
  if (basis >= 8) return 4;
  if (basis >= 3) return 5;
  return 6;
}
