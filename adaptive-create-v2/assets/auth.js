(function(){
  var SESSION_KEY='54ads_session_dsp';
  var PROFILE_KEY='t1_demo_profile';
  var APPLICATION_KEY='t1_advertiser_application';

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
      var name=value('registerName'), email=value('registerEmail'), pwd=value('registerPassword'), pwd2=value('registerPassword2');
      if(!name||!email||!pwd||!pwd2){ error('registerError','请完整填写注册信息'); return; }
      if(!validEmail(email)){ error('registerError','请输入有效的邮箱地址'); return; }
      if(pwd.length<6){ error('registerError','密码至少需要 6 位'); return; }
      if(pwd!==pwd2){ error('registerError','两次输入的密码不一致'); return; }
      localStorage.setItem(PROFILE_KEY,JSON.stringify({name:name,email:email,advertiserBound:false}));
      localStorage.setItem(SESSION_KEY,name);
      error('registerError','');
      location.replace('dsp.html?welcome=1');
    },
    previewState:function(state){
      var profile={name:'评审用户',email:'review@t1.demo',advertiserBound:state==='empty'||state==='active'};
      localStorage.setItem(PROFILE_KEY,JSON.stringify(profile)); localStorage.setItem(SESSION_KEY,profile.name); localStorage.removeItem(APPLICATION_KEY);
      if(state==='pending') localStorage.setItem(APPLICATION_KEY,JSON.stringify({type:'create',advertiser:'星海互动',status:'pending'}));
      if(state==='rejected') localStorage.setItem(APPLICATION_KEY,JSON.stringify({type:'create',advertiser:'星海互动',status:'rejected',rejectReason:'运营未能确认本次申请与目标广告主的关系'}));
      location.href='dsp.html?preview=1&state='+encodeURIComponent(state);
    },
    apply:function(){
      var advertiser=value('advertiserName'), industry=value('advertiserIndustry'), phone=value('advertiserPhone');
      if(!advertiser||!industry||!phone){ error('applicationError','请填写广告主名称、所属行业和联系电话'); return; }
      var profile=JSON.parse(localStorage.getItem(PROFILE_KEY)||'{}');
      localStorage.setItem(APPLICATION_KEY,JSON.stringify({
        advertiser:advertiser,industry:industry,sales:value('advertiserSales')||'待运营确认',phone:phone,
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

  var requested=(location.hash||'').slice(1);
  if(['register','forgot','application','pending'].indexOf(requested)>=0) Auth.show(requested);
})();
