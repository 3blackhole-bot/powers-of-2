"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

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

const MAX_LIVES = 3;

function formatPower(exponent: number) {
  return `2^${exponent}`;
}

function getPowerValue(exponent: number) {
  return BigInt(2) ** BigInt(exponent);
}

function getExpectedValue(exponent: number) {
  return getPowerValue(exponent + 1).toString();
}

function getCelebration(score: number) {
  if (score >= 12) return "⚡ Exponential beast.";
  if (score >= 8) return "✨ You are properly dangerous now.";
  if (score >= 4) return "🌙 Nice streak.";
  return "";
}

export default function PowersGame() {
  const [name, setName] = useState("");
  const [currentExponent, setCurrentExponent] = useState(0);
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [livesLeft, setLivesLeft] = useState(MAX_LIVES);
  const [correctHistory, setCorrectHistory] = useState<string[]>(["2^0 = 1"]);
  const [message, setMessage] = useState("Start at 2^0 = 1, then type the next power yourself.");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [highScore, setHighScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [mode, setMode] = useState<"classic" | "timed" | "reverse">("classic");
  const [timeLeft, setTimeLeft] = useState(45);

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

  useEffect(() => {
    if (mode !== "timed") return;
    if (timeLeft <= 0) return;

    const timer = window.setTimeout(() => {
      setTimeLeft((value) => value - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [mode, timeLeft]);

  const expectedValue = useMemo(() => {
    if (mode === "reverse") {
      return currentExponent <= 0 ? "1" : getPowerValue(currentExponent - 1).toString();
    }
    return getExpectedValue(currentExponent);
  }, [currentExponent, mode]);

  const nextPrompt = useMemo(() => {
    if (mode === "reverse") {
      return currentExponent <= 0 ? "Return to 2^0" : `Previous target: ${formatPower(currentExponent - 1)}`;
    }
    return `Next target: ${formatPower(currentExponent + 1)}`;
  }, [currentExponent, mode]);

  const currentFact = useMemo(
    () => funFacts[Math.min(currentExponent, funFacts.length - 1)] ?? "Doubling never stops being dramatic.",
    [currentExponent],
  );

  const saveScore = useCallback(async (finalScore: number) => {
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
      setMessage((current) => `${current} Score saved for ${name}.`);
    } catch {
      setMessage("Couldn’t save your score right now.");
    } finally {
      setSubmitting(false);
    }
  }, [name]);

  const finishRun = useCallback(async (finalMessage: string) => {
    const finalScore = score;
    setMessage(finalMessage);
    await saveScore(finalScore);
    resetGameState(mode);
  }, [mode, saveScore, score]);

  useEffect(() => {
    if (mode === "timed" && timeLeft === 0) {
      void finishRun(`Time's up. Final score: ${score}.`);
    }
  }, [finishRun, mode, score, timeLeft]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (guess.trim() === expectedValue) {
      const nextScore = score + 1;
      const nextExponent = mode === "reverse" ? Math.max(currentExponent - 1, 0) : currentExponent + 1;
      const solvedExponent = mode === "reverse" ? Math.max(currentExponent - 1, 0) : currentExponent + 1;
      const solvedEntry = `${formatPower(solvedExponent)} = ${getPowerValue(solvedExponent).toString()}`;

      setScore(nextScore);
      setCurrentExponent(nextExponent);
      setCorrectHistory((history) => [...history, solvedEntry]);
      setGuess("");
      setShowCelebration(true);
      window.setTimeout(() => setShowCelebration(false), 900);
      setMessage(`Correct. ${solvedEntry}. ${funFacts[Math.min(solvedExponent, funFacts.length - 1)] ?? "Still doubling, still gorgeous."} ${getCelebration(nextScore)}`.trim());
      return;
    }

    const nextLives = livesLeft - 1;

    if (nextLives > 0) {
      setLivesLeft(nextLives);
      setGuess("");
      setMessage(`Not quite. You lose a life, but stay in the game. ${nextLives} ${nextLives === 1 ? "life" : "lives"} left.`);
      return;
    }

    await finishRun(`Crash out. ${mode === "reverse" ? "The previous value" : "The next value"} was ${expectedValue}. Final score: ${score}.`);
  }

  function resetGameState(nextMode = mode) {
    setCurrentExponent(nextMode === "reverse" ? 12 : 0);
    setScore(0);
    setLivesLeft(MAX_LIVES);
    setGuess("");
    setCorrectHistory(nextMode === "reverse" ? ["2^12 = 4096"] : ["2^0 = 1"]);
    setTimeLeft(45);
  }

  function resetGame(nextMode = mode) {
    resetGameState(nextMode);
    setMessage(nextMode === "reverse" ? "Reverse mode. Walk backward through the powers." : "Reset. Start from 2^0 = 1 and build upward again.");
  }

  function switchMode(nextMode: "classic" | "timed" | "reverse") {
    setMode(nextMode);
    resetGame(nextMode);
  }

  async function copyShareCard() {
    const text = `${name || "Anonymous"} scored ${score} on Powers of 2. Highest score ever: ${highScore}. Try it at https://powers-of-2.vercel.app`;
    await navigator.clipboard.writeText(text);
    setShareCopied(true);
    window.setTimeout(() => setShareCopied(false), 1400);
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-cyan-950/20 backdrop-blur sm:p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {([
            ["classic", "Classic"],
            ["timed", "Timed"],
            ["reverse", "Reverse"],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => switchMode(value)}
              className={`rounded-full px-4 py-2 text-sm transition ${mode === value ? "bg-cyan-300 text-slate-950" : "border border-white/10 text-slate-200 hover:border-cyan-300"}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Game</p>
            <h3 className="text-2xl font-semibold text-white">Chase the next power</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              Score <span className="font-bold text-white">{score}</span>
            </div>
            <div className="rounded-full bg-rose-400/10 px-4 py-2 text-sm text-rose-200">
              Lives <span className="font-bold text-white">{Array.from({ length: livesLeft }, () => "♥").join(" ")}</span>
            </div>
            {mode === "timed" ? (
              <div className="rounded-full bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                Time <span className="font-bold text-white">{timeLeft}s</span>
              </div>
            ) : null}
          </div>
        </div>

        {showCelebration ? (
          <div className="mb-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-3 text-sm text-emerald-100 animate-pulse">
            Correct streak building 🌟
          </div>
        ) : null}

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
            <p className="mt-1 break-all text-xl font-semibold text-white sm:text-2xl">{formatPower(currentExponent)} = {getPowerValue(currentExponent).toString()}</p>
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
            onClick={() => resetGame()}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300 hover:text-white"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => void copyShareCard()}
            className="rounded-full border border-fuchsia-300/20 bg-fuchsia-300/10 px-4 py-2 text-sm text-fuchsia-100 transition hover:bg-fuchsia-300/20"
          >
            {shareCopied ? "Copied" : "Share score card"}
          </button>
          <div className="rounded-full bg-fuchsia-400/10 px-4 py-2 text-sm text-fuchsia-200">
            Highest score ever: <span className="font-bold text-white">{highScore}</span>
          </div>
          <div className="rounded-full bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
            {nextPrompt}
          </div>
          {submitting ? <div className="rounded-full bg-white/10 px-4 py-2 text-sm text-slate-300">Saving score...</div> : null}
        </div>

        <p className="mt-5 text-sm leading-7 text-slate-300">{message}</p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/45 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm uppercase tracking-[0.25em] text-amber-300">Correct submissions so far</p>
            <p className="text-xs text-slate-400">{correctHistory.length} unlocked</p>
          </div>
          <div className="mt-4 flex max-h-56 flex-wrap gap-2 overflow-y-auto">
            {correctHistory.map((entry) => (
              <div
                key={entry}
                className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-2 text-xs text-amber-100 sm:text-sm"
              >
                {entry}
              </div>
            ))}
          </div>
        </div>
      </div>

      <aside className="rounded-3xl border border-white/10 bg-slate-950/60 p-4 sm:p-6">
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
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-white">#{index + 1} {entry.name}</p>
                  <p className="text-xs text-slate-400">Saved {new Date(entry.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="shrink-0 text-lg font-semibold text-cyan-200">{entry.score}</div>
              </li>
            ))
          )}
        </ol>
      </aside>
    </section>
  );
}
