import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: "🎨",
    title: "精选模板",
    description: "Modern / Minimalist / Professional，三种经典风格即刻上手，覆盖大多数求职场景。",
  },
  {
    icon: "✍️",
    title: "分屏编辑",
    description: "左侧填写、右侧实时预览，所见即所得。支持三种布局模式，专注当前任务。",
  },
  {
    icon: "📄",
    title: "一键导出 PDF",
    description: "按 A4 尺寸精确排版，打印或邮件投递都清晰专业，告别格式混乱。",
  },
  {
    icon: "🔗",
    title: "发布为个人网站",
    description: "一键生成专属链接，放入邮件签名或 LinkedIn，让你的简历永远在线可访问。",
  },
];

export default function FeatureGrid() {
  return (
    <section
      id="features"
      className="w-full px-6 py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            一个工具，两份成果
          </h2>
          <p className="mt-4 text-base text-zinc-600">
            专业的 PDF 简历 + 可分享的个人网站，数据一次录入，全部搞定。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
