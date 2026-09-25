(()=>{
 const A=App,E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const button=(label,call,cls='btn btn-ghost btn-sm')=>`<button class="${cls}" onclick="${E(call)}">${E(label)}</button>`;
 const closeButton=()=>'<button class="icon-btn" aria-label="关闭" onclick="App.closeModal()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg></button>';
 const categories={delivery:'投放与审核',finance:'资金与账务',service:'账户与服务'};
 A.workspace={E,button,categories};
 A.notificationCategory=n=>n.category||(n.type==='finance'?'finance':n.type==='audit'?'delivery':'service');
 A.visibleNotifications=function(){return DB.notifications.filter(n=>{const cat=this.notificationCategory(n);return cat==='finance'?this.canOpen('billing'):cat==='delivery'?this.canOpen('plans'):n.target==='settings'&&n.ref==='accounts'?this.demoRole==='owner':true;}).sort((a,b)=>String(b.at||'').localeCompare(String(a.at||'')));};
 A.unreadCount=function(){return this.visibleNotifications().filter(n=>!n.read).length;};
 A.notificationCurrent=function(n){
  if(n.target==='creative'){const a=DB.creatives.find(a=>a.id===n.ref);if(!a)return '该对象当前不可访问，历史通知仍保留。';return `${a.name} · 当前${a.pendingVersion?.status==='review'?'生效版本V'+(a.version||1)+'，新版审核中':({review:'首次审核中',active:'审核已通过',rejected:'审核驳回',archived:'已归档',paused:'已暂停'}[a.status]||a.status)}${a.rejectReason?'；'+a.rejectReason:''}`;}
  if(n.target==='recharge'){const r=DB.recharges.find(r=>r.id===n.ref);return r?`${r.id} · $${r.amount.toFixed(2)} · ${{pending:'处理中',approved:'已到账',rejected:'已驳回'}[r.status]}；${r.reviewOpinion||''}`:'充值记录当前不可访问。';}
  if(n.target==='billing')return `当前账户余额 $${DB.balance.toFixed(2)}，历史提醒不代表当前仍受限。`;
  if(n.target==='plan'){const c=DB.campaigns.find(c=>c.id===n.ref);return c?`${c.name} · ${this.workspaceStateLabel(this.homePlanState(c))}`:'该计划当前不可访问。';}
  return n.target==='report'?'数据是否完整以报表中的更新时间与延迟说明为准。':'请查看当前账户信息或服务安排。';
 };
 A.workspaceStateLabel=s=>({ready:'可投放',review:'等待审核',blocked:'暂不可投放',upcoming:'尚未开始',ended:'已结束',paused:'已暂停',archived:'已归档',unknown:'状态待确认'}[s]||s);
 A.notifItem=function(n){return `<button class="ws-message ${n.read?'':'unread'}" onclick="App.readNotif(${Number(n.id)})"><span class="badge ${this.notificationCategory(n)==='finance'?'blue':'gray'}">${categories[this.notificationCategory(n)]}</span><b>${E(n.title)}</b><p>${E(n.desc)}</p><small>${E(n.at?n.at.replace('T',' ').replace('Z',' UTC'):n.time)} · ${n.read?'已读':'未读'}</small></button>`;};
 A.toggleNotif=function(e){e?.stopPropagation();if(document.getElementById('notifPop'))return this.closeNotifPop();const pop=document.createElement('div');pop.id='notifPop';pop.className='notif-pop ws-notif-pop';const r=document.getElementById('bellBtn').getBoundingClientRect();pop.style.top=(r.bottom+8)+'px';pop.style.right='12px';pop.innerHTML=`<div class="notif-head"><b>通知</b><span class="badge blue">${this.unreadCount()}条未读</span><div class="spacer"></div>${button('全部已读','App.markAllRead()')}</div><div class="notif-list">${this.visibleNotifications().slice(0,5).map(n=>this.notifItem(n)).join('')||'<p class="empty">暂无通知</p>'}</div><div class="notif-foot">${button('查看全部通知','App.openNotifCenter()','btn btn-primary')}</div>`;document.body.append(pop);this._notifOut=ev=>{if(!pop.contains(ev.target)&&!document.getElementById('bellBtn').contains(ev.target))this.closeNotifPop();};setTimeout(()=>document.addEventListener('click',this._notifOut,true),0);};
 A.openNotifCenter=function(){this.closeNotifPop();this.modal(`<div class="modal-head"><div><h3>通知中心</h3><p>查看业务进展与处理结果</p></div><div class="spacer"></div>${button('全部已读','App.markAllRead()')}${closeButton()}</div><div class="modal-body" id="notifCenter"><div class="ws-filters"><label>分类<select class="select" id="wsNotifCategory" onchange="App.renderNotifCenter()"><option value="all">全部分类</option>${Object.entries(categories).map(([k,v])=>`<option value="${k}" ${this.notifCategory===k?'selected':''}>${v}</option>`).join('')}</select></label><label>阅读状态<select class="select" id="wsNotifRead" onchange="App.renderNotifCenter()"><option value="all">全部</option><option value="unread">未读</option><option value="read">已读</option></select></label></div><div id="notifCenterList"></div></div>`,true);this.renderNotifCenter();};
 A.renderNotifCenter=function(){const el=document.getElementById('notifCenterList');if(!el)return;const cat=document.getElementById('wsNotifCategory').value,read=document.getElementById('wsNotifRead').value;this.notifCategory=cat;const list=this.visibleNotifications().filter(n=>(cat==='all'||this.notificationCategory(n)===cat)&&(read==='all'||n.read===(read==='read')));el.innerHTML=`<p class="cell-sub">${list.length}条消息 · 已读不代表业务问题已解决</p><div class="ws-messages">${list.map(n=>this.notifItem(n)).join('')||'<p class="empty">没有符合条件的通知</p>'}</div>`;};
 A.readNotif=function(id){const n=this.visibleNotifications().find(n=>n.id===id);if(!n)return;n.read=true;this.save();this.syncBell();this.closeNotifPop();const label={creative:'查看创意与版本',plan:'查看计划',report:'查看对应报表',recharge:'查看充值记录',billing:'查看资金',settings:'查看账户信息',notice:'我知道了'}[n.target]||'我知道了';this.modal(`<div class="modal-head"><div><span class="badge blue">${categories[this.notificationCategory(n)]}</span><h3>${E(n.title)}</h3></div>${closeButton()}</div><div class="modal-body"><p class="cell-sub">${E(n.at?.replace('T',' ').replace('Z',' UTC')||n.time)}</p><h4>当时发生了什么</h4><p>${E(n.desc)}</p><div class="notice info"><b>当前情况</b><p>${E(this.notificationCurrent(n))}</p></div></div><div class="modal-foot">${button('返回通知中心','App.openNotifCenter()')}${button(label,`App.followNotification(${id})`,'btn btn-primary')}</div>`,true);};
 A.markAllRead=function(){this.visibleNotifications().forEach(n=>n.read=true);this.save();this.syncBell();this.refreshNotifViews();this.toast('已标记为已读，未解决的问题仍会在首页提示');};
 A.followNotification=function(id){const n=this.visibleNotifications().find(n=>n.id===id);if(!n)return;this.closeModal();switch(n.target){case 'creative':this.openCreativePreview(n.ref);break;case 'plan':this.openPlan(n.ref);break;case 'report':this.openWorkspaceReport(n.ref);break;case 'recharge':this.openWorkspaceRecharge(n.ref);break;case 'billing':this.go('billing');break;case 'settings':this.go('settings');if(n.ref)this.renderSetTab(n.ref);break;}};
 A.openWorkspaceRecharge=function(id){if(!this.canOpen('billing'))return this.showPermissionDenied();const r=DB.recharges.find(r=>r.id===id);if(!r)return;this.go('billing');this.modal(`<div class="modal-head"><h3>充值记录 · ${E(id)}</h3>${closeButton()}</div><div class="modal-body"><div class="summary-list"><div><span>申请金额</span><b>$${r.amount.toFixed(2)}</b></div><div><span>申请时间</span><b>${E(r.date)} UTC</b></div><div><span>处理结果</span><b>${{pending:'处理中',approved:'已到账',rejected:'已驳回'}[r.status]}</b></div><div><span>审核说明</span><b>${E(r.reviewOpinion)}</b></div></div><p>充值申请金额不是广告花费；只有实际到账款项才增加可用余额。</p></div><div class="modal-foot">${button('返回资金记录','App.closeModal()')}</div>`,true);};
 const oldState=A.homePlanState;
 A.homePlanState=function(c){const groups=DB.adGroups.filter(g=>g.camp===c.id&&g.status==='active'&&(!g.start||g.start<=new Date().toISOString().slice(0,10))&&(!g.end||g.end>=new Date().toISOString().slice(0,10)));const state=oldState.call(this,c);if(state==='review'&&!groups.some(g=>DB.creatives.some(a=>a.groupId===g.id&&a.status==='review')))return 'blocked';return state;};
 A.homeAlerts=function(){
  if(!this.isAdvertiserBound())return [];
  const d=new Date().toISOString().slice(0,10),soon=new Date(Date.now()+2*864e5).toISOString().slice(0,10),list=[];
  const plans=DB.campaigns.filter(c=>!['archived','paused','ended'].includes(c.status)&&(!c.end||c.end>=d));
  const add=(type,c,priority,title,desc,label,call,extra={})=>list.push({id:type+':'+(extra.group?.id||c?.id||'account'),type,c,priority,title,desc,label,call,...extra});
  if(this.canOpen('billing')&&plans.some(c=>c.mode==='rtb'&&(!c.start||c.start<=d))){
   const end=DB.factThrough,begin=new Date(new Date(end+'T00:00:00Z').getTime()-7*864e5).toISOString().slice(0,10);
   const avg=(DB.deliveryFacts||[]).filter(r=>r.mode==='rtb'&&r.date>begin&&r.date<=end).reduce((s,r)=>s+r.cents,0)/700;
   if(DB.balance<=0)add('balance',null,0,'账户余额不足','RTB投放受限，补充余额后重新检查投放条件。','查看资金',"App.go('billing')");
   else if(avg>0&&DB.balance/avg<2)add('balance-risk',null,1,'余额预计不足2天用量',`余额 $${DB.balance.toFixed(2)}；近7个完整日平均消耗 $${avg.toFixed(2)}/天，预计可用 ${(DB.balance/avg).toFixed(1)} 天。实际消耗可能变化。`,'查看资金',"App.go('billing')",{ignorable:true});
  }
  if(this.canOpen('plans'))for(const c of plans){
   if(c.syncStatus==='failed'){add('sync',c,2,'投放状态待确认','状态更新延迟不代表已经停投，平台正在核查。','联系运营','App.showCpdContact()');continue;}
   if(c.start&&c.start>soon)continue;
   if((!c.start||c.start<=d)&&c.mode==='rtb'&&c.totalBudget>0&&c.spend>=c.totalBudget){add('budget',c,0,'总预算已用完','当前计划投放受限；如需继续投放，请调整预算。',this.role().mutate?'调整预算':'查看计划',this.role().mutate?`App.openCampaignEdit(${JSON.stringify(c.id)})`:`App.openPlan(${JSON.stringify(c.id)})`);continue;}
   const groups=DB.adGroups.filter(g=>g.camp===c.id&&g.status==='active'&&(!g.end||g.end>=d)&&(!g.start||g.start<=soon));
   for(const g of groups){const cr=DB.creatives.filter(a=>a.groupId===g.id&&a.status!=='archived'),future=(g.start||c.start||d)>d;
    if(!cr.length)add('missing',c,future?1:0,future?'即将开始，尚未添加创意':'尚未添加创意',future?`排期 ${g.start||c.start} 开始，请提前准备并送审。`:'已到开始时间，该广告组暂无创意可投放。',c.mode==='rtb'&&this.role().mutate?'添加创意':'查看广告组',c.mode==='rtb'&&this.role().mutate?`App.openNewCreativeForGroup(${JSON.stringify(g.id)})`:`App.openGroupDetail(${JSON.stringify(g.id)})`,{group:g,ignorable:future});
    else if(!future&&cr.every(a=>a.status==='rejected'))add('rejected',c,0,'广告组全部创意被驳回',`${cr.length}条创意未通过审核，该广告组无法投放。进入后查看各条驳回原因并修改。`,'查看驳回创意',`App.openGroupDetail(${JSON.stringify(g.id)})`,{group:g});
   }
  }
  return list.sort((a,b)=>a.priority-b.priority);
 };
 // Dismissals belong to this browser's current member and advertiser, not the account as a whole.
 A.homeIgnoreKey=function(){const p=this.profile()||{};return 't1-home-ignored-v1:'+JSON.stringify([p.advertiserId||p.advertiserName||'default',p.email||p.name||'current-member']);};
 A.homeIssueState=function(){const issues=this.homeAlerts();let saved={};try{saved=JSON.parse(localStorage.getItem(this.homeIgnoreKey())||'{}');}catch{};
  for(const id of Object.keys(saved))if(!issues.some(a=>a.id===id&&a.ignorable))delete saved[id];
  localStorage.setItem(this.homeIgnoreKey(),JSON.stringify(saved));return {issues,saved};
 };
 const saveHomeState=A.save;A.save=function(...args){const result=saveHomeState.apply(this,args);if(DB.factThrough)this.homeIssueState();return result;};
 A.setHomeIssueView=function(view){this.homeIssueView=view;this.homeIssuesExpanded=false;this.refreshHomeIssues();};
 A.refreshHomeIssues=function(){const el=document.getElementById('homeIssues');if(el)el.outerHTML=this.renderHomeIssues();};
 A.showHomeAlerts=function(){this.homeIssuesExpanded=!this.homeIssuesExpanded;this.refreshHomeIssues();};
 A.ignoreHomeIssue=function(id,restore=false){const {issues,saved}=this.homeIssueState();if(!issues.some(a=>a.id===id&&a.ignorable))return;if(restore)delete saved[id];else saved[id]=true;localStorage.setItem(this.homeIgnoreKey(),JSON.stringify(saved));this.refreshHomeIssues();this.toast(restore?'已恢复提醒':'已忽略，可在“已忽略”中恢复；不影响投放状态');};
 A.renderHomeIssues=function(){
  const {issues,saved}=this.homeIssueState(),system=issues.filter(a=>a.type==='sync'),active=issues.filter(a=>a.type!=='sync'&&!saved[a.id]),ignored=issues.filter(a=>saved[a.id]),isIgnored=this.homeIssueView==='ignored',rows=isIgnored?ignored:active;
  const category={balance:'资金与预算','balance-risk':'资金与预算',budget:'资金与预算',rejected:'创意审核',missing:'投放准备',sync:'系统与数据'};
  const row=a=>`<div class="home-issue-row"><div class="home-issue-copy"><div class="home-issue-title"><span class="badge gray">${category[a.type]}</span><b>${E(a.title)}</b></div><div class="home-issue-object">${a.group?`广告组：${E(a.group.name)} <span class="cell-sub">${E(a.group.id)}</span><br>所属计划：${E(a.c.name)} · ${E(a.c.id)}`:a.c?`计划：${E(a.c.name)} · ${E(a.c.id)}`:'账户：'+E(this.profile()?.advertiserName||'当前广告主')} ${a.c?' · '+a.c.mode.toUpperCase():''}</div><p>${E(a.desc)}</p></div><div class="home-issue-actions">${button(a.label,a.call)}${a.ignorable?button(isIgnored?'恢复提醒':'忽略',`App.ignoreHomeIssue(${JSON.stringify(a.id)},${isIgnored})`):''}</div></div>`;
  return `<section id="homeIssues" class="card home-issues"><div class="home-section-title home-issue-heading"><h2>需要关注与处理</h2><span class="cell-sub">${active.length}项待处理</span>${rows.length>3?`<button class="btn btn-ghost btn-sm" aria-expanded="${!!this.homeIssuesExpanded}" onclick="App.showHomeAlerts()">${this.homeIssuesExpanded?'收起':'展开全部（'+rows.length+'）'}</button>`:''}</div><div class="home-issue-tabs">${button('待处理（'+active.length+'）',"App.setHomeIssueView('active')",'btn btn-sm '+(!isIgnored?'btn-primary':'btn-ghost'))}${button('已忽略（'+ignored.length+'）',"App.setHomeIssueView('ignored')",'btn btn-sm '+(isIgnored?'btn-primary':'btn-ghost'))}</div>${isIgnored?'<p class="home-issue-note">仅对当前用户忽略本次风险，不改变投放状态。风险升级或解决后再次出现时重新提醒。</p>':''}${rows.length?(this.homeIssuesExpanded?rows:rows.slice(0,3)).map(row).join(''):'<p class="home-issue-note">'+(isIgnored?'暂无已忽略事项':'暂无需要处理的事项')+'</p>'}${!isIgnored&&system.length?'<div class="home-system-heading cell-sub">状态提示 · 平台核查中</div>'+system.map(row).join(''):''}</section>`;
 };

 // Use the same current-plan classification on home and destination pages.
 A.unifiedPlanIssue=function(c,creatives){const state=this.homePlanState(c),m={ready:['ready','可投放','green'],review:['review','创意审核中','amber'],paused:['paused','计划已暂停','gray'],ended:['ended','投放已结束','gray'],upcoming:['upcoming','尚未开始','blue'],archived:['archived','已归档','gray'],unknown:['error','状态待确认','amber']};if(m[state]){const [key,label,cls]=m[state];return {key,label,cls};}if(c.mode==='rtb'&&DB.balance<=0)return {key:'balance',label:'账户余额不足',cls:'red'};if(c.mode==='rtb'&&c.totalBudget>0&&c.spend>=c.totalBudget)return {key:'budget',label:'总预算已用完',cls:'red'};const cr=(creatives||[]).filter(a=>a.status!=='archived');return cr.length&&cr.every(a=>a.status==='rejected')?{key:'rejected',label:'创意全部驳回',cls:'red'}:{key:'no-creative',label:'暂无可投创意',cls:'amber'};};
 const groupIssue=A.groupDeliveryIssue,creativeIssue=A.creativeDeliveryIssue,desc=A.deliveryIssueDescription;
 A.groupDeliveryIssue=function(g,c,cr){const p=this.unifiedPlanIssue(c,DB.creatives.filter(a=>a.camp===c.id));if(['balance','budget','archived'].includes(p.key))return p;if(g.status==='archived')return {key:'archived',label:'广告组已归档',cls:'gray'};return groupIssue.call(this,g,c,cr);};
 A.creativeDeliveryIssue=function(a,g,c){const p=this.groupDeliveryIssue(g,c,[a]);if(['balance','budget','archived'].includes(p.key))return p;return creativeIssue.call(this,a,g,c);};
 A.deliveryIssueDescription=function(issue,c){return {ready:'当前满足可投放条件，实际曝光以投放数据为准。',balance:'账户余额不足；补充余额后重新检查其他投放条件。',budget:'计划总预算已用完；若需继续投放，请调整预算。',archived:'该对象已归档，历史数据仍保留。',error:'当前状态更新延迟，暂时无法确认，不代表投放已经停止。'}[issue.key]||desc.call(this,issue,c);};

 // Alerts are ongoing conditions; messages remain historical events.
 const home=A.view_matureDash;A.view_matureDash=function(){return home.call(this).replaceAll('· 开始投放','· 计划开始');};
})();
