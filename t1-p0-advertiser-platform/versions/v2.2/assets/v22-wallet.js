/* Advertiser-owned balance and durable recharge records. UI mock, not a T1-user wallet. */
(()=>{
 'use strict';
 const A=App,E=A.workspace.E,B=A.workspace.button,J=JSON.stringify;
 const labels={pending:'处理中',approved:'已到账',rejected:'未通过',cancelled:'已撤销'};
 const amount=n=>Number(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
 const eye=hidden=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>${hidden?'<path d="m3 3 18 18"/>':''}</svg>`;
 const can=()=>A.isAdvertiserBound()&&A.v22Can('finance');
 const owner=()=>({id:A.profile()?.sspAdvertiserId||A.joinUser()?.advertiserId||'ADV-70285',name:A.profile()?.advertiserName||(A.joinUser()?.advertiserId==='ADV-70285'?'星海互动':'当前广告主')});
 const privacyKey=()=>`t1-v22-balance-visible:${A.joinUser()?.id||A.v22Member()?.id||'me'}:${owner().id}`;
 const visible=()=>{try{return localStorage.getItem(privacyKey())==='1'}catch{return false}};
 const state=()=>A.walletBalanceState||'ready';
 const value=()=>state()==='loading'?'加载中…':state()==='error'?'暂不可用':visible()?amount(DB.balance):'••••••';
 const toggle=()=>`<button type="button" class="wallet-eye" aria-label="${visible()?'隐藏':'显示'}广告主余额" aria-pressed="${visible()}" onclick="App.walletToggleBalance()">${eye(!visible())}</button>`;
 A.walletRecords=function(){if(!can())return [];return DB.recharges.filter(r=>(r.advertiserId||'ADV-70285')===owner().id)};
 A.walletToggleBalance=function(){if(!can())return;try{localStorage.setItem(privacyKey(),visible()?'0':'1')}catch{}this.walletPaint()};
 A.walletOpenRecords=function(status){if(!can())return this.showPermissionDenied();this.closeModal();this.walletRecordFilter={status:status||'',kw:'',from:'',to:''};this.scopeFinTab='recharges';this.go('billing')};
 A.walletRefresh=function(){if(!can())return;this.walletBalanceState='loading';this.walletPaint();clearTimeout(this.walletRefreshTimer);this.walletRefreshTimer=setTimeout(()=>{this.walletBalanceState='ready';this.walletPaint();if(document.getElementById('walletRecordTable'))this.renderBilling()},450)};
 A.walletPaint=function(){
  const box=document.getElementById('financeBox');if(!box)return;
  const o=owner();box.className='wallet-header';box.removeAttribute('style');box.style.display=can()?'flex':'none';
  // Keep balTop even when unavailable: older workspace code also updates this node.
  box.innerHTML=`<div class="wallet-top-info"><button class="wallet-balance-link" onclick="App.walletOpenRecords()" aria-label="查看当前广告主的财务管理"><span>广告主余额 <small>USD</small></span><b id="balTop">${can()?value():'—'}</b></button><small class="wallet-owner" title="${E(o.name)} · ${E(o.id)}">${E(o.name)} · ${E(o.id)}</small></div>${toggle()}${B('充值','App.openDeposit()','btn btn-primary')}${B('充值记录','App.walletOpenRecords()','btn btn-ghost wallet-record-link')}`;
  document.querySelectorAll('[data-wallet-balance]').forEach(el=>el.textContent=can()?value():'—');
  document.querySelectorAll('[data-wallet-toggle]').forEach(el=>el.innerHTML=toggle());
  const hint=document.getElementById('walletBalanceHint');if(hint)hint.textContent=state()==='error'?'余额暂未获取成功，请重试；不会将失败显示为0。':state()==='loading'?'正在获取广告主最新余额…':'余额属于当前绑定广告主，不是T1登录账号的资金。';
  const retry=document.getElementById('walletRetry');if(retry)retry.hidden=state()!=='error';
  const home=document.querySelector('#content [data-wallet-home]');if(home)home.textContent=value();
 };
 const sync=A.syncAccountContext;A.syncAccountContext=function(...args){const r=sync.apply(this,args);this.walletPaint();return r};
 const go=A.go;A.go=function(...args){const r=go.apply(this,args);this.walletPaint();return r};
 // Finance-role homepage used to expose an unmasked balance independently.
 const dash=A.view_dash;A.view_dash=function(){let html=dash.call(this);if(can()&&this.v22Role()==='finance')html=html.replace('可用余额（USD）','广告主余额（USD）').replace(`<div class="v22-kpi">${fmtMoney(DB.balance)}</div>`,`<div class="v22-kpi" data-wallet-home>${value()}</div><span data-wallet-toggle>${toggle()}</span>`);return html};
 A.view_billing=function(){
  if(!can())return '<section class="card v22-panel"><h1>财务管理</h1><p>绑定广告主并具有财务访问权限后，可查看该广告主的余额与充值记录。</p></section>';
  const o=owner(),rows=this.walletRecords(),pending=rows.filter(r=>r.status==='pending').length,rejected=rows.filter(r=>r.status==='rejected').length;
  return `<div class="page-head"><div><h1>财务管理</h1><p>当前广告主：<b>${E(o.name)}</b> · ${E(o.id)}</p></div>${B('充值','App.openDeposit()','btn btn-primary')}</div>
   <div class="wallet-cards"><section class="card wallet-balance-card"><div class="wallet-card-title">广告主余额 <small>USD</small><span data-wallet-toggle>${toggle()}</span></div><div class="wallet-amount" data-wallet-balance>${value()}</div><p id="walletBalanceHint">余额属于当前绑定广告主，不是T1登录账号的资金。</p>${B('刷新余额与记录','App.walletRefresh()','btn btn-ghost')}<button id="walletRetry" class="btn" onclick="App.walletRefresh()" hidden>重试</button></section>
   <button class="card wallet-count" onclick="App.walletOpenRecords('pending')"><span>处理中申请</span><b>${pending}<small> 笔</small></b><p>查看审核进度，尚未计入余额 →</p></button><button class="card wallet-count" onclick="App.walletOpenRecords('rejected')"><span>未通过申请</span><b>${rejected}<small> 笔</small></b><p>查看原因并补充资料 →</p></button></div>
   <div id="scopeFinBody"></div>`;
 };
 const financeRender=A.scopeRenderFinance;A.scopeRenderFinance=function(){
  financeRender.call(this);const body=document.getElementById('scopeFinBody');if(!body||!can())return;const f=this.walletRecordFilter||{status:'',kw:'',from:'',to:''};
  body.innerHTML=`<section class="card" id="walletRecordTable"><div class="card-head"><div><h3>充值记录</h3><p class="cell-sub">保留历次申请及结果，关闭页面或已读通知不会删除记录。</p></div><div class="spacer"></div>${B('导出当前查询','App.v22ExportFinance()')}</div>
  <div class="wallet-filters"><label>状态<select class="select" id="billStatusFilter" onchange="App.renderBilling()"><option value="">全部状态</option>${Object.entries(labels).map(([k,v])=>`<option value="${k}" ${f.status===k?'selected':''}>${v}</option>`).join('')}</select></label><label>充值申请单号<input class="input" id="billSearch" placeholder="搜索申请单号" value="${E(f.kw)}" oninput="App.renderBilling()"></label><label>开始日期<input class="input" type="date" id="walletFrom" value="${E(f.from)}" onchange="App.renderBilling()"></label><label>结束日期<input class="input" type="date" id="walletTo" value="${E(f.to)}" onchange="App.renderBilling()"></label>${B('重置筛选','App.walletOpenRecords()')}</div>
  <p id="walletFilterError" class="v22-error" role="alert"></p><div class="table-wrap"><table><thead><tr><th>最近提交时间</th><th>申请单号</th><th>转账金额</th><th>实际到账金额</th><th>当前状态</th><th>操作</th></tr></thead><tbody id="billBody"></tbody></table></div></section>`;
  this.renderBilling();this.walletPaint();
  if(window.T1_REVIEW&&!document.getElementById('walletReviewTools'))document.getElementById('financeReviewTools')?.insertAdjacentHTML('beforeend',`<div id="walletReviewTools"><label>广告主余额演示 <select class="select" onchange="App.walletBalanceCase(this.value)"><option value="ready">正常余额</option><option value="loading">加载中</option><option value="error">加载失败</option><option value="zero">真实0余额</option></select></label><p>金额默认隐藏，小眼睛同步顶部与财务页。仅为屏幕隐私设置，不改变权限；记录金额不随之隐藏。线上余额展示和充值记录均为本次新增需求，不代表此前已经上线。</p></div>`);
 };
 const input=id=>document.getElementById(id)?.value||'';
 A.walletFilteredRecords=function(){const f=this.walletRecordFilter||{};return this.walletRecords().filter(r=>(!f.status||r.status===f.status)&&(!f.kw||r.id.toLowerCase().includes(f.kw.toLowerCase()))&&(!f.from||r.date.slice(0,10)>=f.from)&&(!f.to||r.date.slice(0,10)<=f.to)).sort((a,b)=>String(b.date).localeCompare(String(a.date))||b.id.localeCompare(a.id))};
 A.renderBilling=function(){if(!document.getElementById('walletRecordTable'))return;this.walletRecordFilter={status:input('billStatusFilter'),kw:input('billSearch').trim(),from:input('walletFrom'),to:input('walletTo')};const f=this.walletRecordFilter,invalid=f.from&&f.to&&f.from>f.to;document.getElementById('walletFilterError').textContent=invalid?'开始日期不能晚于结束日期，请调整。':'';
  const rows=invalid?[]:this.walletFilteredRecords();document.getElementById('billBody').innerHTML=rows.map(r=>`<tr><td>${E(r.date)}</td><td>${E(r.id)}</td><td>${amount(r.amount)} ${E(r.currency||'USD')}</td><td>${r.status==='approved'?amount(r.creditedAmount??r.amount)+' USD':'—'}</td><td><span class="v22-status ${r.status==='approved'?'good':r.status==='rejected'?'bad':'warn'}">${E(labels[r.status]||'待确认')}</span>${r.status==='rejected'?`<p class="wallet-reason">${E(r.reviewOpinion||'请查看详情')}</p>`:r.processing==='verified'?'<p class="wallet-reason">审核已通过，到账待确认</p>':''}</td><td>${B('查看详情',`App.viewShot(${J(r.id)})`)}${r.status==='rejected'?B('补充资料',`App.v22FinanceForm(${J(r.id)})`,'btn btn-ghost'):''}</td></tr>`).join('')||`<tr><td colspan="6"><div class="empty">${invalid?'请调整日期后查询':this.walletRecords().length?'暂无符合条件的记录，可重置筛选。':'暂无充值申请。完成转账后，可点击「充值」提交付款资料。'}</div></td></tr>`;
 };
 const form=A.v22FinanceForm;A.v22FinanceForm=function(id){if(id&&!this.walletRecords().some(r=>r.id===id))return this.toast('该充值记录不属于当前广告主或已不可访问','warn');return form.call(this,id)};
 const view=A.viewShot;A.viewShot=function(id){if(!can())return this.showPermissionDenied();if(!this.walletRecords().some(r=>r.id===id))return this.toast('该充值记录不属于当前广告主或已不可访问','warn');return view.call(this,id)};
 // Same advertised owner scope and filters for export; no user-owned wallet is created.
 A.v22ExportFinance=function(){if(!can())return this.showPermissionDenied();const f=this.walletRecordFilter||{};if(f.from&&f.to&&f.from>f.to)return this.toast('请调整日期后导出','warn');const rows=[['广告主ID','广告主名称','最近提交时间','申请单号','转账金额','转账币种','实际到账金额','账户币种','状态'],...this.walletFilteredRecords().map(r=>[owner().id,owner().name,r.date,r.id,r.amount,r.currency||'USD',r.status==='approved'?(r.creditedAmount??r.amount):'','USD',labels[r.status]])];const csv=rows.map(row=>row.map(x=>'"'+String(x??'').replace(/^[=+@-]/,"'$&").replaceAll('"','""')+'"').join(',')).join('\r\n'),url=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='T1-广告主充值记录.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)};
 A.walletBalanceCase=function(kind){if(!window.T1_REVIEW)return;clearTimeout(this.walletRefreshTimer);if(this.walletOriginalBalance===undefined)this.walletOriginalBalance=DB.balance;if(kind==='zero'){this.walletBalanceState='ready';DB.balance=0;this.walletWasZero=true}else{this.walletBalanceState=kind;if(this.walletWasZero){DB.balance=this.walletOriginalBalance;this.walletWasZero=false}}this.walletPaint()};
})();
