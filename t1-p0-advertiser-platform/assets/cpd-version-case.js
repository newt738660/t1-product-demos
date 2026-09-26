/* CPD review example: one creative, two versions, independent delivery/review states. */
(()=>{
 const A=App,ids={cp:'C-CPD-VERSION',g:'G-CPD-VERSION',cr:'CR-CPD-VERSION'};
 const esc=x=>String(x??'—').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const wrap=(key,fn)=>{const old=A[key];A[key]=function(...args){return fn.call(this,old.bind(this),...args);};};
 wrap('load',function(old){old();
  if(!DB.campaigns.some(c=>c.id===ids.cp)){
   DB.campaigns.unshift({id:ids.cp,scenario:'cpd-version-review',name:'秋季品牌焕新｜App首页开屏',alias:'秋季品牌焕新',mode:'cpd',placement:'T1 News App · 首页开屏',period:'2026-09-01 至 2026-10-31',duration:'fixed',start:'2026-09-01',end:'2026-10-31',fmt:'splashimg',model:'CPD',status:'active',spend:0,imps:186000,clicks:1488,geo:['全部'],inv:['app'],operator:'Linda Zhao',order:'CPD-202609-031'});
   DB.adGroups.unshift({id:ids.g,camp:ids.cp,name:'首页开屏｜品牌焕新',start:'2026-09-01',end:'2026-10-31',contractAmount:15000,contractDuration:'61天',contractNo:'CPD-202609-031',schedule:'2026-09-01 至 2026-10-31',bidType:'CPD',geo:'全部',device:'Android、iOS',frequency:'每用户每天1次',format:'splashimg',inventoryScope:'指定广告位',inventory:'T1 News App · 首页开屏',status:'active',managedBy:'Linda Zhao'});
   DB.assetFiles.push({id:'F-CPD-V1',folder:'brand',name:'品牌开屏_当前版.png',type:'image',dim:'1080×1920',size:'—',preview:'assets/creative-images/brand.jpg'}, {id:'F-CPD-V2',folder:'brand',name:'品牌开屏_新版.png',type:'image',dim:'1080×1920',size:'—',preview:'assets/creative-images/automotive.jpg'});
   DB.creatives.unshift({id:ids.cr,camp:ids.cp,groupId:ids.g,group:'首页开屏｜品牌焕新',name:'品牌开屏｜秋季主视觉',assetId:'F-CPD-V1',fmt:'splashimg',kind:'image',size:'1080×1920',headline:'连接每一次增长',description:'当前线上品牌主视觉',cta:'了解品牌',landing:'https://example.com/brand',imps:186000,clicks:1488,status:'active',version:1,created:'2026-09-01',changeStatus:'review',pendingVersion:{version:2,name:'品牌开屏｜秋季主视觉',assetId:'F-CPD-V2',headline:'让品牌焕新出发',description:'新版视觉与文案，等待审核后生效',cta:'查看新品',landing:'https://example.com/new-brand',status:'review',submittedAt:'2026-09-17T09:30:00Z'}});
   this.save();
  }
 });
 wrap('init',function(old){old();if(new URLSearchParams(location.search).get('case')==='cpd-version-review')this.openGroupDetail(ids.g);});
 wrap('view_groupdetail',function(old){let html=old();const g=DB.adGroups.find(g=>g.id===this.curGroup),cp=DB.campaigns.find(c=>c.id===g?.camp);if(cp?.mode!=='cpd')return html;
  for(const a of DB.creatives.filter(a=>a.groupId===g.id&&a.pendingVersion?.status==='review'))html=html.replace(`<button class="plan-row-action" onclick="App.openCreative('${a.id}')">编辑</button>`,`<button class="plan-row-action" onclick="App.openCreativePreview('${a.id}')">查看版本</button><button class="plan-row-action" disabled title="已有新版本审核中，暂不可再次编辑">编辑</button>`);
  return html;
 });
 A.replayCpdVersionCase=function(){this.modal('<div class="modal-head"><h3>重演编辑送审流程？</h3></div><div class="modal-body">仅清除本演示案例的待审内容，保留当前投放的V1，然后进入创意编辑。其他广告不受影响。</div><div class="modal-foot"><button class="btn btn-ghost" onclick="App.closeModal()">取消</button><button class="btn btn-primary" onclick="App.startCpdVersionReplay()">开始演示</button></div>');};
 A.startCpdVersionReplay=function(){const a=DB.creatives.find(x=>x.id===ids.cr);delete a.pendingVersion;delete a.changeStatus;this.save();this.closeModal();this.openCreative(a.id);};
 wrap('openCreativePreview',function(old,id){const a=DB.creatives.find(x=>x.id===id),cp=DB.campaigns.find(c=>c.id===a?.camp);if(cp?.mode!=='cpd'||a?.pendingVersion?.status!=='review')return old(id);
  const g=DB.adGroups.find(g=>g.id===a.groupId),issue=this.creativeDeliveryIssue(a,g,cp),p=a.pendingVersion;
  const card=(v,current)=>{const f=DB.assetFiles.find(f=>f.id===v.assetId)||{};return `<section class="card card-pad"><h3>${current?'当前生效':'待处理'}版本 V${v.version}</h3><p><span class="badge ${current?'green':'amber'}">${current?'已通过 · '+esc(issue.label):'审核中 · 尚未生效'}</span></p>${creativeThumb({...a,...v})}<p>${esc(f.name)} · ${esc(f.dim||a.size)}</p><dl><dt>标题</dt><dd>${esc(v.headline)}</dd><dt>描述</dt><dd>${esc(v.description)}</dd><dt>CTA文案</dt><dd>${esc(v.cta||'—')}</dd><dt>跳转链接</dt><dd style="overflow-wrap:anywhere">${esc(v.landing)}</dd></dl>${current?'<p>当前投放继续使用以上素材、文案及链接。</p>':'<p>新内容不会提前用于投放；审核通过并确认生效后才替换。</p>'}</section>`;};
  this.modal(`<div class="modal-head"><div><h3>${esc(a.name)}</h3><p>${esc(a.id)} · 同一创意，不是两条独立广告</p></div><div class="spacer"></div><button class="btn btn-ghost" onclick="App.closeModal()">关闭</button></div><div class="modal-body"><div class="notice info">提交修改只生成待处理版本，不覆盖当前生效版本。审核期间当前版本继续投放，已有待审内容时不可重复编辑提交。</div><div class="cpd-version-comparison">${card(a,true)}${card(p,false)}</div></div><div class="modal-foot"><button class="btn btn-ghost" disabled>新版本审核中，暂不可编辑</button><button class="btn btn-primary" onclick="App.closeModal()">关闭</button></div>`,true);
 });
 const style=document.createElement('style');style.textContent='.cpd-version-comparison{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px}.cpd-version-comparison .creative-thumb{width:100%;height:150px;object-fit:contain;border-radius:8px}.cpd-version-comparison dt{color:#78869b;margin-top:12px}.cpd-version-comparison dd{margin:4px 0 0}@media(max-width:650px){.cpd-version-comparison{grid-template-columns:1fr}}';document.head.append(style);
})();
