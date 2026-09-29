/* Phase 1+2: bounded navigation and complete advertised entry points. */
(()=>{
 const A=App,E=A.workspace.E,B=A.workspace.button,close=()=>B('关闭','App.closeModal()');
 const wrap=(name,fn)=>{const old=A[name];A[name]=function(...args){return fn.call(this,old?.bind(this),...args);};};
 const allowed=new Set(['dash','plans','report','billing','help']);
 const guides={
  start:{title:'平台快速入门',desc:'从关联广告主到查看投放结果',steps:['注册并登录T1账号，创建广告主、申请绑定已有广告主，或通过邀请码确认绑定。','未完成关联时，只能浏览介绍与帮助；申请审核中可查看进度，驳回后按原因修改重提。','RTB由广告主配置预算、广告组与创意；CPD先联系运营确认资源和排期。','投放结果在数据报表查看；充值与资金消耗在财务管理查看。'],action:'创建或绑定广告主',call:'App.scopeStart()'},
  rtb:{title:'RTB自助投放',desc:'按计划、广告组、广告创意三层创建',steps:['广告计划：填写名称，设置排期、总预算或每日预算。','广告组：设置出价、定向和投放范围，检查与计划预算、排期的关系。','广告创意：上传符合规格的素材，填写标题、描述和跳转链接，确认后提交审核。','创建后进入对应计划查看广告组与创意。开启不等于一定可投放，还需满足审核、排期、余额及预算条件。'],action:'创建RTB投放',call:'App.scopeStart()'},
  cpd:{title:'CPD运营代投',desc:'运营配置资源与排期，广告主查看投放并协作修改创意',steps:['联系对接运营，提供产品、目标广告位、期望排期及素材需求。','运营确认资源和价格后创建CPD计划；广告主在广告投放中查看计划与广告组。','广告主不能修改CPD的价格、库存、排期和启停；允许的创意内容可编辑送审。','新版本待审时仍展示当前生效版本；新版本通过后替换。驳回原因和历史投放数据可以查回。'],action:'联系运营',call:"App.scopeContact('CPD投放咨询')"},
  report:{title:'查看投放效果',desc:'按投放类型、查询周期和对象分析',steps:['选择RTB或CPD及查询日期，再查看汇总、趋势和明细。','默认按计划汇总；需要定位差异时再按广告组、创意、广告位或地区查看。','CTR按总点击除以总曝光计算。0代表没有量，—代表不可用或不适用。','归档不删除历史数据。CPD不按曝光分摊虚构花费，合同与结算事项由运营确认。'],action:'打开数据报表',call:"App.go('report')"},
  finance:{title:'充值与消耗记录',desc:'区分充值申请、到账和广告花费',steps:['进入财务管理发起充值，按实际收款配置付款并提交凭证。','申请处理中不增加余额；到账后更新余额。驳回时查看原因并重新提交凭证。','充值记录保存金额、凭证和审核结果；消耗记录按日期和RTB计划查询。','消耗记录与报表使用相同的RTB花费口径，保留归档计划历史。CPD合同费用不混入RTB钱包扣费。'],action:'打开财务管理',call:"App.go('billing')"},
  review:{title:'审核与创意版本',desc:'首次审核和修改版本分开查看',steps:['首次提交后，尚无审核通过的版本时不能投放。','已有生效版本的创意提交修改，新版审核期间保留旧版；不要把待审稿当作正在展示的素材。','驳回后在创意详情查看原因，按意见修改重提。','通知记录审核事件；当前是否能投放，以计划、广告组和创意当前条件为准。'],action:'查看广告投放',call:"App.go('plans')"}
 };
 // Remove only future surfaces; nested creative management stays in campaign/group pages.
 NAV.splice(0,NAV.length,{group:'总览',items:[
  {id:'dash',label:'首页',ico:I.dash,sub:'概览与需要处理的事项'}
 ]},{group:'投放管理',items:[
  {id:'plans',label:'广告投放',ico:I.camp,sub:'CPD运营代投与RTB自助投放'}
 ]},{group:'资产与分析',items:[
  {id:'report',label:'数据报表',ico:I.report,sub:'投放效果与明细'},
  {id:'billing',label:'财务管理',ico:I.wallet,sub:'充值、充值记录与消耗记录'}
 ]});
 PAGES.help={label:'帮助中心',sub:'使用指南与联系运营',nav:'help'};
 wrap('canOpen',function(old,id){return allowed.has(PAGES[id]?.nav||id);});
 wrap('load',function(old){old();
  DB.notifications=DB.notifications.filter(n=>!(n.target==='settings'&&n.ref==='accounts'));
  if(!allowed.has(DB.uiState?.lastPage))DB.uiState.lastPage='dash';
  if(window.T1_REVIEW&&!sessionStorage.getItem('t1-scope-baseline'))sessionStorage.setItem('t1-scope-baseline',JSON.stringify(DB));
 });
 wrap('init',function(old){old();this.demoRole='owner';this.renderNav();this.scopeMount();this.syncAccountContext();});
 A.scopeGuard=function(){if(this.isAdvertiserBound())return true;this.go('dash');const app=this.advertiserApplication();if(app?.status==='pending'||app?.status==='rejected')this.scopeApplication();else this.openAdvertiserGate();return false;};
 wrap('go',function(old,id){
  if(['settings','creatives'].includes(id))id='dash';
  if(!allowed.has(PAGES[id]?.nav||id)&&!['newplan','newgroup','newad','campdetail','groupdetail'].includes(id))id='dash';
  this.scopeCloseMenu();this.closeNotifPop();
  if(['plans','report','billing','newplan','newgroup','newad','campdetail','groupdetail'].includes(id)&&!this.isAdvertiserBound()){
   old('dash');this.scopeApplication();return;
  }
  return old(id);
 });
 wrap('startRtbCreate',function(old){if(this.scopeGuard())return old();});
 A.scopeStart=function(){this.closeModal();if(this.isAdvertiserBound())this.startRtbCreate();else this.scopeApplication();};
 A.scopeApplication=function(){const a=this.advertiserApplication();if(!a)return this.openAdvertiserGate();
  const pending=a.status==='pending',rejected=a.status==='rejected';
  this.modal(`<div class="modal-head"><h3>${pending?'申请审核中':rejected?'申请未通过':'广告主关联信息'}</h3>${close()}</div><div class="modal-body"><div class="summary-list"><div><span>申请类型</span><b>${a.type==='new'?'新创建广告主':'绑定已有广告主'}</b></div><div><span>广告主名称</span><b>${E(a.advertiser||'—')}</b></div><div><span>提交时间</span><b>${E(a.submittedAt||'—')}</b></div></div><p>${pending?'正在核验你的申请，请勿重复提交。结果会在通知中展示。':E(a.rejectReason||'请检查当前关联结果。')}</p></div><div class="modal-foot">${B('联系运营',"App.scopeContact('开户绑定咨询')")}${pending&&a.type==='new'?B('撤销申请','App.cancelAdvertiserApplication()'):''}${rejected?B('修改并重新申请','App.reapplyAdvertiser()','btn btn-primary'):''}${close()}</div>`,true);
 };
 A.scopeMount=function(){
  document.querySelector('.sidebar-foot .user-card')?.remove();
  if(!document.getElementById('scopeAccount')){
   const node=document.createElement('div');node.id='scopeAccount';node.className='scope-account';
   node.innerHTML=`<button class="btn btn-ghost" id="scopeAccountTrigger" aria-expanded="false" aria-haspopup="true" onclick="App.scopeOpenMenu()"><span class="scope-avatar">${E((SESSION.account||'U')[0])}</span><span class="scope-user-name">${E(SESSION.account||'我的账号')}</span><span>⌄</span></button><div id="scopeAccountMenu" class="scope-menu" hidden><div class="scope-menu-identity">${E(this.profile()?.email||SESSION.account)}</div>${B('帮助中心',"App.go('help')")}${B('联系运营',"App.scopeContact('平台使用咨询')")}<hr>${B('更换登录账号','App.scopeExit(true)')}${B('退出登录','App.scopeExit(false)')}</div>`;
   document.querySelector('.topbar').append(node);
   let timer;node.addEventListener('mouseenter',()=>{clearTimeout(timer);this.scopeOpenMenu();});node.addEventListener('mouseleave',()=>{timer=setTimeout(()=>this.scopeCloseMenu(),220);});
   node.addEventListener('focusout',e=>{if(!node.contains(e.relatedTarget))this.scopeCloseMenu();});
   document.addEventListener('click',e=>{if(!node.contains(e.target))this.scopeCloseMenu();});
  }
  const bell=document.getElementById('bellBtn');bell.setAttribute('aria-label','通知');bell.setAttribute('aria-haspopup','true');
  if(window.T1_REVIEW&&!document.getElementById('scopeReviewTools')){
   const node=document.createElement('details');node.id='scopeReviewTools';node.className='scope-review-tools';node.innerHTML=`<summary>演示工具 · 非产品功能</summary><p>仅评审入口可见；切换会重置本评审标签页的样例，不影响普通Demo。</p><label>预览状态<select class="select" onchange="App.scopeSwitchState(this.value)">${Object.entries(this.scopeStates).map(([k,v])=>`<option value="${k}" ${sessionStorage.getItem('t1-scope-state')===k?'selected':''}>${v}</option>`).join('')}</select></label><p>当前范围：一期＋二期。账户与组织、独立创意中心不在本期。</p>`;document.querySelector('.sidebar-foot').append(node);
  }
 };
 A.scopeOpenMenu=function(){this.closeNotifPop();const el=document.getElementById('scopeAccountMenu');if(el)el.hidden=false;document.getElementById('scopeAccountTrigger')?.setAttribute('aria-expanded','true');};
 A.scopeCloseMenu=function(){const el=document.getElementById('scopeAccountMenu');if(el)el.hidden=true;document.getElementById('scopeAccountTrigger')?.setAttribute('aria-expanded','false');};
 A.scopeToggleMenu=function(){document.getElementById('scopeAccountMenu')?.hidden?this.scopeOpenMenu():this.scopeCloseMenu();};
 A.scopeExit=function(switching){this.scopeCloseMenu();this.modal(`<div class="modal-head"><h3>${switching?'更换登录账号？':'退出登录？'}</h3>${close()}</div><div class="modal-body"><p>将退出当前登录，返回登录页。未提交的表单内容不会保存。</p><p class="cell-sub">不会暂停广告，也不会删除已保存的投放数据。</p></div><div class="modal-foot">${B('继续使用','App.closeModal()')}${B(switching?'退出并更换账号':'确认退出','App.scopeDoExit()','btn btn-primary')}</div>`);};
 A.scopeDoExit=function(){localStorage.removeItem('54ads_session_dsp');location.href='login.html'+(window.T1_REVIEW?'?review=1':'');};
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){A.scopeCloseMenu();A.closeNotifPop();if(document.getElementById('modalMask').classList.contains('open')&&!A._uploading)A.closeModal();}});
 A.scopeContact=function(topic='平台使用咨询'){
  this.scopeCloseMenu();this.closeNotifPop();this.scopeContactText=`咨询主题：${topic}\n广告主：${this.isAdvertiserBound()?(this.profile()?.advertiserName||'当前广告主'):'尚未关联'}\n账号：${this.profile()?.email||SESSION.account}\n相关计划/广告组：\n需求或问题描述：\n期望排期（如适用）：`;
  this.modal(`<div class="modal-head"><h3>联系运营</h3>${close()}</div><div class="modal-body"><p>请在已有商务／运营沟通群中联系对接人，并发送以下信息。</p><div class="notice info">${this.isAdvertiserBound()?'优先联系为你安排资源或开户的商务／运营。':'尚未开户时，请联系邀请你使用T1的商务。'}如没有群入口，请联系最初对接你的商务。可复制下方内容说明你的需求。</div><label class="field" style="margin-top:16px">咨询内容<textarea class="input" id="scopeContactText" rows="7">${E(this.scopeContactText)}</textarea></label><p class="cell-sub">复制后自行发送；本页不会自动向运营提交工单。</p></div><div class="modal-foot">${B('查看使用指南',"App.closeModal();App.go('help')")}${B('复制咨询内容','App.scopeCopyContact()','btn btn-primary')}</div>`,true);
 };
 A.scopeCopyContact=async function(){const el=document.getElementById('scopeContactText');try{await navigator.clipboard.writeText(el.value);this.toast('已复制，请粘贴到现有业务沟通群发送');}catch{el.focus();el.select();this.toast('请复制已选中的咨询内容','info');}};
 A.showCpdContact=function(){this.scopeContact('CPD投放咨询');};A.showCpdSalesTip=A.showCpdContact;
 A.view_help=function(){return `<div class="page-head"><div><h1>帮助中心</h1><p>查看操作指南，或联系运营确认具体业务问题。</p></div>${B('联系运营',"App.scopeContact()")}</div><div class="scope-guide-grid">${Object.entries(guides).map(([id,g])=>`<button class="card scope-guide-card" onclick="App.scopeOpenGuide('${id}')"><h2>${g.title}</h2><p>${g.desc}</p><span>阅读指南 →</span></button>`).join('')}</div>`;};
 A.scopeOpenGuide=function(id){const g=guides[id];if(!g)return;this.closeModal();this.go('help');document.getElementById('content').innerHTML=`<article class="card scope-guide-article">${B('← 返回帮助中心',"App.go('help')")}<h1>${g.title}</h1><p class="muted">${g.desc}</p><ol>${g.steps.map(t=>`<li>${t}</li>`).join('')}</ol><div class="scope-guide-actions">${B(g.action,g.call,'btn btn-primary')}${B('联系运营',`App.scopeContact(${JSON.stringify(g.title)})`)}</div></article>`;};
 A.view_experienceDash=function(state){const pending=state==='pending',rejected=state==='rejected',bound=this.isAdvertiserBound();
  const title=pending?'申请已提交，等待审核':rejected?'申请未通过，请完善信息':bound?'开始你的第一条投放':'欢迎使用T1广告平台';
  const desc=pending?'查看申请进度，审核期间也可以了解投放方式。':rejected?(this.advertiserApplication()?.rejectReason||'请查看驳回原因后修改重提。'):bound?'选择RTB自主投放，或联系运营安排CPD推广。':'先创建或绑定广告主，再开始投放和管理资金。';
  return `<div class="advertiser-home home-onboarding"><section class="home-welcome"><h1>${title}</h1><p>${E(desc)}</p><div class="home-actions">${pending?B('查看申请','App.scopeApplication()','btn btn-primary'):rejected?B('修改并重新申请','App.reapplyAdvertiser()','btn btn-primary'):B(bound?'创建RTB投放':'创建或绑定广告主','App.scopeStart()','btn btn-primary')}${B('联系运营','App.scopeContact()')}</div></section><div class="scope-guide-grid">${['rtb','cpd','report'].map(k=>`<button class="card scope-guide-card" onclick="App.scopeOpenGuide('${k}')"><h2>${guides[k].title}</h2><p>${guides[k].desc}</p><span>了解详情 →</span></button>`).join('')}</div></div>`;
 };
 wrap('view_matureDash',function(old){return old().replace(/<button\b[^>]*>账户设置<\/button>/g,'').replace('投放概况','计划状态').replaceAll('>开始投放','>排期开始');});
 // Keep notification classification, but no link to deferred organization pages.
 wrap('visibleNotifications',function(old){return old().filter(n=>{
  if(n.target==='settings'&&n.ref==='accounts')return false;
  if(!this.isAdvertiserBound())return n.target==='application'||n.target==='notice';
  if(n.target==='creative')return DB.creatives.some(a=>a.id===n.ref);
  if(n.target==='plan'||n.target==='report'&&n.ref)return DB.campaigns.some(c=>c.id===n.ref);
  if(n.target==='recharge')return DB.recharges.some(r=>r.id===n.ref);
  return true;
 });});
 wrap('toggleNotif',function(old,e){this.scopeCloseMenu();old(e);document.getElementById('bellBtn').setAttribute('aria-expanded',String(!!document.getElementById('notifPop')));});
 wrap('closeNotifPop',function(old){old();document.getElementById('bellBtn')?.setAttribute('aria-expanded','false');});
 wrap('readNotif',function(old,id){old(id);const n=this.visibleNotifications().find(n=>n.id===id);if(n?.target==='settings'||n?.target==='application'){
  const b=document.querySelector('#modalMask .modal-foot .btn-primary');if(b)b.textContent=n.target==='application'?'查看申请':'返回首页';
 }});
 wrap('followNotification',function(old,id){const n=this.visibleNotifications().find(n=>n.id===id);if(n?.target==='settings'){this.closeModal();this.go('dash');return;}if(n?.target==='application')return this.scopeApplication();old(id);});
 wrap('notificationCurrent',function(old,n){if(n.target==='application'){const a=this.advertiserApplication();return a?.status==='pending'?'申请仍在审核中。':a?.status==='rejected'?'申请已驳回，请查看原因并修改。':this.isAdvertiserBound()?'广告主已关联。':'当前没有待审核申请。';}if(n.target==='settings')return this.isAdvertiserBound()?'广告主已关联，可以从首页进入投放。':'当前尚未关联广告主。';return old(n);});
 // Finance owns recharge workflow and RTB daily consumption; no new settlement/invoicing product.
 A.view_billing=function(){const cents=(DB.deliveryFacts||[]).filter(r=>r.mode==='rtb').reduce((s,r)=>s+(r.cents||0),0);
  return `<div class="page-head"><div><h1>财务管理</h1><p>充值审核通过后增加余额；投放消耗与充值申请分开查看。</p></div>${B('充值','App.openDeposit()','btn btn-primary')}</div><div class="grid cols-3" style="margin-bottom:20px"><div class="card kpi"><div class="kpi-label">可用余额（USD）</div><div class="kpi-val">${fmtMoney(DB.balance)}</div></div><div class="card kpi"><div class="kpi-label">待审核充值（USD）</div><div class="kpi-val">${fmtMoney(DB.recharges.filter(r=>r.status==='pending').reduce((s,r)=>s+r.amount,0))}</div><p class="cell-sub">尚未计入余额</p></div><div class="card kpi"><div class="kpi-label">已提供周期内RTB消耗</div><div class="kpi-val">${fmtMoney(cents/100)}</div><p class="cell-sub">${DB.factFrom} 至 ${DB.factThrough} · 含归档计划</p></div></div><div class="segment scope-fin-tabs">${B('充值记录',"App.scopeFinanceTab('recharges')",'btn '+(this.scopeFinTab!=='spend'?'btn-primary':'btn-ghost'))}${B('消耗记录',"App.scopeFinanceTab('spend')",'btn '+(this.scopeFinTab==='spend'?'btn-primary':'btn-ghost'))}</div><div id="scopeFinBody"></div>`;
 };
 A.after_billing=function(){this.scopeRenderFinance();};
 A.scopeFinanceTab=function(tab){this.scopeFinTab=tab;this.go('billing');};
 A.scopeRenderFinance=function(){const el=document.getElementById('scopeFinBody');if(!el)return;
  if(this.scopeFinTab==='spend'){
   const f=this.scopeSpendFilter||{from:DB.factFrom,to:DB.factThrough,kw:''};
   el.innerHTML=`<section class="card card-pad"><div class="scope-fin-filters"><label>开始日期<input class="input" type="date" id="scopeSpendFrom" value="${f.from}"></label><label>结束日期<input class="input" type="date" id="scopeSpendTo" value="${f.to}"></label><label>计划名称／ID<input class="input" id="scopeSpendKw" value="${E(f.kw)}"></label>${B('查询','App.scopeQuerySpend()')}</div><p class="cell-sub">RTB按日期、计划汇总；CPD合同费用不计入钱包消耗，请联系运营核对。</p><div id="scopeSpendRows"></div></section>`;this.scopeQuerySpend();
  }else{
   el.innerHTML=`<section class="card"><div class="card-head"><h3>充值记录</h3><div class="spacer"></div><select class="select" id="billStatusFilter" onchange="App.renderBilling()"><option value="">全部状态</option><option value="pending">待审核</option><option value="approved">已到账</option><option value="rejected">已驳回</option></select><input class="input" id="billSearch" placeholder="搜索充值单号" oninput="App.renderBilling()"></div><div class="table-wrap"><table><thead><tr><th>申请时间</th><th>充值单号</th><th>金额（USD）</th><th>状态</th><th>操作</th></tr></thead><tbody id="billBody"></tbody></table></div></section>`;this.renderBilling();
  }
 };
 A.renderBilling=function(){const el=document.getElementById('billBody');if(!el)return;const status=document.getElementById('billStatusFilter').value,kw=document.getElementById('billSearch').value.toLowerCase();const rows=DB.recharges.filter(r=>(!status||r.status===status)&&r.id.toLowerCase().includes(kw));
  el.innerHTML=rows.map(r=>`<tr><td>${E(r.date)}</td><td>${E(r.id)}</td><td>${fmtMoney(r.amount)}</td><td><span class="badge ${r.status==='approved'?'green':r.status==='rejected'?'red':'amber'}">${({approved:'已到账',pending:'待审核',rejected:'已驳回',cancelled:'已取消'})[r.status]||'—'}</span></td><td>${B('查看详情',`App.viewShot(${JSON.stringify(r.id)})`)}</td></tr>`).join('')||'<tr><td colspan="5"><div class="empty">暂无符合条件的充值记录</div></td></tr>';
 };
 A.scopeQuerySpend=function(page=1){const f={from:document.getElementById('scopeSpendFrom').value,to:document.getElementById('scopeSpendTo').value,kw:document.getElementById('scopeSpendKw').value.trim()};if(!f.from||!f.to||f.from>f.to){this.toast('请选择正确的开始和结束日期','warn');return;}this.scopeSpendFilter=f;
  const map=new Map();for(const r of DB.deliveryFacts||[]){if(r.mode!=='rtb'||r.date<f.from||r.date>f.to)continue;const c=DB.campaigns.find(c=>c.id===r.camp),name=c?.name||r.camp;if(f.kw&&!`${name} ${r.camp}`.toLowerCase().includes(f.kw.toLowerCase()))continue;const key=r.date+'|'+r.camp,v=map.get(key)||{date:r.date,camp:r.camp,name,cents:0,archived:c?.status==='archived'};v.cents+=r.cents||0;map.set(key,v);}
  const rows=[...map.values()].sort((a,b)=>b.date.localeCompare(a.date)||a.camp.localeCompare(b.camp)),pages=Math.max(1,Math.ceil(rows.length/10));page=Math.min(page,pages);
  const outside=f.from<DB.factFrom||f.to>DB.factThrough;
  document.getElementById('scopeSpendRows').innerHTML=`${outside?`<div class="notice warning">可用数据覆盖 ${DB.factFrom} 至 ${DB.factThrough}；范围外尚未提供，不视为0消耗。</div>`:''}<p>当前查询合计：<b>${fmtMoney(rows.reduce((s,r)=>s+r.cents,0)/100)}</b> · ${rows.length}条</p><div class="table-wrap"><table><thead><tr><th>日期（UTC）</th><th>广告计划</th><th>花费（USD）</th><th>操作</th></tr></thead><tbody>${rows.slice((page-1)*10,page*10).map(r=>`<tr><td>${r.date}</td><td>${E(r.name)}${r.archived?' <span class="badge gray">已归档</span>':''}<div class="cell-sub">${E(r.camp)}</div></td><td>${fmtMoney(r.cents/100)}</td><td>${B('查看对应报表',`App.scopeSpendReport(${JSON.stringify(r.camp)},${JSON.stringify(r.date)})`)}</td></tr>`).join('')||`<tr><td colspan="4"><div class="empty">${outside?'查询范围内暂无已提供的数据':'暂无符合条件的消耗记录'}</div></td></tr>`}</tbody></table></div><div class="scope-pages">${page>1?B('上一页',`App.scopeQuerySpend(${page-1})`):''}<span>${page} / ${pages}</span>${page<pages?B('下一页',`App.scopeQuerySpend(${page+1})`):''}</div>`;
 };
 A.scopeSpendReport=function(camp,date){this.ensureWorkspaceReport();Object.assign(this.wsReport,{mode:'rtb',camp,group:'',creative:'',from:date,to:date,dim:'camp',grain:'total',archive:'all',page:1});this.go('report');};
 A.openWorkspaceRecharge=function(id){this.scopeFinTab='recharges';this.go('billing');this.viewShot(id);};
 wrap('openDeposit',function(old){if(!this.scopeGuard())return;old();
  const hint=document.querySelector('#modalMask .hint');if(hint)hint.textContent='提交付款凭证后由平台核验；审核通过才增加可用余额。';
  const qr=document.querySelector('#modalMask .pay-qr');if(qr)qr.innerHTML='<div class="scope-payment-example">收款信息示例<br>本Demo不接收真实转账</div>';
  const addr=document.getElementById('depAddr');if(addr)addr.value='DEMO_ONLY_NOT_A_PAYMENT_ADDRESS';
  const copy=addr?.parentElement.querySelector('button');if(copy){copy.disabled=true;copy.title='演示地址不可用于付款';}
  document.querySelector('#modalMask .modal-body').insertAdjacentHTML('beforeend',`<div class="field" style="margin-top:16px"><label>付款凭证<span class="req">*</span></label><input class="input" type="file" id="scopeDepositFile" accept="image/png,image/jpeg" onchange="App.scopeDepositPreview(this)"><p id="scopeDepositFileHint" class="cell-sub">JPG／PNG，最大10MB</p></div>`);this.scopeDepositFile=null;
  const b=document.querySelector('#modalMask .modal-foot .btn-primary');b.textContent='提交充值申请';
 });
 A.scopeDepositPreview=function(input){const f=input.files?.[0];this.scopeDepositFile=null;if(!f)return;if(!['image/png','image/jpeg'].includes(f.type)||f.size>10*1024*1024){input.value='';this.toast('请上传10MB以内的JPG或PNG图片','warn');return;}const rd=new FileReader();rd.onload=()=>{this.scopeDepositFile={name:f.name,data:rd.result};document.getElementById('scopeDepositFileHint').textContent='已选择：'+f.name;};rd.readAsDataURL(f);};
 A.doDeposit=function(){const v=Number(document.getElementById('depAmt').value);if(!Number.isFinite(v)||v<50){this.toast('最低充值金额为50美元','warn');return;}if(!this.scopeDepositFile){this.toast('请上传付款凭证','warn');return;}
  const id='RC-'+Date.now(),now=new Date().toISOString();DB.recharges.unshift({id,date:now.slice(0,16).replace('T',' '),amount:v,method:'USDT',network:'TRC20',status:'pending',shot:this.scopeDepositFile.name,shotData:this.scopeDepositFile.data,reviewOpinion:'付款凭证已提交，等待核验',reviewTime:'—'});
  DB.notifications.unshift({id:Date.now(),category:'finance',title:'充值申请已提交',desc:`${fmtMoney(v)}充值申请已提交，尚未计入余额。`,target:'recharge',ref:id,at:now,read:false});this.save();this.closeModal();this.scopeFinTab='recharges';this.go('billing');this.syncBell();this.toast('申请已提交，审核通过后到账');
 };
 for(const name of ['submitAdvertiserApplication','confirmInviteBinding','confirmCancelAdvertiserApplication'])if(typeof A[name]==='function')wrap(name,function(old,...args){const before=localStorage.getItem('t1_advertiser_application'),bound=this.isAdvertiserBound();const result=old(...args),after=localStorage.getItem('t1_advertiser_application');if(before!==after||bound!==this.isAdvertiserBound()){const a=this.advertiserApplication();DB.notifications.unshift({id:Date.now(),category:'service',title:this.isAdvertiserBound()?'广告主绑定成功':a?.status==='pending'?'申请已提交':'申请已撤销',desc:this.isAdvertiserBound()?'已关联广告主，可以开始投放。':a?.status==='pending'?'申请正在审核，请耐心等待。':'当前申请已撤销，可重新发起。',target:this.isAdvertiserBound()?'settings':'application',ref:'basic',at:new Date().toISOString(),read:false});this.save();this.syncBell();}return result;});
 // Reviewer states use isolated data and remain outside the production navigation.
 A.scopeStates={active:'已关联 · 有投放（RTB＋CPD）',healthy:'已关联 · 正常投放，无紧急问题',unbound:'已登录 · 未关联广告主',pending:'开户申请审核中',rejected:'开户申请驳回',bindPending:'绑定申请审核中',bindRejected:'绑定申请驳回',empty:'已关联 · 无投放',rtb:'仅RTB投放',cpd:'仅CPD投放',balance:'有投放 · 余额不足',quiet:'有投放 · 通知为空'};
 A.scopeSwitchState=function(key){if(!window.T1_REVIEW||!this.scopeStates[key])return;const selected=key;key=key==='bindPending'?'pending':key==='bindRejected'?'rejected':key;this.stopUfTracking();this.ufWorking=null;this.ufInitialDirty=false;this.editFlow=null;this.closeModal();this.closeNotifPop();
  const base=JSON.parse(sessionStorage.getItem('t1-scope-baseline'));Object.assign(DB,base);this.wsReport=null;this.homeIssuesExpanded=false;this.scopeFinTab='recharges';this.scopeSpendFilter=null;
  const bound=!['unbound','pending','rejected'].includes(key);localStorage.setItem('t1_demo_profile',JSON.stringify({name:'Victor Wang',email:'victor@example.com',advertiserName:'星海互动',advertiserBound:bound,role:'owner'}));localStorage.removeItem('t1_advertiser_application');
  if(!bound||key==='empty'){DB.campaigns=[];DB.adGroups=[];DB.creatives=[];DB.deliveryFacts=[];DB.notifications=[];DB.recharges=[];DB.txns=[];DB.balance=0;}
  if(key==='pending'||key==='rejected'){const a={type:selected.startsWith('bind')?'bind':'new',advertiser:'星海互动',status:key==='pending'?'pending':'rejected',submittedAt:new Date().toISOString(),contact:'Victor Wang',applicant:'Victor Wang',email:'victor@example.com',contactMethod:'tg',contactNumber:'@example_contact',product:'StarWave',site:'https://example.com',industry:'游戏',rejectReason:key==='rejected'?'产品网址无法访问，请核对网址并补充产品说明。':''};localStorage.setItem('t1_advertiser_application',JSON.stringify(a));DB.notifications=[{id:Date.now(),category:'service',title:(a.type==='bind'?'绑定':'开户')+(key==='pending'?'申请已提交':'申请未通过'),desc:key==='pending'?'资料已收到，正在核验。':a.rejectReason,target:'application',at:new Date().toISOString(),read:false}];}
  if(['rtb','cpd'].includes(key)){DB.campaigns=DB.campaigns.filter(c=>c.mode===key);const ids=new Set(DB.campaigns.map(c=>c.id));DB.adGroups=DB.adGroups.filter(g=>ids.has(g.camp));DB.creatives=DB.creatives.filter(a=>ids.has(a.camp));DB.deliveryFacts=DB.deliveryFacts.filter(r=>ids.has(r.camp));if(key==='cpd'){DB.balance=0;DB.recharges=[];}}
  if(key==='healthy'){DB.campaigns=DB.campaigns.filter(c=>c.id==='W-C1');DB.adGroups=DB.adGroups.filter(g=>g.camp==='W-C1');DB.creatives=DB.creatives.filter(a=>a.camp==='W-C1');DB.deliveryFacts=DB.deliveryFacts.filter(r=>r.camp==='W-C1');DB.balance=5000;}if(key==='balance')DB.balance=0;if(key==='quiet')DB.notifications=[];
  sessionStorage.setItem('t1-scope-state',selected);this.save();this.syncAccountContext();document.getElementById('balTop').textContent=fmtMoney(DB.balance);this.syncBell();this.go('dash');this.toast('已切换评审样例：'+this.scopeStates[selected]);
 };
})();
