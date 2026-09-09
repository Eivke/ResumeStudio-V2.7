// ============================================================
// Resume Studio - Template Engine V2.3
// 30 款真正不同的简历排版结构
// 主题颜色与排版结构完全分离。
// ============================================================

export const themes = {
  black: {
    id: "black", name: "曜石黑", primary: "#111827", background: "#ffffff",
    surface: "#f8fafc", text: "#111827", muted: "#64748b", border: "#e5e7eb",
  },
  blue: {
    id: "blue", name: "商务蓝", primary: "#2563eb", background: "#ffffff",
    surface: "#f5f9ff", text: "#172033", muted: "#64748b", border: "#dbe5f3",
  },
  green: {
    id: "green", name: "松石绿", primary: "#0f766e", background: "#ffffff",
    surface: "#f3fbf9", text: "#14312f", muted: "#647a78", border: "#d5e8e4",
  },
  purple: {
    id: "purple", name: "雾紫", primary: "#7c3aed", background: "#ffffff",
    surface: "#faf8ff", text: "#241a3a", muted: "#766c8a", border: "#e6def6",
  },
};

const makeLayout = (id, name, description, category, variant, extra = {}) => ({
  id, name, description, category, variant,
  header: "compact", columns: "single", sidebar: false, cards: false,
  timeline: false, grid: false, sectionStyle: "line", density: "comfortable",
  avatar: "small", ...extra,
});

// 30 个结构：不是颜色变体，而是不同的信息层级、列结构、标题位置、时间轴、卡片与项目展示方式。
export const layouts = {
  "minimal-single": makeLayout("minimal-single", "极简留白", "大留白、单栏、克制排版", "minimal", "minimal-single", { header: "large-name" }),
  "double-card": makeLayout("double-card", "双列卡片", "左右分栏，信息模块卡片化", "professional", "double-card", { columns: "double", cards: true, sectionStyle: "card", avatar: "circle" }),
  "left-sidebar": makeLayout("left-sidebar", "左侧经典", "左侧个人信息 + 右侧经历", "professional", "left-sidebar", { columns: "sidebar-left", sidebar: true, sectionStyle: "underline", avatar: "circle" }),
  "right-sidebar": makeLayout("right-sidebar", "右侧经典", "右侧个人资料，左侧内容主体", "modern", "right-sidebar", { columns: "sidebar-right", sidebar: true, sectionStyle: "underline", avatar: "circle" }),
  "timeline": makeLayout("timeline", "居中时间轴", "教育与工作经历沿中心轴展开", "timeline", "timeline", { header: "center", timeline: true, sectionStyle: "timeline", avatar: "medium" }),
  "editorial": makeLayout("editorial", "编辑杂志", "大标题、细线、杂志式层级", "creative", "editorial", { header: "editorial", columns: "editorial", sectionStyle: "editorial", avatar: "medium" }),
  "grid-cards": makeLayout("grid-cards", "网格卡片", "模块化网格，适合互联网岗位", "modern", "grid-cards", { columns: "grid", cards: true, grid: true, density: "compact" }),
  "hero-header": makeLayout("hero-header", "Hero 大标题", "突出姓名与求职目标", "creative", "hero-header", { header: "hero", sectionStyle: "bold", avatar: "large" }),
  "tech-terminal": makeLayout("tech-terminal", "科技终端", "开发者风格，代码与终端视觉", "tech", "tech-terminal", { columns: "tech", sidebar: true, cards: true, sectionStyle: "terminal", density: "compact", avatar: "square" }),
  "portfolio": makeLayout("portfolio", "作品集", "突出项目与作品经历", "portfolio", "portfolio", { columns: "portfolio", cards: true, grid: true, sectionStyle: "portfolio", avatar: "large" }),
  "corporate": makeLayout("corporate", "商务高密", "信息密度高，适合正式岗位", "professional", "corporate", { columns: "double", sectionStyle: "corporate", density: "dense" }),
  "modern-air": makeLayout("modern-air", "现代留白", "轻盈、精致、Apple 风格", "minimal", "modern-air", { columns: "double", sectionStyle: "air", avatar: "circle" }),

  "standard-ats": makeLayout("standard-ats", "标准 ATS", "单栏标准结构，适合网申与校招", "ats", "standard-ats", { header: "standard", sectionStyle: "ats", density: "compact" }),
  "business-classic": makeLayout("business-classic", "经典商务", "传统履历结构，强调职位与成果", "professional", "business-classic", { header: "classic", sectionStyle: "classic", density: "dense" }),
  "black-white-pro": makeLayout("black-white-pro", "黑白专业", "纯黑白层级，强调阅读效率", "ats", "black-white-pro", { header: "blackwhite", sectionStyle: "line", density: "comfortable" }),
  "compact-one-page": makeLayout("compact-one-page", "紧凑一页", "高信息密度，优先保证一页完成", "ats", "compact-one-page", { header: "compact", sectionStyle: "compact", density: "dense" }),
  "narrow-left": makeLayout("narrow-left", "左侧窄栏", "窄侧栏 + 宽内容区，适合技术岗位", "professional", "narrow-left", { columns: "narrow-left", sidebar: true, sectionStyle: "underline" }),
  "narrow-right": makeLayout("narrow-right", "右侧窄栏", "宽内容区 + 窄侧栏，视觉重心偏左", "modern", "narrow-right", { columns: "narrow-right", sidebar: true, sectionStyle: "underline" }),
  "top-banner": makeLayout("top-banner", "顶部横幅", "整宽顶部身份区，下方双栏内容", "modern", "top-banner", { header: "banner", columns: "double", sectionStyle: "card", avatar: "circle" }),
  "profile-sidebar": makeLayout("profile-sidebar", "个人信息侧栏", "固定个人信息区，主区突出经历", "professional", "profile-sidebar", { columns: "profile-sidebar", sidebar: true, sectionStyle: "line", avatar: "circle" }),
  "symmetric-columns": makeLayout("symmetric-columns", "对称双栏", "左右完全对称，适合均衡信息量", "professional", "symmetric-columns", { columns: "symmetric", sectionStyle: "line" }),
  "accent-strip": makeLayout("accent-strip", "色带结构", "左侧强调色带，正文保持简洁", "modern", "accent-strip", { columns: "accent-strip", sidebar: true, sectionStyle: "underline" }),
  "tech-developer": makeLayout("tech-developer", "Developer", "代码风格标题 + 技术栈优先", "tech", "tech-developer", { columns: "developer", sectionStyle: "terminal", density: "compact", avatar: "square" }),
  "ui-designer": makeLayout("ui-designer", "UI Designer", "视觉作品优先，项目采用大卡片", "creative", "ui-designer", { columns: "designer", grid: true, cards: true, sectionStyle: "portfolio", avatar: "large" }),
  "data-dashboard": makeLayout("data-dashboard", "数据仪表盘", "顶部摘要指标 + 下方信息面板", "tech", "data-dashboard", { columns: "dashboard", cards: true, grid: true, density: "compact" }),
  "concept-timeline": makeLayout("concept-timeline", "概念时间轴", "左侧年份轨道 + 右侧经历卡片", "timeline", "concept-timeline", { columns: "timeline-left", timeline: true, cards: true, sectionStyle: "timeline" }),
  "split-timeline": makeLayout("split-timeline", "左右时间轴", "两侧交替排布经历，视觉节奏更强", "timeline", "split-timeline", { columns: "split-timeline", timeline: true, sectionStyle: "timeline" }),
  "experience-roadmap": makeLayout("experience-roadmap", "经历路线图", "职业阶段像路线节点一样连续展开", "timeline", "experience-roadmap", { columns: "roadmap", timeline: true, sectionStyle: "timeline" }),
  "project-stack": makeLayout("project-stack", "项目卡片流", "项目大卡片纵向堆叠，突出项目成果", "portfolio", "project-stack", { columns: "project-stack", cards: true, sectionStyle: "portfolio" }),
  "brand-identity": makeLayout("brand-identity", "个人品牌", "大字号姓名 + 品牌口号 + 内容模块", "creative", "brand-identity", { header: "brand", sectionStyle: "bold", avatar: "medium" }),
  "clean-two-column": makeLayout("clean-two-column", "清爽双栏", "高可读双栏，适合应届生通用求职", "professional", "clean-two-column", { columns: "double", sectionStyle: "line", density: "comfortable" }),
  "photo-left": makeLayout("photo-left", "头像左置", "头像与个人信息集中在左上区域", "modern", "photo-left", { columns: "photo-left", sectionStyle: "line", avatar: "large" }),
  "photo-top": makeLayout("photo-top", "顶部头像", "顶部头像 + 姓名 + 联系方式，适合通用简历", "professional", "photo-top", { header: "photo-top", sectionStyle: "line", avatar: "medium" }),
  "skills-sidebar": makeLayout("skills-sidebar", "技能侧栏", "技能与证书独立侧栏，主体突出经历", "tech", "skills-sidebar", { columns: "skills-sidebar", sidebar: true, sectionStyle: "underline" }),
  "academic-cv": makeLayout("academic-cv", "学术简历", "教育科研优先，适合升学与科研方向", "professional", "academic-cv", { columns: "academic", sectionStyle: "classic", density: "comfortable" }),
  "consulting": makeLayout("consulting", "咨询顾问", "严谨网格与成果导向，适合咨询/运营/管理岗", "professional", "consulting", { columns: "double", sectionStyle: "corporate", density: "dense" }),
  "startup-modern": makeLayout("startup-modern", "互联网现代", "轻卡片 + 强层级，适合互联网校招", "modern", "startup-modern", { columns: "startup", cards: true, sectionStyle: "card" }),
  "elegant-serif": makeLayout("elegant-serif", "高级衬线", "大字号衬线标题与细线层级", "creative", "elegant-serif", { header: "serif", sectionStyle: "editorial" }),
  "mono-minimal": makeLayout("mono-minimal", "极简等宽", "等宽字体与编号结构，适合技术求职", "tech", "mono-minimal", { columns: "mono", sectionStyle: "terminal", density: "compact" }),
  "color-block": makeLayout("color-block", "色块侧栏", "大色块个人区 + 白色内容区", "modern", "color-block", { columns: "color-block", sidebar: true, avatar: "circle" }),
  "one-column-photo": makeLayout("one-column-photo", "照片单栏", "照片 + 姓名横向头部，内容单栏展开", "ats", "one-column-photo", { header: "photo-row", sectionStyle: "ats", density: "compact" }),
  "career-profile": makeLayout("career-profile", "职业档案", "职业标签 + 经历摘要 + 核心能力", "professional", "career-profile", { columns: "profile", cards: true, sectionStyle: "card" }),

};

export const templates = Object.values(layouts).flatMap((layout) =>
  Object.values(themes).map((theme) => ({
    id: `${layout.id}__${theme.id}`,
    layout: layout.id,
    theme: theme.id,
    name: layout.name,
    themeName: theme.name,
    description: layout.description,
    category: layout.category,
    variant: layout.variant,
    layoutData: layout,
    themeData: theme,
  }))
);

// Gallery 默认展示全部 30 个结构；颜色主题仍在右侧统一修改。
export const featuredTemplates = Object.values(layouts).map((layout) =>
  templates.find((template) => template.layout === layout.id && template.theme === "black")
).filter(Boolean);

export function getTemplate(id) {
  if (id) {
    const exact = templates.find((template) => template.id === id);
    if (exact) return exact;

    // V2.5：排版结构与主题彻底解耦。
    // 传入 "startup-modern" 或 "startup-modern__business" 时，都应返回对应结构，
    // 避免自定义主题 ID 不存在于模板主题表时错误回退到标准 ATS。
    const layoutId = String(id).split("__")[0];
    const layoutTemplate = templates.find((template) => template.layout === layoutId);
    if (layoutTemplate) return layoutTemplate;
  }

  return (
    templates.find((template) => template.layout === "standard-ats" && template.theme === "blue") ||
    templates[0]
  );
}

export function getTemplateByParts(layoutId, themeId = "black") {
  return getTemplate(`${layoutId}__${themeId}`);
}

export function getTemplatesByLayout(layoutId) {
  return templates.filter((template) => template.layout === layoutId);
}

export const templateCategories = [
  { id: "all", name: "全部" },
  { id: "ats", name: "ATS" },
  { id: "minimal", name: "极简" },
  { id: "professional", name: "商务" },
  { id: "modern", name: "现代" },
  { id: "tech", name: "科技" },
  { id: "timeline", name: "时间轴" },
  { id: "portfolio", name: "作品集" },
  { id: "creative", name: "创意" },
];
