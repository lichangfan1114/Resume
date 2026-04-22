import { Globe, Mail, MapPin, Phone } from "lucide-react";
import type { ResumeData, SocialLinks } from "@/lib/schema";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "../modern/BrandIcons";
import DefaultAvatar from "../modern/DefaultAvatar";

interface Props {
  data: ResumeData;
}

// 双栏正式风：左侧深色 sidebar 放基本信息/联系/技能，右侧主栏放履历。
export default function ResumeProfessional({ data }: Props) {
  const { profile, education, projects, experience, portfolio, skills, socials } = data;
  const hidden = new Set(data.hiddenSections ?? []);
  const shape = profile.avatarShape ?? "circle";
  const isRect = shape === "rectangle";

  return (
    <article
      id="top"
      className="flex w-[794px] min-h-[1123px] bg-white text-zinc-900"
    >
      {/* 左侧 sidebar */}
      <aside className="flex w-[260px] shrink-0 flex-col gap-8 bg-slate-900 px-7 py-10 text-slate-100">
        <div className="flex flex-col items-center gap-4 break-inside-avoid text-center">
          <div
            className={`overflow-hidden bg-slate-800 ${
              isRect
                ? "h-[140px] w-[105px] rounded-lg"
                : "h-[112px] w-[112px] rounded-full"
            }`}
          >
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
          <div>
            <h1 className="text-xl font-semibold leading-tight">
              {profile.name || "你的姓名"}
            </h1>
            {profile.title && (
              <p className="mt-1 text-xs text-slate-300">{profile.title}</p>
            )}
          </div>
        </div>

        {!hidden.has("contact") && (
          <SideBlock id="contact" label="Contact">
            <ContactList profile={profile} socials={socials} />
          </SideBlock>
        )}

        {!hidden.has("skills") && (
          <SideBlock id="skills" label="Skills">
            {skills.length === 0 ? (
              <SideEmpty>补充技能后在这里展示</SideEmpty>
            ) : (
              <ul className="space-y-1.5 text-sm">
                {skills.map((s) => (
                  <li key={s} className="flex items-baseline gap-2">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            )}
          </SideBlock>
        )}
      </aside>

      {/* 右侧主栏 */}
      <main className="flex flex-1 flex-col gap-8 px-10 py-10">
        {profile.bio && (
          <p className="break-inside-avoid border-b border-zinc-200 pb-6 text-sm leading-relaxed text-zinc-700">
            {profile.bio}
          </p>
        )}

        {!hidden.has("experience") && (
          <MainBlock id="experience" label="Experience">
            {experience.length === 0 ? (
              <MainEmpty>补充工作经历后在这里展示</MainEmpty>
            ) : (
              experience.map((e) => (
                <MainEntry
                  key={e.id}
                  title={e.company}
                  subtitle={e.role}
                  dateRange={formatRange(e.startDate, e.endDate)}
                  description={e.description}
                />
              ))
            )}
          </MainBlock>
        )}

        {!hidden.has("education") && (
          <MainBlock id="education" label="Education">
            {education.length === 0 ? (
              <MainEmpty>补充学历后在这里展示</MainEmpty>
            ) : (
              education.map((e) => (
                <MainEntry
                  key={e.id}
                  title={e.school}
                  subtitle={e.major}
                  dateRange={formatRange(e.startDate, e.endDate)}
                  description={e.description}
                />
              ))
            )}
          </MainBlock>
        )}

        {!hidden.has("projects") && (
          <MainBlock id="projects" label="Projects">
            {projects.length === 0 ? (
              <MainEmpty>补充项目后在这里展示</MainEmpty>
            ) : (
              projects.map((p) => (
                <MainEntry
                  key={p.id}
                  title={p.name}
                  subtitle={p.link}
                  subtitleHref={p.link}
                  dateRange={formatRange(p.startDate, p.endDate)}
                  description={p.description}
                />
              ))
            )}
          </MainBlock>
        )}

        {!hidden.has("portfolio") && (
          <MainBlock id="portfolio" label="Portfolio">
            {portfolio.length === 0 ? (
              <MainEmpty>补充作品后在这里展示</MainEmpty>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {portfolio.map((p, idx) => (
                  <figure
                    key={p.id}
                    className="break-inside-avoid overflow-hidden rounded border border-zinc-200"
                  >
                    <div
                      className="aspect-[4/3] w-full"
                      style={{
                        background: p.image
                          ? `url(${p.image}) center/cover no-repeat`
                          : fallbackGradient(idx),
                      }}
                    />
                    <figcaption className="px-2 py-1.5 text-[11px] text-zinc-500">
                      {p.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </MainBlock>
        )}
      </main>
    </article>
  );
}

function SideBlock({
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
      <h2 className="mb-3 border-b border-slate-700 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300">
        {label}
      </h2>
      {children}
    </section>
  );
}

function SideEmpty({ children }: { children: React.ReactNode }) {
  return <p className="text-xs italic text-slate-400">{children}</p>;
}

function MainBlock({
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
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700">
        {label}
      </h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function MainEntry({
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
        <h3 className="text-base font-semibold text-zinc-900">
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

function MainEmpty({ children }: { children: React.ReactNode }) {
  return <p className="text-sm italic text-zinc-400">{children}</p>;
}

function ContactList({
  profile,
  socials,
}: {
  profile: ResumeData["profile"];
  socials: SocialLinks;
}) {
  type IconType = React.ComponentType<{ size?: number; className?: string }>;
  const items: Array<{ Icon: IconType; label: string; href?: string }> = [];
  if (profile.location)
    items.push({ Icon: MapPin, label: profile.location });
  if (socials.email)
    items.push({ Icon: Mail, label: socials.email, href: `mailto:${socials.email}` });
  if (socials.phone)
    items.push({ Icon: Phone, label: socials.phone, href: `tel:${socials.phone}` });
  if (socials.github)
    items.push({ Icon: GithubIcon, label: "GitHub", href: socials.github });
  if (socials.linkedin)
    items.push({ Icon: LinkedinIcon, label: "LinkedIn", href: socials.linkedin });
  if (socials.twitter)
    items.push({ Icon: TwitterIcon, label: "Twitter", href: socials.twitter });
  if (socials.website)
    items.push({ Icon: Globe, label: prettyUrl(socials.website), href: socials.website });

  if (items.length === 0) {
    return <SideEmpty>补充联系方式后在这里展示</SideEmpty>;
  }
  return (
    <ul className="space-y-2 text-xs">
      {items.map(({ Icon, label, href }, idx) => (
        <li key={idx} className="flex items-center gap-2">
          <Icon size={12} className="shrink-0 text-slate-400" />
          {href ? (
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="truncate hover:underline"
            >
              {label}
            </a>
          ) : (
            <span className="truncate">{label}</span>
          )}
        </li>
      ))}
    </ul>
  );
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

function fallbackGradient(index: number): string {
  const palettes = [
    "linear-gradient(135deg,#e2e8f0,#cbd5e1)",
    "linear-gradient(135deg,#fce7f3,#fbcfe8)",
    "linear-gradient(135deg,#dcfce7,#bbf7d0)",
    "linear-gradient(135deg,#fef3c7,#fde68a)",
  ];
  return palettes[index % palettes.length];
}
