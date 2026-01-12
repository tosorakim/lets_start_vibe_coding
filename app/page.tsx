"use client";

import { useMemo, useState } from "react";

type MoodKey = "지침" | "불안" | "짜증" | "무기력" | "울컥" | "멍함";

const QUESTIONS = [
  "오늘 내가 참았던 말은 뭐였지?",
  "지금 놓아도 되는 건 뭐야?",
  "오늘 나를 가장 지치게 만든 건 뭐였어?",
  "오늘의 나를 한 단어로 부르면 뭐가 떠올라?",
  "내가 오늘 잘한 일 한 가지, 진짜로 뭐였지?",
  "누구에게든—나에게든—미안한 마음이 남아있나?",
  "오늘의 걱정이 내일도 유효할까?",
  "오늘의 나에게 필요한 건 해결이야, 위로야?",
  "지금 내 몸이 먼저 말하는 신호는 뭐야?",
  "오늘 ‘괜찮다’고 말하고 싶은 대상은 누구야?",
];

const MOODS: Record<
  MoodKey,
  {
    title: string;
    temp: string;
    time: string;
    scent: string;
    light: string;
    sound: string;
    note: string;
    after: string;
  }
> = {
  지침: {
    title: "힘이 빠진 날",
    temp: "40°C",
    time: "12분",
    scent: "라벤더",
    light: "조명 낮게",
    sound: "잔잔한 전자피아노",
    note: "오늘은 회복이 목표야. 아무것도 증명하지 않아도 돼.",
    after: "물 밖으로 나오면, 물 한 컵 먼저.",
  },
  불안: {
    title: "머리가 바쁜 날",
    temp: "39°C",
    time: "10분",
    scent: "무향(또는 유칼립투스 아주 약하게)",
    light: "불 끄고 간접등",
    sound: "화이트 노이즈",
    note: "생각을 끊지 말고, 잠깐 ‘띄워두기’.",
    after: "손바닥/발바닥을 천천히 말려줘.",
  },
  짜증: {
    title: "예민한 날",
    temp: "40°C",
    time: "8분",
    scent: "시트러스",
    light: "밝기 중간",
    sound: "비트 낮은 lo-fi",
    note: "짜증은 에너지야. 오늘은 안전하게 빼주자.",
    after: "샤워로 마무리하고 찬물 5초.",
  },
  무기력: {
    title: "아무것도 하기 싫은 날",
    temp: "38.5°C",
    time: "15분",
    scent: "바닐라(또는 파우더향)",
    light: "따뜻한 색 온도",
    sound: "느린 재즈",
    note: "의욕 대신, ‘살아있음’을 먼저 회복.",
    after: "로션은 팔/다리만이라도.",
  },
  울컥: {
    title: "감정이 올라오는 날",
    temp: "39.5°C",
    time: "11분",
    scent: "캐모마일",
    light: "촛불/캔들 가능",
    sound: "가사 없는 음악",
    note: "울컥은 나쁜 게 아니야. 지나가게 두자.",
    after: "수건으로 꾹꾹 눌러 닦기.",
  },
  멍함: {
    title: "아무 생각이 없는 날",
    temp: "39°C",
    time: "9분",
    scent: "머스크(아주 약하게) 또는 무향",
    light: "어두운 편",
    sound: "물소리/앰비언트",
    note: "멍함은 리셋 버튼일 수 있어.",
    after: "목/어깨 스트레칭 30초.",
  },
};

function pickRandomIndex(max: number, exclude?: number) {
  if (max <= 1) return 0;
  let i = Math.floor(Math.random() * max);
  if (exclude !== undefined && i === exclude) i = (i + 1) % max;
  return i;
}

export default function Home() {
  // 뒤돌아보기 질문 카드
  const [qIndex, setQIndex] = useState(() => pickRandomIndex(QUESTIONS.length));
  const question = QUESTIONS[qIndex];

  // 감정 선택 루틴
  const moodKeys = useMemo(() => Object.keys(MOODS) as MoodKey[], []);
  const [mood, setMood] = useState<MoodKey>("지침");
  const ritual = MOODS[mood];

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      {/* Hero */}
      <section className="rounded-3xl border border-neutral-200 bg-neutral-50 p-10">
        <p className="text-sm text-neutral-600">오늘의 나를, 여기서 잠깐 두고 가자.</p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">목욕합시다 🛁</h1>

        <p className="mt-4 text-neutral-700">
          씻는 건 몸부터지만, 정리는 마음부터일 때가 있어.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-full bg-black px-6 py-2 text-white hover:opacity-90">
            오늘의 목욕
          </button>
          <button className="rounded-full border border-neutral-300 px-6 py-2 hover:bg-white">
            주 1회, 짧게 구독
          </button>
        </div>
      </section>

      {/* Two widgets */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {/* 돌아보기 카드 */}
        <article className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">뒤돌아보기</h2>
            <span className="text-xs text-neutral-500">30초</span>
          </div>

          <p className="mt-5 text-2xl font-semibold leading-snug tracking-tight">
            “{question}”
          </p>

          <p className="mt-4 text-sm text-neutral-600">
            답을 찾기보다, 오늘을 정리하는 연습.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setQIndex((prev) => pickRandomIndex(QUESTIONS.length, prev))}
              className="rounded-full bg-black px-5 py-2 text-sm text-white hover:opacity-90"
            >
              다음 질문
            </button>

            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(question);
                } catch {
                  // clipboard permission denied; ignore
                }
              }}
              className="rounded-full border border-neutral-300 px-5 py-2 text-sm hover:bg-neutral-50"
            >
              질문 복사
            </button>
          </div>
        </article>

        {/* 루틴 생성기 */}
        <article className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">오늘의 목욕 루틴</h2>
            <span className="text-xs text-neutral-500">자동 추천</span>
          </div>

          <div className="mt-5">
            <p className="text-sm text-neutral-600">지금 내 상태는</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {moodKeys.map((k) => {
                const active = mood === k;
                return (
                  <button
                    key={k}
                    onClick={() => setMood(k)}
                    className={[
                      "rounded-full px-4 py-2 text-sm transition",
                      active
                        ? "bg-black text-white"
                        : "border border-neutral-300 text-neutral-800 hover:bg-neutral-50",
                    ].join(" ")}
                  >
                    {k}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-neutral-50 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-neutral-500">루틴 이름</p>
                <p className="mt-1 text-lg font-semibold">{ritual.title}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-500">시간</p>
                <p className="mt-1 text-lg font-semibold">{ritual.time}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-neutral-700">
              <div className="flex justify-between">
                <span className="text-neutral-600">물 온도</span>
                <span className="font-medium">{ritual.temp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">향</span>
                <span className="font-medium">{ritual.scent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">조명</span>
                <span className="font-medium">{ritual.light}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">사운드</span>
                <span className="font-medium">{ritual.sound}</span>
              </div>
            </div>

            <p className="mt-5 text-sm text-neutral-600">{ritual.note}</p>
            <p className="mt-2 text-sm text-neutral-600">{ritual.after}</p>
          </div>
        </article>
      </section>

      {/* Today scenes */}
      <section className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold">오늘의 장면</h2>
          <p className="text-sm text-neutral-500">짧게, 조용히</p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold">오늘은 “괜찮아”를 연습하는 날</h3>
            <p className="mt-2 text-sm text-neutral-600">
              40도 · 라벤더 · 12분 — 오늘 내가 참았던 말은 뭐였지?
            </p>
          </article>

          <article className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h3 className="text-lg font-semibold">생각이 많을수록 물은 조용해진다</h3>
            <p className="mt-2 text-sm text-neutral-600">
              39도 · 무향 · 10분 — 지금 놓아도 되는 건 뭐야?
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
