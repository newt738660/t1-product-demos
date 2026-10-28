/* V2.2 launch scope: access guidance and actionable creative rejections only. */
(()=>{
 'use strict';
 const A=App,E=A.workspace.E,B=A.workspace.button,J=JSON.stringify;
 A.homeAlerts=function(){
  if(!this.isAdvertiserBound()||!this.canOpen('plans'))return [];
  return DB.creatives.flatMap(a=>{
   const rejected=a.pendingVersion?a.pendingVersion.status==='rejected':a.status==='rejected';
   const c=DB.campaigns.find(c=>c.id===a.camp),g=DB.adGroups.find(g=>g.id===a.groupId);
   if(!rejected||a.status==='archived'||!c||c.status==='archived'||g?.status==='archived')return [];
   return [{id:'rejected:'+a.id,type:'rejected',priority:0,c,group:g,creative:a,title:a.pendingVersion?'新版本创意被驳回':'创意被驳回',label:'查看原因并处理',call:`App.openCreativePreview(${J(a.id)})`}];
  });
 };
 A.renderHomeIssues=function(){const issues=this.homeAlerts();return `<section class="card hl-panel" id="homeIssues"><h2>立即处理${issues.length?' · '+issues.length+'项':''}</h2><p class="muted">处理创意驳回；重新提交审核后，待办自动解除。</p>${issues.length?issues.map(a=>`<div class="hl-task"><div><span class="badge red">${E(a.title)}</span><h3>${E(a.creative.name)}</h3><p class="cell-sub">${E([a.c.name,a.group?.name].filter(Boolean).join(' / '))}</p></div>${B(a.label,a.call)}</div>`).join(''):'<p class="hl-empty">暂无需要处理的创意驳回。你可以前往广告投放查看已有广告。</p>'}</section>`};
 A.homeLiteLinks=function(){return `<nav class="hl-links" aria-label="常用入口">${this.canOpen('plans')?B('广告投放',"App.go('plans')"):''}${this.canOpen('billing')?B('财务管理',"App.go('billing')"):''}${B('帮助中心',"App.go('help')")}</nav>`};
 A.view_matureDash=function(){return `<div class="hl-home"><div class="page-head"><div><h1>首页</h1><p>已关联 ${E(this.profile()?.advertiserName||'当前广告主')} · 查看待办，继续处理投放。</p></div>${this.v22Can('edit')?B('创建RTB投放','App.startRtbCreate()','btn btn-primary'):''}</div>${this.renderHomeIssues()}${this.homeLiteLinks()}</div>`};
 A.view_experienceDash=function(state){
  const app=this.advertiserApplication(),pending=state==='pending',rejected=state==='rejected',bound=this.isAdvertiserBound(),kind=app?.type==='bind'?'绑定':'开户';
  const title=pending?kind+'申请审核中':rejected?kind+'申请未通过':bound?'尚未创建广告投放':'先关联广告主，开始使用T1';
  const desc=pending?'申请已提交，可查看当前进度；审核结果会通过小铃铛通知。':rejected?(app?.rejectReason||'请查看申请详情中的审核意见，修改后重新提交。'):bound?'可以创建RTB广告；如需CPD投放，请与现有商务或运营对接人确认安排。':'提交开户或绑定申请，也可接受小铃铛中的邀请。';
  const primary=pending?B('查看申请进度','App.scopeApplication()','btn btn-primary'):rejected?B('修改并重新申请','App.reapplyAdvertiser()','btn btn-primary'):bound?(this.v22Can('edit')?B('创建RTB投放','App.startRtbCreate()','btn btn-primary'):''):B('开户与绑定申请','App.openAdvertiserGate()','btn btn-primary');
  return `<div class="hl-home"><div class="page-head"><h1>首页</h1></div><section class="card hl-panel hl-welcome"><h2>${title}</h2><p>${E(desc)}</p><div class="hl-links">${primary}${bound?B('联系运营',"App.scopeContact('CPD投放咨询')"):B('查看通知','App.openNotifCenter()')}</div></section>${bound?this.homeLiteLinks():''}</div>`;
 };
 // Membership requests remain intact; account application progress belongs to the signed-in applicant only.
 const personal=A.joinPersonalPage;
 A.joinPersonalPage=function(home=false){
  const u=this.joinUser(),app=this.advertiserApplication();
  if(!home||u?.id!=='me'||this.isAdvertiserBound()||!['pending','rejected'].includes(app?.status))return personal.call(this,home);
  const join=DB.v22.join,own=[...join.invites,...join.applications].filter(r=>r.userId===u.id);
  return this.view_experienceDash(app.status)+(own.length?`<section class="card hl-panel"><h2>我的邀请与申请</h2>${this.joinRecordTable(own,false)}</section>`:'');
 };
 A.syncHomeBalanceRisk=function(){document.getElementById('homeBalanceRisk')?.remove()};
 A.refreshHomeIssues=function(){if(document.getElementById('homeIssues'))this.go('dash');this.syncHomeBalanceRisk()};
 A.v22Policy=function(){this.modal(`<div class="modal-head"><h3>首页与通知规则</h3>${B('关闭','App.closeModal()')}</div><div class="modal-body"><ul class="v22-bullet-list"><li>首页保留接入状态、申请进度／驳回重提、无投放引导及创意驳回待办。</li><li>本轮不做指标概览、四维度排名、趋势比较、计划状态概览、近期排期和余额可支撑天数预警。</li><li>创意重提进入审核中后解除待办；铃铛保留历史驳回事件，已读不等于已处理。</li><li>邮箱验证、充值、成员权限及独立数据报告保持现有Demo流程；原型可操作不代表生产已开发。</li><li>资金与组织通知继续按角色权限展示；未绑定用户仅处理自己的接入事项。</li></ul></div>`,true)};
})();
