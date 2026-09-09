export const initialResumeData = {
  profile: {
    name: "张X",
    title: "前端开发工程师",
    phone: "13800000000",
    email: "zhangx@example.com",
    location: "江西南昌",
    website: "github.com/zhangx",
    summary: "具备扎实的 Web 前端开发基础，熟悉 React、TypeScript 与现代前端工程化，重视产品体验与代码质量。",
    avatar: "",
    customFields: []
  },
  education: [
    { id:"edu-1", school:"XX大学", major:"软件工程", degree:"本科", start:"2022.09", end:"2026.06", description:"主修计算机网络、数据结构与算法、数据库原理、Web 前端开发等课程。", icon:"GraduationCap" }
  ],
  experience: [
    { id:"exp-1", company:"XX科技有限公司", position:"前端开发实习生", start:"2025.07", end:"2025.12", description:"负责后台管理系统及数据可视化平台的前端开发，参与页面架构、组件开发和性能优化。", achievements:["使用 React + TypeScript 开发多个业务模块","封装通用表格、弹窗、表单等组件","优化首屏加载性能，提升约 30%"], icon:"BriefcaseBusiness" }
  ],
  projects: [
    { id:"project-1", name:"在线简历可视化编辑器", role:"独立开发", start:"2026.01", end:"至今", description:"基于 React 构建在线简历设计与编辑平台，支持模块化编辑、模板切换、主题系统和 PNG / PDF 导出。", technologies:["React","TypeScript","Tailwind CSS"], icon:"FolderKanban" },
    { id:"project-2", name:"数据可视化管理平台", role:"前端开发", start:"2025.03", end:"2025.06", description:"面向企业内部的数据分析平台，实现统计看板、图表展示、权限管理等功能。", technologies:["React","ECharts","Axios"], icon:"BarChart3" }
  ],
  skills: [
    { id:"skill-1", name:"React", level:90 },
    { id:"skill-2", name:"JavaScript", level:88 },
    { id:"skill-3", name:"CSS / Tailwind", level:85 },
    { id:"skill-4", name:"TypeScript", level:78 }
  ],
  honors: ["人工智能训练师初级证书","人工智能初识微认证","校级优秀学生"],
  languages: ["普通话","英语 CET-4"]
};

export const defaultSections = [
  {id:"summary", type:"summary", title:"个人简介", icon:"UserRound", visible:true},
  {id:"education", type:"education", title:"教育经历", icon:"GraduationCap", visible:true},
  {id:"experience", type:"experience", title:"工作经历", icon:"BriefcaseBusiness", visible:true},
  {id:"projects", type:"projects", title:"项目经历", icon:"FolderKanban", visible:true},
  {id:"skills", type:"skills", title:"专业技能", icon:"Sparkles", visible:true},
  {id:"honors", type:"honors", title:"荣誉证书", icon:"Award", visible:true}
];

export const initialLayout = {
  profile: { x:52, y:44, width:690, avatarX:642, avatarY:40, avatarSize:92 },
  sectionGap: 18
};