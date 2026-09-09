import React from "react";
import * as Icons from "lucide-react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  UserRound,
  GraduationCap,
  BriefcaseBusiness,
  FolderKanban,
  Sparkles,
  Award,
  ExternalLink,
} from "lucide-react";

const iconMap = {
  summary: UserRound,
  education: GraduationCap,
  experience: BriefcaseBusiness,
  projects: FolderKanban,
  skills: Sparkles,
  honors: Award,
};

export default function Canvas({
  resume,
  sections = [],
  layout,
  theme,
  selectedSection,
  onSectionChange,
  onLayoutChange,
  exportMode = false,
}) {
  const primary =
    theme?.primary || "#111827";

  const visibleSections =
    sections.filter(
      (section) =>
        section.visible !== false
    );

  const profile =
    resume?.profile || {};

  const variant =
    layout?.variant ||
    "double-card";

  const selectSection = (section) => {
    onSectionChange?.(section);
  };

  const renderSection = (
    section,
    options = {}
  ) => {
    return (
      <ResumeSection
        key={section.id}
        section={section}
        resume={resume}
        primary={primary}
        selected={
          !exportMode && selectedSection?.id === section.id
        }
        onSelect={() =>
          selectSection(section)
        }
        {...options}
        exportMode={exportMode}
      />
    );
  };

  return (
    <div className="canvas-stage">

      <div
        id="resume-canvas"
        className={`
          resume-paper
          resume-layout-${variant}
        `}
        style={{
          "--resume-primary": primary,
        }}
      >

        {/* =====================================
            极简单栏
        ===================================== */}

        {variant === "minimal-single" && (
          <MinimalSingle
            profile={profile}
            sections={visibleSections}
            primary={primary}
            renderSection={renderSection}
          />
        )}

        {/* =====================================
            双列卡片
        ===================================== */}

        {variant === "double-card" && (
          <DoubleCard
            profile={profile}
            sections={visibleSections}
            primary={primary}
            renderSection={renderSection}
            layout={layout}
            selectedSection={selectedSection}
            onLayoutChange={onLayoutChange}
            exportMode={exportMode}
          />
        )}

        {/* =====================================
            左侧栏
        ===================================== */}

        {variant === "left-sidebar" && (
          <SidebarLayout
            side="left"
            profile={profile}
            sections={visibleSections}
            primary={primary}
            renderSection={renderSection}
          />
        )}

        {/* =====================================
            右侧栏
        ===================================== */}

        {variant === "right-sidebar" && (
          <SidebarLayout
            side="right"
            profile={profile}
            sections={visibleSections}
            primary={primary}
            renderSection={renderSection}
          />
        )}

        {/* =====================================
            时间轴
        ===================================== */}

        {variant === "timeline" && (
          <TimelineLayout
            profile={profile}
            sections={visibleSections}
            primary={primary}
            renderSection={renderSection}
          />
        )}

        {/* =====================================
            编辑杂志
        ===================================== */}

        {variant === "editorial" && (
          <EditorialLayout
            profile={profile}
            sections={visibleSections}
            primary={primary}
            renderSection={renderSection}
          />
        )}

        {/* =====================================
            网格卡片
        ===================================== */}

        {variant === "grid-cards" && (
          <GridLayout
            profile={profile}
            sections={visibleSections}
            primary={primary}
            renderSection={renderSection}
          />
        )}

        {/* =====================================
            大标题
        ===================================== */}

        {variant === "hero-header" && (
          <HeroLayout
            profile={profile}
            sections={visibleSections}
            primary={primary}
            renderSection={renderSection}
          />
        )}

        {/* =====================================
            科技终端
        ===================================== */}

        {variant === "tech-terminal" && (
          <TerminalLayout
            profile={profile}
            sections={visibleSections}
            primary={primary}
            renderSection={renderSection}
          />
        )}

        {/* =====================================
            作品集
        ===================================== */}

        {variant === "portfolio" && (
          <PortfolioLayout
            profile={profile}
            sections={visibleSections}
            primary={primary}
            renderSection={renderSection}
          />
        )}

        {/* =====================================
            商务高密
        ===================================== */}

        {variant === "corporate" && (
          <CorporateLayout
            profile={profile}
            sections={visibleSections}
            primary={primary}
            renderSection={renderSection}
          />
        )}

        {/* =====================================
            现代留白
        ===================================== */}

        {variant === "modern-air" && (
          <ModernAirLayout
            profile={profile}
            sections={visibleSections}
            primary={primary}
            renderSection={renderSection}
          />
        )}

        {advancedVariants.includes(variant) && (
          <AdvancedLayout
            variant={variant}
            profile={profile}
            sections={visibleSections}
            primary={primary}
            renderSection={renderSection}
            layout={layout}
            onLayoutChange={onLayoutChange}
            exportMode={exportMode}
          />
        )}

      </div>

    </div>
  );
}

/* =====================================================
   公共：个人信息
===================================================== */

function ContactInfo({ profile, primary, vertical = false }) {
  const visibility = profile?.fieldVisibility || {};
  const base = [
    { key: "phone", icon: Phone, value: profile.phone },
    { key: "email", icon: Mail, value: profile.email },
    { key: "location", icon: MapPin, value: profile.location },
    { key: "website", icon: Globe, value: profile.website },
  ].filter((item) => item.value && visibility[item.key] !== false);
  const custom = Array.isArray(profile.customFields) ? profile.customFields : [];
  const items = [...base, ...custom.filter((item) => item?.value && item.visible !== false).map((item) => ({ icon: Icons[item.icon] || Icons.Info, value: `${item.label || "信息"}：${item.value}` }))];
  return <div className={vertical ? "resume-contact-vertical" : "resume-contact"}>
    {items.map((item,index) => { const Icon=item.icon; return <div key={`${item.value}-${index}`} className="resume-contact-item"><Icon size={12} style={{color:primary}}/><span>{item.value}</span></div>; })}
  </div>;
}

/* =====================================================
   公共：头像
===================================================== */

function Avatar({
  profile,
  size = "small",
  style,
}) {
  if (!profile?.avatar) {
    return (
      <div
        className={`resume-avatar resume-avatar-${size} resume-avatar-empty`}
        style={style}
      >
        <UserRound size={22} />
      </div>
    );
  }

  return (
    <img
      src={profile.avatar}
      alt="头像"
      className={`resume-avatar resume-avatar-${size}`}
      style={style}
    />
  );
}

/* =====================================================
   公共：姓名头部
===================================================== */

function NameHeader({ profile, primary, align = "left", avatar = false, layout, positioned = false, showPositionGuides = false, onLayoutChange }) {
  const position = layout?.profile || {};
  const dragRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(null);

  const beginDrag = (type, event) => {
    if (!positioned || !onLayoutChange) return;
    event.preventDefault();
    event.stopPropagation();
    const originX = type === "name" ? Number(position.x ?? 52) : Number(position.avatarX ?? 642);
    const originY = type === "name" ? Number(position.y ?? 44) : Number(position.avatarY ?? 40);
    dragRef.current = { type, startX: event.clientX, startY: event.clientY, originX, originY };
    setDragging(type);
    const paper = event.currentTarget.closest(".resume-paper");
    const scale = paper ? paper.getBoundingClientRect().width / 794 : 1;
    const move = (e) => {
      const d = dragRef.current;
      if (!d) return;
      const nextX = Math.round(d.originX + (e.clientX - d.startX) / Math.max(scale, 0.01));
      const nextY = Math.round(d.originY + (e.clientY - d.startY) / Math.max(scale, 0.01));
      onLayoutChange((current) => ({
        ...current,
        profile: {
          ...(current.profile || {}),
          ...(d.type === "name" ? { x: nextX, y: nextY } : { avatarX: nextX, avatarY: nextY }),
        },
      }));
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      dragRef.current = null;
      setDragging(null);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const nameStyle = positioned ? { left: `${position.x ?? 52}px`, top: `${position.y ?? 44}px` } : undefined;
  const avatarStyle = positioned ? { left: `${position.avatarX ?? 642}px`, top: `${position.avatarY ?? 40}px`, width: `${position.avatarSize ?? 92}px`, height: `${position.avatarSize ?? 92}px` } : undefined;
  const visibility = profile.fieldVisibility || {};

  return <header className={`resume-name-header align-${align} ${positioned ? "resume-name-header-positioned" : ""}`}>
    {avatar && <div className={`${positioned ? "resume-avatar-positioned" : ""} ${dragging === "avatar" ? "is-dragging" : ""}`} style={avatarStyle} onPointerDown={(e) => beginDrag("avatar", e)} title={positioned ? "拖动照片定位" : ""}><Avatar profile={profile} size="medium" style={{ width: "100%", height: "100%" }}/></div>}
    {showPositionGuides && positioned && <><div className="profile-position-guide profile-position-guide-name" style={{ left: `${position.x ?? 52}px`, top: `${position.y ?? 44}px` }}/><div className="profile-position-guide profile-position-guide-avatar" style={avatarStyle}/></>}

    {positioned ? (
      <div className={`${dragging === "name" ? "is-dragging" : ""} resume-name-positioned`} style={nameStyle} onPointerDown={(e) => beginDrag("name", e)} title="拖动姓名定位">
        <h1 className="resume-name" style={{ color: primary }}>{profile.name || "你的姓名"}</h1>
      </div>
    ) : (
      <div className="resume-name-content">
        {visibility.name !== false && <h1 className="resume-name" style={{ color: primary }}>{profile.name || "你的姓名"}</h1>}
        {visibility.title !== false && <div className="resume-job">{profile.title || "求职目标"}</div>}
        <ContactInfo profile={profile} primary={primary}/>
      </div>
    )}

    {positioned && (
      <div className="resume-profile-fixed-info">
        {visibility.title !== false && <div className="resume-job">{profile.title || "求职目标"}</div>}
        <ContactInfo profile={profile} primary={primary}/>
      </div>
    )}
  </header>;
}

/* =====================================================
   公共：模块
===================================================== */

function ResumeSection({
  section,
  resume,
  primary,
  selected,
  onSelect,
  className = "",
  exportMode = false,
}) {
  const Icon =
    Icons[section.icon] ||
    iconMap[section.type] ||
    FileTextFallback;

  return (
    <section
      className={`
        resume-section
        ${selected ? "resume-section-selected" : ""}
        ${className}
      `}
      onClick={(event) => {
        event.stopPropagation();
        onSelect?.();
      }}
    >

      <div className="resume-section-heading">

        <div
          className="resume-section-icon"
          style={{
            color: primary,
          }}
        >
          <Icon size={15} />
        </div>

        <h2>
          {section.title ||
            getSectionTitle(
              section.type
            )}
        </h2>

      </div>

      <SectionContent
        section={section}
        resume={resume}
        primary={primary}
      />

    </section>
  );
}

function getSectionTitle(type) {
  const titles = {
    summary: "个人简介",
    education: "教育经历",
    experience: "实习 / 工作经历",
    projects: "项目经历",
    skills: "专业技能",
    honors: "荣誉 / 证书",
  };

  return (
    titles[type] ||
    "其他经历"
  );
}

/* =====================================================
   模块内容
===================================================== */

function formatPeriod(item) {
  const direct = item?.date || item?.period || item?.time;
  if (direct) return direct;
  const start = item?.start || item?.from;
  const end = item?.end || item?.to;
  if (start || end) return `${start || ""}${start || end ? " — " : ""}${end || ""}`.trim();
  return "";
}

function SectionContent({
  section,
  resume,
  primary,
}) {
  const data =
    resume?.[section.type];

  if (section.type === "summary") {
    return (
      <p className="resume-summary">
        {resume?.profile?.summary || "在这里填写你的个人简介。"}
      </p>
    );
  }

  if (
    section.type === "education"
  ) {
    return (
      <div className="resume-list">
        {(Array.isArray(data)
          ? data
          : []
        ).map((item, index) => (
          <div
            key={item.id || index}
            className="resume-list-item"
          >
            <div className="resume-item-top">
              <strong>
                {item.school ||
                  item.name ||
                  "学校名称"}
              </strong>

              <span>
                {formatPeriod(item)}
              </span>
            </div>

            <div className="resume-item-sub">
              {item.major ||
                item.degree ||
                ""}
            </div>

            {item.description && (
              <p>
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (
    section.type === "experience"
  ) {
    return (
      <div className="resume-list">
        {(Array.isArray(data)
          ? data
          : []
        ).map((item, index) => (
          <div
            key={item.id || index}
            className="resume-list-item"
          >
            <div className="resume-item-top">
              <strong>
                {item.company ||
                  item.name ||
                  "公司名称"}
              </strong>

              <span>
                {formatPeriod(item)}
              </span>
            </div>

            <div className="resume-item-sub">
              {item.position ||
                item.role ||
                ""}
            </div>

            {item.description && (
              <p>
                {item.description}
              </p>
            )}
            {Array.isArray(item.achievements) && item.achievements.length > 0 && (
              <ul className="resume-achievements">
                {item.achievements.map((achievement, achievementIndex) => (
                  <li key={`${item.id || index}-achievement-${achievementIndex}`}>{achievement}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (
    section.type === "projects"
  ) {
    return (
      <div className="resume-project-list">
        {(Array.isArray(data)
          ? data
          : []
        ).map((item, index) => (
          <div
            key={item.id || index}
            className="resume-project"
          >
            <div className="resume-project-title">
              <strong>{item.name || "项目名称"}</strong>
              {formatPeriod(item) && <span className="resume-project-period">{formatPeriod(item)}</span>}
              {item.link && <ExternalLink size={12} />}
            </div>
            {item.role && <div className="resume-project-role">{item.role}</div>}

            {item.description && (
              <p>
                {item.description}
              </p>
            )}

            {(item.technology || item.technologies) && (
              <div className="resume-tags">
                {(Array.isArray(item.technologies)
                  ? item.technologies
                  : String(item.technology || item.technologies)
                      .split(/[,，、]/)
                      .filter(Boolean)
                ).map((tag) => (
                  <span
                    key={String(tag)}
                    style={{ color: primary, borderColor: primary }}
                  >
                    {String(tag).trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (
    section.type === "skills"
  ) {
    const skills = Array.isArray(data)
      ? data
      : [];

    return (
      <div className="resume-skill-pills">
        {skills.map((skill, index) => {
          const name =
            typeof skill === "string"
              ? skill
              : skill?.name;

          if (!name) return null;

          return (
            <span
              className="resume-skill-pill"
              key={`${name}-${index}`}
              style={{
                background: primary,
              }}
            >
              {name}
            </span>
          );
        })}
      </div>
    );
  }

  if (
    section.type === "honors"
  ) {
    return (
      <div className="resume-honors">
        {(Array.isArray(data)
          ? data
          : []
        ).map((item, index) => (
          <div
            key={index}
            className="resume-honor"
          >
            <Award
              size={13}
              style={{
                color: primary,
              }}
            />

            <span>
              {typeof item ===
              "string"
                ? item
                : item.name}
            </span>
          </div>
        ))}
      </div>
    );
  }

  const customItems = Array.isArray(section.contentItems) ? section.contentItems : [];
  const legacyContent = section.content || (typeof data === "string" ? data : "");
  const lines = customItems.length ? customItems : String(legacyContent || "").split(/\n/).filter(Boolean);
  if (lines.length) return <div className="resume-custom-content">{lines.map((line,index)=><p key={`${section.id}-${index}`}>{line}</p>)}</div>;
  return <p className="resume-summary">点击右侧“添加内容”开始编辑。</p>;
}

/* =====================================================
   01 极简单栏
===================================================== */

function MinimalSingle({
  profile,
  sections,
  primary,
  renderSection,
}) {
  return (
    <div className="resume-content minimal-content">

      <NameHeader
        profile={profile}
        primary={primary}
      />

      <div className="minimal-divider" />

      <div className="resume-sections">
        {sections.map((section) =>
          renderSection(section)
        )}
      </div>

    </div>
  );
}

/* =====================================================
   02 双列卡片
===================================================== */

function DoubleCard({
  profile,
  sections,
  primary,
  renderSection,
  layout,
  selectedSection,
  onLayoutChange,
  exportMode = false,
}) {
  const split = splitSections(sections);

  return (
    <div className="resume-content">

      <NameHeader
        profile={profile}
        primary={primary}
        avatar
        layout={layout}
        positioned
        showPositionGuides={false}
        onLayoutChange={onLayoutChange}
      />

      <div className="double-columns">

        <div className="double-column">
          {split.left.map((section) =>
            renderSection(
              section,
              {
                className:
                  "card-section",
              }
            )
          )}
        </div>

        <div className="double-column">
          {split.right.map((section) =>
            renderSection(
              section,
              {
                className:
                  "card-section",
              }
            )
          )}
        </div>

      </div>

    </div>
  );
}

/* =====================================================
   03 / 04 侧栏
===================================================== */

function SidebarLayout({
  side,
  profile,
  sections,
  primary,
  renderSection,
}) {
  const split = splitSections(
    sections
  );

  const sidebar = (
    <aside className="resume-sidebar">

      <Avatar
        profile={profile}
        size="large"
      />

      <h1
        style={{
          color: primary,
        }}
      >
        {profile.name ||
          "你的姓名"}
      </h1>

      <div className="sidebar-job">
        {profile.title ||
          "求职目标"}
      </div>

      <ContactInfo
        profile={profile}
        primary={primary}
        vertical
      />

      <div className="sidebar-line" />

      {split.right
        .filter(
          (section) =>
            section.type ===
              "skills" ||
            section.type ===
              "honors"
        )
        .map((section) =>
          renderSection(
            section
          )
        )}

    </aside>
  );

  const main = (
    <main className="sidebar-main">

      {split.left
        .filter(
          (section) =>
            section.type !==
              "skills" &&
            section.type !==
              "honors"
        )
        .map((section) =>
          renderSection(
            section
          )
        )}

    </main>
  );

  return (
    <div
      className={`
        sidebar-layout
        sidebar-${side}
      `}
    >

      {side === "left"
        ? sidebar
        : main}

      {side === "left"
        ? main
        : sidebar}

    </div>
  );
}

/* =====================================================
   05 时间轴
===================================================== */

function TimelineLayout({
  profile,
  sections,
  primary,
  renderSection,
}) {
  return (
    <div className="resume-content timeline-content">

      <NameHeader
        profile={profile}
        primary={primary}
        align="center"
        avatar
      />

      <div className="timeline-container">

        {sections.map(
          (section) => (
            <div
              key={section.id}
              className="timeline-section"
            >

              <div
                className="timeline-dot"
                style={{
                  background:
                    primary,
                }}
              />

              {renderSection(
                section,
                {
                  className:
                    "timeline-card",
                }
              )}

            </div>
          )
        )}

      </div>

    </div>
  );
}

/* =====================================================
   06 编辑杂志
===================================================== */

function EditorialLayout({
  profile,
  sections,
  primary,
  renderSection,
}) {
  return (
    <div className="resume-content editorial-content">

      <header className="editorial-header">

        <div className="editorial-number">
          01
        </div>

        <div>
          <h1
            style={{
              color: primary,
            }}
          >
            {profile.name ||
              "你的姓名"}
          </h1>

          <div>
            {profile.title ||
              "求职目标"}
          </div>
        </div>

        <Avatar
          profile={profile}
          size="medium"
        />

      </header>

      <div className="editorial-rule" />

      <div className="editorial-columns">

        <div>
          {sections
            .filter(
              (_, index) =>
                index % 2 === 0
            )
            .map((section) =>
              renderSection(
                section
              )
            )}
        </div>

        <div>
          {sections
            .filter(
              (_, index) =>
                index % 2 === 1
            )
            .map((section) =>
              renderSection(
                section
              )
            )}
        </div>

      </div>

    </div>
  );
}

/* =====================================================
   07 网格
===================================================== */

function GridLayout({
  profile,
  sections,
  primary,
  renderSection,
}) {
  return (
    <div className="resume-content">

      <NameHeader
        profile={profile}
        primary={primary}
      />

      <div className="resume-grid-layout">

        {sections.map(
          (section, index) =>
            renderSection(
              section,
              {
                className:
                  index === 0
                    ? "grid-section-large"
                    : "grid-section",
              }
            )
        )}

      </div>

    </div>
  );
}

/* =====================================================
   08 Hero
===================================================== */

function HeroLayout({
  profile,
  sections,
  primary,
  renderSection,
}) {
  return (
    <div className="resume-content hero-content">

      <header className="hero-header-resume">

        <Avatar
          profile={profile}
          size="large"
        />

        <h1
          style={{
            color: primary,
          }}
        >
          {profile.name ||
            "你的姓名"}
        </h1>

        <div className="hero-job">
          {profile.title ||
            "求职目标"}
        </div>

        <ContactInfo
          profile={profile}
          primary={primary}
        />

      </header>

      <div className="hero-divider" />

      <div className="hero-sections">

        {sections.map((section) =>
          renderSection(
            section
          )
        )}

      </div>

    </div>
  );
}

/* =====================================================
   09 科技终端
===================================================== */

function TerminalLayout({
  profile,
  sections,
  primary,
  renderSection,
}) {
  return (
    <div className="terminal-resume">

      <div className="terminal-bar">
        <span />
        <span />
        <span />

        <div>
          resume.exe
        </div>
      </div>

      <div className="terminal-body">

        <aside className="terminal-side">

          <Avatar
            profile={profile}
            size="medium"
          />

          <div
            style={{
              color: primary,
            }}
          >
            {profile.name ||
              "your-name"}
          </div>

          <div>
            {profile.title ||
              "developer"}
          </div>

          <ContactInfo
            profile={profile}
            primary={primary}
            vertical
          />

        </aside>

        <main className="terminal-main">

          {sections.map(
            (section) =>
              renderSection(
                section
              )
          )}

        </main>

      </div>

    </div>
  );
}

/* =====================================================
   10 作品集
===================================================== */

function PortfolioLayout({
  profile,
  sections,
  primary,
  renderSection,
}) {
  return (
    <div className="resume-content portfolio-content">

      <header className="portfolio-header-resume">

        <div>
          <div className="portfolio-label">
            PORTFOLIO / RESUME
          </div>

          <h1
            style={{
              color: primary,
            }}
          >
            {profile.name ||
              "你的姓名"}
          </h1>

          <div>
            {profile.title ||
              "求职目标"}
          </div>
        </div>

        <Avatar
          profile={profile}
          size="large"
        />

      </header>

      <div className="portfolio-grid-resume">

        {sections.map(
          (section) =>
            renderSection(
              section,
              {
                className:
                  "portfolio-section",
              }
            )
        )}

      </div>

    </div>
  );
}

/* =====================================================
   11 商务
===================================================== */

function CorporateLayout({
  profile,
  sections,
  primary,
  renderSection,
}) {
  const split = splitSections(
    sections
  );

  return (
    <div className="resume-content corporate-content">

      <header className="corporate-header-resume">

        <div>
          <h1
            style={{
              color: primary,
            }}
          >
            {profile.name ||
              "你的姓名"}
          </h1>

          <strong>
            {profile.title ||
              "求职目标"}
          </strong>
        </div>

        <ContactInfo
          profile={profile}
          primary={primary}
        />

      </header>

      <div className="corporate-rule" />

      <div className="corporate-columns">

        <div>
          {split.left.map(
            (section) =>
              renderSection(
                section
              )
          )}
        </div>

        <div>
          {split.right.map(
            (section) =>
              renderSection(
                section
              )
          )}
        </div>

      </div>

    </div>
  );
}

/* =====================================================
   12 现代留白
===================================================== */

function ModernAirLayout({
  profile,
  sections,
  primary,
  renderSection,
}) {
  const split = splitSections(
    sections
  );

  return (
    <div className="resume-content air-content">

      <header className="air-header-resume">

        <div>
          <div className="air-label">
            RESUME
          </div>

          <h1
            style={{
              color: primary,
            }}
          >
            {profile.name ||
              "你的姓名"}
          </h1>

          <div className="air-job">
            {profile.title ||
              "求职目标"}
          </div>
        </div>

        <Avatar
          profile={profile}
          size="medium"
        />

      </header>

      <div className="air-columns">

        <div>
          {split.left.map(
            (section) =>
              renderSection(
                section
              )
          )}
        </div>

        <div>
          {split.right.map(
            (section) =>
              renderSection(
                section
              )
          )}
        </div>

      </div>

    </div>
  );
}

const advancedVariants = [
  "standard-ats", "business-classic", "black-white-pro", "compact-one-page",
  "narrow-left", "narrow-right", "top-banner", "profile-sidebar",
  "symmetric-columns", "accent-strip", "tech-developer", "ui-designer",
  "data-dashboard", "concept-timeline", "split-timeline", "experience-roadmap",
  "project-stack", "brand-identity", "clean-two-column", "photo-left", "photo-top", "skills-sidebar",
  "academic-cv", "consulting", "startup-modern", "elegant-serif", "mono-minimal", "color-block",
  "one-column-photo", "career-profile",
];

/* =====================================================
   V2.3 新增 18 种结构
===================================================== */
function AdvancedLayout({ variant, profile, sections, primary, renderSection, layout, onLayoutChange, exportMode = false }) {
  const split = splitSections(sections);
  const contact = <ContactInfo profile={profile} primary={primary} />;
  const header = (className = "") => (
    <div className={`advanced-profile-header ${className}`}>
      <div>
        <div className="advanced-kicker">{variant === "standard-ats" ? "CURRICULUM VITAE" : "RESUME"}</div>
        <h1 style={{ color: primary }}>{profile.name || "你的姓名"}</h1>
        <div className="advanced-job">{profile.title || "求职目标"}</div>
      </div>
      {contact}
    </div>
  );

  if (variant === "standard-ats") return (
    <div className="resume-content advanced-standard-ats">
      <NameHeader
        profile={profile}
        primary={primary}
        avatar
        layout={layout}
        positioned
        showPositionGuides={false}
        onLayoutChange={onLayoutChange}
      />
      <div className="ats-rule" />
      {sections.map((section) => renderSection(section, { className: "ats-section" }))}
    </div>
  );

  if (variant === "business-classic") return (
    <div className="resume-content advanced-business-classic">
      <div className="classic-head">{header("classic-header")}</div>
      <div className="classic-body">
        <div className="classic-main">{split.left.map((s) => renderSection(s))}</div>
        <aside className="classic-side">{split.right.map((s) => renderSection(s))}</aside>
      </div>
    </div>
  );

  if (variant === "black-white-pro") return (
    <div className="resume-content advanced-black-white">
      <div className="bw-name"><h1>{profile.name || "你的姓名"}</h1><span>{profile.title || "求职目标"}</span></div>
      <div className="bw-contact">{contact}</div>
      <div className="bw-columns">
        <main>{split.left.map((s) => renderSection(s))}</main>
        <aside>{split.right.map((s) => renderSection(s))}</aside>
      </div>
    </div>
  );

  if (variant === "compact-one-page") return (
    <div className="resume-content advanced-compact">
      {header("compact-header")}
      <div className="compact-columns">
        <div>{split.left.map((s) => renderSection(s, { className: "compact-section" }))}</div>
        <div>{split.right.map((s) => renderSection(s, { className: "compact-section" }))}</div>
      </div>
    </div>
  );

  if (variant === "narrow-left" || variant === "narrow-right") return (
    <div className={`advanced-narrow ${variant}`}>
      <aside>{variant === "narrow-left" ? <><Avatar profile={profile} size="medium" />{contact}<div className="narrow-skills">{split.right.filter(s => ["skills","honors"].includes(s.type)).map(s => renderSection(s))}</div></> : null}</aside>
      <main>{header("narrow-header")}{split.left.filter(s => !["skills","honors"].includes(s.type)).map(s => renderSection(s))}</main>
      {variant === "narrow-right" && <aside><Avatar profile={profile} size="medium" />{contact}{split.right.filter(s => ["skills","honors"].includes(s.type)).map(s => renderSection(s))}</aside>}
    </div>
  );

  if (variant === "top-banner") return (
    <div className="advanced-top-banner">
      <div className="top-banner-profile" style={{ background: primary }}>
        <div><Avatar profile={profile} size="medium" /><h1>{profile.name || "你的姓名"}</h1><div>{profile.title || "求职目标"}</div></div>
        {contact}
      </div>
      <div className="top-banner-columns"><div>{split.left.map(s => renderSection(s))}</div><div>{split.right.map(s => renderSection(s))}</div></div>
    </div>
  );

  if (variant === "profile-sidebar") return (
    <div className="advanced-profile-sidebar">
      <aside style={{ background: primary }}><Avatar profile={profile} size="large" /><h1>{profile.name || "你的姓名"}</h1><div>{profile.title || "求职目标"}</div>{contact}</aside>
      <main>{sections.map(s => renderSection(s))}</main>
    </div>
  );

  if (variant === "symmetric-columns") return (
    <div className="advanced-symmetric">
      <div className="symmetric-header">{header()}</div>
      <div className="symmetric-body"><div>{split.left.map(s => renderSection(s))}</div><div>{split.right.map(s => renderSection(s))}</div></div>
    </div>
  );

  if (variant === "accent-strip") return (
    <div className="advanced-accent-strip">
      <aside style={{ background: primary }}><Avatar profile={profile} size="medium" /><strong>{profile.name || "你的姓名"}</strong><span>{profile.title || "求职目标"}</span></aside>
      <main>{contact}<div className="accent-main-grid"><div>{split.left.map(s => renderSection(s))}</div><div>{split.right.map(s => renderSection(s))}</div></div></main>
    </div>
  );

  if (variant === "tech-developer") return (
    <div className="advanced-developer">
      <div className="dev-command">$ whoami <span>{profile.name || "developer"}</span></div>
      <header><Avatar profile={profile} size="medium" /><div><h1>{profile.name || "your-name"}</h1><div>{profile.title || "software developer"}</div></div></header>
      <div className="dev-columns"><aside>{contact}{split.right.map(s => renderSection(s))}</aside><main>{split.left.map(s => renderSection(s))}</main></div>
    </div>
  );

  if (variant === "ui-designer") return (
    <div className="advanced-designer">
      <header><div className="designer-label">SELECTED WORK / PROFILE</div><h1 style={{ color: primary }}>{profile.name || "你的姓名"}</h1><div>{profile.title || "UI / UX Designer"}</div>{contact}</header>
      <div className="designer-grid">{sections.map((s, i) => renderSection(s, { className: i === 0 ? "designer-feature" : "designer-card" }))}</div>
    </div>
  );

  if (variant === "data-dashboard") return (
    <div className="advanced-dashboard">
      {header("dashboard-header")}
      <div className="dashboard-stats"><div><b>{sections.filter(s => s.type === "experience").length}</b><span>经历模块</span></div><div><b>{sections.filter(s => s.type === "projects").length}</b><span>项目模块</span></div><div><b>{sections.filter(s => s.type === "skills").length}</b><span>技能模块</span></div></div>
      <div className="dashboard-grid">{sections.map(s => renderSection(s, { className: "dashboard-card" }))}</div>
    </div>
  );

  if (variant === "concept-timeline") return (
    <div className="advanced-concept-timeline">
      {header("timeline-top-header")}
      <div className="concept-track">{sections.map((s, i) => <div className="concept-row" key={s.id}><div className="concept-year">0{i + 1}</div><div className="concept-dot" style={{ background: primary }} /><div className="concept-card">{renderSection(s)}</div></div>)}</div>
    </div>
  );

  if (variant === "split-timeline") return (
    <div className="advanced-split-timeline">
      {header("split-timeline-header")}<div className="split-axis" style={{ background: primary }} />
      {sections.map((s, i) => <div className={`split-row ${i % 2 ? "right" : "left"}`} key={s.id}><div className="split-card">{renderSection(s)}</div><div className="split-dot" style={{ background: primary }} /></div>)}
    </div>
  );

  if (variant === "experience-roadmap") return (
    <div className="advanced-roadmap">
      {header("roadmap-header")}<div className="roadmap-line" style={{ background: primary }} />
      <div className="roadmap-items">{sections.map((s, i) => <div className="roadmap-item" key={s.id}><div className="roadmap-node" style={{ borderColor: primary, color: primary }}>{i + 1}</div><div className="roadmap-content"><span>STAGE {String(i + 1).padStart(2, "0")}</span>{renderSection(s)}</div></div>)}</div>
    </div>
  );

  if (variant === "project-stack") return (
    <div className="advanced-project-stack">
      <header><div><span>PROJECT STACK</span><h1 style={{ color: primary }}>{profile.name || "你的姓名"}</h1><div>{profile.title || "求职目标"}</div></div><Avatar profile={profile} size="medium" /></header>
      <div className="project-stack-list">{sections.map((s, i) => renderSection(s, { className: i === 0 ? "project-stack-feature" : "project-stack-card" }))}</div>
    </div>
  );

  if (variant === "clean-two-column") return (
    <div className="advanced-clean-two"><div className="clean-head">{header()}</div><div className="clean-cols"><main>{split.left.map(s => renderSection(s))}</main><aside>{split.right.map(s => renderSection(s))}</aside></div></div>
  );

  if (variant === "photo-left") return (
    <div className="advanced-photo-left"><aside style={{ background: primary }}><Avatar profile={profile} size="large" /><h1>{profile.name || "你的姓名"}</h1><div>{profile.title || "求职目标"}</div>{contact}</aside><main>{sections.map(s => renderSection(s))}</main></div>
  );

  if (variant === "photo-top") return (
    <div className="advanced-photo-top"><header><Avatar profile={profile} size="medium" /><div><h1 style={{color:primary}}>{profile.name || "你的姓名"}</h1><div>{profile.title || "求职目标"}</div></div>{contact}</header><main>{sections.map(s => renderSection(s))}</main></div>
  );

  if (variant === "skills-sidebar") return (
    <div className="advanced-skills-sidebar"><aside style={{borderTopColor:primary}}><Avatar profile={profile} size="medium" />{contact}{split.right.filter(s => ["skills","honors"].includes(s.type)).map(s => renderSection(s))}</aside><main>{header()}{split.left.filter(s => !["skills","honors"].includes(s.type)).map(s => renderSection(s))}</main></div>
  );

  if (variant === "academic-cv") return (
    <div className="advanced-academic"><header><div className="academic-label">ACADEMIC CV</div><h1 style={{color:primary}}>{profile.name || "你的姓名"}</h1><div>{profile.title || "研究 / 专业方向"}</div>{contact}</header><div className="academic-body">{sections.map(s => renderSection(s))}</div></div>
  );

  if (variant === "consulting") return (
    <div className="advanced-consulting">{header("consulting-head")}<div className="consulting-grid"><div>{split.left.map(s => renderSection(s))}</div><div>{split.right.map(s => renderSection(s))}</div></div></div>
  );

  if (variant === "startup-modern") return (
    <div className="advanced-startup"><header><div><span>HELLO, I'M</span><h1 style={{color:primary}}>{profile.name || "你的姓名"}</h1><div>{profile.title || "求职目标"}</div></div><Avatar profile={profile} size="medium" /></header><div className="startup-grid">{sections.map(s => renderSection(s))}</div></div>
  );

  if (variant === "elegant-serif") return (
    <div className="advanced-serif"><header><div className="serif-small">CURRICULUM VITAE</div><h1>{profile.name || "你的姓名"}</h1><div>{profile.title || "求职目标"}</div>{contact}</header><div className="serif-columns">{split.left.map(s => renderSection(s))}{split.right.map(s => renderSection(s))}</div></div>
  );

  if (variant === "mono-minimal") return (
    <div className="advanced-mono"><div className="mono-command">01 / PROFILE</div><h1>{profile.name || "your-name"}</h1><div className="mono-job">{profile.title || "software developer"}</div>{contact}<div className="mono-body">{sections.map((s,i) => <div key={s.id} className="mono-row"><span>{String(i+1).padStart(2,"0")}</span>{renderSection(s)}</div>)}</div></div>
  );

  if (variant === "color-block") return (
    <div className="advanced-color-block"><aside style={{background:primary}}><Avatar profile={profile} size="large" /><h1>{profile.name || "你的姓名"}</h1><div>{profile.title || "求职目标"}</div></aside><main>{contact}<div className="color-block-sections">{sections.map(s => renderSection(s))}</div></main></div>
  );

  if (variant === "one-column-photo") return (
    <div className="advanced-one-column-photo"><header><Avatar profile={profile} size="medium" /><div><h1 style={{color:primary}}>{profile.name || "你的姓名"}</h1><div>{profile.title || "求职目标"}</div></div>{contact}</header><div className="one-column-body">{sections.map(s => renderSection(s))}</div></div>
  );

  if (variant === "career-profile") return (
    <div className="advanced-career-profile"><header><div><span>CAREER PROFILE</span><h1 style={{color:primary}}>{profile.name || "你的姓名"}</h1><div>{profile.title || "求职目标"}</div></div><Avatar profile={profile} size="medium" /></header><div className="career-grid">{sections.map(s => renderSection(s, {className:"career-card"}))}</div></div>
  );

  return (
    <div className="advanced-brand">
      <header><div className="brand-number">01</div><Avatar profile={profile} size="medium" /><h1 style={{ color: primary }}>{profile.name || "你的姓名"}</h1><div className="brand-job">{profile.title || "求职目标"}</div><p>把经历、能力与作品整理成清晰的个人品牌。</p>{contact}</header>
      <div className="brand-sections">{sections.map(s => renderSection(s))}</div>
    </div>
  );
}

/* =====================================================
   工具函数
===================================================== */

function splitSections(
  sections
) {
  const left = [];
  const right = [];

  sections.forEach(
    (section, index) => {
      if (index % 2 === 0) {
        left.push(section);
      } else {
        right.push(section);
      }
    }
  );

  return {
    left,
    right,
  };
}

function FileTextFallback() {
  return (
    <FileTextIcon />
  );
}

function FileTextIcon() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 12,
        height: 12,
      }}
    />
  );
}