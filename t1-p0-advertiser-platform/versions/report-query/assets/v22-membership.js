/* T1 account -> one advertiser. Review selectors are not production workspace switching. */
(()=>{
 const A=App,E=A.workspace.E,B=A.workspace.button,J=JSON.stringify,ADV='ADV-70285',NAME='星海互动',OTHER='ADV-90001';
 const roles=A.v22Roles,now=()=>new Date().toISOString(),uid=()=>Date.now()+Math.floor(Math.random()*100000),state=()=>DB.v22?.join;
 const active=m=>m.status==='active'&&!m.disabled&&!!roles[m.role];
 const statusLabel={pending:'待接受',accepted:'已接受',rejected:'已拒绝',revoked:'已撤销',expired:'已过期',invalid:'已失效',approved:'已通过',denied:'未通过',withdrawn:'已撤销'};
 const st=r=>r.kind==='application'&&r.status==='pending'?'待审批':statusLabel[r.status]||r.status;
 const badge=r=>`<span class="v22-status ${['accepted','approved'].includes(r.status)?'good':r.status==='pending'?'warn':''}">${st(r)}</span>`;
 const field=(label,id,value='',type='text')=>`<label class="v22-field">${label}<input class="input" id="${id}" type="${type}" value="${E(value)}"></label>`;
 const pick=(id,value='',blank=true)=>`<select class="select" id="${id}">${blank?'<option value="">请选择角色</option>':''}${['operator','finance'].map(k=>`<option value="${k}" ${value===k?'selected':''}>${roles[k].name}</option>`).join('')}</select>`;
 const val=id=>document.getElementById(id)?.value.trim()||'';
 const error=text=>{const el=document.getElementById('v22Error');if(el)el.textContent=text;else A.toast(text,'warn')};
 const modal=(title,body,foot='')=>A.modal(`<div class="modal-head"><h3>${title}</h3><div class="spacer"></div><button class="icon-btn" aria-label="关闭" onclick="App.closeModal()">${svg(I.x)}</button></div><div class="modal-body join-modal-body">${body}<div id="v22Error" class="v22-error" role="alert"></div></div><div class="modal-foot">${foot||B('关闭','App.closeModal()')}</div>`,true);
 const user=id=>state()?.users.find(u=>u.id===id),owner=()=>DB.v22.members.find(m=>active(m)&&m.role==='owner');
 const rows=()=>[...(state()?.invites||[]),...(state()?.applications||[])];
 const record=id=>rows().find(r=>r.id===id);
 const defaults=()=>[
  {id:'alice',name:'Alice Li',email:'alice@example.com',advertiserId:null},
  {id:'bob',name:'Bob Wu',email:'bob@example.com',advertiserId:null},
  {id:'carol',name:'Carol Lin',email:'carol@example.com',advertiserId:null},
  {id:'outside',name:'David Sun',email:'david@example.com',advertiserId:OTHER},
  {id:'removed',name:'Mia Zhou',email:'mia@example.com',advertiserId:null,removed:true}
 ];
 const codeSeed=()=>[{code:'T1-TEAM-26',advertiserId:ADV,status:'active',expires:Date.now()+7*864e5},{code:'T1-EXPIRED',advertiserId:ADV,status:'active',expires:Date.now()-864e5},{code:'T1-DISABLED',advertiserId:ADV,status:'disabled',expires:Date.now()+7*864e5}];
 function event(r,title,desc,recipient){DB.notifications.unshift({id:uid(),at:now(),title,desc,target:'membership',ref:r?.id||null,category:'service',recipient,read:false,readBy:[]})}
 function changed(){A.save();A.syncAccountContext();A.renderNav();A.syncBell();A.joinMountReview()}
 function refresh(){changed();A.go(A.joinLanding())}
 A.joinLanding=function(){return this.v22Can('manage')?'org':this.v22Member()?'access':'dash'};
 function permission(r){const id=A.joinUser()?.id;return !!r&&(r.userId===id||A.v22Can('manage')&&r.advertiserId===ADV)}
 function expire(){if(!state())return;for(const r of state().invites)if(r.status==='pending'&&r.expires<=Date.now()){r.status='expired';r.reason='邀请已过期，请管理员重新邀请'} }
 function eligibility(u){if(!u)return '未找到该T1账号，请核对邮箱；对方需先注册T1';if(u.disabled)return '该T1账号暂不可绑定，请联系运营';const bound=u.id==='me'&&!baseBound.call(A)?null:u.advertiserId;if(bound===ADV)return '该账号已是本广告主成员，无需重复绑定';if(bound)return '该账号已绑定其他广告主，不能再绑定新的广告主';return ''}
 function make(kind,u,role){return {id:(kind==='invite'?'INV-':'APP-')+uid(),kind,userId:u.id,email:u.email,name:u.name,advertiserId:ADV,advertiserName:NAME,role,requestedRole:role,status:'pending',createdAt:now(),expires:Date.now()+7*864e5,inviterId:A.joinUser()?.id||'me',inviterName:A.joinUser()?.name||'管理员'}}
 function finalize(r,role){
  const u=user(r.userId),reason=eligibility(u);
  if(reason){r.status='invalid';r.reason=reason;event(r,'绑定未完成',reason,r.userId);event(r,'加入记录已失效',r.name+'：'+reason,'admin');changed();return reason}
  if(!['operator','finance'].includes(role))return '请选择投放人员或财务人员';
  u.advertiserId=ADV;u.removed=false;if(u.id==='me')localStorage.setItem('t1_demo_profile',J({...baseProfile.call(A),advertiserBound:true,advertiserName:NAME}));
  let member=DB.v22.members.find(m=>m.id===u.id);if(!member){member={id:u.id};DB.v22.members.push(member)}
  Object.assign(member,{name:u.name,email:u.email,role,status:'active'});delete member.legacyAccess;
  DB.v22.bindings.push({userId:u.id,advertiserId:ADV,status:'success',at:now()});
  r.status=r.kind==='invite'?'accepted':'approved';r.finalRole=role;r.resolvedAt=now();
  for(const other of rows())if(other!==r&&other.userId===u.id&&other.status==='pending'){other.status='invalid';other.reason='已完成广告主绑定，本条记录不再有效'}
  event(r,'已绑定广告主',`已加入${NAME}，角色为${roles[role].name}。`,u.id);
  event(r,'新成员已加入',`${u.name}已加入，角色为${roles[role].name}。`,'admin');
  A.v22Audit(`${r.kind==='invite'?'接受邀请':'通过申请'} ${u.email} → ${roles[role].name}`);changed();return '';
 }
 A.joinUser=function(){return user(sessionStorage.getItem('t1-v22-member')||'me')};
 const oldLoad=A.load;
 A.load=function(){oldLoad.call(this);if(!DB.v22.join||DB.v22.join.version!==2){
   const old=DB.v22.members.slice();DB.v22.members=old.filter(active);
   DB.v22.join={version:2,users:DB.v22.members.map(m=>({id:m.id,name:m.name,email:m.email,advertiserId:ADV})),invites:[],applications:[],codes:codeSeed(),legacyRecords:old.filter(m=>!active(m))};
   for(const u of defaults())if(!state().users.some(x=>x.email===u.email))state().users.push(u);
   if(!state().users.some(u=>u.id==='me'))state().users.unshift({id:'me',name:'Victor Wang',email:'victor@example.com',advertiserId:null});
   if(!this.joinUser())sessionStorage.setItem('t1-v22-member','me');
   const alice=user('alice');if(alice){const r=make('invite',alice,'operator');r.inviterId=owner()?.id||'me';r.inviterName=owner()?.name||'管理员';state().invites.push(r);event(r,'收到广告主邀请',`${NAME}邀请你以投放人员身份加入，请确认是否接受。`,alice.id)}
   const bob=user('bob');if(bob){const r=make('application',bob,'finance');state().applications.push(r);event(r,'收到成员申请',`${bob.name}申请以财务人员身份加入${NAME}。`,'admin');event(r,'绑定申请已提交','等待广告主管理员审批，审批通过前不获得业务权限。',bob.id)}
  }expire();this.save()};
 const baseBound=A.isAdvertiserBound,baseProfile=A.profile;
 A.isAdvertiserBound=function(){const u=this.joinUser();if(!u)return baseBound.call(this);return !!u.advertiserId&&(u.id!=='me'||baseBound.call(this))};
 A.profile=function(){const p=baseProfile.call(this),u=this.joinUser();if(!u||u.id==='me')return p;return {...p,name:u.name,email:u.email,advertiserBound:!!u.advertiserId,advertiserName:u.advertiserId===ADV?NAME:u.advertiserId?'远山科技':'',sspAdvertiserId:u.advertiserId||null}};
 A.v22Member=function(){const u=this.joinUser();if(!u)return DB.v22?.members.find(m=>m.id===(sessionStorage.getItem('t1-v22-member')||'me')&&active(m));if(u.advertiserId!==ADV||u.id==='me'&&!baseBound.call(this))return;return DB.v22.members.find(m=>m.id===u.id&&active(m))};
 const baseContext=A.syncAccountContext;
 A.syncAccountContext=function(){baseContext.call(this);const u=this.joinUser();if(!u)return;const name=document.querySelector('.scope-user-name');if(name)name.textContent=u.name;const avatar=document.querySelector('.scope-avatar');if(avatar)avatar.textContent=u.name.slice(0,1);const email=document.querySelector('.scope-menu-identity');if(email)email.textContent=this.profile()?.email||u.email;const chip=document.getElementById('workspaceChip');if(chip)chip.textContent=this.v22Member()?NAME:u.advertiserId===OTHER?'远山科技':'未绑定广告主';const box=document.getElementById('financeBox');if(box)box.style.display=this.v22Can('finance')?'':'none'};
 A.v22SelectMember=function(id){if(!window.T1_REVIEW||!user(id))return;this.stopUfTracking();this.ufWorking=null;this.ufInitialDirty=false;this.closeModal();this.closeNotifPop();sessionStorage.setItem('t1-v22-member',id);this.joinTab='members';this.demoRole=this.v22Role();changed();this.go(this.joinLanding());this.v22MountTools()};
 const oldGo=A.go;A.go=function(id){const result=oldGo.call(this,id);this.joinMountReview();return result};
 const oldDash=A.view_dash;
 A.view_dash=function(){const u=this.joinUser();if(!this.v22Member())return this.joinPersonalPage(true);return oldDash.call(this)};
 A.joinPersonalPage=function(home=false){const u=this.joinUser();if(!u)return '<section class="card v22-panel"><h1>请登录T1账号</h1></section>';expire();const own=rows().filter(r=>r.userId===u.id),bound=this.isAdvertiserBound();return `<div class="page-head"><div><h1>${home?'欢迎，'+E(u.name):'我的广告主关联'}</h1><p>${E(u.email)}</p></div>${B('查看通知','App.openNotifCenter()')}</div><section class="card v22-panel"><h2>${bound?(u.advertiserId===OTHER?'已绑定远山科技':'关联信息需核验'):u.removed?'已退出原广告主':'尚未绑定广告主'}</h2><p>${bound?'一个T1账号只能绑定一个广告主，不能再申请或接受其他广告主的绑定。':u.removed?'原广告主的访问权限已收回；广告和历史数据保留。可查看本人记录或重新申请加入。':'可以接受小铃铛中的邀请，也可以输入邀请码申请加入。完成绑定前不可访问广告主的投放、报表与财务。'}</p><div class="v22-actions">${!bound?B('输入邀请码申请加入','App.joinApply()','btn btn-primary')+B('开户与绑定申请','App.openAdvertiserGate()'):B('联系运营',"App.scopeContact('广告主关联核验')")}</div></section><section class="card v22-panel"><h2>我的邀请与申请</h2>${own.length?this.joinRecordTable(own,false):'<p class="v22-empty">暂无邀请或申请</p>'}</section>`};
 A.joinRecordTable=function(list,admin){return `<div class="table-wrap"><table class="v22-table join-records"><thead><tr><th>${admin?'T1账号':'广告主'}</th><th>类型</th><th>角色</th><th>状态</th><th>时间（UTC）</th><th>操作</th></tr></thead><tbody>${list.slice().sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).map(r=>`<tr><td>${E(admin?r.name:r.advertiserName)}<div class="cell-sub">${E(admin?r.email:r.advertiserId)}</div></td><td>${r.kind==='invite'?'邀请':'申请'}</td><td>${E(roles[r.finalRole||r.role]?.name||'—')}${r.kind==='application'&&r.finalRole&&r.finalRole!==r.requestedRole?`<div class="cell-sub">原申请：${E(roles[r.requestedRole].name)}</div>`:''}</td><td>${badge(r)}</td><td>${E(r.createdAt.slice(0,16).replace('T',' '))}</td><td>${B(r.status==='pending'?(admin&&r.kind==='application'?'审批':!admin&&r.kind==='invite'?'处理邀请':'查看'):'查看',`App.joinRecord(${J(r.id)})`)}</td></tr>`).join('')}</tbody></table></div>`};
 A.view_org=function(){expire();const m=this.v22Member(),manage=this.v22Can('manage');if(!manage)return '<section class="card v22-panel"><h1>无权访问成员管理</h1><p>仅广告主管理员可查看此页面。</p></section>';const o=owner(),tabs=[['members','当前成员'],['invites','邀请记录'],['applications','申请记录'],['codes','邀请码'],['audit','操作记录']];let tab=manage?(this.joinTab||'members'):'members';if(!tabs.some(([id])=>id===tab))tab='members';
 let body='';if(tab==='members'){const members=DB.v22.members.filter(x=>active(x)&&(manage||x.id===m.id));body=`<div class="table-wrap"><table class="v22-table" id="joinMembers"><thead><tr><th>成员／T1账号</th><th>角色</th><th>绑定时间（UTC）</th><th>操作</th></tr></thead><tbody>${members.map(x=>`<tr><td>${E(x.name)}${x.id===m.id?'（当前）':''}<div class="cell-sub">${E(x.email)}</div></td><td>${roles[x.role].name}</td><td>${E(this.v22BindingTime(x.id))}</td><td><div class="v22-row">${manage&&x.role!=='owner'?B('调整角色',`App.v22EditMember(${J(x.id)})`)+B('移除',`App.v22RemoveMember(${J(x.id)})`)+B('交接管理员',`App.v22Transfer(${J(x.id)})`):x.role==='owner'?'交接后才能移除':'—'}</div></td></tr>`).join('')}</tbody></table></div>`}
 else if(tab==='invites'||tab==='applications'){const list=tab==='invites'?state().invites:state().applications;body=list.length?this.joinRecordTable(list,true):'<p class="v22-empty">暂无'+(tab==='invites'?'邀请':'申请')+'记录</p>'}
 else if(tab==='codes')body=`<div class="v22-panel"><h2>成员申请邀请码</h2><p>邀请码只用于提交加入申请，仍需管理员审批并确认角色，不会直接绑定。</p>${B('生成新邀请码','App.joinNewCode()')}<div class="table-wrap"><table class="v22-table"><thead><tr><th>邀请码</th><th>有效期至（UTC）</th><th>状态</th><th>操作</th></tr></thead><tbody>${state().codes.map(c=>`<tr><td>${E(c.code)}</td><td>${E(new Date(c.expires).toISOString().slice(0,16).replace('T',' '))}</td><td>${c.status!=='active'?'已停用':c.expires<=Date.now()?'已过期':'有效'}</td><td>${c.status==='active'&&c.expires>Date.now()?B('复制',`App.joinCopyCode(${J(c.code)})`)+B('停用',`App.joinDisableCode(${J(c.code)})`):'—'}</td></tr>`).join('')}</tbody></table></div></div>`;
 else body=`<div class="v22-panel"><h2>操作记录</h2>${DB.v22.audit.slice(0,30).map(a=>`<p>${E(a.at.slice(0,16).replace('T',' '))} · ${E(a.actor)} · ${E(a.text)}</p>`).join('')||'<p>暂无操作记录</p>'}</div>`;
 return `<div class="page-head"><div><h1>组织与成员</h1><p>${NAME} · ${ADV}</p></div><div class="spacer"></div>${manage?B('邀请成员','App.v22Invite()','btn btn-primary'):''}</div><section class="card v22-panel"><div class="v22-row between"><div><h2>${E(m.name)} · ${roles[m.role].name}</h2><p>管理员：${E(o?.name||'待核验')} · ${E(o?.email||'联系运营核对')}</p><p>${manage?'管理当前成员，处理邀请与加入申请。':'仅显示本人的成员关系；调整权限请联系管理员。'}</p></div>${B('查看角色权限','App.v22PermissionMatrix()')}</div>${manage?`<details><summary>管理员分配依据</summary><p>存量默认管理员按最早成功绑定时间确定；只初始化一次，之后以交接结果为准。</p><p>最早成功绑定：${E(DB.v22.roleMigration?.firstBoundAt||'以已核验的交接记录为准')}（示例记录）</p></details>`:''}</section>${manage?`<div class="join-tabs">${tabs.map(([id,label])=>B(label+(id==='applications'&&state().applications.some(r=>r.status==='pending')?' · '+state().applications.filter(r=>r.status==='pending').length:''),`App.joinSetTab('${id}')`,tab===id?'btn btn-primary':'btn')).join('')}</div>`:''}<section class="card">${body}</section>`;
 };
 A.joinSetTab=function(tab){if(!this.v22Require('manage'))return;this.joinTab=tab;this.go('org')};
 A.v22Invite=function(){if(!this.v22Require('manage'))return;modal('邀请T1用户加入'+NAME,`${field('对方的T1账号（邮箱）','v22InviteEmail','','email')}<label class="v22-field">加入后的角色${pick('v22InviteRole')}</label><p>邀请会发送到对方T1账号的小铃铛。对方接受且仍符合绑定条件后，才成为成员。</p>`,B('取消','App.closeModal()')+B('发送邀请','App.v22CreateInvite()','btn btn-primary'))};
 A.v22CreateInvite=function(){if(!this.v22Require('manage'))return;expire();const email=val('v22InviteEmail').toLowerCase(),role=val('v22InviteRole'),u=state().users.find(u=>u.email.toLowerCase()===email);if(!V22Account.email(email))return error('请填写有效的T1账号邮箱');if(u?.id===this.joinUser()?.id)return error('不能邀请自己');const why=eligibility(u);if(why)return error(why);if(!['operator','finance'].includes(role))return error('请选择投放人员或财务人员');if(rows().some(r=>r.userId===u.id&&r.status==='pending'))return error('该账号已有有效邀请或待审批申请，请先处理已有记录');const r=make('invite',u,role);state().invites.unshift(r);event(r,'收到广告主邀请',`${NAME}邀请你以${roles[role].name}身份加入。`,u.id);this.v22Audit('发送邀请 '+u.email);this.joinTab='invites';refresh();this.joinRecord(r.id)};
 A.joinApply=function(code=''){const u=this.joinUser();const why=eligibility(u);if(why)return modal('无法申请绑定',`<p>${E(why)}</p>`);if(state().applications.some(r=>r.userId===u.id&&r.status==='pending'))return modal('已有待审批申请','<p>请先等待管理员处理，或撤销原申请后再提交。</p>',B('查看申请',"App.closeModal();App.go(App.v22Member()?'access':'dash')"));this.joinCodePreview=null;modal('通过邀请码申请加入',`${field('广告主邀请码','joinCode',code)}${B('校验邀请码','App.joinValidateCode()')}<div id="joinCodeResult" aria-live="polite"></div><label class="v22-field">希望加入的角色${pick('joinRequestedRole')}</label><p>管理员会确认最终角色。审批通过且绑定资格仍有效时，才成为成员。</p>`,B('取消','App.closeModal()')+B('提交申请','App.joinSubmitApplication()','btn btn-primary'))};
 function checkCode(code){const c=state().codes.find(c=>c.code===code);return !c?{error:'邀请码不存在，请核对后重试'}:c.status!=='active'?{error:'邀请码已停用，请向管理员获取有效邀请码'}:c.expires<=Date.now()?{error:'邀请码已过期，请向管理员获取有效邀请码'}:{code:c}}
 A.joinValidateCode=function(){const checked=checkCode(val('joinCode'));this.joinCodePreview=null;document.getElementById('joinCodeResult').innerHTML='';error('');if(checked.error)return error(checked.error);this.joinCodePreview=checked.code.code;document.getElementById('joinCodeResult').innerHTML=`<div class="notice info"><b>${NAME}</b> · ${ADV}<p>请核对广告主后提交申请。邀请码不直接授予成员权限。</p></div>`};
 A.joinSubmitApplication=function(){const u=this.joinUser(),why=eligibility(u);if(why)return error(why);const code=val('joinCode'),checked=checkCode(code),role=val('joinRequestedRole');if(checked.error)return error(checked.error);if(this.joinCodePreview!==code)return error('请先校验邀请码并核对广告主');if(!['operator','finance'].includes(role))return error('请选择期望加入的角色');expire();if(rows().some(r=>r.userId===u.id&&r.status==='pending'))return error('已有待处理邀请或申请，请先接受、拒绝或撤销原记录');const r=make('application',u,role);r.code=code;state().applications.unshift(r);event(r,'收到成员申请',`${u.name}申请以${roles[role].name}身份加入${NAME}。`,'admin');event(r,'绑定申请已提交','等待管理员审批，当前尚未获得广告主访问权限。',u.id);this.v22Audit('提交成员申请 '+u.email);this.closeModal();refresh();this.joinRecord(r.id)};
 A.joinRecord=function(id){expire();const r=record(id);if(!permission(r))return this.showPermissionDenied('查看这条邀请或申请');const admin=this.v22Can('manage'),mine=r.userId===this.joinUser()?.id,pending=r.status==='pending';let body=`<div class="v22-row between"><h3>${E(r.advertiserName)} · ${E(r.advertiserId)}</h3>${badge(r)}</div><p>T1账号：${E(r.name)} · ${E(r.email)}</p><p>${r.kind==='invite'?'邀请人：'+E(r.inviterName)+'；邀请角色':'申请角色'}：${E(roles[r.requestedRole||r.role]?.name||'—')}</p>${r.finalRole?`<p>实际加入角色：<b>${roles[r.finalRole].name}</b></p>`:''}<p>提交时间：${E(r.createdAt.slice(0,16).replace('T',' '))} UTC</p>${r.kind==='invite'?`<p>有效期至：${E(new Date(r.expires).toISOString().slice(0,16).replace('T',' '))} UTC</p>`:''}${r.reason?`<div class="notice warning">${E(r.reason)}</div>`:''}`;
 let buttons=B('关闭','App.closeModal()');
 if(pending&&r.kind==='invite'&&mine){body+='<p>接受后才绑定此广告主并获得相应权限。一个T1账号只能绑定一个广告主，接受时会再次校验。</p>';buttons+=B('拒绝邀请',`App.joinRespondInvite(${J(id)},false)`)+B('接受并绑定',`App.joinRespondInvite(${J(id)},true)`,'btn btn-primary')}
 if(pending&&r.kind==='invite'&&admin)buttons+=B('撤销邀请',`App.joinRevokeInvite(${J(id)})`);
 if(pending&&r.kind==='application'&&mine)buttons+=B('撤销申请',`App.joinWithdraw(${J(id)})`);
 if(pending&&r.kind==='application'&&admin){body+=`<label class="v22-field">批准后的角色${pick('joinApprovedRole',r.requestedRole,false)}</label><label class="v22-field">未通过原因（拒绝时必填）<textarea class="input" id="joinDecisionReason" rows="3"></textarea></label><p>审批通过前会再次检查申请人是否仍未绑定广告主。</p>`;buttons+=B('不通过',`App.joinDecide(${J(id)},false)`)+B('通过并绑定',`App.joinDecide(${J(id)},true)`,'btn btn-primary')}
 modal(r.kind==='invite'?'广告主邀请详情':'绑定申请详情',body,buttons);
 };
 A.joinRespondInvite=function(id,accept){expire();const r=record(id);if(!r||r.kind!=='invite'||r.userId!==this.joinUser()?.id)return this.showPermissionDenied('处理他人的邀请');if(r.status!=='pending')return this.joinRecord(id);if(accept){const why=finalize(r,r.role);if(why){this.joinRecord(id);return}}else{r.status='rejected';r.resolvedAt=now();event(r,'邀请已被拒绝',r.name+'拒绝了加入邀请。','admin');this.v22Audit('拒绝邀请 '+r.email);changed()}this.closeModal();refresh();this.joinRecord(id)};
 A.joinRevokeInvite=function(id){if(!this.v22Require('manage'))return;expire();const r=record(id);if(!r||r.kind!=='invite'||r.status!=='pending')return this.joinRecord(id);r.status='revoked';r.reason='管理员已撤销这次邀请';event(r,'邀请已撤销',r.reason,r.userId);this.v22Audit('撤销邀请 '+r.email);refresh();this.joinRecord(id)};
 A.joinWithdraw=function(id){const r=record(id);if(!r||r.kind!=='application'||r.userId!==this.joinUser()?.id)return this.showPermissionDenied('撤销他人的申请');if(r.status!=='pending')return this.joinRecord(id);r.status='withdrawn';r.reason='申请人已撤销';event(r,'成员申请已撤销',r.name+'已撤销加入申请。','admin');this.v22Audit('撤销成员申请 '+r.email);refresh();this.joinRecord(id)};
 A.joinDecide=function(id,approve){if(!this.v22Require('manage'))return;const r=record(id);if(!r||r.advertiserId!==ADV||r.kind!=='application'||r.status!=='pending')return this.joinRecord(id);if(approve){const why=finalize(r,val('joinApprovedRole'));if(why){if(r.status==='invalid')this.joinRecord(id);else error(why);return}}else{const reason=val('joinDecisionReason');if(!reason)return error('请填写未通过原因');r.status='denied';r.reason=reason;r.resolvedAt=now();event(r,'绑定申请未通过',reason,r.userId);this.v22Audit('拒绝成员申请 '+r.email);changed()}this.closeModal();this.joinTab='applications';refresh();this.joinRecord(id)};
 A.joinNewCode=function(){if(!this.v22Require('manage'))return;state().codes.unshift({code:'T1-'+Math.random().toString(36).slice(2,10).toUpperCase(),advertiserId:ADV,status:'active',expires:Date.now()+7*864e5});this.v22Audit('生成成员申请邀请码');refresh()};
 A.joinDisableCode=function(code){if(!this.v22Require('manage'))return;const c=state().codes.find(c=>c.code===code);if(c){c.status='disabled';this.v22Audit('停用成员申请邀请码');refresh()}};
 A.joinCopyCode=async function(code){if(!this.v22Require('manage'))return;try{await navigator.clipboard.writeText(code);this.toast('邀请码已复制')}catch{modal('复制邀请码',`<p>请手动复制：<b>${E(code)}</b></p>`)}};
 A.v22Audit=function(text){DB.v22.audit.unshift({at:now(),actor:this.joinUser()?.name||this.v22Member()?.name||'评审工具',text});this.save()};
 const remove=A.v22RemoveMember;
 A.v22RemoveMember=function(id,confirmed=false){const m=DB.v22.members.find(m=>m.id===id),before=m?.status;remove.call(this,id,confirmed);if(before==='active'&&m?.status==='removed'){const u=user(id);if(u){u.advertiserId=null;u.removed=true;event(null,'广告主访问权限已移除',`你已被移出${NAME}，无法继续访问其投放、报表和财务数据。`,id)}changed();this.go('org')}};
 const transfer=A.v22Transfer;
 A.v22Transfer=function(id,confirmed=false){const prior=this.v22Member()?.id;transfer.call(this,id,confirmed);if(confirmed&&prior&&owner()?.id===id){event(null,'管理员交接已完成',`你现在是${NAME}的管理员。`,id);event(null,'管理员交接已完成',`你现在是${roles[DB.v22.members.find(m=>m.id===prior).role].name}。`,prior);changed()}};
 const visible=A.visibleNotifications;
 A.visibleNotifications=function(){if(!state())return visible.call(this);expire();const u=this.joinUser();if(!u)return [];const personal=DB.notifications.filter(n=>n.target==='membership'&&(n.recipient===u.id||n.recipient==='admin'&&this.v22Can('manage'))).map(n=>({...n,read:(n.readBy||[]).includes(u.id)}));const existing=this.v22Member()?visible.call(this).filter(n=>n.target!=='membership'):[];return [...existing,...personal].sort((a,b)=>String(b.at||'').localeCompare(String(a.at||'')))};
 const read=A.readNotif;
 A.readNotif=function(id){const n=this.visibleNotifications().find(n=>n.id===id);if(n?.target!=='membership')return read.call(this,id);const raw=DB.notifications.find(n=>n.id===id),u=this.joinUser();raw.readBy=raw.readBy||[];if(!raw.readBy.includes(u.id))raw.readBy.push(u.id);this.save();this.syncBell();this.closeNotifPop();if(n.ref&&record(n.ref))this.joinRecord(n.ref);else modal(E(n.title),`<p>${E(n.desc)}</p>`,B(this.v22Member()?'查看本人账号':'查看加入进度',"App.closeModal();App.go(App.v22Member()?'access':'dash')",'btn btn-primary'))};
 const mark=A.markAllRead;
 A.markAllRead=function(){if(!state())return mark.call(this);const id=this.joinUser()?.id;for(const n of this.visibleNotifications()){const raw=DB.notifications.find(x=>x.id===n.id);raw.readBy=raw.readBy||[];if(!raw.readBy.includes(id))raw.readBy.push(id)}this.save();this.syncBell();this.refreshNotifViews();this.toast('已标记为已读，邀请和申请仍需单独处理')};
 const follow=A.followNotification;
 A.followNotification=function(id){const n=this.visibleNotifications().find(n=>n.id===id);if(n?.target==='membership')return this.readNotif(id);return follow.call(this,id)};
 const originalGate=A.openAdvertiserGate;
 A.openAdvertiserGate=function(){originalGate.call(this);const hint=document.querySelector('[data-gate="invite"] small');if(hint)hint.textContent='输入邀请码申请加入，管理员审批通过后绑定'};
 // Existing code entry must not retain the old "code -> immediate bind" bypass.
 for(const name of ['confirmInviteBinding','openInviteBinding','openJoinAdvertiser','joinAdvertiser'])if(typeof A[name]==='function')A[name]=function(){this.joinApply()};
 const baseBinding=A.v22BindingInfo;
 A.v22BindingInfo=function(){if(!this.v22Member())return this.go('dash');return baseBinding.call(this)};
 const baseTools=A.v22MountTools;
 A.v22MountTools=function(){baseTools.call(this);if(!window.T1_REVIEW||!state())return;const sel=document.getElementById('v22MemberSelect');if(sel)sel.innerHTML=state().users.map(u=>`<option value="${E(u.id)}" ${u.id===this.joinUser()?.id?'selected':''}>${E(u.name)} · ${E(this.joinUserLabel(u))}</option>`).join('');this.joinMountReview()};
 A.joinUserLabel=function(u){const m=DB.v22.members.find(m=>m.id===u.id&&active(m));return u.advertiserId===ADV&&m?roles[m.role].name:u.advertiserId===OTHER?'已绑定其他广告主':u.removed?'已移除／未绑定':'未绑定用户'};
 const cases=[
 ['overview','管理员 · 当前成员','me','members'],['operator','投放人员 · 本人账号与业务页','op','members'],['finance','财务人员 · 本人账号与资金页','fin','members'],['unbound','未绑定用户 · 无申请','carol','members'],
 ['invite-create','管理员 · 发出邀请','me','invites'],['invite-pending','受邀人 · 邀请待接受','alice','members'],['invite-accepted','受邀人 · 已接受邀请','alice','members'],['invite-rejected','受邀人 · 已拒绝邀请','alice','members'],['invite-revoked','受邀人 · 邀请已撤销','alice','members'],['invite-expired','受邀人 · 邀请已过期','alice','members'],['invite-race','受邀人 · 接受前已绑定他人','alice','members'],
 ['apply-new','申请人 · 输入邀请码','carol','members'],['apply-pending','申请人 · 等待审批','bob','members'],['apply-review','管理员 · 审批与确认角色','me','applications'],['apply-approved','申请人 · 已通过／角色调整','bob','members'],['apply-denied','申请人 · 未通过及原因','bob','members'],['apply-withdrawn','申请人 · 已撤销申请','bob','members'],['apply-race','管理员 · 审批前申请人已绑定他人','me','applications'],
 ['code-invalid','邀请码 · 不存在','carol','members'],['code-expired','邀请码 · 已过期','carol','members'],['code-disabled','邀请码 · 已停用','carol','members'],['duplicate','邀请校验 · 重复邀请','me','invites'],['unknown','邀请校验 · T1账号不存在','me','invites'],['self','邀请校验 · 不能邀请自己','me','invites'],['same-advertiser','邀请校验 · 已是本广告主成员','me','invites'],['other-advertiser','邀请校验 · 已绑定其他广告主','me','invites'],
 ['removed','成员 · 已移除后访问','removed','members'],['handover','管理员 · 交接及自身后续角色','me','members'],['permission','投放人员 · 访问财务被拒绝','op','members'],['codes','管理员 · 邀请码管理','me','codes'],['empty','管理员 · 无邀请和申请','me','invites']
 ];
 A.joinCases=cases;
 A.joinMountReview=function(){if(!window.T1_REVIEW||!state())return;let box=document.getElementById('joinReviewFilters');if(!box){box=document.createElement('section');box.id='joinReviewFilters';box.className='join-review';document.getElementById('content')?.before(box)}const u=this.joinUser();box.innerHTML=`<div class="join-review-title">交互评审工具 · 非产品功能 <span>切用户保留操作；切场景重置成员样例，不改广告与资金</span></div><div class="join-review-grid"><label>用户视角<select class="select" id="joinUserFilter" onchange="App.v22SelectMember(this.value)">${state().users.map(x=>`<option value="${E(x.id)}" ${x.id===u?.id?'selected':''}>${E(x.name)} · ${E(this.joinUserLabel(x))}</option>`).join('')}</select></label><label>场景筛选<select class="select" id="joinCaseFilter" onchange="App.joinScenario(this.value)">${cases.map(([id,label])=>`<option value="${id}" ${(state().scenario||'overview')===id?'selected':''}>${label}</option>`).join('')}</select></label><div>${B('查看当前用户的铃铛','App.openNotifCenter()')}${B(this.v22Can('manage')?'查看成员管理':this.v22Member()?'查看本人账号':'查看加入进度',"App.go(App.joinLanding())")}</div></div><details><summary>测试账号与操作说明</summary><p>可邀请：carol@example.com（未绑定）；alice@example.com（已有邀请）；bob@example.com（已有申请）；david@example.com（已绑定其他广告主）。不存在账号可填 nobody@example.com。</p><p>有效邀请码 T1-TEAM-26；过期 T1-EXPIRED；停用 T1-DISABLED。邀请和审批都通过页面真实操作完成，不需要模拟邮件回执。</p><p>管理员发送后，切换接收用户并点击铃铛处理；再切回管理员核对成员。${cases.length}个场景均可继续操作；成员、角色、通知与处理结果刷新后保留。</p></details>`};
 A.joinScenario=function(key){if(!window.T1_REVIEW)return;const def=cases.find(c=>c[0]===key);if(!def)return;
  const financeAudit=DB.v22.audit.filter(a=>/充值|资金|核验到账/.test(a.text));
  DB.v22.members=[{id:'me',name:'Victor Wang',email:'victor@example.com',role:'owner',status:'active'},{id:'op',name:'Linda Zhao',email:'linda@example.com',role:'operator',status:'active'},{id:'fin',name:'Evan Chen',email:'evan@example.com',role:'finance',status:'active'}];
  DB.v22.bindings=DB.v22.members.map((m,i)=>({userId:m.id,advertiserId:ADV,status:'success',at:`2026-08-${24+i}T08:10:00Z`}));
  DB.v22.roleMigration={version:1,status:'complete',source:'earliest_successful_binding',initialOwnerId:'me',firstBoundAt:'2026-08-24T08:10:00Z'};DB.v22.audit=financeAudit;
  DB.v22.join={version:2,users:[...DB.v22.members.map(m=>({id:m.id,name:m.name,email:m.email,advertiserId:ADV})),...defaults()],invites:[],applications:[],codes:codeSeed(),scenario:key};
  DB.notifications=DB.notifications.filter(n=>n.target!=='membership');sessionStorage.setItem('t1-v22-member','me');
  const p=baseProfile.call(this)||{};localStorage.setItem('t1_demo_profile',J({...p,advertiserBound:true,advertiserName:NAME}));
  const inv=make('invite',user('alice'),'operator'),app=make('application',user('bob'),'finance');state().invites.push(inv);state().applications.push(app);
  if(key==='invite-accepted')finalize(inv,'operator');
  const invStatus={'invite-rejected':'rejected','invite-revoked':'revoked','invite-expired':'expired'}[key];if(invStatus){inv.status=invStatus;inv.reason={rejected:'受邀人已拒绝本次邀请',revoked:'管理员已撤销邀请',expired:'邀请已过期，请联系管理员重新邀请'}[invStatus];if(invStatus==='expired')inv.expires=Date.now()-864e5}
  if(key==='invite-race')user('alice').advertiserId=OTHER;
  if(key==='apply-approved'){app.requestedRole='operator';app.role='operator';finalize(app,'finance')}
  if(key==='apply-denied'){app.status='denied';app.reason='申请职责与财务岗位不符，请与负责人确认后重新申请'}
  if(key==='apply-withdrawn'){app.status='withdrawn';app.reason='申请人已撤销申请'}
  if(key==='apply-race')user('bob').advertiserId=OTHER;
  if(key==='empty'){state().invites=[];state().applications=[]}
  else {event(inv,'广告主邀请',`${NAME}的邀请：${st(inv)}。`,'alice');event(app,'绑定申请进度',`申请当前为${st(app)}。`,'bob');event(app,'成员加入申请',`${app.name}申请加入，当前${st(app)}。`,'admin')}
  this.closeModal();this.joinTab=def[3];this.v22SelectMember(def[2]);this.joinTab=def[3];this.go(this.joinLanding());this.save();
  if(['invite-create','duplicate','unknown','self','same-advertiser','other-advertiser'].includes(key)){this.v22Invite();document.getElementById('v22InviteEmail').value=({'invite-create':'carol','duplicate':'alice','unknown':'nobody','self':'victor','same-advertiser':'linda','other-advertiser':'david'}[key])+'@example.com';document.getElementById('v22InviteRole').value='operator';if(key!=='invite-create')this.v22CreateInvite()}
  if(['apply-new','code-invalid','code-expired','code-disabled'].includes(key)){this.joinApply({'apply-new':'T1-TEAM-26','code-invalid':'WRONG-CODE','code-expired':'T1-EXPIRED','code-disabled':'T1-DISABLED'}[key]);if(key!=='apply-new')this.joinValidateCode()}
  if(key==='apply-review'||key==='apply-race')this.joinRecord(app.id);
  if(key==='handover')this.v22Transfer('op');
  if(key==='permission')this.go('billing');
 };
 // Audit actor and access checks use the selected user; selectors never grant permissions.
 const init=A.init;
 A.init=function(){init.call(this);this.joinMountReview();if(new URLSearchParams(location.search).get('case')==='roles')this.go(this.joinLanding())};
})();
