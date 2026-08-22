(function(){
  var SESSION_KEY='54ads_session_dsp';
  var PROFILE_KEY='t1_demo_profile';
  var APPLICATION_KEY='t1_advertiser_application';
  var USED_INVITES_KEY='t1_demo_used_invites';

  function value(id){ return (document.getElementById(id).value||'').trim(); }
  function error(id,message,ok){ var el=document.getElementById(id); el.textContent=message||''; el.classList.toggle('ok',!!ok); }
  function validEmail(email){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }

  window.Auth={
    show:function(name){
      document.querySelectorAll('.auth-view').forEach(function(el){el.classList.remove('on');});
      document.getElementById('auth-'+name).classList.add('on');
      history.replaceState(null,'','#'+name);
    },
    login:function(){
      var account=value('loginAccount'), password=value('loginPassword');
      if(!account||!password){ error('loginError','请输入账号和密码'); return; }
      localStorage.setItem(SESSION_KEY,account);
      localStorage.setItem(PROFILE_KEY,JSON.stringify({name:account.indexOf('@')>0?account.split('@')[0]:account,email:account}));
      location.replace('dsp.html');
    },
    register:function(){
      var name=value('registerName'), email=value('registerEmail'), pwd=value('registerPassword'), pwd2=value('registerPassword2'), invite=value('registerInvite');
      if(!name||!email||!pwd||!pwd2){ error('registerError','请完整填写注册信息'); return; }
      if(!validEmail(email)){ error('registerError','请输入有效的邮箱地址'); return; }
      if(pwd.length<6){ error('registerError','密码至少需要 6 位'); return; }
      if(pwd!==pwd2){ error('registerError','两次输入的密码不一致'); return; }
      var used=[];try{used=JSON.parse(localStorage.getItem(USED_INVITES_KEY)||'[]');}catch(e){}
      if(invite&&used.indexOf(invite)>=0){ error('registerError','该邀请码已被使用，请联系商务获取新的邀请'); return; }
      localStorage.setItem(PROFILE_KEY,JSON.stringify({name:name,email:email,advertiserBound:false}));
      localStorage.setItem(SESSION_KEY,name);
      error('registerError','');
      if(invite){
        Auth.pendingInviteCode=invite;
        document.getElementById('registerInvitePreview').textContent=invite;
        Auth.show('invite-confirm');
        return;
      }
      location.replace('dsp.html?welcome=1');
    },
    confirmRegistrationInvite:function(){
      var code=Auth.pendingInviteCode||value('registerInvite');
      if(!code){ error('inviteConfirmError','邀请码不存在，请返回重新填写'); return; }
      var used=[];try{used=JSON.parse(localStorage.getItem(USED_INVITES_KEY)||'[]');}catch(e){}
      if(used.indexOf(code)>=0){ error('inviteConfirmError','该邀请码已被使用，请联系商务获取新的邀请'); return; }
      used.push(code);localStorage.setItem(USED_INVITES_KEY,JSON.stringify(used));
      var profile={};try{profile=JSON.parse(localStorage.getItem(PROFILE_KEY)||'{}');}catch(e){}
      profile.advertiserBound=true;profile.advertiserName='星海互动';profile.sspAdvertiserId='ADV-70285';
      localStorage.setItem(PROFILE_KEY,JSON.stringify(profile));localStorage.removeItem(APPLICATION_KEY);
      location.replace('dsp.html?welcome=1&invited=1');
    },
    previewState:function(state){
      var profile={name:'评审用户',email:'review@t1.demo',advertiserBound:state==='empty'||state==='active'};
      localStorage.setItem(PROFILE_KEY,JSON.stringify(profile)); localStorage.setItem(SESSION_KEY,profile.name); localStorage.removeItem(APPLICATION_KEY);
      if(state==='pending') localStorage.setItem(APPLICATION_KEY,JSON.stringify({type:'new',advertiser:'星海互动',status:'pending'}));
      if(state==='rejected') localStorage.setItem(APPLICATION_KEY,JSON.stringify({type:'bind',advertiser:'星海互动',status:'rejected',rejectReason:'现有信息不足以确认客户与目标广告主的关系'}));
      try{
        var store=JSON.parse(localStorage.getItem('t1-p0-demo-store')||'null');
        if(store&&store.data&&store.data.uiState){store.data.uiState.lastPage='dash';localStorage.setItem('t1-p0-demo-store',JSON.stringify(store));}
      }catch(e){}
      location.href='dsp.html?preview=1&state='+encodeURIComponent(state);
    },
    apply:function(){
      var intent=value('advertiserIntent'), advertiser=value('advertiserName'), phone=value('advertiserPhone');
      if(!intent||!phone){ error('applicationError','请选择你的情况并填写联系方式 / TG'); return; }
      var profile=JSON.parse(localStorage.getItem(PROFILE_KEY)||'{}');
      localStorage.setItem(APPLICATION_KEY,JSON.stringify({
        type:intent,advertiser:advertiser||'待商务确认',product:value('advertiserProduct'),inviteCode:value('advertiserInvite'),phone:phone,
        contact:profile.name||'',email:profile.email||'',status:'pending',submittedAt:new Date().toISOString()
      }));
      Auth.show('pending');
    },
    previewApproval:function(){
      var profile=JSON.parse(localStorage.getItem(PROFILE_KEY)||'{}');
      var application=JSON.parse(localStorage.getItem(APPLICATION_KEY)||'{}');
      application.status='approved'; localStorage.setItem(APPLICATION_KEY,JSON.stringify(application));
      localStorage.setItem(SESSION_KEY,profile.name||profile.email||'T1 Demo 广告主');
      location.replace('dsp.html');
    },
    forgot:function(){
      var email=value('forgotEmail');
      if(!validEmail(email)){ error('forgotError','请输入有效的注册邮箱'); return; }
      error('forgotError','重置链接已发送，请检查邮箱',true);
    }
  };

  var params=new URLSearchParams(location.search),linkedInvite=params.get('invite')||'';
  var requested=(location.hash||'').slice(1);
  if(['register','forgot','application','pending'].indexOf(requested)>=0) Auth.show(requested);
  if(linkedInvite){
    document.getElementById('registerInvite').value=linkedInvite;
    document.getElementById('registerInviteNote').textContent='邀请码已由商务注册链接自动填写；注册后请确认对应广告主。';
    Auth.show('register');
  }
})();
