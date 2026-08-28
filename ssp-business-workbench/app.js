const advertisers = [
  {id:'ADV-202608280018',t1:'T1-ADV-00841',name:'Nova Games Studio',source:'T1',type:'新建广告主',status:'待人工处理',sales:'陈敏',dept:'海外商业部',time:'2026-08-28 08:04',reason:'检测到 2 个名称相近的广告主'},
  {id:'ADV-202608270122',t1:'T1-ADV-00832',name:'Mori Mobile',source:'T1',type:'新建广告主',status:'同步成功',sales:'林晓',dept:'海外商业部',time:'2026-08-27 22:13'},
  {id:'ADV-00023891',t1:'T1-ADV-00817',name:'Blue Ocean Network',source:'T1',type:'关联已有广告主',status:'待补充资料',sales:'陈敏',dept:'品牌业务部',time:'2026-08-27 18:41',reason:'请补充历史合同或原对接商务'},
  {id:'ADV-00017432',t1:'—',name:'Cosmo Labs',source:'SSP 本地',type:'本地创建',status:'—',sales:'王诚',dept:'渠道业务部',time:'2026-08-26 16:20'},
  {id:'ADV-202608260053',t1:'T1-ADV-00796',name:'Arcade Sprint Ltd.',source:'T1',type:'新建广告主',status:'同步失败',sales:'林晓',dept:'海外商业部',time:'2026-08-26 11:07',reason:'T1 结果回传超时；SSP 广告主已创建'},
  {id:'ADV-00019782',t1:'T1-ADV-00775',name:'Orchid Commerce',source:'T1',type:'关联已有广告主',status:'同步成功',sales:'陈敏',dept:'品牌业务部',time:'2026-08-25 17:36'},
  {id:'ADV-00020561',t1:'—',name:'GoPeak Technology',source:'SSP 本地',type:'本地创建',status:'—',sales:'王诚',dept:'渠道业务部',time:'2026-08-24 09:55'},
  {id:'ADV-202608230009',t1:'T1-ADV-00731',name:'River Play',source:'T1',type:'新建广告主',status:'已驳回',sales:'林晓',dept:'海外商业部',time:'2026-08-23 14:22',reason:'客户主体信息无法完成核验'}
];

const app = document.querySelector('#app');
const modalRoot = document.querySelector('#modalRoot');
let state = {view:'list', selected:null, tab:'basic', source:'全部', status:'全部', type:'全部', query:''};

const statusClass = s => ({'同步成功':'success','待人工处理':'warning','待补充资料':'warning','同步失败':'danger','已驳回':'danger','自动处理中':'info'}[s] || 'neutral');
const statusHtml = s => s === '—' ? '<span class="id-text">—</span>' : `<span class="status ${statusClass(s)}">${s}</span>`;

function render(){
  app.innerHTML = state.view === 'list' ? listView() : detailView(state.selected);
  bindEvents();
}

function listView(){
  const filtered = advertisers.filter(a =>
    (state.source==='全部'||a.source===state.source) &&
    (state.status==='全部'||a.status===state.status) &&
    (state.type==='全部'||a.type===state.type) &&
    (!state.query || `${a.name}${a.id}${a.t1}`.toLowerCase().includes(state.query.toLowerCase()))
  );
  return `
    <div class="page-head">
      <div class="page-title"><h1>广告主管理</h1><p>管理广告主档案、账户归属及 T1 开户同步</p></div>
      <div class="head-actions"><button class="btn">⚙ <span>自定义列</span></button><button class="btn primary" data-action="create">＋ 创建广告主</button></div>
    </div>
    <section class="card filter-card">
      <div class="filters">
        <div class="field"><label>广告主</label><input id="query" class="input" value="${state.query}" placeholder="名称 / SSP ID / T1 ID" /></div>
        <div class="field"><label>来源</label><select id="source" class="select"><option>全部</option><option>T1</option><option>SSP 本地</option></select></div>
        <div class="field"><label>同步状态</label><select id="status" class="select"><option>全部</option><option>待人工处理</option><option>待补充资料</option><option>同步成功</option><option>同步失败</option><option>已驳回</option></select></div>
        <div class="field"><label>申请类型</label><select id="type" class="select"><option>全部</option><option>新建广告主</option><option>关联已有广告主</option><option>本地创建</option></select></div>
        <div class="filter-actions"><button class="btn primary" data-action="search">查询</button><button class="btn" data-action="reset">重置</button></div>
      </div>
    </section>
    <section class="card list-card">
      <div class="list-toolbar"><strong>广告主列表</strong><span class="count">共 ${filtered.length} 条</span><div class="toolbar-spacer"></div><span class="status warning">3 条待处理</span></div>
      <div class="table-wrap"><table>
        <thead><tr><th>广告主名称</th><th>SSP Advertiser ID</th><th>来源</th><th>申请类型</th><th>T1 同步状态</th><th>归属销售</th><th>所属部门</th><th>最近同步时间</th><th>操作</th></tr></thead>
        <tbody>${filtered.map(a=>`<tr><td><button class="name-link" data-id="${a.id}">${a.name}</button></td><td class="id-text">${a.id}</td><td>${a.source}</td><td>${a.type}</td><td>${statusHtml(a.status)}</td><td>${a.sales}</td><td>${a.dept}</td><td>${a.time}</td><td><div class="row-actions"><button data-id="${a.id}">查看详情</button><button data-action="ads">查看广告</button><button class="more" data-action="more">更多⌄</button></div></td></tr>`).join('')}</tbody>
      </table></div>
      <div class="pagination"><span>共 ${filtered.length} 条</span><button class="page-btn">‹</button><button class="page-btn active">1</button><button class="page-btn">›</button></div>
    </section>`;
}

function detailView(a){
  const isT1 = a.source === 'T1';
  return `
    <div class="breadcrumb"><button data-action="back">广告主管理</button><span>/</span><span>${a.name}</span></div>
    <div class="page-head">
      <div class="page-title"><h1>${a.name}</h1><p>${a.id} · ${a.source}</p></div>
      <div class="head-actions"><button class="btn" data-action="ads">查看广告</button><button class="btn">编辑基础资料</button>${isT1 && a.status!=='同步成功' ? '<button class="btn primary" data-action="process">处理申请</button>':''}</div>
    </div>
    <section class="card summary-strip">
      <div class="summary-item"><span>广告主状态</span><strong class="status success">正常</strong></div>
      <div class="summary-item"><span>来源</span><strong>${a.source}</strong></div>
      <div class="summary-item"><span>T1 同步状态</span><strong>${statusHtml(a.status)}</strong></div>
      <div class="summary-item"><span>最近同步时间</span><strong>${a.time}</strong></div>
    </section>
    <section class="card">
      <div class="tabs">
        <button class="tab ${state.tab==='basic'?'active':''}" data-tab="basic">基本信息</button>
        <button class="tab ${state.tab==='sync'?'active':''}" data-tab="sync">开户与同步${isT1&&a.status!=='同步成功'?'<sup class="danger-text"> ●</sup>':''}</button>
        <button class="tab ${state.tab==='logs'?'active':''}" data-tab="logs">操作记录</button>
        <button class="tab ${state.tab==='ads'?'active':''}" data-tab="ads">关联广告</button>
      </div>
      <div class="tab-content">${tabContent(a)}</div>
    </section>`;
}

function tabContent(a){
  if(state.tab==='basic') return `<div class="section"><div class="section-title">广告主档案</div><div class="info-grid">
    <div class="info-item"><span>广告主名称</span><strong>${a.name}</strong></div><div class="info-item"><span>SSP Advertiser ID</span><strong class="id-text">${a.id}</strong></div><div class="info-item"><span>T1 Advertiser ID</span><strong class="id-text">${a.t1}</strong></div>
    <div class="info-item"><span>来源</span><strong>${a.source}</strong></div><div class="info-item"><span>所属部门</span><strong>${a.dept}</strong></div><div class="info-item"><span>归属销售</span><strong>${a.sales}</strong></div>
    <div class="info-item"><span>联系方式</span><strong>contact@example.com</strong></div><div class="info-item"><span>广告主状态</span><strong>正常</strong></div><div class="info-item"><span>创建时间</span><strong>2026-08-27 21:58:33</strong></div>
  </div></div><div class="warning-box">T1 Advertiser ID、来源及双端映射属于系统字段，不通过“编辑基础资料”修改。</div>`;
  if(state.tab==='sync') return syncTab(a);
  if(state.tab==='logs') return `<div class="section"><div class="section-title">操作记录</div><div class="timeline">
    <div class="timeline-item"><span class="timeline-dot"></span><h4>进入人工处理队列 <span class="timeline-time">2026-08-28 08:04:31</span></h4><p>系统 · 检测到 2 个名称相近的广告主，暂停自动建档。</p></div>
    <div class="timeline-item"><span class="timeline-dot"></span><h4>自动校验完成 <span class="timeline-time">2026-08-28 08:04:28</span></h4><p>系统 · 必填资料完整，内部归属已匹配。</p></div>
    <div class="timeline-item"><span class="timeline-dot"></span><h4>接收 T1 开户申请 <span class="timeline-time">2026-08-28 08:04:26</span></h4><p>请求 ID：REQ-T1-20260828-00841 · 新建广告主</p></div>
  </div></div>`;
  return `<div class="section"><div class="section-title">关联广告</div><div class="empty"><div><div class="empty-icon">▤</div><div>此处复用现有广告管理列表，并自动带入广告主筛选条件</div><p class="helper">不会复制另一套 Campaign—Ad Group—Creative 数据。</p><button class="btn primary" data-action="ads">进入广告管理</button></div></div></div>`;
}

function syncTab(a){
  const banner = a.status==='同步成功' ? `<div class="sync-banner" style="background:#f1fbf6;border-color:#bfe9d4"><span class="banner-icon">✓</span><div><strong>同步已完成</strong><p>SSP 广告主已创建并成功返回 T1，双端映射有效。</p></div></div>` : `<div class="sync-banner"><span class="banner-icon">⚠</span><div><strong>${a.status}</strong><p>${a.reason||'该申请需要商务运营处理。'}</p></div><div class="detail-actions">${a.status==='同步失败'?'<button class="btn primary" data-action="retry">重新回传</button>':'<button class="btn primary" data-action="process">处理申请</button>'}</div></div>`;
  return `${banner}<div class="section"><div class="section-title">申请信息</div><div class="info-grid">
    <div class="info-item"><span>申请类型</span><strong>${a.type}</strong></div><div class="info-item"><span>T1 业务请求 ID</span><strong class="id-text">REQ-T1-20260828-00841</strong></div><div class="info-item"><span>T1 Advertiser ID</span><strong class="id-text">${a.t1}</strong></div>
    <div class="info-item"><span>客户主体名称</span><strong>${a.name} Limited</strong></div><div class="info-item"><span>产品 / 官网</span><strong>https://example.com</strong></div><div class="info-item"><span>行业</span><strong>游戏 / 应用</strong></div>
    <div class="info-item"><span>联系人</span><strong>Alex Chen</strong></div><div class="info-item"><span>联系邮箱</span><strong>alex@example.com</strong></div><div class="info-item"><span>提交时间</span><strong>2026-08-28 08:04:26</strong></div>
  </div></div><div class="section"><div class="section-title">同步结果</div><div class="info-grid">
    <div class="info-item"><span>当前状态</span><strong>${statusHtml(a.status)}</strong></div><div class="info-item"><span>SSP Advertiser ID</span><strong class="id-text">${a.id}</strong></div><div class="info-item"><span>处理人</span><strong>${a.status==='同步成功'?'系统自动处理':'—'}</strong></div>
    <div class="info-item"><span>最近同步时间</span><strong>${a.time}</strong></div><div class="info-item"><span>失败代码</span><strong>${a.status==='同步失败'?'CALLBACK_TIMEOUT':'—'}</strong></div><div class="info-item"><span>失败原因</span><strong>${a.reason||'—'}</strong></div>
  </div></div>`;
}

function bindEvents(){
  document.querySelectorAll('[data-id]').forEach(el=>el.addEventListener('click',()=>{state.selected=advertisers.find(a=>a.id===el.dataset.id);state.view='detail';state.tab='basic';render();window.scrollTo(0,0)}));
  document.querySelectorAll('[data-tab]').forEach(el=>el.addEventListener('click',()=>{state.tab=el.dataset.tab;render()}));
  document.querySelector('[data-action="back"]')?.addEventListener('click',()=>{state.view='list';render()});
  document.querySelector('[data-action="search"]')?.addEventListener('click',()=>{state.query=document.querySelector('#query').value;state.source=document.querySelector('#source').value;state.status=document.querySelector('#status').value;state.type=document.querySelector('#type').value;render()});
  document.querySelector('[data-action="reset"]')?.addEventListener('click',()=>{state={...state,source:'全部',status:'全部',type:'全部',query:''};render()});
  ['source','status','type'].forEach(k=>{const el=document.querySelector(`#${k}`);if(el)el.value=state[k]});
  document.querySelectorAll('[data-action="process"]').forEach(el=>el.addEventListener('click',showProcessModal));
  document.querySelectorAll('[data-action="retry"]').forEach(el=>el.addEventListener('click',()=>showConfirm('重新回传 T1','仅重试结果回传，不会再次创建 SSP 广告主。','确认重新回传')));
  document.querySelectorAll('[data-action="create"]').forEach(el=>el.addEventListener('click',showCreateModal));
  document.querySelectorAll('[data-action="ads"]').forEach(el=>el.addEventListener('click',()=>toast('已进入广告管理，并带入当前广告主筛选条件')));
  document.querySelectorAll('[data-action="more"]').forEach(el=>el.addEventListener('click',()=>toast('更多：编辑、充值、查看余额、停用')));
}

function showProcessModal(){
  modalRoot.innerHTML=`<div class="modal-mask"><div class="modal"><div class="modal-head"><h3>处理 T1 开户申请</h3><button class="modal-close">×</button></div><div class="modal-body"><div class="field" style="margin-bottom:17px"><label>处理方式</label><div class="choice-list"><label class="choice active"><input type="radio" name="way" checked><div><strong>创建新的 SSP 广告主</strong><p>核验不存在重复广告主后创建，并将新 ID 返回 T1。</p></div></label><label class="choice"><input type="radio" name="way"><div><strong>关联已有 SSP 广告主</strong><p>选择明确的 Advertiser ID，不按名称自动绑定。</p></div></label><label class="choice"><input type="radio" name="way"><div><strong>要求客户补充资料</strong><p>填写缺失资料，T1 将通知客户补充。</p></div></label><label class="choice"><input type="radio" name="way"><div><strong>驳回申请</strong><p>填写驳回原因，原申请结束。</p></div></label></div></div><div class="form-grid"><div class="field"><label>所属部门</label><select class="select"><option>海外商业部</option></select></div><div class="field"><label>归属销售</label><select class="select"><option>陈敏</option></select></div><div class="field full"><label>处理说明</label><textarea class="textarea" placeholder="选填，记录核验依据或补充说明"></textarea></div></div></div><div class="modal-foot"><button class="btn modal-cancel">取消</button><button class="btn primary modal-submit">确认处理</button></div></div></div>`;
  wireModal(()=>{closeModal();toast('申请已处理，结果正在同步至 T1')});
  document.querySelectorAll('.choice').forEach(c=>c.addEventListener('click',()=>{document.querySelectorAll('.choice').forEach(x=>x.classList.remove('active'));c.classList.add('active')}));
}

function showCreateModal(){
  modalRoot.innerHTML=`<div class="modal-mask"><div class="modal"><div class="modal-head"><h3>创建广告主</h3><button class="modal-close">×</button></div><div class="modal-body"><div class="warning-box" style="margin-bottom:16px">此入口继续服务 SSP 本地手工建档。T1 正常开户由接口自动创建，无需商务重复填写。</div><div class="form-grid"><div class="field full"><label>广告主名称 *</label><input class="input" placeholder="请输入广告主名称"></div><div class="field"><label>所属部门 *</label><select class="select"><option>请选择</option></select></div><div class="field"><label>归属销售 *</label><select class="select"><option>请选择</option></select></div><div class="field"><label>联系方式</label><input class="input" placeholder="邮箱或电话"></div><div class="field"><label>状态</label><select class="select"><option>正常</option><option>停用</option></select></div><div class="field full"><label>备注</label><textarea class="textarea"></textarea></div></div></div><div class="modal-foot"><button class="btn modal-cancel">取消</button><button class="btn primary modal-submit">创建</button></div></div></div>`;
  wireModal(()=>{closeModal();toast('广告主已创建')});
}

function showConfirm(title,text,submit){modalRoot.innerHTML=`<div class="modal-mask"><div class="modal" style="max-width:440px"><div class="modal-head"><h3>${title}</h3><button class="modal-close">×</button></div><div class="modal-body"><div class="sync-banner"><span class="banner-icon">↻</span><div><strong>不会重复建档</strong><p>${text}</p></div></div></div><div class="modal-foot"><button class="btn modal-cancel">取消</button><button class="btn primary modal-submit">${submit}</button></div></div></div>`;wireModal(()=>{closeModal();toast('回传任务已重新发起')})}
function wireModal(submit){document.querySelector('.modal-close')?.addEventListener('click',closeModal);document.querySelector('.modal-cancel')?.addEventListener('click',closeModal);document.querySelector('.modal-submit')?.addEventListener('click',submit);document.querySelector('.modal-mask')?.addEventListener('click',e=>{if(e.target.classList.contains('modal-mask'))closeModal()})}
function closeModal(){modalRoot.innerHTML=''}
function toast(text){document.querySelector('#toastRoot').innerHTML=`<div class="toast">${text}</div>`;setTimeout(()=>document.querySelector('#toastRoot').innerHTML='',2200)}
render();
