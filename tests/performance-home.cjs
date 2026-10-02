const {chromium}=require('/root/.openclaw/workspace/t1-dsp-benchmark-demo/node_modules/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
const base=(process.env.DEMO_BASE||'http://127.0.0.1:8765')+'/t1-p0-advertiser-platform/versions/v2.2/';
const out=process.env.PH_OUTPUT||'/root/.openclaw/workspace/outputs/t1-performance-home-20261002';fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({args:['--no-sandbox']}),p=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[],checks=[];
 p.on('pageerror',e=>errors.push(e.message));const done=s=>{checks.push(s);console.log('OK',s)};
 await p.goto(base+'dsp.html?demo=1&review=1');await p.locator('#performancePanel').waitFor();
 assert.equal(await p.locator('.ph-card[data-kind]').count(),4);assert.doesNotMatch(await p.locator('#content').innerText(),/近期排期|计划状态/);
 const initial=await p.evaluate(()=>{const d=App.phData();return {scope:d.s,high:d.high.key,low:d.low.key,up:d.up.key,down:d.down.key,from:d.from,to:d.to}});
 assert.equal(initial.high,'W-A1');assert.equal(initial.low,'W-A1B');assert.equal(initial.up,'W-A1');assert.equal(initial.down,'W-A1B');done('homepage prioritizes actions and four descriptive CTR results');
 await p.waitForTimeout(350);await p.screenshot({path:out+'/homepage.png',fullPage:true});
 await p.locator('[data-kind="high"] button').click();assert.equal(await p.evaluate(()=>App.cur),'performance');assert.deepEqual(await p.evaluate(()=>App.phData().s),initial.scope);assert.equal(await p.locator('.ph-comparison tbody tr').count(),2);await p.waitForTimeout(350);await p.screenshot({path:out+'/comparison.png',fullPage:true});
 await p.locator('.ph-comparison tbody tr').first().getByRole('button').click();assert.equal(await p.locator('.ph-chart').count(),1);assert.equal(await p.locator('.ph-detail tbody tr').count(),14);await p.waitForTimeout(350);await p.screenshot({path:out+'/trend.png',fullPage:true});done('real clicks preserve scope and open comparison, chart and 14 daily rows');
 await p.getByRole('button',{name:'返回首页',exact:true}).click();
 for(const dim of ['creative','group','slot','camp']){
  await p.evaluate(k=>App.phSet('dim',k),dim);
  const valid=await p.evaluate(()=>{const d=App.phData();return d.rows.every(r=>Math.abs(r.currentCtr-r.current.clicks/r.current.imps*100)<1e-10)&&d.facts.every(f=>f.mode===d.s.mode&&(!d.s.format||App.phFormat(f)===d.s.format))});assert.ok(valid,dim);
  assert.ok(await p.locator('#performancePanel').isVisible());
 }
 done('four dimensions use weighted totals and same-type, same-format factual slices');
 await p.evaluate(()=>{App.phSet('mode','cpd');App.phSet('dim','camp')});
 assert.ok(await p.evaluate(()=>App.phData().rows.some(r=>r.delayed)));assert.ok(await p.evaluate(()=>App.phData().eligible.every(r=>!r.delayed)));
 await p.evaluate(()=>App.phOpen(App.phData().rows.find(r=>r.delayed).key,true));assert.equal(await p.locator('.ph-chart').count(),0);assert.match(await p.locator('#content').innerText(),/暂不生成/);assert.doesNotMatch(await p.locator('#content').innerText(),/花费 \$/);done('delayed CPD excluded, no fabricated trend or contract cost allocation');
 await p.evaluate(()=>App.phSample('small'));assert.equal(await p.locator('.ph-card[data-kind]').count(),0);
 await p.evaluate(()=>App.phSample('single'));assert.equal(await p.locator('[data-kind="high"], [data-kind="low"]').count(),0);done('small samples and single objects do not manufacture ranking');
 await p.evaluate(()=>App.phSample('normal'));
 const edge=await p.evaluate(()=>{
  const original=DB.deliveryFacts.map(r=>({...r}));
  for(const f of DB.deliveryFacts)if(f.creative==='W-A1B')f.clicks=0;
  let d=App.phData();const zero=d.low?.key==='W-A1B'&&d.low.currentCtr===0;
  for(const f of DB.deliveryFacts)if(['W-A1','W-A1B'].includes(f.creative))f.clicks=0;
  d=App.phData();const flat=!d.high&&!d.low&&!d.up&&!d.down;
  DB.deliveryFacts=original;return {zero,flat};
 });assert.deepEqual(edge,{zero:true,flat:true});done('adequate-exposure zero clicks stay eligible; exact flat results produce no winners or movers');
 const issueRules=await p.evaluate(()=>{
  const saved={c:DB.campaigns,g:DB.adGroups,a:DB.creatives,b:DB.balance};
  DB.campaigns=[{id:'T-C',name:'Test',mode:'rtb',status:'active',dailyCap:100,totalBudget:10000,spend:0}];
  DB.adGroups=[{id:'T-G1',camp:'T-C',status:'active',dailyCap:80},{id:'T-G2',camp:'T-C',status:'active',dailyCap:70}];
  DB.creatives=[{id:'T-A1',name:'A',camp:'T-C',groupId:'T-G1',status:'active'},{id:'T-A2',name:'B',camp:'T-C',groupId:'T-G2',status:'active'}];
  const total=()=>App.phEffectiveBudgets().reduce((t,x)=>t+x.effective,0),balanceAlert=()=>App.homeAlerts().filter(x=>x.type==='balance');
  const capped=total()===100;DB.balance=699;const less=balanceAlert().length===1;DB.balance=700;const equal=!balanceAlert().length;
  DB.balance=0;const zero=balanceAlert().length===1;DB.adGroups[1].status='paused';const pause=total()===80;
  DB.creatives[0].status='rejected';const noPath=total()===0&&!balanceAlert().length,rej=App.homeAlerts().filter(x=>x.type==='rejected').length===1;
  DB.creatives[0].status='review';const review=!App.homeAlerts().some(x=>x.type==='rejected');
  DB.creatives[0].status='active';DB.creatives[0].pendingVersion={status:'rejected'};const pendingRejected=App.homeAlerts().some(x=>x.type==='rejected');DB.creatives[0].pendingVersion.status='review';const pendingReview=!App.homeAlerts().some(x=>x.type==='rejected')&&total()===80;
  Object.assign(DB,{campaigns:saved.c,adGroups:saved.g,creatives:saved.a,balance:saved.b});return {capped,less,equal,zero,pause,noPath,rej,review,pendingRejected,pendingReview};
 });assert.ok(Object.values(issueRules).every(Boolean),JSON.stringify(issueRules));done('effective budgets capped, zero/7-day boundaries, pause exclusion and rejection resubmission lifecycle');
 await p.getByRole('button',{name:'查看并处理',exact:true}).click();assert.ok(await p.locator('.home-four-row').count()>0);await p.getByRole('button',{name:'查看预算依据',exact:true}).click();assert.match(await p.locator('#modalMask').innerText(),/有效日预算/);await p.locator('#modalMask').getByRole('button',{name:'关闭',exact:true}).click();
 await p.getByRole('button',{name:'查看原因并修改',exact:true}).first().click();assert.ok(await p.locator('#modalMask').isVisible());await p.evaluate(()=>App.closeModal());done('action rows expand in place and reach actual budget and creative details');
 await p.evaluate(()=>{App.v22SelectMember('read');App.phSample('normal');App.phOpen('W-A1',true)});assert.doesNotMatch(await p.locator('#content').innerText(),/花费 \$/);await p.evaluate(()=>App.v22SelectMember('fin'));assert.match(await p.locator('#content').innerText(),/资金工作台/);assert.equal(await p.locator('#performancePanel').count(),0);await p.evaluate(()=>{App.v22SelectMember('me');App.phSample('normal')});done('existing finance and read-only roles preserve access boundaries');
 for(const width of [1920,1440,1366,390]){
  await p.setViewportSize({width,height:900});await p.evaluate(()=>App.go('dash'));assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'home overflow '+width);
  if(width===390){await p.waitForTimeout(350);await p.screenshot({path:out+'/mobile.png',fullPage:true});}
  await p.evaluate(()=>App.phOpen('W-A1',false));assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'comparison overflow '+width);
  await p.evaluate(()=>App.phOpen('W-A1',true));assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'trend overflow '+width);
 }
 done('homepage, comparison and trend fit four viewport widths');
 await p.setViewportSize({width:1440,height:1000});await p.evaluate(()=>{App.go('dash');document.body.classList.add('dark')});await p.waitForTimeout(350);await p.screenshot({path:out+'/dark.png',fullPage:true});
 const clicks=await p.evaluate(()=>DB.deliveryFacts.reduce((t,r)=>t+r.clicks,0));await p.reload();await p.locator('#performancePanel').waitFor();assert.equal(await p.evaluate(()=>DB.deliveryFacts.reduce((t,r)=>t+r.clicks,0)),clicks);done('fixture enrichment is idempotent on refresh');
 assert.deepEqual(errors,[]);fs.writeFileSync(out+'/verification.json',JSON.stringify({base,checks,errors},null,2));await browser.close();console.log('PASS',checks.length,'performance checks');
})().catch(e=>{console.error(e);process.exit(1)});
