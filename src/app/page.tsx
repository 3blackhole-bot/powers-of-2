import PowersGame from "./powers-game";

const powers = Array.from({ length: 16 }, (_, index) => ({
  exponent: index,
  value: 2 ** index,
}));

const timeline = [
  {
    title: "Ancient doubling",
    text: "Trade, counting systems, and famous puzzles all stumbled into exponential growth long before modern math formalized it.",
  },
  {
    title: "Binary changed everything",
    text: "Leibniz made binary feel profound, and computing later turned it into the language of machines.",
  },
  {
    title: "From cells to chips",
    text: "Branching biology and digital infrastructure both keep bumping into powers of 2 because splitting cleanly is useful.",
  },
];

const museumFacts = [
  "A chessboard grain-of-rice story is really a powers-of-2 explosion in disguise.",
  "Every extra bit doubles the number of states a computer can represent.",
  "Many fractal trees feel power-of-2-ish because they branch recursively.",
  "Image textures and game assets often use power-of-2 dimensions for efficiency.",
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-6 sm:gap-16 sm:px-6 sm:py-10 lg:px-12">
      <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(103,232,249,0.16),_transparent_25%),radial-gradient(circle_at_top_right,_rgba(217,70,239,0.16),_transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.98))] p-5 shadow-2xl shadow-cyan-950/20 sm:gap-8 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Powers of 2</p>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
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
          <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300">Powers of 2 in one picture</p>
          <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.12),_transparent_45%),linear-gradient(180deg,rgba(15,23,42,0.95),rgba(2,6,23,0.95))] p-4 sm:p-5">
            <div className="relative min-h-[420px] overflow-hidden rounded-[1.25rem] border border-white/10 bg-slate-950/70 sm:min-h-[340px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.18),transparent_24%),radial-gradient(circle_at_80%_25%,rgba(34,211,238,0.18),transparent_22%),radial-gradient(circle_at_70%_78%,rgba(217,70,239,0.16),transparent_25%)]" />
              <div className="absolute left-[14%] top-[16%] h-40 w-px rotate-[-16deg] bg-emerald-200/40 sm:left-[18%]" />
              <div className="absolute left-[14%] top-[22%] h-16 w-px rotate-45 bg-emerald-200/40 sm:left-[18%]" />
              <div className="absolute left-[14%] top-[22%] h-16 w-px -rotate-45 bg-emerald-200/40 sm:left-[18%]" />
              <div className="absolute left-[10%] top-[36%] h-10 w-px rotate-[60deg] bg-emerald-200/35" />
              <div className="absolute left-[18%] top-[36%] h-10 w-px rotate-[20deg] bg-emerald-200/35" />
              <div className="absolute left-[20%] top-[36%] h-10 w-px -[... ELLIPSIZATION ...]e-pink-300/10 px-4 py-2 text-pink-100">256 states</div>
              <div className="absolute right-[16%] top-[74%] rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-cyan-100">1024 memory cells</div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            One image, two worlds: branching growth in nature on the left, bit-based infrastructure on the right.
          </p>
        </div>
      </section>

      <section className="grid gap-6 sm:gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-8">
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
              self-similarity, and branching patterns that echo doubling.
            </p>
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-5 sm:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300">History and practical uses</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">From puzzles to processors</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {timeline.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-3 h-28 rounded-xl border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(16,185,129,0.12),rgba(217,70,239,0.16))] p-3 text-xs text-white">
                  <div className="flex h-full items-end justify-between">
                    <span>{item.title}</span>
                    <span className="rounded-full bg-slate-950/50 px-2 py-1">2x</span>
                  </div>
                </div>
                <p className="text-sm leading-6 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-slate-200">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "memory",
                "compression",
                "graphics",
                "networking",
                "game maps",
                "data structures",
              ].map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-slate-950/45 px-3 py-4 text-center text-sm font-medium text-white">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-5 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300">The sequence</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Watch it build</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-300">
              A single row makes the acceleration easier to feel.
            </p>
          </div>
          <div className="mt-6 overflow-x-auto pb-2">
            <div className="flex min-w-max items-center gap-3">
              {powers.map((power, index) => (
                <div key={power.exponent} className="flex items-center gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center">
                    <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">2^{power.exponent}</p>
                    <p className="mt-1 text-lg font-semibold text-white">{power.value}</p>
                  </div>
                  {index < powers.length - 1 ? <span className="text-slate-500">→</span> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-300">Mini math museum</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Four delightful facts</h2>
          <div className="mt-6 grid gap-4">
            {museumFacts.map((fact, index) => (
              <div key={fact} className="rounded-2xl border border-white/10 bg-slate-950/55 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">Exhibit {index + 1}</p>
                <p className="mt-2 leading-7 text-slate-200">{fact}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <PowersGame />
    </main>
  );
}
