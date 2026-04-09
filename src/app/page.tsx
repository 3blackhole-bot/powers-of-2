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
          <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.12),_transparent_45%),linear-gradient(180deg,rgba(15,23,42,0.95),rgba(2,6,23,0.95))] p-5">
            <div className="relative min-h-[420px] overflow-hidden rounded-[1.25rem] border border-white/10 bg-slate-950/70 sm:min-h-[340px]">
              <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.95))]" />
              <div className="absolute left-1/2 top-8 h-48 w-px -translate-x-1/2 bg-cyan-200/40" />
              <div className="absolute left-1/2 top-16 h-16 w-16 -translate-x-1/2 rounded-full border border-cyan-300/30 bg-cyan-300/10" />
              <div className="absolute left-[calc(50%-7rem)] top-32 h-12 w-px rotate-45 bg-cyan-200/40" />
              <div className="absolute left-[calc(50%+7rem)] top-32 h-12 w-px -rotate-45 bg-cyan-200/40" />
              <div className="absolute left-[calc(50%-10rem)] top-40 h-10 w-px rotate-[65deg] bg-cyan-200/35" />
              <div className="absolute left-[calc(50%-4rem)] top-40 h-10 w-px rotate-[25deg] bg-cyan-200/35" />
              <div className="absolute left-[calc(50%+4rem)] top-40 h-10 w-px -rotate-[25deg] bg-cyan-200/35" />
              <div className="absolute left-[calc(50%+10rem)] top-40 h-10 w-px -rotate-[65deg] bg-cyan-200/35" />

              {[
                { label: "1 seed", className: "left-1/2 top-10 -translate-x-1/2" },
                { label: "2 branches", className: "left-[calc(50%-7rem)] top-28" },
                { label: "4 leaves", className: "left-[calc(50%-10rem)] top-40" },
                { label: "8 leaflets", className: "left-[calc(50%+4rem)] top-40" },
                { label: "16 cells", className: "left-[calc(50%-12rem)] top-52" },
                { label: "32 bits", className: "right-6 top-14" },
                { label: "64 pixels", className: "right-10 top-28" },
                { label: "128 bytes", className: "right-8 top-44" },
                { label: "256 states", className: "right-14 top-60" },
              ].map((node) => (
                <div
                  key={node.label}
                  className={`absolute rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur ${node.className}`}
                >
                  {node.label}
                </div>
              ))}

              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2 sm:bottom-6 sm:left-6 sm:right-6 sm:grid-cols-4">
                {Array.from({ length: 8 }, (_, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-fuchsia-300/20 bg-fuchsia-300/10 px-2 py-3 text-center text-[10px] uppercase tracking-[0.2em] text-fuchsia-100"
                  >
                    {2 ** index}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Think of it as a split-screen metaphor: recursive growth on one side, binary infrastructure on the other.
            Nature branches. Computers count. Powers of 2 quietly sit under both.
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
              self-similarity, and branching patterns that echo doubling. When a structure keeps dividing into smaller copies of itself,
              you are often feeling the spirit of powers of 2, even when the exact numbers get more complicated.
            </p>
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-5 sm:p-8">
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

      <section className="grid gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-5 sm:p-8">
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
