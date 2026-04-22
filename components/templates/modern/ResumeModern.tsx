import { Globe, Mail, MapPin, Phone } from "lucide-react";
import type { ResumeData, SocialLinks } from "@/lib/schema";
import DefaultAvatar from "./DefaultAvatar";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "./BrandIcons";

interface Props {
  data: ResumeData;
}

const NAV_ITEMS = [
  { id: "top", label: "Home" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "portfolio", label: "Portfolio" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function ResumeModern({ data }: Props) {
  const { profile, education, projects, experience, portfolio, skills, socials } = data;
  const hasSocials =
    socials.github || socials.linkedin || socials.twitter || socials.website || socials.email || socials.phone;
  const hidden = new Set(data.hiddenSections ?? []);

  const visibleNav = NAV_ITEMS.filter(
    (item) => item.id === "top" || !hidden.has(item.id),
  );
  const contactIsLast = !hidden.has("contact");

  return (
    <article
      id="top"
      className="w-[794px] min-h-[1123px] bg-white text-zinc-900 font-sans"
      style={{ scrollBehavior: "smooth" }}
    >
      <nav className="sticky top-0 z-10 flex h-14 items-center justify-center gap-6 border-b border-zinc-100 bg-white/90 px-16 text-xs font-medium tracking-wider text-zinc-500 backdrop-blur print:hidden">
        {visibleNav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="uppercase transition hover:text-zinc-900"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <Hero profile={profile} />

      {!hidden.has("education") && (
        <Section id="education" title="Education">
          {education.length === 0 ? (
            <EmptyHint>添加学历后在这里展示</EmptyHint>
          ) : (
            <div className="space-y-6">
              {education.map((e) => (
                <TimelineItem
                  key={e.id}
                  title={e.school}
                  subtitle={e.major}
                  dateRange={formatRange(e.startDate, e.endDate)}
                  description={e.description}
                />
              ))}
            </div>
          )}
        </Section>
      )}

      {!hidden.has("projects") && (
        <Section id="projects" title="Projects">
          {projects.length === 0 ? (
            <EmptyHint>添加项目后在这里展示</EmptyHint>
          ) : (
            <div className="space-y-6">
              {projects.map((p) => (
                <TimelineItem
                  key={p.id}
                  title={p.name}
                  subtitle={p.link}
                  subtitleHref={p.link}
                  dateRange={formatRange(p.startDate, p.endDate)}
                  description={p.description}
                />
              ))}
            </div>
          )}
        </Section>
      )}

      {!hidden.has("experience") && (
        <Section id="experience" title="Experience">
          {experience.length === 0 ? (
            <EmptyHint>添加经历后在这里展示</EmptyHint>
          ) : (
            <div className="space-y-6">
              {experience.map((x) => (
                <TimelineItem
                  key={x.id}
                  title={x.company}
                  subtitle={x.role}
                  dateRange={formatRange(x.startDate, x.endDate)}
                  description={x.description}
                />
              ))}
            </div>
          )}
        </Section>
      )}

      {!hidden.has("portfolio") && (
        <Section id="portfolio" title="Portfolio">
          {portfolio.length === 0 ? (
            <EmptyHint>添加作品后在这里展示</EmptyHint>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {portfolio.map((item, idx) => (
                <figure
                  key={item.id}
                  className="overflow-hidden rounded-lg border border-zinc-100"
                >
                  <div
                    className="aspect-[4/3] w-full"
                    style={{
                      background: item.image
                        ? `url(${item.image}) center/cover no-repeat`
                        : fallbackGradient(idx),
                    }}
                  />
                  <figcaption className="px-3 py-2 text-xs text-zinc-500">
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </Section>
      )}

      {!hidden.has("skills") && (
        <Section id="skills" title="Skills">
          {skills.length === 0 ? (
            <EmptyHint>添加技能后在这里展示</EmptyHint>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm text-zinc-700"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </Section>
      )}

      {!hidden.has("contact") && (
        <Section id="contact" title="Contact" last={contactIsLast}>
          {hasSocials ? (
            <SocialList socials={socials} />
          ) : (
            <EmptyHint>添加社交链接后在这里展示</EmptyHint>
          )}
        </Section>
      )}
    </article>
  );
}

function Hero({ profile }: { profile: ResumeData["profile"] }) {
  return (
    <header className="flex break-inside-avoid items-center gap-10 px-16 pb-14 pt-16">
      <div className="flex-1">
        <p className="text-xs tracking-[0.3em] text-zinc-400">HELLO, I&apos;M</p>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight">
          {profile.name || "你的姓名"}
        </h1>
        <p className="mt-3 text-lg text-zinc-600">
          {profile.title || "你的标题"}
        </p>
        {profile.bio && (
          <p className="mt-5 max-w-lg text-[15px] leading-7 text-zinc-700">
            {profile.bio}
          </p>
        )}
        {profile.location && (
          <p className="mt-5 inline-flex items-center gap-2 text-sm text-zinc-500">
            <MapPin size={14} />
            {profile.location}
          </p>
        )}
      </div>

      <div className="shrink-0">
        {(() => {
          const shape = profile.avatarShape ?? "circle";
          const isRect = shape === "rectangle";
          const frame = isRect
            ? "h-[160px] w-[120px] rounded-xl"
            : "h-[128px] w-[128px] rounded-full";
          return (
            <div className={`overflow-hidden bg-zinc-100 ${frame}`}>
              {profile.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.avatar}
                  alt={profile.name || "avatar"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <DefaultAvatar shape={shape} className="h-full w-full" />
              )}
            </div>
          );
        })()}
      </div>
    </header>
  );
}

function Section({
  id,
  title,
  children,
  last,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section
      id={id}
      className={`break-inside-avoid px-16 py-10 ${last ? "" : "border-t border-zinc-100"}`}
    >
      <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
        {title}
      </h2>
      {children}
    </section>
  );
}

function TimelineItem({
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
    <div className="break-inside-avoid">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
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
        </div>
        <span className="shrink-0 text-xs text-zinc-400">{dateRange}</span>
      </div>
      {description && (
        <p className="mt-2 text-sm leading-6 text-zinc-700">{description}</p>
      )}
    </div>
  );
}

function SocialList({ socials }: { socials: SocialLinks }) {
  type IconComponent = React.ComponentType<{ size?: number; className?: string }>;
  const entries: Array<{
    key: keyof SocialLinks;
    label: string;
    href: string;
    Icon: IconComponent;
  }> = [];

  if (socials.email)
    entries.push({ key: "email", label: socials.email, href: `mailto:${socials.email}`, Icon: Mail });
  if (socials.phone)
    entries.push({ key: "phone", label: socials.phone, href: `tel:${socials.phone}`, Icon: Phone });
  if (socials.github)
    entries.push({ key: "github", label: "GitHub", href: socials.github, Icon: GithubIcon });
  if (socials.linkedin)
    entries.push({ key: "linkedin", label: "LinkedIn", href: socials.linkedin, Icon: LinkedinIcon });
  if (socials.twitter)
    entries.push({ key: "twitter", label: "Twitter", href: socials.twitter, Icon: TwitterIcon });
  if (socials.website)
    entries.push({ key: "website", label: displayDomain(socials.website), href: socials.website, Icon: Globe });

  return (
    <ul className="grid grid-cols-2 gap-3">
      {entries.map(({ key, label, href, Icon }) => (
        <li key={key}>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group inline-flex items-center gap-3 text-sm text-zinc-700 transition hover:text-zinc-900"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-50 text-zinc-500 transition group-hover:bg-zinc-900 group-hover:text-white">
              <Icon size={14} />
            </span>
            <span className="underline decoration-transparent underline-offset-2 transition group-hover:decoration-zinc-900">
              {label}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function EmptyHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50/60 px-4 py-4 text-sm text-zinc-400">
      {children}
    </p>
  );
}

function formatRange(start: string, end: string): string {
  if (!start && !end) return "";
  return `${start || ""} — ${end || "至今"}`;
}

function displayDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function fallbackGradient(index: number): string {
  const palettes = [
    "linear-gradient(135deg,#e0e7ff,#c7d2fe)",
    "linear-gradient(135deg,#fce7f3,#fbcfe8)",
    "linear-gradient(135deg,#d1fae5,#a7f3d0)",
    "linear-gradient(135deg,#fef3c7,#fde68a)",
  ];
  return palettes[index % palettes.length];
}
