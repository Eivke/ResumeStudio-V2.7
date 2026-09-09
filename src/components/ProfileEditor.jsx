import React from "react";
import * as Icons from "lucide-react";
import { Upload, RotateCcw, Move, Image as ImageIcon, Plus, Trash2, GripVertical, Eye, EyeOff } from "lucide-react";

const DEFAULT_POSITION = { x: 52, y: 44, avatarX: 642, avatarY: 40, avatarSize: 92 };
const FIELD_ICONS = [
  ["UserRound", "个人"], ["MapPin", "地址"], ["Phone", "电话"], ["Mail", "邮箱"], ["Globe", "网站"],
  ["CalendarDays", "时间"], ["Contact", "信息"], ["BadgeCheck", "认证"], ["Home", "住址"], ["AtSign", "账号"],
];

export default function ProfileEditor({ profile = {}, layout = {}, onProfileChange, onLayoutChange, onUpload, onClearAvatar }) {
  const position = { ...DEFAULT_POSITION, ...(layout.profile || {}) };
  const customFields = Array.isArray(profile.customFields) ? profile.customFields : [];
  const visibility = profile.fieldVisibility || {};
  const set = (key, value) => onProfileChange?.({ [key]: value });
  const setVisible = (key, value) => set("fieldVisibility", { ...visibility, [key]: value });
  const updatePosition = (key, value) => onLayoutChange?.({ ...layout, profile: { ...position, [key]: Number.isFinite(value) ? value : 0 } });
  const resetName = () => onLayoutChange?.({ ...layout, profile: { ...position, x: DEFAULT_POSITION.x, y: DEFAULT_POSITION.y } });
  const resetAvatar = () => onLayoutChange?.({ ...layout, profile: { ...position, avatarX: DEFAULT_POSITION.avatarX, avatarY: DEFAULT_POSITION.avatarY, avatarSize: DEFAULT_POSITION.avatarSize } });

  const updateField = (index, changes) => {
    const next = customFields.map((item, i) => i === index ? { ...item, ...changes } : item);
    set("customFields", next);
  };
  const addField = () => set("customFields", [...customFields, { id: `field-${Date.now()}`, label: "自定义信息", value: "", icon: "Info", visible: true }]);
  const removeField = (index) => set("customFields", customFields.filter((_, i) => i !== index));

  const fields = [
    ["name", "姓名", profile.name],
    ["title", "求职目标", profile.title],
    ["phone", "手机号", profile.phone],
    ["email", "邮箱", profile.email],
    ["location", "所在地", profile.location],
    ["website", "个人链接", profile.website],
  ];

  return (
    <div className="profile-editor-stack">
      <div className="profile-info-card">
        <div className="profile-card-head">
          <div><div className="profile-card-title">基本信息</div><div className="profile-card-subtitle">只有姓名和照片可以自由定位，其余信息自动跟随模板固定布局。</div></div>
        </div>
        <div className="profile-field-list">
          {fields.map(([key, label, value]) => (
            <div className="profile-field-card" key={key}>
              <div className="profile-field-top">
                <label>{label}</label>
                <button type="button" className="field-visibility" onClick={() => setVisible(key, visibility[key] !== false ? false : true)} title={visibility[key] === false ? `显示${label}` : `隐藏${label}`}>
                  {visibility[key] === false ? <EyeOff size={13}/> : <Eye size={13}/>}<span>{visibility[key] === false ? "隐藏" : "显示"}</span>
                </button>
              </div>
              <input className="input" value={value || ""} onChange={(e) => set(key, e.target.value)} placeholder={`请输入${label}（可留空）`} />
            </div>
          ))}
        </div>
      </div>

      <div className="profile-info-card">
        <div className="profile-card-head">
          <div><div className="profile-card-title">自定义信息</div><div className="profile-card-subtitle">地址、微信、籍贯、年龄等都可以按需添加；不填写就不会出现在预览中。</div></div>
          <button type="button" className="premium-add-btn" onClick={addField}><Plus size={13}/>添加字段</button>
        </div>
        <div className="custom-field-list">
          {customFields.map((field, index) => {
            const Icon = Icons[field.icon] || Icons.Info;
            return (
              <div key={field.id || index} className="custom-field-card">
                <div className="custom-field-card-head">
                  <div className="custom-field-label"><GripVertical size={14}/><span>自定义字段 {index + 1}</span></div>
                  <div className="custom-field-actions">
                    <button type="button" className="field-visibility" onClick={() => updateField(index, { visible: field.visible === false })}>{field.visible === false ? <EyeOff size={13}/> : <Eye size={13}/>}<span>{field.visible === false ? "隐藏" : "显示"}</span></button>
                    <button type="button" className="icon-danger-btn" onClick={() => removeField(index)} title="删除"><Trash2 size={13}/></button>
                  </div>
                </div>
                <div className="custom-field-form-grid">
                  <label>字段名称<input className="input mt-1" value={field.label || ""} placeholder="例如：微信" onChange={(e) => updateField(index, { label: e.target.value })}/></label>
                  <label>字段内容<input className="input mt-1" value={field.value || ""} placeholder="请输入内容" onChange={(e) => updateField(index, { value: e.target.value })}/></label>
                  <label className="custom-field-icon-control">图标<div className="custom-icon-control"><span><Icon size={14}/></span><select className="custom-icon-select" value={field.icon || "Info"} onChange={(e) => updateField(index, { icon: e.target.value })}>{FIELD_ICONS.map(([name, label]) => <option key={name} value={name}>{label}</option>)}</select></div></label>
                </div>
              </div>
            );
          })}
          {!customFields.length && <div className="empty-inline">暂未添加自定义信息，点击“添加字段”创建。</div>}
        </div>
      </div>

      <div className="profile-info-card">
        <div className="profile-card-title">照片</div>
        <div className="profile-card-subtitle">照片可以独立拖动、缩放，不会带动姓名、联系方式或其他内容。</div>
        <div className="avatar-editor-row">
          {profile.avatar ? <img src={profile.avatar} alt="头像预览" className="avatar-editor-preview"/> : <div className="avatar-editor-preview avatar-placeholder">照</div>}
          <div className="avatar-editor-actions"><button type="button" onClick={onUpload} className="icon-btn flex items-center gap-1.5 px-3 py-2 text-[11px]"><Upload size={13}/>上传照片</button><button type="button" onClick={onClearAvatar} className="icon-btn flex items-center gap-1.5 px-3 py-2 text-[11px]"><RotateCcw size={13}/>恢复占位</button></div>
        </div>
      </div>

      <div className="position-card">
        <div className="position-card-title"><Move size={13}/>姓名定位</div>
        <div className="position-help">仅控制姓名本身。求职目标、联系方式和其他字段不会跟着移动。</div>
        <div className="grid grid-cols-2 gap-2"><NumberField label="X" value={position.x} onChange={(v) => updatePosition("x", v)}/><NumberField label="Y" value={position.y} onChange={(v) => updatePosition("y", v)}/></div>
        <button type="button" className="position-reset" onClick={resetName}>重置姓名位置</button>
      </div>

      <div className="position-card">
        <div className="position-card-title"><ImageIcon size={13}/>照片定位与尺寸</div>
        <div className="position-help">照片位置与尺寸完全独立于姓名。</div>
        <div className="grid grid-cols-2 gap-2"><NumberField label="X" value={position.avatarX} onChange={(v) => updatePosition("avatarX", v)}/><NumberField label="Y" value={position.avatarY} onChange={(v) => updatePosition("avatarY", v)}/><NumberField label="尺寸" value={position.avatarSize} min={1} onChange={(v) => updatePosition("avatarSize", v)}/></div>
        <button type="button" className="position-reset" onClick={resetAvatar}>重置照片位置与尺寸</button>
      </div>
    </div>
  );
}

function NumberField({ label, value, min, onChange }) { return <label className="text-[10px] text-slate-500">{label}<input type="number" min={min} className="input mt-1" value={value ?? 0} onChange={(e) => onChange(Number(e.target.value))}/></label>; }
