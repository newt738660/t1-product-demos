const {chromium}=require('/root/.openclaw/workspace/t1-dsp-benchmark-demo/node_modules/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
const base=(process.env.DEMO_BASE||'http://127.0.0.1:8765')+'/t1-p0-advertiser-platform/versions/v2.2/';
const out=process.env.HOME_OUTPUT||'/root/.openclaw/workspace/outputs/t1-home-lite-20261028';fs.mkdirSync(out,{recursive:true});
(async()=>{
 const b=await chromium.launch({args:['--no-sandbox']}),p=await b.newPage({viewport:{width:1440,height:1000}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base+'dsp.html?demo=1&review=1');await p.locator('#joinReviewFilters').waitFor();
 const state=key=>p.evaluate(k=>App.scopeSwitchState(k),key),body=()=>p.locator('#content').innerText();
 const clean=async()=>{assert.doesNotMatch(await body(),/CTR最高|最高点击率|投放表现与变化|查看对比|查看趋势|近期排期|余额不足7天|计划状态/);assert.equal(await p.locator('#content canvas, #homeBalanceRisk').count(),0)};
 await clean();assert.equal(await p.evaluate(()=>typeof App.phSeed),'undefined');
 for(const [key,text]of [['unbound','尚未绑定'],['pending','开户申请审核中'],['rejected','开户申请未通过'],['bindPending','绑定申请审核中'],['bindRejected','绑定申请未通过'],['empty','尚未创建广告投放'],['healthy','暂无需要处理'],['balance','立即处理']]){
  await state(key);assert.ok((await body()).includes(text),key);await clean();await p.screenshot({path:out+'/'+key+'.png',fullPage:true});
  if(key==='pending'||key==='bindPending'){await p.getByRole('button',{name:'查看申请进度',exact:true}).click();assert.match(await p.locator('#modalMask').innerText(),/正在核验/);await p.evaluate(()=>App.closeModal())}
  if(key==='rejected'||key==='bindRejected'){await p.getByRole('button',{name:'修改并重新申请',exact:true}).click();assert.ok(await p.locator('#modalMask input').count());await p.evaluate(()=>App.closeModal())}
 }
 console.log('PASS access states, actionable links, empty state and deferred modules absent');
 await state('active');const id=await p.evaluate(()=>App.homeAlerts().find(a=>a.creative.id==='W-A4').creative.id),notifications=await p.evaluate(()=>JSON.stringify(DB.notifications));
 await p.locator('#homeIssues').getByRole('button',{name:'查看原因并处理'}).first().click();assert.match(await p.locator('#modalMask').innerText(),/驳回/);await p.evaluate(()=>App.closeModal());
 await p.evaluate(id=>App.openCreative(id),id);await p.locator('#ufLanding').fill('https://example.com/updated');await p.evaluate(()=>App.saveUnifiedCreativeEdit());
 assert.equal(await p.evaluate(id=>DB.creatives.find(a=>a.id===id).status,id),'review');await p.evaluate(()=>App.go('dash'));assert.equal(await p.evaluate(id=>App.homeAlerts().some(a=>a.creative.id===id),id),false);assert.equal(await p.evaluate(()=>JSON.stringify(DB.notifications)),notifications);
 await p.reload();await p.locator('#joinReviewFilters').waitFor();assert.equal(await p.evaluate(id=>App.homeAlerts().some(a=>a.creative.id===id),id),false);
 console.log('PASS actual creative edit/resubmit clears current task, preserves notification history and reload state');
 await state('active');assert.equal(await p.evaluate(()=>{const a=DB.creatives.find(a=>a.status==='active');a.pendingVersion={status:'rejected'};const shown=App.homeAlerts().some(x=>x.creative.id===a.id);a.pendingVersion.status='review';return shown&&!App.homeAlerts().some(x=>x.creative.id===a.id)}),true);
 for(const [id,expected]of [['op','立即处理'],['fin','资金工作台'],['carol','尚未绑定']]){await p.evaluate(id=>{App.v22SelectMember(id);App.go('dash')},id);assert.ok((await body()).includes(expected));if(id==='fin')assert.equal(await p.evaluate(()=>App.homeAlerts().length),0)}
 await p.evaluate(()=>{App.v22SelectMember('me');App.scopeSwitchState('active');App.v22SetAccountState('email');App.go('dash')});assert.match(await body(),/验证登录邮箱/);await clean();
 console.log('PASS pending-version rejection, member permissions and verification banner');
 await p.evaluate(()=>{App.v22SetAccountState('ready');App.go('dash')});for(const width of [1440,390]){await p.setViewportSize({width,height:1000});await p.screenshot({path:out+'/active-'+width+'.png',fullPage:true});assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true)}
 await p.evaluate(()=>App.go('report'));assert.ok((await body()).length>100);await p.evaluate(()=>App.go('billing'));assert.match(await body(),/财务管理/);
 assert.deepEqual(errors,[]);fs.writeFileSync(out+'/verification.json',JSON.stringify({base,errors,passed:true},null,2));await b.close();console.log('PASS responsive homepage, report and finance remain accessible, no runtime errors');
})().catch(e=>{console.error(e);process.exit(1)});
