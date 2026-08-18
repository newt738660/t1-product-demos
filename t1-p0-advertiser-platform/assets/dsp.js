/* ===================================================================
   HilltopAds · DSP 广告主平台  交互逻辑
   纯前端模拟数据
   =================================================================== */

const I = {
  dash:'<path d="M3 13h8V3H3zM13 21h8V8h-8zM13 3v3h8V3zM3 21h8v-5H3z"/>',
  camp:'<path d="M3 11l18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  creative:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
  target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  report:'<path d="M3 3v18h18"/><path d="m7 14 3-3 3 3 5-5"/>',
  wallet:'<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h3v-4z"/>',
  cog:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 4.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 9 4.6a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
  eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  click:'<path d="m9 9 5 12 1.8-5.2L21 14z"/><path d="M7.2 2.2 8 5M5.2 5.2 7 7M2.2 7.2 5 8"/>',
  money:'<circle cx="12" cy="12" r="10"/><path d="M12 6v12M15 9.5C15 8 13.7 7 12 7s-3 1-3 2.3 1.3 1.9 3 2.2 3 .9 3 2.3-1.3 2.2-3 2.2-3-1-3-2.5"/>',
  conv:'<path d="M20 6 9 17l-5-5"/><circle cx="12" cy="12" r="11" opacity=".25"/>',
  check:'<polyline points="20 6 9 17 4 12"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  copy:'<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  pause:'<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',
  play:'<polygon points="5 3 19 12 5 21"/>',
  download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  geo:'<path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  device:'<rect x="2" y="4" width="14" height="11" rx="1"/><path d="M2 18h14"/><rect x="17" y="8" width="5" height="12" rx="1"/>',
  pop:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="m9 15 6-6M9 9h6v6"/>',
  push:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/>',
  native:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="2"/><path d="m4 16 4-3 3 2 4-4 5 4"/>',
  video:'<rect x="2" y="4" width="20" height="16" rx="2"/><polygon points="10 9 15 12 10 15"/>',
  globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
  app:'<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/>',
  h5:'<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M6 6h12"/><path d="m10 11-1.5 4M14 11l1.5 4M12 11v4"/>',
  splash:'<rect x="5" y="2" width="14" height="20" rx="2.5"/><path d="m9 10 3 3 3-3"/><path d="M5 6h14"/>',
  inter:'<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="7.5" y="8" width="9" height="8" rx="1"/>',
  reward:'<polygon points="12 3 14.5 8.5 20.5 9 16 13 17.5 19 12 15.8 6.5 19 8 13 3.5 9 9.5 8.5"/>',
  banner:'<rect x="3" y="6" width="18" height="6" rx="1"/><rect x="3" y="15" width="11" height="3" rx="1"/>',
  link:'<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/>',
  micon:'<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
  text:'<path d="M4 7h16M4 12h16M4 17h10"/>',
  bbanner:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 11h18"/><circle cx="8" cy="8" r="1"/>',
  rect:'<rect x="4" y="6" width="16" height="12" rx="2"/>',
  feed:'<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="10" r="2"/><path d="M3 16l5-3 4 2 4-4 5 4"/>',
  trash:'<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/>',
};
function svg(p,w){ return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w||2}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`; }

/* ---------- 数据 ---------- */
const FMT = {
  pop:   {name:'弹窗 Popunder', ico:I.pop,    color:'#5b5bf0'},
  push:  {name:'推送通知 Push', ico:I.push,   color:'#2f6fed'},
  ipp:   {name:'页内推送 In-Page Push', ico:I.push, color:'#8b5cf6'},
  native:{name:'原生 Native',   ico:I.native, color:'#e0584b'},
  video: {name:'视频 Video',    ico:I.video,  color:'#0ea5a3'},
  splash:{name:'开屏 Splash', ico:I.splash, color:'#0ea5a3'},
  inter: {name:'插屏 Interstitial', ico:I.inter, color:'#d99a00'},
  reward:{name:'激励视频 Rewarded', ico:I.reward, color:'#16a34a'},
  banner:{name:'横幅 Banner', ico:I.banner, color:'#d99a00'},
  link:  {name:'直链 Direct Link', ico:I.link, color:'#64748b'},
  // —— App / H5 专属广告格式（与 SSP 端保持一致）——
  mbanner:{name:'移动标准横幅 320×50 · 300×50 · 300×100 · 320×100', ico:I.banner, color:'#d99a00'},
  bbanner:{name:'大图横幅 700×300 · 720×150 · 720×90', ico:I.bbanner, color:'#2f6fed'},
  rect:   {name:'矩形广告 300×250 · 336×280', ico:I.rect, color:'#1f9d76'},
  micon:  {name:'图标广告 200×200 · 150×150 · 110×110', ico:I.micon, color:'#8b5cf6'},
  feed:   {name:'图片信息流 700×300 · 512×512 · 240×320 · 720×150', ico:I.feed, color:'#e0584b'},
  splashimg:{name:'开屏图片 750×1624 · 750×1334 · 720×1280 · 1080×1920', ico:I.splash, color:'#0ea5a3'},
  text:   {name:'文字广告 最多 300 字', ico:I.text, color:'#64748b'},
};
// 流量类型（库存来源）
const INV = {
  web: {name:'网站', label:'Website 桌面/移动网页', ico:I.globe, color:'#1f9d76', bg:'#e6f6f0'},
  app: {name:'App', label:'移动应用 Android/iOS', ico:I.app, color:'#5b5bf0', bg:'#ecedfe'},
  h5:  {name:'H5', label:'移动网页 WAP/小程序', ico:I.h5, color:'#d99a00', bg:'#fdf3da'},
};
// 创意素材类型
I.code = '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>';
I.folder = '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>';
I.image = '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>';
I.film = '<rect x="2" y="3" width="20" height="18" rx="2"/><path d="M7 3v18M17 3v18M2 9h5M2 15h5M17 9h5M17 15h5"/>';
I.music = '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>';
I.doc = '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/>';
I.upload = '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 9l5-5 5 5M12 4v12"/>';
const KIND = {
  image: {name:'图片', ico:I.creative},
  html5: {name:'HTML5', ico:I.code},
  video: {name:'视频', ico:I.video},
};
const REJECTED_CREATIVE_DEMOS = [
  {id:'CR-9031', name:'夏促横幅旧版', fmt:'bbanner', kind:'image', size:'728×90', camp:'C-50271', imps:0, clicks:0, ctr:0, status:'rejected', rejectReason:'素材中的促销文案与落地页信息不一致', landing:'https://promo.example.com/summer', created:'2026-06-24', reviewRound:1},
  {id:'CR-9032', name:'夏促原生图 B', fmt:'feed', kind:'image', size:'1200×628', camp:'C-50271', imps:0, clicks:0, ctr:0, status:'rejected', rejectReason:'图片清晰度不足，请上传高清素材', landing:'https://promo.example.com/summer', created:'2026-06-24', reviewRound:1},
  {id:'CR-9033', name:'夏促 HTML5 动效', fmt:'bbanner', kind:'html5', size:'响应式', camp:'C-50271', imps:0, clicks:0, ctr:0, status:'rejected', rejectReason:'素材加载时间过长，请压缩资源后重新提交', landing:'https://promo.example.com/summer', created:'2026-06-25', reviewRound:1},
];
const fmtMoney = n => '$' + n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
// 公司组织树（账号配置左侧目录）
const ORG = { name:'54Ads 传媒', children:[
  { name:'广告投放中心', children:[ {name:'品牌广告部'}, {name:'效果广告部'}, {name:'游戏推广部'} ] },
  { name:'增长业务中心', children:[ {name:'电商增长部'}, {name:'金融获客部'}, {name:'应用分发部'} ] },
] };
function orgLeaves(node){
  if(!node.children) return [node.name];
  return node.children.flatMap(orgLeaves);
}
// 账号所属部门下拉：上级部门作为分组，下级部门作为可选项
function orgDeptOptions(selected){
  return (ORG.children || []).map(parent => `
    <optgroup label="${parent.name}">
      ${(parent.children || []).map(child => `<option value="${child.name}" ${child.name===selected?'selected':''}>└─ ${child.name}</option>`).join('')}
    </optgroup>`).join('');
}
const fmtNum = n => n.toLocaleString('en-US');
const fmtK = n => n>=1e6 ? (n/1e6).toFixed(2)+'M' : n>=1e3 ? (n/1e3).toFixed(1)+'K' : n;
function cssVar(v){ return getComputedStyle(document.body).getPropertyValue(v).trim(); }

const DB = {
  balance: 8420.50,
  meta: { schemaVersion:12, scenario:'T1 P0 汇报标准场景', seededAt:'2026-08-15' },
  uiState: { lastPage:'dash', updatedAt:null },
  auditLogs: [
    {id:'LOG-1',time:'2026-08-14 09:15',actor:'Amy Chen',action:'提交充值凭证',target:'RC-4002',result:'待审核'},
    {id:'LOG-2',time:'2026-08-14 08:40',actor:'Linda Zhao',action:'提交 CPD 创意版本',target:'CR-3004 · V2',result:'审核中'},
    {id:'LOG-3',time:'2026-08-12 00:00',actor:'系统',action:'启动 CPD 投放',target:'C-1002',result:'成功'},
  ],
  // 白标基本信息配置
  profile: { company:'T1 Ads', lang:'zh-CN', logo:'', accent:'#5b5bf0' },
  campaigns: [
    {id:'C-1001', scenario:'standard', name:'T1 夏季增长｜欧洲信息流获客', alias:'欧洲信息流获客', mode:'rtb', placement:'Web / H5 信息流', period:'2026-08-01 至 2026-08-31', duration:'fixed', start:'2026-08-01', end:'2026-08-31', fmt:'feed', model:'CPM', bid:2.40, status:'active', spend:1560.80, imps:680000, clicks:5440, conv:420, geo:['🇩🇪 德国','🇫🇷 法国'], inv:['web','h5'], budget:5000, totalBudget:5000, owner:'Amy Chen'},
    {id:'C-1002', scenario:'standard', name:'T1 品牌升级｜App 首页开屏', alias:'品牌升级开屏', mode:'cpd', placement:'T1 News App · 首页开屏', period:'2026-08-12 至 2026-08-18', duration:'fixed', start:'2026-08-12', end:'2026-08-18', fmt:'splashimg', model:'CPD', bid:0, status:'active', spend:0, imps:1240000, clicks:8420, conv:0, geo:['🌍 全部'], inv:['app'], budget:0, operator:'Linda Zhao', order:'CPD-202608-018'},
  ],
  adGroups: [
    {id:'G-2001',scenario:'standard',camp:'C-1001',name:'德国与法国｜Web/H5 信息流',periodType:'fixed',start:'2026-08-01',end:'2026-08-31',pace:'even',budget:5000,dailyCap:200,bidType:'CPM',bid:2.40,geo:'德国、法国',device:'不限',format:'feed',inventory:'Web / H5 优质信息流',status:'active'},
    {id:'G-2002',scenario:'standard',camp:'C-1002',name:'T1 News App｜首页开屏｜全天',periodType:'fixed',start:'2026-08-12',end:'2026-08-18',pace:'even',budget:0,dailyCap:0,bidType:'CPD',bid:0,geo:'全部',device:'Android、iOS',format:'splashimg',inventory:'T1 News App · 首页开屏',status:'active',managedBy:'Linda Zhao'},
  ],
  creatives: [
    {id:'CR-3001',scenario:'standard',name:'欧洲信息流主图 A',group:'德国与法国｜Web/H5 信息流',groupId:'G-2001',assetId:'F-1',fmt:'feed',kind:'image',size:'1200×628',camp:'C-1001',headline:'让增长触达更多用户',description:'面向欧洲市场的高质量流量',landing:'https://www.t1t1.com/growth',imps:410000,clicks:3280,ctr:0.80,status:'active',version:2,created:'2026-08-01'},
    {id:'CR-3002',scenario:'standard',name:'欧洲信息流主图 B',group:'德国与法国｜Web/H5 信息流',groupId:'G-2001',assetId:'F-2',fmt:'feed',kind:'image',size:'1200×628',camp:'C-1001',headline:'开启全球增长',description:'覆盖 Web 与 H5 优质资源',landing:'https://www.t1t1.com/global',imps:270000,clicks:2160,ctr:0.80,status:'active',version:1,created:'2026-08-02'},
    {id:'CR-3003',scenario:'standard',name:'品牌升级开屏主视觉',group:'T1 News App｜首页开屏｜全天',groupId:'G-2002',assetId:'F-3',fmt:'splashimg',kind:'image',size:'1080×1920',camp:'C-1002',headline:'连接每一次增长',description:'T1 品牌全新升级',landing:'https://www.t1t1.com/brand',imps:1240000,clicks:8420,ctr:0.68,status:'active',version:1,created:'2026-08-08'},
    {id:'CR-3004',scenario:'standard',name:'品牌升级开屏备选版',group:'T1 News App｜首页开屏｜全天',groupId:'G-2002',assetId:'F-4',fmt:'splashimg',kind:'image',size:'1080×1920',camp:'C-1002',headline:'让品牌被更多人看见',description:'新版视觉待运营确认',landing:'https://www.t1t1.com/brand',imps:0,clicks:0,ctr:0,status:'review',version:2,created:'2026-08-14'},
  ],
  txns: [
    {id:'TX-4001',date:'2026-08-01',type:'充值',method:'USDT · TRC20',amount:10000.00,scenario:'standard'},
    {id:'TX-4002',date:'2026-08-01 至 2026-08-14',type:'消耗',method:'C-1001 · 欧洲信息流获客',amount:-1560.80,scenario:'standard'},
  ],
  // 充值订单（账单）
  recharges: [
    {id:'RC-4001',date:'2026-08-01 10:20',amount:10000.00,method:'USDT',network:'TRC20',status:'approved',shot:'rc4001.png',reviewOpinion:'链上交易确认完成，充值金额已到账',reviewTime:'2026-08-01 10:36',scenario:'standard'},
    {id:'RC-4002',date:'2026-08-14 09:15',amount:2000.00,method:'USDT',network:'TRC20',status:'pending',shot:'rc4002.png',reviewOpinion:'付款凭证已提交，等待平台审核',reviewTime:'—',scenario:'standard'},
  ],
  // 创意素材库：树状目录 + 文件
  assetTree: [
    {id:'root',     name:'素材库',   parent:null},
    {id:'growth',   name:'欧洲增长', parent:'root'},
    {id:'brand',    name:'品牌升级', parent:'root'},
    {id:'drafts',   name:'待使用素材', parent:'root'},
  ],
  assetFiles: [
    {id:'F-1',folder:'growth',name:'europe_growth_a_1200x628.png',type:'image',size:'184 KB',dim:'1200×628',updated:'2026-08-01',impressions:410000,ctr:0.80,createdAt:'2026-08-01'},
    {id:'F-2',folder:'growth',name:'europe_growth_b_1200x628.png',type:'image',size:'176 KB',dim:'1200×628',updated:'2026-08-02',impressions:270000,ctr:0.80,createdAt:'2026-08-02'},
    {id:'F-3',folder:'brand',name:'t1_brand_splash_v1_1080x1920.png',type:'image',size:'420 KB',dim:'1080×1920',updated:'2026-08-08',impressions:1240000,ctr:0.68,createdAt:'2026-08-08'},
    {id:'F-4',folder:'brand',name:'t1_brand_splash_v2_1080x1920.png',type:'image',size:'438 KB',dim:'1080×1920',updated:'2026-08-14',impressions:0,ctr:0,createdAt:'2026-08-14'},
    {id:'F-5',folder:'drafts',name:'brazil_market_feed_1200x628.png',type:'image',size:'192 KB',dim:'1200×628',updated:'2026-08-14',impressions:0,ctr:0,createdAt:'2026-08-14'},
  ],
  // 角色（RBAC）
  roles: [
    {id:'admin',  name:'超级管理员', desc:'全部权限，含成员与角色管理', perms:['仪表盘','广告计划','广告创意','数据报表','充值账单','成员管理','角色配置']},
    {id:'op',     name:'投放运营',   desc:'广告计划 / 创意 / 报表管理',   perms:['广告计划','广告创意','数据报表']},
    {id:'finance',name:'财务',       desc:'充值账单与报表只读',           perms:['充值账单','数据报表(只读)']},
    {id:'viewer', name:'只读',       desc:'仅查看仪表盘与报表',           perms:['仪表盘','数据报表(只读)']},
  ],
  // 账号
  accounts: [
    {user:'victor',   role:'超级管理员', post:'管理岗', status:'active',  created:'2025-11-08', dept:'品牌广告部'},
    {user:'amy.op',   role:'投放运营',   post:'普通岗', status:'active',  created:'2026-01-12', dept:'效果广告部'},
    {user:'ken.g',    role:'投放运营',   post:'普通岗', status:'active',  created:'2026-02-20', dept:'游戏推广部'},
    {user:'mia.fin',  role:'财务',       post:'普通岗', status:'active',  created:'2026-03-05', dept:'品牌广告部'},
    {user:'rex.read', role:'只读',       post:'普通岗', status:'active',  created:'2026-04-18', dept:'电商增长部'},
    {user:'sun.op',   role:'投放运营',   post:'普通岗', status:'paused',  created:'2026-05-02', dept:'金融获客部'},
    {user:'tina.e',   role:'投放运营',   post:'普通岗', status:'active',  created:'2026-05-22', dept:'应用分发部'},
  ],
  // 消息通知
  notifications: [
    {id:1,type:'audit',title:'CPD 创意版本审核中',desc:'「品牌升级开屏备选版」已提交，当前生效版本继续投放。',time:'35 分钟前',read:false},
    {id:2,type:'finance',title:'充值凭证待审核',desc:'$2,000.00 USDT 充值凭证已提交，预计 1 个工作日内完成审核。',time:'1 小时前',read:false},
  ],
};

/* 三层投放对象字段口径。
   ssp: 与 SSP 对齐并持久化；t1: 仅 T1 产品/业务使用；derived: T1 聚合计算，不回写 SSP。 */
const OBJECT_MODEL = [
  {level:'01', name:'广告计划 Campaign', role:'定义一次投放的业务目标与全局边界', relation:'1 个 Campaign 包含多个广告组', fields:[
    ['计划名称','ssp','SSP 广告活动名称'],['投放模式（CPD / RTB）','t1','决定前台流程与权限'],['广告目标','t1','品牌认知 / 流量访问 / 转化行动 / 应用推广'],
    ['投放期限类型','t1','固定周期 / 长期投放'],['开始时间、结束时间','ssp','长期投放结束时间为空'],['广告主 / 品牌','ssp','使用 SSP 广告主映射'],
    ['预算方式','t1','固定周期总预算；长期每日预算'],['总预算 / 每日上限','ssp','按期限类型写入 SSP 可执行字段'],['币种','ssp','与账户币种一致'],
    ['合同 / 订单编号、交付目标','t1','仅 CPD'],['负责人 / 运营负责人','t1','T1 协作关系'],['客户可操作范围','t1','仅 CPD 权限策略'],
    ['主状态与风险原因','derived','由启停、时间、预算、余额及下层可投状态聚合']
  ]},
  {level:'02', name:'广告组 Ad Group', role:'一套可独立执行、控制和比较的交付策略', relation:'1 个广告组包含多个广告创意', fields:[
    ['广告组名称','ssp','创建时写入 SSP'],['开始时间、结束时间','ssp','创建时复制 Campaign；保存后独立，不持续联动'],['投放节奏','ssp','均匀 / 加速，取决于 SSP 实际能力'],
    ['分配预算 / 每日预算','ssp','固定周期分配预算；长期每日预算'],['每日上限','ssp','可选；同时受 Campaign 硬上限约束'],['竞价方式与出价','ssp','手动 CPM / CPC'],
    ['地域、设备定向','ssp','第一版保持 SSP 支持范围'],['广告形式','ssp','开屏 / 信息流 / 横幅 / 矩形 / 图标 / 文字'],['App / 广告位范围','ssp','与广告形式联动筛选'],
    ['频控','ssp','后台写入和控制，客户前台不开放'],['预算已分配 / 剩余可分配','derived','根据 Campaign 与各广告组预算计算'],['主状态与受限原因','derived','保留自身状态，同时受 Campaign 父级边界限制']
  ]},
  {level:'03', name:'广告创意 Ad Creative', role:'可投放、可审核、可统计的创意绑定对象', relation:'绑定 1 个广告组和 1 个主素材；素材可复用', fields:[
    ['广告创意名称','ssp','创建时写入 SSP'],['所属广告组','ssp','绑定 SSP 广告组 ID'],['主素材资产 ID','ssp','从 SSP 素材库选择'],
    ['标题 / 文案','ssp','按广告形式动态出现'],['跳转类型、落地页 URL','ssp','第一版仅开放 SSP 真实支持项'],['启用 / 暂停','ssp','RTB 客户可操作，CPD 由运营控制'],
    ['素材规格兼容结果','derived','继承广告组形式与广告位规格自动校验'],['审核状态、驳回原因','ssp','展示 SSP 审核结果'],['创意版本与生效版本','t1','修改生成新版本；旧版在新版通过前继续投放'],
    ['版本提交人、变更记录','t1','T1 审批与审计信息'],['曝光、点击、CTR','derived','同步明细后在 T1 聚合展示']
  ]}
];

function fieldSourceBadge(source){
  const meta={ssp:['SSP 对齐并入库','blue'],t1:['仅 T1 使用','purple'],derived:['T1 计算展示','gray']}[source];
  return `<span class="badge ${meta[1]}">${meta[0]}</span>`;
}

/* ---------- 通知类型元数据 ---------- */
const NOTIF = {
  campaign:{label:'投放', ico:I.camp,    color:'#5b5bf0', bg:'#ecedfe'},
  finance: {label:'财务', ico:I.wallet,  color:'#1f9d76', bg:'#e6f6f0'},
  audit:   {label:'审核', ico:I.check,   color:'#2f6fed', bg:'#e8f0fe'},
  system:  {label:'系统', ico:I.cog,     color:'#64748b', bg:'#eef1f5'},
};

const NAV = [
  {group:'总览', items:[
    {id:'dash', label:'首页', ico:I.dash, sub:'投放表现、异常与待处理事项'},
  ]},
  {group:'投放管理', items:[
    {id:'plans', label:'广告投放', ico:I.camp, sub:'统一查看 CPD 代投与 RTB 自助投放'},
  ]},
  {group:'资产与分析', items:[
    {id:'creatives', label:'创意中心', ico:I.creative, sub:'统一素材、审核状态与使用关系'},
    {id:'report', label:'数据报表', ico:I.report, sub:'跨 CPD 与 RTB 的多维分析'},
  ]},
  {group:'学习与支持', items:[
    {id:'help', label:'帮助中心', ico:I.report, sub:'快速入门、使用手册与常见问题'},
  ]},
  {group:'组织与财务', items:[
    {id:'billing', label:'财务与账单', ico:I.wallet, sub:'RTB 余额、充值与交易流水'},
    {id:'settings', label:'账户与组织', ico:I.cog, sub:'广告主主体、成员、权限与安全'},
  ]},
];

// 非导航的独立页面（顶栏标题 + 高亮的归属导航项）
const PAGES = {
  campdetail: { label:'广告计划详情', sub:'广告计划概览与下属广告组', nav:'plans' },
  groupdetail:{ label:'广告组详情', sub:'广告组设置摘要与广告创意管理', nav:'plans' },
  newplan:    { label:'新建 RTB 广告计划', sub:'第一层：目标、周期与预算总控', nav:'plans' },
  newgroup:   { label:'新建广告组', sub:'第二层：执行策略、预算分配、定向与库存', nav:'plans' },
  newad:      { label:'新建广告创意', sub:'第三层：素材、文案与跳转', nav:'plans' },
};
// 投放地区列表（GEO）
const GEO_LIST = [['US','🇺🇸 美国'],['IN','🇮🇳 印度'],['BR','🇧🇷 巴西'],['DE','🇩🇪 德国'],['GB','🇬🇧 英国'],['ID','🇮🇩 印尼']];
// 投放范围 → 可选广告格式；全部 / Web / H5 / APP 使用同一套移动端广告格式
const SCOPE_FMT = {
  all:      ['mbanner','bbanner','rect','micon','feed','splashimg','text'],
  all_web:  ['mbanner','bbanner','rect','micon','feed','splashimg','text'],
  all_h5:   ['mbanner','bbanner','rect','micon','feed','splashimg','text'],
  all_app2: ['mbanner','bbanner','rect','micon','feed','splashimg','text'],
  spec_app: ['mbanner','bbanner','rect','micon','feed','splashimg','text'],
};

const App = {
  cur:'dash', charts:{}, wizStep:1, wiz:{}, PER_PAGE:8, pages:{},

  // 分页助手
  pageSlice(arr, key){
    const per = this.PER_PAGE;
    const total = Math.max(1, Math.ceil(arr.length/per));
    let p = Math.min(this.pages[key]||1, total); this.pages[key] = p;
    return arr.slice((p-1)*per, p*per);
  },
  pagerHTML(key, total){
    const per = this.PER_PAGE;
    const pages = Math.max(1, Math.ceil(total/per));
    let cur = Math.min(this.pages[key]||1, pages); this.pages[key] = cur;
    const b = (p,lbl,dis,act) => `<button class="page-btn${act?' active':''}" ${dis?'disabled':''} onclick="App.setPage('${key}',${p})">${lbl}</button>`;
    let nums = '';
    for(let i=1;i<=pages;i++) nums += b(i,i,false,i===cur);
    return `<div class="pager">
      <span class="pager-info">共 ${total} 条 · 每页 ${per} 条 · 第 ${cur}/${pages} 页</span>
      <div class="pager-btns">${b(Math.max(1,cur-1),'‹',cur===1,false)}${nums}${b(Math.min(pages,cur+1),'›',cur===pages,false)}</div>
    </div>`;
  },
  setPage(key, p){
    this.pages[key] = p;
    if(key==='plan') this.renderPlans(this.planFilter||'');
    else if(key==='ads') this.renderAds(this.adFilter||'');
    else if(key==='unifiedPlan') this.renderUnifiedPlans();
  },

  init(){
    this.load(); if(window.Branding) Branding.apply(DB.profile); this.renderNav();
    const previewState=new URLSearchParams(location.search).get('state'); if(previewState)this.homeState=previewState;
    const requestedView=new URLSearchParams(location.search).get('view');
    if(requestedView==='cpd') DB.uiState.planListView='cpd';
    this.syncAccountContext();
    const requestedNew=new URLSearchParams(location.search).get('new')==='rtb';
    this.go(requestedNew?'newplan':(requestedView==='cpd'?'plans':(DB.uiState?.lastPage||'dash')));
    document.getElementById('balTop').textContent = fmtMoney(DB.balance); this.syncBell();
  },

  profile(){ try{return JSON.parse(localStorage.getItem('t1_demo_profile')||'null');}catch(e){return null;} },
  isDemoMode(){ return new URLSearchParams(location.search).get('demo')==='1'; },
  isPreviewMode(){ return new URLSearchParams(location.search).get('preview')==='1'; },
  isCpdReview(){ return new URLSearchParams(location.search).get('view')==='cpd'; },
  isAdvertiserBound(){ const p=this.profile(); return p ? p.advertiserBound===true : true; },
  advertiserApplication(){try{return JSON.parse(localStorage.getItem('t1_advertiser_application')||'null')}catch(e){return null}},
  syncAccountContext(){
    const bound=this.isAdvertiserBound(), chip=document.getElementById('workspaceChip'), finance=document.getElementById('financeBox');
    if(chip) chip.innerHTML=bound||this.isDemoMode()?'<span class="workspace-dot"></span>演示广告主':'<span class="workspace-dot" style="background:#94a3b8"></span>尚未绑定广告主';
    if(finance) finance.style.display=(bound||this.isDemoMode())&&!this.isCpdReview()?'':'none';
  },

  load(){
    try{ const s=JSON.parse(localStorage.getItem('t1-p0-demo-store')); if(s && s.__v===12) Object.assign(DB, s.data); }catch(e){}
    DB.uiState=DB.uiState||{lastPage:'dash',updatedAt:null};
    DB.auditLogs=DB.auditLogs||[];
    this.migrateAccountPosts();
    this.save();
  },
  migrateAccountPosts(){
    DB.accounts.forEach(account => {
      if(account.post !== '管理岗' && account.post !== '普通岗'){
        account.post = account.role === '超级管理员' ? '管理岗' : '普通岗';
      }
    });
  },
  save(){
    try{
      DB.uiState=DB.uiState||{};
      DB.uiState.updatedAt=new Date().toISOString();
      localStorage.setItem('t1-p0-demo-store', JSON.stringify({__v:12,savedAt:DB.uiState.updatedAt,data:DB}));
    }catch(e){ this.toast?.('演示数据保存失败，请检查浏览器存储空间','warn'); }
  },
  resetData(){
    localStorage.removeItem('t1-p0-demo-store');
    localStorage.removeItem('ht-dsp');
    this.toast('已恢复标准演示数据');
    setTimeout(()=>location.href='dsp.html?demo=1',600);
  },

  renderNav(){
    document.getElementById('nav').innerHTML = NAV.map(g=>`
      <div class="nav-group-label">${g.group}</div>
      ${g.items.filter(it=>!this.isCpdReview()||!['creatives','billing'].includes(it.id)).map(it=>`<button class="nav-item" data-id="${it.id}" onclick="App.go('${it.id}')">${svg(it.ico)}<span>${it.label}</span>${it.badge?`<span class="badge-dot">${it.badge}</span>`:''}</button>`).join('')}
    `).filter(block=>!this.isCpdReview()||!block.includes('<div class="nav-group-label">')||block.includes('nav-item')).join('');
  },

  go(id){
    if(id==='newplan' && !this.isAdvertiserBound() && !this.isDemoMode()){
      this.pendingAction='newplan';
      const app=this.advertiserApplication();
      if(app?.status==='pending'){this.go('dash');this.toast('申请正在审核中，暂时不能再次创建或绑定','warn');return;}
      this.openAdvertiserGate(); return;
    }
    this.cur=id;
    if(DB.uiState && NAV.flatMap(group=>group.items).some(item=>item.id===id)){
      DB.uiState.lastPage=id;
      this.save();
    }
    const meta = NAV.flatMap(g=>g.items).find(i=>i.id===id) || PAGES[id] || {label:'',sub:''};
    document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active', n.dataset.id===(meta.nav||id)));
    document.getElementById('topTitle').textContent = meta.label;
    document.getElementById('topSub').textContent = meta.sub;
    document.getElementById('content').innerHTML = `<div class="view active">${this['view_'+id]()}</div>`;
    if(this['after_'+id]) this['after_'+id]();
    window.scrollTo(0,0);
  },

  toast(msg, type='ok'){
    const ico = type==='ok'? I.check : '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>';
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<span class="t-ico">${svg(ico)}</span><span>${msg}</span>`;
    document.getElementById('toastWrap').appendChild(el);
    setTimeout(()=>{ el.style.opacity='0'; el.style.transform='translateX(40px)'; el.style.transition='.3s'; setTimeout(()=>el.remove(),300); }, 2600);
  },
  validateRequired(fields){
    fields.forEach(([el])=>el?.classList.remove('invalid'));
    const missing = fields.find(([el])=>!el || !String(el.value??'').trim());
    if(!missing) return true;
    const [el, label] = missing;
    if(el){
      el.classList.add('invalid');
      const clear = ()=>el.classList.remove('invalid');
      el.addEventListener('input', clear, {once:true});
      el.addEventListener('change', clear, {once:true});
      el.focus();
      el.scrollIntoView({behavior:'smooth', block:'center'});
    }
    this.toast(`请${el?.tagName==='SELECT'?'选择':'填写'}${label}`,'warn');
    return false;
  },
  modal(html, wide){
    const mask = document.getElementById('modalMask');
    mask.innerHTML = `<div class="modal ${wide?'wide':''}">${html}</div>`;
    mask.classList.add('open');
    mask.onclick = e => { if(e.target===mask && !App._uploading) App.closeModal(); };
  },
  closeModal(){ document.getElementById('modalMask').classList.remove('open'); },
  openAdvertiserGate(){
    this.modal(`<div class="modal-head"><div><h3>开始投放前，请先关联广告主</h3><p>T1 账号已注册完成；广告主用于承载真实投放、数据和资金权限</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg(I.x)}</button></div>
      <div class="modal-body"><div class="notice info" style="margin-bottom:16px">你可以继续浏览平台能力和帮助文档。开始真实投放前，需要完成广告主关联。</div>
      <div class="choice-grid" style="grid-template-columns:1fr 1fr">
        <button class="choice" data-gate="create" style="text-align:left" onclick="App.pickAdvertiserGate(this,'create')"><div class="c-body"><b>申请创建广告主</b><small>提交广告主资料，由运营审核后创建或关联</small></div></button>
        <button class="choice" data-gate="invite" style="text-align:left" onclick="App.pickAdvertiserGate(this,'invite')"><div class="c-body"><b>使用邀请码绑定</b><small>使用运营或销售提供的邀请码提交绑定申请</small></div></button>
      </div></div><div class="modal-foot"><button class="btn btn-ghost" onclick="App.closeModal()">暂不投放，继续浏览</button><div class="spacer"></div><button class="btn btn-primary" id="gateNext" disabled onclick="App.continueAdvertiserGate()">下一步</button></div>`,true);
  },
  pickAdvertiserGate(btn,type){this.advertiserGateType=type;document.querySelectorAll('[data-gate]').forEach(x=>x.classList.toggle('sel',x===btn));const next=document.getElementById('gateNext');if(next)next.disabled=false;},
  continueAdvertiserGate(){if(this.advertiserGateType==='create')this.openAdvertiserApplication();else if(this.advertiserGateType==='invite')this.openJoinAdvertiser();},
  openAdvertiserApplication(){
    const p=this.profile()||{};
    this.modal(`<div class="modal-head"><div><h3>申请创建广告主</h3><p>你不需要判断平台中是否已有同名广告主，运营人员会结合业务情况确认</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg(I.x)}</button></div><div class="modal-body">
      <div class="field"><label>广告主名称<span class="req">*</span></label><input class="input" id="gateAdvertiserName" placeholder="品牌、公司或业务名称"></div>
      <div class="input-row"><div class="field"><label>所属行业<span class="req">*</span></label><select class="select" id="gateIndustry"><option value="">请选择</option><option>游戏</option><option>电商零售</option><option>互联网服务</option><option>金融</option><option>教育</option><option>其他</option></select></div><div class="field"><label>对接销售（选填）</label><input class="input" id="gateSales" placeholder="姓名、工号或邀请码"></div></div>
      <div class="input-row"><div class="field"><label>联系人</label><input class="input" id="gateContact" value="${this.accountEsc(p.name||'')}"></div><div class="field"><label>邮箱或电话<span class="req">*</span></label><input class="input" id="gateContactWay" value="${this.accountEsc(p.email||'')}"></div></div>
      </div><div class="modal-foot"><button class="btn btn-ghost" onclick="App.openAdvertiserGate()">上一步</button><div class="spacer"></div><button class="btn btn-primary" onclick="App.submitAdvertiserApplication()">提交申请</button></div>`,true);
  },
  submitAdvertiserApplication(){
    const name=document.getElementById('gateAdvertiserName'),industry=document.getElementById('gateIndustry'),contact=document.getElementById('gateContactWay');
    if(!this.validateRequired([[name,'广告主名称'],[industry,'所属行业'],[contact,'联系方式']])) return;
    localStorage.setItem('t1_advertiser_application',JSON.stringify({type:'create',advertiser:name.value.trim(),industry:industry.value,sales:document.getElementById('gateSales').value.trim()||'待运营确认',contact:document.getElementById('gateContact').value.trim(),contactWay:contact.value.trim(),status:'pending',submittedAt:new Date().toISOString()}));
    this.showApplicationSubmitted('广告主创建申请已提交','运营将回访并核实 SSP 中是否已有该广告主。');
  },
  openJoinAdvertiser(){
    this.modal(`<div class="modal-head"><div><h3>使用邀请码绑定广告主</h3><p>邀请码由运营根据 SSP 广告主生成，提交后仍需运营审核</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg(I.x)}</button></div><div class="modal-body"><div class="field"><label>邀请码<span class="req">*</span></label><input class="input" id="gateInviteCode" placeholder="请输入邀请码，例如 T1-SSP-2026"></div><div class="hint">邀请码用于定位既有广告主，不代表已获得访问权限。Demo 中输入任意非空邀请码均可提交。</div></div><div class="modal-foot"><button class="btn btn-ghost" onclick="App.openAdvertiserGate()">上一步</button><div class="spacer"></div><button class="btn btn-primary" onclick="App.joinAdvertiser()">提交绑定申请</button></div>`);
  },
  joinAdvertiser(){
    const code=document.getElementById('gateInviteCode'); if(!this.validateRequired([[code,'邀请码']])) return;
    localStorage.setItem('t1_advertiser_application',JSON.stringify({type:'invite',inviteCode:code.value.trim(),advertiser:'邀请码对应的 SSP 广告主',status:'pending',submittedAt:new Date().toISOString()}));
    this.showApplicationSubmitted('绑定申请已提交','运营将根据现有信息判断是否需要回访，并完成审核。');
  },
  showApplicationSubmitted(title,desc){this.modal(`<div class="modal-body" style="text-align:center;padding:42px"><div style="width:58px;height:58px;border-radius:50%;background:#eef0ff;color:var(--accent);display:grid;place-items:center;margin:0 auto 18px;font-size:26px">✓</div><h3>${title}</h3><p class="muted" style="margin-top:8px">${desc}</p><div class="notice info" style="margin-top:20px;text-align:left">当前状态：<b>审核中</b><br>审核完成前不能再次创建或绑定广告主。</div></div><div class="modal-foot"><div class="spacer"></div><button class="btn btn-primary" onclick="App.closeModal();App.go('dash')">返回首页</button></div>`);},
  cancelAdvertiserApplication(){const app=this.advertiserApplication();if(!app||app.status!=='pending'||app.type!=='create')return;this.modal(`<div class="modal-head"><div><h3>撤销创建申请？</h3><p>撤销后运营将不再处理本次申请，你可以重新创建或绑定广告主。</p></div></div><div class="modal-foot"><button class="btn btn-ghost" onclick="App.closeModal()">暂不撤销</button><div class="spacer"></div><button class="btn btn-danger" onclick="App.confirmCancelAdvertiserApplication()">确认撤销</button></div>`);},
  confirmCancelAdvertiserApplication(){localStorage.removeItem('t1_advertiser_application');this.closeModal();this.toast('创建申请已撤销');this.go('dash');},
  demoReviewApplication(result){const app=this.advertiserApplication();if(!app)return;if(result==='approved'){const p=this.profile()||{};p.advertiserBound=true;p.advertiserName=app.advertiser||'演示广告主';localStorage.setItem('t1_demo_profile',JSON.stringify(p));localStorage.removeItem('t1_advertiser_application');this.syncAccountContext();this.toast('审核通过，已进入投放');this.go('dash');return;}app.status='rejected';app.rejectReason='运营未能确认本次申请与目标广告主的关系';localStorage.setItem('t1_advertiser_application',JSON.stringify(app));this.go('dash');},
  copy(t,b){ navigator.clipboard?.writeText(t).catch(()=>{}); this.toast('已复制'); if(b){const o=b.innerHTML;b.innerHTML=svg(I.check);setTimeout(()=>b.innerHTML=o,1200);} },

  /* ---------- 消息通知 ---------- */
  unreadCount(){ return DB.notifications.filter(n=>!n.read).length; },
  syncBell(){
    const btn = document.getElementById('bellBtn');
    if(!btn) return;
    const n = this.unreadCount();
    let dot = btn.querySelector('.dot');
    if(n > 0){
      if(!dot){ dot = document.createElement('span'); dot.className = 'dot'; btn.appendChild(dot); }
      dot.classList.add('count'); dot.textContent = n > 9 ? '9+' : n;
    } else if(dot){ dot.remove(); }
  },
  notifItem(n){
    const M = NOTIF[n.type] || NOTIF.system;
    return `<div class="notif-item ${n.read?'':'unread'}" onclick="App.readNotif(${n.id})">
      <span class="row-ico" style="background:${M.bg};color:${M.color}">${svg(M.ico)}</span>
      <div class="notif-body">
        <div class="flex between"><b>${n.title}</b><span class="notif-time">${n.time}</span></div>
        <p>${n.desc}</p>
      </div>
      ${n.read?'':'<span class="notif-dot"></span>'}
    </div>`;
  },
  toggleNotif(e){
    if(e) e.stopPropagation();
    const exist = document.getElementById('notifPop');
    if(exist){ exist.remove(); document.removeEventListener('click', this._notifOut, true); return; }
    const btn = document.getElementById('bellBtn');
    const r = btn.getBoundingClientRect();
    const pop = document.createElement('div');
    pop.id = 'notifPop'; pop.className = 'notif-pop';
    pop.style.top = (r.bottom + 8) + 'px';
    pop.style.right = Math.max(12, window.innerWidth - r.right) + 'px';
    const recent = DB.notifications.slice(0, 5);
    pop.innerHTML = `
      <div class="notif-head">
        <b>通知</b>
        <span class="badge ${this.unreadCount()?'red':'gray'}">${this.unreadCount()} 条未读</span>
        <div class="spacer"></div>
        <button class="link-btn" onclick="App.markAllRead()">全部已读</button>
      </div>
      <div class="notif-list">${recent.map(n=>this.notifItem(n)).join('')}</div>
      <div class="notif-foot"><button class="btn btn-subtle btn-sm" style="width:100%;justify-content:center" onclick="App.openNotifCenter()">查看全部通知</button></div>`;
    document.body.appendChild(pop);
    this._notifOut = (ev)=>{ if(!pop.contains(ev.target) && ev.target!==btn && !btn.contains(ev.target)){ this.toggleNotif(); } };
    setTimeout(()=>document.addEventListener('click', this._notifOut, true), 0);
  },
  closeNotifPop(){ const p=document.getElementById('notifPop'); if(p){ p.remove(); document.removeEventListener('click', this._notifOut, true); } },
  readNotif(id){
    const n = DB.notifications.find(x=>x.id===id); if(n) n.read = true;
    this.save(); this.syncBell();
    this.refreshNotifViews();
  },
  markAllRead(){
    DB.notifications.forEach(n=>n.read=true);
    this.save(); this.syncBell();
    this.refreshNotifViews();
    this.toast('已全部标记为已读');
  },
  refreshNotifViews(){
    if(document.getElementById('notifPop')){ this.closeNotifPop(); this.toggleNotif(); }
    if(document.getElementById('notifCenter')) this.renderNotifCenter();
  },
  openNotifCenter(){
    this.closeNotifPop();
    this.modal(`
      <div class="modal-head"><div><h3>通知中心</h3><p>共 ${DB.notifications.length} 条 · ${this.unreadCount()} 条未读</p></div><div class="spacer"></div>
        <button class="btn btn-ghost btn-sm" onclick="App.markAllRead()">${svg(I.check)}全部已读</button>
        <button class="icon-btn" onclick="App.closeModal()">${svg('<path d="M18 6 6 18M6 6l12 12"/>')}</button></div>
      <div class="modal-body" id="notifCenter">
        <div id="notifCenterList"></div>
      </div>`, true);
    this.renderNotifCenter();
  },
  renderNotifCenter(){
    const el = document.getElementById('notifCenterList'); if(!el) return;
    el.innerHTML = DB.notifications.length
      ? `<div class="notif-list">${DB.notifications.map(n=>this.notifItem(n)).join('')}</div>`
      : `<div class="muted" style="text-align:center;padding:36px">暂无通知</div>`;
  },

  statusBadge(s){
    const m={active:['green','投放中'],review:['amber','审核中'],paused:['gray','已暂停'],rejected:['red','审核驳回']};
    const [c,t]=m[s]||['gray',s];
    return `<span class="badge ${c}"><span class="dot-status ${c}"></span>${t}</span>`;
  },
  mkChart(id,type,data,opts){
    const ctx=document.getElementById(id); if(!ctx) return;
    if(this.charts[id]) this.charts[id].destroy();
    this.charts[id]=new Chart(ctx,{type,data,options:Object.assign({responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{padding:10,cornerRadius:8,backgroundColor:'#0f1b2d'}}},opts||{})});
  },

  /* ============ 仪表盘 ============ */
  dashCampaigns(){ const mode=this.dashMode||'all'; return mode==='all'?DB.campaigns:DB.campaigns.filter(c=>c.mode===mode); },
  dashRangeMeta(){
    const days = this.dashRange || 7;
    const factor = days / 7;
    const mode=this.dashMode||'all', list=this.dashCampaigns();
    const spend=list.reduce((s,c)=>s+(c.spend||0),0)*factor;
    const imps=Math.round(list.reduce((s,c)=>s+(c.imps||0),0)*factor);
    const clicks=Math.round(list.reduce((s,c)=>s+(c.clicks||0),0)*factor);
    const ctr=imps?(clicks/imps*100).toFixed(2)+'%':'0.00%';
    const activeCreativeCount=DB.creatives.filter(cr=>cr.status==='active' && list.some(c=>c.id===cr.camp)).length;
    return {
      days,
      label: `近${days}天`,
      factor,
      mode,
      kpis: mode==='all' ? [
        {ico:I.eye,label:`曝光量（近${days}天）`,val:fmtNum(imps),t:'up',d:'14.0%'},
        {ico:I.click,label:`点击量（近${days}天）`,val:fmtNum(clicks),t:'up',d:'6.4%'},
        {ico:I.conv,label:`CTR（近${days}天）`,val:ctr,t:'up',d:'0.3%'},
        {ico:I.camp,label:'投放中计划',val:String(list.filter(c=>c.status==='active').length),t:'up',d:'1 个'},
      ] : mode==='cpd' ? [
        {ico:I.eye,label:`曝光量（近${days}天）`,val:fmtNum(imps),t:'up',d:'14.0%'},
        {ico:I.click,label:`点击量（近${days}天）`,val:fmtNum(clicks),t:'up',d:'6.4%'},
        {ico:I.conv,label:`CTR（近${days}天）`,val:ctr,t:'up',d:'0.3%'},
        {ico:I.creative,label:'投放中创意',val:String(activeCreativeCount),t:'up',d:'2 个'},
      ] : [
        {ico:I.money,label:`花费（近${days}天）`,val:fmtMoney(spend),t:'up',d:days===7?'9.2%':days===14?'12.8%':'18.6%'},
        {ico:I.eye,label:`展示量（近${days}天）`,val:fmtNum(imps),t:'up',d:days===7?'14.0%':days===14?'17.3%':'21.5%'},
        {ico:I.click,label:`点击量（近${days}天）`,val:fmtNum(clicks),t:'up',d:days===7?'6.4%':days===14?'8.9%':'13.2%'},
        {ico:I.conv,label:`CTR（近${days}天）`,val:ctr,t:'down',d:days===7?'2.1%':days===14?'1.4%':'0.8%'},
      ]
    };
  },
  homeStateValue(){
    if((this.isDemoMode()||this.isPreviewMode())&&this.homeState) return this.homeState;
    if(!this.isAdvertiserBound()){
      const app=this.advertiserApplication();
      return app?.status==='pending'?'pending':app?.status==='rejected'?'rejected':'unbound';
    }
    return 'active';
  },
  setHomeState(state){
    this.homeState=state;
    if(this.isPreviewMode()){
      const p=this.profile()||{name:'评审用户',email:'review@t1.demo'};p.advertiserBound=state==='empty'||state==='active';localStorage.setItem('t1_demo_profile',JSON.stringify(p));
      if(state==='pending')localStorage.setItem('t1_advertiser_application',JSON.stringify({type:'create',advertiser:'星海互动',status:'pending'}));
      else if(state==='rejected')localStorage.setItem('t1_advertiser_application',JSON.stringify({type:'create',advertiser:'星海互动',status:'rejected',rejectReason:'运营未能确认本次申请与目标广告主的关系'}));
      else localStorage.removeItem('t1_advertiser_application');
      this.syncAccountContext();
    }
    this.go('dash');
  },
  homeStateSwitcher(){
    if(!this.isPreviewMode())return '';
    const state=this.homeStateValue();
    return `<div class="notice warning" style="margin-bottom:18px"><div class="flex between" style="gap:16px;flex-wrap:wrap"><div><b>首页状态预览</b><div class="cell-sub">可连续切换全部状态，预览不会修改真实数据</div></div><div class="segment">${[['unbound','未绑定'],['pending','审核中'],['rejected','已驳回'],['empty','已绑定未投放'],['active','已有投放']].map(x=>`<button class="${state===x[0]?'active':''}" onclick="App.setHomeState('${x[0]}')">${x[1]}</button>`).join('')}</div><a class="btn btn-ghost btn-sm" href="login.html">返回登录 / 注册</a></div></div>`;
  },
  view_dash(){
    const state=this.homeStateValue();
    if(state==='unbound'||state==='pending'||state==='rejected') return this.homeStateSwitcher()+this.view_experienceDash(state);
    if(state==='empty') return this.homeStateSwitcher()+this.view_emptyDash();
    return this.homeStateSwitcher()+this.view_matureDash();
  },
  view_matureDash(){
    const meta = this.dashRangeMeta(), kpis = meta.kpis;
    const reviewing=DB.creatives.filter(c=>c.status==='review').length;
    const pendingRecharge=DB.recharges.filter(r=>r.status==='pending').length;
    const tasks=[
      reviewing?`<button onclick="App.go('creatives')"><span class="timeline-dot review"></span><b>${reviewing} 条创意正在审核</b><em>查看审核进度</em></button>`:'',
      pendingRecharge?`<button onclick="App.go('billing')"><span class="timeline-dot review"></span><b>${pendingRecharge} 笔充值待审核</b><em>查看充值记录</em></button>`:'',
    ].filter(Boolean);
    return `
    <div class="page-head compact-page-head">
      <div><h1>账户概览</h1><p>查看投放表现和需要处理的事项</p></div>
    </div>
    ${tasks.length?`<div class="compact-tasks"><div class="compact-tasks-head"><b>待办事项</b><span>${tasks.length}</span></div><div class="compact-tasks-list">${tasks.join('')}</div></div>`:''}
    <div class="performance-head"><div><h2>账户表现</h2><p>${meta.label} · 数据更新至今天 10:00</p></div><div class="performance-filters"><div class="segment"><button class="${meta.mode==='all'?'active':''}" onclick="App.setDashMode('all')">全部</button><button class="${meta.mode==='cpd'?'active':''}" onclick="App.setDashMode('cpd')">CPD</button><button class="${meta.mode==='rtb'?'active':''}" onclick="App.setDashMode('rtb')">RTB</button></div><div class="segment">${[7,14,30].map(d=>`<button class="${meta.days===d?'active':''}" onclick="App.setDashRange(${d})">近 ${d} 天</button>`).join('')}</div></div></div>
    <div class="grid cols-4" style="margin-bottom:18px">
      ${kpis.map(k=>`<div class="card kpi"><div class="kpi-top"><div class="kpi-ico">${svg(k.ico)}</div><div class="kpi-label">${k.label}</div></div><div class="kpi-val">${k.val}</div><div class="kpi-foot"><span class="trend ${k.t}">${svg(k.t==='up'?'<path d=\"m6 15 6-6 6 6\"/>':'<path d=\"m6 9 6 6 6-6\"/>')}${k.d}</span><span>较上周</span></div></div>`).join('')}
    </div>
    <div class="card" style="margin-bottom:18px">
        <div class="card-head"><h3>${meta.mode==='rtb'?'花费趋势':'曝光趋势'}（${meta.label}）</h3><div class="spacer"></div><div class="legend"><span><i style="background:var(--accent)"></i>${meta.mode==='rtb'?'花费':'曝光'}</span></div></div>
        <div class="card-pad"><div class="chart-box"><canvas id="spendChart"></canvas></div></div>
    </div>
    <div class="card">
      <div class="card-head"><h3>计划表现（${meta.label}）</h3><div class="spacer"></div><button class="btn btn-subtle btn-sm" onclick="App.go('report')">查看统一报表</button></div>
      <div class="table-wrap"><table>
        <thead><tr><th>广告计划</th>${meta.mode==='all'?'<th>类型</th>':''}<th>状态</th><th class="num">展示</th><th class="num">点击</th><th class="num">CTR</th>${meta.mode==='rtb'?'<th class="num">花费</th>':''}</tr></thead>
        <tbody>${this.dashCampaigns().filter(c=>c.status==='active').map(c=>{
          const creatives = DB.creatives.filter(cr=>cr.camp===c.id);
          const imps = Math.round(c.imps * meta.factor), clicks = Math.round(c.clicks * meta.factor), spend = c.spend * meta.factor;
          const ctr = imps?(clicks/imps*100).toFixed(2)+'%':'—';
          const cpc = clicks?'$'+(spend/clicks).toFixed(2):'—';
          const cpm = imps?'$'+(spend/imps*1000).toFixed(2):'—';
          return `<tr><td><button class="link-btn" onclick="App.openPlan('${c.id}')"><b>${c.alias||c.name}</b></button><div class="cell-sub">${c.id}</div></td>${meta.mode==='all'?`<td><span class="badge ${c.mode==='cpd'?'amber':'blue'}">${c.mode.toUpperCase()}</span></td>`:''}<td>${this.statusBadge(c.status)}</td><td class="num">${fmtK(imps)}</td><td class="num">${fmtNum(clicks)}</td><td class="num">${ctr}</td>${meta.mode==='rtb'?`<td class="num cell-main">${fmtMoney(spend)}</td>`:''}</tr>`;
        }).join('')}</tbody>
      </table></div>
    </div>`;
  },
  view_experienceDash(forcedState){
    const app=this.advertiserApplication();
    const pending=forcedState==='pending'||app?.status==='pending';
    const rejected=forcedState==='rejected'||app?.status==='rejected';
    const ready=forcedState==='empty';
    const demoActions=pending?`<div class="flex" style="gap:8px;margin-left:auto"><button class="btn btn-subtle btn-sm" onclick="App.demoReviewApplication('rejected')">模拟驳回</button><button class="btn btn-primary btn-sm" onclick="App.demoReviewApplication('approved')">模拟通过</button></div>`:'';
    const stateStrip=pending?`<div class="application-strip"><span class="badge amber">审核中</span><div><b>${app?.type==='invite'?'广告主绑定申请审核中':'广告主创建申请审核中'}</b><p>运营正在处理「${app?.advertiser||'目标广告主'}」；审核完成前不能再次创建或绑定广告主。</p></div>${app?.type==='create'?'<button class="btn btn-ghost btn-sm" onclick="App.cancelAdvertiserApplication()">撤销创建申请</button>':''}${demoActions}</div>`:rejected?`<div class="application-strip"><span class="badge red">已驳回</span><div><b>本次申请未通过</b><p>${app?.rejectReason||'运营未能确认本次申请。'} 你可以重新发起创建或绑定。</p></div><button class="btn btn-primary btn-sm" onclick="App.openAdvertiserGate()">重新申请</button></div>`:ready?`<div class="application-strip ready"><div><b>广告主已绑定，可以开始第一条投放</b><p>绑定事件已结束，你可以直接使用投放功能。</p></div><button class="btn btn-primary btn-sm" onclick="App.startRtbCreate()">创建第一条 RTB 投放</button></div>`:'';
    const primary=pending?`<button class="btn btn-primary" disabled>审核完成后开始投放</button>`:`<button class="btn btn-primary" onclick="App.startRtbCreate()">${svg(I.plus)}${ready?'创建第一条 RTB 投放':'开始 RTB 自助投放'}</button>`;
    const foot=pending?'审核期间仍可浏览平台能力、案例和帮助内容。':ready?'广告主已绑定，可直接创建投放。':rejected?'本次申请已结束，可重新创建或绑定广告主。':'浏览平台无需绑定广告主；开始真实投放时再提交创建或绑定申请。';
    return `${stateStrip}<div class="first-screen-growth">
      <div class="compact-hero card">
        <div class="growth-copy"><div class="section-kicker">T1 ADS · GROWTH PLATFORM</div><h1>优质流量、精准触达，<br>让广告投入带来真实增长</h1><p>覆盖多种 App 与广告场景，通过灵活投放工具触达目标用户，并用透明数据持续优化效果。</p><div class="flex growth-actions">${primary}<button class="btn btn-ghost" onclick="App.toast('请联系销售团队，由销售与运营协助确认资源和排期','info')">咨询 CPD 运营代投</button><button class="btn btn-subtle" onclick="App.go('help')">查看案例与指南</button></div><small>${foot}</small></div>
        <div class="compact-evidence"><div class="evidence-head"><div><span class="badge blue">效果与规模</span><h3>用事实判断是否适合你</h3></div><button class="text-link" onclick="App.go('help')">查看数据口径</button></div><div class="evidence-grid"><div><b>—</b><span>平台效果基准</span><small>接入真实数据后展示</small></div><div><b>—</b><span>日均流量机会</span><small>接入库存数据后展示</small></div><div><b>多场景</b><span>App 广告资源</span><small>开屏 · 信息流 · 横幅</small></div><div><b>可下钻</b><span>透明效果报告</span><small>计划 · 广告组 · 创意</small></div></div></div>
      </div>
      <div class="compact-capabilities">
        <div class="compact-cap"><span class="growth-icon">◫</span><div><b>丰富流量</b><p>多种 App、广告形式和库存范围可供选择</p></div></div>
        <div class="compact-cap"><span class="growth-icon">◎</span><div><b>精准匹配</b><p>按地域、设备、App 与广告位组合定向</p></div></div>
        <div class="compact-cap"><span class="growth-icon">⚙</span><div><b>灵活投放</b><p>RTB 自主控制，CPD 专业团队协助执行</p></div></div>
        <div class="compact-cap"><span class="growth-icon">▥</span><div><b>全面报告</b><p>看清曝光、点击、花费与转化表现</p></div></div>
      </div>
      <div class="compact-trust"><span><b>可控</b> 预算、排期和投放状态清晰管理</span><span><b>透明</b> 指标口径与数据表现可追踪</span><span><b>有支持</b> 销售与运营协助解决投放问题</span></div>
    </div>`;
  },
  view_emptyDash(){
    return this.view_experienceDash('empty');
  },
  view_help(){
    return `<div class="page-head"><div><h1>帮助中心</h1><p>无需绑定广告主即可浏览</p></div></div><div class="grid cols-3"><div class="card card-pad"><span class="badge blue">入门</span><h3 style="margin:12px 0 6px">T1 平台快速入门</h3><p class="muted">了解 CPD 与 RTB 的区别、账户结构和基本工作方式。</p></div><div class="card card-pad"><span class="badge purple">投放</span><h3 style="margin:12px 0 6px">创建 RTB 投放</h3><p class="muted">学习广告计划、广告组和广告创意三层创建流程。</p></div><div class="card card-pad"><span class="badge amber">CPD</span><h3 style="margin:12px 0 6px">CPD 项目管理</h3><p class="muted">查看运营代投数据，并在允许范围内提交创意变更。</p></div></div>`;
  },
  setDashRange(days){
    this.dashRange = days;
    this.go('dash');
  },
  setDashMode(mode){ this.dashMode=mode; this.go('dash'); },
  after_dash(){
    if(!this.isAdvertiserBound()) return;
    const meta = this.dashRangeMeta();
    const isExposure=meta.mode!=='rtb';
    const total=this.dashCampaigns().reduce((s,c)=>s+(isExposure?(c.imps||0):(c.spend||0)),0)*meta.factor;
    const base = [.92,1.04,.98,1.12,1.08,.96,1.1];
    const labels = Array.from({length:meta.days}, (_,i)=>`${i+1}日`);
    const weights=Array.from({length:meta.days},(_,i)=>base[i%base.length]);
    const weightSum=weights.reduce((s,v)=>s+v,0)||1;
    const data = weights.map(v=>Math.round(total*v/weightSum));
    this.mkChart('spendChart','line',{
      labels,
      datasets:[
        {label:isExposure?'曝光':'花费',data,borderColor:cssVar('--accent'),backgroundColor:'rgba(91,91,240,.1)',fill:true,tension:.4,borderWidth:2.5,pointRadius:0,pointHoverRadius:5,pointHitRadius:16},
      ]
    },{
      interaction:{mode:'index',intersect:false},
      plugins:{
        legend:{display:false},
        tooltip:{
          enabled:true,
          mode:'index',
          intersect:false,
          padding:10,
          cornerRadius:8,
          backgroundColor:'#0f1b2d',
          callbacks:{label:ctx=>isExposure?`曝光：${fmtNum(ctx.parsed.y)}`:`花费：${fmtMoney(ctx.parsed.y)}`}
        }
      },
      scales:{y:{position:'left',grid:{color:cssVar('--grid')},ticks:{callback:v=>isExposure?fmtK(v):'$'+v}},x:{grid:{display:false}}}
    });
    const formatAgg={}; this.dashCampaigns().forEach(c=>{ formatAgg[c.fmt]=(formatAgg[c.fmt]||0)+(isExposure?(c.imps||0):(c.spend||0))*meta.factor; });
    const fk=Object.keys(formatAgg), fv=fk.map(k=>Math.round(formatAgg[k])), fc=fk.map(k=>(FMT[k]||FMT.feed).color);
    this.mkChart('fmtChart','doughnut',{labels:fk.map(k=>(FMT[k]||FMT.feed).name.split(/\s/)[0]),datasets:[{data:fv,backgroundColor:fc,borderWidth:0,cutout:'68%'}]});
    const fmtLegend=document.getElementById('fmtLegend');
    if(fmtLegend)fmtLegend.innerHTML=fk.map((k,i)=>`<div class="flex between"><span class="flex" style="gap:8px"><i style="width:10px;height:10px;border-radius:3px;background:${fc[i]}"></i>${(FMT[k]||FMT.feed).name.split(/\s/)[0]}</span><b>${isExposure?fmtK(fv[i]):fmtMoney(fv[i])}</b></div>`).join('');

    // 流量类型分布（按计划 inv 平摊）
    const agg = {web:0, app:0, h5:0};
    this.dashCampaigns().forEach(c=>{ const inv=c.inv||['web']; inv.forEach(t=>agg[t]+=(isExposure?(c.imps||0):(c.spend||0))*meta.factor/inv.length); });
    const maxS = Math.max(1, ...Object.values(agg));
    const invPerf=document.getElementById('invPerf');
    if(invPerf)invPerf.innerHTML = Object.keys(INV).map(t=>{
      const S=INV[t], v=agg[t]||0, n=this.dashCampaigns().filter(c=>(c.inv||['web']).includes(t)).length;
      return `<div style="margin-bottom:16px">
        <div class="flex between" style="margin-bottom:7px">
          <span class="flex" style="gap:9px"><span class="row-ico" style="background:${S.bg};color:${S.color}">${svg(S.ico)}</span><span><b style="font-size:13.5px">${S.name}</b><div class="cell-sub">${n} 个活动投放</div></span></span>
          <b style="font-size:14px">${isExposure?fmtK(v):fmtMoney(v)}</b>
        </div>
        <div class="bar"><i style="width:${(v/maxS*100).toFixed(0)}%;background:${S.color}"></i></div>
      </div>`;
    }).join('');
  },

  /* =============================================================
     广告计划（照搬 SSP 广告管理流程）
     ============================================================= */
  view_cpdplans(){ return this.viewPlanList('cpd'); },
  view_rtbplans(){ return this.viewPlanList('rtb'); },
  view_plans(){
    const cpdOnly=this.isCpdReview();
    return `<div class="page-head"><div><h1>广告投放</h1><p>${cpdOnly?'查看运营代投的 CPD 广告及投放数据':'查看和管理 CPD 代投与 RTB 自助投放'} · ${cpdOnly?DB.campaigns.filter(c=>c.mode==='cpd').length:DB.campaigns.length} 个计划</p></div><div class="spacer"></div><button class="text-link cpd-contact-link" onclick="App.showCpdContact()">需要 CPD 代投？联系运营</button>${cpdOnly?'':`<button class="btn btn-primary" onclick="App.startRtbCreate()">${svg(I.plus)}新建 RTB 投放</button>`}</div>
      <div class="card plan-list-card"><div class="card-head plan-list-tools"><div class="segment" id="unifiedTypeTabs">${cpdOnly?`<button data-type="cpd" onclick="App.setUnifiedType(this,'cpd')">CPD 代投</button>`:`<button data-type="all" onclick="App.setUnifiedType(this,'all')">全部</button><button data-type="rtb" onclick="App.setUnifiedType(this,'rtb')">RTB 自助</button><button data-type="cpd" onclick="App.setUnifiedType(this,'cpd')">CPD 代投</button>`}</div><div class="spacer"></div><select class="select" id="unifiedStatusFilter" style="width:130px" onchange="App.resetUnifiedPage()"><option value="">全部状态</option><option value="active">投放中</option><option value="paused">已暂停</option></select><select class="select" id="unifiedIssueFilter" style="width:150px" onchange="App.resetUnifiedPage()"><option value="">全部投放情况</option><option value="ready">正常投放</option><option value="paused">计划已暂停</option><option value="review">创意审核中</option></select><input class="input" id="unifiedSearch" style="width:240px" placeholder="搜索计划名称或 ID" oninput="App.resetUnifiedPage()"></div>
      <div class="plan-context-note" id="unifiedCpdHint"><span><b>CPD 由运营创建和管理</b>，如需新增投放，请联系运营人员确认广告位、价格和排期。</span><button class="text-link" onclick="App.showCpdContact()">联系运营</button></div>
      <div class="plan-bulk-bar" id="unifiedBulkBar"><b id="unifiedBulkCount">已选择 0 条</b><span>批量操作仅适用于 RTB 广告计划</span><div class="spacer"></div><button class="btn btn-ghost btn-sm" onclick="App.clearUnifiedSelection()">取消选择</button><button class="btn btn-ghost btn-sm" onclick="App.confirmBulkPlanStatus('paused')">批量暂停投放</button><button class="btn btn-primary btn-sm" onclick="App.confirmBulkPlanStatus('active')">批量恢复投放</button></div>
      <div class="table-wrap"><table class="plan-list-table"><thead><tr id="unifiedPlanHead"></tr></thead><tbody id="unifiedPlanBody"></tbody></table></div><div id="unifiedPlanPager"></div></div>`;
  },
  after_plans(){
    this.pages.unifiedPlan=1;this.unifiedSelected=new Set();
    const remembered=DB.uiState?.planListView;
    this.unifiedType=this.isCpdReview()?'cpd':(['all','rtb','cpd'].includes(remembered)?remembered:(DB.campaigns.some(c=>c.mode==='rtb')?'rtb':DB.campaigns.some(c=>c.mode==='cpd')?'cpd':'rtb'));
    document.querySelector(`#unifiedTypeTabs [data-type="${this.unifiedType}"]`)?.classList.add('active');
    this.renderUnifiedPlans();
  },
  setUnifiedType(btn,type){ document.querySelectorAll('#unifiedTypeTabs button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');this.unifiedType=type;DB.uiState.planListView=type;this.save();this.pages.unifiedPlan=1;this.unifiedSelected=new Set();this.renderUnifiedPlans(); },
  resetUnifiedPage(){this.pages.unifiedPlan=1;this.unifiedSelected=new Set();this.renderUnifiedPlans();},
  unifiedPlanIssue(cp,creatives){
    if(cp.status==='paused')return {key:'paused',label:'计划已暂停',cls:'gray'};
    if(creatives.some(a=>a.status==='review'))return {key:'review',label:'创意审核中',cls:'amber'};
    return {key:'ready',label:cp.mode==='cpd'?'运营代投中':'正常投放',cls:'green'};
  },
  renderUnifiedPlans(){
    const type=this.unifiedType||'rtb',status=document.getElementById('unifiedStatusFilter')?.value||'',issueFilter=document.getElementById('unifiedIssueFilter')?.value||'',kw=(document.getElementById('unifiedSearch')?.value||'').trim().toLowerCase();
    const all=DB.campaigns.filter(c=>{const creatives=DB.creatives.filter(a=>a.camp===c.id),issue=this.unifiedPlanIssue(c,creatives);return (type==='all'||c.mode===type)&&(!status||c.status===status)&&(!issueFilter||issue.key===issueFilter)&&(!kw||[c.name,c.id,c.alias].some(v=>(v||'').toLowerCase().includes(kw)));});
    const list=this.pageSlice(all,'unifiedPlan');
    this.visibleUnifiedIds=list.filter(c=>c.mode==='rtb').map(c=>c.id);
    const selectable=this.visibleUnifiedIds.length>0&&this.visibleUnifiedIds.every(id=>this.unifiedSelected?.has(id));
    const showType=type==='all',table=document.querySelector('.plan-list-table'),cpdHint=document.getElementById('unifiedCpdHint');
    table?.classList.toggle('show-type',showType);table?.classList.toggle('type-hidden',!showType);if(cpdHint)cpdHint.classList.toggle('show',type==='cpd');
    if(type==='cpd'){
      const heads=[['广告计划','plan-name-col'],['状态','status-col'],['投放情况','issue-col'],['广告位 / 资源位','placement-col'],['曝光','num metric-col'],['点击','num metric-col'],['CTR','num metric-col'],['开始日期','date-col'],['结束日期','date-col'],['订单编号','order-col'],['操作','act']];
      document.getElementById('unifiedPlanHead').innerHTML=heads.map(([h,cls])=>`<th class="${cls}">${h}</th>`).join('');
      document.getElementById('unifiedPlanBody').innerHTML=list.map(cp=>{
        const creatives=DB.creatives.filter(a=>a.camp===cp.id),imps=creatives.reduce((s,a)=>s+(a.imps||0),0),clicks=creatives.reduce((s,a)=>s+(a.clicks||0),0),ctr=imps?(clicks/imps*100).toFixed(2)+'%':'—',issue=this.unifiedPlanIssue(cp,creatives);
        return `<tr><td class="plan-name-col"><button class="link-btn" title="进入广告计划详情" onclick="App.openPlan('${cp.id}')"><b>${cp.name}</b></button><div class="cell-sub">${cp.alias?cp.alias+' · ':''}${cp.id}</div></td><td>${this.statusBadge(cp.status)}</td><td><span class="badge ${issue.cls}">${issue.label}</span></td><td>${cp.placement||'—'}</td><td class="num">${fmtK(imps)}</td><td class="num">${fmtK(clicks)}</td><td class="num">${ctr}</td><td>${cp.start||'—'}</td><td>${cp.end||'长期投放'}</td><td class="mono">${cp.order||'—'}</td><td><button class="btn btn-ghost btn-sm" onclick="App.openPlan('${cp.id}')">查看详情</button></td></tr>`;
      }).join('')||`<tr><td colspan="${heads.length}"><div class="empty">暂无符合条件的 CPD 广告计划</div></td></tr>`;
      document.getElementById('unifiedPlanPager').innerHTML=this.pagerHTML('unifiedPlan',all.length);
      const bulk=document.getElementById('unifiedBulkBar');if(bulk)bulk.classList.remove('show');
      return;
    }
    const heads=[['选择','select-col'],...(showType?[['投放类型','plan-type-col']]:[]),['广告计划','plan-name-col'],['状态','status-col'],['投放情况','issue-col'],['预算','money-col'],['花费','money-col'],['剩余预算','money-col wide'],['曝光','num metric-col'],['点击','num metric-col'],['CTR','num metric-col'],['CPC','num metric-col'],['CPM','num metric-col'],['开始日期','date-col'],['结束日期','date-col'],['订单编号','order-col'],['代投运营','owner-col'],['操作','act']];
    document.getElementById('unifiedPlanHead').innerHTML=heads.map(([h,cls],i)=>i===0?`<th class="select-col"><input type="checkbox" aria-label="选择本页 RTB 计划" ${selectable?'checked':''} onchange="App.toggleAllUnified(this.checked)"></th>`:`<th class="${cls}">${h}</th>`).join('');
    document.getElementById('unifiedPlanBody').innerHTML=list.map(cp=>{
      const creatives=DB.creatives.filter(a=>a.camp===cp.id),imps=creatives.reduce((s,a)=>s+(a.imps||0),0),clicks=creatives.reduce((s,a)=>s+(a.clicks||0),0),ctr=imps?(clicks/imps*100).toFixed(2)+'%':'—',isCpd=cp.mode==='cpd',spend=cp.spend||0,budget=cp.budget||cp.totalBudget||cp.dailyBudget||0,remaining=Math.max(0,budget-spend),cpc=!isCpd&&clicks?spend/clicks:null,cpm=!isCpd&&imps?spend/imps*1000:null,issue=this.unifiedPlanIssue(cp,creatives);
      const statusAction=cp.status==='active'?'暂停投放':'恢复投放',nextStatus=cp.status==='active'?'paused':'active';
      const action=isCpd?'<span class="na-value">—</span>':`<div class="plan-row-actions"><button class="plan-row-action" onclick="App.openCampaignEdit('${cp.id}',true)">编辑计划</button><button class="plan-row-action" onclick="App.confirmPlanStatus('${cp.id}','${nextStatus}')">${statusAction}</button></div>`;
      const cannotSelect=isCpd,disabledReason='CPD 计划由运营管理，不支持批量启停';
      const typeCell=showType?`<td class="plan-type-col"><span class="badge ${isCpd?'amber':'blue'}">${isCpd?'CPD':'RTB'}</span></td>`:'';
      return `<tr><td class="select-col"><input type="checkbox" aria-label="选择 ${cp.name}" ${cannotSelect?`disabled title="${disabledReason}"`:this.unifiedSelected?.has(cp.id)?'checked':''} onchange="App.toggleUnifiedSelection('${cp.id}',this.checked)"></td>${typeCell}<td class="plan-name-col"><button class="link-btn" title="进入广告计划详情" onclick="App.openPlan('${cp.id}')"><b>${cp.name}</b></button><div class="cell-sub">${cp.alias?cp.alias+' · ':''}${cp.id}</div></td><td class="status-col">${this.statusBadge(cp.status)}</td><td class="issue-col"><span class="badge ${issue.cls}">${issue.label}</span></td><td class="money-col">${isCpd?'<span class="na-value" title="CPD 费用由订单管理">—</span>':fmtMoney(budget)}</td><td class="money-col">${isCpd?'<span class="na-value" title="CPD 费用由订单管理">—</span>':fmtMoney(spend)}</td><td class="money-col wide">${isCpd?'<span class="na-value" title="CPD 费用由订单管理">—</span>':fmtMoney(remaining)}</td><td class="num metric-col">${fmtK(imps)}</td><td class="num metric-col">${fmtK(clicks)}</td><td class="num metric-col">${ctr}</td><td class="num metric-col">${cpc===null?'—':fmtMoney(cpc)}</td><td class="num metric-col">${cpm===null?'—':fmtMoney(cpm)}</td><td class="date-col">${cp.start||'—'}</td><td class="date-col">${cp.end||'长期投放'}</td><td class="mono order-col">${isCpd?(cp.order||'—'):'—'}</td><td class="owner-col">${isCpd?(cp.operator||'待分配'):'—'}</td><td class="act">${action}</td></tr>`;
    }).join('')||`<tr><td colspan="${heads.length}"><div class="empty">暂无符合条件的广告计划</div></td></tr>`;
    document.getElementById('unifiedPlanPager').innerHTML=this.pagerHTML('unifiedPlan',all.length);
    this.renderUnifiedBulkBar();
  },
  toggleUnifiedSelection(id,checked){this.unifiedSelected=this.unifiedSelected||new Set();checked?this.unifiedSelected.add(id):this.unifiedSelected.delete(id);this.renderUnifiedPlans();},
  toggleAllUnified(checked){this.unifiedSelected=this.unifiedSelected||new Set();(this.visibleUnifiedIds||[]).forEach(id=>checked?this.unifiedSelected.add(id):this.unifiedSelected.delete(id));this.renderUnifiedPlans();},
  clearUnifiedSelection(){this.unifiedSelected=new Set();this.renderUnifiedPlans();},
  renderUnifiedBulkBar(){const bar=document.getElementById('unifiedBulkBar'),count=this.unifiedSelected?.size||0;if(!bar)return;bar.classList.toggle('show',count>0);document.getElementById('unifiedBulkCount').textContent=`已选择 ${count} 条 RTB 计划`;},
  openPlanActions(id){
    const cp=DB.campaigns.find(c=>c.id===id);if(!cp||cp.mode!=='rtb')return;
    const next=cp.status==='active'?'paused':'active',verb=next==='paused'?'暂停投放':'恢复投放';
    this.modal(`<div class="modal-head"><div><h3>管理广告计划</h3><p>${cp.alias||cp.name} · ${cp.id}</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg('<path d="M18 6 6 18M6 6l12 12"/>')}</button></div><div class="modal-body plan-action-list"><button onclick="App.closeModal();App.openCampaignEdit('${cp.id}',true)">${svg(I.edit)}<span><b>编辑广告计划</b><small>修改计划名称、投放周期和预算</small></span></button><button onclick="App.closeModal();App.confirmPlanStatus('${cp.id}','${next}')">${svg(next==='paused'?I.pause:I.play)}<span><b>${verb}</b><small>${next==='paused'?'下属广告组和创意将停止生效，但保留各自状态':'仅恢复原本启用且审核通过的下属对象'}</small></span></button></div>`,true);
  },
  confirmPlanStatus(id,status){const cp=DB.campaigns.find(c=>c.id===id);if(!cp)return;const pause=status==='paused';this.modal(`<div class="modal-head"><div><h3>${pause?'暂停':'恢复'}广告计划</h3><p>${cp.alias||cp.name}</p></div></div><div class="modal-body"><p>${pause?'暂停后，计划下的广告组和创意将停止投放，但不会改变它们各自的启停和审核状态。':'恢复后，仅原本启用、审核通过且仍在投放周期内的广告组和创意会重新生效。'}</p></div><div class="modal-foot"><button class="btn btn-ghost" onclick="App.closeModal()">取消</button><button class="btn btn-primary" onclick="App.applyPlanStatus(['${id}'],'${status}')">确认${pause?'暂停':'恢复'}</button></div>`,true);},
  confirmBulkPlanStatus(status){const ids=[...(this.unifiedSelected||[])],pause=status==='paused';if(!ids.length)return;this.pendingBulkPlanIds=ids;this.modal(`<div class="modal-head"><div><h3>批量${pause?'暂停':'恢复'}投放</h3><p>将处理 ${ids.length} 条 RTB 广告计划</p></div></div><div class="modal-body"><p>${pause?'所有选中计划及其下属广告组、创意将停止生效；子对象自身状态保持不变。':'仅恢复符合投放条件的计划；子对象仍需处于启用且审核通过状态。'}</p></div><div class="modal-foot"><button class="btn btn-ghost" onclick="App.closeModal()">取消</button><button class="btn btn-primary" onclick="App.applyPlanStatus(App.pendingBulkPlanIds,'${status}')">确认${pause?'暂停':'恢复'} ${ids.length} 条计划</button></div>`,true);},
  applyPlanStatus(ids,status){let changed=0;ids.forEach(id=>{const cp=DB.campaigns.find(c=>c.id===id);if(cp?.mode==='rtb'&&cp.status!==status){cp.status=status;changed++;}});this.save();this.closeModal();this.unifiedSelected=new Set();this.renderUnifiedPlans();this.toast(`${changed} 条广告计划已${status==='paused'?'暂停':'恢复'}`);},
  openUnifiedCreateChoice(){
    this.createMode='rtb';
    this.modal(`<div class="modal-head"><div><h3>新建投放</h3><p>请选择投放方式，然后继续</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg(I.x)}</button></div><div class="modal-body"><div class="choice-grid" style="grid-template-columns:1fr 1fr"><button class="choice sel" data-create-mode="rtb" style="text-align:left" onclick="App.pickCreateMode(this,'rtb')"><div class="c-body"><span class="badge green">可自助创建</span><b style="margin-top:10px">RTB 自助投放</b><small>自主设置预算、出价、定向、库存和广告创意。</small></div></button><button class="choice" data-create-mode="cpd" style="text-align:left" onclick="App.pickCreateMode(this,'cpd')"><div class="c-body"><span class="badge gray">由运营协助</span><b style="margin-top:10px">CPD 运营代投</b><small>联系销售和广告运营确认资源与排期。</small></div></button></div></div><div class="modal-foot"><button class="btn btn-ghost" onclick="App.closeModal()">取消</button><div class="spacer"></div><button class="btn btn-primary" onclick="App.confirmCreateMode()">继续</button></div>`,true);
  },
  pickCreateMode(el,mode){ document.querySelectorAll('[data-create-mode]').forEach(x=>x.classList.remove('sel'));el.classList.add('sel');this.createMode=mode; },
  confirmCreateMode(){ if(this.createMode==='cpd'){this.closeModal();this.showCpdSalesTip();return;}this.closeModal();this.startRtbCreate(); },
  startRtbCreate(){ this.beginNewRtb(); },
  beginNewRtb(){ this.closeModal();this.ufWorking=null;this.curCamp=null;this.go('newplan'); },
  showCpdContact(){
    this.modal(`<div class="modal-head"><div><h3>联系运营创建 CPD 投放</h3><p>当前线上仅开放 RTB 自助创建</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg(I.x)}</button></div><div class="modal-body"><div class="notice info"><b>CPD 由运营人员协助创建和管理</b><br>请通过现有业务群或客户经理联系平台运营，并提供投放目标、期望广告位和排期。运营确认库存与价格后，会为你创建 CPD 广告计划。</div></div><div class="modal-foot"><button class="btn btn-primary" onclick="App.closeModal()">我知道了</button></div>`,true);
  },
  showCpdSalesTip(){ this.toast('CPD 代投请联系销售经理协助下单','info'); },
  viewPlanList(mode){
    this.planListMode=mode;
    const isCpd=mode==='cpd';
    const count=DB.campaigns.filter(c=>c.mode===mode).length;
    return `
    <div class="page-head">
      <div><h1>${isCpd?'CPD 代投':'RTB 自助投放'}</h1><p>${isCpd?'查看运营代建的投放数据，并受控修改广告创意':'自主创建、配置和优化竞价广告'} · ${count} 个计划</p></div>
      <div class="spacer"></div>
      ${isCpd?'':`<button class="btn btn-primary" onclick="App.startRtbCreate()">${svg(I.plus)}新建 RTB 广告计划</button>`}
    </div>
    <div class="notice info" style="margin-bottom:14px">${isCpd?'<b>CPD 由运营创建和管理投放配置</b>：您可以查看数据，并修改图片、文案和落地页；价格、库存、周期、时段和启停不可修改。':'<b>RTB 由广告主自助管理</b>：您可以新建计划，并配置预算、出价、定向、频控和创意。'}</div>
    <div class="card">
      <div class="card-head">
        <div class="segment" id="planFilter">
          ${[['','全部'],['active','投放中'],['paused','已暂停']].map((t,i)=>`<button class="${i===0?'active':''}" onclick="App.filterPlan(this,'${t[0]}')">${t[1]}</button>`).join('')}
        </div>
        <select class="select" id="planInvFilter" style="width:110px;margin-left:12px" onchange="App.renderPlans()">
          <option value="">全部流量</option>
          <option value="web">网站</option>
          <option value="app">App</option>
          <option value="h5">H5</option>
        </select>
        <div class="spacer"></div>
        <input class="input" id="planSearch" style="width:250px" placeholder="搜索名称 / 备注 / 广告位 / ID" oninput="App.renderPlans()">
      </div>
      <div class="table-wrap"><table>
        <thead><tr><th>广告计划</th><th>投放模式</th><th>广告位 / 投放周期</th><th>状态</th><th class="num">创意数</th><th class="num">展示</th><th class="num">点击</th><th class="num">CTR</th><th class="act">操作</th></tr></thead>
        <tbody id="planBody"></tbody>
      </table></div>
      <div id="planPager"></div>
    </div>`;
  },
  after_cpdplans(){ this.pages.plan=1; this.planListMode='cpd'; this.renderPlans(''); },
  after_rtbplans(){ this.pages.plan=1; this.planListMode='rtb'; this.renderPlans(''); },
  filterPlan(btn, f){
    btn.parentNode.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active'); this.pages.plan=1; this.renderPlans(f);
  },
  renderPlans(f){
    if(f!==undefined) this.planFilter = f;
    f = this.planFilter || '';
    const invEl = document.getElementById('planInvFilter');
    const searchEl = document.getElementById('planSearch');
    const invF = invEl ? invEl.value : '';
    const modeF = this.planListMode || 'cpd';
    const kw = searchEl ? searchEl.value.trim().toLowerCase() : '';
    const all = DB.campaigns
      .filter(c=>!f || c.status===f)
      .filter(c=>!invF || (c.inv||[]).includes(invF))
      .filter(c=>!modeF || c.mode===modeF)
      .filter(c=>!kw || [c.name,c.alias,c.placement,c.id].some(v=>(v||'').toLowerCase().includes(kw)));
    const list = this.pageSlice(all, 'plan');
    document.getElementById('planBody').innerHTML = list.map(cp=>{
      const creatives = DB.creatives.filter(cr=>cr.camp===cp.id);
      const imps = creatives.reduce((s,a)=>s+a.imps,0);
      const clks = creatives.reduce((s,a)=>s+a.clicks,0);
      const ctr = imps ? (clks/imps*100).toFixed(2)+'%' : '—';
      const F = FMT[cp.fmt]||{};
      return `<tr>
        <td><div class="cell-flex"><span class="row-ico" style="color:${F.color};width:42px;height:42px">${svg(F.ico)}</span><div><div class="cell-main" style="cursor:pointer;color:var(--accent)" onclick="App.openPlan('${cp.id}')">${cp.name}</div><div class="cell-sub">${cp.alias||'未设置客户备注'} · ${cp.id}</div></div></div></td>
        <td><span class="badge ${cp.mode==='cpd'?'amber':'green'}">${cp.mode==='cpd'?'CPD 运营代投':'RTB 自助投放'}</span></td>
        <td><div class="cell-main">${cp.placement||'—'}</div><div class="cell-sub">${cp.period||'—'}</div></td>
        <td>${this.statusBadge(cp.status)}</td>
        <td class="num">${creatives.length ? `<a href="javascript:void(0)" style="color:var(--accent);cursor:pointer" onclick="App.openPlan('${cp.id}')">${creatives.length}</a>` : '0'}</td>
        <td class="num">${fmtK(imps)}</td>
        <td class="num">${fmtK(clks)}</td>
        <td class="num">${ctr}</td>
        <td class="act"><div class="t-actions">
          <button class="icon-btn btn-sm" title="查看详情" onclick="App.openPlan('${cp.id}')">${svg(I.eye||I.camp)}</button>
          ${cp.mode==='rtb'?`<button class="icon-btn btn-sm" title="${cp.status==='active'?'暂停':'开始'}" onclick="App.togglePlan('${cp.id}',event)">${svg(cp.status==='active'?I.pause:I.play)}</button>`:''}
        </div></td>
      </tr>`;
    }).join('') || `<tr><td colspan="9"><div class="empty">${svg(I.camp)}<div>暂无广告计划</div></div></td></tr>`;
    document.getElementById('planPager').innerHTML = this.pagerHTML('plan', all.length);
  },
  openPlan(id){
    this.curCamp = id;
    const cp=DB.campaigns.find(c=>c.id===id);
    this.planListMode=cp?.mode||'cpd';
    PAGES.campdetail.nav='plans';
    this.go('campdetail');
  },
  togglePlan(id, e){
    if(e) e.stopPropagation();
    const cp = DB.campaigns.find(x=>x.id===id); if(!cp) return;
    if(cp.mode==='cpd'){ this.toast('CPD 计划由运营管理，广告主不可启停','info'); return; }
    cp.status = cp.status==='active'?'paused':'active';
    this.save(); this.renderPlans(this.planFilter||'');
    this.toast(cp.status==='active'?'广告计划已开始':'广告计划已暂停');
  },
  openCampaignEdit(id,returnToList=false){
    const cp=DB.campaigns.find(c=>c.id===id);if(!cp)return;this.editCampId=id;this.editCampReturnToList=returnToList;
    this.modal(`<div class="modal-head"><div><h3>编辑广告计划</h3><p>${cp.id} · 修改计划层边界</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg('<path d="M18 6 6 18M6 6l12 12"/>')}</button></div><div class="modal-body"><div class="notice info" style="margin-bottom:14px">修改周期或预算后，系统会校验已有广告组是否仍在父级边界内。</div><div class="field"><label>计划名称</label><input class="input" id="editCampName" value="${cp.name}"></div><div class="input-row"><div class="field"><label>开始日期</label><input class="input" type="date" id="editCampStart" value="${cp.start||''}"></div><div class="field"><label>结束日期</label><input class="input" type="date" id="editCampEnd" value="${cp.end||''}"></div></div><div class="field"><label>${cp.duration==='ongoing'?'每日预算':'活动总预算'}（USD）</label><input class="input" id="editCampBudget" value="${cp.duration==='ongoing'?(cp.dailyBudget||cp.budget):(cp.totalBudget||cp.budget)}"></div></div><div class="modal-foot"><button class="btn btn-ghost" onclick="App.closeModal()">取消</button><div class="spacer"></div><button class="btn btn-primary" onclick="App.saveCampaignEdit()">保存修改</button></div>`,true);
  },
  saveCampaignEdit(){const cp=DB.campaigns.find(c=>c.id===this.editCampId);if(!cp)return;const name=document.getElementById('editCampName').value.trim(),budget=Number(document.getElementById('editCampBudget').value||0),start=document.getElementById('editCampStart').value,end=document.getElementById('editCampEnd').value;if(!name||!budget){this.toast('请填写计划名称和预算','warn');return;}if(cp.duration!=='ongoing'&&(!start||!end||end<start)){this.toast('结束日期不能早于开始日期','warn');return;}cp.name=name;cp.start=start;cp.end=end;if(cp.duration==='ongoing'){cp.dailyBudget=budget;cp.budget=budget;cp.period='长期投放';}else{cp.totalBudget=budget;cp.budget=budget;cp.period=`${cp.start} 至 ${cp.end}`;}this.save();this.closeModal();if(this.editCampReturnToList){this.editCampReturnToList=false;this.renderUnifiedPlans();}else this.go('campdetail');this.toast('广告计划已更新');},

  /* =============================================================
     广告计划详情：计划概览 + 下属广告组
     ============================================================= */
  view_campdetail(){
    const cp = DB.campaigns.find(c=>c.id===this.curCamp)||{name:'—',id:'—'};
    const ads=DB.creatives.filter(a=>a.camp===cp.id);
    const groupObjects=(DB.adGroups||[]).filter(g=>g.camp===cp.id);
    const groups=[...groupObjects];
    [...new Set(ads.map(a=>a.group||'默认广告组'))].forEach(name=>{if(!groups.some(g=>g.name===name))groups.push({id:'',camp:cp.id,name,status:'active',format:ads.find(a=>(a.group||'默认广告组')===name)?.fmt,inventory:cp.placement});});
    const imps=ads.reduce((s,a)=>s+(a.imps||0),0),clicks=ads.reduce((s,a)=>s+(a.clicks||0),0),conv=ads.reduce((s,a)=>s+(a.conv||0),0);
    const ctr=imps?(clicks/imps*100).toFixed(2)+'%':'—';
    const spend=cp.spend||0,budget=cp.duration==='ongoing'?(cp.dailyBudget||cp.budget):(cp.totalBudget||cp.budget);
    return `
    <div class="page-head campaign-detail-head">
      <div><div class="detail-title-line"><h1>${cp.name}</h1>${this.statusBadge(cp.status)}</div><p>${cp.id} · ${cp.mode==='cpd'?'CPD 运营代投':'RTB 自助投放'} · ${cp.alias||'未设置客户备注'}</p></div>
      <div class="spacer"></div>
      <button class="btn btn-ghost" onclick="App.go('plans')">← 返回计划列表</button>
      ${cp.mode==='rtb'?`<button class="btn btn-ghost" onclick="App.openCampaignEdit('${cp.id}')">${svg(I.edit)}编辑广告计划</button><button class="btn btn-primary" onclick="App.startNewGroup('${cp.id}')">${svg(I.plus)}新建广告组</button>`:''}
    </div>
    <div class="campaign-summary" aria-label="广告计划概览">
      <div><span>投放周期</span><b>${cp.period||'—'}</b></div>
      <div><span>${cp.mode==='cpd'?'广告位 / 库存':'预算 / 花费'}</span><b>${cp.mode==='cpd'?(cp.placement||'—'):`${fmtMoney(budget||0)} / ${fmtMoney(spend)}`}</b></div>
      <div><span>曝光</span><b>${fmtK(imps)}</b></div>
      <div><span>点击</span><b>${fmtK(clicks)}</b></div>
      <div><span>CTR</span><b>${ctr}</b></div>
      <div><span>${cp.mode==='cpd'?'数据更新时间':'转化'}</span><b>${cp.mode==='cpd'?'5 分钟前':fmtK(conv)}</b></div>
    </div>
    ${cp.mode==='cpd'?`<div class="notice info" style="margin-bottom:14px">该计划由运营创建并管理。价格、库存、投放周期、时段和启停状态不可修改；你可以查看数据并提交创意图片、文案或落地页变更。</div>`:''}
    <div class="card group-list-card"><div class="card-head"><div><b>广告组</b><div class="cell-sub">共 <span id="visibleGroupCount">${groups.length}</span> 个广告组；点击名称进入广告组详情</div></div><div class="spacer"></div>${groups.length?`<input class="input group-search" id="campaignGroupSearch" placeholder="搜索广告组名称 / ID" oninput="App.filterCampaignGroups()"><select class="select group-status-filter" id="campaignGroupStatus" onchange="App.filterCampaignGroups()"><option value="">全部状态</option><option value="active">投放中</option><option value="draft">草稿</option><option value="review">审核中</option><option value="needs-creative">待创建创意</option></select>`:''}</div>
      <div class="table-wrap"><table><thead><tr><th>广告组</th><th>状态</th><th>排期</th><th>${cp.mode==='cpd'?'广告形式 / 库存':'预算 / 竞价'}</th><th class="num">创意</th><th class="num">投放数据</th></tr></thead><tbody id="campaignGroupRows">
      ${groups.map(g=>{const ga=ads.filter(a=>a.groupId===g.id||a.group===g.name),gi=ga.reduce((s,a)=>s+(a.imps||0),0),gc=ga.reduce((s,a)=>s+(a.clicks||0),0),gctr=gi?(gc/gi*100).toFixed(2)+'%':'—',needsCreative=ga.length===0;return `<tr data-group-row data-search="${(g.name+' '+g.id).toLowerCase()}" data-status="${needsCreative?'needs-creative':g.status}"><td><div class="cell-main" style="color:var(--accent);cursor:pointer" onclick="App.openGroupDetail('${g.id}','${g.name.replaceAll("'","&#39;")}')">${g.name}</div><div class="cell-sub">${g.id}</div></td><td>${needsCreative?'<span class="badge amber">待创建创意</span>':this.statusBadge(g.status)}</td><td>${g.start||cp.start||'—'}<div class="cell-sub">${g.end?'至 '+g.end:'长期投放'}</div></td><td>${cp.mode==='cpd'?`${FMT[g.format]?.name||'—'}<div class="cell-sub">${g.inventory||cp.placement||'—'}</div>`:`${fmtMoney(g.budget||0)}<div class="cell-sub">${g.bidType||'CPM'} · ${fmtMoney(g.bid||0)}</div>`}</td><td class="num">${needsCreative?(cp.mode==='rtb'?`<button class="text-link" onclick="App.openNewCreativeForGroup('${g.id}')">创建创意</button>`:'<span class="badge amber">0 · 待补充</span>'):ga.length}</td><td class="num"><b>${fmtK(gi)} / ${fmtK(gc)}</b><div class="cell-sub">曝光 / 点击 · CTR ${gctr}</div></td></tr>`}).join('')||`<tr><td colspan="6"><div class="empty">${svg(I.group||I.camp)}<div>当前广告计划还没有广告组</div>${cp.mode==='rtb'?`<button class="btn btn-primary btn-sm" onclick="App.startNewGroup('${cp.id}')">创建第一个广告组</button>`:''}</div></td></tr>`}
      </tbody></table></div></div>`;
  },
  filterCampaignGroups(){
    const keyword=(document.getElementById('campaignGroupSearch')?.value||'').trim().toLowerCase();
    const status=document.getElementById('campaignGroupStatus')?.value||'';
    const rows=[...document.querySelectorAll('#campaignGroupRows [data-group-row]')];
    let visible=0;
    rows.forEach(row=>{const show=(!keyword||row.dataset.search.includes(keyword))&&(!status||row.dataset.status===status);row.style.display=show?'':'none';if(show)visible++;});
    const count=document.getElementById('visibleGroupCount');if(count)count.textContent=visible;
  },
  after_campdetail(){},
  switchCampaignTab(btn, tab){
    document.querySelectorAll('#campaignTabs button').forEach(b=>b.classList.toggle('active',b===btn));
    const panel=document.getElementById('campaignTabPanel');
    const creativePanel=document.getElementById('campaignCreativePanel');
    if(!panel || !creativePanel) return;
    creativePanel.style.display=tab==='creatives'?'block':'none';
    panel.style.display=tab==='creatives'?'none':'block';
    if(tab==='creatives'){ this.renderAds(this.adFilter||''); return; }
    const cp=DB.campaigns.find(c=>c.id===this.curCamp)||{};
    const ads=DB.creatives.filter(a=>a.camp===cp.id);
    const groupObjects=(DB.adGroups||[]).filter(g=>g.camp===cp.id);
    const groups=[...new Set([...groupObjects.map(g=>g.name),...ads.map(a=>a.group||'默认广告组')])];
    const imps=ads.reduce((s,a)=>s+(a.imps||0),0), clicks=ads.reduce((s,a)=>s+(a.clicks||0),0);
    if(tab==='overview') panel.innerHTML=`<div class="grid cols-3 benchmark-grid">
      <div class="card"><div class="card-pad"><div class="section-kicker">PERFORMANCE</div><h3>交付表现</h3><div class="metric-pair"><div><b>${fmtK(imps)}</b><span>曝光</span></div><div><b>${fmtK(clicks)}</b><span>点击</span></div><div><b>${imps?(clicks/imps*100).toFixed(2):'—'}%</b><span>CTR</span></div></div></div></div>
      <div class="card"><div class="card-pad"><div class="section-kicker">STRUCTURE</div><h3>投放结构</h3><p class="muted-copy">${groups.length} 个广告组 · ${ads.length} 个创意</p><button class="text-link" onclick="App.switchCampaignTab(document.querySelectorAll('#campaignTabs button')[2],'groups')">查看广告组 →</button></div></div>
      <div class="card"><div class="card-pad"><div class="section-kicker">ATTENTION</div><h3>待处理事项</h3><p class="muted-copy">1 个创意版本正在审核，当前线上版本继续生效。</p><button class="text-link" onclick="App.switchCampaignTab(document.querySelectorAll('#campaignTabs button')[5],'changes')">查看变更 →</button></div></div>
    </div>`;
    if(tab==='model') panel.innerHTML=this.objectModelHTML();
    if(tab==='groups') panel.innerHTML=`<div class="card"><div class="card-head"><div><b>广告组</b><div class="cell-sub">进入广告组可查看当前创意或继续新建创意</div></div>${cp.mode==='rtb'?`<div class="spacer"></div><button class="btn btn-primary btn-sm" onclick="App.startNewGroup('${cp.id}')">${svg(I.plus)}新建广告组</button>`:''}</div><div class="table-wrap"><table><thead><tr><th>广告组</th><th>广告位与规格</th><th>状态</th><th class="num">创意</th><th class="num">曝光</th><th class="num">点击</th><th class="act">操作</th></tr></thead><tbody>${groups.map(g=>{const ga=ads.filter(a=>(a.group||'默认广告组')===g),gi=ga.reduce((s,a)=>s+a.imps,0),gc=ga.reduce((s,a)=>s+a.clicks,0),obj=groupObjects.find(x=>x.name===g);return `<tr><td><div class="cell-main" style="color:var(--accent);cursor:pointer" onclick="App.openGroupDetail('${obj?.id||''}','${g.replaceAll("'","&#39;")}')">${g}</div><div class="cell-sub">${obj?.id||'与 SSP 广告组同步'}</div></td><td>${obj?.inventory||cp.placement||'—'}<div class="cell-sub">${ga[0]?.size||FMT[obj?.format]?.name||'待添加创意'}</div></td><td>${this.statusBadge(obj?.status||'active')}</td><td class="num">${ga.length}</td><td class="num">${fmtK(gi)}</td><td class="num">${fmtK(gc)}</td><td class="act"><button class="btn btn-ghost btn-sm" onclick="App.openGroupDetail('${obj?.id||''}','${g.replaceAll("'","&#39;")}')">进入广告组</button></td></tr>`}).join('')||'<tr><td colspan="7"><div class="empty">暂无广告组</div></td></tr>'}</tbody></table></div></div>`;
    if(tab==='data') panel.innerHTML=`<div class="card"><div class="card-pad"><div class="flex between"><div><div class="section-kicker">CAMPAIGN DATA</div><h3>趋势与明细</h3></div><button class="btn btn-ghost" onclick="App.go('report')">进入完整报表</button></div><div class="data-placeholder"><div class="placeholder-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><p>Campaign 级曝光与点击趋势</p></div></div></div>`;
    if(tab==='changes') panel.innerHTML=`<div class="card"><div class="card-pad"><div class="timeline-item"><span class="timeline-dot review"></span><div><b>创意内容变更审核中</b><p>图片、主文案与落地页已提交；当前生效版本不受影响。</p><small>今天 10:26 · Amy 提交</small></div><span class="badge amber">审核中</span></div><div class="timeline-item"><span class="timeline-dot ok"></span><div><b>Campaign 由运营同步至 T1</b><p>广告位、投放周期与 SSP 层级关系已建立。</p><small>2026-08-08 16:40 · 系统</small></div><span class="badge green">已完成</span></div></div></div>`;
  },
  objectModelHTML(){
    return `<div class="model-legend">
      <div><b>字段归属口径</b><span>蓝色字段与 SSP 对齐并入库；紫色字段只服务 T1 产品；灰色字段由 T1 计算展示，不回写 SSP。</span></div>
      <div class="legend">${fieldSourceBadge('ssp')}${fieldSourceBadge('t1')}${fieldSourceBadge('derived')}</div>
    </div>
    <div class="object-flow">${OBJECT_MODEL.map((o,i)=>`<div class="object-node"><span>${o.level}</span><div><b>${o.name}</b><small>${o.role}</small></div></div>${i<OBJECT_MODEL.length-1?'<i>→</i>':''}`).join('')}</div>
    ${OBJECT_MODEL.map(o=>`<div class="card model-card">
      <div class="card-head"><div><div class="section-kicker">LEVEL ${o.level}</div><b>${o.name}</b><div class="cell-sub">${o.role} · ${o.relation}</div></div></div>
      <div class="table-wrap"><table><thead><tr><th style="width:28%">字段</th><th style="width:18%">数据归属</th><th>设计与同步说明</th></tr></thead><tbody>
        ${o.fields.map(f=>`<tr><td><div class="cell-main">${f[0]}</div></td><td>${fieldSourceBadge(f[1])}</td><td class="cell-sub">${f[2]}</td></tr>`).join('')}
      </tbody></table></div></div>`).join('')}
    <div class="notice info"><b>父子约束：</b>Campaign 是时间和预算硬边界；广告组创建时复制 Campaign 排期但之后不持续联动；广告形式与库存联动并约束第三层素材规格；父级暂停或到期会阻止下层交付，但不覆盖下层自身的启停与审核状态。</div>`;
  },
  openGroupDetail(id,name){
    const group=(DB.adGroups||[]).find(g=>g.id===id)||(DB.adGroups||[]).find(g=>g.camp===this.curCamp&&g.name===name);
    if(group){this.curGroup=group.id;this.curCamp=group.camp;}else{this.curGroup=null;this.curGroupName=name;}
    PAGES.groupdetail.nav='plans';this.go('groupdetail');
  },
  view_groupdetail(){
    const group=(DB.adGroups||[]).find(g=>g.id===this.curGroup)||{name:this.curGroupName||'默认广告组',camp:this.curCamp,status:'active'};
    const cp=DB.campaigns.find(c=>c.id===group.camp)||{},ads=DB.creatives.filter(a=>a.camp===cp.id&&(a.groupId===group.id||a.group===group.name));
    return `<div class="page-head"><div><h1>${group.name}</h1><p>${group.id||'SSP 同步广告组'} · 所属计划：${cp.name||'—'}</p></div><div class="spacer"></div><button class="btn btn-ghost" onclick="App.openPlan('${cp.id}')">← 返回广告计划</button>${cp.mode==='rtb'?`<button class="btn btn-ghost" onclick="App.openGroupEdit('${group.id}')">${svg(I.edit)}编辑广告组</button><button class="btn btn-primary" onclick="App.openNewCreativeForGroup('${group.id}')">${svg(I.plus)}新建广告创意</button>`:''}</div>
    <div class="grid cols-4" style="margin-bottom:16px"><div class="card kpi"><div class="kpi-label">状态</div><div style="margin-top:10px">${this.statusBadge(group.status)}</div></div><div class="card kpi"><div class="kpi-label">投放周期</div><div class="kpi-val" style="font-size:15px;margin-top:10px">${group.start||cp.start||'—'} ${group.end?'至 '+group.end:'起长期'}</div></div><div class="card kpi"><div class="kpi-label">广告形式 / 库存</div><div class="kpi-val" style="font-size:15px;margin-top:10px">${FMT[group.format]?.name||cp.placement||'—'}</div></div><div class="card kpi"><div class="kpi-label">创意数</div><div class="kpi-val">${ads.length}</div></div></div>
    <div class="card"><div class="card-head"><div><b>当前广告组下的广告创意</b><div class="cell-sub">查看已有创意${cp.mode==='cpd'?'并提交允许范围内的内容变更':'，或继续添加新的创意'}</div></div>${cp.mode==='rtb'?`<div class="spacer"></div><button class="btn btn-primary btn-sm" onclick="App.openNewCreativeForGroup('${group.id}')">${svg(I.plus)}新建创意</button>`:''}</div><div class="table-wrap"><table><thead><tr><th>广告创意</th><th>素材规格</th><th>状态 / 版本</th><th class="num">曝光</th><th class="num">点击</th><th class="num">CTR</th><th>落地页</th><th>操作</th></tr></thead><tbody>${ads.map(a=>{const ctr=a.imps?((a.clicks||0)/a.imps*100).toFixed(2)+'%':'—';return `<tr><td><div class="cell-flex"><span class="row-ico" style="color:${(FMT[a.fmt]||{}).color}">${svg((FMT[a.fmt]||{}).ico||I.image)}</span><div><b>${a.name}</b><div class="cell-sub">${a.id} · ${a.headline||'未填写标题'}</div></div></div></td><td>${a.size||'—'}</td><td>${this.statusBadge(a.status)}<div class="cell-sub">V${a.version||1}${a.pendingVersion?' · V'+a.pendingVersion.version+' 审核中':''}</div></td><td class="num">${fmtK(a.imps||0)}</td><td class="num">${fmtK(a.clicks||0)}</td><td class="num">${ctr}</td><td class="cell-sub">${a.landing||'—'}</td><td><button class="btn btn-ghost btn-sm" onclick="App.openCreative('${a.id}')">${cp.mode==='cpd'?'查看 / 修改':'查看 / 编辑'}</button></td></tr>`}).join('')||`<tr><td colspan="8"><div class="empty">${svg(I.creative)}<div>当前广告组还没有广告创意</div>${cp.mode==='rtb'?`<button class="btn btn-primary btn-sm" onclick="App.openNewCreativeForGroup('${group.id}')">创建第一条创意</button>`:''}</div></td></tr>`}</tbody></table></div></div>`;
  },
  openNewCreativeForGroup(id){const group=(DB.adGroups||[]).find(g=>g.id===id);if(!group)return;this.curGroup=id;this.curCamp=group.camp;this.editRejectedId=null;this.go('newad');},
  openGroupEdit(id){const g=(DB.adGroups||[]).find(x=>x.id===id);if(!g)return;this.editGroupId=id;this.modal(`<div class="modal-head"><div><h3>编辑广告组</h3><p>${g.id} · 调整当前执行策略</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg('<path d="M18 6 6 18M6 6l12 12"/>')}</button></div><div class="modal-body"><div class="field"><label>广告组名称</label><input class="input" id="editGroupName" value="${g.name}"></div><div class="input-row"><div class="field"><label>竞价方式</label><select class="select" id="editGroupBidType"><option ${g.bidType==='CPM'?'selected':''}>CPM</option><option ${g.bidType==='CPC'?'selected':''}>CPC</option></select></div><div class="field"><label>手动出价</label><input class="input" id="editGroupBid" value="${g.bid||0}"></div></div><div class="field"><label>投放范围</label><select class="select" id="editGroupInventory"><option ${g.inventory==='全部兼容库存'?'selected':''}>全部兼容库存</option><option ${g.inventory==='指定 App'?'selected':''}>指定 App</option><option ${g.inventory==='指定广告位'?'selected':''}>指定广告位</option></select></div></div><div class="modal-foot"><button class="btn btn-ghost" onclick="App.closeModal()">取消</button><div class="spacer"></div><button class="btn btn-primary" onclick="App.saveGroupEdit()">保存修改</button></div>`,true);},
  saveGroupEdit(){const g=(DB.adGroups||[]).find(x=>x.id===this.editGroupId);if(!g)return;const old=g.name,name=document.getElementById('editGroupName').value.trim(),bid=Number(document.getElementById('editGroupBid').value||0);if(!name||!bid){this.toast('请填写广告组名称和出价','warn');return;}g.name=name;g.bidType=document.getElementById('editGroupBidType').value;g.bid=bid;g.inventory=document.getElementById('editGroupInventory').value;DB.creatives.filter(a=>a.groupId===g.id||a.group===old).forEach(a=>a.group=name);this.save();this.closeModal();this.go('groupdetail');this.toast('广告组已更新');},
  openGroupCreatives(group){
    const btn=document.querySelectorAll('#campaignTabs button')[3];
    this.switchCampaignTab(btn,'creatives');
    const select=document.getElementById('adGroupFilter'); if(select){ select.value=group; this.renderAds(); }
  },
  filterAd(btn, f){
    btn.parentNode.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active'); this.pages.ads=1; this.renderAds(f);
  },
  renderAds(f){
    if(f!==undefined) this.adFilter = f;
    f = this.adFilter || '';
    const kindEl = document.getElementById('adKindFilter');
    const searchEl = document.getElementById('adSearch');
    const groupEl = document.getElementById('adGroupFilter');
    const kindF = kindEl ? kindEl.value : '';
    const groupF = groupEl ? groupEl.value : '';
    const kw = searchEl ? searchEl.value.trim().toLowerCase() : '';
    const base = this.curCamp ? DB.creatives.filter(cr=>cr.camp===this.curCamp) : DB.creatives;
    const all = base
      .filter(a=>!f || a.status===f)
      .filter(a=>!kindF || a.kind===kindF)
      .filter(a=>!groupF || (a.group||'默认广告组')===groupF)
      .filter(a=>!kw || [a.name,a.id,a.group,a.landing].some(v=>(v||'').toLowerCase().includes(kw)));
    const list = this.pageSlice(all, 'ads');
    document.getElementById('adBody').innerHTML = list.map(a=>{
      const F = FMT[a.fmt]||{}, K = KIND[a.kind]||KIND.image;
      const cp = DB.campaigns.find(c=>c.id===a.camp)||{};
      const ctr = a.imps ? (a.clicks/a.imps*100).toFixed(2)+'%' : '—';
      return `<tr>
        <td><div class="cell-flex"><span class="row-ico" style="color:${F.color};width:42px;height:42px">${svg(F.ico)}</span><div><div class="cell-main"><a href="javascript:void(0)" onclick="App.openCreative('${a.id}')" style="color:var(--primary);text-decoration:none;cursor:pointer">${a.name}</a></div><div class="cell-sub">${a.id} · ${a.headline||'未填写文案'}</div></div></div></td>
        <td><div class="cell-main">${a.group||'默认广告组'}</div><div class="cell-sub">默认折叠，可按组筛选</div></td>
        <td class="cell-sub">${K.name}</td>
        <td>${this.statusBadge(a.status)}</td>
        <td class="num">${fmtK(a.imps)}</td>
        <td class="num">${fmtK(a.clicks)}</td>
        <td class="num">${ctr}</td>
        <td class="mono cell-sub">${a.size}</td>
        <td><div class="cell-sub" style="max-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.landing||'—'}</div></td>
        <td class="act"><div class="t-actions">
          ${cp.mode==='rtb'?`<button class="icon-btn btn-sm" title="${a.status==='active'?'暂停':'启用'}" onclick="App.toggleAd('${a.id}')">${svg(a.status==='active'?I.pause:I.play)}</button>`:''}
          <button class="icon-btn btn-sm" title="${cp.mode==='cpd'?'修改允许的创意内容':'编辑'}" onclick="App.openCreative('${a.id}')">${svg(I.edit)}</button>
        </div></td>
      </tr>`;
    }).join('') || `<tr><td colspan="10"><div class="empty">${svg(I.creative)}<div>该计划暂无广告创意</div></div></td></tr>`;
    document.getElementById('adsPager').innerHTML = this.pagerHTML('ads', all.length);
  },
  toggleAd(id){
    const a = DB.creatives.find(x=>x.id===id); if(!a) return;
    const cp = DB.campaigns.find(c=>c.id===a.camp)||{};
    if(cp.mode==='cpd'){ this.toast('CPD 创意启停由运营管理','info'); return; }
    if(a.status==='review'){ this.toast('审核中的创意暂不可操作','info'); return; }
    if(a.status==='rejected'){ this.toast('请修改创意后重新提交审核','warn'); return; }
    a.status = a.status==='active'?'paused':'active';
    this.save(); this.renderAds(this.adFilter||'');
    this.toast(a.status==='active'?'广告创意已启用':'广告创意已暂停');
  },
  openCreative(id){
    const a=DB.creatives.find(x=>x.id===id); if(!a) return;
    const cp=DB.campaigns.find(c=>c.id===a.camp)||{};
    if(cp.mode==='cpd'){ this.openCpdCreativeEdit(id); return; }
    if(a.status==='rejected'){ this.openRejectedEdit(id); return; }
    this.openRtbCreativeEdit(id);
  },
  openRtbCreativeEdit(id){const a=DB.creatives.find(x=>x.id===id);if(!a)return;this.editCreativeId=id;this.modal(`<div class="modal-head"><div><h3>编辑广告创意</h3><p>${a.id} · 修改后重新提交审核</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg('<path d="M18 6 6 18M6 6l12 12"/>')}</button></div><div class="modal-body"><div class="notice info" style="margin-bottom:14px">广告组、广告形式和素材规格保持不变；本次修改生成新的创意版本。</div><div class="field"><label>广告创意名称</label><input class="input" id="editCreativeName" value="${a.name}"></div><div class="field"><label>标题 / 文案</label><input class="input" id="editCreativeHeadline" value="${a.headline||''}"></div><div class="field"><label>目标链接</label><input class="input mono" id="editCreativeLanding" value="${a.landing||''}"></div></div><div class="modal-foot"><button class="btn btn-ghost" onclick="App.closeModal()">取消</button><div class="spacer"></div><button class="btn btn-primary" onclick="App.saveRtbCreativeEdit()">保存并重新提交审核</button></div>`,true);},
  saveRtbCreativeEdit(){const a=DB.creatives.find(x=>x.id===this.editCreativeId);if(!a)return;const name=document.getElementById('editCreativeName').value.trim(),landing=document.getElementById('editCreativeLanding').value.trim();if(!name||!landing){this.toast('请填写创意名称和目标链接','warn');return;}a.name=name;a.headline=document.getElementById('editCreativeHeadline').value.trim();a.landing=landing;a.version=(a.version||1)+1;a.status='review';this.save();this.closeModal();if(this.curGroup)this.go('groupdetail');else this.go('campdetail');this.toast('新创意版本已提交审核');},
  openCpdCreativeEdit(id){
    const a=DB.creatives.find(x=>x.id===id); if(!a) return;
    const cp=DB.campaigns.find(c=>c.id===a.camp)||{};
    this.cpdEditId=id;
    this.modal(`
      <div class="modal-head"><div><h3>修改 CPD 广告创意</h3><p>${a.id} · ${cp.name}</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg(I.x)}</button></div>
      <div class="modal-body">
        <div class="notice info" style="margin-bottom:16px">仅可修改图片素材、创意文案和落地页。广告位、价格、库存、投放周期与时段由运营管理。</div>
        <div class="input-row">
          <div class="field"><label>所属广告组</label><input class="input" value="${a.group||'默认广告组'}" readonly></div>
          <div class="field"><label>素材规格</label><input class="input" value="${a.size||'—'}" readonly></div>
        </div>
        <div class="field"><label>创意名称</label><input class="input" id="cpdCrName" maxlength="50" value="${a.name||''}"><div class="hint">最多 50 个字符</div></div>
        <div class="field"><label>标题 / 主文案</label><input class="input" id="cpdCrHeadline" maxlength="50" value="${a.headline||''}"><div class="hint">最多 50 个字符</div></div>
        <div class="field"><label>描述</label><textarea class="input" id="cpdCrDesc" maxlength="200" rows="3">${a.description||''}</textarea><div class="hint">最多 200 个字符</div></div>
        <div class="field"><label>创意图片或动图</label><input id="cpdCrFile" type="file" accept="image/png,image/jpeg,image/gif" hidden onchange="App.pickCpdCreativeFile(this)"><div class="upload-drop" onclick="document.getElementById('cpdCrFile').click()"><span class="row-ico" style="color:${(FMT[a.fmt]||{}).color}">${svg((FMT[a.fmt]||{}).ico)}</span><div><b>点击从本地选择替换素材</b><div class="cell-sub" id="cpdCrFileName">当前：${a.name} · ${a.size}</div><div class="cell-sub">支持 JPG / PNG / GIF；系统将校验尺寸、格式和文件大小</div></div></div></div>
        <div class="input-row"><div class="field"><label>跳转类型</label><select class="select" id="cpdCrJump"><option value="external" ${(a.jumpType||'external')==='external'?'selected':''}>外部跳转</option></select></div><div class="field"><label>跳转链接<span class="req">*</span></label><input class="input mono" id="cpdCrLanding" maxlength="500" value="${a.landing||''}" placeholder="https://example.com/landing"><div class="hint">最多 500 个字符</div></div></div>
        <div class="card" style="box-shadow:none"><div class="card-pad"><div class="cell-sub">以下信息仅供查看</div><div class="input-row" style="margin-top:10px"><div class="field" style="margin-bottom:0"><label>广告位</label><input class="input" value="${cp.placement||'—'}" readonly></div><div class="field" style="margin-bottom:0"><label>投放周期</label><input class="input" value="${cp.period||'—'}" readonly></div></div></div></div>
      </div>
      <div class="modal-foot"><button class="btn btn-ghost" onclick="App.closeModal()">取消</button><div class="spacer"></div><button class="btn btn-primary" onclick="App.submitCpdCreative()">${svg(I.upload)}提交变更审核</button></div>`,true);
  },
  pickCpdCreativeFile(input){
    const file=input?.files?.[0];if(!file)return;
    const label=document.getElementById('cpdCrFileName');if(label)label.textContent=`已选择：${file.name} · ${(file.size/1024).toFixed(0)} KB`;
    this.cpdPendingFile={name:file.name,size:file.size,type:file.type};
  },
  submitCpdCreative(){
    const a=DB.creatives.find(x=>x.id===this.cpdEditId); if(!a) return;
    const name=document.getElementById('cpdCrName')?.value.trim();
    const landing=document.getElementById('cpdCrLanding')?.value.trim();
    if(!name || !landing){ this.toast('请填写创意名称和落地页','warn'); return; }
    if(!/^https?:\/\//i.test(landing)){this.toast('跳转链接需以 http:// 或 https:// 开头','warn');return;}
    a.pendingVersion={
      version:(a.version||1)+1,
      name,
      headline:document.getElementById('cpdCrHeadline')?.value.trim(),
      description:document.getElementById('cpdCrDesc')?.value.trim(),
      jumpType:document.getElementById('cpdCrJump')?.value||'external',
      landing,
      asset:this.cpdPendingFile||null,
      status:'review',
      submittedAt:new Date().toISOString(),
    };
    a.changeStatus='review';
    this.cpdPendingFile=null;
    DB.auditLogs.unshift({id:'LOG-'+Date.now(),time:new Date().toLocaleString('zh-CN',{hour12:false}),actor:'演示用户',action:'提交 CPD 创意变更',target:`${a.id} · V${a.pendingVersion.version}`,result:'审核中'});
    this.save(); this.closeModal(); this.renderAds(this.adFilter||''); this.toast('创意变更已提交审核，当前生效版本保持不变');
  },
  openRejectedEdit(id){
    const a=DB.creatives.find(x=>x.id===id); if(!a || a.status!=='rejected') return;
    this.editRejectedId=id;
    this.curCamp=a.camp;
    this.go('newad');
  },
  previewCreative(id){
    const cr=DB.creatives.find(c=>c.id===id), F=FMT[cr.fmt]||{}, K=KIND[cr.kind]||KIND.image;
    this.modal(`
      <div class="modal-head"><div><h3>${cr.name}</h3><p>${cr.id} · ${F.name} · ${K.name} · ${cr.size}</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg('<path d="M18 6 6 18M6 6l12 12"/>')}</button></div>
      <div class="modal-body">
        <div style="height:300px;border-radius:14px;background:linear-gradient(135deg,${F.color}26,${F.color}08);display:grid;place-items:center;color:${F.color}">
          <div style="text-align:center"><div style="width:64px;height:64px;margin:0 auto">${svg(F.ico,1.4)}</div><div style="margin-top:10px;font-weight:600">${K.name}预览 · ${cr.size}</div></div>
        </div>
        <div class="grid cols-3" style="margin-top:16px;gap:10px">
          <div class="card card-pad" style="text-align:center"><div class="cell-sub">展示</div><b style="font-size:16px">${fmtK(cr.imps)}</b></div>
          <div class="card card-pad" style="text-align:center"><div class="cell-sub">点击</div><b style="font-size:16px">${fmtNum(cr.clicks)}</b></div>
          <div class="card card-pad" style="text-align:center"><div class="cell-sub">CTR</div><b style="font-size:16px;color:var(--accent-strong)">${cr.ctr}%</b></div>
        </div>
      </div>
      <div class="modal-foot"><button class="btn btn-ghost" onclick="App.closeModal()">关闭</button></div>`);
  },
  /* ============ 新建广告计划：第一层 ============ */
  view_newplan(){
    return this.view_unifiednew();
    /* legacy separated flow retained below for existing draft compatibility */
    return `
      <div class="page-head">
        <div><h1>新建 RTB 广告计划</h1><p>第一层只定义业务目标、投放周期和预算总边界</p></div>
        <div class="spacer"></div>
        <button class="btn btn-ghost" onclick="App.go('plans')">← 返回广告投放列表</button>
      </div>
      <div class="create-steps"><span class="active">1 广告计划</span><i>→</i><span>2 广告组</span><i>→</i><span>3 广告创意</span></div>
      <div class="addsite-layout"><div class="addsite-main">
        <div class="card" style="margin-bottom:16px"><div class="card-pad">
          <div class="form-section-title">基本信息</div>
          <div class="field"><label>计划名称<span class="req">*</span></label><input class="input" id="planName" placeholder="如：欧洲夏季拉新｜长期｜01"></div>
          <div class="field" style="margin-bottom:0"><label>广告目标<span class="req">*</span></label><div class="choice-grid" id="planObjective" style="grid-template-columns:repeat(4,1fr)">${[['awareness','品牌认知'],['traffic','流量访问'],['conversion','转化行动'],['app','应用推广']].map((x,i)=>`<label class="choice ${i===0?'sel':''}" data-value="${x[0]}" onclick="App.pickSingle(this)"><div class="c-body"><b>${x[1]}</b></div></label>`).join('')}</div></div>
        </div></div>
        <div class="card" style="margin-bottom:16px"><div class="card-pad">
          <div class="form-section-title">投放周期</div>
          <div class="pill-group" id="planDuration"><label class="radio-pill sel" data-value="fixed" onclick="App.pickPlanDuration(this)"><b>固定周期</b><small>从某日投放至某日</small></label><label class="radio-pill" data-value="ongoing" onclick="App.pickPlanDuration(this)"><b>长期投放</b><small>从某日开始持续投放</small></label></div>
          <div class="input-row" style="margin-top:14px"><div class="field"><label>开始日期<span class="req">*</span></label><input class="input" type="date" id="planStart" value="2026-08-12"></div><div class="field" id="planEndField"><label>结束日期<span class="req">*</span></label><input class="input" type="date" id="planEnd" value="2026-08-31"></div></div>
        </div></div>
        <div class="card"><div class="card-pad">
          <div class="form-section-title">Campaign 预算总控</div>
          <div id="planBudgetFixed"><div class="field"><label>活动总预算（USD）<span class="req">*</span></label><div class="inline-prefix"><span class="pfx">$</span><input class="input" id="planTotal" value="5000"></div><div class="hint">整个固定周期的硬上限。</div></div><div class="field" style="margin-bottom:0"><label>每日上限（选填）</label><div class="inline-prefix"><span class="pfx">$</span><input class="input" id="planDailyCap" placeholder="如：300"></div></div></div>
          <div id="planBudgetOngoing" style="display:none"><div class="field" style="margin-bottom:0"><label>每日预算（USD）<span class="req">*</span></label><div class="inline-prefix"><span class="pfx">$</span><input class="input" id="planDaily" value="150"></div><div class="hint">长期投放不要求总预算，每日额度按自然日重置。</div></div></div>
        </div></div>
        <div class="flex" style="gap:10px;margin-top:16px">
          <button class="btn btn-primary" onclick="App.submitPlan()">下一步${svg('<path d="M5 12h14M12 5l7 7-7 7"/>')}</button>
          <button class="btn btn-ghost" onclick="App.go('plans')">取消</button>
        </div>
      </div></div>`;
  },
  view_unifiednew(){
    const assets=DB.assetFiles.filter(f=>f.type==='image').slice(0,6);
    const advertiserName=this.profile()?.advertiserName||'T1演示广告主';
    return `<div class="page-head unified-head"><div><h1>新建 RTB 投放</h1><p>按广告计划、广告组和广告创意三个层级完成设置；提交前不会创建投放对象</p></div><div class="spacer"></div><button class="btn btn-ghost" onclick="App.cancelUnified()">取消创建</button></div>
    <div class="unified-create">
      <aside class="form-toc" id="unifiedToc">
        <div class="toc-title">创建进度</div>
        <button class="active" data-target="uf-campaign" onclick="App.jumpUnified('uf-campaign')"><span>01</span><div><b>广告计划</b><small>周期与预算</small></div></button>
        <button class="locked" data-target="uf-group" disabled><span>🔒</span><div><b>广告组</b><small>确认广告计划后解锁</small></div></button>
        <button class="locked" data-target="uf-creative" disabled><span>🔒</span><div><b>广告创意</b><small>确认广告组后解锁</small></div></button>
        <div class="toc-rule"></div>
        <button class="locked" data-target="uf-review" disabled><span>🔒</span><div><b>检查与发布</b><small>完成创意后解锁</small></div></button>
      </aside>
      <div class="unified-paper">
        <section class="paper-level" id="uf-campaign" data-level="01"><div class="level-heading"><span>01</span><div><h2>广告计划</h2><p>设置本次投放的周期、预算和计划名称</p></div><em>当前步骤</em></div>
          <div class="paper-block"><h3>投放周期与预算</h3><div class="pill-group" id="ufDuration"><label class="radio-pill sel" data-value="fixed" onclick="App.pickUfDuration(this)"><b>固定周期</b><small>总预算，可设每日上限</small></label><label class="radio-pill" data-value="ongoing" onclick="App.pickUfDuration(this)"><b>长期投放</b><small>只设置每日预算</small></label></div><div class="input-row" style="margin-top:14px"><div class="field"><label>开始日期<span class="req">*</span></label><input class="input" type="date" id="ufPlanStart" value="2026-08-12" onchange="App.updateUfPlanName()"></div><div class="field" id="ufPlanEndField"><label>结束日期<span class="req">*</span></label><input class="input" type="date" id="ufPlanEnd" value="2026-08-31" onchange="App.updateUfPlanName()"></div></div><div id="ufFixedBudget"><div class="input-row"><div class="field"><label>活动总预算（USD）<span class="req">*</span></label><input class="input" id="ufTotal" value="5000"></div><div class="field"><label>每日上限（选填）</label><input class="input" id="ufDailyCap" placeholder="如：300"></div></div></div><div id="ufOngoingBudget" style="display:none"><div class="field"><label>每日预算（USD）<span class="req">*</span></label><input class="input" id="ufDaily" value="150"></div></div></div>
          <div class="paper-block"><h3>计划名称</h3><div class="field"><label>命名方式</label><div class="pill-group compact-pill-group" id="ufNameMode"><label class="radio-pill sel" data-value="auto" onclick="App.pickUfNameMode(this)"><b>自动生成</b><small>随投放周期同步更新</small></label><label class="radio-pill" data-value="custom" onclick="App.pickUfNameMode(this)"><b>自定义名称</b><small>由你填写，周期变化不会影响</small></label></div></div><div class="field" style="margin-bottom:0"><label>计划名称<span class="req">*</span></label><input class="input" id="ufPlanName" data-advertiser="${advertiserName}" oninput="App.ufCustomPlanName=this.value" readonly><div class="hint" id="ufPlanNameHint">名称由广告主、周期类型、投放日期和顺序号自动生成。</div></div></div><div class="level-actions"><span>确认后继续设置广告组，数据将在最终提交时创建</span><button class="btn btn-primary" onclick="App.saveUfCampaign()">确认广告计划并继续 →</button></div>
        </section>
        <section class="paper-level stage-hidden" id="uf-group" data-level="02"><div class="level-heading"><span>02</span><div><h2>广告组</h2><p>设置出价、定向和可投放库存</p></div><em>当前步骤</em></div>
          <div class="paper-block"><h3>基本信息与继承设置</h3><div class="field"><label>广告组名称<span class="req">*</span></label><input class="input" id="ufGroupName" placeholder="如：信息流｜德国法国｜01"></div><div class="inherit-card"><div><span class="badge green">默认继承</span><b>沿用广告计划的周期、预算与均匀投放节奏</b><small id="ufInheritSummary">确认广告计划后自动带入，无需重复填写。</small></div><button class="btn btn-ghost btn-sm" onclick="App.toggleUfGroupAdvanced()">调整广告组设置</button></div><div id="ufGroupAdvanced" style="display:none"><div class="notice info" style="margin-top:14px">调整后广告组排期独立存储，不持续联动，但始终受 Campaign 硬边界限制。</div><div class="input-row" style="margin-top:14px"><div class="field"><label>开始日期</label><input class="input" type="date" id="ufGroupStart" value="2026-08-12"></div><div class="field"><label>结束日期</label><input class="input" type="date" id="ufGroupEnd" value="2026-08-31"></div></div><div class="input-row"><div class="field"><label id="ufGroupBudgetLabel">广告组分配预算（USD）<span class="req">*</span></label><input class="input" id="ufGroupBudget" value="5000"></div><div class="field"><label>广告组每日上限（选填）</label><input class="input" id="ufGroupCap"></div></div><div class="field" style="margin-bottom:0"><label>投放节奏</label><div class="pill-group" id="ufPace"><label class="radio-pill sel" data-value="even" onclick="App.pickRadio(this)"><b>均匀投放</b></label><label class="radio-pill" data-value="fast" onclick="App.pickRadio(this)"><b>加速投放</b></label></div></div></div></div>
          <div class="paper-block"><h3>竞价、定向与库存</h3><div class="input-row"><div class="field"><label>竞价方式</label><select class="select" id="ufBidType"><option value="CPM">按曝光竞价（CPM）</option><option value="CPC">按点击竞价（CPC）</option></select></div><div class="field"><label>手动出价（USD）<span class="req">*</span></label><input class="input" id="ufBid" value="2.40"></div></div><div class="input-row"><div class="field"><label>地域</label><select class="select" id="ufGeo"><option>不限</option><option>指定地区</option></select></div><div class="field"><label>设备</label><select class="select" id="ufDevice"><option>不限</option><option>Android</option><option>iOS</option><option>PC</option></select></div></div><div class="input-row"><div class="field"><label>广告形式<span class="req">*</span></label><select class="select" id="ufFormat" onchange="App.updateUfFormat()"><option value="splashimg">开屏</option><option value="feed" selected>信息流</option><option value="bbanner">横幅</option><option value="rect">矩形</option><option value="micon">图标</option><option value="text">文字</option></select></div><div class="field"><label>投放范围<span class="req">*</span></label><select class="select" id="ufInventory"><option>全部兼容库存</option><option>指定 App</option><option>指定广告位</option></select></div></div><div class="hint" id="ufFormatHint">库存与“信息流”联动；第三层只展示兼容素材。</div><div class="notice info" style="margin-top:14px">平台会在后台统一控制重复曝光，客户前台不开放频控阈值。</div></div><div class="level-actions"><span>确认后继续设置广告创意，数据将在最终提交时创建</span><button class="btn btn-primary" onclick="App.saveUfGroup()">确认广告组并继续 →</button></div>
        </section>
        <section class="paper-level stage-hidden" id="uf-creative" data-level="03"><div class="level-heading"><span>03</span><div><h2>广告创意</h2><p>选择素材，并设置文案和目标链接</p></div><em>当前步骤</em></div>
          <div class="paper-block"><h3>创意内容</h3><div class="field"><label>广告创意名称<span class="req">*</span></label><input class="input" id="ufCreativeName" placeholder="如：欧洲夏促信息流 A"></div><div class="field"><label>主素材<span class="req">*</span></label><div class="flex between" style="margin-bottom:8px"><span class="cell-sub">仅显示符合当前广告组规格的素材</span><button class="btn btn-ghost btn-sm" onclick="App.openUfUpload()">${svg(I.upload)}上传新素材</button></div><div class="asset-grid" id="ufAssets">${assets.map((f,i)=>`<div class="asset-cell ${i===0?'picked':''}" data-id="${f.id}" onclick="App.pickCompatibleAsset(this)"><div class="asset-thumb" style="height:64px">${svg(I.image)}</div><div class="asset-meta"><div class="asset-name">${f.name}</div><div class="asset-sub">${f.dim} · ${f.size}</div></div></div>`).join('')}</div></div><div class="field"><label>标题 / 文案</label><input class="input" id="ufHeadline" maxlength="50" placeholder="是否必填由广告形式决定"></div><div class="input-row"><div class="field"><label>跳转类型</label><select class="select" id="ufJump"><option>外部跳转</option></select></div><div class="field"><label>目标链接<span class="req">*</span></label><input class="input mono" id="ufLanding" placeholder="https://example.com/landing"></div></div></div><div class="level-actions"><span>确认后检查全部设置，数据将在最终提交时创建</span><button class="btn btn-primary" onclick="App.saveUfCreative()">确认广告创意并检查 →</button></div>
        </section>
        <section class="paper-level review-level stage-hidden" id="uf-review" data-level="04"><div class="level-heading"><span>✓</span><div><h2>检查并提交</h2><p>确认三个层级的设置后提交创意审核</p></div></div><div class="review-chain"><b>广告计划</b><i>→</i><b>广告组</b><i>→</i><b>广告创意</b></div><div class="notice info">系统将检查：广告组的周期和预算不得超出广告计划；库存必须兼容广告形式；素材必须符合广告组规格。</div><div class="level-actions"><span>提交后将一次性创建三层对象，广告创意进入审核</span><button class="btn btn-primary" onclick="App.submitUnified()">${svg(I.check)}创建投放并提交审核</button></div></section>
      </div>
    </div>`;
  },
  after_newplan(){
    const actionLabels=[
      ['App.saveUfCampaign()','确认广告计划并设置广告组'],
      ['App.saveUfGroup()','确认广告组并设置广告创意'],
      ['App.saveUfCreative()','确认广告创意并检查设置'],
      ['App.submitUnified()','创建投放并提交审核'],
    ];
    actionLabels.forEach(([action,label])=>{const button=document.querySelector(`.unified-paper button[onclick="${action}"]`);if(button)button.textContent=label;});
    this.ufObserver?.disconnect?.();
    const sections=document.querySelectorAll('.paper-level');
    this.ufObserver=new IntersectionObserver(entries=>{
      /* 从已有计划新增广告组时，当前步骤由流程状态决定，不能被首屏中仍可见的计划摘要覆盖。 */
      if(this.resumeCampId&&!document.getElementById('uf-group')?.classList.contains('completed')){
        this.setUfActiveStep('uf-group');
        return;
      }
      const visible=entries.filter(e=>e.isIntersecting&&!e.target.classList.contains('completed')&&!e.target.classList.contains('stage-hidden')).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(visible)this.setUfActiveStep(visible.target.id);
    },{rootMargin:'-120px 0px -45% 0px',threshold:[0,.2,.5]});
    sections.forEach(s=>this.ufObserver.observe(s));
    this.ufCustomPlanName='';
    this.updateUfPlanName();
    if(this.resumeCampId) this.initExistingPlanGroupFlow();
  },
  startNewGroup(campaignId){
    this.resumeCampId=campaignId;
    this.curCamp=campaignId;
    this.go('newplan');
  },
  cancelUnified(){
    const returnToCampaign=Boolean(this.resumeCampId);
    this.ufWorking=null;
    this.resumeCampId=null;
    this.go(returnToCampaign?'campdetail':'plans');
  },
  initExistingPlanGroupFlow(){
    const cp=DB.campaigns.find(c=>c.id===this.resumeCampId);
    if(!cp){this.resumeCampId=null;this.toast('未找到广告计划','warn');return;}
    const duration=cp.duration==='ongoing'?'ongoing':'fixed';
    document.querySelectorAll('#ufDuration .radio-pill').forEach(el=>el.classList.toggle('sel',el.dataset.value===duration));
    document.getElementById('ufPlanStart').value=cp.start||'';
    document.getElementById('ufPlanEnd').value=cp.end||'';
    document.getElementById('ufPlanName').value=cp.name||'';
    document.getElementById('ufTotal').value=cp.totalBudget||cp.budget||0;
    document.getElementById('ufDaily').value=cp.dailyBudget||cp.budget||0;
    document.getElementById('ufDailyCap').value=cp.dailyCap||'';
    document.getElementById('ufPlanEndField').style.display=duration==='ongoing'?'none':'';
    document.getElementById('ufFixedBudget').style.display=duration==='ongoing'?'none':'';
    document.getElementById('ufOngoingBudget').style.display=duration==='ongoing'?'':'none';
    const working={name:cp.name,duration,start:cp.start||'',end:cp.end||'',period:cp.period||(duration==='ongoing'?'长期投放':`${cp.start} 至 ${cp.end}`),budget:cp.budget,totalBudget:cp.totalBudget||cp.budget,dailyBudget:cp.dailyBudget||cp.budget,dailyCap:cp.dailyCap||0};
    this.ufWorking={campaign:working,existingCampaignId:cp.id};
    document.getElementById('ufGroupStart').value=working.start;
    document.getElementById('ufGroupEnd').value=working.end;
    document.getElementById('ufGroupBudget').value=duration==='ongoing'?working.dailyBudget:working.totalBudget;
    const inherit=document.getElementById('ufInheritSummary');if(inherit)inherit.textContent=`${working.period} · ${duration==='ongoing'?fmtMoney(working.dailyBudget)+'/日':fmtMoney(working.totalBudget)} · 均匀投放`;
    this.completeUfLevel('uf-campaign',`${cp.name} · 已有广告计划`);
    document.querySelector('#uf-campaign .level-summary button')?.remove();
    this.unlockUf('uf-group',2);
    const title=document.querySelector('.unified-head h1'),desc=document.querySelector('.unified-head p');
    if(title)title.textContent='新建广告组';
    if(desc)desc.textContent=`在广告计划「${cp.name}」下新增广告组，并继续设置广告创意`;
    this.setUfActiveStep('uf-group');
    requestAnimationFrame(()=>this.setUfActiveStep('uf-group'));
  },
  setUfActiveStep(target){
    document.querySelectorAll('#unifiedToc button').forEach(btn=>btn.classList.toggle('active',btn.dataset.target===target));
  },
  jumpUnified(id){ document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}); },
  ufPlanNameMode(){ return document.querySelector('#ufNameMode .sel')?.dataset?.value||'auto'; },
  formatUfPlanDate(value){ const p=(value||'').split('-');return p.length===3?`${p[1]}.${p[2]}`:'待定'; },
  generatedUfPlanName(){
    const input=document.getElementById('ufPlanName'),advertiser=input?.dataset?.advertiser||'广告主',duration=(document.querySelector('#ufDuration .sel')||{}).dataset?.value||'fixed',start=this.formatUfPlanDate(document.getElementById('ufPlanStart')?.value),end=this.formatUfPlanDate(document.getElementById('ufPlanEnd')?.value);
    const base=duration==='ongoing'?`${advertiser}｜长期投放｜${start}`:`${advertiser}｜固定周期｜${start}–${end}`;
    const seq=String(DB.campaigns.filter(c=>(c.name||'').startsWith(base+'｜')).length+1).padStart(2,'0');
    return `${base}｜${seq}`;
  },
  updateUfPlanName(){
    const input=document.getElementById('ufPlanName');if(!input||this.ufPlanNameMode()!=='auto')return;
    input.value=this.generatedUfPlanName();input.readOnly=true;
  },
  pickUfNameMode(el){
    const input=document.getElementById('ufPlanName'),current=this.ufPlanNameMode();if(!input)return;
    if(current==='custom')this.ufCustomPlanName=input.value;
    this.pickRadio(el);const custom=el.dataset.value==='custom';input.readOnly=!custom;
    const hint=document.getElementById('ufPlanNameHint');
    if(custom){input.value=this.ufCustomPlanName||'';input.placeholder='请输入便于识别的计划名称';if(hint)hint.textContent='自定义名称不会随投放周期变化。';setTimeout(()=>input.focus(),0);}
    else{this.updateUfPlanName();if(hint)hint.textContent='名称由广告主、周期类型、投放日期和顺序号自动生成。';}
  },
  pickUfDuration(el){
    this.pickRadio(el); const ongoing=el.dataset.value==='ongoing';
    document.getElementById('ufPlanEndField').style.display=ongoing?'none':''; document.getElementById('ufFixedBudget').style.display=ongoing?'none':''; document.getElementById('ufOngoingBudget').style.display=ongoing?'':'none';
    const start=document.getElementById('ufPlanStart').value, end=ongoing?'':document.getElementById('ufPlanEnd').value;
    document.getElementById('ufGroupStart').value=start; document.getElementById('ufGroupEnd').value=end;
    document.getElementById('ufGroupBudgetLabel').innerHTML=`${ongoing?'广告组每日预算':'广告组分配预算'}（USD）<span class="req">*</span>`; document.getElementById('ufGroupBudget').value=ongoing?document.getElementById('ufDaily').value:document.getElementById('ufTotal').value;
    this.updateUfPlanName();
  },
  updateUfFormat(){ const s=document.getElementById('ufFormat'),h=document.getElementById('ufFormatHint'); if(s&&h)h.textContent=`库存与“${s.options[s.selectedIndex].text}”联动；第三层只展示兼容素材。`; },
  toggleUfGroupAdvanced(){
    const box=document.getElementById('ufGroupAdvanced'); if(!box)return;
    const open=box.style.display==='none'; box.style.display=open?'block':'none';
    this.toast(open?'已展开广告组独立设置':'已恢复使用广告计划设置');
  },
  openUfUpload(){
    const fmt=document.getElementById('ufFormat'),formatName=fmt?fmt.options[fmt.selectedIndex].text:'当前广告形式';
    this.modal(`<div class="modal-head"><div><h3>上传新素材</h3><p>上传成功后自动返回当前广告创意</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg('<path d="M18 6 6 18M6 6l12 12"/>')}</button></div><div class="modal-body"><div class="notice info" style="margin-bottom:14px">当前广告形式：<b>${formatName}</b>。系统会校验尺寸、比例、格式和文件大小。</div><div class="upload-drop" style="min-height:150px" onclick="App.toast('已选择文件 summer_feed_700x300.png')"><span class="up-ico">${svg(I.upload)}</span><div><b>点击选择或拖拽图片到这里</b><div class="cell-sub">支持 JPG / PNG / GIF，单文件不超过 10 MB</div><div class="cell-sub">推荐规格：700×300、512×512、720×150</div></div></div><div class="input-row" style="margin-top:14px"><div class="field"><label>素材名称</label><input class="input" id="ufUploadName" value="summer_feed_700x300.png"></div><div class="field"><label>保存到文件夹</label><select class="select"><option>素材库 / 原生素材</option><option>素材库 / 横幅素材</option></select></div></div><label class="flex" style="gap:8px"><input type="checkbox" checked> 上传完成后自动选中该素材</label></div><div class="modal-foot"><button class="btn btn-ghost" onclick="App.closeModal()">取消</button><div class="spacer"></div><button class="btn btn-primary" onclick="App.finishUfUpload()">${svg(I.upload)}开始上传</button></div>`,true);
  },
  finishUfUpload(){
    const id='F-'+(DB.assetFiles.length+1),name=document.getElementById('ufUploadName')?.value.trim()||'new_material.png';
    DB.assetFiles.push({id,folder:'native',name,type:'image',size:'128 KB',dim:'700×300',updated:'2026-08-11',impressions:0,ctr:0,createdAt:'2026-08-11'});this.save();this.closeModal();
    const grid=document.getElementById('ufAssets');if(grid){grid.querySelectorAll('.asset-cell').forEach(x=>x.classList.remove('picked'));grid.insertAdjacentHTML('afterbegin',`<div class="asset-cell picked" data-id="${id}" onclick="App.pickCompatibleAsset(this)"><div class="asset-thumb" style="height:64px">${svg(I.image)}</div><div class="asset-meta"><div class="asset-name">${name}</div><div class="asset-sub">700×300 · 128 KB</div></div></div>`);}this.toast('素材上传成功，已自动选中');
  },
  ufVal(id){ return document.getElementById(id)?.value?.trim()||''; },
  unlockUf(target, tocIndex, status){
    const section=document.getElementById(target); section.classList.remove('stage-hidden'); section.classList.add('stage-reveal');
    const btn=document.querySelector(`#unifiedToc button[data-target="${target}"]`); btn.disabled=false; btn.classList.remove('locked'); btn.onclick=()=>this.jumpUnified(target); btn.querySelector('span').textContent=String(tocIndex).padStart(2,'0');
    document.querySelectorAll('#unifiedToc button').forEach(item=>item.classList.toggle('active',item===btn));
    setTimeout(()=>section.scrollIntoView({behavior:'smooth',block:'start'}),180);
  },
  completeUfLevel(target, summary){
    const section=document.getElementById(target); section.classList.add('completed');
    let el=section.querySelector('.level-summary'); if(!el){el=document.createElement('div');el.className='level-summary';section.appendChild(el);} el.innerHTML=`<div><span class="badge green">已确认</span><b>${summary}</b></div><button class="btn btn-ghost btn-sm" onclick="App.editUfLevel('${target}')">编辑</button>`;
    const btn=document.querySelector(`#unifiedToc button[data-target="${target}"]`); btn.classList.add('done'); btn.classList.remove('active'); btn.querySelector('span').textContent='✓';
  },
  editUfLevel(target){ document.getElementById(target)?.classList.remove('completed'); this.jumpUnified(target); },
  saveUfCampaign(){
    const duration=(document.querySelector('#ufDuration .sel')||{}).dataset?.value||'fixed', name=this.ufVal('ufPlanName'),start=this.ufVal('ufPlanStart'),end=this.ufVal('ufPlanEnd'),total=Number(this.ufVal('ufTotal')||0),daily=Number(this.ufVal('ufDaily')||0);
    if(!name||!start||(duration==='fixed'&&(!end||!total))||(duration==='ongoing'&&!daily)){this.toast('请完整填写广告计划必填项','warn');return;}
    const cp={name,duration,start,end:duration==='fixed'?end:'',period:duration==='fixed'?`${start} 至 ${end}`:'长期投放',budget:duration==='fixed'?total:daily,totalBudget:total,dailyBudget:daily,dailyCap:Number(this.ufVal('ufDailyCap')||0)};
    this.ufWorking={campaign:cp};
    document.getElementById('ufGroupStart').value=start; document.getElementById('ufGroupEnd').value=duration==='fixed'?end:''; document.getElementById('ufGroupBudget').value=duration==='fixed'?total:daily; const inherit=document.getElementById('ufInheritSummary');if(inherit)inherit.textContent=`${cp.period} · ${duration==='fixed'?fmtMoney(total):fmtMoney(daily)+'/日'} · 均匀投放`;
    this.completeUfLevel('uf-campaign',`${name} · ${cp.period} · ${duration==='fixed'?fmtMoney(total):fmtMoney(daily)+'/日'}`); this.unlockUf('uf-group',2); this.toast('广告计划设置已确认');
  },
  saveUfGroup(){
    const cp=this.ufWorking?.campaign;if(!cp){this.toast('请先确认广告计划','warn');return;} const name=this.ufVal('ufGroupName'),budget=Number(this.ufVal('ufGroupBudget')||0),bid=Number(this.ufVal('ufBid')||0); if(!name||!budget||!bid){this.toast('请填写广告组名称、预算和出价','warn');return;} if(budget>(cp.duration==='fixed'?cp.totalBudget:cp.dailyBudget)){this.toast('广告组预算不能超过广告计划预算','warn');return;}
    const group={name,start:this.ufVal('ufGroupStart'),end:this.ufVal('ufGroupEnd'),pace:(document.querySelector('#ufPace .sel')||{}).dataset?.value||'even',budget,dailyCap:Number(this.ufVal('ufGroupCap')||0),bidType:this.ufVal('ufBidType'),bid,geo:this.ufVal('ufGeo'),device:this.ufVal('ufDevice'),format:this.ufVal('ufFormat'),inventory:this.ufVal('ufInventory')};
    this.ufWorking.group=group;
    this.completeUfLevel('uf-group',`${name} · ${group.bidType} ${fmtMoney(bid)} · ${fmtMoney(budget)}`);this.unlockUf('uf-creative',3);this.toast('广告组设置已确认');
  },
  saveUfCreative(){
    const group=this.ufWorking?.group;if(!group){this.toast('请先确认广告组','warn');return;}const name=this.ufVal('ufCreativeName'),landing=this.ufVal('ufLanding'),assetEl=document.querySelector('#ufAssets .picked');if(!name||!landing||!assetEl){this.toast('请填写创意名称、选择素材并填写目标链接','warn');return;}const file=DB.assetFiles.find(f=>f.id===assetEl.dataset.id)||{};
    this.ufWorking.creative={name,assetId:file.id,headline:this.ufVal('ufHeadline'),landing};
    this.completeUfLevel('uf-creative',`${name} · ${file.name||'主素材'} · ${landing}`);this.unlockUf('uf-review',4);this.toast('广告创意设置已确认');
  },
  submitUnified(){
    const val=id=>document.getElementById(id)?.value?.trim()||'', duration=(document.querySelector('#ufDuration .sel')||{}).dataset?.value||'fixed';
    const required=[['ufPlanName','计划名称'],['ufPlanStart','开始日期'],['ufGroupName','广告组名称'],['ufGroupBudget','广告组预算'],['ufBid','手动出价'],['ufCreativeName','广告创意名称'],['ufLanding','目标链接']]; if(duration==='fixed')required.push(['ufPlanEnd','结束日期'],['ufTotal','活动总预算']); else required.push(['ufDaily','每日预算']);
    const missing=required.filter(x=>!val(x[0])); if(missing.length){ this.toast(`请填写：${missing.map(x=>x[1]).join('、')}`,'warn'); this.jumpUnified(missing[0][0].startsWith('ufPlan')||missing[0][0]==='ufTotal'||missing[0][0]==='ufDaily'?'uf-campaign':missing[0][0].startsWith('ufGroup')||missing[0][0]==='ufBid'?'uf-group':'uf-creative'); return; }
    const total=Number(val('ufTotal')||0),daily=Number(val('ufDaily')||0),groupBudget=Number(val('ufGroupBudget')||0); if(duration==='fixed'&&groupBudget>total){this.toast('广告组分配预算不能超过 Campaign 总预算','warn');this.jumpUnified('uf-group');return;} if(duration==='ongoing'&&groupBudget>daily){this.toast('广告组每日预算不能超过 Campaign 每日预算','warn');this.jumpUnified('uf-group');return;}
    const existingCampaignId=this.ufWorking?.existingCampaignId||null;
    const cid=existingCampaignId||'C-'+(50330+DB.campaigns.length),gid='G-'+(8020+(DB.adGroups||[]).length),crid='CR-'+(9040+DB.creatives.length),format=val('ufFormat'),assetEl=document.querySelector('#ufAssets .picked'),file=DB.assetFiles.find(f=>f.id===assetEl?.dataset.id)||{};
    const cp={id:cid,name:val('ufPlanName'),alias:val('ufPlanName'),mode:'rtb',objective:'traffic',duration,start:val('ufPlanStart'),end:duration==='fixed'?val('ufPlanEnd'):'',period:duration==='fixed'?`${val('ufPlanStart')} 至 ${val('ufPlanEnd')}`:'长期投放',placement:val('ufInventory'),fmt:format,model:val('ufBidType'),bid:Number(val('ufBid')),status:'active',spend:0,imps:0,clicks:0,conv:0,geo:['🌍 全球'],inv:['app'],budget:duration==='fixed'?total:daily,totalBudget:total,dailyBudget:daily,dailyCap:Number(val('ufDailyCap')||0)};
    const group={id:gid,camp:cid,name:val('ufGroupName'),start:val('ufGroupStart'),end:val('ufGroupEnd'),pace:(document.querySelector('#ufPace .sel')||{}).dataset?.value||'even',budget:groupBudget,dailyCap:Number(val('ufGroupCap')||0),bidType:val('ufBidType'),bid:Number(val('ufBid')),geo:val('ufGeo'),device:val('ufDevice'),format,inventory:val('ufInventory'),status:'active'};
    const cr={id:crid,name:val('ufCreativeName'),group:group.name,groupId:gid,assetId:file.id,fmt:format,kind:file.type||'image',size:file.dim||'—',camp:cid,headline:val('ufHeadline'),landing:val('ufLanding'),imps:0,clicks:0,ctr:0,status:'review',version:1,created:'2026-08-11'};
    if(!existingCampaignId)DB.campaigns.unshift(cp); DB.adGroups=DB.adGroups||[]; DB.adGroups.unshift(group); DB.creatives.unshift(cr); DB.auditLogs.unshift({id:'LOG-'+Date.now(),time:new Date().toLocaleString('zh-CN',{hour12:false}),actor:'演示用户',action:existingCampaignId?'新增广告组并提交创意审核':'创建 RTB 投放并提交审核',target:cid,result:'成功'}); this.ufWorking=null; this.resumeCampId=null; this.save(); this.curCamp=cid; this.openPlan(cid); this.toast(existingCampaignId?'广告组已创建，广告创意已提交审核':'三层对象已创建，广告创意已提交审核');
  },
  submitPlan(){
    const planName = document.getElementById('planName');
    if(!this.validateRequired([[planName,'计划名称']])) return;
    const name = planName.value.trim();
    const duration=(document.querySelector('#planDuration .sel')||{}).dataset?.value||'fixed';
    const start=document.getElementById('planStart').value, end=duration==='fixed'?document.getElementById('planEnd').value:'';
    const total=Number(document.getElementById('planTotal')?.value||0), daily=Number(document.getElementById('planDaily')?.value||0), dailyCap=Number(document.getElementById('planDailyCap')?.value||0);
    if(!start || (duration==='fixed'&&!end)){ this.toast('请完整填写投放周期','warn'); return; }
    if((duration==='fixed'&&!total)||(duration==='ongoing'&&!daily)){ this.toast('请填写对应的预算','warn'); return; }
    const id = 'C-'+(50330+DB.campaigns.length);
    const objective=(document.querySelector('#planObjective .sel')||{}).dataset?.value||'awareness';
    DB.campaigns.unshift({id,name,alias:name,mode:'rtb',objective,duration,start,end,period:duration==='fixed'?`${start} 至 ${end}`:'长期投放',placement:'待配置广告组',fmt:'feed',model:'CPM',bid:0,status:'draft',spend:0,imps:0,clicks:0,conv:0,geo:['🌍 全球'],inv:['app'],budget:duration==='fixed'?total:daily,totalBudget:total,dailyBudget:daily,dailyCap});
    this.save(); this.curCamp=id; this.go('newgroup');
    this.toast('广告计划已保存，继续设置广告组');
  },

  pickSingle(el){ el.parentNode.querySelectorAll('.choice').forEach(x=>x.classList.remove('sel')); el.classList.add('sel'); },
  pickPlanDuration(el){
    el.parentNode.querySelectorAll('.radio-pill').forEach(x=>x.classList.remove('sel')); el.classList.add('sel');
    const ongoing=el.dataset.value==='ongoing';
    document.getElementById('planEndField').style.display=ongoing?'none':'';
    document.getElementById('planBudgetFixed').style.display=ongoing?'none':'';
    document.getElementById('planBudgetOngoing').style.display=ongoing?'':'none';
  },

  /* ============ 新建广告组：第二层 ============ */
  view_newgroup(){
    const cp=DB.campaigns.find(c=>c.id===this.curCamp)||{};
    const ongoing=cp.duration==='ongoing';
    return `<div class="page-head"><div><h1>新建广告组</h1><p>${cp.name||'—'} · 第二层执行策略</p></div><div class="spacer"></div><button class="btn btn-ghost" onclick="App.go('newplan')">← 返回广告计划</button></div>
    <div class="create-steps"><span class="done">✓ 广告计划</span><i>→</i><span class="active">2 广告组</span><i>→</i><span>3 广告创意</span></div>
    <div class="addsite-layout"><div class="addsite-main">
      <div class="card" style="margin-bottom:16px"><div class="card-pad"><div class="form-section-title">基础与排期</div>
        <div class="field"><label>广告组名称<span class="req">*</span></label><input class="input" id="groupName" placeholder="如：信息流｜德国法国｜01"></div>
        <div class="notice info">已默认复制广告计划周期。保存后广告组排期独立存储，不随 Campaign 持续联动，但不得超出父级边界。</div>
        <div class="input-row" style="margin-top:14px"><div class="field"><label>开始日期</label><input class="input" type="date" id="groupStart" value="${cp.start||'2026-08-12'}"></div><div class="field"><label>结束日期</label><input class="input" type="date" id="groupEnd" value="${cp.end||''}" ${ongoing?'placeholder="长期投放，可留空"':''}></div></div>
        <div class="field" style="margin-bottom:0"><label>投放节奏</label><div class="pill-group" id="groupPace"><label class="radio-pill sel" data-value="even" onclick="App.pickRadio(this)"><b>均匀投放</b></label><label class="radio-pill" data-value="fast" onclick="App.pickRadio(this)"><b>加速投放</b></label></div></div>
      </div></div>
      <div class="card" style="margin-bottom:16px"><div class="card-pad"><div class="form-section-title">手动预算分配与出价</div>
        <div class="notice">Campaign 可用边界：${ongoing?`每日预算 ${fmtMoney(cp.dailyBudget||cp.budget||0)}`:`总预算 ${fmtMoney(cp.totalBudget||cp.budget||0)}`}</div>
        <div class="input-row" style="margin-top:14px"><div class="field"><label>${ongoing?'广告组每日预算':'广告组分配预算'}（USD）<span class="req">*</span></label><input class="input" id="groupBudget" value="${ongoing?(cp.dailyBudget||150):(cp.totalBudget||5000)}"></div><div class="field"><label>每日上限（选填）</label><input class="input" id="groupDailyCap" placeholder="固定周期可设置"></div></div>
        <div class="input-row"><div class="field"><label>竞价方式</label><select class="select" id="groupBidType"><option value="CPM">按曝光竞价（CPM）</option><option value="CPC">按点击竞价（CPC）</option></select></div><div class="field"><label>手动出价（USD）<span class="req">*</span></label><input class="input" id="groupBid" value="2.40"></div></div>
      </div></div>
      <div class="card" style="margin-bottom:16px"><div class="card-pad"><div class="form-section-title">定向、广告形式与库存</div>
        <div class="input-row"><div class="field"><label>地域</label><select class="select" id="groupGeo"><option>不限</option><option>指定地区</option></select></div><div class="field"><label>设备</label><select class="select" id="groupDevice"><option>不限</option><option>Android</option><option>iOS</option><option>PC</option></select></div></div>
        <div class="field"><label>广告形式<span class="req">*</span></label><select class="select" id="groupFormat" onchange="App.updateInventoryHint()"><option value="splashimg">开屏</option><option value="feed" selected>信息流</option><option value="bbanner">横幅</option><option value="rect">矩形</option><option value="micon">图标</option><option value="text">文字</option></select></div>
        <div class="field" style="margin-bottom:0"><label>投放范围<span class="req">*</span></label><select class="select" id="groupInventory"><option>全部兼容库存</option><option>指定 App</option><option>指定广告位</option></select><div class="hint" id="inventoryHint">仅展示与“信息流”兼容的 App 和广告位；该选择会约束第三层素材规格。</div></div>
        <div class="notice info" style="margin-top:14px">频控由平台后台统一控制，客户前台不开放具体阈值。</div>
      </div></div>
      <div class="flex" style="gap:10px"><button class="btn btn-primary" onclick="App.submitGroup()">保存并添加广告创意 →</button><button class="btn btn-ghost" onclick="App.go('campdetail')">稍后继续</button></div>
    </div></div>`;
  },
  pickRadio(el){ el.parentNode.querySelectorAll('.radio-pill').forEach(x=>x.classList.remove('sel')); el.classList.add('sel'); },
  updateInventoryHint(){ const s=document.getElementById('groupFormat'); const h=document.getElementById('inventoryHint'); if(s&&h) h.textContent=`仅展示与“${s.options[s.selectedIndex].text}”兼容的 App 和广告位；该选择会约束第三层素材规格。`; },
  submitGroup(){
    const cp=DB.campaigns.find(c=>c.id===this.curCamp); if(!cp)return;
    const name=document.getElementById('groupName').value.trim(), budget=Number(document.getElementById('groupBudget').value), bid=Number(document.getElementById('groupBid').value);
    if(!name||!budget||!bid){ this.toast('请填写广告组名称、预算和出价','warn'); return; }
    const id='G-'+(8020+(DB.adGroups||[]).length);
    const group={id,camp:cp.id,name,start:document.getElementById('groupStart').value,end:document.getElementById('groupEnd').value,pace:(document.querySelector('#groupPace .sel')||{}).dataset?.value||'even',budget,dailyCap:Number(document.getElementById('groupDailyCap').value||0),bidType:document.getElementById('groupBidType').value,bid,geo:document.getElementById('groupGeo').value,device:document.getElementById('groupDevice').value,format:document.getElementById('groupFormat').value,inventory:document.getElementById('groupInventory').value,status:'draft'};
    DB.adGroups=DB.adGroups||[]; DB.adGroups.unshift(group); this.curGroup=id; cp.placement=group.inventory; cp.fmt=group.format; cp.model=group.bidType; cp.bid=group.bid; this.save(); this.go('newad'); this.toast('广告组已保存，继续添加广告创意');
  },

  /* ============ 新建广告创意：第三层 ============ */
  openNewAd(){ this.editRejectedId=null; this.go('newad'); },
  after_newad(){
    const edit=DB.creatives.find(c=>c.id===this.editRejectedId && c.status==='rejected');
    this.adGeo = edit && Array.isArray(edit.geo) && edit.geo[0]!=='ALL' ? edit.geo.slice() : [];
    this.adAud = edit && Array.isArray(edit.audience) && edit.audience[0]!=='ALL' ? edit.audience.slice() : [];
    this.adSource = edit?.source || 'all';
    this.adMat = edit?.material || 'upload';
    this.adLibPick = edit?.assetId || null;
    this.newAdFmt = edit?.fmt || 'pop';
    this.filterAdGeoOptions();
    this.filterAdAudOptions();
    this.renderAdGeoChips();
    this.renderAdAudChips();
    this.renderAdScopePicker();
    this.renderAdFmtGrid();
    this.renderAdMatBody();
  },
  view_newad(){
    const edit=DB.creatives.find(c=>c.id===this.editRejectedId && c.status==='rejected');
    if(this.curGroup && !edit) return this.view_newcreative_v1();
    const scopes = [['all','全部'],['all_web','Web'],['all_h5','H5'],['all_app2','APP'],['spec_app','指定应用']];
    const selectedCamp=edit?.camp||this.curCamp;
    const selectedScope=edit?.source||'all';
    const campOpts = DB.campaigns.map(c=>`<option value="${c.id}" ${c.id===selectedCamp?'selected':''}>${c.name}</option>`).join('')||'<option value="">（请先创建广告计划）</option>';
    return `
      <div class="page-head">
        <div><h1>${edit?'编辑广告创意':'新建广告创意'}</h1><p>${edit?`${edit.id} · 修改驳回内容后重新提交审核`:'配置投放、定向与素材'}</p></div>
        <div class="spacer"></div>
        <button class="btn btn-ghost" onclick="App.go('campdetail')">← 返回计划详情</button>
      </div>
      <div class="addsite-layout"><div class="addsite-main">
        <div class="card" style="margin-bottom:16px"><div class="card-pad">
          <div class="form-section-title" style="margin-bottom:14px">基本信息</div>
          <div class="input-row">
            <div class="field" style="margin-bottom:0"><label>广告创意名称<span class="req">*</span></label><input class="input" id="adName" placeholder="如：夏促主图" value="${edit?.name||''}"></div>
            <div class="field" style="margin-bottom:0"><label>所属广告计划<span class="req">*</span></label><select class="select" id="adCampaign">${campOpts}</select></div>
          </div>
          <div class="field" style="margin-top:14px"><label>投放范围<span class="req">*</span></label>
            <div class="choice-grid" style="grid-template-columns:repeat(5,1fr)" id="adScopeGrid">
              ${scopes.map(s=>`<label class="choice ${selectedScope===s[0]?'sel':''}" data-scope="${s[0]}" onclick="App.pickAdScope(this)"><div class="c-body"><b>${s[1]}</b></div></label>`).join('')}
            </div>
            <div id="adScopePicker" style="margin-top:12px"></div>
          </div>
          <div class="field" style="margin-bottom:0"><label>广告格式<span class="req">*</span></label>
            <div class="choice-grid" style="grid-template-columns:repeat(3,1fr)" id="adFmtGrid"></div>
          </div>
        </div></div>
        ${this.adBillingSection()}
        ${this.adTargetSection()}
        ${this.adMaterialSection()}
        ${edit?this.adAuditOpinionSection(edit):''}
        <div class="flex" style="gap:10px;margin-top:4px">
          <button class="btn btn-primary" onclick="App.submitAd()">${svg(edit?I.upload:I.plus)}${edit?'重新提交审核':'提交创意'}</button>
          <button class="btn btn-ghost" onclick="App.go('campdetail')">取消</button>
        </div>
      </div></div>`;
  },
  view_newcreative_v1(){
    const cp=DB.campaigns.find(c=>c.id===this.curCamp)||{};
    const group=(DB.adGroups||[]).find(g=>g.id===this.curGroup)||{};
    const F=FMT[group.format]||FMT.feed;
    const compatible=DB.assetFiles.filter(f=>f.type==='image').slice(0,6);
    return `<div class="page-head"><div><h1>新建广告创意</h1><p>${cp.name} · 第三层只配置素材、文案与跳转</p></div><div class="spacer"></div><button class="btn btn-ghost" onclick="App.go('newgroup')">← 返回广告组</button></div>
    <div class="create-steps"><span class="done">✓ 广告计划</span><i>→</i><span class="done">✓ 广告组</span><i>→</i><span class="active">3 广告创意</span></div>
    <div class="addsite-layout"><div class="addsite-main">
      <div class="card" style="margin-bottom:16px"><div class="card-pad"><div class="form-section-title">所属关系与规格</div>
        <div class="input-row"><div class="field"><label>所属广告计划</label><input class="input" value="${cp.name}" readonly></div><div class="field"><label>所属广告组</label><input class="input" value="${group.name}" readonly></div></div>
        <div class="spec-summary"><span class="row-ico" style="color:${F.color}">${svg(F.ico)}</span><div><b>${F.name}</b><small>广告形式与库存由广告组继承；这里只能选择兼容素材。</small></div><span class="badge blue">SSP 规格约束</span></div>
      </div></div>
      <div class="card" style="margin-bottom:16px"><div class="card-pad"><div class="form-section-title">创意内容</div>
        <div class="field"><label>广告创意名称<span class="req">*</span></label><input class="input" id="creativeName" placeholder="如：欧洲夏促信息流 A"></div>
        <div class="field"><label>主素材<span class="req">*</span></label><div class="cell-sub" style="margin-bottom:8px">仅显示符合当前广告组规格的素材</div><div class="asset-grid" id="compatibleAssets">${compatible.map((f,i)=>`<div class="asset-cell ${i===0?'picked':''}" data-id="${f.id}" onclick="App.pickCompatibleAsset(this)"><div class="asset-thumb" style="height:64px">${svg(I.image)}</div><div class="asset-meta"><div class="asset-name">${f.name}</div><div class="asset-sub">${f.dim} · ${f.size}</div></div></div>`).join('')}</div><button class="btn btn-ghost btn-sm" style="margin-top:10px" onclick="App.toast('上传成功后将自动返回当前选择流程（Demo）')">${svg(I.upload)}上传新素材</button></div>
        <div class="field"><label>标题 / 文案</label><input class="input" id="creativeHeadline" maxlength="50" placeholder="最多 50 字；是否必填由广告形式决定"></div>
      </div></div>
      <div class="card" style="margin-bottom:16px"><div class="card-pad"><div class="form-section-title">跳转设置</div>
        <div class="input-row"><div class="field"><label>跳转类型</label><select class="select" id="creativeJump"><option>外部跳转</option></select></div><div class="field"><label>目标链接<span class="req">*</span></label><input class="input mono" id="creativeLanding" placeholder="https://example.com/landing"></div></div>
        <div class="notice info">提交后进入审核。修改已投放创意时会生成新版本，旧版本在新版本通过前继续生效。</div>
      </div></div>
      <div class="flex" style="gap:10px"><button class="btn btn-primary" onclick="App.submitCreativeV1()">${svg(I.check)}提交审核</button><button class="btn btn-ghost" onclick="App.go('campdetail')">取消</button></div>
    </div></div>`;
  },
  pickCompatibleAsset(el){ el.parentNode.querySelectorAll('.asset-cell').forEach(x=>x.classList.remove('picked')); el.classList.add('picked'); },
  submitCreativeV1(){
    const cp=DB.campaigns.find(c=>c.id===this.curCamp)||{}, group=(DB.adGroups||[]).find(g=>g.id===this.curGroup)||{};
    const name=document.getElementById('creativeName').value.trim(), landing=document.getElementById('creativeLanding').value.trim(), asset=document.querySelector('#compatibleAssets .picked');
    if(!name||!landing||!asset){ this.toast('请填写创意名称、选择素材并填写目标链接','warn'); return; }
    const file=DB.assetFiles.find(f=>f.id===asset.dataset.id)||{}; const id='CR-'+(9040+DB.creatives.length);
    DB.creatives.unshift({id,name,group:group.name,groupId:group.id,assetId:file.id,fmt:group.format||'feed',kind:file.type||'image',size:file.dim||'—',camp:cp.id,headline:document.getElementById('creativeHeadline').value.trim(),landing,imps:0,clicks:0,ctr:0,status:'review',version:1,created:'2026-08-11'});
    group.status='active'; cp.status='active'; this.save(); this.openPlan(cp.id); this.toast('广告创意已提交审核，三层投放结构创建完成');
  },
  adBillingSection(){
    const edit=DB.creatives.find(c=>c.id===this.editRejectedId && c.status==='rejected');
    const cp=DB.campaigns.find(c=>c.id===(edit?.camp||this.curCamp))||{};
    const bill=edit?.bill||cp.model||'CPM', period=edit?.periodType||'always';
    return `
      <div class="card" style="margin-bottom:16px"><div class="card-pad">
        <div class="form-section-title" style="margin-bottom:14px">投放与计费</div>
        <div class="field"><label>投放类型（计费方式）<span class="req">*</span></label>
          <div class="pill-group" id="adBillType">
            ${[['CPM','按千次展示'],['CPC','按点击']].map(b=>`<label class="radio-pill${bill===b[0]?' sel':''}" onclick="App.pickAdBill(this)" data-bill="${b[0]}"><input type="radio" name="adBill" ${bill===b[0]?'checked':''} hidden><b>${b[0]}</b><small>${b[1]}</small></label>`).join('')}
          </div>
        </div>
        <div class="field"><label>出价（USD）<span class="req">*</span></label><div class="inline-prefix"><span class="pfx">$</span><input class="input" id="adBid" value="${edit?.bid??cp.bid??1.80}"></div></div>
        <div class="field"><label>投放周期<span class="req">*</span></label>
          <div class="pill-group" id="adPeriodType">
            ${[['always','长期投放'],['range','设置投放周期']].map(p=>`<label class="radio-pill${period===p[0]?' sel':''}" onclick="App.pickAdPeriod(this)" data-period="${p[0]}"><input type="radio" name="adPeriod" ${period===p[0]?'checked':''} hidden><b>${p[1]}</b></label>`).join('')}
          </div>
          <div class="input-row" id="adDateRange" style="display:${period==='range'?'flex':'none'};margin-top:12px">
            <div class="field" style="margin-bottom:0"><label>开始日期<span class="req">*</span></label><input class="input" type="date" id="adStart" value="${edit?.start||'2026-06-23'}"></div>
            <div class="field" style="margin-bottom:0"><label>结束日期<span class="req">*</span></label><input class="input" type="date" id="adEnd" value="${edit?.end||'2026-07-23'}"></div>
          </div>
        </div>
        <div class="input-row" style="margin-bottom:0">
          <div class="field" style="margin-bottom:0"><label>日预算（USD）<span class="req">*</span></label><div class="inline-prefix"><span class="pfx">$</span><input class="input" id="adDaily" value="${edit?.daily??cp.budget??150}"></div></div>
          <div class="field" style="margin-bottom:0"><label>总预算（USD）<span class="req">*</span></label><div class="inline-prefix"><span class="pfx">$</span><input class="input" id="adTotal" value="${edit?.total??5000}"></div></div>
        </div>
      </div></div>`;
  },
  adTargetSection(){
    const edit=DB.creatives.find(c=>c.id===this.editRejectedId && c.status==='rejected');
    const option=(value,current)=>`<option ${value===current?'selected':''}>${value}</option>`;
    return `
      <div class="card" style="margin-bottom:16px"><div class="card-pad">
        <div class="form-section-title" style="margin-bottom:14px">用户定向</div>
        <div class="field"><label>投放国家 / 地区（多选）</label>
          <details class="ms" id="adGeoMs">
            <summary class="ms-trigger"><span id="adGeoChips">全部地区</span>${svg('<polyline points="6 9 12 15 18 9"/>')}</summary>
            <div class="ms-panel">
              <label class="ms-opt" style="border-bottom:1px solid var(--border);font-weight:600"><input type="checkbox" id="adGeoAll" checked onchange="App.toggleAdGeoAll(this.checked)"> 全部地区</label>
              <div style="padding:8px;border-bottom:1px solid var(--border)"><input class="input" id="adGeoSearch" placeholder="搜索国家 / 地区 / 代码" oninput="App.filterAdGeoOptions()" onclick="event.stopPropagation()"></div>
              <div id="adGeoList">${this.adGeoOptions()}</div>
            </div>
          </details>
        </div>
        <div class="input-row">
          <div class="field" style="margin-bottom:0"><label>操作系统</label><select class="select" id="adOS">${['全部','Android','iOS','Windows'].map(v=>option(v,edit?.os||'全部')).join('')}</select></div>
          <div class="field" style="margin-bottom:0"><label>设备类型</label><select class="select" id="adDevice">${['全部','手机','平板','桌面'].map(v=>option(v,edit?.device||'全部')).join('')}</select></div>
        </div>
        <div class="field" style="margin-bottom:0"><label>目标人群</label>
          <details class="ms" id="adAudMs">
            <summary class="ms-trigger"><span id="adAudChips">全部人群</span>${svg('<polyline points="6 9 12 15 18 9"/>')}</summary>
            <div class="ms-panel">
              <label class="ms-opt" style="border-bottom:1px solid var(--border);font-weight:600"><input type="checkbox" id="adAudAll" checked onchange="App.toggleAdAudAll(this.checked)"> 全部人群</label>
              <div style="padding:8px;border-bottom:1px solid var(--border)"><input class="input" id="adAudSearch" placeholder="搜索人群名称 / 代码" oninput="App.filterAdAudOptions()" onclick="event.stopPropagation()"></div>
              <div id="adAudList">${this.adAudOptions()}</div>
            </div>
          </details>
          <div class="cell-sub" style="margin-top:6px">默认面向全部人群，也可指定部分人群</div>
        </div>
      </div></div>
      <div class="card" style="margin-bottom:16px"><div class="card-pad">
        <div class="form-section-title" style="margin-bottom:14px">频次控制</div>
        <div class="input-row" style="margin-bottom:0">
          <div class="field" style="margin-bottom:0"><label>展示上限 / 日 / 人<span class="req">*</span></label><input class="input" id="adFcDay" value="${edit?.fcDay??5}"></div>
          <div class="field" style="margin-bottom:0"><label>展示间隔（分钟）<span class="req">*</span></label><input class="input" id="adFcGap" value="${edit?.fcGap??30}"></div>
        </div>
      </div></div>`;
  },
  adMaterialSection(){
    const edit=DB.creatives.find(c=>c.id===this.editRejectedId && c.status==='rejected');
    return `
      <div class="card" style="margin-bottom:16px"><div class="card-pad">
        <div class="form-section-title" style="margin-bottom:14px">创意素材</div>
        <div class="field" id="adMatSource"><label>素材来源<span class="req">*</span></label>
          <div class="pill-group" id="adMatType">
            <label class="radio-pill sel" data-mat="upload" onclick="App.pickAdMat(this)"><input type="radio" name="adMat" checked hidden><b>上传素材</b></label>
            <label class="radio-pill" data-mat="library" onclick="App.pickAdMat(this)"><input type="radio" name="adMat" hidden><b>从素材库选择</b></label>
          </div>
        </div>
        <div id="adMatBody"></div>
        <div class="field" id="adLandingField" style="margin-bottom:0;margin-top:4px"><label id="adLandingLabel">落地页 URL<span class="req">*</span></label><input class="input mono" id="adLanding" placeholder="https://example.com/landing" value="${edit?.landing||''}"></div>
      </div></div>`;
  },
  adAuditOpinionSection(edit){
    return `<div class="card" style="margin-bottom:16px;border-color:rgba(224,88,75,.28)"><div class="card-pad">
      <div class="form-section-title" style="margin-bottom:14px;border-left-color:var(--negative)">审核意见</div>
      <div style="display:flex;gap:13px;padding:15px;border-radius:11px;background:rgba(224,88,75,.07)">
        <span style="width:34px;height:34px;display:grid;place-items:center;flex-shrink:0;border-radius:9px;background:rgba(224,88,75,.13);color:var(--negative)">${svg('<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>')}</span>
        <div><b style="display:block;margin-bottom:6px;color:var(--negative)">审核驳回</b><div style="line-height:1.7">${edit.rejectReason||'创意未通过平台审核，请修改后重新提交。'}</div><div class="cell-sub" style="margin-top:7px">审核轮次：第 ${edit.reviewRound||1} 次 · 创意 ID：${edit.id}</div></div>
      </div>
    </div></div>`;
  },
  pickAdFmt(el){
    el.parentNode.querySelectorAll('.choice').forEach(c=>c.classList.remove('sel'));
    el.classList.add('sel'); this.newAdFmt = el.dataset.fmt;
    this.renderAdMatBody();
  },
  pickAdBill(el){
    el.parentNode.querySelectorAll('.radio-pill').forEach(c=>c.classList.remove('sel'));
    el.classList.add('sel'); el.querySelector('input').checked = true;
  },
  pickAdPeriod(el){
    el.parentNode.querySelectorAll('.radio-pill').forEach(c=>c.classList.remove('sel'));
    el.classList.add('sel'); el.querySelector('input').checked = true;
    const range = document.getElementById('adDateRange');
    if(range) range.style.display = el.dataset.period==='range' ? '' : 'none';
  },
  pickAdScope(el){
    el.parentNode.querySelectorAll('.choice').forEach(c=>c.classList.remove('sel'));
    el.classList.add('sel'); this.adSource = el.dataset.scope;
    this.renderAdScopePicker(); this.renderAdFmtGrid();
  },
  renderAdFmtGrid(){
    const fmts = SCOPE_FMT[this.adSource] || SCOPE_FMT.all;
    const grid = document.getElementById('adFmtGrid'); if(!grid) return;
    const selected=fmts.includes(this.newAdFmt)?this.newAdFmt:fmts[0];
    grid.innerHTML = fmts.map(k=>{const F=FMT[k];if(!F)return'';
      const parts = F.name.split(' ');
      const sub = parts.slice(1).join(' ') || '高 eCPM';
      return `<label class="choice ${selected===k?'sel':''}" data-fmt="${k}" onclick="App.pickAdFmt(this)"><span class="c-ico" style="color:${F.color}">${svg(F.ico)}</span><div class="c-body"><b>${parts[0]}</b><small>${sub}</small></div></label>`;
    }).join('');
    this.newAdFmt = selected || 'pop';
    this.renderAdMatBody();
  },
  renderAdScopePicker(){
    const box = document.getElementById('adScopePicker'); if(!box) return;
    if(this.adSource==='spec_app'){
      box.innerHTML = `<select class="select" id="adScopeSelect"><option>GameBox 游戏盒子</option><option>ClipShort 短视频</option><option>FitTrack 健身</option></select>`;
    } else { box.innerHTML = ''; }
  },
  adAudList(){ return [['new','新用户'],['active','活跃用户'],['high','高价值用户'],['return','回流用户'],['lookalike','相似人群']]; },
  adGeoOptions(kw){
    kw = (kw||'').trim().toLowerCase();
    const selected = this.adGeo || [];
    const list = GEO_LIST.filter(c=>!kw || [c[0],c[1]].some(v=>String(v||'').toLowerCase().includes(kw)));
    return list.map(c=>`<label class="ms-opt"><input type="checkbox" class="adGeoChk" value="${c[0]}" ${selected.includes(c[0])?'checked':''} onchange="App.toggleAdGeo('${c[0]}',this.checked)"> ${c[1]}<span class="cell-sub" style="margin-left:6px">${c[0]}</span></label>`).join('')
      || `<div class="ms-opt"><span class="cell-sub">无匹配地区</span></div>`;
  },
  filterAdGeoOptions(){
    const input = document.getElementById('adGeoSearch');
    const list = document.getElementById('adGeoList');
    if(list) list.innerHTML = this.adGeoOptions(input ? input.value : '');
    const all = document.getElementById('adGeoAll');
    if(all) all.checked = !(this.adGeo||[]).length;
  },
  toggleAdGeoAll(on){
    this.adGeo = [];
    document.querySelectorAll('.adGeoChk').forEach(c=>c.checked=false);
    if(!on){ const a=document.getElementById('adGeoAll'); if(a) a.checked=true; }
    this.filterAdGeoOptions();
    this.renderAdGeoChips();
  },
  toggleAdGeo(cc, on){
    if(on){ if(!this.adGeo.includes(cc)) this.adGeo.push(cc); }
    else this.adGeo = this.adGeo.filter(x=>x!==cc);
    const all = document.getElementById('adGeoAll');
    if(all) all.checked = this.adGeo.length===0;
    this.renderAdGeoChips();
  },
  adAudOptions(kw){
    kw = (kw||'').trim().toLowerCase();
    const selected = this.adAud || [];
    const list = this.adAudList().filter(a=>!kw || [a[0],a[1]].some(v=>String(v||'').toLowerCase().includes(kw)));
    return list.map(a=>`<label class="ms-opt"><input type="checkbox" class="adAudChk" value="${a[0]}" ${selected.includes(a[0])?'checked':''} onchange="App.toggleAdAud('${a[0]}',this.checked)"> ${a[1]}<span class="cell-sub" style="margin-left:6px">${a[0]}</span></label>`).join('')
      || `<div class="ms-opt"><span class="cell-sub">无匹配人群</span></div>`;
  },
  filterAdAudOptions(){
    const input = document.getElementById('adAudSearch');
    const list = document.getElementById('adAudList');
    if(list) list.innerHTML = this.adAudOptions(input ? input.value : '');
    const all = document.getElementById('adAudAll');
    if(all) all.checked = !(this.adAud||[]).length;
  },
  toggleAdAudAll(on){
    this.adAud = [];
    document.querySelectorAll('.adAudChk').forEach(c=>c.checked=false);
    if(!on){ const a=document.getElementById('adAudAll'); if(a) a.checked=true; }
    this.filterAdAudOptions();
    this.renderAdAudChips();
  },
  toggleAdAud(id, on){
    const selected = new Set(this.adAud || []);
    if(on) selected.add(id); else selected.delete(id);
    this.adAud = [...selected];
    const a=document.getElementById('adAudAll'); if(a) a.checked = this.adAud.length===0;
    this.renderAdAudChips();
  },
  renderAdAudChips(){
    const el = document.getElementById('adAudChips'); if(!el) return;
    const picked = this.adAud || [];
    el.textContent = picked.length===0 ? '全部人群' : picked.map(id=>{ const a=this.adAudList().find(x=>x[0]===id); return a?a[1]:id; }).join('、');
  },
  renderAdGeoChips(){
    const el = document.getElementById('adGeoChips'); if(!el) return;
    const nm = cc => (GEO_LIST.find(g=>g[0]===cc)||[,cc])[1];
    el.textContent = this.adGeo.length ? this.adGeo.map(nm).join('、') : '全部地区';
    this.filterAdGeoOptions();
  },
  pickAdMat(el){
    if(el.dataset.mat==='library'){ this.go('creatives'); return; }
    el.parentNode.querySelectorAll('.radio-pill').forEach(c=>c.classList.remove('sel'));
    el.classList.add('sel'); el.querySelector('input').checked = true;
    this.adMat = el.dataset.mat; this.renderAdMatBody();
  },
  renderAdMatBody(){
    const box = document.getElementById('adMatBody'); if(!box) return;
    const edit=DB.creatives.find(c=>c.id===this.editRejectedId && c.status==='rejected');
    const source = document.getElementById('adMatSource');
    const landingLabel = document.getElementById('adLandingLabel');
    if(this.newAdFmt==='text'){
      if(source) source.style.display = 'none';
      if(landingLabel) landingLabel.innerHTML = '跳转链接<span class="req">*</span>';
      box.innerHTML = `
        <div class="field"><label>标题<span class="req">*</span></label><input class="input" id="adTextTitle" placeholder="请输入广告标题" value="${edit?.headline||''}"></div>
        <div class="field"><label>描述<span class="req">*</span></label><textarea class="input" id="adTextDescription" rows="4" maxlength="300" placeholder="请输入广告描述，最多 300 字">${edit?.description||''}</textarea></div>
        <div class="field"><label>CTA文案<span class="req">*</span></label><input class="input" id="adTextCta" placeholder="如：立即查看" value="${edit?.cta||''}"></div>`;
      return;
    }
    if(source) source.style.display = '';
    if(landingLabel) landingLabel.innerHTML = '落地页 URL<span class="req">*</span>';
    if(this.adMat==='upload'){
      const sizeMap = {pop:'1080×1920、720×1280',push:'192×192（图标）',ipp:'360×240、300×250',native:'1200×628、640×360',video:'1280×720、1920×1080',splash:'1080×1920',inter:'1080×1920、720×1280',reward:'1080×1920（竖）/ 1920×1080（横）'};
      const sizes = sizeMap[this.newAdFmt] || '300×250、728×90、1200×628';
      box.innerHTML = `
        <div class="upload-drop" style="min-height:128px" onclick="App.toast('选择文件（演示）')">
          <span class="up-ico">${svg(I.upload)}</span>
          <div><b>${edit?'重新上传素材，或保留当前素材':'点击或拖拽上传素材'}</b><div class="cell-sub">支持 JPG / PNG / GIF / MP4 / HTML5，单文件 ≤ 10 MB</div><div class="cell-sub">推荐尺寸：${sizes}</div>${edit?`<div class="cell-sub" style="margin-top:5px;color:var(--accent-strong)">当前素材：${edit.name} · ${edit.size}</div>`:''}</div>
        </div>`;
    } else {
      const fileIco = {image:I.image, video:I.film, audio:I.music, doc:I.doc};
      box.innerHTML = `<div class="cell-sub" style="margin-bottom:8px">从素材库选择一个素材</div>
        <div class="asset-grid">${DB.assetFiles.map(f=>`
          <div class="asset-cell${this.adLibPick===f.id?' picked':''}" onclick="App.pickAdLib('${f.id}')">
            <div class="asset-thumb" style="height:64px">${svg(fileIco[f.type]||I.doc)}</div>
            <div class="asset-meta"><div class="asset-name" title="${f.name}">${f.name}</div><div class="asset-sub">${f.dim} · ${f.size}</div></div>
          </div>`).join('')}</div>`;
    }
  },
  pickAdLib(id){
    this.adLibPick = id; this.renderAdMatBody();
    const f = DB.assetFiles.find(x=>x.id===id);
    if(f) this.toast(`已选择素材 ${f.name}`);
  },
  submitAd(){
    const edit=DB.creatives.find(c=>c.id===this.editRejectedId && c.status==='rejected');
    const fmt = (document.querySelector('#adFmtGrid .choice.sel')||{}).dataset?.fmt || this.newAdFmt || 'pop';
    const bill = (document.querySelector('#adBillType .radio-pill.sel')||{}).dataset?.bill || 'CPM';
    const period = (document.querySelector('#adPeriodType .radio-pill.sel')||{}).dataset?.period || 'always';
    const required = [
      [document.getElementById('adName'),'广告创意名称'],
      [document.getElementById('adCampaign'),'所属广告计划'],
      [document.getElementById('adBid'),'出价']
    ];
    if(period==='range') required.push([document.getElementById('adStart'),'开始日期'],[document.getElementById('adEnd'),'结束日期']);
    required.push(
      [document.getElementById('adDaily'),'日预算'],
      [document.getElementById('adTotal'),'总预算'],
      [document.getElementById('adFcDay'),'展示上限'],
      [document.getElementById('adFcGap'),'展示间隔']
    );
    if(fmt==='text') required.push(
      [document.getElementById('adTextTitle'),'标题'],
      [document.getElementById('adTextDescription'),'描述'],
      [document.getElementById('adTextCta'),'CTA文案']
    );
    required.push([document.getElementById('adLanding'),fmt==='text'?'跳转链接':'落地页 URL']);
    if(!this.validateRequired(required)) return;
    const name = document.getElementById('adName').value.trim();
    const camp = document.getElementById('adCampaign').value;
    const kind = (fmt==='video'||fmt==='reward') ? 'video' : 'image';
    let size = edit?.size || '自适应';
    if(this.adMat==='library' && this.adLibPick) size = (DB.assetFiles.find(x=>x.id===this.adLibPick)||{}).dim || '自适应';
    const formData={
      name, fmt, kind, size, camp,
      headline:(document.getElementById('adTextTitle')?.value||'').trim(),
      description:(document.getElementById('adTextDescription')?.value||'').trim(),
      cta:(document.getElementById('adTextCta')?.value||'').trim(),
      landing:(document.getElementById('adLanding')?.value||'').trim()||'—',
      bill, bid:parseFloat(document.getElementById('adBid').value)||0,
      periodType:period,
      start:period==='range'?document.getElementById('adStart').value:'',
      end:period==='range'?document.getElementById('adEnd').value:'',
      daily:parseFloat(document.getElementById('adDaily').value)||0,
      total:parseFloat(document.getElementById('adTotal').value)||0,
      geo:this.adGeo.length?this.adGeo.slice():['ALL'],
      audience:this.adAud.length?this.adAud.slice():['ALL'],
      os:document.getElementById('adOS')?.value||'全部',
      device:document.getElementById('adDevice')?.value||'全部',
      fcDay:parseInt(document.getElementById('adFcDay').value)||0,
      fcGap:parseInt(document.getElementById('adFcGap').value)||0,
      source:this.adSource, material:this.adMat, assetId:this.adLibPick,
      status:'review', updated:'2026-07-14'
    };
    if(edit){
      Object.assign(edit,formData,{
        reviewRound:(edit.reviewRound||1)+1,
        resubmitted:'2026-07-14'
      });
    } else {
      DB.creatives.unshift({id:'CR-'+(9050+DB.creatives.length),...formData,imps:0,clicks:0,ctr:0,created:'2026-06-23'});
    }
    this.save();
    this.curCamp = camp;
    this.editRejectedId=null;
    this.go('campdetail');
    this.toast(edit?'广告创意已修改并重新提交审核':'广告创意已提交，等待审核');
  },




  /* ============ 新建计划向导 ============ */
  openWizard(){
    this.wizStep=1;
    this.wiz={name:'',fmt:'pop',creatives:[],model:'CPM',bid:1.50,budget:100,inv:['web','app','h5'],appcat:'全部分类',geo:['美国 US'],devices:['移动','桌面'],os:['Android','iOS'],schedule:'all'};
    this.renderWizard();
  },
  WIZ:[{t:'广告格式',fn:'wizFormat'},{t:'广告创意',fn:'wizCreative'},{t:'受众定向',fn:'wizTarget'},{t:'出价预算',fn:'wizBudget'},{t:'确认提交',fn:'wizReview'}],
  renderWizard(){
    const total=this.WIZ.length;
    const stepHtml = this.WIZ.map((s,i)=>{
      const n=i+1, cls = n<this.wizStep?'done':n===this.wizStep?'active':'';
      return `<div class="step ${cls}"><div class="s-num">${n<this.wizStep?svg(I.check):n}</div><div class="s-label">${s.t}</div>${i<total-1?'<div class="s-line"></div>':''}</div>`;
    }).join('');
    this.modal(`
      <div class="modal-head"><div><h3>新建广告计划</h3><p>第 ${this.wizStep} / ${total} 步 · ${this.WIZ[this.wizStep-1].t}</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg('<path d="M18 6 6 18M6 6l12 12"/>')}</button></div>
      <div class="modal-body">
        <div class="steps">${stepHtml}</div>
        <div id="wizBody">${this[this.WIZ[this.wizStep-1].fn]()}</div>
      </div>
      <div class="modal-foot">
        ${this.wizStep>1?`<button class="btn btn-ghost" onclick="App.wizNav(-1)">上一步</button>`:`<button class="btn btn-ghost" onclick="App.closeModal()">取消</button>`}
        <div class="spacer" style="flex:1"></div>
        ${this.wizStep<total?`<button class="btn btn-primary" onclick="App.wizNav(1)">下一步</button>`:`<button class="btn btn-primary" onclick="App.submitWizard()">${svg(I.check)}创建计划</button>`}
      </div>`, true);
  },
  wizNav(d){
    if(d>0){
      this.saveWizStep();
      const fn=this.WIZ[this.wizStep-1].fn;
      if(fn==='wizCreative' && this.wiz.creatives.length===0){ this.toast('请至少选择或上传一个创意','info'); return; }
    }
    this.wizStep += d;
    this.renderWizard();
  },
  saveWizStep(){
    const fn=this.WIZ[this.wizStep-1].fn;
    if(fn==='wizFormat'){ const nm=document.getElementById('wName'); if(nm) this.wiz.name=nm.value; }
    if(fn==='wizBudget'){
      const b=document.getElementById('wBid'), bg=document.getElementById('wBudget');
      if(b) this.wiz.bid=parseFloat(b.value)||this.wiz.bid;
      if(bg) this.wiz.budget=parseFloat(bg.value)||this.wiz.budget;
    }
  },

  wizFormat(){
    const fmts=Object.keys(FMT);
    const HINT={pop:'高曝光 · 适合下载转化',push:'低成本 · 高互动',ipp:'原生体验 · 不打扰',native:'融合内容 · 高 CTR',video:'品牌曝光 · 高 eCPM',splash:'App 启动 · 强曝光',inter:'App 插屏 · 高点击',reward:'App 激励 · 高完播',banner:'经典横幅 · 稳定曝光',link:'直链跳转 · 简单高效',mbanner:'移动标准横幅',bbanner:'大图横幅 · 强视觉',rect:'矩形广告 · 信息流兼容',micon:'图标广告 · 小占位',feed:'图片信息流 · 原生融合',splashimg:'开屏图片 · 强曝光',text:'文字广告 · 轻量'};
    return `
      <div class="field"><label>计划名称</label><input class="input" id="wName" value="${this.wiz.name}" placeholder="如：夏季 App 推广 · 美国"></div>
      <div class="field"><label>选择广告格式</label>
        <div class="choice-grid" id="wFmt">
          ${fmts.map(k=>`<label class="choice ${this.wiz.fmt===k?'sel':''}" onclick="App.wizPick('fmt','${k}',this,true)"><span class="c-ico" style="color:${FMT[k].color}">${svg(FMT[k].ico)}</span><div class="c-body"><b>${FMT[k].name.split(' ')[0]}</b><small>${HINT[k]||''}</small></div><span class="c-check">${svg(I.check)}</span></label>`).join('')}
        </div>
      </div>`;
  },
  wizPick(key, val, el, single){
    if(single){
      el.parentNode.querySelectorAll('.choice').forEach(c=>c.classList.remove('sel'));
      el.classList.add('sel'); this.wiz[key]=val;
      if(key==='fmt') this.wiz.creatives=[];
    } else {
      el.classList.toggle('sel');
      const arr=this.wiz[key];
      const i=arr.indexOf(val); i>=0?arr.splice(i,1):arr.push(val);
    }
  },

  wizCreative(){
    const matches = DB.creatives.filter(c=>c.fmt===this.wiz.fmt && c.status!=='paused');
    const sel = this.wiz.creatives;
    return `
      <div class="flex between" style="margin-bottom:14px">
        <div><b style="font-size:14px">为「${FMT[this.wiz.fmt].name.split(' ')[0]}」选择创意</b><div class="cell-sub">可多选用于 A/B 测试，已选 <b id="crCount" style="color:var(--accent-strong)">${sel.length}</b> 个</div></div>
        <button class="btn btn-ghost btn-sm" onclick="App.wizUpload()">${svg(I.plus)}上传新建</button>
      </div>
      <div class="choice-grid" style="grid-template-columns:1fr 1fr" id="wizCrGrid">
        ${matches.length? matches.map(c=>this.wizCrItem(c)).join('') : `<div class="empty" style="grid-column:1/-1;padding:30px">${svg(I.creative)}<div>该格式下暂无可用创意</div><div class="cell-sub" style="margin-top:4px">点击右上角「上传新建」添加</div></div>`}
      </div>`;
  },
  wizCrItem(c){
    const F=FMT[c.fmt], K=KIND[c.kind]||KIND.image, on=this.wiz.creatives.includes(c.id);
    return `<label class="choice ${on?'sel':''}" data-cr="${c.id}" onclick="App.wizPickCr('${c.id}',this)">
      <span class="c-ico" style="color:${F.color};background:${on?'#fff':'var(--surface-2)'}">${svg(K.ico)}</span>
      <div class="c-body"><b>${c.name}</b><small>${K.name} · ${c.size} · CTR ${c.ctr}%</small></div>
      <span class="c-check">${svg(I.check)}</span>
    </label>`;
  },
  wizPickCr(id, el){
    const arr=this.wiz.creatives, i=arr.indexOf(id);
    if(i>=0) arr.splice(i,1); else arr.push(id);
    el.classList.toggle('sel');
    const cnt=document.getElementById('crCount'); if(cnt) cnt.textContent=arr.length;
  },
  wizUpload(){
    // 行内快速上传：模拟生成一个创意并自动选中
    const n=DB.creatives.filter(c=>c.fmt===this.wiz.fmt).length+1;
    const id='CR-'+(9040+DB.creatives.length);
    DB.creatives.unshift({id, name:`${FMT[this.wiz.fmt].name.split(' ')[0]}创意 ${n}`, fmt:this.wiz.fmt, kind:this.wiz.fmt==='video'||this.wiz.fmt==='reward'?'video':'image', size:'自适应', camp:'—', imps:0, clicks:0, ctr:0, status:'review', created:'2026-06-23'});
    this.wiz.creatives.push(id);
    this.save();
    document.getElementById('wizBody').innerHTML = this.wizCreative();
    this.toast('已添加新创意并选中');
  },

  wizTarget(){
    const geos=['美国 US','英国 GB','德国 DE','法国 FR','印度 IN','印尼 ID','巴西 BR','日本 JP'];
    const devs=['移动','桌面','平板'];
    const oss=['Android','iOS','Windows','macOS'];
    const tag=(key,val)=>`<button class="choice ${this.wiz[key].includes(val)?'sel':''}" style="padding:9px 13px;display:inline-flex;width:auto" onclick="App.wizPick('${key}','${val}',this,false)"><span style="font-weight:600;font-size:13px">${val}</span><span class="c-check" style="width:16px;height:16px;margin-left:8px">${svg(I.check)}</span></button>`;
    const hasApp = this.wiz.inv.includes('app');
    return `
      <div class="field"><label>流量类型（库存来源）</label>
        <div class="choice-grid" style="grid-template-columns:1fr 1fr 1fr">
          ${Object.keys(INV).map(k=>`<label class="choice ${this.wiz.inv.includes(k)?'sel':''}" onclick="App.wizToggleInv('${k}')"><span class="c-ico" style="color:${INV[k].color}">${svg(INV[k].ico)}</span><div class="c-body"><b>${INV[k].name}</b><small>${INV[k].label}</small></div><span class="c-check">${svg(I.check)}</span></label>`).join('')}
        </div>
      </div>
      ${hasApp?`<div class="field"><label>App 应用分类（仅 App 流量生效）</label><select class="select" id="wAppCat" onchange="App.wiz.appcat=this.value"><option ${this.wiz.appcat==='全部分类'?'selected':''}>全部分类</option><option ${this.wiz.appcat==='游戏'?'selected':''}>游戏</option><option ${this.wiz.appcat==='社交'?'selected':''}>社交</option><option ${this.wiz.appcat==='工具'?'selected':''}>工具</option><option ${this.wiz.appcat==='短视频'?'selected':''}>短视频</option><option ${this.wiz.appcat==='阅读'?'selected':''}>阅读</option></select></div>`:''}
      <div class="divider"></div>
      <div class="field"><label>${svg(I.geo)} 投放地区 (GEO)</label><div class="chips" style="gap:8px">${geos.map(g=>tag('geo',g)).join('')}</div><div class="hint">不选则默认投放全球</div></div>
      <div class="field"><label>${svg(I.device)} 设备类型</label><div class="chips" style="gap:8px">${devs.map(d=>tag('devices',d)).join('')}</div></div>
      <div class="field"><label>操作系统</label><div class="chips" style="gap:8px">${oss.map(o=>tag('os',o)).join('')}</div></div>
      <div class="input-row" style="margin-top:4px">
        <div class="field"><label>连接方式</label><select class="select"><option>全部</option><option>WiFi</option><option>移动网络 3G/4G/5G</option></select></div>
        <div class="field"><label>运营商</label><select class="select"><option>全部</option><option>移动 China Mobile</option><option>Verizon</option><option>Airtel</option></select></div>
      </div>`;
  },
  wizToggleInv(k){
    const arr=this.wiz.inv, i=arr.indexOf(k);
    if(i>=0){ if(arr.length>1) arr.splice(i,1); else { this.toast('至少选择一种流量类型','info'); return; } }
    else arr.push(k);
    document.getElementById('wizBody').innerHTML = this.wizTarget();
  },

  wizBudget(){
    const m=this.wiz.model;
    return `
      <div class="field"><label>计费模式</label>
        <div class="choice-grid" style="grid-template-columns:1fr 1fr 1fr">
          ${['CPM','CPC','SmartCPM'].map(x=>`<label class="choice ${m===x?'sel':''}" style="justify-content:center" onclick="App.wizPick('model','${x}',this,true)"><div class="c-body" style="text-align:center"><b>${x}</b><small>${{CPM:'按千次展示',CPC:'按点击',SmartCPM:'智能竞价'}[x]}</small></div></label>`).join('')}
        </div>
      </div>
      <div class="input-row">
        <div class="field"><label>出价 ${this.wiz.model==='CPC'?'(每次点击)':'(每千次展示)'}</label><div class="inline-prefix"><span class="pfx">$</span><input class="input" id="wBid" value="${this.wiz.bid}" style="padding-left:24px"></div><div class="hint">该地区建议出价 $1.20 - $2.40</div></div>
        <div class="field"><label>每日预算</label><div class="inline-prefix"><span class="pfx">$</span><input class="input" id="wBudget" value="${this.wiz.budget}" style="padding-left:24px"></div><div class="hint">达到后当日自动暂停</div></div>
      </div>
      <div class="field"><label>投放时段</label>
        <div class="choice-grid" style="grid-template-columns:1fr 1fr">
          <label class="choice ${this.wiz.schedule==='all'?'sel':''}" onclick="App.wizPick('schedule','all',this,true)"><div class="c-body"><b>全天投放</b><small>24 小时不间断</small></div><span class="c-check">${svg(I.check)}</span></label>
          <label class="choice ${this.wiz.schedule==='part'?'sel':''}" onclick="App.wizPick('schedule','part',this,true)"><div class="c-body"><b>分时段投放</b><small>自定义时段</small></div><span class="c-check">${svg(I.check)}</span></label>
        </div>
      </div>
      <div class="field"><label>频次控制</label><select class="select"><option>每用户 3 次 / 24 小时</option><option>每用户 1 次 / 24 小时</option><option>不限制</option></select></div>`;
  },

  wizReview(){
    const w=this.wiz;
    const est = Math.round(w.budget / (w.model==='CPC'? w.bid : w.bid/1000));
    const row=(k,v)=>`<div class="flex between" style="padding:10px 0;border-bottom:1px solid var(--border)"><span class="muted">${k}</span><b>${v}</b></div>`;
    return `
      <div class="card card-pad" style="background:var(--surface-2);margin-bottom:16px">
        ${row('计划名称', w.name||'未命名计划')}
        ${row('广告格式', FMT[w.fmt].name)}
        ${row('广告创意', w.creatives.length+' 个'+(w.creatives.length>1?'（A/B 测试）':''))}
        ${row('流量类型', w.inv.map(t=>INV[t].name).join(' / ')+(w.inv.includes('app')&&w.appcat!=='全部分类'?'（App: '+w.appcat+'）':''))}
        ${row('投放地区', w.geo.join('、')||'全球')}
        ${row('设备 / 系统', (w.devices.join('/')||'全部')+' · '+(w.os.join('/')||'全部'))}
        ${row('计费模式', w.model+' · $'+w.bid+(w.model==='CPC'?'/点击':'/千次'))}
        ${row('每日预算', '$'+w.budget)}
        <div class="flex between" style="padding:10px 0 0"><span class="muted">投放时段</span><b>${w.schedule==='all'?'全天':'分时段'}</b></div>
      </div>
      <div class="card card-pad" style="background:var(--accent-soft);border-color:transparent">
        <div class="flex between"><span style="color:var(--accent-strong);font-weight:600">预计每日可获得</span><b style="font-size:20px;color:var(--accent-strong)">${w.model==='CPC'?fmtNum(est)+' 点击':fmtK(est)+' 展示'}</b></div>
      </div>`;
  },

  submitWizard(){
    const w=this.wiz;
    const id='C-'+(50330+DB.campaigns.length);
    DB.campaigns.unshift({id, name:w.name||'未命名计划', alias:w.name||'未命名计划', mode:'rtb', placement:(w.inv||[]).join(' / ')||'待选择', period:'长期投放', fmt:w.fmt, model:w.model, bid:w.bid, status:'active', spend:0, imps:0, clicks:0, conv:0, geo:w.geo.map(g=>g.split(' ')[1]?('🏳 '+g.split(' ')[1]):g), inv:w.inv.slice(), creatives:w.creatives.slice(), budget:w.budget});
    // 绑定所选创意到该计划
    w.creatives.forEach(cid=>{ const cr=DB.creatives.find(c=>c.id===cid); if(cr) cr.camp=id; });
    this.save();
    this.closeModal(); this.go('plans'); this.toast(`广告计划已创建（含 ${w.creatives.length} 个创意），等待审核`);
  },

  /* ============ 创意素材（素材库：左树 + 右矩阵）============ */
  view_creatives(){
    return `
    <div class="page-head">
      <div><h1>创意素材</h1><p>创意素材文件夹与资源库 · 共 ${DB.assetFiles.length} 个文件</p></div>
      <div class="spacer"></div>
      <button class="btn btn-ghost" onclick="App.openNewFolder()">${svg(I.folder)}新建文件夹</button>
      <button class="btn btn-primary" onclick="App.openUploadAsset()">${svg(I.upload)}上传素材</button>
    </div>
    <div class="asset-layout">
      <aside class="card asset-tree"><div class="card-pad" id="assetTree"></div></aside>
      <section class="card asset-matrix">
        <div class="card-head">
          <div id="assetCrumb" class="asset-crumb"></div><div class="spacer"></div>
          <select class="select" id="assetTypeFilter" style="width:120px;margin-right:8px" onchange="App.renderAssetGrid()">
            <option value="">全部类型</option>
            <option value="image">图片</option>
            <option value="video">视频</option>
          </select>
          <input class="input" id="assetSearch" style="width:230px;min-width:230px" placeholder="搜索文件名 / 文件夹名" oninput="App.renderAssetGrid()">
          <span class="cell-sub" id="assetCount" style="margin-left:10px"></span>
        </div>
        <div class="card-pad" id="assetGrid"></div>
      </section>
    </div>`;
  },
  after_creatives(){ this.assetCur = this.assetCur || 'root'; this.assetOpen = this.assetOpen || {root:true}; this.renderAssetTree(); this.renderAssetGrid(); },
  // 渲染左侧树（递归构建层级）
  renderAssetTree(){
    const build = (parent, depth) => DB.assetTree.filter(n=>n.parent===parent).map(n=>{
      const kids = DB.assetTree.filter(c=>c.parent===n.id);
      const open = !!this.assetOpen[n.id];
      const active = this.assetCur===n.id ? ' active' : '';
      const caret = kids.length
        ? `<span class="tree-caret${open?' open':''}" onclick="event.stopPropagation();App.toggleAssetNode('${n.id}')">${svg('<polyline points="9 6 15 12 9 18"/>')}</span>`
        : '<span class="tree-caret empty-caret"></span>';
      const cnt = DB.assetFiles.filter(f=>f.folder===n.id).length;
      return `<div class="tree-node${active}" style="padding-left:${depth*14}px" onclick="App.selectAssetFolder('${n.id}')">
        ${caret}<span class="tree-ico">${svg(I.folder)}</span><span class="tree-name">${n.name}</span>${cnt?`<span class="tree-cnt">${cnt}</span>`:''}
      </div>${open?build(n.id, depth+1):''}`;
    }).join('');
    document.getElementById('assetTree').innerHTML = build(null, 0);
  },
  toggleAssetNode(id){ this.assetOpen[id] = !this.assetOpen[id]; this.renderAssetTree(); },
  selectAssetFolder(id){ this.assetCur = id; this.assetOpen[id] = true; this.renderAssetTree(); this.renderAssetGrid(); },
  // 面包屑：从当前节点回溯到根
  assetCrumb(id){
    const path = []; let cur = DB.assetTree.find(n=>n.id===id);
    while(cur){ path.unshift(cur); cur = DB.assetTree.find(n=>n.id===cur.parent); }
    return path.map((n,i)=>`<span class="${i===path.length-1?'crumb-cur':'crumb-link'}" onclick="App.selectAssetFolder('${n.id}')">${n.name}</span>`).join('<span class="crumb-sep">/</span>');
  },
  // 渲染右侧矩阵：子文件夹卡片 + 文件卡片
  renderAssetGrid(){
    const cur = this.assetCur;
    const subFolders = DB.assetTree.filter(n=>n.parent===cur);
    const files = DB.assetFiles.filter(f=>f.folder===cur);
    const fileIco = {image:I.image, video:I.film, audio:I.music, doc:I.doc};
    const fileColor = {image:'#1f9d76', video:'#0ea5a3', audio:'#8b5cf6', doc:'#64748b'};
    const folderCards = subFolders.map(f=>{
      const cnt = DB.assetFiles.filter(x=>x.folder===f.id).length;
      return `<div class="asset-cell folder" ondblclick="App.selectAssetFolder('${f.id}')" onclick="App.selectAssetFolder('${f.id}')">
        <div class="asset-thumb folder-thumb">${svg(I.folder)}<div class="asset-actions"><button class="icon-btn btn-sm" title="删除文件夹" onclick="event.stopPropagation();App.deleteFolder('${f.id}')">${svg(I.trash)}</button></div></div>
        <div class="asset-meta"><div class="asset-name">${f.name}</div><div class="asset-sub">${cnt} 个文件</div></div>
      </div>`;
    }).join('');
    const fileCards = files.map(f=>{
      const ico = fileIco[f.type]||I.doc, col = fileColor[f.type]||'#64748b';
      const imp = f.impressions>=1000 ? (f.impressions/1000).toFixed(1)+'K' : (f.impressions||0);
      const linked=DB.creatives.filter(cr=>cr.assetId===f.id),reviewing=linked.some(cr=>cr.status==='review'||cr.changeStatus==='review'),active=linked.some(cr=>cr.status==='active');
      const useBadge=reviewing?'<span class="badge amber">关联创意审核中</span>':active?'<span class="badge green">投放使用中</span>':'<span class="badge gray">未使用</span>';
      return `<div class="asset-cell asset-file">
        <div class="asset-thumb" style="color:${col};background:${col}1a"><div class="asset-actions"><button class="icon-btn btn-sm" title="放大预览" onclick="event.stopPropagation();App.previewAsset('${f.id}')">${svg(I.eye)}</button><button class="icon-btn btn-sm" title="删除" onclick="event.stopPropagation();App.deleteAsset('${f.id}')">${svg(I.trash)}</button></div>${svg(ico)}</div>
        <div class="asset-meta">
          <div class="asset-name" title="${f.name}">${f.name}</div>
          <div style="margin:5px 0">${useBadge}</div>
          <div class="asset-sub">${f.id} · ${f.dim} · ${f.size}</div>
          <div class="asset-sub">曝光 ${imp} · CTR ${f.ctr||0}%</div>
          <div class="asset-sub">创建 ${f.createdAt||'—'}</div>
        </div>
      </div>`;
    }).join('');
    let html = '';
    if(folderCards) html += `<div class="asset-grid">${folderCards}</div>`;
    if(folderCards && fileCards) html += `<div class="asset-divider">素材文件</div>`;
    if(fileCards) html += `<div class="asset-grid">${fileCards}</div>`;
    if(!html) html = `<div class="empty">${svg(I.folder)}<div>该文件夹为空</div></div>`;
    document.getElementById('assetGrid').innerHTML = html;
    document.getElementById('assetCrumb').innerHTML = this.assetCrumb(cur);
    document.getElementById('assetCount').textContent = `${subFolders.length} 个文件夹 · ${files.length} 个文件`;
  },
  previewAsset(id){
    const f = DB.assetFiles.find(x=>x.id===id); if(!f) return;
    const fileIco = {image:I.image, video:I.film, audio:I.music, doc:I.doc};
    const col = {image:'#1f9d76', video:'#0ea5a3', audio:'#8b5cf6', doc:'#64748b'}[f.type]||'#64748b';
    const imp = f.impressions>=1000 ? (f.impressions/1000).toFixed(1)+'K' : (f.impressions||0);
    this.modal(`
      <div class="modal-head"><div><h3>素材预览</h3><p>${f.name}</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg(I.x)}</button></div>
      <div class="modal-body" style="padding:20px">
        <div style="width:100%;height:200px;display:flex;align-items:center;justify-content:center;background:${col}0d;border:1px solid ${col}30;border-radius:12px;overflow:hidden;margin-bottom:20px">
          <svg viewBox="0 0 24 24" fill="none" stroke="${col}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:48px;height:48px;opacity:.7">${fileIco[f.type]||I.doc}</svg>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px 20px;font-size:13px">
          <div style="display:flex;flex-direction:column;gap:2px"><span style="color:var(--text-3);font-size:11px">素材 ID</span><span style="color:var(--text);font-weight:500">${f.id}</span></div>
          <div style="display:flex;flex-direction:column;gap:2px"><span style="color:var(--text-3);font-size:11px">尺寸</span><span style="color:var(--text);font-weight:500">${f.dim}</span></div>
          <div style="display:flex;flex-direction:column;gap:2px"><span style="color:var(--text-3);font-size:11px">文件大小</span><span style="color:var(--text);font-weight:500">${f.size}</span></div>
          <div style="display:flex;flex-direction:column;gap:2px"><span style="color:var(--text-3);font-size:11px">曝光量</span><span style="color:var(--text);font-weight:500">${imp}</span></div>
          <div style="display:flex;flex-direction:column;gap:2px"><span style="color:var(--text-3);font-size:11px">CTR</span><span style="color:var(--text);font-weight:500">${f.ctr||0}%</span></div>
          <div style="display:flex;flex-direction:column;gap:2px"><span style="color:var(--text-3);font-size:11px">创建时间</span><span style="color:var(--text);font-weight:500">${f.createdAt||'—'}</span></div>
        </div>
      </div>
      <div class="modal-foot"><button class="btn btn-ghost" onclick="App.closeModal()">关闭</button></div>`);
  },
  deleteAsset(id){
    const f = DB.assetFiles.find(x=>x.id===id); if(!f) return;
    this.modal(`
      <div class="modal-head">
        <div><h3>删除素材</h3><p>${f.name}</p></div>
        <div class="spacer"></div>
        <button class="icon-btn" onclick="App.closeModal()">${svg(I.x)}</button>
      </div>
      <div class="modal-body">
        <div style="display:flex;gap:14px;align-items:flex-start;padding:4px 0">
          <div style="width:40px;height:40px;border-radius:10px;background:#fef2f2;color:#ef4444;display:grid;place-items:center;flex-shrink:0">${svg(I.trash)}</div>
          <div>
            <div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:6px">确定要删除「${f.name}」吗？</div>
            <div style="font-size:13px;color:var(--text-2);line-height:1.6">素材 ID：${f.id} · ${f.dim} · ${f.size}<br>删除后无法恢复，关联的广告创意也将失去素材引用。</div>
          </div>
        </div>
      </div>
      <div class="modal-foot">
        <button class="btn btn-ghost" onclick="App.closeModal()">取消</button>
        <button class="btn btn-danger" onclick="App.confirmDeleteAsset('${id}')">${svg(I.trash)}确认删除</button>
      </div>`);
  },
  confirmDeleteAsset(id){
    DB.assetFiles = DB.assetFiles.filter(x=>x.id!==id);
    this.closeModal();
    this.renderAssetTree(); this.renderAssetGrid();
    this.toast('素材已删除');
  },
  deleteFolder(id){
    const node = DB.assetTree.find(n=>n.id===id); if(!node) return;
    const childFolders = DB.assetTree.filter(n=>n.parent===id);
    const childFiles = DB.assetFiles.filter(f=>f.folder===id);
    const hasContent = childFolders.length || childFiles.length;
    const desc = hasContent
      ? `该文件夹包含 <b>${childFolders.length}</b> 个子文件夹和 <b>${childFiles.length}</b> 个文件，删除后内容将无法恢复。`
      : `该文件夹为空，删除后无法恢复。`;
    this.modal(`
      <div class="modal-head">
        <div><h3>删除文件夹</h3><p>${node.name}</p></div>
        <div class="spacer"></div>
        <button class="icon-btn" onclick="App.closeModal()">${svg(I.x)}</button>
      </div>
      <div class="modal-body">
        <div style="display:flex;gap:14px;align-items:flex-start;padding:4px 0">
          <div style="width:40px;height:40px;border-radius:10px;background:#fef2f2;color:#ef4444;display:grid;place-items:center;flex-shrink:0">${svg(I.trash)}</div>
          <div>
            <div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:6px">确定要删除「${node.name}」吗？</div>
            <div style="font-size:13px;color:var(--text-2);line-height:1.6">${desc}</div>
          </div>
        </div>
      </div>
      <div class="modal-foot">
        <button class="btn btn-ghost" onclick="App.closeModal()">取消</button>
        <button class="btn btn-danger" onclick="App.confirmDeleteFolder('${id}')">${svg(I.trash)}确认删除</button>
      </div>`);
  },
  confirmDeleteFolder(id){
    const node = DB.assetTree.find(n=>n.id===id); if(!node) return;
    const removeTree = (pid)=>{
      DB.assetTree.filter(n=>n.parent===pid).forEach(n=>removeTree(n.id));
      DB.assetFiles = DB.assetFiles.filter(f=>f.folder!==pid);
      DB.assetTree = DB.assetTree.filter(n=>n.id!==pid);
    };
    removeTree(id);
    if(this.assetCur===id) this.assetCur = node.parent || 'root';
    this.closeModal();
    this.renderAssetTree(); this.renderAssetGrid();
    this.toast(`文件夹「${node.name}」已删除`);
  },

  /* ---------- 素材管理：新建文件夹 ---------- */
  openNewFolder(){
    const folderOpts = DB.assetTree.map(n=>`<option value="${n.id}"${n.id===this.assetCur?' selected':''}>${n.name}</option>`).join('');
    this.modal(`
      <div class="modal-head"><div><h3>新建文件夹</h3><p>在当前目录下创建子文件夹</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg('<path d="M18 6 6 18M6 6l12 12"/>')}</button></div>
      <div class="modal-body">
        <div class="field"><label>文件夹名称</label><input class="input" id="newFolderName" placeholder="如：Q3 推广素材"></div>
        <div class="field"><label>所属目录</label><select class="select" id="newFolderParent">${folderOpts}</select></div>
      </div>
      <div class="modal-foot"><button class="btn btn-ghost" onclick="App.closeModal()">取消</button><button class="btn btn-primary" onclick="App.submitNewFolder()">${svg(I.check)}创建</button></div>`);
  },
  submitNewFolder(){
    const name = (document.getElementById('newFolderName').value||'').trim();
    if(!name){ this.toast('请输入文件夹名称'); return; }
    const parent = document.getElementById('newFolderParent').value || 'root';
    const id = 'f-'+Date.now();
    DB.assetTree.push({id, name, parent});
    this.assetOpen[parent] = true;
    this.assetCur = id;
    this.save(); this.closeModal();
    this.renderAssetTree(); this.renderAssetGrid();
    document.querySelector('.page-head p').textContent = `创意素材文件夹与资源库 · 共 ${DB.assetFiles.length} 个文件`;
    this.toast(`文件夹「${name}」已创建`);
  },

  /* ---------- 素材管理：上传素材 ---------- */
  openUploadAsset(){
    this._uploadFiles = [];
    this._uploading = false;
    const folderOpts = DB.assetTree.map(n=>`<option value="${n.id}"${n.id===this.assetCur?' selected':''}>${n.name}</option>`).join('');
    this.modal(`
      <div class="modal-head"><div><h3>上传素材</h3><p>支持图片、视频等创意文件</p></div><div class="spacer"></div><button class="icon-btn" id="uploadCloseBtn" onclick="App.closeModal()">${svg('<path d="M18 6 6 18M6 6l12 12"/>')}</button></div>
      <div class="modal-body">
        <div class="field"><label>上传至文件夹</label><select class="select" id="uploadFolder">${folderOpts}</select></div>
        <div class="field"><label>选择文件</label>
          <div class="upload-drop" id="uploadDrop" onclick="document.getElementById('uploadFileInput').click()">
            <div class="upload-drop-ico">${svg(I.upload)}</div>
            <div class="upload-drop-text">点击选择文件，或拖拽到此区域</div>
            <div class="upload-drop-hint">支持 JPG / PNG / GIF / MP4，单文件 ≤ 50MB</div>
            <input type="file" id="uploadFileInput" hidden multiple accept="image/*,video/*" onchange="App.handleUploadFiles(this.files)">
          </div>
          <div class="upload-progress" id="uploadProgress" hidden>
            <div class="upload-progress-head"><span id="uploadProgressStatus">正在上传素材…</span><b id="uploadProgressPercent">0%</b></div>
            <div class="upload-progress-track"><div class="upload-progress-bar" id="uploadProgressBar"></div></div>
          </div>
          <div id="uploadFileList" class="upload-file-list"></div>
        </div>
      </div>
      <div class="modal-foot"><button class="btn btn-ghost" id="uploadCancelBtn" onclick="App.closeModal()">取消</button><button class="btn btn-primary" id="uploadSubmitBtn" onclick="App.submitUpload()">${svg(I.upload)}开始上传</button></div>`, true);
  },
  handleUploadFiles(files){
    this._uploadFiles = Array.from(files);
    const list = document.getElementById('uploadFileList');
    const progress = document.getElementById('uploadProgress');
    if(progress) progress.hidden = true;
    const bar = document.getElementById('uploadProgressBar'); if(bar) bar.style.width = '0%';
    const percent = document.getElementById('uploadProgressPercent'); if(percent) percent.textContent = '0%';
    if(!files.length){ list.innerHTML=''; return; }
    list.innerHTML = this._uploadFiles.map((f,i)=>{
      const sizeStr = f.size>=1048576 ? (f.size/1048576).toFixed(1)+' MB' : (f.size/1024).toFixed(0)+' KB';
      return `<div class="upload-file-row"><span class="upload-file-name">${f.name}</span><span class="cell-sub">${sizeStr}</span><button class="icon-btn btn-sm" onclick="App.removeUploadFile(${i})">${svg('<path d="M18 6 6 18M6 6l12 12"/>')}</button></div>`;
    }).join('');
  },
  removeUploadFile(i){
    this._uploadFiles.splice(i,1);
    this.handleUploadFiles(this._uploadFiles);
  },
  submitUpload(){
    const files = this._uploadFiles||[];
    if(!files.length){ this.toast('请选择要上传的文件'); return; }
    if(this._uploading) return;
    const folder = document.getElementById('uploadFolder').value || 'root';
    const typeMap = {'image/jpeg':'image','image/png':'image','image/gif':'image','video/mp4':'video'};
    const progress = document.getElementById('uploadProgress');
    const bar = document.getElementById('uploadProgressBar');
    const percent = document.getElementById('uploadProgressPercent');
    const status = document.getElementById('uploadProgressStatus');
    if(progress) progress.hidden = false;
    this._uploading = true;
    ['uploadSubmitBtn','uploadCancelBtn','uploadCloseBtn','uploadFileInput'].forEach(id=>{ const el=document.getElementById(id); if(el) el.disabled=true; });
    document.querySelectorAll('#uploadFileList button').forEach(btn=>btn.disabled=true);
    let value = 0;
    this._uploadTimer = setInterval(()=>{
      value = Math.min(100, value + Math.max(5, Math.round((100-value)*.22)));
      if(bar) bar.style.width = value+'%';
      if(percent) percent.textContent = value+'%';
      if(value<100) return;
      clearInterval(this._uploadTimer);
      if(status) status.textContent = '上传完成';
      setTimeout(()=>{
        files.forEach(f=>{
          const type = typeMap[f.type]||'image';
          DB.assetFiles.push({id:'F-'+Date.now()+Math.random().toString(36).slice(2,5), folder, name:f.name, type, size:f.size>=1048576?(f.size/1048576).toFixed(1)+' MB':(f.size/1024).toFixed(0)+' KB', dim:'—', updated:'2026-08-14', impressions:0, ctr:0, createdAt:'2026-08-14',reviewStatus:'unchecked',scenario:'user'});
        });
        this._uploadFiles = [];
        this._uploading = false;
        this.save(); this.closeModal();
        this.assetCur = folder; this.assetOpen[folder] = true;
        this.renderAssetTree(); this.renderAssetGrid();
        const pageSub = document.querySelector('.page-head p');
        if(pageSub) pageSub.textContent = `创意素材文件夹与资源库 · 共 ${DB.assetFiles.length} 个文件`;
        this.toast(`${files.length} 个文件已上传至素材库`);
      }, 350);
    }, 180);
  },

  /* ============ 数据报表 ============ */
  view_report(){
    return `
    <div class="page-head"><div><h1>数据报表</h1><p>2026-08-08 至 2026-08-14 · UTC</p></div><div class="spacer"></div>
      <div class="segment" id="repModeTabs" style="margin-right:10px">
        <button onclick="App.setRepMode(this,'cpd')">CPD</button>
        <button class="active" onclick="App.setRepMode(this,'rtb')">RTB</button>
      </div>
      <div class="segment" id="repRangeTabs">
        <button class="active" onclick="App.setRepRange(this,7)">近 7 天</button>
        <button onclick="App.setRepRange(this,14)">近 14 天</button>
        <button onclick="App.setRepRange(this,30)">近 30 天</button>
      </div>
    </div>
    <div class="grid cols-4" id="repKpis" style="margin-bottom:18px"></div>
    <div class="grid cols-3" style="margin-bottom:18px">
      <div class="card" style="grid-column:span 2"><div class="card-head"><h3 id="repTrendTitle">每日花费趋势</h3><div class="spacer"></div><span class="cell-sub rep-range-label">近 7 天</span></div><div class="card-pad"><div class="chart-box"><canvas id="repChart"></canvas></div></div></div>
      <div class="card"><div class="card-head"><h3 id="repInvTitle">流量类型花费</h3><div class="spacer"></div><span class="cell-sub rep-range-label">近 7 天</span></div><div class="card-pad"><div class="chart-box" style="height:200px"><canvas id="repInvChart"></canvas></div><div class="flex-col" style="gap:9px;margin-top:14px" id="repInvLegend"></div></div></div>
    </div>
    <div class="card"><div class="card-head"><h3 id="repTitle">按格式明细</h3><span class="badge gray rep-range-label">近 7 天</span><div class="spacer"></div>
      <select class="select" style="width:auto" id="repDimSel" onchange="App.repDim(this.value)">
        <option value="fmt" selected>按格式</option><option value="inv">按流量类型</option><option value="camp">按计划</option><option value="geo">按地区</option>
      </select>
      <button class="btn btn-ghost btn-sm" style="margin-left:8px" onclick="App.toast('CSV 已开始下载')">${svg(I.download)}导出</button></div>
      <div class="table-wrap" id="repBody"></div>
    </div>`;
  },
  setRepRange(btn,days){
    btn.parentNode.querySelectorAll('button').forEach(item=>item.classList.remove('active'));
    btn.classList.add('active');
    this.repDays=days;
    this.renderReportRange();
    this.toast(`已切换至近 ${days} 天`);
  },
  setRepMode(btn,mode){
    btn.parentNode.querySelectorAll('button').forEach(item=>item.classList.remove('active'));
    btn.classList.add('active');
    this.repMode=mode;
    this.renderReportRange();
    this.toast(`已切换至 ${mode==='all'?'全部投放':mode.toUpperCase()}`);
  },
  repCampaigns(){ return DB.campaigns.filter(c=>(this.repMode||'all')==='all' || c.mode===this.repMode); },
  repFactor(){ return ({7:1,14:1.96,30:4.25})[this.repDays||7]||1; },
  repRangeMeta(){
    const days=this.repDays||7;
    const factor=this.repFactor(), list=this.repCampaigns();
    const spend=list.reduce((s,c)=>s+(c.spend||0),0)*factor;
    const imps=Math.round(list.reduce((s,c)=>s+(c.imps||0),0)*factor);
    const clicks=Math.round(list.reduce((s,c)=>s+(c.clicks||0),0)*factor);
    return {start:{7:'2026-08-08',14:'2026-08-01',30:'2026-07-16'}[days],spend,imps,clicks,ctr:imps?(clicks/imps*100).toFixed(2)+'%':'0.00%'};
  },
  repTrendData(){
    const days=this.repDays||7, labels=[], spend=[];
    const pattern=[.82,.94,.88,1.06,.97,1.12,1.08,.91,1.03,.96,1.16,1.04,.89,1.09,.99];
    const exposure=(this.repMode||'all')==='cpd';
    const total=this.repCampaigns().reduce((s,c)=>s+(exposure?(c.imps||0):(c.spend||0)),0)*this.repFactor();
    const weights=Array.from({length:days},(_,i)=>pattern[i%pattern.length]);
    const weightSum=weights.reduce((s,v)=>s+v,0)||1;
    const end=new Date('2026-08-14T00:00:00');
    for(let i=days-1;i>=0;i--){
      const date=new Date(end); date.setDate(end.getDate()-i);
      labels.push(`${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`);
      const index=days-1-i;
      spend.push(Math.round(total*weights[index]/weightSum));
    }
    return {labels,spend};
  },
  renderReportRange(){
    const days=this.repDays||7, meta=this.repRangeMeta(), trend=this.repTrendData();
    const exposure=(this.repMode||'all')==='cpd';
    const sub=document.querySelector('.page-head p');
    if(sub) sub.textContent=`${meta.start} 至 2026-08-14 · UTC`;
    document.querySelectorAll('.rep-range-label').forEach(el=>el.textContent=`近 ${days} 天`);
    const kpis=exposure?[['总展示',fmtK(meta.imps)],['总点击量',fmtK(meta.clicks)],['平均 CTR',meta.ctr],['投放中计划',String(this.repCampaigns().filter(c=>c.status==='active').length)] ]:[['总花费',fmtMoney(meta.spend)],['总展示',fmtK(meta.imps)],['总点击量',fmtK(meta.clicks)],['平均 CTR',meta.ctr]];
    document.getElementById('repKpis').innerHTML=kpis.map(k=>`<div class="card kpi"><div class="kpi-label">${k[0]}（近${days}天）</div><div class="kpi-val" style="margin-top:6px">${k[1]}</div></div>`).join('');
    document.getElementById('repTrendTitle').textContent=exposure?'每日曝光趋势':'每日花费趋势';
    document.getElementById('repInvTitle').textContent=exposure?'流量类型曝光':'流量类型花费';
    this.mkChart('repChart','line',{labels:trend.labels,datasets:[{label:exposure?'曝光':'花费',data:trend.spend,borderColor:cssVar('--accent'),backgroundColor:'rgba(91,91,240,.1)',fill:true,tension:.4,borderWidth:2.5,pointRadius:days===30?2:3,pointBackgroundColor:cssVar('--accent')}]},{scales:{y:{grid:{color:cssVar('--grid')},ticks:{callback:v=>exposure?fmtK(v):'$'+v}},x:{grid:{display:false},ticks:{maxTicksLimit:days===30?10:14}}}});
    const a=this.invAgg(this.repFactor()), keys=Object.keys(INV), fc=keys.map(t=>INV[t].color);
    this.mkChart('repInvChart','doughnut',{labels:keys.map(t=>INV[t].name),datasets:[{data:keys.map(t=>exposure?a[t].imps:a[t].spend),backgroundColor:fc,borderWidth:0,cutout:'66%'}]});
    document.getElementById('repInvLegend').innerHTML=keys.map((t,i)=>`<div class="flex between"><span class="flex" style="gap:8px"><i style="width:10px;height:10px;border-radius:3px;background:${fc[i]}"></i>${INV[t].name}</span><b>${exposure?fmtK(a[t].imps):fmtMoney(a[t].spend)}</b></div>`).join('');
    this.repDim(document.getElementById('repDimSel')?.value||'fmt');
  },
  invAgg(factor=1){
    const a={web:{spend:0,imps:0,clicks:0,conv:0,n:0},app:{spend:0,imps:0,clicks:0,conv:0,n:0},h5:{spend:0,imps:0,clicks:0,conv:0,n:0}};
    this.repCampaigns().forEach(c=>{ const inv=c.inv||['web']; inv.forEach(t=>{ a[t].spend+=c.spend/inv.length*factor; a[t].imps+=c.imps/inv.length*factor; a[t].clicks+=c.clicks/inv.length*factor; a[t].conv+=c.conv/inv.length*factor; a[t].n++; }); });
    return a;
  },
  repDim(dim){
    let title, head, html;
    const factor=this.repFactor();
    if(dim==='inv'){
      title='按流量类型明细';
      head=`<th>流量类型</th><th class="num">展示</th><th class="num">点击</th><th class="num">CTR</th><th class="num">CPC</th><th class="num">CPM</th><th class="num">花费</th>`;
      const a=this.invAgg(factor);
      html=Object.keys(INV).map(t=>{ const S=INV[t], d=a[t]; const cpc=d.clicks?fmtMoney(d.spend/d.clicks):'$0.00'; const cpm=d.imps?fmtMoney(d.spend/d.imps*1000):'$0.00'; return `<tr><td class="cell-flex"><span class="row-ico" style="background:${S.bg};color:${S.color}">${svg(S.ico)}</span><div><div class="cell-main">${S.name}</div><div class="cell-sub">${d.n} 个活动</div></div></td><td class="num">${fmtNum(Math.round(d.imps))}</td><td class="num">${fmtNum(Math.round(d.clicks))}</td><td class="num">${d.imps?(d.clicks/d.imps*100).toFixed(2):'0.00'}%</td><td class="num">${cpc}</td><td class="num">${cpm}</td><td class="num cell-main">${fmtMoney(d.spend)}</td></tr>`; }).join('');
    } else if(dim==='camp'){
      title='按计划明细';
      head=`<th>活动</th><th class="num">展示</th><th class="num">点击</th><th class="num">CTR</th><th class="num">CPC</th><th class="num">CPM</th><th class="num">花费</th>`;
      html=this.repCampaigns().map(c=>{ const imps=Math.round(c.imps*factor),clicks=Math.round(c.clicks*factor),spend=c.spend*factor; const cpc=clicks?fmtMoney(spend/clicks):'$0.00'; const cpm=imps?fmtMoney(spend/imps*1000):'$0.00'; return `<tr><td><div class="cell-main">${c.name}</div><div class="cell-sub">${c.mode==='cpd'?'CPD 代投':'RTB 自助投放'}</div></td><td class="num">${fmtNum(imps)}</td><td class="num">${fmtNum(clicks)}</td><td class="num">${imps?(clicks/imps*100).toFixed(2):'0.00'}%</td><td class="num">${cpc}</td><td class="num">${cpm}</td><td class="num cell-main">${fmtMoney(spend)}</td></tr>`; }).join('');
    } else if(dim==='fmt'){
      title='按格式明细';
      head=`<th>格式</th><th class="num">展示</th><th class="num">点击</th><th class="num">CTR</th><th class="num">CPC</th><th class="num">CPM</th><th class="num">花费</th>`;
      const a={}; this.repCampaigns().forEach(c=>{ (a[c.fmt]=a[c.fmt]||{imps:0,clicks:0,spend:0}); a[c.fmt].imps+=c.imps*factor; a[c.fmt].clicks+=c.clicks*factor; a[c.fmt].spend+=c.spend*factor; });
      html=Object.keys(a).map(k=>{ const F=FMT[k], d=a[k]; const cpc=d.clicks?fmtMoney(d.spend/d.clicks):'$0.00'; const cpm=d.imps?fmtMoney(d.spend/d.imps*1000):'$0.00'; return `<tr><td class="cell-flex"><span class="row-ico" style="color:${F.color}">${svg(F.ico)}</span><span class="cell-main">${F.name.split(' ')[0]}</span></td><td class="num">${fmtNum(Math.round(d.imps))}</td><td class="num">${fmtNum(Math.round(d.clicks))}</td><td class="num">${d.imps?(d.clicks/d.imps*100).toFixed(2):'0.00'}%</td><td class="num">${cpc}</td><td class="num">${cpm}</td><td class="num cell-main">${fmtMoney(d.spend)}</td></tr>`; }).join('');
    } else {
      title='按地区明细';
      head=`<th>地区</th><th class="num">展示</th><th class="num">点击</th><th class="num">CTR</th><th class="num">CPC</th><th class="num">CPM</th><th class="num">花费</th>`;
      const geoAgg={};
      this.repCampaigns().forEach(c=>{
        const geos=(c.geo&&c.geo.length?c.geo:['🌍 全部']);
        geos.forEach(geo=>{
          const row=geoAgg[geo]||(geoAgg[geo]={imps:0,clicks:0,spend:0});
          row.imps+=(c.imps||0)/geos.length*factor;row.clicks+=(c.clicks||0)/geos.length*factor;row.spend+=(c.spend||0)/geos.length*factor;
        });
      });
      const rows=Object.entries(geoAgg).map(([geo,row])=>[geo,Math.round(row.imps),Math.round(row.clicks),row.spend]);
      html=rows.map(r=>{ const cpc=r[2]?fmtMoney(r[3]/r[2]):'$0.00'; const cpm=r[1]?fmtMoney(r[3]/r[1]*1000):'$0.00'; return `<tr><td class="cell-main">${r[0]}</td><td class="num">${fmtNum(r[1])}</td><td class="num">${fmtNum(r[2])}</td><td class="num">${(r[2]/r[1]*100).toFixed(2)}%</td><td class="num">${cpc}</td><td class="num">${cpm}</td><td class="num cell-main">${fmtMoney(r[3])}</td></tr>`; }).join('');
    }
    document.getElementById('repTitle').textContent=title;
    document.getElementById('repBody').innerHTML=`<table><thead><tr>${head}</tr></thead><tbody>${html}</tbody></table>`;
  },
  after_report(){
    this.repDays=7;
    this.repMode='rtb';
    this.renderReportRange();
  },

  /* ============ 充值账单 ============ */
  view_billing(){
    return `
    <div class="page-head"><div><h1>财务与账单</h1><p>充值申请审核通过后计入可用余额</p></div></div>
    <div class="grid cols-3" style="margin-bottom:18px">
      <div class="card kpi" style="background:linear-gradient(135deg,var(--accent),var(--accent-strong));color:#fff;border:none">
        <div class="kpi-label" style="color:rgba(255,255,255,.8)">账户余额</div>
        <div class="kpi-val" style="margin:8px 0 14px">${fmtMoney(DB.balance)}</div>
        <button class="btn" style="background:#fff;color:var(--accent-strong)" onclick="App.openDeposit()">${svg(I.plus)}充值</button>
      </div>
      <div class="card kpi"><div class="kpi-label">本月消耗</div><div class="kpi-val" style="margin-top:6px">$6,120.60</div><div class="kpi-foot"><span>预算利用率 76%</span></div></div>
      <div class="card kpi"><div class="kpi-label">日均消耗</div><div class="kpi-val" style="margin-top:6px">$1,210.30</div><div class="kpi-foot"><span>预计可投 6 天</span></div></div>
    </div>
    <div class="card"><div class="card-head"><h3>充值账单</h3><div class="spacer"></div>
        <select class="select" id="billStatusFilter" style="width:120px;margin-right:8px" onchange="App.renderBilling()">
          <option value="">全部状态</option>
          <option value="pending">待审核</option>
          <option value="approved">已通过</option>
          <option value="rejected">已驳回</option>
        </select>
        <input class="input" id="billSearch" style="width:160px" placeholder="搜索流水 ID" oninput="App.renderBilling()">
      </div>
      <div class="table-wrap"><table><thead><tr><th>日期</th><th>流水 ID</th><th class="num">金额</th><th>订单状态</th><th class="act">操作</th></tr></thead>
        <tbody id="billBody"></tbody>
      </table></div>
    </div>`;
  },
  after_billing(){ this.renderBilling(); },
  renderBilling(){
    const stEl = document.getElementById('billStatusFilter');
    const srEl = document.getElementById('billSearch');
    const stF = stEl ? stEl.value : '';
    const kw = srEl ? srEl.value.trim().toLowerCase() : '';
    const badge = s => s==='approved'?'<span class="badge green">已通过</span>':s==='pending'?'<span class="badge amber">待审核</span>':'<span class="badge red">已驳回</span>';
    const rows = DB.recharges
      .filter(r=>!stF || r.status===stF)
      .filter(r=>!kw || r.id.toLowerCase().includes(kw))
      .map(r=>`<tr>
        <td class="mono cell-sub">${r.date}</td>
        <td class="mono cell-main">${r.id}</td>
        <td class="num cell-main">${fmtMoney(r.amount)}</td>
        <td>${badge(r.status)}</td>
        <td class="act"><div class="t-actions">${r.shot||r.status==='rejected'
          ? `<button class="btn btn-subtle btn-sm" onclick="App.viewShot('${r.id}')">${svg(I.eye)}查看</button>`
          : (r.status==='cancelled'?'<span class="cell-sub">—</span>':`<button class="btn btn-primary btn-sm" onclick="App.uploadShot('${r.id}')">${svg(I.plus)}上传截图</button>`)
        }</div></td>
      </tr>`).join('') || `<tr><td colspan="5"><div class="empty">暂无匹配记录</div></td></tr>`;
    document.getElementById('billBody').innerHTML = rows;
  },
  uploadShot(id){
    const r = DB.recharges.find(x=>x.id===id); if(!r) return;
    this.pendingBillShot=null;
    this.modal(`
      <div class="modal-head"><div><h3>上传付款截图</h3><p>${r.id} · ${fmtMoney(r.amount)}</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg('<path d="M18 6 6 18M6 6l12 12"/>')}</button></div>
      <div class="modal-body">
        <input type="file" id="billShotFile" accept="image/jpeg,image/png" style="display:none" onchange="App.previewBillingShot(this)">
        <div class="upload-drop" id="billShotDrop" onclick="document.getElementById('billShotFile').click()"><span class="up-ico">${svg(I.upload)}</span><div><b>点击选择付款截图</b><div class="cell-sub">支持 JPG / PNG，单文件 ≤ 10 MB</div></div></div>
        <div id="billShotPreview" style="display:none;margin-top:14px"></div>
      </div>
      <div class="modal-foot"><button class="btn btn-ghost" onclick="App.closeModal()">取消</button><button class="btn btn-primary" onclick="App.confirmShot('${r.id}')">${svg(I.check)}确认上传</button></div>`);
  },
  previewBillingShot(input){
    const file=input.files?.[0]; if(!file) return;
    if(!/^image\/(jpeg|png)$/.test(file.type)){ this.toast('仅支持 JPG / PNG 图片','info'); input.value=''; return; }
    if(file.size>10*1024*1024){ this.toast('截图大小不能超过 10 MB','info'); input.value=''; return; }
    const reader=new FileReader();
    reader.onload=()=>{
      this.pendingBillShot={name:file.name,data:reader.result};
      const box=document.getElementById('billShotPreview');
      if(box){ box.style.display='block'; box.innerHTML=`<div class="card card-pad"><img src="${reader.result}" alt="付款截图" style="display:block;width:100%;max-height:280px;object-fit:contain;border-radius:10px;background:var(--surface-2)"><div class="cell-sub" style="margin-top:10px">${this.accountEsc(file.name)}</div></div>`; }
    };
    reader.readAsDataURL(file);
  },
  confirmShot(id){
    const r = DB.recharges.find(x=>x.id===id); if(!r) return;
    if(!this.pendingBillShot){ this.toast('请先选择付款截图','info'); return; }
    r.shot = this.pendingBillShot.name;
    r.shotData = this.pendingBillShot.data;
    const wasRejected=r.status==='rejected';
    r.status='pending';
    r.reviewOpinion=wasRejected?'付款凭证已重新提交，等待平台审核':'付款凭证已提交，等待平台审核';
    r.reviewTime='—';
    this.pendingBillShot=null;
    this.save(); this.closeModal(); this.go('billing'); this.toast('付款截图已上传');
  },
  viewShot(id){
    const r = DB.recharges.find(x=>x.id===id); if(!r) return;
    const statusMap={pending:['amber','待审核'],approved:['green','已通过'],rejected:['red','已驳回'],cancelled:['gray','已取消']};
    const status=statusMap[r.status]||['gray',r.status||'—'];
    const esc=v=>this.accountEsc(v||'—');
    const shotLink=r.shot
      ? `<button class="btn btn-subtle" style="width:100%;justify-content:flex-start;padding:12px 14px" onclick="App.previewBillShot('${r.id}')"><span style="width:22px;height:22px">${svg(I.image)}</span><span style="flex:1;text-align:left">${esc(r.shot)}</span>${svg(I.eye)}</button>`
      : `<div style="padding:16px;border-radius:12px;background:var(--surface-2);border:1px dashed var(--border-strong);color:var(--text-3);text-align:center">暂无付款截图</div>`;
    this.modal(`
      <div class="modal-head"><div><h3>充值账单详情</h3><p>${esc(r.id)}</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg('<path d="M18 6 6 18M6 6l12 12"/>')}</button></div>
      <div class="modal-body">
        <div class="card" style="box-shadow:none"><div class="card-pad">
          <div class="kv-row"><span class="kv-k">流水 ID</span><span class="kv-v mono">${esc(r.id)}</span></div>
          <div class="kv-row"><span class="kv-k">提交时间</span><span class="kv-v">${esc(r.date)}</span></div>
          <div class="kv-row"><span class="kv-k">充值金额</span><span class="kv-v" style="font-weight:700">${fmtMoney(r.amount)}</span></div>
          <div class="kv-row"><span class="kv-k">支付方式</span><span class="kv-v">${esc(r.method||'USDT')}</span></div>
          <div class="kv-row"><span class="kv-k">支付网络</span><span class="kv-v">${esc(r.network||'TRC20')}</span></div>
          <div class="kv-row"><span class="kv-k">订单状态</span><span class="kv-v"><span class="badge ${status[0]}">${status[1]}</span></span></div>
          <div class="kv-row"><span class="kv-k">审核时间</span><span class="kv-v">${esc(r.reviewTime)}</span></div>
        </div></div>
        <div class="form-section-title" style="margin-top:18px">付款截图</div>
        ${shotLink}
        <div class="form-section-title" style="margin-top:18px">审核意见</div>
        <div style="padding:14px 16px;border:1px solid var(--border);border-radius:12px;background:var(--surface-2);line-height:1.7">${esc(r.reviewOpinion||'等待平台审核，暂无审核意见')}</div>
      </div>
      <div class="modal-foot"><button class="btn btn-ghost" onclick="App.closeModal()">关闭</button><div class="spacer"></div>${r.status==='pending'&&this.isDemoMode()?`<button class="btn btn-subtle" onclick="App.demoReviewRecharge('${r.id}','rejected')">模拟驳回</button><button class="btn btn-primary" onclick="App.demoReviewRecharge('${r.id}','approved')">模拟通过</button>`:r.status==='rejected'?`<button class="btn btn-primary" onclick="App.uploadShot('${r.id}')">${svg(I.upload)}重新上传截图</button>`:''}</div>`,true);
  },
  previewBillShot(id){
    const r=DB.recharges.find(x=>x.id===id); if(!r||!r.shot) return;
    const esc=v=>this.accountEsc(v||'—');
    const preview=r.shotData
      ? `<img src="${r.shotData}" alt="${esc(r.shot)}" style="display:block;width:100%;max-height:520px;object-fit:contain;border-radius:12px;background:var(--surface-2)">`
      : `<div style="height:380px;border-radius:12px;background:linear-gradient(145deg,#f8fafc,#e9eef5);border:1px solid var(--border);display:grid;place-items:center;color:var(--text-3)"><div style="text-align:center"><div style="width:64px;height:64px;margin:0 auto">${svg(I.image,1.4)}</div><div style="margin-top:12px;font-weight:600">${esc(r.shot)}</div><div class="cell-sub">付款截图预览</div></div></div>`;
    this.modal(`
      <div class="modal-head"><div><h3>付款截图预览</h3><p>${esc(r.shot)}</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.viewShot('${r.id}')">${svg('<path d="M18 6 6 18M6 6l12 12"/>')}</button></div>
      <div class="modal-body">${preview}</div>
      <div class="modal-foot"><button class="btn btn-ghost" onclick="App.viewShot('${r.id}')">返回账单详情</button></div>`,true);
  },
  openDeposit(){
    const addr = 'TXmHt0pAds9aQv7kLpZ3rN8sUuonusdtTRC20';
    this.modal(`
      <div class="modal-head"><div><h3>USDT 充值</h3><p>当前余额 ${fmtMoney(DB.balance)} · 仅支持 USDT (TRC20)</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg('<path d="M18 6 6 18M6 6l12 12"/>')}</button></div>
      <div class="modal-body">
        <div class="field"><label>充值金额</label>
          <div class="chips" style="gap:8px;margin-bottom:10px">${[100,300,500,1000,3000].map((v,i)=>`<button class="choice ${i===2?'sel':''}" style="width:auto;padding:8px 16px" onclick="App.pickAmt(this,${v})"><b>$${v}</b></button>`).join('')}</div>
          <div class="inline-prefix"><span class="pfx">$</span><input class="input" id="depAmt" value="500" style="padding-left:24px"></div>
        </div>
        <div class="deposit-pay">
          <div class="pay-qr">${this.qrSVG(addr)}<div class="cell-sub" style="text-align:center;margin-top:8px">扫码向该地址转账 USDT</div></div>
          <div class="pay-info">
            <div class="field" style="margin-bottom:12px"><label>充值币种</label>
              <div class="card card-pad flex between" style="background:var(--surface-2);align-items:center;padding:12px 14px">
                <div class="flex" style="align-items:center;gap:10px"><span style="font-size:20px">💲</span><div><b>USDT</b><br><small class="muted">TRC20 网络</small></div></div>
                <span class="badge green">唯一币种</span>
              </div>
            </div>
            <div class="field" style="margin-bottom:12px"><label>收款钱包地址</label>
              <div class="flex" style="gap:8px"><input class="input mono" id="depAddr" value="${addr}" readonly style="font-size:12px"><button class="btn btn-subtle btn-sm" onclick="App.copy('${addr}',this)">${svg(I.copy)}</button></div>
            </div>
            <div class="hint">最低充值 $50 · 0 手续费 · 转账后约 5 分钟到账，请务必使用 TRC20 网络</div>
          </div>
        </div>
      </div>
      <div class="modal-foot"><button class="btn btn-ghost" onclick="App.closeModal()">取消</button><button class="btn btn-primary" onclick="App.doDeposit()">${svg(I.check)}我已转账，确认充值</button></div>`, true);
  },
  // 生成占位二维码（确定性图案）
  qrSVG(seed){
    const N=21, cell=8, pad=10, size=N*cell+pad*2;
    let h=0; for(let i=0;i<seed.length;i++) h=(h*31+seed.charCodeAt(i))>>>0;
    let rects='';
    const finder=(x,y)=>{ let r=''; for(let i=0;i<7;i++)for(let j=0;j<7;j++){ const edge=i===0||i===6||j===0||j===6, core=i>=2&&i<=4&&j>=2&&j<=4; if(edge||core) r+=`<rect x="${pad+(x+i)*cell}" y="${pad+(y+j)*cell}" width="${cell}" height="${cell}"/>`; } return r; };
    for(let y=0;y<N;y++)for(let x=0;x<N;x++){
      const inFinder=(x<7&&y<7)||(x>=N-7&&y<7)||(x<7&&y>=N-7);
      if(inFinder) continue;
      h=(h*1103515245+12345)>>>0;
      if((h>>>16&1)) rects+=`<rect x="${pad+x*cell}" y="${pad+y*cell}" width="${cell}" height="${cell}"/>`;
    }
    rects+=finder(0,0)+finder(N-7,0)+finder(0,N-7);
    return `<svg width="160" height="160" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="#fff"/><g fill="#0f1b2d">${rects}</g></svg>`;
  },
  doDeposit(){
    const v=parseFloat(document.getElementById('depAmt').value)||0;
    if(v<50){ this.toast('最低充值 $50','info'); return; }
    const id='RC-'+Date.now().toString().slice(-7);
    DB.recharges.unshift({id,date:new Date().toLocaleString('zh-CN',{hour12:false}),amount:v,method:'USDT',network:'TRC20',status:'pending',shot:'demo-payment.png',reviewOpinion:'充值申请已提交，等待平台审核；审核通过后余额才会增加。',reviewTime:'—',scenario:'user'});
    DB.auditLogs.unshift({id:'LOG-'+Date.now(),time:new Date().toLocaleString('zh-CN',{hour12:false}),actor:'演示用户',action:'提交充值申请',target:id,result:'待审核'});
    this.save();
    this.closeModal(); this.go('billing'); this.toast(`充值申请已提交，${fmtMoney(v)} 待审核`);
  },
  demoReviewRecharge(id,result){
    const r=DB.recharges.find(x=>x.id===id);if(!r||r.status!=='pending')return;
    r.status=result;r.reviewTime=new Date().toLocaleString('zh-CN',{hour12:false});
    if(result==='approved'){
      r.reviewOpinion='付款凭证核验通过，充值金额已到账';
      DB.balance+=r.amount;
      DB.txns.unshift({id:'TX-'+Date.now(),date:r.reviewTime,type:'充值',method:`${r.id} · USDT TRC20`,amount:r.amount,scenario:'user'});
    }else r.reviewOpinion='付款凭证信息不完整，请重新上传包含交易哈希的完整截图';
    DB.auditLogs.unshift({id:'LOG-'+Date.now(),time:r.reviewTime,actor:'演示审核员',action:result==='approved'?'通过充值申请':'驳回充值申请',target:r.id,result:result==='approved'?'已到账':'已驳回'});
    this.save();document.getElementById('balTop').textContent=fmtMoney(DB.balance);this.closeModal();this.go('billing');this.toast(result==='approved'?`充值已到账 +${fmtMoney(r.amount)}`:'充值申请已驳回','info');
  },

  /* ============ 设置 ============ */
  view_settings(){
    return `
    <div class="page-head"><div><h1>账户设置</h1><p>基本信息、角色配置与账号管理</p></div></div>
    <div class="segment" id="setTabs" style="margin-bottom:18px">
      ${[['basic','基本信息'],['roles','角色配置'],['accounts','账号配置'],['audit','操作日志'],['security','安全设置']].map((t,i)=>`<button class="${i===0?'active':''}" onclick="App.setSettingsTab(this,'${t[0]}')">${t[1]}</button>`).join('')}
    </div>
    <div id="setContent"></div>`;
  },
  after_settings(){ this.setTab = this.setTab || 'basic'; this.renderSetTab(this.setTab); },
  setSettingsTab(btn, tab){
    btn.parentNode.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    this.renderSetTab(tab);
  },
  renderSetTab(tab){
    this.setTab = tab;
    document.getElementById('setContent').innerHTML =
      tab==='roles' ? this.setView_roles() :
      tab==='accounts' ? this.setView_accounts() :
      tab==='audit' ? this.setView_audit() :
      tab==='security' ? this.setView_security() :
      this.setView_basic();
    if(tab==='accounts') this.renderAccounts();
  },
  setView_basic(){
    const P = DB.profile;
    const LANGS = [['zh-CN','简体中文'],['zh-TW','繁體中文'],['en','English'],['es','Español'],['id','Bahasa Indonesia'],['ru','Русский']];
    const SKINS = ['#5b5bf0','#1f9d76','#2f6fed','#0ea5a3','#d99a00','#e0584b','#8b5cf6','#0f1b2d'];
    return `
    <div class="card" style="margin-bottom:18px">
      <div class="card-head"><h3>基本信息</h3><div class="spacer"></div><span class="cell-sub">白标品牌配置</span></div>
      <div class="card-pad">
        <div class="input-row">
          <div class="field"><label>公司名称</label><input class="input" id="bCompany" value="${P.company}"></div>
          <div class="field"><label>语言</label><select class="select" id="bLang">${LANGS.map(l=>`<option value="${l[0]}" ${P.lang===l[0]?'selected':''}>${l[1]}</option>`).join('')}</select></div>
        </div>
        <div class="field"><label>Logo 上传</label>
          <div class="logo-up">
            <div class="logo-preview" id="bLogoPrev">${P.logo?`<img src="${P.logo}" alt="logo">`:'54'}</div>
            <div>
              <input type="file" id="bLogoFile" accept="image/*" style="display:none" onchange="App.uploadLogo(this)">
              <button class="btn btn-ghost btn-sm" onclick="document.getElementById('bLogoFile').click()">${svg(I.plus)}上传图片</button>
              <button class="btn btn-subtle btn-sm" onclick="App.removeLogo()">移除</button>
              <div class="cell-sub" style="margin-top:7px">建议 1:1 方形 PNG / JPG，小于 1MB</div>
            </div>
          </div>
        </div>
        <div class="field"><label>系统皮肤颜色</label>
          <div class="skin-row" id="bSkins">
            ${SKINS.map(c=>`<button class="skin-dot ${c.toLowerCase()===(P.accent||'').toLowerCase()?'sel':''}" style="background:${c}" title="${c}" onclick="App.pickSkin('${c}',this)"></button>`).join('')}
            <label class="skin-custom" title="自定义颜色">${svg(I.edit)}<input type="color" value="${P.accent}" onchange="App.pickSkin(this.value)"></label>
          </div>
          <div class="cell-sub" style="margin-top:8px">主色将应用于按钮、图表、导航等全局元素</div>
        </div>
        <button class="btn btn-primary" onclick="App.saveBasic()">${svg(I.check)}保存基本信息</button>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><h3>企业资料</h3></div>
      <div class="card-pad">
        <div class="input-row"><div class="field"><label>联系人</label><input class="input" value="Victor Wang"></div><div class="field"><label>广告主 ID</label><input class="input mono" value="70285" readonly></div></div>
        <div class="input-row"><div class="field"><label>邮箱</label><input class="input" value="victor@mail.com"></div><div class="field"><label>时区</label><select class="select"><option>UTC+08:00 北京</option><option selected>UTC+00:00</option><option>UTC-05:00 纽约</option></select></div></div>
        <button class="btn btn-primary" onclick="App.toast('资料已保存')">${svg(I.check)}保存</button>
        <div class="divider" style="margin:18px 0"></div>
        <div class="flex between"><div><b>重置演示数据</b><div class="cell-sub">清除本地保存的活动 / 余额改动</div></div><button class="btn btn-danger btn-sm" onclick="App.resetData()">${svg('<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>')}重置</button></div>
      </div>
    </div>`;
  },
  /* ---------- 角色配置 / 账号配置 ---------- */
  setView_roles(){
    const count = id => { const r=DB.roles.find(x=>x.id===id); return DB.accounts.filter(a=>a.role===(r&&r.name)).length; };
    return `
    <div class="card">
      <div class="card-head"><h3>角色配置（RBAC）</h3><div class="spacer"></div><button class="btn btn-primary btn-sm" onclick="App.openRole()">${svg(I.plus)}新建角色</button></div>
      <div class="card-pad flex-col" style="gap:12px">
        ${DB.roles.map(r=>`
          <div class="role-card">
            <div class="flex between">
              <div><b style="font-size:14px">${r.name}</b> <span class="badge gray">${count(r.id)} 名成员</span><div class="cell-sub" style="margin-top:3px">${r.desc}</div></div>
              <button class="icon-btn btn-sm" title="编辑" onclick="App.openRole('${r.id}')">${svg(I.edit)}</button>
            </div>
            <div class="perm-tags">${r.perms.map(p=>`<span class="badge blue">${p}</span>`).join('')}</div>
          </div>`).join('')}
      </div>
    </div>`;
  },
  setView_security(){
    return `
    <div class="card set-form">
      <div class="card-head"><h3>修改密码</h3><div class="spacer"></div><span class="cell-sub">当前账号：victor</span></div>
      <div class="card-pad">
        <div class="field"><label>当前密码</label><input class="input" id="pw-old" type="password" placeholder="输入当前登录密码"></div>
        <div class="field"><label>新密码</label><input class="input" id="pw-new" type="password" placeholder="8 位以上，含字母与数字"></div>
        <div class="field"><label>确认新密码</label><input class="input" id="pw-confirm" type="password" placeholder="再次输入新密码"></div>
        <div class="cell-sub" style="margin-bottom:14px">密码须至少 8 位，包含大小写字母及数字</div>
        <div class="flex"><div class="spacer"></div><button class="btn btn-primary" onclick="App.submitChangePwd()">${svg(I.check)}确认修改</button></div>
      </div>
    </div>`;
  },
  setView_audit(){
    return `<div class="card"><div class="card-head"><div><h3>操作日志</h3><div class="cell-sub">关键投放、创意、财务与权限操作均可追溯</div></div><div class="spacer"></div><span class="badge blue">${DB.auditLogs.length} 条记录</span></div><div class="table-wrap"><table><thead><tr><th>时间</th><th>操作人</th><th>操作</th><th>对象</th><th>结果</th></tr></thead><tbody>${DB.auditLogs.map(log=>`<tr><td class="mono cell-sub">${log.time}</td><td>${log.actor}</td><td><b>${log.action}</b></td><td class="mono">${log.target}</td><td><span class="badge ${/成功|通过|到账|投放中/.test(log.result)?'green':/驳回|失败/.test(log.result)?'red':'amber'}">${log.result}</span></td></tr>`).join('')||'<tr><td colspan="5"><div class="empty">暂无操作记录</div></td></tr>'}</tbody></table></div></div>`;
  },
  submitChangePwd(){
    const oldPw = document.getElementById('pw-old').value;
    const newPw = document.getElementById('pw-new').value;
    const confirm = document.getElementById('pw-confirm').value;
    if(!oldPw){ this.toast('请输入当前密码'); return; }
    if(newPw.length < 8){ this.toast('新密码至少 8 位'); return; }
    if(!/[a-zA-Z]/.test(newPw) || !/[0-9]/.test(newPw)){ this.toast('新密码须同时包含字母与数字'); return; }
    if(newPw !== confirm){ this.toast('两次输入的新密码不一致'); return; }
    document.getElementById('pw-old').value = '';
    document.getElementById('pw-new').value = '';
    document.getElementById('pw-confirm').value = '';
    this.toast('密码已修改成功');
  },
  setView_accounts(){
    this.orgSel = this.orgSel || ORG.name;
    return `
    <div class="org-layout">
      <aside class="card org-tree"><div class="card-head"><h3>公司目录</h3></div>
        <div class="card-pad">${this.renderOrgNode(ORG)}</div>
      </aside>
      <div class="card">
        <div class="card-head"><h3 id="acctScope">${this.orgSel}</h3><div class="spacer"></div><button class="btn btn-primary btn-sm" onclick="App.openAccount()">${svg(I.plus)}新建账号</button></div>
        <div class="table-wrap"><table>
          <thead><tr><th>用户名</th><th>角色</th><th>岗位类型</th><th>状态</th><th>创建时间</th><th class="act">操作</th></tr></thead>
          <tbody id="acctBody"></tbody>
        </table></div>
      </div>
    </div>`;
  },
  renderOrgNode(node, depth=0){
    const leaf = !node.children;
    const sel = node.name===this.orgSel ? ' sel' : '';
    const row = `<div class="org-node${sel}" style="padding-left:${depth*16+10}px" onclick="App.orgPick('${node.name}')">${svg(leaf?'<circle cx="12" cy="12" r="3"/>':'<path d="M3 7h6l2 2h10v9a2 2 0 0 1-2 2H3z"/>')}<span>${node.name}</span></div>`;
    const kids = node.children ? node.children.map(c=>this.renderOrgNode(c, depth+1)).join('') : '';
    return row + kids;
  },
  orgPick(name){
    this.orgSel = name;
    document.querySelectorAll('.org-node').forEach(n=>n.classList.toggle('sel', n.textContent.trim()===name));
    const sc = document.getElementById('acctScope'); if(sc) sc.textContent = name;
    this.renderAccounts();
  },
  findOrg(node, name){
    if(node.name===name) return node;
    if(!node.children) return null;
    for(const c of node.children){ const f=this.findOrg(c,name); if(f) return f; }
    return null;
  },
  renderAccounts(){
    const node = this.findOrg(ORG, this.orgSel) || ORG;
    const leaves = orgLeaves(node);
    const rows = DB.accounts.filter(a=>leaves.includes(a.dept));
    const st = s => s==='active'
      ? '<span class="badge green"><span class="dot-status green"></span>启用</span>'
      : '<span class="badge gray"><span class="dot-status gray"></span>禁用</span>';
    document.getElementById('acctBody').innerHTML = rows.map(a=>`
      <tr><td class="cell-main">${a.user}</td><td><span class="badge blue">${a.role}</span></td><td>${a.post}</td><td>${st(a.status)}</td><td class="mono cell-sub">${a.created}</td>
      <td class="act"><div class="t-actions"><button class="icon-btn btn-sm" title="编辑" onclick="App.openAccount('${a.user}')">${svg(I.edit)}</button></div></td></tr>`).join('')
      || `<tr><td colspan="6"><div class="empty">${svg(I.cog)}<div>该部门下暂无账号</div></div></td></tr>`;
  },
  openRole(id){
    const ALL = ['仪表盘','广告计划','广告创意','数据报表','数据报表(只读)','充值账单','成员管理','角色配置'];
    const r = id ? DB.roles.find(x=>x.id===id) : {id:'', name:'', desc:'', perms:[]};
    this.modal(`
      <div class="modal-head"><div><h3>${id?'编辑角色':'新建角色'}</h3><p>RBAC 权限分配</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg('<path d="M18 6 6 18M6 6l12 12"/>')}</button></div>
      <div class="modal-body">
        <input type="hidden" id="rId" value="${r.id}">
        <div class="field"><label>角色名称</label><input class="input" id="rName" value="${r.name}"></div>
        <div class="field"><label>角色说明</label><input class="input" id="rDesc" value="${r.desc}"></div>
        <div class="field" style="margin-bottom:0"><label>权限</label>
          <div class="export-cols">${ALL.map(p=>`<label class="check-pill"><input type="checkbox" class="permChk" value="${p}" ${r.perms.includes(p)?'checked':''}> ${p}</label>`).join('')}</div>
        </div>
      </div>
      <div class="modal-foot"><button class="btn btn-ghost" onclick="App.closeModal()">取消</button><button class="btn btn-primary" onclick="App.saveRole()">${svg(I.check)}保存</button></div>`, true);
  },
  saveRole(){
    const id = document.getElementById('rId').value;
    const name = (document.getElementById('rName').value||'').trim(); if(!name){ this.toast('请填写角色名称','info'); return; }
    const desc = (document.getElementById('rDesc').value||'').trim();
    const perms = [...document.querySelectorAll('.permChk:checked')].map(c=>c.value);
    if(id){ const r=DB.roles.find(x=>x.id===id); Object.assign(r,{name,desc,perms}); }
    else DB.roles.push({id:'r'+Date.now(), name, desc, perms});
    this.save(); this.closeModal(); this.renderSetTab('roles'); this.toast('角色已保存');
  },
  openAccount(user){
    if(!user){
      const dept=(this.orgSel&&this.findOrg(ORG,this.orgSel)&&!this.findOrg(ORG,this.orgSel).children)?this.orgSel:'品牌广告部';
      this.accountWiz={step:1,role:DB.roles[1]?.name||DB.roles[0]?.name||'',post:'普通岗',dept,status:'active',name:'',user:`dsp.user${DB.accounts.length+1}`,email:'',telegram:'',pwd:this.accountGenPwd(),sendMail:true};
      this.renderAccountWiz(); return;
    }
    const a = user ? DB.accounts.find(x=>x.user===user) : {user:'', role:DB.roles[1].name, post:'普通岗', status:'active', dept:(this.orgSel&&this.findOrg(ORG,this.orgSel)&&!this.findOrg(ORG,this.orgSel).children)?this.orgSel:'品牌广告部'};
    this.modal(`
      <div class="modal-head"><div><h3>${user?'编辑账号':'新建账号'}</h3><p>分配角色、岗位与部门</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg('<path d="M18 6 6 18M6 6l12 12"/>')}</button></div>
      <div class="modal-body">
        <input type="hidden" id="aUserOld" value="${user||''}">
        <div class="field"><label>用户名</label><input class="input" id="aUser" value="${a.user}" ${user?'readonly':''}></div>
        <div class="input-row">
          <div class="field"><label>邮箱 <span class="req">*</span></label><input class="input" type="email" id="aEmail" value="${this.accountEsc(a.email||'')}" placeholder="name@company.com"></div>
          <div class="field"><label>Telegram 账号</label><input class="input" id="aTelegram" value="${this.accountEsc(a.telegram||'')}" placeholder="如：@username"></div>
        </div>
        <div class="input-row">
          <div class="field"><label>角色</label><select class="select" id="aRole">${DB.roles.map(r=>`<option ${r.name===a.role?'selected':''}>${r.name}</option>`).join('')}</select></div>
          <div class="field"><label>岗位类型</label><select class="select" id="aPost">${['管理岗','普通岗'].map(p=>`<option ${p===a.post?'selected':''}>${p}</option>`).join('')}</select></div>
        </div>
        <div class="input-row">
          <div class="field"><label>所属部门</label><select class="select" id="aDept">${orgDeptOptions(a.dept)}</select></div>
          <div class="field"><label>状态</label><select class="select" id="aStatus"><option value="active" ${a.status==='active'?'selected':''}>启用</option><option value="paused" ${a.status!=='active'?'selected':''}>禁用</option></select></div>
        </div>
      </div>
      <div class="modal-foot"><button class="btn btn-ghost" onclick="App.closeModal()">取消</button><button class="btn btn-primary" onclick="App.saveAccount()">${svg(I.check)}保存</button></div>`, true);
  },
  accountGenPwd(){ const chars='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'; return Array.from({length:10},()=>chars[Math.floor(Math.random()*chars.length)]).join(''); },
  accountEsc(v){ return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); },
  accountWizBody(){
    const w=this.accountWiz, esc=v=>this.accountEsc(v);
    if(w.step===1) return `<div class="form-section"><div class="doc-note">配置账号的角色、岗位、部门和初始状态。</div>
      <div class="input-row"><div class="field"><label>角色 <span class="req">*</span></label><select class="select" id="awRole">${DB.roles.map(r=>`<option ${r.name===w.role?'selected':''}>${r.name}</option>`).join('')}</select></div><div class="field"><label>岗位类型 <span class="req">*</span></label><select class="select" id="awPost">${['管理岗','普通岗'].map(p=>`<option ${p===w.post?'selected':''}>${p}</option>`).join('')}</select></div></div>
      <div class="input-row"><div class="field"><label>所属部门 <span class="req">*</span></label><select class="select" id="awDept">${orgDeptOptions(w.dept)}</select></div><div class="field"><label>状态</label><select class="select" id="awStatus"><option value="active" ${w.status==='active'?'selected':''}>启用</option><option value="paused" ${w.status!=='active'?'selected':''}>禁用</option></select></div></div>
    </div>`;
    if(w.step===2) return `<div class="form-section"><div class="doc-note">系统已生成管理员登录信息。请确认账号和临时密码，首次登录后应及时修改密码。</div>
      <div class="field"><label>用户名 <span class="req">*</span></label><input class="input" id="awName" value="${esc(w.name)}" placeholder="请输入管理员用户名"></div>
      <div class="field"><label>登录账号 <span class="req">*</span></label><div class="input-row"><input class="input mono" id="awUser" value="${esc(w.user)}"><button class="btn btn-subtle" onclick="App.regenAccountUser()">重新生成</button></div></div>
      <div class="field"><label>邮箱 <span class="req">*</span></label><input class="input" id="awEmail" value="${esc(w.email)}" placeholder="name@company.com"></div>
      <div class="field"><label>Telegram 账号</label><input class="input" id="awTelegram" value="${esc(w.telegram)}" placeholder="如：@username"></div>
      <div class="field"><label>临时密码 <span class="req">*</span></label><div class="input-row"><input class="input mono" id="awPwd" value="${esc(w.pwd)}" readonly><button class="btn btn-subtle" onclick="App.copy(document.getElementById('awPwd').value,this)">${svg(I.copy)}复制</button><button class="btn btn-subtle" onclick="App.regenAccountPwd()">重新生成</button></div></div>
      <div class="switch-row"><div><b>发送开通邮件</b><div class="cell-sub">账号、临时密码与安全提示将发送至邮箱</div></div><label class="switch"><input type="checkbox" id="awMail" ${w.sendMail?'checked':''}><span></span></label></div>
    </div>`;
    return `<div class="form-section"><div style="display:flex;gap:14px;padding:16px;border:1px solid rgba(217,154,0,.28);border-radius:12px;background:rgba(217,154,0,.08)"><span style="width:40px;height:40px;display:grid;place-items:center;flex-shrink:0;border-radius:10px;background:rgba(217,154,0,.14);color:var(--warning)">${svg('<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>')}</span><div><b>请确认开通信息</b><div class="cell-sub" style="margin-top:6px;line-height:1.7">确认后账号将立即创建并获得对应角色权限，请仔细核对登录账号、邮箱和权限信息。</div></div></div>
      <div class="card" style="box-shadow:none"><div class="card-pad"><div class="kv-row"><span class="kv-k">角色</span><span class="kv-v">${esc(w.role)}</span></div><div class="kv-row"><span class="kv-k">岗位类型</span><span class="kv-v">${esc(w.post)}</span></div><div class="kv-row"><span class="kv-k">所属部门</span><span class="kv-v">${esc(w.dept)}</span></div><div class="kv-row"><span class="kv-k">账号状态</span><span class="kv-v">${w.status==='active'?'启用':'禁用'}</span></div><div class="kv-row"><span class="kv-k">用户名</span><span class="kv-v">${esc(w.name)}</span></div><div class="kv-row"><span class="kv-k">登录账号</span><span class="kv-v mono">${esc(w.user)}</span></div><div class="kv-row"><span class="kv-k">邮箱</span><span class="kv-v">${esc(w.email)}</span></div><div class="kv-row"><span class="kv-k">Telegram 账号</span><span class="kv-v">${esc(w.telegram||'—')}</span></div><div class="kv-row"><span class="kv-k">临时密码</span><span class="kv-v mono">${esc(w.pwd)}</span></div><div class="kv-row"><span class="kv-k">开通邮件</span><span class="kv-v">${w.sendMail?'开通后发送':'不发送'}</span></div></div></div>
    </div>`;
  },
  renderAccountWiz(){
    const w=this.accountWiz, steps=['基本信息','管理员信息','开通确认'];
    this.modal(`<div class="modal-head"><div><h3>新建账号</h3><p>第 ${w.step} / 3 步 · ${steps[w.step-1]}</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg('<path d="M18 6 6 18M6 6l12 12"/>')}</button></div>
      <div class="steps" style="padding:0 24px;margin:18px 0 4px">${steps.map((s,i)=>{const n=i+1;return `<div class="step ${n<w.step?'done':''} ${n===w.step?'active':''}"><span class="s-num">${n<w.step?svg(I.check):n}</span><span class="s-label">${s}</span>${n<3?'<span class="s-line"></span>':''}</div>`;}).join('')}</div><div class="modal-body">${this.accountWizBody()}</div>
      <div class="modal-foot">${w.step===1?'<button class="btn btn-ghost" onclick="App.closeModal()">取消</button>':'<button class="btn btn-ghost" onclick="App.accountWizNav(-1)">上一步</button>'}<div class="spacer"></div>${w.step<3?`<button class="btn btn-primary" onclick="App.accountWizNav(1)">下一步</button>`:`<button class="btn btn-primary" onclick="App.saveNewAccountWiz()">${svg(I.check)}确认开通</button>`}</div>`,true);
  },
  readAccountWiz(){ const w=this.accountWiz;if(w.step===1){w.role=document.getElementById('awRole').value;w.post=document.getElementById('awPost').value;w.dept=document.getElementById('awDept').value;w.status=document.getElementById('awStatus').value;}else if(w.step===2){w.name=(document.getElementById('awName')?.value||'').trim();w.user=(document.getElementById('awUser').value||'').trim();w.email=(document.getElementById('awEmail').value||'').trim();w.telegram=(document.getElementById('awTelegram')?.value||'').trim();w.pwd=(document.getElementById('awPwd').value||'').trim();w.sendMail=!!document.getElementById('awMail').checked;} },
  accountWizNav(d){ this.readAccountWiz();const w=this.accountWiz;if(d>0&&w.step===2){if(!w.name||!w.user||!w.email||!w.pwd){this.toast('请完善管理员登录信息','info');return;}if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(w.email)){this.toast('邮箱格式不正确','info');return;}if(DB.accounts.some(a=>a.user===w.user)){this.toast('该登录账号已存在','info');return;}}w.step=Math.max(1,Math.min(3,w.step+d));this.renderAccountWiz(); },
  regenAccountUser(){ this.accountWiz.user=`dsp.user${DB.accounts.length+1}`;const el=document.getElementById('awUser');if(el)el.value=this.accountWiz.user; },
  regenAccountPwd(){ this.accountWiz.pwd=this.accountGenPwd();const el=document.getElementById('awPwd');if(el)el.value=this.accountWiz.pwd; },
  saveNewAccountWiz(){ const w=this.accountWiz;if(DB.accounts.some(a=>a.user===w.user)){this.toast('该登录账号已存在','info');return;}DB.accounts.unshift({name:w.name,user:w.user,role:w.role,post:w.post,dept:w.dept,status:w.status,email:w.email,telegram:w.telegram,tempPwd:w.pwd,mailSent:w.sendMail,created:'2026-07-15'});this.save();this.closeModal();this.renderAccounts();this.toast(w.sendMail?'账号已开通，登录信息邮件已发送':'账号已开通'); },
  saveAccount(){
    const old = document.getElementById('aUserOld').value;
    const user = (document.getElementById('aUser').value||'').trim(); if(!user){ this.toast('请填写用户名','info'); return; }
    const email=(document.getElementById('aEmail')?.value||'').trim();
    const telegram=(document.getElementById('aTelegram')?.value||'').trim();
    if(!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ this.toast('请填写有效邮箱','info'); return; }
    const data = {user,email,telegram,role:document.getElementById('aRole').value, post:document.getElementById('aPost').value, dept:document.getElementById('aDept').value, status:document.getElementById('aStatus').value};
    if(old){ const a=DB.accounts.find(x=>x.user===old); Object.assign(a, data); }
    else DB.accounts.unshift(Object.assign({created:'2026-06-22'}, data));
    this.save(); this.closeModal(); this.renderAccounts(); this.toast('账号已保存');
  },

  /* ---------- 基本信息 / 白标品牌 ---------- */
  uploadLogo(input){
    const f = input.files && input.files[0]; if(!f) return;
    if(f.size > 1024*1024){ this.toast('图片过大，请小于 1MB','info'); input.value=''; return; }
    const rd = new FileReader();
    rd.onload = e => {
      DB.profile.logo = e.target.result; this.save();
      if(window.Branding) Branding.apply(DB.profile);
      const prev = document.getElementById('bLogoPrev'); if(prev) prev.innerHTML = `<img src="${DB.profile.logo}" alt="logo">`;
      this.toast('Logo 已更新');
    };
    rd.readAsDataURL(f);
  },
  removeLogo(){
    DB.profile.logo = ''; this.save();
    if(window.Branding) Branding.apply(DB.profile);
    const prev = document.getElementById('bLogoPrev'); if(prev) prev.textContent = '54';
    this.toast('已移除 Logo');
  },
  pickSkin(color, el){
    DB.profile.accent = color; this.save();
    if(window.Branding) Branding.apply(DB.profile);
    document.querySelectorAll('#bSkins .skin-dot').forEach(d=>d.classList.toggle('sel', d.title.toLowerCase()===color.toLowerCase()));
    if(this['after_'+this.cur]) this['after_'+this.cur]();
    this.toast('皮肤颜色已应用');
  },
  saveBasic(){
    DB.profile.company = (document.getElementById('bCompany').value||'').trim() || '54Ads';
    DB.profile.lang = document.getElementById('bLang').value;
    this.save();
    if(window.Branding) Branding.apply(DB.profile);
    this.toast('基本信息已保存');
  },
};

document.addEventListener('DOMContentLoaded', ()=>App.init());
