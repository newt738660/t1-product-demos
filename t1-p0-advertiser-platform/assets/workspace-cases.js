/* Deterministic business fixtures and additive daily facts for the advertiser prototype. */
(()=>{
 const A=App,old=A.load;
 const date=(base,n)=>{const d=new Date(base+'T00:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)};
 A.load=function(){old.call(this);if(DB.workspaceCases===2)return;
  try{if(!localStorage.getItem('t1-before-workspace-cases'))localStorage.setItem('t1-before-workspace-cases',JSON.stringify(DB));}catch{}
  const now=new Date().toISOString().slice(0,10),day=n=>date(now,n);DB.factThrough=day(-1);DB.factFrom=day(-30);DB.caseDate=now;
  const seed=(id,name,mode,status,from,to,crStatus='active')=>{
   const c={id:'W-C'+id,scenario:'workspace',name,alias:name,mode,status,start:day(from),end:day(to),period:`${day(from)} 至 ${day(to)}`,fmt:mode==='cpd'?'splashimg':'feed',model:mode==='cpd'?'CPD':'CPM',placement:mode==='cpd'?'T1 News · 首页开屏':'App / Web 信息流',inv:mode==='cpd'?['app']:['app','web'],geo:['德国','法国'],totalBudget:50000,budget:50000,spend:0,imps:0,clicks:0,operator:'Linda Zhao',order:'CPD-202609-'+id,owner:'Amy Chen'};
   const g={id:'W-G'+id,camp:c.id,scenario:'workspace',name:mode==='cpd'?'首页开屏｜全天':'欧洲市场｜兴趣人群',status:'active',start:c.start,end:c.end,format:c.fmt,bidType:c.model,bid:2.5,budget:50000,inventory:c.placement,geo:'德国、法国',device:'不限',managedBy:'Linda Zhao',contractAmount:18000,contractNo:c.order,schedule:c.period};
   DB.campaigns.push(c);DB.adGroups.push(g);
   if(crStatus){const a={id:'W-A'+id,camp:c.id,groupId:g.id,group:g.name,scenario:'workspace',name:name+'｜主视觉',status:crStatus,fmt:c.fmt,kind:'image',assetId:mode==='cpd'?'F-CPD-V1':'F-1',size:mode==='cpd'?'1080×1920':'1200×628',headline:'发现秋季新品',description:'探索适合你的产品与服务',cta:'了解更多',landing:'https://example.com/autumn',created:c.start,version:1,imps:0,clicks:0};if(crStatus==='rejected')a.rejectReason='素材优惠文案与落地页不一致，请核对后重新提交。';DB.creatives.push(a);}
   return c;
  };
  seed(1,'欧洲秋季拉新','rtb','active',-25,20);
  seed(2,'品牌焕新开屏','cpd','active',-15,10);
  seed(3,'周末促销获客','rtb','active',-20,10).budgetExhausted=true;
  seed(4,'新品上市推广','cpd','active',-2,12,'rejected');
  seed(5,'巴西市场首发','rtb','active',1,15,null);
  seed(6,'国庆品牌预约','cpd','active',3,10);
  seed(7,'会员权益推广','cpd','active',-14,2);
  seed(8,'老客召回','rtb','paused',-22,8).stoppedAt=day(-3);
  seed(9,'夏末清仓活动','rtb','archived',-25,-2).stoppedAt=day(-2);
  seed(10,'新游预约','rtb','active',0,15,'review');
  const delayed=seed(11,'资讯频道品牌推广','cpd','active',-12,7);delayed.syncStatus='failed';delayed.issueReason='投放状态暂未更新，平台正在核查；请勿据此判断已停投。';
  seed(12,'家居新品探索','rtb','active',-1,20).noFacts=true;
  seed(13,'小预算素材试投','rtb','active',-1,5).smallSample=true;
  const base=DB.creatives.find(a=>a.id==='W-A1');DB.creatives.push({...base,id:'W-A1B',name:'欧洲秋季拉新｜场景图B',assetId:'F-2'});
  const g=DB.adGroups.find(g=>g.id==='W-G1');DB.adGroups.push({...g,id:'W-G1B',name:'欧洲市场｜广泛人群'});DB.creatives.push({...base,id:'W-A1C',groupId:'W-G1B',group:'欧洲市场｜广泛人群',name:'欧洲秋季拉新｜产品图C'});
  const v=DB.creatives.find(a=>a.id==='W-A2');v.pendingVersion={...v,version:2,assetId:'F-CPD-V2',headline:'全新品牌视觉',status:'review',submittedAt:now+'T00:40:00Z'};v.changeStatus='review';
  DB.recharges.push({id:'W-R1',date:now+' 01:20',amount:2000,method:'USDT',network:'TRC20',status:'pending',reviewOpinion:'已收到凭证，正在核验',reviewTime:'—'}, {id:'W-R2',date:day(-25)+' 09:20',amount:5000,method:'USDT',network:'TRC20',status:'approved',reviewOpinion:'款项已到账',reviewTime:day(-25)+' 10:00'}, {id:'W-R3',date:day(-1)+' 09:20',amount:1500,method:'USDT',network:'TRC20',status:'rejected',reviewOpinion:'凭证金额与申请金额不一致，请核对后重新申请',reviewTime:day(-1)+' 11:00'});
  // Facts represent disjoint delivery slices, never allocated from selected targeting settings.
  DB.deliveryFacts=[];
  for(const [ai,a] of DB.creatives.entries()){
   const c=DB.campaigns.find(c=>c.id===a.camp),g=DB.adGroups.find(g=>g.id===a.groupId);if(!c||!g||c.noFacts||['review','rejected','draft'].includes(a.status))continue;
   for(let n=-30;n<=-1;n++){const d=day(n);if(d<c.start||c.end&&d>c.end||c.stoppedAt&&d>=c.stoppedAt||c.status==='paused'&&!c.stoppedAt||c.status==='archived'&&!c.stoppedAt)continue;if(c.syncStatus==='failed'&&n===-1)continue;
    const slotName=g.inventory||c.placement,slotId='SL-CPD-'+Array.from(slotName||'').reduce((h,ch)=>(h*31+ch.charCodeAt(0))>>>0,0).toString(16);const slices=c.mode==='cpd'?[[slotId,slotName,'中国']]:[(c.inv||[]).includes('app')?['SL-02','T1 News · 信息流','德国']:['SL-03','T1 Web · 信息流','德国'],(c.inv||[]).includes('h5')?['SL-05','T1 H5 · 信息流','法国']:['SL-03','T1 Web · 信息流','法国'],['SL-04','合作媒体 · 信息流','未知地区']];
    slices.forEach(([slot,slotName,country],si)=>{const imps=c.smallSample?40:1600+(ai+1)*173+(n+31)*47+si*191,clicks=c.smallSample?0:Math.floor(imps*(.004+(ai%4)*.0018+si*.0007));DB.deliveryFacts.push({date:d,camp:c.id,group:g.id,creative:a.id,slot,slotName,country,mode:c.mode,imps,clicks,cents:c.mode==='rtb'?Math.round(imps*(.19+si*.03)):null});});
   }
  }
  for(const list of [DB.campaigns,DB.adGroups,DB.creatives])for(const o of list){const key=list===DB.campaigns?'camp':list===DB.adGroups?'group':'creative',r=DB.deliveryFacts.filter(r=>r[key]===o.id);o.imps=r.reduce((s,x)=>s+x.imps,0);o.clicks=r.reduce((s,x)=>s+x.clicks,0);o.ctr=o.imps?Number((o.clicks/o.imps*100).toFixed(2)):0;o.spend=r.reduce((s,x)=>s+(x.cents||0),0)/100;if(o.budgetExhausted)o.totalBudget=o.budget=o.spend;}
  DB.balance=380;
  const spentCents=DB.deliveryFacts.reduce((s,r)=>s+(r.cents||0),0),opening=(spentCents+38000-500000)/100;
  DB.txns=DB.txns.filter(t=>!['TX-4001','TX-4002'].includes(t.id));
  DB.txns.push({id:'W-T0',date:DB.factFrom,type:'期初余额',method:'上一周期余额结转（非充值）',amount:opening},{id:'W-T1',date:day(-25),type:'充值',method:'W-R2 · USDT · TRC20',amount:5000});
  for(let n=-30;n<=-1;n++){const d=day(n),cents=DB.deliveryFacts.filter(r=>r.date===d).reduce((s,r)=>s+(r.cents||0),0);if(cents)DB.txns.push({id:'W-TD'+n,date:d,type:'消耗',method:'RTB当日投放消耗',amount:-cents/100});}

  const events=[
   ['delivery','创意首次审核中','新游预约已提交，当前没有生效版本。','creative','W-A10',0,10],
   ['delivery','创意审核通过','家居新品探索已通过审核，实际曝光以报表为准。','creative','W-A12',0,20],
   ['delivery','创意审核驳回','新品上市推广：优惠文案与落地页不一致。','creative','W-A4',0,30],
   ['delivery','创意新版本审核中','品牌焕新开屏V2审核中，V1保持生效。','creative','W-A2',0,40],
   ['delivery','创意新版本曾被驳回','品牌焕新开屏已根据意见修改，当前新版本重新审核中。','creative','W-A2',-1,0],
   ['delivery','创意版本已生效','欧洲秋季拉新主视觉已通过审核并生效。','creative','W-A1',-2,0],
   ['delivery','计划总预算已用完','周末促销获客需要调整预算后才能恢复符合条件的投放。','plan','W-C3',0,50],
   ['delivery','计划即将开始，尚无创意','巴西市场首发将在明天开始，请补充创意。','plan','W-C5',0,60],
   ['delivery','计划即将结束','会员权益推广将在两天后结束。','plan','W-C7',-1,10],
   ['delivery','计划已归档','夏末清仓活动已归档，历史数据仍纳入报表。','report','W-C9',-2,10],
   ['finance','充值申请处理中','2,000.00美元充值凭证正在核验。','recharge','W-R1',0,70],
   ['finance','充值审核通过并到账','5,000.00美元已入账。','recharge','W-R2',-25,20],
   ['finance','充值申请被驳回','1,500.00美元申请金额与凭证不一致。','recharge','W-R3',-1,20],
   ['finance','账户余额需关注','当前余额较低，请结合近期消耗安排充值。','billing','',0,80],
   ['finance','账户余额不足已解除','此前余额不足已在充值到账后解除；请以当前余额为准。','billing','',-30,30],
   ['service','广告主绑定成功','账户已绑定星海互动，可以开始投放。','settings','basic',-5,0],
   ['service','开户资料补充已完成','此前缺少行业信息的申请已补充并通过核验。','settings','basic',-6,0],
   ['service','成员权限已调整','Amy Chen的权限已调整为投放成员。','settings','accounts',-1,30],
   ['service','部分报表数据延迟','资讯频道品牌推广昨日数据尚未完整更新，汇总不完整。','report','W-C11',0,90],
   ['service','历史数据延迟已恢复','此前的统计延迟已恢复，可重新查看对应报表。','report','W-C1',-3,0],
   ['service','充值服务维护安排','明日02:00—02:30 UTC充值审核可能延迟，既有广告投放不受影响。','notice','',0,100]
  ];
  DB.notifications=events.map((x,i)=>({id:9000+i,category:x[0],type:x[0]==='delivery'?'audit':x[0]==='finance'?'finance':'system',title:x[1],desc:x[2],target:x[3],ref:x[4],at:day(x[5])+'T'+String(Math.floor(x[6]/60)).padStart(2,'0')+':'+String(x[6]%60).padStart(2,'0')+':00Z',time:day(x[5]),read:x[5]<-1})).concat(DB.notifications.filter(n=>n.id!==1&&n.id!==2));
  DB.workspaceCases=2;this.save();
 };
})();
