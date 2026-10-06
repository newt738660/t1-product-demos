(()=>{
 const A=App,E=A.workspace.E,B=A.workspace.button,cases=window.V21_DESIGN_CASES;
 const cp=()=>DB.campaigns.find(c=>c.id==='C-1001'),group=()=>DB.adGroups.find(g=>g.id==='G-2001'),creative=()=>DB.creatives.find(a=>a.id==='CR-3001');
 const wrap=(key,fn)=>{const old=A[key];A[key]=function(...args){return fn.call(this,old?.bind(this),...args)}};
 NAV.splice(0,NAV.length,{group:'投放管理',items:[{id:'plans',label:'广告投放',ico:I.camp}]},{group:'资产与分析',items:[{id:'report',label:'数据报表',ico:I.report}]});
 A.canOpen=function(id){return ['plans','report'].includes(PAGES[id]?.nav||id)||['newplan','newad','newgroup','campdetail','groupdetail'].includes(id)};
 wrap('go',function(old,id){if(id==='dash')id='plans';if(!this.canOpen(id)){this.toast('此入口不在V2.1设计对接范围','info');return}const result=old(id);this.designMount();return result});
 wrap('startRtbCreate',function(old){old();const day=n=>new Date(Date.now()+n*864e5).toISOString().slice(0,10);document.getElementById('ufPlanStart').value=day(0);document.getElementById('ufPlanEnd').value=day(30);this.updateUfPlanName()});
 wrap('v21Details',function(old){old();document.querySelectorAll('#content button[onclick]').forEach(b=>{const call=b.getAttribute('onclick'),id=call.match(/openCreative\('([^']+)'/);const a=id&&DB.creatives.find(x=>x.id===id[1]);if(a&&(a.status==='review'||a.pendingVersion?.status==='review')){b.disabled=true;b.title='审核中，暂不可重复编辑'}if(/confirmArchive/.test(call)&&DB.campaigns.find(x=>x.id===this.curCamp)?.status==='archived')b.disabled=true})});
 A.confirmDeleteDeliveryObject=function(type,id){return this.confirmArchiveDeliveryObject(type,id)};
 A.deleteDeliveryObject=function(type,id){return this.archiveDeliveryObject(type,id)};
 wrap('openCreative',function(old,id){const a=DB.creatives.find(x=>x.id===id);if(a?.status==='review'||a?.pendingVersion?.status==='review')return this.toast('已有内容审核中，暂不可重复编辑提交','info');return old(id)});
 wrap('openCreativePreview',function(old,id){const a=DB.creatives.find(x=>x.id===id);if(!a?.pendingVersion)return old(id);const p=a.pendingVersion;const card=(v,live)=>`<section class="card card-pad"><h3>${live?'当前生效':'待审'}版本 V${v.version}</h3><p>${live?'已通过；实际投放仍受排期、预算和启停约束':'审核中，尚未生效'}</p>${creativeThumb({...a,...v})}<p>${E(v.size||a.size)}</p><dl><dt>标题</dt><dd>${E(v.headline||'—')}</dd><dt>描述</dt><dd>${E(v.description||'—')}</dd><dt>CTA</dt><dd>${E(v.cta||'—')}</dd><dt>链接</dt><dd style="overflow-wrap:anywhere">${E(v.landing)}</dd></dl></section>`;this.modal(`<div class="modal-head"><h3>创意版本对照 · ${E(a.name)}</h3>${B('关闭','App.closeModal()')}</div><div class="modal-body"><div class="notice info">新内容未覆盖当前生效版本；待审时不重复编辑提交。</div><div class="cpd-version-comparison">${card(a,true)}${card(p,false)}</div></div><div class="modal-foot">${B('关闭','App.closeModal()')}</div>`,true)});
 wrap('view_report',function(old){if(!this.designReportState)return old();const fail=this.designReportState==='error',s=this.ensureWorkspaceReport();return `<section class="card card-pad"><h1>数据报表</h1><p>${s.mode.toUpperCase()} · ${s.from} 至 ${s.to} · UTC</p><div class="design-report-state"><h2>${fail?'查询未成功':'正在加载数据…'}</h2><p>${fail?'暂时无法获取该周期的数据，已保留查询条件。':'正在查询，请稍候。此时不展示零值指标。'}</p>${B(fail?'重试':'演示加载完成','App.designFinishReport()','btn btn-primary')}</div></section>`});
 wrap('after_report',function(old){if(!this.designReportState)return old()});
 A.designFinishReport=function(){this.designReportState=null;this.go('report')};
 A.designMount=function(){document.getElementById('financeBox')?.setAttribute('hidden','');document.getElementById('bellBtn')?.setAttribute('hidden','');const panel=document.getElementById('scopeReviewTools');if(panel){panel.querySelectorAll(':scope > label,:scope > p').forEach(n=>{if(!n.classList.contains('demo-version-field')&&!n.classList.contains('demo-version-note'))n.hidden=true})}if(!window.T1_REVIEW)return;let box=document.getElementById('designReview');if(!box){box=document.createElement('section');box.id='designReview';document.getElementById('content').before(box)}const item=cases.find(x=>x.id===this.designCase)||cases[0];box.innerHTML=`<div class="design-review-top"><b>V2.1设计对接 · 非产品功能</b><a href="design.html">页面交接目录 ↗</a><label>页面／状态<select class="select" id="designCase" onchange="App.designSelect(this.value)">${cases.map(c=>`<option value="${c.id}" ${c.id===item.id?'selected':''}>${c.page} · ${c.title}</option>`).join('')}</select></label></div><p><b>${item.page} ${E(item.title)}</b>：${E(item.note)}</p><small>切换场景重置本设计稿的样例，不影响冻结基线和V2.2；直接操作可继续流程。高级报表范围及61条投放情况映射待对齐，不能据此视为全部定稿。</small>`};
 A.designSelect=function(id,initial=false){const item=cases.find(c=>c.id===id);if(!item)return;if(!initial&&['newplan','newad','newgroup'].includes(this.cur)&&!confirm('切换场景将放弃当前未提交内容并恢复设计样例，继续吗？')){this.designMount();return}document.getElementById('toastWrap').innerHTML='';this.stopUfTracking();this.ufWorking=null;this.ufInitialDirty=false;this.editFlow=null;this.v21Editing=null;this.editRejectedId=null;this.closeModal();Object.assign(DB,structuredClone(this.designSeed));this.wsReport=null;this.designReportState=null;this.designCase=id;this.curCamp=null;this.curGroup=null;this.unifiedType='rtb';DB.uiState.planListView='rtb';this.unifiedSelected=new Set();this.save();
 const url=new URL(location.href);url.searchParams.set('designcase',id);history.replaceState(null,'',url);this.go('plans');
 const form=step=>{this.startRtbCreate();document.getElementById('ufPlanStart').value=cp().start;document.getElementById('ufPlanEnd').value=cp().end;this.updateUfPlanName();if(step>1)this.saveUfCampaign();if(step>2){document.getElementById('ufGroupName').value='设计对接｜信息流广告组';this.saveUfGroup()}};
 if(id==='list-empty'){document.getElementById('unifiedSearch').value='不存在的计划';this.resetUnifiedPage()}
 else if(id==='selected'){this.unifiedSelected=new Set(DB.campaigns.filter(c=>c.mode==='rtb'&&c.status!=='archived').slice(0,2).map(c=>c.id));this.renderUnifiedPlans();this.renderUnifiedBulkBar()}
 else if(id==='plan')this.openPlan(cp().id);
 else if(id==='group')this.openGroupDetail(group().id);
 else if(id==='new-plan')form(1);
 else if(id==='new-group')form(2);
 else if(id==='new-creative')form(3);
 else if(id==='add-group')this.startNewGroup(cp().id);
 else if(id==='add-creative')this.openNewCreativeForGroup(group().id);
 else if(id==='edit-plan')this.openCampaignEdit(cp().id);
 else if(id==='edit-group')this.openGroupEdit(group().id);
 else if(id==='edit-creative')this.openRtbCreativeEdit(creative().id);
 else if(id==='slots'){form(2);this.v21OpenSlots()}
 else if(id==='upload'){form(3);this.openUfUpload()}
 else if(id==='validation'){form(1);document.getElementById('ufTotal').value='-1';this.saveUfCampaign()}
 else if(id==='leave'){form(2);document.getElementById('ufGroupName').value='未保存的广告组';this.cancelUnified()}
 else if(id==='review'){creative().status='review';creative().reviewStatus='review';this.openGroupDetail(group().id);this.openCreativePreview(creative().id)}
 else if(id==='rejected'){Object.assign(creative(),{status:'rejected',reviewStatus:'rejected',rejectReason:'落地页内容与素材不一致，请修改后重新提交。'});this.openGroupDetail(group().id);this.openCreative(creative().id)}
 else if(id==='versions'){creative().pendingVersion={...creative(),version:creative().version+1,status:'review',headline:'待审新版标题',description:'修改后的描述尚未生效',landing:'https://example.com/new',submittedAt:new Date().toISOString()};this.openGroupDetail(group().id);this.openCreativePreview(creative().id)}
 else if(id==='pause'){this.openPlan(cp().id);this.confirmPlanStatus(cp().id,'paused')}
 else if(id==='archive'){this.openPlan(cp().id);this.confirmArchiveDeliveryObject('plan',cp().id)}
 else if(id==='archived'){cp().status='archived';this.openPlan(cp().id)}
 else if(id.startsWith('report')){const s=this.ensureWorkspaceReport();if(id==='report-cpd'||id==='report-delay')s.mode='cpd';if(id==='report-empty'){DB.campaigns.push({id:'DESIGN-NO-DATA',name:'新建计划｜所选周期暂无投放',mode:'rtb',status:'active',start:new Date(Date.now()+864e5).toISOString().slice(0,10)});s.camp='DESIGN-NO-DATA';}if(id==='report-delay')s.camp=DB.campaigns.find(c=>c.syncStatus==='failed').id;if(id==='report-archive')s.archive='archived';if(id==='report-extended')s.dim='group';if(id==='report-loading'||id==='report-error')this.designReportState=id==='report-error'?'error':'loading';this.go('report')}
 if(!['validation'].includes(id))document.getElementById('toastWrap').innerHTML='';this.designMount();document.querySelectorAll('#content button[onclick]').forEach(b=>{if(cp()?.status==='archived'&&/confirmArchive/.test(b.getAttribute('onclick')))b.disabled=true});this.save();
 };
 wrap('init',function(old){old();let seed;try{seed=JSON.parse(sessionStorage.getItem('t1-v21-design-seed'))}catch{}if(!seed){const day=n=>new Date(Date.now()+n*864e5).toISOString().slice(0,10);Object.assign(cp(),{start:day(-1),end:day(30),status:'active',period:day(-1)+' 至 '+day(30)});Object.assign(group(),{start:cp().start,end:cp().end,status:'active'});seed=structuredClone(DB);sessionStorage.setItem('t1-v21-design-seed',JSON.stringify(seed))}this.designSeed=seed;this.renderNav();this.designSelect(new URLSearchParams(location.search).get('designcase')||'list',true)});
})();
