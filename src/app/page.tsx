import PowersGame from "./powers-game";

const powers = Array.from({ length: 12 }, (_, index) => ({
  exponent: index,
  value: 2 ** index,
}));

const timeline = [
  {
    title: "Ancient doubling",
    text: "Long before computers, people noticed the magic of repeated doubling in trade, measurement, and stories like the wheat-and-chessboard puzzle. Powers of 2 feel simple at first, then suddenly enormous.",
  },
  {
    title: "Binary changed everything",
    text: "In the 17th century, Gottfried Wilhelm Leibniz championed binary, showing how all numbers could be built from just 0 and 1. That idea became the skeleton of modern computing.",
  },
  {
    title: "From cells to chips",
    text: "Powers of 2 show up whenever systems branch, split, replicate, or encode information efficiently. They are deeply practical, not just pretty.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-10 sm:px-10 lg:px-12">
      <section className="grid gap-8 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(103,232,249,0.16),_transparent_25%),radial-gradient(circle_at_top_right,_rgba(217,70,239,0.16),_transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.98))] p-8 shadow-2xl shadow-cyan-950/20 lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Powers of 2</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            A love letter to the most elegant doubling pattern in mathematics.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            Powers of 2 are beautiful because they turn a tiny rule into a vast universe. Start with 1, keep doubling,
            and you get a sequence that is clean, explosive, and strangely poetic. It reveals how growth works,
            how information is stored, and why simple rules can build astonishing complexity.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
            <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2">doubling</span>
            <span className="rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 px-4 py-2">binary</span>
            <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2">fractals</span>
            <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2">modern computing</span>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300">In nature and the modern world</p>
          <div className="mt-4 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.12),rgba(168,85,247,0.12),rgba(16,185,129,0.12))] p-5">
            <div className="grid min-h-[320px] grid-cols-2 gap-3">
              {Array.from({ length: 16 }, (_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center rounded-2xl border border-white/10 bg-slate-950/55 text-center text-xs font-medium text-slate-200 shadow-lg shadow-black/20"
                >
                  {index < 8 ? `${2 ** index} branching cells` : `${2 ** (index - 8)} bits / memory blocks`}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            The left side hints at branching growth, cell division, and repeating structures in nature. The right side nods to bits,
            bytes, memory sizes, image textures, and the binary logic running under nearly every digital thing you touch.
          </p>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Why mathematicians adore them</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Simple rule, wild consequences</h2>
          <div className="mt-6 space-y-5 text-slate-200">
            <p>
              Powers of 2 are the purest example of exponential growth. Every step feels modest, but the overall curve rises with startling speed.
              That contrast, tiny local change, huge global effect, is part of their charm.
            </p>
            <p>
              They also play beautifully with symmetry and structure. In binary, every new power of 2 is just a single 1 followed by zeros.
              In geometry and computation, they often mark thresholds where a system doubles in capacity.
            </p>
            <p>
              And yes, fractals are connected here. Fractals are not simply powers of 2, but many fractal processes involve recursive splitting,
              self-similarity, and branching patterns that echo doubling. When a structure keeps dividing into smaller copies of itself,
              you are often feeling the spirit of powers of 2, even when the exact numbers get more complicated.
            </p>
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300">Brief history and practical use</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">From old puzzles to modern machines</h2>
          <div className="mt-6 space-y-5">
            {timeline.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 leading-7 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-5 text-slate-200">
            <p className="font-medium text-white">Why it matters in practice</p>
            <p className="mt-2 leading-7">
              Computer memory, file sizes, processor logic, networking, compression, data structures, game maps, and graphics all lean on powers of 2.
              They make systems easier to encode, align, split, and scale.
            </p>
          </div>
        </article>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">The sequence</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">The first twelve powers</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-300">
            Each term doubles the one before it. That tiny repeated move is the whole trick, and also the whole wonder.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {powers.map((power) => (
            <div key={power.exponent} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">2^{power.exponent}</p>
              <p className="mt-3 text-3xl font-semibold text-white">{power.value}</p>
            </div>
          ))}
        </div>
      </section>

      <PowersGame />
    </main>
  );
}
