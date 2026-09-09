import React from "react";
import html2canvas from "html2canvas";
import {
  Undo2,
  Redo2,
  FileImage,
  Printer,
  ZoomIn,
  ZoomOut,
  CheckCircle2,
  Maximize2,
  Minimize2,
} from "lucide-react";
import LeftSidebar from "./components/LeftSidebar";
import RightPanel from "./components/RightPanel";
import Canvas from "./components/Canvas";
import TemplateGallery from "./components/TemplateGallery";
import { initialResumeData, defaultSections, initialLayout } from "./data/MockData";
import { getTemplate } from "./data/TemplateEngine";

const clone = (value) => JSON.parse(JSON.stringify(value));
const DEFAULT_TEMPLATE = "standard-ats";

export default function App() {
  const [resume, setResume] = React.useState(() => clone(initialResumeData));
  const [sections, setSections] = React.useState(() => clone(defaultSections));
  const [layout, setLayout] = React.useState(() => clone(initialLayout));
  const [selectedId, setSelectedId] = React.useState(null);
  const [currentTemplate, setCurrentTemplate] = React.useState(DEFAULT_TEMPLATE);
  const [theme, setTheme] = React.useState(() => clone(getTemplate(DEFAULT_TEMPLATE).themeData));
  const [zoom, setZoom] = React.useState(0.72);
  const [pageCount, setPageCount] = React.useState(1);
  const [history, setHistory] = React.useState([]);
  const [historyIndex, setHistoryIndex] = React.useState(-1);
  const [fullscreen, setFullscreen] = React.useState(false);
  const [savedStatus, setSavedStatus] = React.useState("未保存");
  const fileRef = React.useRef(null);

  const snapshot = React.useCallback(
    () => ({
      resume: clone(resume),
      sections: clone(sections),
      layout: clone(layout),
      currentTemplate,
      theme: clone(theme),
    }),
    [resume, sections, layout, currentTemplate, theme]
  );

  const commit = React.useCallback(() => {
    setHistory((items) => {
      const next = [...items.slice(0, historyIndex + 1), snapshot()];
      return next.slice(-40);
    });
    setHistoryIndex((index) => Math.min(index + 1, 39));
  }, [historyIndex, snapshot]);

  const updateResume = (next) => {
    commit();
    setResume(clone(next));
    setSavedStatus("未保存");
  };

  const updateSections = (next) => {
    commit();
    setSections(clone(next));
    setSavedStatus("未保存");
  };

  const updateLayout = (next) => {
    commit();
    setLayout((current) => clone(typeof next === "function" ? next(current) : next));
    setSavedStatus("未保存");
  };

  // 拖动姓名/照片时使用实时更新，避免每一帧都写入撤销历史。
  const updateLayoutLive = (next) => {
    setLayout((current) => clone(typeof next === "function" ? next(current) : next));
    setSavedStatus("未保存");
  };

  const updateSection = (changes) => {
    if (!selectedId) return;
    updateSections(
      sections.map((section) =>
        section.id === selectedId ? { ...section, ...changes } : section
      )
    );
  };

  const selectSection = (sectionOrId) => {
    const id =
      typeof sectionOrId === "string"
        ? sectionOrId
        : sectionOrId?.id || null;
    setSelectedId(id);
  };

  const addSection = (type = "summary") => {
    const map = {
      summary: ["个人简介", "UserRound"], education: ["教育经历", "GraduationCap"], experience: ["工作经历", "BriefcaseBusiness"], projects: ["项目经历", "FolderKanban"], skills: ["专业技能", "Sparkles"], honors: ["荣誉证书", "Award"],
      internship: ["实习经历", "Briefcase"], campus: ["校园经历", "School"], volunteer: ["志愿服务", "HeartHandshake"], awards: ["竞赛获奖", "Trophy"], certificates: ["证书认证", "BadgeCheck"], languages: ["语言能力", "Languages"], research: ["科研经历", "Microscope"], publications: ["论文发表", "FileText"], "open-source": ["开源项目", "GitBranch"], portfolio: ["作品集", "Palette"], social: ["社交链接", "Link2"], interests: ["兴趣爱好", "Heart"], "self-evaluation": ["自我评价", "Quote"],
    };

    const [title, icon] = map[type] || map.summary;
    const section = {
      id: `${type}-${Date.now()}`,
      type,
      title,
      icon,
      visible: true,
      content: "",
    };

    updateSections([...sections, section]);
    setSelectedId(section.id);
  };

  const toggleSection = (id) => {
    updateSections(
      sections.map((section) =>
        section.id === id
          ? { ...section, visible: section.visible === false }
          : section
      )
    );
  };

  const deleteSection = (id) => {
    updateSections(sections.filter((section) => section.id !== id));
    setSelectedId(null);
  };

  const handleReorderSections = (sourceId, targetId) => {
    if (sourceId === targetId) return;

    const sourceIndex = sections.findIndex(
      (section) => section.id === sourceId
    );
    const targetIndex = sections.findIndex(
      (section) => section.id === targetId
    );

    if (sourceIndex < 0 || targetIndex < 0) return;

    const next = [...sections];
    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);
    updateSections(next);
  };

  const changeTemplate = (template) => {
    const id = typeof template === "string" ? template : template?.id;
    if (!id) return;

    const nextTemplate = getTemplate(id);
    commit();
    // 当前版本只保存“排版结构 ID”，主题完全独立保存。
    // 这样即使右侧使用自定义主题 ID，也不会导致 getTemplate() 回退到默认模板。
    setCurrentTemplate(nextTemplate.layout);
    setSavedStatus("未保存");
  };

  const setThemeWithStatus = React.useCallback((next) => {
    setTheme((current) => clone(typeof next === "function" ? next(current) : next));
    setSavedStatus("未保存");
  }, []);

  const onProfileChange = (changes) => {
    updateResume({
      ...resume,
      profile: {
        ...resume.profile,
        ...changes,
      },
    });
  };

  const onResumeChange = (changes) => {
    updateResume({
      ...resume,
      ...changes,
    });
  };

  const onSectionChange = (changes) => {
    if (changes === null) {
      setSelectedId(null);
      return;
    }
    updateSection(changes);
  };

  const saveManually = () => {
    try {
      localStorage.setItem(
        "resume-studio-manual-save",
        JSON.stringify({ resume, sections, layout, currentTemplate, theme })
      );
      setSavedStatus("已手动保存");
    } catch {
      setSavedStatus("保存失败");
    }
  };

  const restoreManual = () => {
    try {
      const raw = localStorage.getItem("resume-studio-manual-save");
      if (!raw) {
        setSavedStatus("暂无手动存档");
        return;
      }
      const state = JSON.parse(raw);
      setResume(clone(state.resume || initialResumeData));
      setSections(clone(state.sections || defaultSections));
      setLayout(clone(state.layout || initialLayout));
      setCurrentTemplate(state.currentTemplate || DEFAULT_TEMPLATE);
      setTheme(clone(state.theme || getTemplate(DEFAULT_TEMPLATE).themeData));
      setSavedStatus("已恢复手动存档");
    } catch {
      setSavedStatus("恢复失败");
    }
  };



  const undo = () => {
    if (historyIndex < 0) return;

    const state = history[historyIndex];
    setResume(clone(state.resume));
    setSections(clone(state.sections));
    setLayout(clone(state.layout));
    setCurrentTemplate(state.currentTemplate);
    setTheme(clone(state.theme));
    setHistoryIndex((index) => index - 1);
  };

  const redo = () => {
    const nextIndex = historyIndex + 1;
    if (nextIndex >= history.length) return;

    const state = history[nextIndex];
    setResume(clone(state.resume));
    setSections(clone(state.sections));
    setLayout(clone(state.layout));
    setCurrentTemplate(state.currentTemplate);
    setTheme(clone(state.theme));
    setHistoryIndex(nextIndex);
  };

  const onUpload = () => fileRef.current?.click();

  const onFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => onProfileChange({ avatar: reader.result });
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const enterFullscreen = async () => {
    setFullscreen(true);
    try { await document.querySelector(".editor-shell")?.requestFullscreen?.(); } catch {}
  };

  const exitFullscreen = async () => {
    setFullscreen(false);
    try { if (document.fullscreenElement) await document.exitFullscreen(); } catch {}
  };

  React.useEffect(() => {
    const sync = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  React.useEffect(() => {
    const updatePageCount = () => {
      const element = document.getElementById("resume-canvas");
      if (!element) return;
      const height = Math.max(1123, element.scrollHeight || element.getBoundingClientRect().height || 1123);
      setPageCount(Math.max(1, Math.ceil(height / 1123)));
    };
    updatePageCount();
    const observer = new ResizeObserver(updatePageCount);
    const element = document.getElementById("resume-canvas");
    if (element) observer.observe(element);
    window.addEventListener("resize", updatePageCount);
    return () => { observer.disconnect(); window.removeEventListener("resize", updatePageCount); };
  }, [resume, sections, layout, currentTemplate, theme, zoom]);

  const exportPNG = async () => {
    const source = document.getElementById("resume-canvas");
    if (!source) {
      setSavedStatus("PNG导出失败");
      return;
    }

    const host = document.createElement("div");
    host.className = "resume-export-host";
    const cloneElement = source.cloneNode(true);
    cloneElement.removeAttribute("id");
    cloneElement.classList.add("resume-exporting");
    host.appendChild(cloneElement);
    document.body.appendChild(host);

    try {
      if (document.fonts?.ready) await document.fonts.ready;
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

      const images = Array.from(cloneElement.querySelectorAll("img"));
      await Promise.all(images.map((img) => typeof img.decode === "function" ? img.decode().catch(() => {}) : Promise.resolve()));

      // 导出克隆的是“完整预览 DOM”，高度允许自然增长；然后严格按 A4 高度切片。
      // 这样不会再把缩放后的预览尺寸误当成 PNG 尺寸。
      const width = 794;
      const fullHeight = Math.max(1123, cloneElement.scrollHeight || cloneElement.getBoundingClientRect().height);
      const pages = Math.max(1, Math.ceil(fullHeight / 1123));
      const rendered = await html2canvas(cloneElement, {
        scale: 3,
        width,
        height: fullHeight,
        windowWidth: width,
        windowHeight: fullHeight,
        useCORS: true,
        allowTaint: false,
        backgroundColor: theme.background || "#ffffff",
        logging: false,
        imageTimeout: 15000,
        scrollX: 0,
        scrollY: 0,
      });

      const pixelWidth = width * 3;
      const pixelPageHeight = 1123 * 3;
      const name = resume.profile.name || "resume";

      for (let index = 0; index < pages; index += 1) {
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = pixelWidth;
        pageCanvas.height = pixelPageHeight;
        const ctx = pageCanvas.getContext("2d");
        ctx.fillStyle = theme.background || "#ffffff";
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        const sourceY = index * pixelPageHeight;
        const sourceHeight = Math.min(pixelPageHeight, rendered.height - sourceY);
        if (sourceHeight > 0) {
          ctx.drawImage(rendered, 0, sourceY, pixelWidth, sourceHeight, 0, 0, pixelWidth, sourceHeight);
        }
        const link = document.createElement("a");
        link.download = `${name}-resume-page-${index + 1}.png`;
        link.href = pageCanvas.toDataURL("image/png");
        document.body.appendChild(link);
        link.click();
        link.remove();
        // 给浏览器一个事件循环，降低多文件下载被拦截的概率。
        if (index < pages - 1) await new Promise((resolve) => setTimeout(resolve, 180));
      }
      setSavedStatus(`PNG已导出，共${pages}页`);
    } catch (error) {
      console.error("PNG 导出失败", error);
      setSavedStatus("PNG导出失败");
    } finally {
      host.remove();
    }
  };

  const current = getTemplate(currentTemplate);
  const selectedSection = sections.find(
    (section) => section.id === selectedId
  );

  return (
    <div className={`editor-shell flex h-screen flex-col overflow-hidden ${fullscreen ? "is-app-fullscreen" : ""}`}>
      <header className="topbar editor-only glass-top flex h-[64px] shrink-0 items-center justify-between border-b border-slate-200 px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
            R
          </div>
          <div>
            <div className="text-sm font-semibold">
              Resume Studio
              <span className="ml-1 rounded-md bg-slate-100 px-1.5 py-0.5 text-[8px] text-slate-500">
                V2.5
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              Visual Resume Builder
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={undo}
            disabled={historyIndex < 0}
            className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
            title="撤销"
          >
            <Undo2 size={15} />
          </button>

          <button
            type="button"
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
            title="重做"
          >
            <Redo2 size={15} />
          </button>

          <span className="mx-2 h-5 w-px bg-slate-200" />

          <button
            type="button"
            onClick={() => setZoom((value) => Math.max(0.55, value - 0.05))}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
          >
            <ZoomOut size={15} />
          </button>

          <span className="w-10 text-center text-[10px] text-slate-400">
            {Math.round(zoom * 100)}%
          </span>

          <span className="page-count-badge" title="按 A4 高度自动分页">
            {pageCount} 页
          </span>

          <button
            type="button"
            onClick={() => setZoom((value) => Math.min(1.25, value + 0.05))}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
          >
            <ZoomIn size={15} />
          </button>

          <span className="mx-2 h-5 w-px bg-slate-200" />

          <button
            type="button"
            onClick={saveManually}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50"
            title="手动保存到本机浏览器"
          >
            <CheckCircle2 size={14} />
            保存
          </button>
          <button
            type="button"
            onClick={restoreManual}
            className="rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50"
            title="恢复上一次手动保存"
          >
            恢复
          </button>

          <button
            type="button"
            onClick={fullscreen ? exitFullscreen : enterFullscreen}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium ${fullscreen ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-700"}`}
            title={fullscreen ? "退出全屏" : "全屏预览"}
          >
            {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            {fullscreen ? "退出全屏" : "全屏预览"}
          </button>

          <button
            type="button"
            onClick={exportPNG}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-xs"
          >
            <FileImage size={14} />
            PNG
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-medium text-white"
          >
            <Printer size={14} />
            导出 PDF
          </button>
        </div>
      </header>

      <TemplateGallery
        currentTemplate={currentTemplate}
        onSelect={changeTemplate}
      />

      <main className="flex min-h-0 flex-1">
        <LeftSidebar
          sections={sections}
          selectedSection={selectedSection}
          onSelect={selectSection}
          onToggle={toggleSection}
          onReorder={handleReorderSections}
          onAdd={addSection}
        />

        <div className="print-wrap resume-stage min-w-0 flex-1 overflow-auto p-10">
          <div
            className="resume-zoom-wrap"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top center",
              height: `${1123 * zoom}px`,
            }}
          >
            <Canvas
              resume={resume}
              sections={sections}
              theme={theme}
              layout={{ ...current.layoutData, profile: layout.profile }}
              selectedSection={selectedSection}
              onSectionChange={onSectionChange}
              onLayoutChange={updateLayoutLive}
            />
          </div>
        </div>

        <RightPanel
          resume={resume}
          layout={layout}
          selectedSection={selectedSection}
          theme={theme}
          setTheme={setThemeWithStatus}
          onProfileChange={onProfileChange}
          onLayoutChange={updateLayout}
          onResumeChange={onResumeChange}
          onSectionChange={onSectionChange}
          onUpload={onUpload}
          onClearAvatar={() => onProfileChange({ avatar: "" })}
          onDelete={deleteSection}
        />
      </main>

      {fullscreen && (
        <button
          type="button"
          className="fullscreen-exit editor-only"
          onClick={exitFullscreen}
          title="退出全屏预览"
        >
          <Minimize2 size={15} />
          退出全屏
        </button>
      )}

      <footer className="site-footer editor-only">
        <span>© 2026 Resume Studio · All Rights Reserved.</span>
        <span>本产品仅提供简历编辑与排版服务，用户应确保填写内容真实、合法。</span>
        <span className="site-footer-links">使用帮助 · 隐私说明 · 用户协议 · 关于我们</span>
      </footer>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={onFile}
        className="hidden"
      />
    </div>
  );
}
