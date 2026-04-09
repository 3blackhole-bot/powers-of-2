"use client";

import { useEffect, useMemo, useState } from "react";

type LeaderboardEntry = {
  name: string;
  score: number;
  createdAt: string;
};

function formatPower(exponent: number) {
  return `2^${exponent}`;
}

export default function PowersGame() {
  const [name, setName] = useState("");
  const [currentExponent, setCurrentExponent] = useState(0);
  const [guess, setGuess] = useState("1");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Start at 2^0. Type the next power of 2 each turn.");
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

  const expectedValue = useMemo(() => String(2 ** (currentExponent + 1)), [currentExponent]);

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
      setGuess(String(2 ** (nextExponent + 1)));
      setMessage(`Correct. ${formatPower(nextExponent)} = ${2 ** nextExponent}. Keep going.`);
      return;
    }

    const finalScore = score;
    setMessage(`Almost. The next value after ${formatPower(currentExponent)} is ${expectedValue}. Your score: ${finalScore}.`);
    await saveScore(finalScore);
    setCurrentExponent(0);
    setScore(0);
    setGuess("1");
  }

  function resetGame() {
    setCurrentExponent(0);
    setScore(0);
    setGuess("1");
    setMessage("Reset. Start again from 2^0 and build upward.");
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
            <p className="mt-1 text-2xl font-semibold text-white">{formatPower(currentExponent)} = {2 ** currentExponent}</p>
          </div>
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
