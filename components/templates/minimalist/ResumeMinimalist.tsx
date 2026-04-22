import type { ResumeData, SocialLinks } from "@/lib/schema";

interface Props {
  data: ResumeData;
}

// 极简风：无头像、无导航、无图标。所有内容靠排版与留白撑起。
export default function ResumeMinimalist({ data }: Props) {
  const { profile, education, projects, experience, portfolio, skills, socials } = data;
  const hidden = new Set(data.hiddenSections ?? []);
  const contactLine = formatContactLine(profile.location, socials);

  return (
    <article
      id="top"
      className="w-[794px] min-h-[1123px] bg-white font-sans text-zinc-900"
    >
      <header className="flex break-inside-avoid items-start justify-between gap-8 border-b border-zinc-900 px-20 pb-8 pt-16">
        <div className="min-w-0 flex-1">
          <h1 className="text-4xl font-semibold tracking-tight">
            {profile.name || "你的姓名"}
          </h1>
          {profile.title && (
            <p className="mt-2 text-base text-zinc-600">{profile.title}</p>
          )}
          {contactLine && (
            <p className="mt-4 text-xs tracking-wide text-zinc-500">
              {contactLine}
            </p>
          )}
        </div>
        {profile.avatar && (
          <div
            className={`overflow-hidden bg-zinc-100 shrink-0 ${
              (profile.avatarShape ?? "circle") === "rectangle"
                ? "h-[120px] w-[90px] rounded"
                : "h-24 w-24 rounded-full"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.avatar}
              alt={profile.name || "avatar"}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </header>

      <div className="space-y-10 px-20 py-10">
        {profile.bio && (
          <p className="max-w-prose text-sm leading-relaxed text-zinc-700">
            {profile.bio}
          </p>
        )}

        {!hidden.has("experience") && (
          <Block id="experience" label="EXPERIENCE">
            {experience.length === 0 ? (
              <Empty>补充工作经历后在这里展示</Empty>
            ) : (
              experience.map((e) => (
                <Entry
                  key={e.id}
                  title={e.company}
                  subtitle={e.role}
                  dateRange={formatRange(e.startDate, e.endDate)}
                  description={e.description}
                />
              ))
            )}
          </Block>
        )}

        {!hidden.has("education") && (
          <Block id="education" label="EDUCATION">
            {education.length === 0 ? (
              <Empty>补充学历后在这里展示</Empty>
            ) : (
              education.map((e) => (
                <Entry
                  key={e.id}
                  title={e.school}
                  subtitle={e.major}
                  dateRange={formatRange(e.startDate, e.endDate)}
                  description={e.description}
                />
              ))
            )}
          </Block>
        )}

        {!hidden.has("projects") && (
          <Block id="projects" label="PROJECTS">
            {projects.length === 0 ? (
              <Empty>补充项目后在这里展示</Empty>
            ) : (
              projects.map((p) => (
                <Entry
                  key={p.id}
                  title={p.name}
                  subtitle={p.link}
                  subtitleHref={p.link}
                  dateRange={formatRange(p.startDate, p.endDate)}
                  description={p.description}
                />
              ))
            )}
          </Block>
        )}

        {!hidden.has("portfolio") && portfolio.length > 0 && (
          <Block id="portfolio" label="PORTFOLIO">
            <ul className="space-y-1.5 text-sm text-zinc-700">
              {portfolio.map((p) => (
                <li key={p.id} className="flex items-baseline gap-2">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                  <span>{p.caption || "未命名作品"}</span>
                </li>
              ))}
            </ul>
          </Block>
        )}

        {!hidden.has("skills") && (
          <Block id="skills" label="SKILLS">
            {skills.length === 0 ? (
              <Empty>补充技能后在这里展示</Empty>
            ) : (
              <p className="text-sm leading-relaxed text-zinc-700">
                {skills.join("  /  ")}
              </p>
            )}
          </Block>
        )}

        {!hidden.has("contact") && (
          <Block id="contact" label="CONTACT">
            <ContactGrid socials={socials} />
          </Block>
        )}
      </div>
    </article>
  );
}

function Block({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="break-inside-avoid">
      <h2 className="mb-4 text-[11px] font-semibold tracking-[0.35em] text-zinc-500">
        {label}
      </h2>
      {children}
    </section>
  );
}

function Entry({
  title,
  subtitle,
  subtitleHref,
  dateRange,
  description,
}: {
  title: string;
  subtitle?: string;
  subtitleHref?: string;
  dateRange: string;
  description?: string;
}) {
  return (
    <div className="mb-5 break-inside-avoid last:mb-0">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-base font-medium text-zinc-900">
          {title || "未填写"}
        </h3>
        <span className="shrink-0 text-xs text-zinc-400">{dateRange}</span>
      </div>
      {subtitle &&
        (subtitleHref ? (
          <a
            href={subtitleHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 underline decoration-zinc-300 underline-offset-2 hover:text-zinc-900"
          >
            {subtitle}
          </a>
        ) : (
          <p className="text-sm text-zinc-500">{subtitle}</p>
        ))}
      {description && (
        <p className="mt-2 text-sm leading-6 text-zinc-700">{description}</p>
      )}
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-sm italic text-zinc-400">{children}</p>;
}

function ContactGrid({ socials }: { socials: SocialLinks }) {
  const items: Array<[string, string, string?]> = [];
  if (socials.email) items.push(["邮箱", socials.email, `mailto:${socials.email}`]);
  if (socials.phone) items.push(["电话", socials.phone]);
  if (socials.github) items.push(["GitHub", prettyUrl(socials.github), socials.github]);
  if (socials.linkedin) items.push(["LinkedIn", prettyUrl(socials.linkedin), socials.linkedin]);
  if (socials.twitter) items.push(["Twitter", prettyUrl(socials.twitter), socials.twitter]);
  if (socials.website) items.push(["Website", prettyUrl(socials.website), socials.website]);

  if (items.length === 0) {
    return <Empty>补充联系方式后在这里展示</Empty>;
  }

  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
      {items.map(([label, value, href]) => (
        <div key={label} className="flex items-baseline gap-3">
          <dt className="w-16 shrink-0 text-xs tracking-wider text-zinc-400">
            {label}
          </dt>
          <dd className="truncate text-zinc-700">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-zinc-300 underline-offset-2 hover:text-zinc-900"
              >
                {value}
              </a>
            ) : (
              value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function formatContactLine(location: string, socials: SocialLinks): string {
  const parts: string[] = [];
  if (location) parts.push(location);
  if (socials.email) parts.push(socials.email);
  if (socials.website) parts.push(prettyUrl(socials.website));
  return parts.join("  ·  ");
}

function formatRange(start: string, end: string): string {
  if (!start && !end) return "";
  return `${start || ""} — ${end || "至今"}`;
}

function prettyUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
