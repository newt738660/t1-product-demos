const {test,expect}=require('@playwright/test');
const url=process.env.RTB_BASE_URL||'http://127.0.0.1:18766';
test.beforeEach(async({page})=>{
 await page.goto(url+'/dsp.html?demo=1');
 await page.evaluate(()=>{
  const cp={...DB.campaigns.find(c=>c.mode==='rtb'),id:'C-CONF',name:'确认测试计划',alias:'确认测试计划',status:'active',spend:0,imps:0,clicks:0};
  DB.campaigns.push(cp);DB.adGroups.push({id:'G-CONF',camp:cp.id,name:'确认测试组',status:'active',budget:100,bid:2,bidType:'CPM',format:'feed'});
  DB.creatives.push({id:'CR-CONF',camp:cp.id,groupId:'G-CONF',group:'确认测试组',name:'确认测试创意',status:'active',fmt:'feed',imps:0,clicks:0});
  App.curCamp=cp.id;App.curGroup='G-CONF';App.openPlan(cp.id);
 });
});
const snapshot=p=>p.evaluate(()=>JSON.stringify([DB.campaigns,DB.adGroups,DB.creatives,DB.auditLogs]));
for(const status of ['active','paused'])for(const route of ['group-row','group-detail','creative-detail','legacy-plan','legacy-creative','plan-detail','bulk-plan']){
 test(`${route} ${status}: cancel unchanged, confirm applies`,async({page})=>{
  await page.evaluate(status=>{DB.campaigns.find(c=>c.id==='C-CONF').status=status;DB.adGroups.find(c=>c.id==='G-CONF').status=status;DB.creatives.find(c=>c.id==='CR-CONF').status=status;App.openPlan('C-CONF');},status);
  const open=async()=>{
   if(route==='group-row')await page.locator('[data-group-row]').filter({hasText:'G-CONF'}).getByRole('button',{name:status==='active'?'暂停':'恢复',exact:true}).click();
   else await page.evaluate(route=>{
    if(route==='group-detail')App.confirmGroupStatus('G-CONF');
    if(route==='creative-detail')App.confirmCreativeStatus('CR-CONF');
    if(route==='legacy-plan')App.togglePlan('C-CONF');
    if(route==='legacy-creative')App.toggleAd('CR-CONF');
    if(route==='plan-detail')App.confirmPlanStatus('C-CONF',DB.campaigns.find(c=>c.id==='C-CONF').status==='active'?'paused':'active');
    if(route==='bulk-plan'){App.unifiedSelected=new Set(['C-CONF']);App.confirmBulkPlanStatus(DB.campaigns.find(c=>c.id==='C-CONF').status==='active'?'paused':'active');}
   },route);
  };
  const before=await snapshot(page);await open();expect(await snapshot(page)).toBe(before);
  await page.locator('.modal-foot').getByRole('button',{name:'取消',exact:true}).click();expect(await snapshot(page)).toBe(before);
  await open();await page.locator('.modal-foot .btn-primary').click();
  const actual=await page.evaluate(route=>route.startsWith('group')?DB.adGroups.find(c=>c.id==='G-CONF').status:route.includes('creative')?DB.creatives.find(c=>c.id==='CR-CONF').status:DB.campaigns.find(c=>c.id==='C-CONF').status,route);
  expect(actual).toBe(status==='active'?'paused':'active');
  if(route==='group-row')expect(await page.evaluate(()=>App.cur)).toBe('campdetail');
 });
}
for(const kind of ['plan','group','creative'])for(const action of ['Archive','Delete']){
 test(`${kind} ${action} confirmation`,async({page})=>{
  const id={plan:'C-CONF',group:'G-CONF',creative:'CR-CONF'}[kind];
  if(action==='Delete')await page.evaluate(kind=>{if(kind==='plan'){DB.adGroups=DB.adGroups.filter(g=>g.camp!=='C-CONF');DB.creatives=DB.creatives.filter(c=>c.camp!=='C-CONF');}if(kind==='group')DB.creatives=DB.creatives.filter(c=>c.groupId!=='G-CONF');},kind);
  const before=await snapshot(page),open=()=>page.evaluate(({kind,id,action})=>App['confirm'+action+'DeliveryObject'](kind,id),{kind,id,action});
  await open();expect(await snapshot(page)).toBe(before);await page.locator('.modal-foot').getByRole('button',{name:'取消',exact:true}).click();expect(await snapshot(page)).toBe(before);
  await open();await page.locator('.modal-foot').getByRole('button',{name:action==='Delete'?'确认删除':'确认归档',exact:true}).click();
  const result=await page.evaluate(({kind,id})=>(kind==='plan'?DB.campaigns:kind==='group'?DB.adGroups:DB.creatives).find(x=>x.id===id)?.status||'deleted',{kind,id});expect(result).toBe(action==='Delete'?'deleted':'archived');
 });
}
test('delete blocked for parent with children',async({page})=>{const before=await snapshot(page);await page.evaluate(()=>App.confirmDeleteDeliveryObject('plan','C-CONF'));await expect(page.locator('.modal-foot').getByRole('button',{name:'确认删除',exact:true})).toHaveCount(0);expect(await snapshot(page)).toBe(before);});
test('archived plan cannot resume via bulk action',async({page})=>{await page.evaluate(()=>{DB.campaigns.find(c=>c.id==='C-CONF').status='archived';App.unifiedSelected=new Set(['C-CONF']);App.confirmBulkPlanStatus('active');});await page.locator('.modal-foot .btn-primary').click();expect(await page.evaluate(()=>DB.campaigns.find(c=>c.id==='C-CONF').status)).toBe('archived');});
