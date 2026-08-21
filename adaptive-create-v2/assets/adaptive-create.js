/* Adaptive RTB creation experiment.
   The existing T1 navigation, list and management pages remain unchanged. */
PAGES.quicknew={label:'快速投放',sub:'填写业务需要，系统自动组织投放结构',nav:'plans'};

Object.assign(App,{
  quickDraft:null,
  quickAssetReady:false,
  rtbCreateMode:'',

  startRtbCreate(){
    this.rtbCreateMode='';
    this.modal(`<div class="modal-head"><div><h3>选择 RTB 投放方式</h3><p>根据本次投放的复杂度选择；两种方式共用账户、素材和数据</p></div><div class="spacer"></div><button class="icon-btn" onclick="App.closeModal()">${svg(I.x)}</button></div>
      <div class="modal-body"><div class="rtb-mode-grid">
        <button class="rtb-mode-card" data-rtb-mode="quick" onclick="App.pickRtbCreateMode(this,'quick')"><span class="mode-check">✓</span><em>推荐 · 最少步骤</em><small>适合目标明确的单一投放</small><b>快速投放</b><p>只填写目标、整体预算、地区和创意，系统自动建立默认投放策略。</p><ul><li>一个页面完成</li><li>后续可转为专业管理</li></ul></button>
        <button class="rtb-mode-card" data-rtb-mode="professional" onclick="App.pickRtbCreateMode(this,'professional')"><span class="mode-check">✓</span><em>更多控制</em><small>适合拆预算与多策略测试</small><b>专业投放</b><p>显式管理广告计划、广告组和广告创意，控制每一层的策略。</p><ul><li>多个广告组拆分预算</li><li>测试人群、库存和创意</li></ul></button>
      </div></div>
      <div class="modal-foot"><span class="cell-sub" id="rtbModeHint">请选择一种投放方式</span><div class="spacer"></div><button class="btn btn-ghost" onclick="App.closeModal()">取消</button><button class="btn btn-primary" id="rtbModeContinue" disabled onclick="App.confirmRtbCreateMode()">继续</button></div>`,true);
  },
  pickRtbCreateMode(el,mode){
    document.querySelectorAll('[data-rtb-mode]').forEach(x=>x.classList.remove('sel'));
    el.classList.add('sel');this.rtbCreateMode=mode;
    const hint=document.getElementById('rtbModeHint'),btn=document.getElementById('rtbModeContinue');
    if(hint)hint.textContent=mode==='quick'?'已选择快速投放':'已选择专业投放';if(btn)btn.disabled=false;
  },
  confirmRtbCreateMode(){
    if(!this.rtbCreateMode)return;
    this.closeModal();
    if(this.rtbCreateMode==='professional'){this.beginNewRtb();return;}
    this.beginQuickRtb();
  },
  beginQuickRtb(){
    const today=new Date().toISOString().slice(0,10);
    this.quickDraft={goal:'traffic',name:`快速投放｜${today.replaceAll('-','')}｜01`,period:'ongoing',budget:'',start:today,end:'',geo:'',inventory:'自动选择优质流量',landing:'',headline:''};
    this.quickAssetReady=false;this.go('quicknew');
  },
  quickVal(id){return document.getElementById(id)?.value?.trim()||''},
  captureQuickDraft(){
    if(!this.quickDraft)return;
    Object.assign(this.quickDraft,{name:this.quickVal('quickName'),budget:this.quickVal('quickBudget'),start:this.quickVal('quickStart'),end:this.quickVal('quickEnd'),geo:this.quickVal('quickGeo'),inventory:this.quickVal('quickInventory')||'自动选择优质流量',landing:this.quickVal('quickLanding'),headline:this.quickVal('quickHeadline')});
  },
  pickQuickGoal(goal){this.captureQuickDraft();this.quickDraft.goal=goal;this.go('quicknew')},
  pickQuickPeriod(period){this.captureQuickDraft();this.quickDraft.period=period;this.go('quicknew')},
  selectQuickAsset(){this.captureQuickDraft();this.quickAssetReady=true;this.go('quicknew')},
  quickGoalLabel(){return ({traffic:'获取访问',conversion:'获得转化',awareness:'提升曝光'})[this.quickDraft?.goal]||'获取访问'},
  view_quicknew(){
    const q=this.quickDraft||{};
    const goalButton=(key,label)=>`<button class="${q.goal===key?'sel':''}" onclick="App.pickQuickGoal('${key}')">${label}</button>`;
    const summary=(label,value)=>`<div class="quick-summary-row"><span>${label}</span><b>${value}</b></div>`;
    return `<div class="quick-create"><div class="page-head"><div><h1>快速投放</h1><p>填写业务需要，系统自动组织投放结构</p></div><div class="spacer"></div><button class="btn btn-ghost" onclick="App.go('plans')">取消创建</button></div>
      <div class="quick-mode-banner"><span class="mode-icon">⚡</span><div><b>当前使用快速投放</b><small>适合单一预算、单一策略；需要拆分预算或测试策略时可使用专业投放</small></div><button class="text-link" onclick="App.startRtbCreate()">切换方式</button></div>
      <div class="quick-create-grid"><div class="card">
        <section class="quick-section"><div class="quick-section-head"><span>1</span><div><h3>这次投放希望实现什么</h3><p>目标会帮助系统组织默认配置</p></div></div><div class="quick-goals">${goalButton('traffic','获取访问')}${goalButton('conversion','获得转化')}${goalButton('awareness','提升曝光')}</div></section>
        <section class="quick-section"><div class="quick-section-head"><span>2</span><div><h3>投入多少、投放多久</h3><p>只填写整体预算，不需要先拆分到广告组</p></div></div><div class="quick-fields"><div class="field wide"><label>投放名称<span class="req">*</span></label><input class="input" id="quickName" value="${q.name||''}"></div><div class="field"><label>${q.period==='fixed'?'总预算':'每日预算'}（USD）<span class="req">*</span></label><input class="input" type="number" min="100" id="quickBudget" value="${q.budget||''}" placeholder="不低于 100"></div><div class="field"><label>投放周期</label><div class="quick-goals"><button class="${q.period==='ongoing'?'sel':''}" onclick="App.pickQuickPeriod('ongoing')">长期投放</button><button class="${q.period==='fixed'?'sel':''}" onclick="App.pickQuickPeriod('fixed')">固定周期</button></div></div><div class="field"><label>开始日期<span class="req">*</span></label><input class="input" type="date" id="quickStart" value="${q.start||''}"></div>${q.period==='fixed'?`<div class="field"><label>结束日期<span class="req">*</span></label><input class="input" type="date" id="quickEnd" value="${q.end||''}"></div>`:''}</div></section>
        <section class="quick-section"><div class="quick-section-head"><span>3</span><div><h3>希望触达哪些用户</h3><p>先完成必要选择，更细设置可在专业管理中调整</p></div></div><div class="quick-fields"><div class="field"><label>投放地区<span class="req">*</span></label><select class="select" id="quickGeo"><option value="">请选择</option>${['美国','德国、法国','巴西','全球'].map(x=>`<option ${q.geo===x?'selected':''}>${x}</option>`).join('')}</select></div><div class="field"><label>流量选择</label><select class="select" id="quickInventory">${['自动选择优质流量','App 流量','Web / H5 流量'].map(x=>`<option ${q.inventory===x?'selected':''}>${x}</option>`).join('')}</select></div></div></section>
        <section class="quick-section"><div class="quick-section-head"><span>4</span><div><h3>用户最终看到什么</h3><p>选择素材并填写落地页</p></div></div><div class="quick-fields"><div class="field wide"><label>广告素材<span class="req">*</span></label><div class="quick-upload ${this.quickAssetReady?'ready':''}" onclick="App.selectQuickAsset()">${this.quickAssetReady?'<b>✓ summer-feed-1200x628.png</b><small>素材规格校验通过</small>':'<b>上传素材或从素材库选择</b><small>系统会根据流量范围检查规格</small>'}</div></div><div class="field"><label>落地页链接<span class="req">*</span></label><input class="input" id="quickLanding" value="${q.landing||''}" placeholder="https://"></div><div class="field"><label>广告标题</label><input class="input" id="quickHeadline" value="${q.headline||''}" placeholder="请输入标题"></div></div></section>
        <div class="modal-foot"><button class="btn btn-ghost" onclick="App.go('plans')">取消</button><div class="spacer"></div><button class="btn btn-primary" onclick="App.submitQuickRtb()">确认并提交审核</button></div>
      </div><aside class="card quick-summary"><div class="card-pad"><h3 style="margin:0 0 8px">投放摘要</h3>${summary('投放目标',this.quickGoalLabel())}${summary('预算',q.budget?fmtMoney(Number(q.budget)):'待填写')}${summary('地区',q.geo||'待选择')}${summary('流量',q.inventory||'自动选择')}${summary('创意',this.quickAssetReady?'已选择':'待上传')}<div class="quick-system-note"><b>系统会自动完成</b><br>创建一个广告计划、一个默认广告组和一条广告。以后需要拆预算或测试策略时，可转为专业管理。</div></div></aside></div></div>`;
  },
  submitQuickRtb(){
    this.captureQuickDraft();const q=this.quickDraft;
    if(!q.name||!q.budget||!q.start||!q.geo||!q.landing){this.toast('请完整填写投放名称、预算、日期、地区和落地页','warn');return;}
    if(Number(q.budget)<100){this.toast('预算不能低于 100 USD','warn');return;}
    if(q.period==='fixed'&&!q.end){this.toast('请选择结束日期','warn');return;}
    if(!/^https?:\/\/\S+$/i.test(q.landing)){this.toast('请输入有效的落地页链接','warn');return;}
    if(!this.quickAssetReady){this.toast('请上传广告素材或从素材库选择','warn');return;}
    const cid='C-'+(50330+DB.campaigns.length),gid='G-'+(8020+(DB.adGroups||[]).length),crid='CR-'+(9040+DB.creatives.length),budget=Number(q.budget),end=q.period==='fixed'?q.end:'';
    const cp={id:cid,name:q.name,alias:q.name,mode:'rtb',createExperience:'quick',objective:q.goal,duration:q.period,start:q.start,end,period:q.period==='fixed'?`${q.start} 至 ${q.end}`:'长期投放',placement:q.inventory,fmt:'feed',model:'CPM',bid:2.4,status:'active',spend:0,imps:0,clicks:0,conv:0,geo:[q.geo],inv:q.inventory.includes('App')?['app']:q.inventory.includes('Web')?['web','h5']:['app','web','h5'],budget,totalBudget:q.period==='fixed'?budget:0,dailyBudget:q.period==='ongoing'?budget:0};
    const group={id:gid,camp:cid,name:'默认投放策略',start:q.start,end,budget,bidType:'CPM',bid:2.4,geo:q.geo,device:'不限',format:'feed',inventory:q.inventory,status:'active',autoCreated:true};
    const asset=DB.assetFiles.find(f=>f.type==='image')||{};
    const creative={id:crid,name:q.headline||'快速投放创意',group:group.name,groupId:gid,assetId:asset.id,fmt:'feed',kind:'image',size:asset.dim||'1200×628',camp:cid,headline:q.headline,landing:q.landing,imps:0,clicks:0,ctr:0,status:'review',version:1,created:new Date().toISOString().slice(0,10)};
    DB.campaigns.unshift(cp);DB.adGroups=DB.adGroups||[];DB.adGroups.unshift(group);DB.creatives.unshift(creative);DB.auditLogs.unshift({id:'LOG-'+Date.now(),time:new Date().toLocaleString('zh-CN',{hour12:false}),actor:'演示用户',action:'通过快速模式创建 RTB 投放',target:cid,result:'成功'});
    this.save();this.quickDraft=null;this.quickAssetReady=false;this.go('plans');this.toast('快速投放已创建，广告创意已提交审核');
  }
});
