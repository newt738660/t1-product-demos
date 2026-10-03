/* Lightweight advertiser membership. All records below are local demo data. */
(()=>{
 const A=App,E=A.workspace.E,B=A.workspace.button,J=JSON.stringify,adv='ADV-70285';
 const roles=A.v22Roles,roleName=A.v22RoleName;
 const modal=(title,body,actions='')=>A.modal(`<div class="modal-head"><h3>${title}</h3>${B('关闭','App.closeModal()')}</div><div class="modal-body">${body}<div id="v22Error" class="v22-error" role="alert"></div></div><div class="modal-foot">${actions||B('关闭','App.closeModal()')}</div>`,true);
 const legacy=m=>({read:['owner','operator','viewer'].includes(m.role),edit:['owner','operator'].includes(m.role),finance:['owner','finance'].includes(m.role)});
 const sampleBindings=()=>[
  {userId:'op',advertiserId:adv,status:'success',at:'2026-08-25T09:30:00Z'},
  {userId:'me',advertiserId:adv,status:'success',at:'2026-08-24T08:10:00Z'},
  {userId:'fin',advertiserId:adv,status:'success',at:'2026-08-26T10:00:00Z'},
  {userId:'read',advertiserId:adv,status:'success',at:'2026-08-27T11:00:00Z'}
 ];
 // One-time migration: authoritative successful binding, not array/registration order.
 // Existing handover evidence takes precedence over a default initialization.
 A.v22MigrateRoles=function(state){
  if(state.roleMigration?.version===1)return state.roleMigration;
  state.advertiserId=state.advertiserId||adv;
  if(!state.bindings&&['me','op','fin','read'].every(id=>state.members.some(m=>m.id===id&&m.email===({me:'victor',op:'linda',fin:'evan',read:'alice'}[id])+'@example.com'))){state.bindings=sampleBindings();state.bindingSource='示例绑定记录（非真实用户数据）'}
  const previous=state.members.filter(m=>m.status==='active'&&!m.disabled&&m.role==='owner');
  const handover=state.audit?.some(a=>a.text?.startsWith('管理员交接给'))&&previous.length===1;
  const bound=(state.bindings||[]).filter(b=>b.advertiserId===state.advertiserId&&b.status==='success');
  const invalid=bound.some(b=>!b.at||!Number.isFinite(Date.parse(b.at))||!b.userId);
  const missing=state.members.some(m=>['active','removed'].includes(m.status)&&!bound.some(b=>b.userId===m.id));
  const sorted=bound.slice().sort((a,b)=>Date.parse(a.at)-Date.parse(b.at));
  const first=sorted[0],ties=first?new Set(sorted.filter(b=>Date.parse(b.at)===Date.parse(first.at)).map(b=>b.userId)):new Set();
  const target=handover?previous[0]:state.members.find(m=>m.id===first?.userId);
  let reason='';
  if(!handover){if(!bound.length||missing||invalid)reason='成功绑定记录缺失或时间无效';else if(ties.size!==1)reason='最早成功绑定时间相同，无法确定先后';else if(!target||target.status!=='active'||target.disabled)reason='最早绑定用户已失效或不在有效成员中'}
  for(const m of state.members){if(!roles[m.role]||m.role==='owner'&&m!==target||reason&&m.role==='owner'){m.legacyAccess=m.legacyAccess||legacy(m);m.role=null}}
  state.roleMigration={version:1,status:reason?'needs_review':'complete',reason,at:new Date().toISOString(),source:handover?'existing_handover':'earliest_successful_binding',initialOwnerId:reason?null:target.id,firstBoundAt:handover?null:first?.at||null};
  if(!reason){target.role='owner';delete target.legacyAccess}
  return state.roleMigration;
 };
 A.v22BindingTime=function(id){const rows=(DB.v22.bindings||[]).filter(b=>b.userId===id&&b.advertiserId===DB.v22.advertiserId&&b.status==='success'&&Number.isFinite(Date.parse(b.at))).sort((a,b)=>Date.parse(a.at)-Date.parse(b.at));return rows[0]?.at.slice(0,16).replace('T',' ')||'—'};
 A.v22PermissionMatrix=function(){modal('三类固定角色权限',`<div class="table-wrap"><table class="v22-table"><thead><tr><th>功能</th><th>管理员</th><th>投放人员</th><th>财务人员</th></tr></thead><tbody>${[
 ['RTB创建、编辑、启停、归档','允许','允许','不允许'],['CPD允许修改的创意','允许','允许','不允许'],['投放详情、效果报表及导出（含消耗）','允许','允许','不允许'],['余额、充值、充值记录与凭证','允许','不允许','允许'],['财务消耗查询与导出','允许','不允许','允许'],['邀请、角色调整、移除、管理员交接','允许','不允许','不允许'],['本人账号、组织关系、帮助','允许','允许','允许']
 ].map(row=>`<tr>${row.map(v=>`<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p>管理员不拥有平台充值审核权，也不能编辑由运营管理的CPD计划、排期或价格。</p><p class="v22-hint">“待分配角色”仅用于存量过渡，不是第四类可选角色。不增加部门、自定义角色、逐计划授权或工作空间切换。</p>`)};
 A.view_org=function(){
  const m=this.v22Member(),manage=this.v22Can('manage'),state=DB.v22,migration=state.roleMigration;
  const owner=state.members.find(x=>x.role==='owner'&&x.status==='active');
  const status=x=>({active:'已加入',invited:'待接受',expired:'已过期',revoked:'已撤销',removed:'已移除'}[x.status]||x.status);
  const rows=state.members.filter(x=>manage||x.id===m?.id);
  const initial=state.members.find(x=>x.id===migration?.initialOwnerId);
  return `<div class="page-head"><div><h1>组织与成员</h1><p>星海互动 · 广告主 ${E(state.advertiserId||adv)}</p></div><div class="spacer"></div>${manage?B('邀请成员','App.v22Invite()','btn btn-primary'):''}</div>
  <section class="card v22-panel"><div class="v22-row between"><div><h2>成员权限</h2><p>每人独立登录，共同协作管理同一广告主；移除成员不删除广告及历史数据。</p></div>${B('查看角色权限','App.v22PermissionMatrix()')}</div><p>当前身份：${E(m?.name||'无有效成员关系')} · ${E(roleName(m))}</p><p class="v22-hint">管理员：${owner?E(owner.name)+' · '+E(owner.email):'待运营核对'}。${manage?'你可以管理成员和交接管理员。':'仅显示本人的成员关系。'}</p>
  ${migration?.status==='needs_review'?`<div class="notice warning">管理员待核对：${E(migration.reason)}。请联系运营核验，不按姓名、注册时间或当前登录顺序分配。${B('联系运营',"App.scopeContact('存量管理员归属核验')")}</div>`:''}
  ${manage?`<details><summary>查看管理员分配依据</summary><p>${migration?.source==='existing_handover'?'已保留此前完成的管理员交接。':`首次分配依据：${E(initial?.name||'原绑定用户')} 最早成功绑定，时间 ${E(migration?.firstBoundAt?.replace('T',' ').replace('Z',' UTC')||'待核对')}。`}</p><p>默认分配仅执行一次；交接后以现任管理员为准，刷新不恢复原管理员。</p>${state.bindingSource?`<p class="v22-hint">${E(state.bindingSource)}</p>`:''}</details>`:''}
  ${m&&!m.role?'<div class="notice info">你的角色待管理员分配。过渡期间只保留原有权限，不新增投放、财务或成员管理权限。</div>':''}</section>
  <section class="card"><div class="table-wrap"><table class="v22-table"><thead><tr><th>成员／邮箱</th><th>角色</th><th>状态</th>${manage?'<th>首次成功绑定（UTC）</th>':''}<th>操作</th></tr></thead><tbody>${rows.map(x=>`<tr><td>${E(x.name)}${x.id===m?.id?'（当前）':''}<div class="cell-sub">${E(x.email)}</div></td><td>${E(roleName(x))}</td><td>${E(status(x))}</td>${manage?`<td>${E(this.v22BindingTime(x.id))}</td>`:''}<td><div class="v22-row">${x.status==='active'&&x.role!=='owner'&&manage?B(x.role?'调整角色':'分配角色',`App.v22EditMember(${J(x.id)})`)+B('移除',`App.v22RemoveMember(${J(x.id)})`):''}${x.status==='active'&&x.id!==m?.id&&roles[x.role]&&manage?B('交接管理员',`App.v22Transfer(${J(x.id)})`):''}${['invited','expired','revoked'].includes(x.status)&&manage?B('邀请详情',`App.v22Invitation(${J(x.id)})`):''}${x.role==='owner'?'<span class="cell-sub">交接后才能移除</span>':''}</div></td></tr>`).join('')||'<tr><td colspan="5">当前没有有效的广告主成员关系，请联系运营。</td></tr>'}</tbody></table></div></section>
  ${manage?`<section class="card v22-panel" style="margin-top:20px"><h2>操作记录</h2>${state.audit.slice(0,12).map(a=>`<p>${E(a.at.slice(0,16).replace('T',' '))} · ${E(a.actor)} · ${E(a.text)}</p>`).join('')||'<p class="v22-hint">暂无操作记录</p>'}</section>`:''}`;
 };
 A.v22Transfer=function(id,confirmed=false){
  if(!this.v22Require('manage'))return;
  const target=DB.v22.members.find(m=>m.id===id),me=this.v22Member();
  if(!target||target.id===me.id||target.status!=='active'||target.disabled||!['operator','finance'].includes(target.role))return;
  if(!confirmed)return modal('交接管理员',`<p>交接给 <b>${E(target.name)}</b> · ${E(target.email)}</p><label class="v22-field">交接后你的角色<select id="v22TransferRole" class="select"><option value="operator">投放人员</option><option value="finance">财务人员</option></select></label><p>确认后立即生效：对方成为唯一管理员，你失去成员管理权限，并按所选角色保留投放或财务权限。请先与对方沟通确认。</p><p>广告、余额、报表和历史记录不变；后续刷新不会自动还原本次交接。</p>`,B('取消','App.closeModal()')+B('确认交接',`App.v22Transfer(${J(id)},true)`,'btn btn-primary'));
  const after=document.getElementById('v22TransferRole')?.value;
  if(!['operator','finance'].includes(after))return;
  const actor=me.name;me.role=after;delete me.legacyAccess;target.role='owner';delete target.legacyAccess;
  DB.v22.audit.unshift({at:new Date().toISOString(),actor,text:'管理员交接给 '+target.email+'；原管理员转为'+roles[after].name});
  this.save();this.closeModal();this.demoRole=after;this.renderNav();this.syncAccountContext();this.syncBell();this.go('org');this.v22MountTools();this.toast('管理员已交接，你现在是'+roles[after].name);
 };
 const oldTools=A.v22MountTools;
 A.v22MountTools=function(){oldTools.call(this);if(!window.T1_REVIEW)return;const div=document.getElementById('v22Tools');if(div)div.insertAdjacentHTML('beforeend',B('存量成员与管理员样例','App.v22RoleScenarios()'))};
 A.v22RoleScenarios=function(){if(!window.T1_REVIEW)return;modal('演示工具：存量成员与管理员',`<p>仅替换本浏览器的成员、邀请和成员操作记录；保留当前广告、余额、充值、报表和账号验证状态。以下绑定时间均为模拟数据。</p><p>正常样例：Victor最早成功绑定，成为管理员；Alice待分配角色。</p><p>异常样例：绑定记录缺失，需运营核验；不会按成员列表顺序补选管理员。</p>`,B('取消','App.closeModal()')+B('载入记录缺失样例',"App.v22ResetRoleSample('missing')")+B('载入正常存量样例',"App.v22ResetRoleSample('normal')",'btn btn-primary'))};
 A.v22ResetRoleSample=function(kind){if(!window.T1_REVIEW||!['normal','missing'].includes(kind))return;
  Object.assign(DB.v22,{members:[
   {id:'op',name:'Linda Zhao',email:'linda@example.com',role:'operator',status:'active'},
   {id:'me',name:'Victor Wang',email:'victor@example.com',role:null,status:'active',legacyAccess:{read:true,edit:true,finance:true}},
   {id:'fin',name:'Evan Chen',email:'evan@example.com',role:'finance',status:'active'},
   {id:'read',name:'Alice Li',email:'alice@example.com',role:'viewer',status:'active'}
  ],bindings:kind==='normal'?sampleBindings():[],bindingSource:'示例绑定记录（非真实用户数据）',roleMigration:null,audit:DB.v22.audit.filter(a=>!/^(创建成员邀请|邀请|调整角色|移除成员|管理员交接给)|(?:接受|拒绝)邀请（模拟）/.test(a.text))});
  this.v22MigrateRoles(DB.v22);this.save();this.v22SelectMember('me');this.go('org');
 };
 const oldDash=A.view_dash;
 A.view_dash=function(){const m=this.v22Member();if(!m||!roles[m.role]&&!m.legacyAccess?.read&&!m.legacyAccess?.finance)return `<section class="card v22-panel"><h1>${m?'等待分配角色':'广告主访问权限已失效'}</h1><p>${m?'请联系管理员分配角色；当前不能查看或修改广告主的投放和财务数据。':'成员关系已失效，请联系管理员或运营核对；原广告和历史数据保留。'}</p>${B('查看组织关系',"App.go('org')")}${B('联系运营',"App.scopeContact('成员权限咨询')")}</section>`;return oldDash.call(this)};
 const oldVisible=A.visibleNotifications;
 A.visibleNotifications=function(){return this.v22Member()?oldVisible.call(this):[]};
 const oldInit=A.init;
 A.init=function(){oldInit.call(this);if(new URLSearchParams(location.search).get('case')==='roles')this.go('org')};
})();
