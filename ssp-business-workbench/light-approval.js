/* Lightweight approval interaction prototype. No live SSP or Telegram calls. */
(() => {
  const KEY='ssp-direct-review-v2', LOCK=KEY+'-write';
  const actors=[...salesPeople.map(x=>({...x,access:'商务'})),{id:'D-001',name:'示例总监',dept:'商务',access:'商务'},{id:'ADMIN',name:'超级管理员',dept:'系统',access:'超级管理员'},{id:'OTHER',name:'其他业务人员',dept:'其他',access:'其他'}];
  const director='D-001';
  let actorId=sessionStorage.getItem(KEY+'-actor')||'S-1042', db, offset=0, toolsOpen=false;
  const esc=v=>String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
  const person=id=>actors.find(x=>x.id===id), label=id=>person(id)?`${person(id).name} / ${id}`:'尚未提交';
  const allowed=()=>['商务','超级管理员'].includes(person(actorId)?.access);
  const now=()=>Date.now()+offset;
  function seed(){
    return {items:applications.map(a=>({...a,rev:0,owner:a.status==='待一审'?'':'S-1042',second:a.status==='待二审'||a.status==='待三审'?'S-1018':'',third:director,targetId:a.kind==='绑定申请'?(advertisers.find(x=>x.name===a.company)?.id||''):'',history:[],firstActionAt:a.status==='待一审'?null:Date.now(),noticeAt:Date.now(),reminded:false})),events:[]};
  }
  function load(){try{db=JSON.parse(localStorage.getItem(KEY))||seed()}catch{db=seed()} }
  function notice(a,title,action,who='') {db.events.unshift({id:a.id,title,action,who,time:now(),contactSales:a.contactSales||'未填写'});db.events=db.events.slice(0,30)}
  load();
  if(!localStorage.getItem(KEY)){db.items.filter(a=>a.status==='待一审').forEach(a=>notice(a,'新'+a.kind+'｜待一审','请当班商务进入 SSP 核验并提交一审，备援接手前请先沟通'));localStorage.setItem(KEY,JSON.stringify(db))}
  const get=id=>db.items.find(a=>a.id===id);
  const noticeCards=()=>db.events.slice(0,5).map(e=>`<article class="notice-preview"><strong>${esc(e.title)}</strong><p>${esc(e.id)} · ${new Date(e.time).toLocaleTimeString('zh-CN')}</p><p>客户填写商务：${esc(e.contactSales)}（仅参考，不做映射）</p>${e.who?`<p>@${esc(person(e.who)?.name||e.who)}（示意提醒）</p>`:''}<p>${esc(e.action)}</p><button class="btn link" data-notice-open="${esc(e.id)}">在 SSP 查看申请</button></article>`).join('');
  const stage=a=>({'待一审':1,'待二审':2,'待三审':3}[a.status]||0);
  const handler=a=>stage(a)===1?a.owner:stage(a)===2?a.second:stage(a)===3?a.third:'';
  const can=a=>allowed()&&stage(a)>0&&(stage(a)===1||handler(a)===actorId);
  const handlerLabel=a=>stage(a)===1?'当班商务（未指定）':stage(a)?label(handler(a)):'—';
  function log(a,action){a.history.push({person:actorId,action,time:now()})}
  async function mutate(id,expected,fn){
    if(!navigator.locks){toast('当前浏览器不支持并发演示，请使用新版 Chrome/Edge');return false}
    try {return await navigator.locks.request(LOCK,()=>{load();const a=get(id);if(!allowed())throw Error('当前账号无审批页操作权限');if(!a||a.rev!==expected)throw Error('申请已由其他操作更新，本次提交未生效，请查看最新状态');fn(a);a.rev++;localStorage.setItem(KEY,JSON.stringify(db));if(state.selected)hydrate(get(state.selected.id));closeModal();render();return true})}
    catch(e){if(state.selected)hydrate(get(state.selected.id));closeModal();render();toast(e.message);return false}
  }
  function confirm(title,body,submit,cb){modalRoot.innerHTML=`<div class="modal-mask"><div class="modal" style="max-width:560px"><div class="modal-head"><h3>${title}</h3><button class="modal-close">×</button></div><div class="modal-body">${body}<p id="approvalError" role="alert" style="color:#b42318"></p></div><div class="modal-foot"><button class="btn modal-cancel">取消</button><button class="btn primary modal-submit">${submit}</button></div></div></div>`;wireModal(cb)}
  function showError(message){document.querySelector('#approvalError').textContent=message}
  function hydrate(a){state.selected=a;state.selectedSales=salesPeople.find(s=>s.id===a.salesId)||null;state.selectedAdvertiser=advertisers.find(s=>s.id===a.targetId)||null;state.advertiserName=a.finalName||a.company;state.secondId=a.second||'';state.thirdId=a.third||director}
  function bindNoticeLinks(){document.querySelectorAll('[data-notice-open]').forEach(b=>b.onclick=()=>{if(!allowed()){toast('当前账号无权访问审批页');return}hydrate(get(b.dataset.noticeOpen));state.view='detail';render()});}
  const oldBind=bind;
  render=function(){
    load(); if(state.selected)state.selected=get(state.selected.id);
    document.querySelector('[data-nav="advertisers"]').hidden=!allowed();
    const control=`<details class="demo-tools" ${toolsOpen?'open':''}><summary>交互演示 · 切换人员 / 群消息预览</summary><div class="demo-controls"><label>演示账号 <select id="demoActor" class="select">${actors.map(x=>`<option value="${x.id}" ${x.id===actorId?'selected':''}>${x.name} / ${x.id}（${x.access}）</option>`).join('')}</select></label><button class="btn" id="advanceClock">模拟 10 分钟后</button><button class="btn" id="resetApproval">重置演示</button></div><p class="helper">值班直接一审演示；切换账号可体验不同人员的处理范围。数据仅用于本浏览器演示，不会向 TG 发消息。</p><div id="noticePreview">${noticeCards()}</div></details>`;
    app.innerHTML=control+(!allowed()?'<section class="card empty-access"><h2>暂无访问权限</h2><p>广告主申请审批页仅向商务账号及超级管理员开放。</p></section>':state.view==='review'?reviewList():state.view==='detail'?reviewDetail(state.selected):state.view==='invites'?inviteList():advertiserList());
    document.querySelector('.user').innerHTML=`<span class="avatar">商</span><span>${esc(label(actorId))}</span>`;
    if(allowed())bind();
    document.querySelector('.demo-tools').ontoggle=e=>{toolsOpen=e.target.open};
    document.querySelector('#demoActor').onchange=e=>{actorId=e.target.value;sessionStorage.setItem(KEY+'-actor',actorId);closeModal();if(state.selected)hydrate(state.selected);render()};
    document.querySelector('#advanceClock').onclick=()=>{offset+=10*60*1000+1;sendReminders()};
    document.querySelector('#resetApproval').onclick=()=>confirm('重置演示数据？','<p>仅重置本浏览器中的申请演示记录。</p>','确认重置',async()=>{await navigator.locks.request(LOCK,()=>{db=seed();db.items.filter(a=>a.status==='待一审').forEach(a=>notice(a,'新'+a.kind+'｜待一审','请当班商务进入 SSP 核验并提交一审，备援接手前请先沟通'));localStorage.setItem(KEY,JSON.stringify(db))});state.view='review';state.selected=null;offset=0;closeModal();render()});
    bindNoticeLinks();
  };
  managementHeader=function(active){const count=k=>db.items.filter(a=>a.kind===k&&stage(a)).length;return `<div class="page-head"><div class="page-title"><h1>广告主管理</h1><p>开户、绑定与邀请</p></div></div><div class="management-tabs">${['广告主列表','开户申请','绑定申请','邀请码管理'].map(k=>`<button class="management-tab ${active===k?'active':''}" data-mgmt="${k}">${k}${k.endsWith('申请')?` <span class="mini-count">${count(k)}</span>`:''}</button>`).join('')}</div>`};
  reviewList=function(){const rows=db.items.filter(a=>a.kind===state.reviewType&&(state.reviewScope==='全部申请'||stage(a)));return `${managementHeader(state.reviewType)}<div class="warning-box">一审由当班商务直接处理，备援接手前请先沟通。值班与交接以商务群安排为准。</div><section class="card list-card"><div class="review-subtabs">${['待处理','全部申请'].map(k=>`<button class="review-subtab ${state.reviewScope===k?'active':''}" data-scope="${k}">${k}</button>`).join('')}</div><div class="table-wrap"><table><thead><tr><th>申请 ID</th><th>申请人 / 广告主</th><th>客户填写商务</th><th>审核阶段</th><th>当前处理人</th><th>操作</th></tr></thead><tbody>${rows.map(a=>`<tr><td>${a.id}</td><td>${esc(a.applicant)}<br>${esc(a.company)}</td><td>${esc(a.contactSales||'未填写')}</td><td>${statusHtml(a.status)}</td><td>${esc(handlerLabel(a))}</td><td><button class="btn link" data-open-light="${a.id}">${can(a)?'处理':'查看'}</button></td></tr>`).join('')}</tbody></table></div></section>`};
  const info=(k,v)=>`<div class="info-item"><span>${k}</span><strong>${esc(v||'—')}</strong></div>`;
  reviewDetail=function(a){
    if(!a)return '<p>申请不存在</p>';const n=stage(a), mine=can(a),opening=a.kind==='开户申请';
    const history=a.history.map(h=>`<p>${esc(label(h.person))} · ${esc(h.action)}</p>`).join('');
    const withdraw=n===2&&a.owner===actorId?'<button class="btn" data-withdraw="1">撤回我提交的一审结果</button>':n===3&&a.second===actorId?'<button class="btn" data-withdraw="2">撤回我提交的二审结果</button>':'';
    const options=actors.filter(p=>p.access==='商务'&&p.id!==actorId&&p.id!==director);
    const routing=n===1?`<div class="field"><label>二审接收人 *</label><select id="secondReviewer" class="select"><option value="">请选择应接收本申请的二审人员</option>${options.map(p=>`<option value="${p.id}" ${state.secondId===p.id?'selected':''}>${p.name} / ${p.id} · ${p.dept}</option>`).join('')}</select><p class="helper">请选择业务上应接收的组长。系统不判断上下级关系，请核对后提交。</p></div>`:n===2?`<div class="field"><label>三审接收人 *</label><select id="thirdReviewer" class="select"><option value="">请选择三审接收人</option>${actors.filter(p=>p.access==='商务'&&p.id!==a.owner&&p.id!==a.second).map(p=>`<option value="${p.id}" ${(state.thirdId||a.third||director)===p.id?'selected':''}>${p.name} / ${p.id} · ${p.dept}${p.id===director?'（默认总监）':''}</option>`).join('')}</select><p class="helper">默认当前总监；如需由他人代审，请先确认业务安排后改选。</p></div>`:'';
    let panel=!n?`<h3>${a.status}</h3><p>当前没有可提交的审批任务。</p>`:!mine?`<h3>${['','一审','二审','三审'][n]}待处理</h3><p>当前由 ${esc(label(handler(a)))} 处理，其他人员只读查看。</p>`:`<h3>${['','一审','二审','三审'][n]}</h3>${n===1?'<p class="helper">请按值班安排处理，提交后记录实际一审人。</p>':''}${n===1?(opening?openingReviewFields(a):searchPicker()):''}${routing}<div class="decision-actions"><button class="btn primary" data-decision="approve">${n===1?'一审通过并提交二审':n===2?'二审通过并提交三审':opening?'三审通过并创建广告主':'三审通过并确认绑定'}</button><button class="btn" data-decision="supplement">退回补充资料</button><button class="btn" data-decision="reject">驳回申请</button>${n===2?'<button class="btn link" id="returnWrongReceiver">非本人应审，退回一审更正</button>':''}</div>`;
    return `<button class="back-link" data-action="back">← 返回${a.kind}</button><div class="page-head"><div class="page-title"><h1>${mine?'处理':'查看'}${a.kind}</h1><p>${a.id} · ${a.status} · 当前处理人：${esc(handlerLabel(a))}</p></div></div>${auditFlow(n||4)}<div class="review-detail"><div class="card tab-content"><div class="section"><div class="section-title">T1 提交信息</div><div class="info-grid">${info('申请人',a.applicant)}${info('联系方式',a.contactApp+' · '+a.contact)}${info('广告主名称',a.company)}${info('产品名称',a.product)}${info('网址链接',a.site)}${info('客户填写商务（仅参考）',a.contactSales)}</div></div><div class="section"><div class="section-title">本次审批流向</div><p>一审提交人：${esc(label(a.owner))} → 二审：${a.second?esc(label(a.second)):'一审提交时选择'} → 三审：${esc(label(a.third))}${n===1||n===2?'（二审提交时确认，可调整）':''}</p><p>最终开户名称：${esc(a.finalName||'一审确认后展示')}</p><p>归属销售：${esc(a.sales||'—')} · 部门：${esc(a.salesDept||'—')}</p><p>绑定目标：${esc(a.targetId||'—')}</p>${a.resultId?`<p>执行结果：${a.resultId} · ${esc(a.resultText)}</p>`:''}</div><div class="section"><div class="section-title">处理记录</div>${history||'<p>暂无本次操作记录</p>'}${a.reason?`<div class="warning-box">${esc(a.reason)}</div>`:''}${withdraw}</div><div class="section"><div class="section-title">审批说明</div><p>审批在 SSP 内完成。一审、二审不执行开户或绑定，三审通过后才执行。客户填写商务不用于自动分派。人员选择不校验上下级关系。</p></div></div><aside class="card review-side decision-card">${panel}</aside></div>`;
  };
  bind=function(){oldBind();document.querySelectorAll('[data-open-light]').forEach(b=>b.onclick=()=>{hydrate(get(b.dataset.openLight));state.view='detail';render();scrollTo(0,0)});
    document.querySelector('#secondReviewer')?.addEventListener('change',e=>state.secondId=e.target.value);
    document.querySelector('#thirdReviewer')?.addEventListener('change',e=>state.thirdId=e.target.value);
    const a=state.selected;
    document.querySelector('#returnWrongReceiver')?.addEventListener('click',()=>confirm('退回一审更正接收人','<p>仅修正内部审批交接，不要求客户补充资料。</p><label>原因 *</label><textarea id="wrongReason" class="textarea"></textarea>','确认退回',()=>{const reason=document.querySelector('#wrongReason').value.trim();if(reason.length<5||reason.length>500)return showError('请填写5～500字的具体原因');return mutate(a.id,a.rev,x=>{if(!can(x)||x.status!=='待二审')throw Error('当前无法退回');log(x,'退回一审更正二审接收人：'+reason);x.status='待一审';x.second='';x.reason=reason;notice(x,'退回一审更正接收人','原一审请核对二审人员后重新提交（不点名提醒）')})}));
  };
  decisionModal=function(decision,a){
    if(!can(a)){toast('当前申请不可由您处理');return}const n=stage(a), rev=a.rev;
    const selectedThird=state.thirdId, selectedSecond=state.secondId, selectedSales=state.selectedSales, selectedTarget=state.selectedAdvertiser, name=state.advertiserName?.trim();
    if(decision==='approve'&&n===1){if(a.kind==='开户申请'&&(!selectedSales||!name||name.length<2||name.length>100)){toast('请填写2～100字广告主名称并选择归属销售');return}if(a.kind==='绑定申请'&&!selectedTarget){toast('请选择目标广告主');return}if(!selectedSecond||selectedSecond===actorId||selectedSecond===director||person(selectedSecond)?.access!=='商务'){toast('请选择有效的二审接收人');return}}
    if(decision==='approve'&&n===2&&(!selectedThird||selectedThird===a.owner||selectedThird===a.second||person(selectedThird)?.access!=='商务')){toast('请选择有效的三审接收人，不可与本申请一审、二审人重复');return}
    const titles={approve:n===1?'确认提交二审':n===2?'确认提交三审':'确认三审通过',supplement:'退回补充资料',reject:'驳回申请'};
    const route=n===1?`<div class="selected-advertiser"><strong>二审接收人：${esc(label(selectedSecond))}</strong><span>${esc(person(selectedSecond)?.dept)}</span></div><label class="confirm-check"><input id="confirmReviewer" type="checkbox"> 我已核对，此人为本申请应提交的二审负责人</label>`:n===2?`<p>三审接收人：<strong>${esc(label(selectedThird))}</strong></p>${selectedThird!==director?'<p class="warning-box">本次接收人不是默认总监，请确认已沟通代审安排。</p>':''}`:`<p>${a.kind==='开户申请'?'创建 SSP 广告主并绑定 T1 用户':'将 T1 用户绑定至 '+esc(a.targetId)}。请确认前两级结论。</p>`;
    confirm(titles[decision],decision==='approve'?route:'<label>具体原因（5～500字） *</label><textarea id="decisionReason" class="textarea"></textarea>',titles[decision],()=>{
      if(!document.querySelector('#approvalError')){toast('申请或确认窗口已更新，请查看最新状态后操作');return}
      if(decision==='approve'&&n===1&&!document.querySelector('#confirmReviewer').checked)return showError('请先核对并确认二审接收人');
      const reason=document.querySelector('#decisionReason')?.value.trim()||'';
      if(decision!=='approve'&&(reason.length<5||reason.length>500))return showError('请填写5～500字具体原因');
      return mutate(a.id,rev,x=>{if(!can(x)||stage(x)!==n)throw Error('申请处理人或状态已变化');
        if(n===1){x.owner=actorId;x.firstActionAt=now()}
        if(decision!=='approve'){x.status=decision==='supplement'?'待补充':'已驳回';x.reason=reason;log(x,titles[decision]+'：'+reason);notice(x,x.status,reason);return}
        if(n===1){x.sales=selectedSales?label(selectedSales.id):x.sales;x.salesId=selectedSales?.id||'';x.salesDept=selectedSales?.dept||'';x.finalName=name;x.targetId=selectedTarget?.id||x.targetId;x.second=selectedSecond;x.third=director;x.status='待二审';x.reason='';log(x,'一审通过，提交给 '+label(x.second));notice(x,'一审通过｜待二审','请复核一审资料及接收关系',x.second)}
        else if(n===2){if(!selectedThird||selectedThird===x.owner||selectedThird===x.second||person(selectedThird)?.access!=='商务')throw Error('三审接收人无效，请重新选择');x.third=selectedThird;x.status='待三审';log(x,'二审通过，提交三审给 '+label(x.third));notice(x,'二审通过｜待三审','请完成最终审核',x.third)}
        else {x.status='已通过';x.resultId=x.kind==='开户申请'?'ADV-DEMO-'+x.id.slice(-3):x.targetId;x.resultText=x.kind==='开户申请'?'演示：广告主已创建，用户已绑定':'演示：用户已绑定目标广告主';log(x,'三审通过，'+x.resultText);notice(x,'审批及业务处理完成',x.resultText)}
      });
    });
  };
  withdrawReview=function(n,a){const rev=a.rev;confirm('撤回本人审批结果？','<p>仅下一审尚未提交结果时可撤回。已发出的通知随旧任务失效；保留操作记录。</p>','确认撤回',()=>mutate(a.id,rev,x=>{if((n===1&&(x.status!=='待二审'||x.owner!==actorId))||(n===2&&(x.status!=='待三审'||x.second!==actorId)))throw Error('下一审已处理或您不是原操作人');x.status=n===1?'待一审':'待二审';if(n===1)x.second='';log(x,'撤回本人'+(n===1?'一审':'二审')+'结果');notice(x,'审批结果已撤回',n===1?'原一审核对后重新提交':'原二审核对后重新提交',n===2?x.second:'')}))};
  async function sendReminders(){
    if(!navigator.locks)return;
    let changed=false;
    await navigator.locks.request(LOCK,()=>{load();db.items.forEach(a=>{
      if(a.status==='待一审'&&!a.firstActionAt&&!a.reminded&&now()-a.noticeAt>=600000){
        a.reminded=true;changed=true;notice(a,'一审待处理提醒','申请提交后已满10分钟，仍未提交一审处理结果，请当班商务跟进。');
      }
    });if(changed)localStorage.setItem(KEY,JSON.stringify(db))});
    // A reminder must not discard an in-progress review form or confirmation.
    if(changed&&state.view!=='detail'&&!modalRoot.childElementCount)render();
    if(changed&&state.view==='detail'){document.querySelector('#noticePreview').innerHTML=noticeCards();bindNoticeLinks();toast('已补发待处理提醒，可在群消息预览查看')}
  }
  addEventListener('storage',e=>{
    if(e.key!==KEY)return;
    const prev=state.selected;
    load();
    if(state.view==='detail'&&prev){
      const latest=get(prev.id);
      if(latest&&latest.rev===prev.rev)return;
      closeModal();hydrate(latest);render();toast('申请状态已更新，请查看最新处理结果');
    }else{closeModal();render()}
  });
  setInterval(sendReminders,30000);
  const initialId=new URLSearchParams(location.search).get('application');
  if(initialId&&get(initialId)){hydrate(get(initialId));state.view='detail'}else{state.view='review';state.reviewType='开户申请'}
  render();
})();
