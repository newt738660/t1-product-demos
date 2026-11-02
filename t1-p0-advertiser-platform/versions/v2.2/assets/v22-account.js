/* Local prototype only. No email, credential, payment or identity service is contacted. */
(()=>{
 const key='t1-v22-account';
 window.V22Account={
  read(){try{return JSON.parse(localStorage.getItem(key))||{verified:true,legacy:false,recovery:null}}catch{return {verified:true,legacy:false,recovery:null}}},
  write(data){localStorage.setItem(key,JSON.stringify(data));return data},
  update(patch){return this.write({...this.read(),...patch})},
  email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  url(hash){return 'login.html?'+(window.T1_REVIEW?'review=1&':'')+'account=1#'+hash}
 };
})();
/* Mock first-verification state, never an authentication service. */
(()=>{
 const S=V22Account;
 S.profile=()=>{try{const p=JSON.parse(localStorage.getItem('t1_demo_profile'))||{advertiserBound:true};return {...p,email:p.email||'victor@example.com'}}catch{return {email:'victor@example.com',advertiserBound:true}}};
 S.linkStatus=function(id){if(!id)return 'invalid';const s=this.read(),p=s.pendingVerification;if(s.completedVerification===id)return 'complete';if(!p||p.id!==id||s.verified||p.original!==this.profile().email)return 'invalid';return p.expires<=Date.now()?'expired':'valid'};
 S.completeVerification=function(id){const status=this.linkStatus(id);if(status!=='valid')return status;const s=this.read(),p=s.pendingVerification,profile=this.profile();profile.email=p.email;localStorage.setItem('t1_demo_profile',JSON.stringify(profile));if(localStorage.getItem('54ads_session_dsp'))localStorage.setItem('54ads_session_dsp',p.email);this.update({verified:true,legacy:false,emailPending:false,recovery:null,pendingVerification:null,completedVerification:id,verifiedEmail:p.email});return 'complete'};
})();
