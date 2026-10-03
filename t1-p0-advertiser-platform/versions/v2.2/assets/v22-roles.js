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

 ];
 // One-time migration: authoritative successful binding, not array/registration order.
 // Existing handover evidence takes precedence over a default initialization.
 A.v22MigrateRoles=function(state){
  if(state.roleMigration?.version===1)return state.roleMigration;
  state.advertiserId=state.advertiserId||adv;
  if(!state.bindings&&['me','op','fin'].every(id=>state.members.some(m=>m.id===id&&m.email===({me:'victor',op:'linda',fin:'evan',read:'alice'}[id])+'@example.com'))){state.bindings=sampleBindings();state.bindingSource='示例绑定记录（非真实用户数据）'}
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
 ].map(row=>`<tr>${row.map(v=>`<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p>管理员不拥有平台充值审核权，也不能编辑由运营管理的CPD计划、排期或价格。</p><p class="v22-hint">仅保留三类成员角色，邀请和申请的处理状态单独展示。不增加部门、自定义角色、逐计划授权或工作空间切换。</p>`)};
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

})();
