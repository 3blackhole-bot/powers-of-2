"use client";

import { useEffect, useMemo, useState } from "react";

type LeaderboardEntry = {
  name: string;
  score: number;
  createdAt: string;
};

const funFacts = [
  "2^1 = 2, the first leap from one thing to a pair.",
  "2^2 = 4, the number of quadrants, cardinal directions, and a very stable square.",
  "2^3 = 8, the number of corners on a cube.",
  "2^4 = 16, a classic memory and color threshold in early computing systems.",
  "2^5 = 32, enough branches to start feeling tree-like.",
  "2^6 = 64, a beloved number in games, processors, and chessboard geometry.",
  "2^7 = 128, a classic byte-scale milestone.",
  "2^8 = 256, exactly how many values fit in one unsigned byte.",
  "2^9 = 512, a storage size you still see everywhere.",
  "2^10 = 1024, the famous almost-a-thousand that anchors kilobytes.",
  "2^11 = 2048, enough to feel genuinely big in your head.",
  "2^12 = 4096, a familiar texture and memory dimension.",
  "2^13 = 8192, now the numbers start running away from intuition.",
  "2^14 = 16384, exponential growth getting loud.",
  "2^15 = 32768, a classic signed integer limit landmark.",
  "2^16 = 65536, one of the great powers of 2 in digital systems.",
];

function formatPower(exponent: number) {
  return `2^${exponent}`;
}

function getPowerValue(exponent: number) {
  return BigInt(2) ** BigInt(exponent);
}

function getExpectedValue(exponent: number) {
  return getPowerValue(exponent + 1).toString();
}

export default function PowersGame() {
  const [name, setName] = useState("");
  const [currentExponent, setCurrentExponent] = useState(0);
  const [guess, setGuess] = useState("2");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Start at 2^0 = 1, then type 2 as the next power.");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [highScore, setHighScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  async function loadLeaderboard() {
    const response = await fetch("/api/leaderboard", { cache: "no-store" });
    const data = (await response.json()) as { entries: LeaderboardEntry[]; highScore: number };
    setEntries(data.entries);
    setHighScore(data.highScore);
  }

  useEffect(() => {
    loadLeaderboard().catch(() => {
      setMessage("Couldn’t load the leaderboard, but the game still works.");
    });
  }, []);

  const expectedValue = useMemo(() => getExpectedValue(currentExponent), [currentExponent]);
  const currentFact = useMemo(
    () => funFacts[Math.min(currentExponent, funFacts.length - 1)] ?? "Doubling never stops being dramatic.",
    [currentExponent],
  );

  async function saveScore(finalScore: number) {
    if (!name.trim()) {
      setMessage(`Nice run. You reached ${finalScore}, but add your name to save it to the leaderboard.`);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, score: finalScore }),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || "Couldn’t save score.");
        return;
      }

      setEntries(data.entries);
      setHighScore(data.highScore);
    } catch {
      setMessage("Couldn’t save your score right now.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (guess.trim() === expectedValue) {
      const nextScore = score + 1;
      const nextExponent = currentExponent + 1;
      setScore(nextScore);
      setCurrentExponent(nextExponent);
      setGuess(getExpectedValue(nextExponent));
      setMessage(`Correct. ${formatPower(nextExponent)} = ${getPowerValue(nextExponent).toString()}. ${funFacts[Math.min(nextExponent, funFacts.length - 1)] ?? "Still doubling, still gorgeous."}`);
      return;
    }

    const finalScore = score;
    setMessage(`Almost. The next value after ${formatPower(currentExponent)} is ${expectedValue}. Your score: ${finalScore}.`);
    await saveScore(finalScore);
    setCurrentExponent(0);
    setScore(0);
    setGuess("2");
  }

  function resetGame() {
    setCurrentExponent(0);
    setScore(0);
    setGuess("2");
    setMessage("Reset. Start from 2^0 = 1 and race upward again.");
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Game</p>
            <h3 className="text-2xl font-semibold text-white">Chase the next power</h3>
          </div>
          <div className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
            Score <span className="font-bold text-white">{score}</span>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm text-slate-200">
            Your name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ada, Grace, Angela..."
              className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-300"
            />
          </label>
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Current anchor</p>
            <p className="mt-1 text-2xl font-semibold text-white">{formatPower(currentExponent)} = {getPowerValue(currentExponent).toString()}</p>
          </div>
        </div>

        <div className="mb-4 rounded-2xl border border-fuchsia-300/20 bg-fuchsia-400/10 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-200">Fun fact unlocked</p>
          <p className="mt-2 leading-7 text-slate-200">{currentFact}</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <input
            inputMode="numeric"
            value={guess}
            onChange={(event) => setGuess(event.target.value.replace(/[^0-9]/g, ""))}
            placeholder="Type the next number"
            className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-lg text-white outline-none placeholder:text-slate-500 focus:border-cyan-300"
          />
          <button
            type="submit"
            className="rounded-2xl bg-cyan-300 px-6 py-4 font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Check answer
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={resetGame}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300 hover:text-white"
          >
            Reset
          </button>
          <div className="rounded-full bg-fuchsia-400/10 px-4 py-2 text-sm text-fuchsia-200">
            Highest score ever: <span className="font-bold text-white">{highScore}</span>
          </div>
          <div className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
            Next target: <span className="font-bold text-white">{formatPower(currentExponent + 1)}</span>
          </div>
          {submitting ? <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-300">Saving score...</div> : null}
        </div>

        <p className="mt-5 text-sm leading-7 text-slate-300">{message}</p>
      </div>

      <aside className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
        <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300">Leaderboard</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">Hall of exponential fame</h3>
        <ol className="mt-6 space-y-3">
          {entries.length === 0 ? (
            <li className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-sm text-slate-400">
              No scores yet. Be the first legend.
            </li>
          ) : (
            entries.map((entry, index) => (
              <li
                key={`${entry.name}-${entry.createdAt}-${index}`}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-white">#{index + 1} {entry.name}</p>
                  <p className="text-xs text-slate-400">Saved {new Date(entry.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-lg font-semibold text-cyan-200">{entry.score}</div>
              </li>
            ))
          )}
        </ol>
      </aside>
    </section>
  );
}
