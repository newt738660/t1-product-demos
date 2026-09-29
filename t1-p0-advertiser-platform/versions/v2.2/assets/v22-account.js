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
