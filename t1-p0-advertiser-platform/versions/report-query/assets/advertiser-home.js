/* Advertiser-facing overview. Business state, not a second performance report. */
(()=>{
 const A=App,esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const wrap=(key,fn)=>{const old=A[key];A[key]=function(...args){return fn.call(this,old.bind(this),...args);};};
 const today=()=>new Date().toISOString().slice(0,10);
 const inPeriod=o=>(!o.start||o.start<=today())&&(!o.end||o.end>=today());
 const action=(label,call,cls='btn btn-ghost btn-sm')=>`<button class="${cls}" onclick="${esc(call)}">${esc(label)}</button>`;
 const openPlan=c=>`App.openPlan(${JSON.stringify(c.id)})`;
 A.homeStateValue=function(){if(!this.isAdvertiserBound()){const app=this.advertiserApplication();return app?.status==='pending'?'pending':app?.status==='rejected'?'rejected':'unbound';}return DB.campaigns.length?'active':'empty';};
 A.syncAccountContext=function(){const bound=this.isAdvertiserBound(),p=this.profile()||{};const chip=document.getElementById('workspaceChip');if(chip)chip.textContent=bound?(p.advertiserName&&!/演示|评审/.test(p.advertiserName)?p.advertiserName:'广告主账户'):'尚未绑定广告主';const f=document.getElementById('financeBox');if(f)f.style.display=bound&&['owner','finance'].includes(this.demoRole)?'':'none';};
 A.syncRoleSimulator=function(){};
 A.roleBanner=function(){return '';};
 // Do not allow legacy state-preview URLs to change an advertiser's application.
 A.isPreviewMode=()=>false;
 wrap('load',function(old){old();
  const rename={'CPD版本变更｜当前投放＋新版审核中':'秋季品牌焕新｜App首页开屏','同一创意：V1投放，V2待审':'秋季品牌焕新','首页开屏｜创意版本变更演示':'首页开屏｜品牌焕新','品牌开屏｜版本变更案例':'品牌开屏｜秋季主视觉','演示运营':'Linda Zhao','演示用户':'Victor Wang','演示审核员':'平台审核员','演示素材':'—','CPD-DEMO-VERSION':'CPD-202609-031'};
  for(const list of [DB.campaigns,DB.adGroups,DB.creatives,DB.assetFiles,DB.auditLogs])for(const row of list||[])for(const key of ['name','alias','group','operator','managedBy','actor','size','order','contractNo'])if(rename[row[key]])row[key]=rename[row[key]];
 });
 A.homePlanState=function(c){
  if(c.status==='archived')return 'archived';
  if(c.status==='paused')return 'paused';
  if(c.status==='ended'||c.end&&c.end<today())return 'ended';
  if(c.start&&c.start>today())return 'upcoming';
  if(c.syncStatus==='failed')return 'unknown';
  if(c.mode==='rtb'&&(DB.balance<=0||(c.totalBudget>0&&c.spend>=c.totalBudget)))return 'blocked';
  const groups=DB.adGroups.filter(g=>g.camp===c.id&&g.status!=='archived');
  const usable=groups.some(g=>g.status==='active'&&inPeriod(g)&&DB.creatives.some(a=>a.camp===c.id&&a.groupId===g.id&&a.status==='active'));
  if(usable)return 'ready';
  const creatives=DB.creatives.filter(a=>a.camp===c.id&&a.status!=='archived');
  if(creatives.some(a=>a.status==='review'))return 'review';
  return 'blocked';
 };
 A.homeAlerts=function(){
  if(!this.isAdvertiserBound())return [];
  const result=[],plans=DB.campaigns.filter(c=>!['archived','paused','ended'].includes(c.status)&&inPeriod(c));
  if(this.canOpen('billing')&&DB.balance<=0&&plans.some(c=>c.mode==='rtb'))result.push({title:'账户余额不足，RTB投放受限',desc:'充值后将重新检查投放条件。',label:'查看资金',call:"App.go('billing')"});
  for(const c of plans){
   if(!this.canOpen('plans'))continue;
   if(c.syncStatus==='failed')continue;
   if(c.mode==='rtb'&&c.totalBudget>0&&c.spend>=c.totalBudget){result.push({title:`${c.alias||c.name}：总预算已用完`,desc:'调整计划预算后，可恢复符合条件的投放。',label:'查看计划',call:openPlan(c)});continue;}
   if(this.homePlanState(c)!=='blocked')continue;
   const cr=DB.creatives.filter(a=>a.camp===c.id&&a.status!=='archived');
   if(cr.length&&cr.every(a=>a.status==='rejected'))result.push({title:`${c.alias||c.name}：暂无审核通过的创意`,desc:'查看驳回原因，修改后重新提交审核。',label:'处理创意',call:openPlan(c)});
  }
  return result;
 };
 A.openHomePlans=function(state){this.go('plans');this.homeListState=state;this.renderUnifiedPlans();};
 wrap('renderUnifiedPlans',function(old){old();if(!this.homeListState)return;const state=this.homeListState;this.homeListState=null;
  const label={ready:'可投放',review:'等待审核',upcoming:'尚未开始',paused:'已暂停',ended:'已结束',unknown:'状态待确认',blocked:'暂不可投放'}[state];
  const plans=DB.campaigns.filter(c=>this.homePlanState(c)===state);
  this.modal(`<div class="modal-head"><div><h3>${label}的计划</h3><p>${plans.length}个计划</p></div><button class="icon-btn" aria-label="关闭" onclick="App.closeModal()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div><div class="modal-body">${plans.map(c=>`<div class="home-plan-row"><div><b>${esc(c.alias||c.name)}</b><p>${esc(c.id)} · ${esc(c.mode.toUpperCase())}</p></div>${action('查看计划',`App.closeModal();${openPlan(c)}`)}</div>`).join('')||'<p>暂无符合条件的计划</p>'}</div>`,true);
 });
 A.view_matureDash=function(){
  const plans=DB.campaigns.filter(c=>c.status!=='archived'),count=k=>plans.filter(c=>this.homePlanState(c)===k).length;
  const alerts=this.homeAlerts(),date=today();
  const next=new Date(date+'T00:00:00Z');next.setUTCDate(next.getUTCDate()+7);const until=next.toISOString().slice(0,10);
  const schedule=plans.flatMap(c=>{const x=[];if(c.start&&c.start>=date&&c.start<=until)x.push({c,date:c.start,label:'开始投放'});if(c.end&&c.end>=date&&c.end<=until)x.push({c,date:c.end,label:'排期结束'});return x;}).sort((a,b)=>a.date.localeCompare(b.date));
  const states=[['ready','可投放','green'],['review','等待审核','amber'],['upcoming','尚未开始','blue'],['blocked','暂不可投放','red'],['paused','已暂停','gray'],['ended','已结束','gray'],['unknown','状态待确认','amber']];
  return `<div class="advertiser-home"><div class="home-heading"><h1>账户概览</h1></div>
  ${this.renderHomeIssues()}
  <div class="home-columns"><section class="card home-schedule"><div class="home-section-title"><div><h2>近期排期</h2><p>未来7天的开始与结束安排</p></div></div>${this.renderHomeSchedule(schedule)}</section>
  <aside class="home-side"><section class="card"><div class="home-section-title"><h2>常用操作</h2></div><div class="home-shortcuts">${this.canOpen('creatives')?action('管理广告素材 →',"App.go('creatives')",'home-shortcut'):''}${this.canOpen('billing')?action('查看资金记录 →',"App.go('billing')",'home-shortcut'):''}${action('账户与成员设置 →',"App.go('settings')",'home-shortcut')}${action('投放帮助 →',"App.go('help')",'home-shortcut')}</div></section><section class="home-report-link"><div class="home-eyebrow">效果分析</div><h2>了解广告带来的表现</h2><p>按时间和投放类型查看曝光、点击及花费，比较趋势并导出报告。</p>${action('进入数据报表 →',"App.go('report')",'btn btn-primary')}</section></aside></div></div>`;
 };
 A.after_dash=function(){};
 A.showHomeAlerts=function(){this.modal(`<div class="modal-head"><h3>需要优先处理</h3><button class="icon-btn" aria-label="关闭" onclick="App.closeModal()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div><div class="modal-body">${this.homeAlerts().map(a=>`<div class="home-alert"><div><b>${esc(a.title)}</b><p>${esc(a.desc)}</p></div>${action(a.label,`App.closeModal();${a.call}`)}</div>`).join('')}</div>`,true);};
 A.view_experienceDash=function(state){
  const app=this.advertiserApplication(),pending=state==='pending',rejected=state==='rejected',bound=this.isAdvertiserBound();
  const heading=pending?'申请已提交，正在为你核验':rejected?'请完善信息后重新申请':bound?'开始你的第一条投放':'欢迎使用 T1 Ads';
  const desc=pending?'审核结果将通过通知告知，请耐心等待。':rejected?(app?.rejectReason||'请查看审核意见，核对申请信息。'):bound?'自主创建RTB投放，或联系运营安排CPD推广。':'先创建或绑定广告主，即可管理投放与查看效果。';
  return `<div class="advertiser-home home-onboarding"><section class="home-welcome"><div class="home-eyebrow">T1 ADS</div><h1>${heading}</h1><p>${esc(desc)}</p><div class="home-actions">${pending?(app?.type==='new'?action('撤销开户申请','App.cancelAdvertiserApplication()'):''):rejected?action('修改并重新申请','App.reapplyAdvertiser()','btn btn-primary'):action(bound?'创建RTB投放':'创建或绑定广告主',bound?'App.startRtbCreate()':'App.openAdvertiserGate()','btn btn-primary')}${action('联系运营','App.showCpdContact()')}</div></section><div class="home-intro-grid"><section class="card card-pad"><h2>RTB自助投放</h2><p>自主设置预算、排期和定向，提交创意审核后开展推广。</p></section><section class="card card-pad"><h2>CPD运营代投</h2><p>联系运营确认广告位、价格和排期，并在账户内查看投放和创意。</p></section><section class="card card-pad"><h2>查看投放效果</h2><p>按周期查看曝光、点击与花费，使用数据报表分析效果。</p>${action('查看使用指南',"App.go('help')")}</section></div></div>`;
 };
 A.view_emptyDash=function(){return this.view_experienceDash('empty');};
 // Pending events live in the bell only; seen notifications never clear business blockers.
 wrap('toggleNotif',function(old,e){old(e);const list=document.querySelector('#notifPop .notif-list');if(!list)return;
  const pending=DB.creatives.filter(c=>c.status==='review'||c.pendingVersion?.status==='review').length;
  const funds=DB.recharges.filter(r=>r.status==='pending').length;
  
  if(pending||funds)list.insertAdjacentHTML('afterbegin',`<div class="home-notif-pending">${pending&&this.canOpen('creatives')?action(`${pending}条创意审核中`,"App.closeNotifPop();App.go('creatives')",'home-shortcut'):''}${funds&&this.canOpen('billing')?action(`${funds}笔充值处理中`,"App.closeNotifPop();App.go('billing')",'home-shortcut'):''}</div>`);
 });
})();
