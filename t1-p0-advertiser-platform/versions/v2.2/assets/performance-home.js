/* V2.2 proposal: descriptive CTR comparisons. No causal or optimization claims. */
(()=>{
 'use strict';
 const A=App,E=A.workspace.E,B=A.workspace.button,J=JSON.stringify;
 const wrap=(key,fn)=>{const old=A[key];A[key]=function(...args){return fn.call(this,old?.bind(this),...args)}};
 const day=(s,n)=>new Date(new Date(s+'T00:00:00Z').getTime()+n*864e5).toISOString().slice(0,10);
 const n=x=>Number(x).toLocaleString('en-US'),pct=x=>x==null?'—':x.toFixed(2)+'%',diff=x=>(x>0?'+':'')+x.toFixed(2);
 const sum=rows=>rows.reduce((t,r)=>({imps:t.imps+r.imps,clicks:t.clicks+r.clicks,cents:t.cents+(r.cents||0)}),{imps:0,clicks:0,cents:0});
 const ctr=t=>t.imps?t.clicks/t.imps*100:null;
 const dims={creative:'创意',group:'广告组',slot:'广告位',camp:'计划'};
 const close='<button class="icon-btn" aria-label="关闭" onclick="App.closeModal()">✕</button>';
 const formName={feed:'信息流',splashimg:'开屏图片',banner:'横幅',splash:'开屏'};
 // One-time enrichment of built-in mock clicks only. No real or user-created entities, costs or balances changed.
 A.phSeed=function(){
  if(DB.performanceFixture===1||!DB.deliveryFacts?.length)return;
  const end=DB.factThrough,from=day(end,-13);
  for(const r of DB.deliveryFacts){if(!/^W-/.test(r.creative)||r.date<from)continue;
   const k=Math.round((new Date(r.date)-new Date(from))/864e5),slotFactor=r.slot==='SL-02'?1.25:r.slot==='SL-04'?.65:1;
   const base=r.creative==='W-A1'?.014+k*.00065:r.creative==='W-A1B'?.021-k*.001:r.creative==='W-A1C'?.010-k*.00025:r.creative==='W-A2'?.012+k*.0002:r.creative==='W-A7'?.02-k*.00045:null;
   if(base!=null)r.clicks=Math.round(r.imps*base*slotFactor);
  }
  const c=DB.campaigns.find(c=>c.id==='W-C1');if(c&&!c.dailyCap)c.dailyCap=160;
  for(const [list,key]of [[DB.campaigns,'camp'],[DB.adGroups,'group'],[DB.creatives,'creative']])for(const o of list){if(!/^W-/.test(o.id))continue;const t=sum(DB.deliveryFacts.filter(r=>r[key]===o.id));o.imps=t.imps;o.clicks=t.clicks;o.ctr=ctr(t)||0;}
  DB.performanceFixture=1;this.save();
 };
 wrap('load',function(old){old();this.phSeed()});
 wrap('scopeSwitchState',function(old,key){old(key);DB.performanceFixture=0;this.phSeed();this.phState=null;this.phHomeExample=null;this.homeIssueView='active';this.homeIssuesExpanded=false;this.go('dash')});
 A.phConfig=function(){
  if(!this.phState)this.phState={dim:'creative',mode:DB.campaigns.some(c=>c.mode==='rtb')?'rtb':'cpd',camp:'',group:'',format:''};
  const s=this.phState,plans=DB.campaigns.filter(c=>c.mode===s.mode);
  if(s.camp&&!plans.some(c=>c.id===s.camp))s.camp='';
  if(['creative','group'].includes(s.dim)&&!s.camp)s.camp=(plans.find(c=>c.id==='W-C1')||plans[0])?.id||'';
  const groups=DB.adGroups.filter(g=>g.camp===s.camp);
  if(s.group&&!groups.some(g=>g.id===s.group))s.group='';
  if(s.dim==='creative'&&!s.group)s.group=groups[0]?.id||'';
  const formats=[...new Set((DB.deliveryFacts||[]).filter(r=>r.mode===s.mode&&(!s.camp||r.camp===s.camp)&&(s.dim!=='creative'||r.group===s.group)).map(r=>this.phFormat(r)))];
  if(!formats.includes(s.format))s.format=formats[0]||'';
  return s;
 };
 A.phFormat=function(r){return DB.adGroups.find(g=>g.id===r.group)?.format||DB.creatives.find(a=>a.id===r.creative)?.fmt||DB.campaigns.find(c=>c.id===r.camp)?.fmt||'未标注形式'};
 A.phSet=function(key,val){this.phConfig()[key]=val;if(key==='mode'||key==='dim'){this.phState.camp='';this.phState.group='';this.phState.format=''}if(key==='camp')this.phState.group='';this.go('dash')};
 A.phData=function(){
  const s=this.phConfig(),to=DB.factThrough||day(new Date().toISOString().slice(0,10),-1),from=day(to,-6),prevFrom=day(to,-13),prevTo=day(to,-7);
  const facts=(DB.deliveryFacts||[]).filter(r=>r.date>=prevFrom&&r.date<=to&&r.mode===s.mode&&(!s.camp||r.camp===s.camp)&&(s.dim!=='creative'||r.group===s.group)&&(!s.format||this.phFormat(r)===s.format));
  const by=new Map();for(const r of facts){const key=r[s.dim];if(!by.has(key))by.set(key,[]);by.get(key).push(r)}
  const rows=[...by].map(([key,ff])=>{
   const f=ff[0],c=DB.campaigns.find(c=>c.id===f.camp),g=DB.adGroups.find(g=>g.id===f.group),a=DB.creatives.find(a=>a.id===key),o=s.dim==='camp'?DB.campaigns.find(c=>c.id===key):s.dim==='group'?DB.adGroups.find(g=>g.id===key):a;
   const current=sum(ff.filter(r=>r.date>=from)),previous=sum(ff.filter(r=>r.date<from));
   const delayed=ff.some(r=>DB.campaigns.find(c=>c.id===r.camp)?.syncStatus==='failed');
   const currentOk=current.imps>=1000&&!delayed,previousOk=previous.imps>=1000&&!delayed&&DB.factFrom<=prevFrom;
   return {key,name:s.dim==='slot'?f.slotName:o?.name||key,context:s.dim==='creative'?c?.name+' / '+g?.name:s.dim==='group'?c?.name:s.dim==='slot'?'实际投放广告位 · '+(formName[s.format]||s.format):s.mode.toUpperCase()+' · '+(o?.status==='archived'?'已归档，保留历史':'计划'),current,previous,currentCtr:ctr(current),previousCtr:ctr(previous),delta:currentOk&&previousOk?ctr(current)-ctr(previous):null,currentOk,previousOk,delayed,facts:ff,asset:a?.assetId};
  }).sort((a,b)=>(b.currentCtr??-1)-(a.currentCtr??-1)||a.key.localeCompare(b.key));
  const eligible=rows.filter(r=>r.currentOk),longitudinal=rows.filter(r=>r.currentOk&&r.previousOk),up=longitudinal.filter(r=>r.delta>=.01).sort((a,b)=>b.delta-a.delta),down=longitudinal.filter(r=>r.delta<=-.01).sort((a,b)=>a.delta-b.delta);
  const ranked=eligible.length>1&&Math.max(...eligible.map(r=>r.currentCtr))-Math.min(...eligible.map(r=>r.currentCtr))>=.01;
  return {s:{...s},to,from,prevFrom,prevTo,facts,rows,eligible,longitudinal,high:ranked?eligible[0]:null,low:ranked?eligible.at(-1):null,up:up[0]||null,down:down[0]||null};
 };
 A.phScopeLabel=function(s){const c=DB.campaigns.find(c=>c.id===s.camp),g=DB.adGroups.find(g=>g.id===s.group);return [s.mode.toUpperCase(),c?.name||'全部计划',s.dim==='creative'?g?.name:'',formName[s.format]||s.format].filter(Boolean).join(' / ')};
 A.phCard=function(kind,r,d){
  const labels={high:'点击率最高',low:'点击率最低',up:'点击率上升最多',down:'点击率下降最多'},trend=['up','down'].includes(kind);
  const reason=trend?(d.longitudinal.length?'本期没有符合展示条件的'+(kind==='up'?'上升':'下降'):'需要两期都有足够数据'):d.eligible.length<2?'至少需要2个样本充足的对象':'当前对象点击率基本持平';
  if(!r)return `<article class="ph-card ph-muted"><div class="ph-card-label">${labels[kind]}</div><div class="ph-no-result">暂无可展示结果</div><p>${reason}</p></article>`;
  const value=trend?diff(r.delta):pct(r.currentCtr),ties=(trend?d.longitudinal:d.eligible).filter(x=>Math.abs((trend?x.delta:x.currentCtr)-(trend?r.delta:r.currentCtr))<1e-10).length;
  return `<article class="ph-card" data-kind="${kind}"><div class="ph-card-label"><span class="ph-indicator ${kind}"></span>${labels[kind]}${ties>1?' · 并列':''}</div><div class="ph-value ${trend?'ph-'+kind:''}">${value}${trend?'<small>个百分点</small>':''}</div><h3 title="${E(r.name)}">${E(r.name)}</h3><p class="ph-context">${E(r.context)}</p><div class="ph-card-data">${trend?`${pct(r.previousCtr)} → ${pct(r.currentCtr)}<br>`:''}曝光 ${n(r.current.imps)} · 点击 ${n(r.current.clicks)}</div>${B(trend?'查看趋势 →':'查看对比 →',`App.phOpenScope(${J(d.s)},${J(r.key)},${trend})`,'link-btn ph-action')}</article>`;
 };
 // Each row keeps its own scope: rendering four dimensions must not overwrite click destinations.
 A.phOpenScope=function(scope,key,trend=false){this.phState={...scope};this.phOpen(key,trend)};
 A.phDashboardData=function(){
  const saved=this.phState?{...this.phState}:null,mode=this.phConfig().mode;
  const read=scope=>{this.phState={...scope};return this.phData()};
  const base={mode,dim:'camp',camp:'',group:'',format:''},all=read(base);
  const choose=scopes=>scopes.map(read).sort((a,b)=>Number(b.eligible.length>1)-Number(a.eligible.length>1)||b.eligible.reduce((n,r)=>n+r.current.imps,0)-a.eligible.reduce((n,r)=>n+r.current.imps,0))[0];
  const plans=DB.campaigns.filter(c=>c.mode===mode);
  let creative=choose(DB.adGroups.filter(g=>plans.some(c=>c.id===g.camp)).map(g=>({...base,dim:'creative',camp:g.camp,group:g.id})))||read({...base,dim:'creative'});
  let group=choose(plans.map(c=>({...base,dim:'group',camp:c.id})))||read({...base,dim:'group'});
  if(this.phHomeExample&&mode==='rtb'){
   const small=this.phHomeExample==='small';creative=read({...base,dim:'creative',camp:small?'W-C13':'W-C1',group:small?'W-G13':this.phHomeExample==='single'?'W-G1B':'W-G1',format:'feed'});
   group=read({...base,dim:'group',camp:small?'W-C13':'W-C1',format:'feed'});
  }
  const result=[creative,group,read({...base,dim:'slot',format:all.s.format}),all];
  this.phState=saved||{...creative.s};return result;
 };
 A.renderPerformance=function(){
  const sections=this.phDashboardData(),d=sections[0],mode=d.s.mode;
  const row=data=>`<section class="ph-dimension" data-dimension="${data.s.dim}" aria-label="${dims[data.s.dim]}表现"><div class="ph-dimension-head"><div><h3>${dims[data.s.dim]}表现</h3><p>${data.s.dim==='creative'?'同组比较':data.s.dim==='group'?'同计划比较':'同类型、同形式比较'} · ${E(this.phScopeLabel(data.s))}</p></div>${B('查看全部对比 →',`App.phOpenScope(${J(data.s)},null,false)`,'link-btn')}</div>${data.rows.length?`<div class="ph-cards">${['high','low','up','down'].map(k=>this.phCard(k,data[k],data)).join('')}</div><p class="ph-row-note">${data.eligible.length}个对象参与本期排名 · ${data.longitudinal.length}个可比较前期</p>`:'<p class="ph-row-empty">当前范围暂无完整投放记录，暂不生成比较结果。</p>'}</section>`;
  return `<section class="card ph-panel ph-flat" id="performancePanel"><div class="ph-heading"><div><h2>投放表现与变化</h2><p>各维度的点击率高低与变化，直接查看</p></div><div class="ph-global-controls"><label>投放类型<select class="select" aria-label="比较投放类型" onchange="App.phSet('mode',this.value)"><option value="rtb" ${mode==='rtb'?'selected':''}>RTB</option><option value="cpd" ${mode==='cpd'?'selected':''}>CPD</option></select></label>${B('比较口径','App.phRules()')}</div></div><div class="ph-dates"><span>最近7个完整日：${d.from} — ${d.to}</span><span>对比：${d.prevFrom} — ${d.prevTo} · UTC</span></div><div class="ph-dimensions">${sections.map(row).join('')}</div><p class="ph-note">只展示点击结果，不判断原因或建议调整。样本不足或数据待更新不参与精选；统计截至 ${d.to}。</p></section>`;
 };
 A.view_matureDash=function(){return `<div class="advertiser-home ph-home"><div class="home-heading"><h1>账户概览</h1></div>${this.renderHomeIssues()}${this.canOpen('report')?this.renderPerformance():''}<nav class="home-quicklinks">${B('广告投放',"App.go('plans')",'link-btn')}${B('数据报表',"App.go('report')",'link-btn')}${this.canOpen('billing')?B('财务管理',"App.go('billing')",'link-btn'):''}${B('帮助中心',"App.go('help')",'link-btn')}</nav>${this.role().mutate?'':'<p class="v22-readonly">当前为只读视角，可查看数据；调整投放请联系有权限的成员。</p>'}</div>`};
 A.phRules=function(){this.modal(`<div class="modal-head"><h3>比较口径</h3>${close}</div><div class="modal-body ph-rules"><p><b>横向：</b>同投放类型、同广告形式；创意限定同组，广告组限定同计划。排名按本期总点击÷总曝光，不是每天CTR平均值。</p><p><b>首页平铺：</b>创意、广告组、广告位、计划同时展示。创意优先展示有至少两个合格对象且本期合格对象总曝光最多的广告组；广告组按相同规则选择计划。广告位、计划展示同类型同形式的结果，具体范围写在每块标题下。不同广告形式不混排。本版默认形式沿用该范围数据中的首个形式，正式范围选择规则待评审。</p><p><b>纵向：</b>最近7个完整日对比前7日，按CTR百分点变化排列；两期合计差异不称为连续趋势。前期CTR为0，不计算相对增幅。</p><p><b>样本：</b>本演示以每期至少1,000次曝光作为入选门槛，正式阈值待确认，不代表统计显著性。零点击但曝光足够仍参与。数据延迟不当作零。</p><p><b>范围：</b>计划、组、创意按自身ID统计，创意版本暂合并。比较的是实际结果，不据此认定素材、定向或广告位导致了变化。</p><p><b>其他维度：</b>时段、具体人群及变更事件待确认SSP数据能力，本版不虚构数据。CPD不分摊合同花费。</p><p><b>空态：</b>单一对象不生成高低榜，数据不足不排名，无上涨／下降不强凑结果。多个对象精确并列时标明并列，可在明细查看。</p></div>`,true)};
 PAGES.performance={label:'投放表现对比',nav:'report'};
 A.phOpen=function(key,trend=false){if(!this.canOpen('report'))return this.showPermissionDenied();this.phSelected=key;this.phDetailTab=trend?'trend':'compare';this.go('performance')};
 A.phSelectDetail=function(key){this.phSelected=key;this.phDetailTab='trend';this.go('performance')};
 A.phSetDetailTab=function(tab){this.phDetailTab=tab;this.go('performance')};
 A.phTrendSvg=function(r,d){
  const values=[];for(let i=0;i<14;i++){const date=day(d.prevFrom,i),t=sum(r.facts.filter(f=>f.date===date));values.push(t.imps?ctr(t):null)}
  const max=Math.max(.1,...values.filter(v=>v!=null))*1.15,w=800,h=180,x=i=>50+i*54,y=v=>160-v/max*130;
  let path='';values.forEach((v,i)=>{if(v==null)return;path+=(i===0||values[i-1]==null?'M':'L')+x(i)+','+y(v)+' '});
  return `<svg class="ph-chart" viewBox="0 0 ${w} ${h+38}" role="img" aria-label="${E(r.name)}的14日点击率走势，纵轴单位百分比"><rect x="${x(6)+27}" y="16" width="380" height="145" fill="var(--accent-soft)"/><text x="80" y="18">前7天</text><text x="${x(7)+10}" y="18">最近7天</text>${[0,1,2].map(i=>{const v=max*i/2;return `<line x1="50" y1="${y(v)}" x2="752" y2="${y(v)}" stroke="var(--border)"/><text x="0" y="${y(v)+4}">${v.toFixed(1)}%</text>`}).join('')}<path d="${path}" fill="none" stroke="var(--accent)" stroke-width="2.5"/>${values.map((v,i)=>v==null?'':`<circle cx="${x(i)}" cy="${y(v)}" r="3" fill="var(--accent)"><title>${day(d.prevFrom,i)} CTR ${pct(v)}</title></circle>`).join('')}${[0,3,6,9,13].map(i=>`<text x="${x(i)}" y="190" text-anchor="middle">${day(d.prevFrom,i).slice(5)}</text>`).join('')}</svg>`;
 };
 A.view_performance=function(){
  const d=this.phData(),r=d.rows.find(r=>r.key===this.phSelected)||d.rows[0];
  const headers='<th>对象 / 所属范围</th><th>曝光</th><th>点击</th><th>本期CTR</th><th>前期CTR</th><th>变化（百分点）</th><th>比较状态</th><th>查看</th>';
  const status=r=>r.delayed?'数据待更新':!r.currentOk?'本期样本不足':!r.previousOk?'前期样本不足':'可比较';
  return `<div class="ph-detail"><div class="page-head"><div><h1>投放表现对比</h1><p>${E(this.phScopeLabel(d.s))}</p></div><div class="spacer"></div>${B('返回首页',"App.go('dash')")}${B('比较口径','App.phRules()')}</div><section class="card ph-panel"><div class="ph-dates"><span>本期 ${d.from} — ${d.to}</span><span>前期 ${d.prevFrom} — ${d.prevTo} · UTC</span></div><div class="ph-tabs">${B('对象对比',"App.phSetDetailTab('compare')",'ph-tab '+(this.phDetailTab!=='trend'?'selected':''))}${B('逐日趋势',"App.phSetDetailTab('trend')",'ph-tab '+(this.phDetailTab==='trend'?'selected':''))}</div>${this.phDetailTab==='trend'&&r?`<div class="ph-trend-head"><div><h2>${E(r.name)}</h2><p>${E(r.context)}</p></div><label>查看对象<select class="select" aria-label="趋势对象" onchange="App.phSelectDetail(this.value)">${d.rows.map(o=>`<option value="${E(o.key)}" ${r.key===o.key?'selected':''}>${E(o.name)}</option>`).join('')}</select></label></div>${r.delayed?'<div class="notice warning">对象涉及未完整的数据，暂不生成对比走势。请等待数据更新。</div>':this.phTrendSvg(r,d)}<div class="ph-periods">${[['前7天',r.previous],['最近7天',r.current]].map(([label,t])=>`<div><span>${label}</span><strong>${pct(ctr(t))}</strong><p>曝光 ${n(t.imps)} · 点击 ${n(t.clicks)}${d.s.mode==='rtb'&&this.canOpen('billing')?' · 花费 $'+(t.cents/100).toFixed(2):''}</p></div>`).join('')}</div><p class="ph-note">${E(status(r))}。按所选对象汇总；创意维度暂合并各版本。变化不代表已确认原因。无曝光日期CTR为“—”，不连成0。</p><div class="table-wrap"><table><thead><tr><th>日期</th><th>曝光</th><th>点击</th><th>CTR</th></tr></thead><tbody>${Array.from({length:14},(_,i)=>{const date=day(d.prevFrom,i),t=sum(r.facts.filter(f=>f.date===date)),missing=date<DB.factFrom||r.delayed&&date===d.to;return `<tr><td>${date}</td><td>${missing?'待更新':n(t.imps)}</td><td>${missing?'待更新':n(t.clicks)}</td><td>${missing?'待更新':pct(ctr(t))}</td></tr>`}).join('')}</tbody></table></div>`:`<div class="table-wrap"><table class="ph-comparison"><thead><tr>${headers}</tr></thead><tbody>${d.rows.map(o=>`<tr class="${o.key===this.phSelected?'ph-highlight':''}"><td><b>${E(o.name)}</b><div class="cell-sub">${E(o.context)} · ${E(o.key)}</div></td><td>${n(o.current.imps)}</td><td>${n(o.current.clicks)}</td><td>${pct(o.currentCtr)}</td><td>${pct(o.previousCtr)}</td><td>${o.delta==null?'—':diff(o.delta)}</td><td>${status(o)}</td><td>${B('查看趋势',`App.phSelectDetail(${J(o.key)})`,'link-btn')}</td></tr>`).join('')||'<tr><td colspan="8">暂无符合条件的投放记录</td></tr>'}</tbody></table></div><p class="ph-note">按本期CTR降序排列；样本不足及数据待更新的原始结果保留展示，但不参与首页精选。CTR高低不等同于转化或收益高低。</p>`}</section></div>`;
 };
 // Actionable issues: today's agreed rules replace legacy spend-based prediction.
 A.phEffectiveBudgets=function(){
  const today=new Date().toISOString().slice(0,10),period=o=>(!o.start||o.start<=today)&&(!o.end||o.end>=today),active=o=>o.status==='active'&&period(o),budget=o=>Number(o.dailyCap||o.dailyBudget||(o.duration==='ongoing'?o.budget:0)||0);
  return DB.campaigns.filter(c=>c.mode==='rtb'&&active(c)&&c.syncStatus!=='failed'&&!(c.totalBudget>0&&c.spend>=c.totalBudget)).flatMap(c=>{
   const groups=DB.adGroups.filter(g=>g.camp===c.id&&active(g)&&!(g.totalBudget>0&&g.spend>=g.totalBudget)&&DB.creatives.some(a=>a.groupId===g.id&&a.status==='active'));
   if(!groups.length)return [];const cap=budget(c),caps=groups.map(g=>Number(g.dailyCap||g.dailyBudget||(c.duration==='ongoing'?g.budget:0)||0)),allKnown=caps.every(x=>x>0),total=caps.reduce((a,b)=>a+b,0),effective=cap>0?(allKnown?Math.min(cap,total):cap):(allKnown?total:0);
   return [{c,effective,unknown:effective<=0,groups}];
  });
 };
 const oldAlerts=A.homeAlerts;
 A.homeAlerts=function(){
  if(!this.isAdvertiserBound())return [];
  const list=oldAlerts.call(this).filter(a=>!['balance','balance-risk','rejected','sync'].includes(a.type)&&a.priority===0);
  const budgets=this.phEffectiveBudgets(),total=budgets.reduce((n,r)=>n+r.effective,0),unknown=budgets.some(r=>r.unknown);
  if(this.canOpen('billing')&&total>0&&(DB.balance/total<7))list.unshift({id:'balance:account',type:'balance',priority:0,title:'账户余额不足7天预算',desc:`可用余额 $${DB.balance.toFixed(2)} ÷ 有效日预算 $${total.toFixed(2)}，覆盖 ${(Math.max(0,DB.balance)/total).toFixed(1)} 天${unknown?'（部分预算未提供，按已知预算计算）':''}。`,label:'充值',call:'App.openDeposit()',budgets,ignorable:DB.balance>0});
  if(this.canOpen('plans'))for(const a of DB.creatives){const rejected=a.pendingVersion?.status==='rejected'||a.status==='rejected'&&a.pendingVersion?.status!=='review';if(!rejected||a.status==='archived')continue;const c=DB.campaigns.find(c=>c.id===a.camp),g=DB.adGroups.find(g=>g.id===a.groupId);if(!c||c.status==='archived'||g?.status==='archived')continue;list.push({id:'rejected:'+a.id,type:'rejected',priority:0,c,group:g,creative:a,title:a.pendingVersion?.status==='rejected'?'新版本创意被驳回':'创意被驳回',desc:'查看原因并修改；重新提交进入审核中后，此待办消失。',label:this.role().mutate?'查看原因并修改':'查看驳回原因',call:`App.openCreativePreview(${J(a.id)})`})}
  return list;
 };
 A.homeIssueRow=function(a,ignored=false){const obj=a.creative?'创意：'+a.creative.name:a.group?'广告组：'+a.group.name:a.c?'计划：'+a.c.name:'账户：'+(this.profile()?.advertiserName||'当前广告主');return `<div class="home-four-row"><div><span class="badge gray">${a.type==='rejected'?'创意审核':a.type==='missing'?'投放准备':'资金与预算'}</span></div><div class="home-four-problem"><b>${E(a.title)}</b><div class="cell-sub">${E(a.desc)}</div></div><div class="home-four-object"><b>${E(obj)}</b><div class="cell-sub">${E(a.creative?[a.c.name,a.group?.name].filter(Boolean).join(' / '):a.group?a.c.name:a.budgets?a.budgets.filter(b=>b.effective>0).map(b=>b.c.name).join('、'):'')}</div>${a.budgets?B('查看预算依据','App.phBudgetDetail()','link-btn'):''}</div><div class="home-four-actions">${B(a.label,a.call)}${a.ignorable?B(ignored?'恢复提醒':'忽略',`App.ignoreHomeIssue(${J(a.id)},${ignored})`,'link-btn'):''}</div></div>`};
 A.renderHomeIssues=function(){
  const {issues,saved}=this.homeIssueState(),active=issues.filter(a=>!saved[a.id]),ignored=issues.filter(a=>saved[a.id]),showIgnored=this.homeIssueView==='ignored'&&ignored.length>0,rows=showIgnored?ignored:active,expanded=this.homeIssuesExpanded||active.length===1||showIgnored;
  if(!issues.length)return '<div id="homeIssues" hidden></div>';
  if(!active.length&&!showIgnored)return `<div id="homeIssues" class="ph-ignored">${B('已忽略提醒（'+ignored.length+'）',"App.setHomeIssueView('ignored')",'link-btn')}</div>`;
  const blocked=active.some(a=>a.type==='budget'||a.type==='missing'||a.type==='balance'&&DB.balance<=0||a.type==='rejected'&&a.group&&!DB.creatives.some(cr=>cr.groupId===a.group.id&&cr.status==='active'));
  return `<section class="card home-four-issues" id="homeIssues"><div class="home-summary home-summary-${blocked?'danger':'warning'}"><div class="home-summary-copy"><strong>立即处理 · ${active.length}项</strong><span class="cell-sub">资金提醒与审核／投放待办</span></div>${active.length>1||showIgnored?`<button class="btn btn-primary btn-sm" aria-expanded="${!!expanded}" onclick="App.showHomeAlerts()">${expanded?'收起':'查看并处理'}</button>`:''}${ignored.length?B('已忽略（'+ignored.length+'）',"App.setHomeIssueView('ignored')",'link-btn'):''}</div>${expanded?`${showIgnored?B('返回待处理',"App.setHomeIssueView('active')",'link-btn'):''}<div class="home-four-head"><span>问题类别</span><span>问题与影响</span><span>受影响对象</span><span>处理动作</span></div>${rows.map(a=>this.homeIssueRow(a,showIgnored)).join('')||'<p class="ph-note">暂无待处理事项</p>'}`:''}</section>`;
 };
 A.ignoreHomeIssue=function(id,restore=false){const {issues,saved}=this.homeIssueState();if(!issues.some(a=>a.id===id&&a.ignorable))return;if(restore)delete saved[id];else saved[id]=true;localStorage.setItem(this.homeIgnoreKey(),JSON.stringify(saved));this.refreshHomeIssues();this.toast(restore?'已恢复提醒':'已忽略，可从首页“已忽略”找回')};
 A.syncHomeBalanceRisk=function(){document.getElementById('homeBalanceRisk')?.remove()};
 A.phBudgetDetail=function(){const rows=this.phEffectiveBudgets();this.modal(`<div class="modal-head"><h3>有效日预算依据</h3>${close}</div><div class="modal-body"><p>只计当前有可投路径的RTB计划；余额不足本身不排除预算。暂停、未开始、已结束、无生效创意等不计入。</p><div class="table-wrap"><table><thead><tr><th>计划</th><th>有效日预算（USD）</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${E(r.c.name)}</td><td>${r.unknown?'未提供，不推测':r.effective.toFixed(2)}</td></tr>`).join('')}</tbody></table></div><p class="ph-note">演示汇总：已知各可投组日预算求和，再取计划日上限约束；有组未设置日预算时使用有效计划日上限。上下级不重复相加。具体层级、时段及库存可投条件仍需与SSP确认。</p></div>`,true)};
 wrap('v22MountTools',function(old){old();const el=document.getElementById('v22Tools');if(!el)return;el.insertAdjacentHTML('beforeend',`<hr><p>表现比较：样例非生产数据；周期7天，样本门槛1,000次曝光均待评审。</p>${B('比较规则','App.phRules()')}${B('小样本案例',"App.phSample('small')")}${B('单一创意案例',"App.phSample('single')")}${B('恢复比较示例',"App.phSample('normal')")}`)});
 A.phSample=function(key){if(!window.T1_REVIEW)return;this.scopeSwitchState('active');this.phHomeExample=key;this.phState={dim:'creative',mode:'rtb',camp:key==='small'?'W-C13':'W-C1',group:key==='small'?'W-G13':key==='single'?'W-G1B':'W-G1',format:'feed'};this.go('dash')};
})();
