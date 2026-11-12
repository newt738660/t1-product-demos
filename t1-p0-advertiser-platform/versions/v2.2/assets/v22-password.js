/* Local Mock only: use synthetic passwords. Digest is not production authentication. */
(()=>{
 'use strict';
 const S=V22Account, key='t1-v22-demo-credential';
 const credential=()=>{try{return JSON.parse(localStorage.getItem(key))||null}catch{return null}};
 const digest=async value=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))).map(x=>x.toString(16).padStart(2,'0')).join('');
 S.checkDemoPassword=async value=>credential()?credential().digest===await digest(value):value==='Demo2026!';
 const valid=value=>value.length>=8&&value.length<=64&&/[a-z]/i.test(value)&&/[0-9]/.test(value);
 const save=async value=>{
   const data={digest:await digest(value),revision:Date.now()+'-'+Math.random()};
   S.update({pendingVerification:null,emailPending:false,recovery:null,passwordResetAt:Date.now()});
   const authKey='t1-v22-auth-state';
   const auth=JSON.parse(localStorage.getItem(authKey)||'{}');
   delete auth.reset;localStorage.setItem(authKey,JSON.stringify(auth));
   localStorage.removeItem('54ads_session_dsp');
   localStorage.setItem(key,JSON.stringify(data));
 };
 if(window.Auth){
   const login=Auth.login;
   Auth.login=async function(){
     const password=document.getElementById('loginPassword').value;
     if(credential()&&!(await S.checkDemoPassword(password))){document.getElementById('loginError').textContent='邮箱或密码不正确';return}
     return login.call(this);
   };
   const finish=Auth.v22Finish;
   Auth.v22Finish=async function(){
     const value=document.getElementById('v22Password')?.value||'',confirm=document.getElementById('v22Password2')?.value||'';
     const r=V22AuthState.read().reset;
     if(!r||V22AuthState.status('reset',r.mail)!=='authorized')return finish.call(this);
     if(!valid(value)||value!==confirm){document.getElementById('v22AuthError').textContent='新密码需为8—64位，包含字母和数字，且两次输入一致';return}
     finish.call(this);
     if(V22AuthState.read().reset?.status==='complete'){
       const completed=V22AuthState.read().reset;
       await save(value);V22AuthState.update({reset:completed});
     }
   };
   document.querySelector('#authReviewTools p')?.replaceChildren(document.createTextNode('仅使用虚构信息。此原型不发送真实邮件；修改后的演示密码只在当前浏览器中校验，不保存明文，不能用于真实账号认证。'));
 }
 if(typeof App==='undefined')return;
 const A=App,B=A.workspace.button;
 const err=t=>{const el=document.getElementById('v22PasswordError');if(el)el.textContent=t};
 const modal=(title,body,footer)=>A.modal(`<div class="modal-head"><h3>${title}</h3>${B('关闭','App.closeModal()')}</div><div class="modal-body">${body}<div class="v22-error" id="v22PasswordError" role="alert"></div></div><div class="modal-foot">${footer}</div>`,true);
 let saving=false,logoutPending=false;
 const close=A.closeModal;A.closeModal=function(){if(logoutPending){location.href=S.url('login');return}close.call(this)};
 A.v22ChangePassword=function(){
   if(credential()&&!localStorage.getItem('54ads_session_dsp')){location.href=S.url('login');return}
   modal('修改密码',`<p>输入当前密码确认身份。新密码需为8—64位，至少包含字母和数字，允许符号。</p><label class="v22-field">当前密码<input class="input" type="password" id="v22ChangeCurrent" autocomplete="current-password"></label><label class="v22-field">新密码<input class="input" type="password" id="v22ChangeNew" autocomplete="new-password"></label><label class="v22-field">确认新密码<input class="input" type="password" id="v22ChangeConfirm" autocomplete="new-password"></label>${B('忘记当前密码？','App.v22ForgotCurrentPassword()')}<p>修改成功后，所有设备需重新登录。</p>`,B('取消','App.closeModal()')+B('保存修改','App.v22SavePassword()','btn btn-primary'));
 };
 A.v22ForgotCurrentPassword=function(){
   if(S.read().verified){location.href=S.url('forgot');return}
   modal('暂时无法自助找回密码','<p>当前邮箱尚未验证，暂不支持邮件找回密码。修改密码或更正邮箱需要先确认当前密码。</p>',B('返回修改密码','App.v22ChangePassword()'));
 };
 A.v22SavePassword=async function(){
   if(saving)return;
   const old=document.getElementById('v22ChangeCurrent')?.value||'',value=document.getElementById('v22ChangeNew')?.value||'',confirm=document.getElementById('v22ChangeConfirm')?.value||'';
   if(!old||!value||!confirm)return err('请填写当前密码、新密码和确认新密码');
   if(!valid(value))return err('新密码需为8—64位，至少包含字母和数字');
   if(value!==confirm)return err('两次输入的新密码不一致');
   saving=true;
   try{
     if(!(await S.checkDemoPassword(old)))return err('当前密码不正确，请重新输入');
     if(A.demoPasswordSaveFails)return err('修改失败，请稍后重试，原密码仍然有效');
     await save(value);logoutPending=true;
     modal('密码修改成功','<p>请使用新密码重新登录，原账号的广告主关联和业务数据保留。</p>',B('重新登录','App.v22PasswordLogin()','btn btn-primary'));
   }catch{err('修改失败，请稍后重试')}finally{saving=false}
 };
 A.v22PasswordLogin=()=>{location.href=S.url('login')};
 addEventListener('storage',e=>{if(e.key?.endsWith(key)&&e.newValue!==e.oldValue)location.href=S.url('login')});
 const init=A.init;A.init=function(){if(credential()&&!localStorage.getItem('54ads_session_dsp')){location.href=S.url('login');return}init.call(this)};
 const tools=A.v22MountTools;A.v22MountTools=function(){tools.call(this);const panel=document.getElementById('v22EmailTools');if(!panel||document.getElementById('v22PasswordTools'))return;panel.insertAdjacentHTML('beforeend',`<div id="v22PasswordTools"><p>修改密码仅使用虚构样例；初始密码见上方。改后请使用自己设置的演示密码，可在登录页通过模拟邮件重置。评审数据按标签页隔离，仅演示当前页退出，不执行真实多设备注销。</p><label>修改密码保存结果<select class="select" onchange="App.demoPasswordSaveFails=this.value==='fail'"><option value="ok">成功</option><option value="fail">失败</option></select></label></div>`)};
})();
