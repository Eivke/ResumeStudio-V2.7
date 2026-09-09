import React, { useMemo, useState } from "react";
import { ChevronDown, LayoutTemplate, Check, Search } from "lucide-react";
import { featuredTemplates, templateCategories } from "../data/TemplateEngine";

export default function TemplateGallery({ currentTemplate, onSelect }) {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const currentLayout =
    typeof currentTemplate === "string"
      ? currentTemplate.split("__")[0]
      : currentTemplate?.layout || "standard-ats";

  const filteredTemplates = useMemo(() => {
    const q = query.trim().toLowerCase();
    return featuredTemplates.filter((template) => {
      const matchCategory = category === "all" || template.category === category;
      const matchQuery = !q || `${template.name} ${template.description}`.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [category, query]);

  return (
    <div className="template-gallery-wrapper editor-only">
      {!open ? (
        <button type="button" className="template-gallery-trigger" onClick={() => setOpen(true)}>
          <LayoutTemplate size={15} />
          <span>模板</span>
          <span className="template-count">{featuredTemplates.length} 种结构</span>
          <ChevronDown size={15} />
        </button>
      ) : (
        <div className="template-gallery-panel">
          <div className="template-gallery-header">
            <div>
              <div className="template-gallery-title"><LayoutTemplate size={16} /><span>选择简历模板</span></div>
              <div className="template-gallery-subtitle">42 种大众化排版结构；主题颜色统一在右侧「主题」中修改</div>
            </div>
            <button type="button" className="template-gallery-close" onClick={() => setOpen(false)} title="收起"><ChevronDown size={16} /></button>
          </div>

          <div className="template-gallery-toolbar">
            <div className="template-category-tabs">
              {templateCategories.map((item) => (
                <button key={item.id} type="button" className={category === item.id ? "active" : ""} onClick={() => setCategory(item.id)}>{item.name}</button>
              ))}
            </div>
            <label className="template-search">
              <Search size={14} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索模板名称…" />
            </label>
          </div>

          <div className="template-gallery-grid">
            {filteredTemplates.map((template) => {
              const selected = template.layout === currentLayout;
              return (
                <button type="button" key={template.id} className={`template-card ${selected ? "template-card-active" : ""}`} onClick={() => { onSelect?.(template); setOpen(false); }}>
                  <div className={`template-preview template-preview-${template.layout}`}>
                    <TemplatePreview layout={template.layout} />
                    {selected && <div className="template-selected"><Check size={13} /></div>}
                  </div>
                  <div className="template-card-info">
                    <div className="template-card-name">{template.name}</div>
                    <div className="template-card-description">{template.description}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="template-gallery-footer">已显示 {filteredTemplates.length} / {featuredTemplates.length} 种结构 · 切换模板不会删除你的简历内容。</div>
        </div>
      )}
    </div>
  );
}

function TemplatePreview({ layout }) {
  const variants = {
    "minimal-single": <><div className="p-name w70" /><div className="p-rule" /><div className="p-lines" /><div className="p-lines" /><div className="p-lines" /></>,
    "double-card": <><div className="p-head" /><div className="p-cols"><div><i /><i /></div><div><i /><i /></div></div></>,
    "left-sidebar": <div className="p-side-layout"><b /><main><div className="p-head" /><i /><i /><i /></main></div>,
    "right-sidebar": <div className="p-side-layout"><main><div className="p-head" /><i /><i /><i /></main><b /></div>,
    "timeline": <><div className="p-center" /><div className="p-timeline"><i /><i /><i /><i /></div></>,
    "editorial": <><div className="p-editor-title" /><div className="p-editor-grid"><i /><i /><i /><i /></div></>,
    "grid-cards": <><div className="p-head" /><div className="p-grid"><i className="big" /><i /><i /><i /></div></>,
    "hero-header": <><div className="p-hero-avatar" /><div className="p-hero-title" /><div className="p-lines" /><div className="p-lines" /></>,
    "tech-terminal": <div className="p-terminal"><b /><main><i /><i /><i /></main></div>,
    "portfolio": <><div className="p-head" /><div className="p-portfolio"><i className="big" /><i /><i /><i /></div></>,
    "corporate": <><div className="p-corp-head" /><div className="p-cols"><div><i /><i /><i /></div><div><i /><i /></div></div></>,
    "modern-air": <><div className="p-air-head" /><div className="p-cols"><div><i /><i /></div><div><i /><i /></div></div></>,
    "standard-ats": <><div className="p-ats-head" /><div className="p-ats-rule" /><div className="p-lines" /><div className="p-lines" /><div className="p-lines" /><div className="p-lines" /></>,
    "business-classic": <><div className="p-classic-head" /><div className="p-classic-body"><main><i /><i /><i /></main><b><i /><i /></b></div></>,
    "black-white-pro": <><div className="p-bw-head" /><div className="p-bw-cols"><i /><i /></div></>,
    "compact-one-page": <><div className="p-compact-head" /><div className="p-compact-cols"><i /><i /><i /><i /><i /><i /></div></>,
    "narrow-left": <div className="p-narrow"><b /><main><div className="p-head" /><i /><i /><i /></main></div>,
    "narrow-right": <div className="p-narrow"><main><div className="p-head" /><i /><i /><i /></main><b /></div>,
    "top-banner": <><div className="p-banner" /><div className="p-cols"><div><i /><i /></div><div><i /><i /></div></div></>,
    "profile-sidebar": <div className="p-profile"><b /><main><div className="p-head" /><i /><i /><i /></main></div>,
    "symmetric-columns": <><div className="p-head" /><div className="p-symmetric"><i /><i /></div></>,
    "accent-strip": <div className="p-accent"><b /><main><div className="p-head" /><i /><i /></main></div>,
    "tech-developer": <><div className="p-command" /><div className="p-dev-head" /><div className="p-dev-cols"><i /><i /></div></>,
    "ui-designer": <><div className="p-designer-head" /><div className="p-design-grid"><i className="big" /><i /><i /></div></>,
    "data-dashboard": <><div className="p-head" /><div className="p-stats"><i /><i /><i /></div><div className="p-dashboard-grid"><i /><i /><i /><i /></div></>,
    "concept-timeline": <><div className="p-head" /><div className="p-concept"><b /><i /><b /><i /><b /><i /></div></>,
    "split-timeline": <><div className="p-head" /><div className="p-split-axis"><i /><i /><i /><i /></div></>,
    "experience-roadmap": <><div className="p-head" /><div className="p-roadmap"><b /><i /><b /><i /><b /><i /></div></>,
    "project-stack": <><div className="p-project-head" /><div className="p-project-stack"><i className="big" /><i /><i /></div></>,
    "brand-identity": <><div className="p-brand-number" /><div className="p-brand-head" /><div className="p-lines" /><div className="p-lines" /><div className="p-lines" /></>,
    "clean-two-column": <><div className="p-head" /><div className="p-clean-cols"><i /><i /></div></>,
    "photo-left": <div className="p-photo-left"><b /><main><div className="p-head" /><i /><i /></main></div>,
    "photo-top": <><div className="p-photo-top" /><div className="p-head" /><div className="p-lines" /><div className="p-lines" /></>,
    "skills-sidebar": <div className="p-skills-side"><b /><main><div className="p-head" /><i /><i /></main></div>,
    "academic-cv": <><div className="p-academic" /><div className="p-rule" /><div className="p-lines" /><div className="p-lines" /><div className="p-lines" /></>,
    "consulting": <><div className="p-head" /><div className="p-consulting"><i /><i /><i /><i /></div></>,
    "startup-modern": <><div className="p-startup-head" /><div className="p-startup-grid"><i /><i /><i /></div></>,
    "elegant-serif": <><div className="p-serif-head" /><div className="p-serif-cols"><i /><i /></div></>,
    "mono-minimal": <><div className="p-mono" /><div className="p-mono-title" /><div className="p-lines" /><div className="p-lines" /></>,
    "color-block": <div className="p-color-block"><b /><main><div className="p-head" /><i /><i /><i /></main></div>,
    "one-column-photo": <><div className="p-one-photo" /><div className="p-head" /><div className="p-lines" /><div className="p-lines" /></>,
    "career-profile": <><div className="p-career-head" /><div className="p-career-grid"><i /><i /><i /><i /></div></>,
  };
  const previewAccents = ["#3b82f6", "#0f766e", "#7c3aed", "#c2410c", "#be123c", "#0f766e", "#2563eb", "#475569"];
  const accent = previewAccents[(layout.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0)) % previewAccents.length];

  return (
    <div className={`tp tp-${layout}`} style={{ "--preview-accent": accent }}>
      {variants[layout] || variants["standard-ats"]}
      <div className="tp-sample-content" aria-hidden="true">
        <strong>张三</strong>
        <span>前端开发工程师</span>
        <i />
        <small>个人简介</small>
        <b />
        <b />
        <small>教育经历</small>
        <b />
        <b />
      </div>
      <span className="tp-sample-label" aria-hidden="true">A4 排版预览</span>
    </div>
  );
}
