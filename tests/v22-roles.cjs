const {chromium}=require('/root/.openclaw/workspace/t1-dsp-benchmark-demo/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({args:['--no-sandbox']}),p=await browser.newPage();await p.goto((process.env.DEMO_BASE||'http://127.0.0.1:8765')+'/t1-p0-advertiser-platform/versions/v2.2/dsp.html?demo=1&review=1&case=roles');await p.locator('#joinReviewFilters').waitFor();const ok=console.log;
 const result=await p.evaluate(()=>{
  const members=()=>[{id:'later',status:'active',role:'operator'},{id:'first',status:'active',role:null},{id:'finance',status:'active',role:'finance'}];
  const bindings=()=>[{userId:'later',advertiserId:'A',status:'success',at:'2026-09-03T10:00:00Z'},{userId:'first',advertiserId:'A',status:'pending',at:'2026-09-01T00:00:00Z'},{userId:'finance',advertiserId:'A',status:'success',at:'2026-09-04T00:00:00Z'},{userId:'first',advertiserId:'A',status:'success',at:'2026-09-02T10:00:00Z'},{userId:'later',advertiserId:'B',status:'success',at:'2026-08-01T00:00:00Z'}];
  const seed=()=>({advertiserId:'A',members:members(),bindings:bindings(),audit:[]});const summarize=s=>({status:s.roleMigration.status,owners:s.members.filter(m=>m.role==='owner').map(m=>m.id),reason:s.roleMigration.reason});
  const a=seed();App.v22MigrateRoles(a);const normal=summarize(a);
  a.members[0].role='owner';a.members[1].role='operator';App.v22MigrateRoles(a);const idempotent=summarize(a);
  const b=seed();b.bindings=b.bindings.filter(b=>b.userId!=='finance');App.v22MigrateRoles(b);
  const c=seed();c.bindings[0].at='2026-09-02T10:00:00Z';App.v22MigrateRoles(c);
  const d=seed();d.members[1].status='removed';App.v22MigrateRoles(d);
  const e=seed();e.members[0].role='owner';e.audit=[{text:'管理员交接给 someone@example.com'}];App.v22MigrateRoles(e);
  const f=seed();f.bindings[0].at='invalid';App.v22MigrateRoles(f);
  return {normal,idempotent,missing:summarize(b),tie:summarize(c),removed:summarize(d),previous:summarize(e),invalid:summarize(f)};
 });
 assert.deepEqual(result.normal.owners,['first']);assert.deepEqual(result.idempotent.owners,['later']);assert.deepEqual(result.previous.owners,['later']);
 for(const k of ['missing','tie','removed','invalid']){assert.equal(result[k].status,'needs_review',k);assert.deepEqual(result[k].owners,[],k)}
 ok('binding success/time/advertiser, missing/tied/invalid records, inactive earliest, prior transfer and one-time migration');
 await browser.close();console.log('PASS binding migration edge cases');})().catch(e=>{console.error(e);process.exit(1)});
