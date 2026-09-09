import React from "react";
import {
  Palette,
  UserRound,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";

import ProfileEditor from "./ProfileEditor";
import SectionEditor from "./SectionEditor";

export default function RightPanel({
  resume,
  layout,
  selectedSection,
  theme,
  setTheme,
  onProfileChange,
  onLayoutChange,
  onResumeChange,
  onSectionChange,
  onUpload,
  onClearAvatar,
  onDelete,
}) {
  const [mode, setMode] = React.useState("content");

  return (
    <aside className="right-panel editor-only flex w-[330px] shrink-0 flex-col border-l border-slate-200 bg-white">
      {/* 顶部切换 */}
      <div className="flex border-b border-slate-100 p-2">
        <button
          type="button"
          onClick={() => setMode("content")}
          className={`flex-1 rounded-xl py-2 text-[11px] ${
            mode === "content"
              ? "bg-slate-900 text-white"
              : "text-slate-500"
          }`}
        >
          {selectedSection ? "模块编辑" : "个人信息"}
        </button>

        <button
          type="button"
          onClick={() => setMode("theme")}
          className={`flex-1 rounded-xl py-2 text-[11px] ${
            mode === "theme"
              ? "bg-slate-900 text-white"
              : "text-slate-500"
          }`}
        >
          <Palette size={13} className="mr-1 inline" />
          主题
        </button>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-auto p-4">
        {mode === "content" ? (
          <>
            {/* 个人信息入口 */}
            <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => onSectionChange(null)}
                className={`w-full rounded-lg px-3 py-2 text-left text-[11px] ${
                  !selectedSection ? "bg-white shadow-sm" : ""
                }`}
              >
                <UserRound size={13} className="mr-1 inline" />
                编辑个人信息 / 姓名 / 照片定位
              </button>
            </div>

            {/* 未选择模块：编辑个人信息 */}
            {!selectedSection ? (
              <ProfileEditor
                profile={resume.profile}
                layout={layout}
                onProfileChange={onProfileChange}
                onLayoutChange={onLayoutChange}
                onUpload={onUpload}
                onClearAvatar={onClearAvatar}
              />
            ) : (
              <>
                {/* 模块编辑 */}
                <SectionEditor
                  section={selectedSection}
                  resume={resume}
                  onResumeChange={onResumeChange}
                  onSectionChange={onSectionChange}
                />

                {/* 删除模块 */}
                <button
                  type="button"
                  onClick={() => onDelete(selectedSection.id)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 text-[11px] text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={14} />
                  删除模块
                </button>
              </>
            )}
          </>
        ) : (
          <ThemePanel theme={theme} setTheme={setTheme} />
        )}
      </div>
    </aside>
  );
}


/* =========================================================
   主题面板
   ========================================================= */

function ThemePanel({ theme, setTheme }) {
  const presets = [
    { id:"midnight", name:"午夜黑", primary:"#111827", surface:"#f5f7fa", border:"#e5e7eb" },
    { id:"business", name:"商务蓝", primary:"#2563eb", surface:"#f5f9ff", border:"#dbe5f3" },
    { id:"ocean", name:"深海青", primary:"#0f766e", surface:"#f1faf8", border:"#d6ebe7" },
    { id:"violet", name:"高级紫", primary:"#6d4aff", surface:"#f8f6ff", border:"#e4ddff" },
    { id:"forest", name:"墨绿", primary:"#166534", surface:"#f3faf5", border:"#d7eadc" },
    { id:"wine", name:"酒红", primary:"#9f1239", surface:"#fff5f7", border:"#f0d7df" },
    { id:"cyan", name:"科技青", primary:"#0891b2", surface:"#f0fbfd", border:"#d1edf2" },
    { id:"slate", name:"石墨灰", primary:"#475569", surface:"#f6f8fa", border:"#e2e8f0" },
  ];
  const currentPrimary = theme?.primary || "#2563eb";
  const currentPreset = presets.find((item)=>item.primary.toLowerCase()===currentPrimary.toLowerCase());
  const apply = (preset) => setTheme((current)=>({ ...current, id:preset.id, name:preset.name, primary:preset.primary, surface:preset.surface, border:preset.border, background:"#ffffff", text:"#172033", muted:"#64748b" }));

  return <div className="theme-center-panel">
    <div className="theme-hero"><div><div className="theme-kicker">DESIGN SYSTEM</div><h3>简历主题中心</h3><p>用一套完整的色彩系统统一姓名、模块、标签与强调线。</p></div><div className="theme-orb" style={{background:currentPrimary}} /></div>
    <div className="theme-section-title"><span>推荐主题</span><em>{currentPreset?.name || "自定义"}</em></div>
    <div className="theme-preset-grid">{presets.map((preset)=><button key={preset.id} type="button" className={`theme-preset-card ${currentPrimary.toLowerCase()===preset.primary.toLowerCase()?"active":""}`} onClick={()=>apply(preset)}><span className="theme-preview" style={{background:preset.surface,borderColor:preset.border}}><i style={{background:preset.primary}}/><b style={{background:preset.primary}}/><small style={{background:preset.border}}/></span><span>{preset.name}</span>{currentPrimary.toLowerCase()===preset.primary.toLowerCase()&&<strong>✓</strong>}</button>)}</div>
    <div className="theme-custom-card"><div className="theme-section-title"><span>自定义主题色</span><em>HEX</em></div><div className="theme-color-row"><input type="color" value={currentPrimary} onChange={(e)=>setTheme((current)=>({...current,primary:e.target.value,id:"custom",name:"自定义主题"}))}/><div><strong>{currentPrimary.toUpperCase()}</strong><small>点击色板自由选择品牌色</small></div></div></div>
    <div className="theme-style-card"><div className="theme-section-title"><span>视觉效果预览</span></div><div className="theme-demo" style={{"--demo":currentPrimary}}><div className="demo-title"><span style={{background:currentPrimary}}/>张三</div><div className="demo-lines"><i/><i/><i/></div><div className="demo-tags"><b style={{background:currentPrimary}}>React</b><b style={{background:currentPrimary}}>TypeScript</b><b style={{background:currentPrimary}}>UI</b></div></div></div>
    <div className="theme-note">主题只改变视觉风格，不会覆盖简历内容，也不会改变当前模板结构。模板与主题可以自由组合。</div>
  </div>;
}
