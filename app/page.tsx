import Hero from "@/components/landing/Hero";
import FeatureGrid from "@/components/landing/FeatureGrid";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <FeatureGrid />
      <footer className="border-t border-zinc-200 bg-white px-6 py-8 text-center text-sm text-zinc-500">
        <p>© 2026 Resume Platform. 用心做的简历工具。</p>
        <p className="mt-1.5 text-xs text-zinc-400">
          Crafted by <span className="font-medium text-zinc-600">Changfan Li</span>
        </p>
      </footer>
    </main>
  );
}
