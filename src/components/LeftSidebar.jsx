import React, { useMemo, useState } from "react";
import * as Icons from "lucide-react";
import {
  GripVertical,
  Eye,
  EyeOff,
  Plus,
  UserRound,
  FileText,
  GraduationCap,
  BriefcaseBusiness,
  FolderKanban,
  Sparkles,
  Award,
} from "lucide-react";

const iconMap = {
  profile: UserRound,
  summary: FileText,
  education: GraduationCap,
  experience: BriefcaseBusiness,
  projects: FolderKanban,
  skills: Sparkles,
  honors: Award,
};

const addOptions = [
  ["summary", "个人简介", "UserRound", "常用"],
  ["education", "教育经历", "GraduationCap", "常用"],
  ["experience", "工作经历", "BriefcaseBusiness", "求职"],
  ["projects", "项目经历", "FolderKanban", "求职"],
  ["skills", "专业技能", "Sparkles", "求职"],
  ["honors", "荣誉证书", "Award", "求职"],
  ["internship", "实习经历", "Briefcase", "求职"],
  ["campus", "校园经历", "School", "校园"],
  ["volunteer", "志愿服务", "HeartHandshake", "校园"],
  ["awards", "竞赛获奖", "Trophy", "校园"],
  ["certificates", "证书认证", "BadgeCheck", "求职"],
  ["languages", "语言能力", "Languages", "能力"],
  ["research", "科研经历", "Microscope", "专业"],
  ["publications", "论文发表", "FileText", "专业"],
  ["open-source", "开源项目", "GitBranch", "专业"],
  ["portfolio", "作品集", "Palette", "专业"],
  ["social", "社交链接", "Link2", "其他"],
  ["interests", "兴趣爱好", "Heart", "其他"],
  ["self-evaluation", "自我评价", "Quote", "其他"],
];

export default function LeftSidebar({
  sections = [],
  selectedSection,
  onSelect,
  onToggle,
  onReorder,
  onAdd,
}) {
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [addCategory, setAddCategory] = useState("全部");
  const addCategories = ["全部", "常用", "求职", "校园", "能力", "专业", "其他"];
  const filteredAddOptions = useMemo(() => addOptions.filter(([, , , category]) => addCategory === "全部" || category === addCategory), [addCategory]);

  const handleDragStart = (event, id) => {
    setDraggedId(id);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (event, id) => {
    event.preventDefault();
    if (!draggedId || draggedId === id) return;
    setDragOverId(id);
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (event, targetId) => {
    event.preventDefault();

    const sourceId =
      event.dataTransfer.getData("text/plain") || draggedId;

    if (sourceId && targetId && sourceId !== targetId) {
      onReorder?.(sourceId, targetId);
    }

    setDraggedId(null);
    setDragOverId(null);
  };

  return (
    <aside className="left-sidebar editor-only">
      <div className="left-sidebar-header">
        <div>
          <div className="left-sidebar-title">简历模块</div>
          <div className="left-sidebar-subtitle">拖动调整顺序</div>
        </div>
        <div className="module-count">{sections.length}</div>
      </div>

      <div className="left-sidebar-list">
        {sections.map((section) => {
          const Icon = Icons[section.icon] || iconMap[section.type] || FileText;
          const selected = selectedSection?.id === section.id;
          const dragging = draggedId === section.id;
          const dragOver = dragOverId === section.id;

          return (
            <div
              key={section.id}
              draggable
              onDragStart={(event) => handleDragStart(event, section.id)}
              onDragOver={(event) => handleDragOver(event, section.id)}
              onDrop={(event) => handleDrop(event, section.id)}
              onDragEnd={() => {
                setDraggedId(null);
                setDragOverId(null);
              }}
              className={`resume-module-item ${selected ? "active" : ""} ${
                dragging ? "dragging" : ""
              } ${dragOver ? "drag-over" : ""}`}
              onClick={() => onSelect?.(section)}
            >
              <div
                className="module-drag-handle"
                title="拖动调整顺序"
                onClick={(event) => event.stopPropagation()}
              >
                <GripVertical size={16} />
              </div>

              <div className="module-icon">
                <Icon size={15} />
              </div>

              <div className="module-name">
                <div>{section.title || "未命名模块"}</div>
                {selected && <span>编辑中</span>}
              </div>

              <button
                type="button"
                className="module-visibility"
                title={section.visible === false ? "显示模块" : "隐藏模块"}
                onClick={(event) => {
                  event.stopPropagation();
                  onToggle?.(section.id);
                }}
              >
                {section.visible === false ? (
                  <EyeOff size={15} />
                ) : (
                  <Eye size={15} />
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="left-sidebar-footer">
        {showAdd && (
          <div className="add-module-menu add-module-library add-module-fixed-panel">
            <div className="add-module-library-head"><div><strong>添加简历模块</strong><span>选择一个模块立即添加</span></div><button type="button" className="add-module-close" onClick={() => setShowAdd(false)}>×</button></div>
            <div className="add-module-tabs">{addCategories.map((item) => <button key={item} type="button" className={addCategory === item ? "active" : ""} onClick={() => setAddCategory(item)}>{item}</button>)}</div>
            <div className="add-module-grid">
              {filteredAddOptions.map(([type, label, icon]) => { const Icon = Icons[icon] || FileText; return <button key={type} type="button" onClick={() => { onAdd?.(type); setShowAdd(false); }}><span><Icon size={15} /></span><em>{label}</em></button>; })}
            </div>
          </div>
        )}

        <button
          type="button"
          className="add-module-button"
          onClick={() => setShowAdd((value) => !value)}
        >
          <Plus size={15} />
          <span>添加模块</span>
        </button>
      </div>
    </aside>
  );
}
