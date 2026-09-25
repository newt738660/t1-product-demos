const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1100}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const base=process.env.DEMO_BASE||'http://127.0.0.1:8766';
 await page.goto(base+'/t1-p0-advertiser-platform/dsp.html?demo=1&v=home-issues');await page.locator('#homeIssues').waitFor();
 assert.equal(await page.locator('.home-heading button').count(),0);
 const count=await page.locator('#homeIssues .home-issue-row').count();
 await page.getByRole('button',{name:/展开全部/}).click();assert.equal(await page.locator('#homeIssues .home-issue-row').count(),count+1);
 assert.equal(await page.locator('#modalMask').isVisible(),false);
 await page.getByRole('button',{name:'收起',exact:true}).click();assert.equal(await page.locator('#homeIssues .home-issue-row').count(),count);
 const risk=page.locator('.home-issue-row').filter({hasText:'余额预计不足'});
 await risk.getByRole('button',{name:'忽略',exact:true}).click();assert.equal(await risk.count(),0);
 await page.reload();await page.locator('#homeIssues').waitFor();assert.equal(await risk.count(),0);
 await page.getByRole('button',{name:'已忽略（1）',exact:true}).click();await risk.getByRole('button',{name:'恢复提醒'}).click();
 await page.getByRole('button',{name:/^待处理（/}).click();assert.equal(await risk.count(),1);
 await risk.getByRole('button',{name:'忽略',exact:true}).click();
 await page.evaluate(()=>{DB.balance=0;App.save();App.go('dash');});
 assert.match(await page.locator('#homeIssues').innerText(),/账户余额不足/);assert.equal(await page.locator('.home-issue-row').filter({hasText:'账户余额不足'}).getByRole('button',{name:'忽略',exact:true}).count(),0);
 // Resolve then recur without rendering home in between.
 await page.evaluate(()=>{DB.balance=380;App.save();App.ignoreHomeIssue('balance-risk:account');DB.balance=100000;App.save();DB.balance=380;App.save();App.go('dash');});assert.equal(await risk.count(),1);
 // Member-scoped dismissal.
 await risk.getByRole('button',{name:'忽略',exact:true}).click();await page.evaluate(()=>{localStorage.setItem('t1_demo_profile',JSON.stringify({advertiserBound:true,email:'another@example.test'}));App.go('dash');});assert.equal(await risk.count(),1);
 await page.getByRole('button',{name:'调整预算',exact:true}).click();assert.equal(await page.evaluate(()=>App.curCamp||App.editFlow?.id),'W-C3');
 await page.reload();await page.getByRole('button',{name:'查看驳回创意',exact:true}).click();assert.equal(await page.evaluate(()=>App.curGroup),'W-G4');
 await page.evaluate(()=>App.go('dash'));await page.getByRole('button',{name:/展开全部/}).click();await page.getByRole('button',{name:'添加创意',exact:true}).click();assert.match(await page.locator('#content').innerText(),/创意/);
 await page.reload();await page.evaluate(()=>App.openNotifCenter());await page.getByRole('button',{name:'关闭',exact:true}).click();assert.equal(await page.locator('#modalMask').isVisible(),false);
 await page.evaluate(()=>App.go('report'));assert.match(await page.locator('#content').innerText(),/曝光/);
 await page.evaluate(()=>App.go('dash'));await page.screenshot({path:'/tmp/home-issues-desktop.png',fullPage:true});
 await page.evaluate(()=>document.body.classList.add('dark'));await page.waitForTimeout(350);await page.screenshot({path:'/tmp/home-issues-dark.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),true);assert.equal(await page.locator('.home-issue-copy').evaluateAll(els=>els.every(e=>e.scrollWidth<=e.clientWidth)),true);await page.screenshot({path:'/tmp/home-issues-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);console.log('PASS: inline expand/collapse; ignore/restore/reload; escalation; recurrence; member scope; budget/group/creative destinations; modal close; report; mobile overflow; no runtime errors.');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
