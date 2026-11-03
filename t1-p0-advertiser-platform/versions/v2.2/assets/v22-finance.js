/* Customer transfer -> proof -> SSP credit result. All payment data is mock. */
(()=>{
 const A=App,E=A.workspace.E,B=A.workspace.button,J=JSON.stringify;
 const now=()=>new Date().toISOString(),val=id=>document.getElementById(id)?.value.trim()||'';
 const names={pending:'处理中',approved:'已到账',rejected:'未通过',cancelled:'已撤销'};
 const badge=s=>`<span class="v22-status ${s==='approved'?'good':s==='rejected'?'bad':'warn'}">${names[s]||'待确认'}</span>`;
 const error=t=>{const el=document.getElementById('v22Error');if(el)el.textContent=t;else A.toast(t,'warn')};
 const buttonClose=B('关闭','App.closeModal()');
 const modal=(title,body,foot)=>A.modal(`<div class="modal-head"><h3>${title}</h3>${buttonClose}</div><div class="modal-body">${body}<div id="v22Error" class="v22-error" role="alert"></div></div><div class="modal-foot">${foot||buttonClose}</div>`,true);
 const allowed=()=>{if(!A.v22Require('finance'))return false;return A.scopeGuard()};
 const payment=()=>({method:'转账（示例）',currency:'USDT',network:'待确认（演示占位）',address:'DEMO_ONLY_NOT_A_PAYMENT_ADDRESS'});
 const money=n=>Number(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
 const record=id=>DB.recharges.find(r=>r.id===id);
 const summary=r=>r.status==='approved'?'运营已完成充值，余额已更新。':r.status==='rejected'?'凭证未通过核实，请查看原因并补充。':r.status==='cancelled'?'此记录已撤销，不代表实际转账已退款。':r.processing==='verified'?'付款信息已核实，等待运营完成充值；尚未计入余额。':r.processing==='sync'?'处理结果暂未更新，请勿重复提交；可联系运营核实。':'充值申请已提交，待核实入账。提交凭证不代表余额已增加，请勿因等待审核而重复转账。';
 A.openDeposit=function(){if(!allowed())return;this.financeAddressMissing=false;this.v22FinanceForm()};
 A.v22FinanceForm=function(id){
  if(!allowed())return;const r=id?record(id):null;
  if(id&&r?.status!=='rejected')return this.toast('只有未通过的记录可以修改重提','warn');
  this.v22Resubmit=id||null;this.financeDraft={amount:r?.amount||'',note:r?.note||''};
  this.financeProofs=r?.proofs?.map(f=>({...f}))||(r?.shotData?[{name:r.shot,data:r.shotData}]:[]);
  this.financePayment=r?{method:r.method,currency:r.currency||'USD',address:r.address||'',network:r.network||'历史记录未提供'}:payment();
  this.financeSubmitted=false;this.financeUploading=false;this.financeStep();
 };
 A.financeCapture=function(){if(document.getElementById('depAmt'))this.financeDraft={amount:val('depAmt'),note:val('v22PayNote')}};
 A.financeStep=function(){
  if(!allowed())return;this.financeCapture();const p=this.financePayment||payment(),d=this.financeDraft||{},r=this.v22Resubmit?record(this.v22Resubmit):null;
  const advertiser=r?.advertiserName||this.profile()?.advertiserName||'星海互动',aid=r?.advertiserId||this.profile()?.sspAdvertiserId||'ADV-70285';
  modal(r?'补充充值资料':'充值',`
   <div class="finance-demo">交互演示 · 收款信息为占位，请勿真实转账</div>
   <div class="finance-owner"><span>充值广告主</span><strong>${E(advertiser)}</strong><span>${E(aid)}</span></div>
   ${r?`<div class="notice warning">未通过原因：${E(r.reviewOpinion)}<br>请补充这笔转账的资料，无需重新付款。</div>`:''}
   <section class="finance-section"><div class="finance-section-heading"><b class="finance-number">1</b><div><h3>查看收款信息并转账</h3><p>使用外部钱包或转账工具付款，完成后保留付款凭证。</p></div></div>
   ${this.financeAddressMissing?'<div class="notice warning">收款信息暂未配置，请联系对接商务确认后再付款。已经转账的，可直接在下方提交资料。</div>':`
   <div class="finance-receiving"><div class="finance-receiving-fields"><div class="finance-payment-meta"><span>币种：<b>${E(p.currency)}</b>（示例）</span><span>转账网络：${E(p.network)}</span></div>
   <label class="v22-field">收款地址<div class="finance-copy"><input class="input" id="depAddr" readonly value="${E(p.address)}">${B('复制地址','App.financeCopyAddress()')}</div></label>
   <p class="v22-hint">请核对币种、网络及收款地址后转账。</p></div><div class="finance-qr" aria-label="收款二维码占位，不能扫码付款"><span>▦</span><b>收款二维码</b><small>待配置 · 不可扫码</small></div></div>`}
   </section>
   <section class="finance-section"><div class="finance-section-heading"><b class="finance-number">2</b><div><h3>转账后提交付款资料</h3><p>已完成转账？直接填写本部分，无需再次付款。</p></div></div>
   <label class="v22-field">实际转账金额（${E(p.currency)}）<input class="input" id="depAmt" type="number" min="0.01" step="0.01" placeholder="填写已转出的金额" value="${E(d.amount)}"></label>
   <div class="v22-field"><label for="scopeDepositFile">付款凭证 <small>（必填）</small></label><div class="finance-upload">${B('＋ 上传付款凭证',"document.getElementById('scopeDepositFile').click()") }<span>可分次添加，最多10张</span></div><input hidden id="scopeDepositFile" type="file" multiple accept="image/png,image/jpeg" onchange="App.scopeDepositPreview(this)"></div>
   <p id="scopeDepositFileHint" class="v22-hint">JPG / PNG，每张不超过5MB，最多10张。请上传清晰、完整的转账记录。</p>
   <div id="financeProofPreview" class="finance-proof-grid"></div>
   <label class="v22-field">备注（选填）<textarea class="input" id="v22PayNote" rows="2" maxlength="500" placeholder="其他需要核实的付款信息">${E(d.note)}</textarea></label>
   <div class="notice info">提交后进入充值审核，实际入账后才更新余额。请勿因等待审核而重复转账。</div>
   </section>`,B('取消','App.closeModal()')+B(r?'重新提交':'提交充值申请','App.doDeposit()','btn btn-primary'));
   this.financePaintProofs();
 };
 A.financePaintProofs=function(){const el=document.getElementById('financeProofPreview');if(!el)return;
  el.innerHTML=(this.financeProofs||[]).map((f,i)=>`<figure><img src="${E(f.data)}" alt="付款凭证${i+1}"><figcaption title="${E(f.name)}">${E(f.name)}</figcaption>${B('移除',`App.financeRemoveProof(${i})`,'btn btn-ghost')}</figure>`).join('');
  this.scopeDepositFile=this.financeProofs?.[0]||null;
 };
 A.financeRemoveProof=function(i){if(this.financeUploading)return;this.financeProofs.splice(i,1);this.financePaintProofs()};
 A.financeCopyAddress=async function(){if(!allowed()||this.financeAddressMissing)return;try{await navigator.clipboard.writeText(payment().address);this.toast('示例地址已复制，请勿真实转账')}catch{document.getElementById('depAddr')?.select();this.toast('请手动复制选中的示例地址')}};
 A.scopeDepositPreview=async function(input){
  if(!allowed()||this.financeUploading)return;const files=[...input.files];if(!files.length)return;
  const existing=this.financeProofs||[];
  if(existing.length+files.length>10){input.value='';return error('最多上传10张付款凭证')}
  if(files.some(f=>!['image/png','image/jpeg'].includes(f.type)||f.size>5*1024*1024)){input.value='';return error('请上传每张5MB以内的JPG／PNG图片')}
  this.financeUploading=true;error('正在读取凭证…');
  try{
   // Mock persists bounded thumbnails, never uploads customer files to a service.
   const previews=await Promise.all(files.map(f=>new Promise((resolve,reject)=>{
    const url=URL.createObjectURL(f),im=new Image();im.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('图片无法读取，请更换有效图片'))};
    im.onload=()=>{try{const scale=Math.min(1,720/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.width*scale));c.height=Math.max(1,Math.round(im.height*scale));const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);resolve({name:f.name,data:c.toDataURL('image/jpeg',0.65)})}catch(e){reject(e)}finally{URL.revokeObjectURL(url)}};im.src=url;
   })));
   if(document.contains(input)){this.financeProofs.push(...previews);this.financePaintProofs();error('')}
  }catch(e){if(document.contains(input))error(e.message)}finally{this.financeUploading=false;input.value=''}
 };
 A.doDeposit=function(){if(!allowed()||this.financeSubmitted)return;if(this.financeUploading)return error('请等待凭证读取完成');const amount=Number(val('depAmt'));if(!Number.isFinite(amount)||amount<=0||Math.abs(Math.round(amount*100)-amount*100)>1e-7)return error('请填写大于0的金额，最多两位小数');if(!this.scopeDepositFile)return error('请上传转账凭证');let r=this.v22Resubmit?record(this.v22Resubmit):null;if(this.v22Resubmit&&r?.status!=='rejected')return error('该记录已更新，不能重复提交');const at=now(),p=this.financePayment||payment(),data={advertiserName:this.profile()?.advertiserName||'星海互动',advertiserId:this.profile()?.sspAdvertiserId||'ADV-70285',network:p.network,proofs:this.financeProofs.map(f=>({...f})),amount,date:at.slice(0,16).replace('T',' '),method:p.method,currency:p.currency,address:this.financeAddressMissing?'':p.address,note:val('v22PayNote'),status:'pending',processing:null,shot:this.scopeDepositFile.name,shotData:this.scopeDepositFile.data,reviewOpinion:'凭证已提交，等待运营核实并充值',reviewTime:'—',attempt:(r?.attempt||0)+1};if(r){r.submissions=r.submissions||[];r.submissions.push({at:r.date,amount:r.amount,reason:r.reviewOpinion});Object.assign(r,data)}else{r={id:'RC-'+Date.now()+'-'+Math.floor(Math.random()*1000),...data};DB.recharges.unshift(r)}this.financeSubmitted=true;this.v22Event('recharge:'+r.id+':pending:'+r.attempt,'充值凭证已提交','充值申请已提交，待核实入账。请勿重复转账。','recharge',r.id,'finance',['owner','finance']);this.v22Audit('提交充值凭证 '+r.id);this.closeModal();this.scopeFinTab='recharges';this.go('billing');this.viewShot(r.id)};
 A.viewShot=function(id){if(!this.v22Require('finance'))return;const r=record(id);if(!r)return;const approved=r.status==='approved';modal('充值记录详情',`<div class="v22-row between"><b>${E(r.id)}</b>${badge(r.status)}</div><div class="notice ${r.status==='rejected'?'warning':'info'}">${summary(r)}</div><div class="summary-list"><div><span>提交金额（${E(r.currency||'USD')}）</span><b>${money(r.amount)}</b></div><div><span>到账金额（USD）</span><b>${approved?fmtMoney(r.creditedAmount??r.amount):'尚未到账'}</b></div><div><span>付款方式</span><b>${E(r.method||'转账')}</b></div></div><p>广告主：${E(r.advertiserName||this.profile()?.advertiserName||'星海互动')} · ${E(r.advertiserId||this.profile()?.sspAdvertiserId||'ADV-70285')}</p><p>提交时间：${E(r.date)}</p><p>${approved?'到账时间':'处理时间'}：${E(r.reviewTime||'—')}</p><p>处理说明：${E(r.reviewOpinion||'等待运营核实')}</p>${r.network?`<p>转账网络：${E(r.network)}</p>`:''}${r.address?`<p class="finance-address-record">收款地址：${E(r.address)}</p>`:''}<p>备注：${E(r.note||'—')}</p>${r.proofs?.length?`<div class="finance-proof-grid">${r.proofs.map(f=>`<figure><img src="${E(f.data)}" alt="付款凭证"><figcaption>${E(f.name)}</figcaption></figure>`).join('')}</div>`:r.shotData?`<img class="v22-proof" src="${E(r.shotData)}" alt="转账凭证">`:`<p class="v22-hint">凭证：${E(r.shot||'未提供')}（历史样例，未附原图）</p>`}${r.submissions?.length?`<details><summary>此前提交记录（${r.submissions.length}）</summary>${r.submissions.map(s=>`<p>${E(s.at)} · ${money(s.amount)} · ${E(s.reason)}</p>`).join('')}</details>`:''}`,B('返回充值记录','App.closeModal();App.scopeFinanceTab("recharges")')+(r.status==='rejected'?B('修改并重新提交',`App.v22FinanceForm(${J(id)})`,'btn btn-primary'):'')+B('联系运营',"App.scopeContact('充值记录核对')"))};
 // No customer-side cancellation/refund flow is inferred from a transferred payment.
 A.v22CancelRecharge=function(){if(!this.v22Require('finance'))return;this.scopeContact('已转账充值记录更正')};
 A.v22ReviewFinance=function(){if(!window.T1_REVIEW||!this.v22Require('finance'))return;const rows=DB.recharges.filter(r=>r.status==='pending');modal('评审工具 · 模拟SSP结果',`<p class="v22-hint">非产品功能，仅修改Mock。运营在现有SSP后台加款，T1不新增处理入口。</p><label class="v22-field">待处理记录<select class="select" id="v22ReviewRecharge">${rows.map(r=>`<option value="${E(r.id)}">${E(r.id)} · ${money(r.amount)}</option>`).join('')}</select></label><label class="v22-field">模拟实际入账金额（USD）<input class="input" id="financeCreditAmount" type="number" min="0.01" step="0.01" placeholder="填写SSP返回的实际入账金额"></label><p class="v22-hint">USDT为付款示例，USD沿用现有账户展示。不假定汇率；正式币种和折算规则待SSP确认。</p><label class="v22-field">未通过原因<input class="input" id="v22RejectReason" value="凭证信息不清晰，请补充完整转账凭证。"></label>${rows.length?'':'<p>暂无待处理记录。</p>'}`,rows.length?B('模拟已核实，未加款','App.v22FinanceResult("verified")')+B('模拟未通过','App.v22FinanceResult("rejected")')+B('模拟SSP已加款','App.v22FinanceResult("approved")','btn btn-primary'):buttonClose)};
 A.v22FinanceResult=function(result){if(!window.T1_REVIEW||!this.v22Require('finance'))return;if(!['verified','rejected','approved'].includes(result))return;const r=record(val('v22ReviewRecharge'));if(r?.status!=='pending')return;if(result==='rejected'&&!val('v22RejectReason'))return error('请填写未通过原因');if(result==='approved'&&(!Number.isFinite(Number(val('financeCreditAmount')))||Number(val('financeCreditAmount'))<=0||Math.abs(Number(val('financeCreditAmount'))*100-Math.round(Number(val('financeCreditAmount'))*100))>1e-7))return error('请填写大于0、最多两位小数的实际入账金额');if(result==='verified'){r.processing='verified';r.reviewOpinion='付款信息已核实，等待完成入账。';r.reviewTime=now();this.save();this.closeModal();this.viewShot(r.id);return}r.status=result;r.processing=null;r.reviewTime=now();r.reviewOpinion=result==='approved'?'充值已入账，余额已更新。':val('v22RejectReason');if(result==='approved'){r.creditedAmount=Number(val('financeCreditAmount'));DB.balance=Math.round((DB.balance+r.creditedAmount)*100)/100}DB.v22.financeRevision++;this.v22Event('recharge:'+r.id+':'+result+':'+r.attempt,result==='approved'?'充值已到账':'充值凭证未通过',r.reviewOpinion,'recharge',r.id,'finance',['owner','finance']);this.v22Audit('模拟SSP充值结果 '+r.id+' '+names[result]);this.closeModal();this.syncAccountContext();this.go('billing');this.viewShot(r.id)};
 const current=A.notificationCurrent;A.notificationCurrent=function(n){if(n.target==='recharge'){if(!this.v22Can('finance'))return '当前无权查看该充值记录';const r=record(n.ref);return r?`${r.id} · ${names[r.status]} · ${summary(r)}`:'当前充值记录不可访问'}return current.call(this,n)};
 const exportFinance=A.v22ExportFinance;
 A.v22ExportFinance=function(){if(this.scopeFinTab==='spend')return exportFinance.call(this);if(!this.v22Require('finance'))return;
  const status=val('billStatusFilter'),kw=val('billSearch').toLowerCase();
  const rows=[['提交时间','申请单号','转账金额','转账币种','实际到账金额','账户币种','状态'],...DB.recharges.filter(r=>(!status||r.status===status)&&r.id.toLowerCase().includes(kw)).map(r=>[r.date,r.id,r.amount,r.currency||'USD',r.status==='approved'?(r.creditedAmount??r.amount):'','USD',names[r.status]])];
  const csv=rows.map(row=>row.map(x=>'"'+String(x??'').replace(/^[=+@-]/,"'$&").replaceAll('"','""')+'"').join(',')).join('\r\n'),url=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='T1-充值记录.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 };
 const billing=A.view_billing;
 A.view_billing=function(){const html=billing.call(this);return html.replace('待处理充值（USD）','处理中申请（笔）').replace(fmtMoney(DB.recharges.filter(r=>r.status==='pending').reduce((s,r)=>s+r.amount,0))+'</div><p class="cell-sub">尚未计入余额',DB.recharges.filter(r=>r.status==='pending').length+'</div><p class="cell-sub">尚未计入余额')};
 A.renderBilling=function(){const el=document.getElementById('billBody');if(!el)return;const status=val('billStatusFilter'),kw=val('billSearch').toLowerCase();
  el.innerHTML=DB.recharges.filter(r=>(!status||r.status===status)&&r.id.toLowerCase().includes(kw)).map(r=>`<tr><td>${E(r.date)}</td><td>${E(r.id)}</td><td>${money(r.amount)} ${E(r.currency||'USD')}</td><td>${badge(r.status)}</td><td>${B('查看详情',`App.viewShot(${J(r.id)})`)}</td></tr>`).join('')||'<tr><td colspan="5"><div class="empty">暂无符合条件的充值记录</div></td></tr>';
 };
 const render=A.scopeRenderFinance;A.scopeRenderFinance=function(){render.call(this);const body=document.getElementById('scopeFinBody');if(!body)return;body.querySelectorAll('th').forEach(th=>{if(th.textContent==='提交金额（USD）')th.textContent='实际转账金额'});const pendingOption=body.querySelector('option[value="pending"]');if(pendingOption)pendingOption.textContent='处理中';body.insertAdjacentHTML('afterbegin',`<div class="v22-row between" style="margin:12px 0"><p class="v22-hint">到账以实际充值结果为准 · 消耗保留归档历史 · 付款金额与实际到账金额分别展示</p>${B('导出当前查询','App.v22ExportFinance()')}</div>`);const f=document.getElementById('billStatusFilter');if(f&&DB.recharges.some(r=>r.status==='cancelled'))f.insertAdjacentHTML('beforeend','<option value="cancelled">已撤销（历史）</option>');document.getElementById('financeReviewTools')?.remove();if(window.T1_REVIEW)document.getElementById('scopeReviewTools')?.insertAdjacentHTML('beforeend',`<section class="finance-review" id="financeReviewTools"><b>充值场景 · 非产品功能</b><p>收款币种／网络／地址、付款方地址是否必填、审核与加款关系均待SSP确认。凭证仅在本浏览器保存缩略图，不上传、不真实送审。</p><select class="select" id="financeCase" onchange="App.financeScenario(this.value)"><option value="">选择查看的场景</option><option value="ready">付款地址与转账</option><option value="form">上传凭证</option><option value="pending">凭证已提交／处理中</option><option value="verified">已核实但未加款</option><option value="approved">SSP已加款／已到账</option><option value="rejected">未通过／修改重提</option><option value="sync">结果暂未更新</option><option value="missing">付款地址未配置</option></select>${B('模拟当前记录的SSP结果','App.v22ReviewFinance()')}</section>`)};
 A.financeScenario=function(key){if(!window.T1_REVIEW||!allowed()||!key)return;this.financeAddressMissing=key==='missing';if(['ready','missing','form'].includes(key)){this.v22FinanceForm();if(key==='form')this.financeStep(2);return}const id='RC-DEMO-'+key;let r=record(id);if(!r){r={id,date:'2026-11-03 08:30',amount:500,currency:'USDT',network:payment().network,method:'转账（示例）',address:payment().address,status:['approved','rejected'].includes(key)?key:'pending',processing:['verified','sync'].includes(key)?key:null,shot:'转账凭证样例.png',reviewTime:key==='pending'?'—':'2026-11-03 09:00',reviewOpinion:key==='approved'?'SSP加款完成（历史Mock，不重复增加当前余额）':key==='rejected'?'凭证未显示完整收款信息，请补充后重提。':key==='verified'?'付款信息已核实，尚未加款。':key==='sync'?'结果更新延迟，请联系运营核实。':'等待运营核实并充值',attempt:1};if(key==='approved')r.creditedAmount=500;DB.recharges.unshift(r);this.save()}this.scopeFinTab='recharges';this.go('billing');this.viewShot(r.id)};
 const init=A.init;A.init=function(){init.call(this);if(new URLSearchParams(location.search).get('case')==='finance'){this.go(this.v22Can('finance')?'billing':'dash');if(new URLSearchParams(location.search).get('recharge')==='1'&&this.v22Can('finance'))this.openDeposit()}};
})();
