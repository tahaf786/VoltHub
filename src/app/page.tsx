import { formatINR } from "@/lib/money";

// Placeholder home page for the chore/scaffold milestone. The real brand shell,
// hero, catalog, reservation flow and skin designer land on their own feature
// branches (see HANDOFF.md). This exists so the two-tier test suite has a page
// to assert against and the production build has an entry point.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
        Mobile Accessories · Bengaluru
      </p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
        VoltHub
      </h1>
      <p className="max-w-md text-lg text-zinc-400">
        Browse, reserve for in-store pickup, and design your own modular phone
        skin. Sample price: {formatINR(1299)}.
      </p>
      <p className="text-sm text-zinc-600">Scaffold ready — features in progress.</p>
    </main>
  );
}
