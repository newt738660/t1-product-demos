const applications=[
  {id:'AR-20260828-018',kind:'开户申请',applicant:'Alex Chen',company:'Nova Games Studio',contact:'alex@example.com',time:'2026-08-28 08:04',status:'待我处理',sales:'陈敏',industry:'游戏 / 应用',site:'https://novagames.example',note:'计划在 T1 开展海外应用推广，希望创建新的广告主。'},
  {id:'AR-20260828-015',kind:'开户申请',applicant:'Mia Zhou',company:'Pine Mobile',contact:'mia@pinemobile.example',time:'2026-08-28 07:38',status:'待我处理',sales:'林晓',industry:'工具 / 应用',site:'https://pinemobile.example',note:'新客户，已与销售沟通开户。'},
  {id:'AR-20260827-109',kind:'开户申请',applicant:'Leo Wang',company:'Arcade Sprint',contact:'leo@arcadesprint.example',time:'2026-08-27 22:11',status:'待补充',sales:'陈敏',industry:'游戏 / 应用',site:'—',note:'需要补充产品官网和原对接商务。'},
  {id:'BR-20260828-006',kind:'绑定申请',applicant:'Ivy Lin',company:'Blue Ocean Network',contact:'ivy@blueocean.example',time:'2026-08-28 08:21',status:'待我处理',sales:'陈敏',industry:'电商',site:'https://blueocean.example',note:'历史客户，申请加入已有广告主。'},
  {id:'BR-20260827-082',kind:'绑定申请',applicant:'Ryan Xu',company:'Orchid Commerce',contact:'ryan@orchid.example',time:'2026-08-27 19:46',status:'待我处理',sales:'王诚',industry:'电商',site:'https://orchid.example',note:'客户称此前由品牌业务部对接。'},
  {id:'BR-20260826-043',kind:'绑定申请',applicant:'Nina Gao',company:'River Play',contact:'nina@riverplay.example',time:'2026-08-26 14:23',status:'已通过',sales:'林晓',industry:'游戏',site:'https://riverplay.example',note:'已绑定 ADV-00018372。'}
];
const advertisers=[
  {id:'ADV-00023891',name:'Blue Ocean Network',sales:'陈敏',dept:'品牌业务部',status:'正常'},
  {id:'ADV-00019782',name:'Orchid Commerce',sales:'王诚',dept:'品牌业务部',status:'正常'},
  {id:'ADV-00018372',name:'River Play',sales:'林晓',dept:'海外商业部',status:'正常'},
  {id:'ADV-00017432',name:'Cosmo Labs',sales:'王诚',dept:'渠道业务部',status:'正常'}
];
const app=document.querySelector('#app');
const modalRoot=document.querySelector('#modalRoot');
let state={view:'review',reviewType:'开户申请',reviewScope:'待我处理',selected:null};
const statusClass=s=>({'待我处理':'warning','待补充':'info','已通过':'success','已驳回':'danger','正常':'success'}[s]||'neutral');
const statusHtml=s=>`<span class="status ${statusClass(s)}">${s}</span>`;

function render(){
  app.innerHTML=state.view==='review'?reviewList():state.view==='detail'?reviewDetail(state.selected):advertiserList();
  bind();
}

function reviewList(){
  const count=kind=>applications.filter(a=>a.kind===kind&&a.status==='待我处理').length;
  const rows=applications.filter(a=>a.kind===state.reviewType&&(state.reviewScope==='全部申请'||a.status==='待我处理'));
  return `<div class="page-head"><div class="page-title"><h1>广告主审核</h1><p>处理 T1 用户提交的开户与广告主绑定申请</p></div></div>
  <div class="review-type-tabs"><button class="review-type-tab ${state.reviewType==='开户申请'?'active':''}" data-type="开户申请">开户申请 <span class="mini-count">${count('开户申请')}</span></button><button class="review-type-tab ${state.reviewType==='绑定申请'?'active':''}" data-type="绑定申请">绑定申请 <span class="mini-count">${count('绑定申请')}</span></button></div>
  <section class="card filter-card"><div class="filters" style="grid-template-columns:1.3fr .8fr .8fr auto"><div class="field"><label>申请人 / 广告主</label><input class="input" placeholder="姓名、公司名称或申请 ID"></div><div class="field"><label>提交时间</label><select class="select"><option>近 30 天</option><option>近 7 天</option></select></div><div class="field"><label>归属销售</label><select class="select"><option>全部</option><option>陈敏</option><option>林晓</option></select></div><div class="filter-actions"><button class="btn primary">查询</button><button class="btn">重置</button></div></div></section>
  <section class="card list-card"><div class="review-subtabs"><button class="review-subtab ${state.reviewScope==='待我处理'?'active':''}" data-scope="待我处理">待我处理 <span class="mini-count">${count(state.reviewType)}</span></button><button class="review-subtab ${state.reviewScope==='全部申请'?'active':''}" data-scope="全部申请">全部申请</button></div><div class="table-wrap"><table><thead><tr><th>申请 ID</th><th>申请人</th><th>申请广告主</th><th>联系方式</th><th>归属销售</th><th>提交时间</th><th>状态</th><th>操作</th></tr></thead><tbody>${rows.map(a=>`<tr><td class="id-text">${a.id}</td><td>${a.applicant}</td><td><strong>${a.company}</strong></td><td>${a.contact}</td><td>${a.sales}</td><td>${a.time}</td><td>${statusHtml(a.status)}</td><td><button class="btn link" data-app="${a.id}">${a.status==='待我处理'?'处理':'查看'}</button></td></tr>`).join('')}</tbody></table></div><div class="pagination"><span>共 ${rows.length} 条</span><button class="page-btn">‹</button><button class="page-btn active">1</button><button class="page-btn">›</button></div></section>`;
}

function reviewDetail(a){
  const opening=a.kind==='开户申请';
  return `<button class="back-link" data-action="back">← 返回${a.kind}</button><div class="page-head"><div class="page-title"><h1>处理${a.kind}</h1><p>${a.id} · 提交于 ${a.time}</p></div></div><div class="review-detail"><div class="card tab-content"><div class="section"><div class="section-title">申请人信息</div><div class="contact-box"><span class="contact-avatar">${a.applicant[0]}</span><div><strong>${a.applicant}</strong><span>${a.contact}</span></div></div><div class="info-grid"><div class="info-item"><span>申请广告主</span><strong>${a.company}</strong></div><div class="info-item"><span>所属行业</span><strong>${a.industry}</strong></div><div class="info-item"><span>产品 / 官网</span><strong>${a.site}</strong></div><div class="info-item"><span>对接销售</span><strong>${a.sales}</strong></div><div class="info-item"><span>申请类型</span><strong>${a.kind}</strong></div><div class="info-item"><span>当前状态</span><strong>${statusHtml(a.status)}</strong></div></div></div><div class="section"><div class="section-title">客户说明</div><div class="result-note">${a.note}</div></div><div class="section"><div class="section-title">核验提醒</div><div class="warning-box">${opening?'请联系客户确认 SSP 中不存在可复用的广告主。通过后，系统将创建广告主并完成 T1 绑定。':'请核验申请人身份，并选择一个明确的 SSP Advertiser ID。不得仅按广告主名称自动绑定。'}</div></div></div><aside class="card review-side decision-card"><h3>${opening?'开户处理':'绑定处理'}</h3><p>${opening?'确认客户为新客户后，通过并创建 SSP 广告主。':'确认客户身份后，选择需要绑定的 SSP 广告主。'}</p>${opening?`<div class="field" style="margin-bottom:12px"><label>所属部门</label><select class="select"><option>海外商业部</option><option>品牌业务部</option></select></div><div class="field" style="margin-bottom:16px"><label>归属销售</label><select class="select"><option>${a.sales}</option><option>陈敏</option><option>林晓</option></select></div>`:`<div class="field" style="margin-bottom:16px"><label>选择 SSP 广告主</label><select class="select"><option>请选择明确的广告主</option>${advertisers.map(x=>`<option>${x.name} · ${x.id}</option>`).join('')}</select><p class="helper">确认名称与 Advertiser ID 后完成绑定。</p></div>`}<div class="decision-actions"><button class="btn primary" data-decision="approve">${opening?'通过并创建广告主':'确认绑定'}</button><button class="btn" data-decision="supplement">要求补充资料</button><button class="btn" data-decision="reject">驳回申请</button></div></aside></div>`;
}

function advertiserList(){
  return `<div class="page-head"><div class="page-title"><h1>广告主管理</h1><p>管理已创建的广告主档案、账户与归属关系</p></div><div class="head-actions"><button class="btn">⚙ 自定义列</button><button class="btn primary">＋ 创建广告主</button></div></div><section class="card filter-card"><div class="filters" style="grid-template-columns:1.5fr 1fr 1fr auto"><div class="field"><label>广告主</label><input class="input" placeholder="名称或 Advertiser ID"></div><div class="field"><label>归属销售</label><select class="select"><option>全部</option></select></div><div class="field"><label>状态</label><select class="select"><option>全部</option><option>正常</option></select></div><div class="filter-actions"><button class="btn primary">查询</button><button class="btn">重置</button></div></div></section><section class="card list-card"><div class="list-toolbar"><strong>广告主列表</strong><span class="count">共 ${advertisers.length} 条</span></div><div class="table-wrap"><table><thead><tr><th>广告主名称</th><th>SSP Advertiser ID</th><th>所属部门</th><th>归属销售</th><th>状态</th><th>操作</th></tr></thead><tbody>${advertisers.map(a=>`<tr><td><button class="name-link">${a.name}</button></td><td class="id-text">${a.id}</td><td>${a.dept}</td><td>${a.sales}</td><td>${statusHtml(a.status)}</td><td><div class="row-actions"><button>编辑</button><button>查看广告</button><button class="more">更多⌄</button></div></td></tr>`).join('')}</tbody></table></div></section>`;
}

function bind(){
  document.querySelectorAll('[data-nav]').forEach(el=>el.addEventListener('click',()=>{state.view=el.dataset.nav==='review'?'review':'advertisers';syncNav();render()}));
  document.querySelectorAll('[data-type]').forEach(el=>el.addEventListener('click',()=>{state.reviewType=el.dataset.type;state.reviewScope='待我处理';render()}));
  document.querySelectorAll('[data-scope]').forEach(el=>el.addEventListener('click',()=>{state.reviewScope=el.dataset.scope;render()}));
  document.querySelectorAll('[data-app]').forEach(el=>el.addEventListener('click',()=>{state.selected=applications.find(a=>a.id===el.dataset.app);state.view='detail';render();scrollTo(0,0)}));
  document.querySelector('[data-action="back"]')?.addEventListener('click',()=>{state.view='review';render()});
  document.querySelectorAll('[data-decision]').forEach(el=>el.addEventListener('click',()=>decisionModal(el.dataset.decision,state.selected)));
}
function syncNav(){document.querySelectorAll('[data-nav]').forEach(x=>x.classList.toggle('active',x.dataset.nav===(state.view==='advertisers'?'advertisers':'review')))}
function decisionModal(decision,a){
  const approve=a.kind==='开户申请'?{title:'通过并创建广告主',desc:'系统将创建 SSP 广告主、绑定 T1 用户并自动回传结果。',submit:'确认创建并绑定'}:{title:'确认广告主绑定',desc:'系统将把该 T1 用户绑定至选定的 SSP 广告主。',submit:'确认绑定'};
  const data={approve,supplement:{title:'要求补充资料',desc:'请说明需要客户补充的内容，T1 将通知申请人。',submit:'发送补充要求'},reject:{title:'驳回申请',desc:'申请结束后不会创建或绑定广告主，请填写明确原因。',submit:'确认驳回'}}[decision];
  modalRoot.innerHTML=`<div class="modal-mask"><div class="modal" style="max-width:480px"><div class="modal-head"><h3>${data.title}</h3><button class="modal-close">×</button></div><div class="modal-body"><div class="${decision==='reject'?'warning-box':'result-note'}">${data.desc}</div>${decision!=='approve'?'<div class="field"><label>说明 *</label><textarea class="textarea" placeholder="请输入具体说明"></textarea></div>':''}</div><div class="modal-foot"><button class="btn modal-cancel">取消</button><button class="btn ${decision==='reject'?'danger':'primary'} modal-submit">${data.submit}</button></div></div></div>`;
  document.querySelector('.modal-close').onclick=closeModal;document.querySelector('.modal-cancel').onclick=closeModal;document.querySelector('.modal-submit').onclick=()=>{closeModal();toast('处理结果已提交，系统将自动同步至 T1');state.view='review';render()};document.querySelector('.modal-mask').onclick=e=>{if(e.target.classList.contains('modal-mask'))closeModal()};
}
function closeModal(){modalRoot.innerHTML=''}
function toast(text){document.querySelector('#toastRoot').innerHTML=`<div class="toast">${text}</div>`;setTimeout(()=>document.querySelector('#toastRoot').innerHTML='',2200)}
render();
