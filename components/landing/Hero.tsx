import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex min-h-[90vh] w-full flex-col items-center justify-center px-6 text-center">
      <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/60 px-4 py-1.5 text-xs font-medium text-zinc-600 backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        简历 + 个人网站 · 一站搞定
      </span>

      <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-zinc-900 sm:text-6xl">
        5 分钟，做一份
        <br className="hidden sm:block" />
        能打动人的简历
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
        不只导出 PDF，更生成一个可分享的个人简历网站。
        <br className="hidden sm:block" />
        所见即所得，数据永不丢失。
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/templates"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 text-base font-medium text-white shadow-lg shadow-zinc-900/10 transition hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-900/20"
        >
          开始制作
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
        <a
          href="#features"
          className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-6 text-base font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
        >
          了解更多
        </a>
      </div>

      <p className="mt-12 text-xs tracking-[0.3em] text-zinc-400">
        SCROLL ↓
      </p>
    </section>
  );
}
