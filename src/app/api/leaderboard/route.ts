import { promises as fs } from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const leaderboardPath = path.join(dataDir, "leaderboard.json");

type LeaderboardEntry = {
  name: string;
  score: number;
  createdAt: string;
};

async function ensureLeaderboardFile() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(leaderboardPath);
  } catch {
    await fs.writeFile(leaderboardPath, "[]\n", "utf8");
  }
}

async function readLeaderboard(): Promise<LeaderboardEntry[]> {
  await ensureLeaderboardFile();
  const raw = await fs.readFile(leaderboardPath, "utf8");

  try {
    const parsed = JSON.parse(raw) as LeaderboardEntry[];
    return parsed
      .filter((entry) => entry && typeof entry.name === "string" && typeof entry.score === "number")
      .sort((a, b) => b.score - a.score || a.createdAt.localeCompare(b.createdAt))
      .slice(0, 10);
  } catch {
    return [];
  }
}

async function writeLeaderboard(entries: LeaderboardEntry[]) {
  await ensureLeaderboardFile();
  await fs.writeFile(leaderboardPath, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
}

export async function GET() {
  const entries = await readLeaderboard();
  const highScore = entries[0]?.score ?? 0;

  return Response.json({ entries, highScore });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<LeaderboardEntry>;
  const name = body.name?.trim();
  const score = body.score;

  if (!name || name.length < 2 || name.length > 30) {
    return Response.json({ error: "Name must be 2 to 30 characters." }, { status: 400 });
  }

  if (typeof score !== "number" || !Number.isInteger(score) || score < 0 || score > 60) {
    return Response.json({ error: "Score must be an integer between 0 and 60." }, { status: 400 });
  }

  const entries = await readLeaderboard();
  const nextEntries = [
    ...entries,
    {
      name,
      score,
      createdAt: new Date().toISOString(),
    },
  ]
    .sort((a, b) => b.score - a.score || a.createdAt.localeCompare(b.createdAt))
    .slice(0, 10);

  await writeLeaderboard(nextEntries);

  return Response.json({ entries: nextEntries, highScore: nextEntries[0]?.score ?? 0 });
}
