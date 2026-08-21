/* ===================================================================
   登录态守卫 + 退出登录  ·  SSP / DSP 控制台共用
   未登录直接跳回登录页；已登录则填充账号名并注入退出按钮
   =================================================================== */
(function(){
  var path = location.pathname.toLowerCase();
  var role = path.indexOf('admin') >= 0 ? 'admin'
           : path.indexOf('ops')   >= 0 ? 'ops'
           : path.indexOf('dsp')   >= 0 ? 'dsp'
           : 'ssp';
  var SKEY = '54ads_session_' + role;
  var acct = localStorage.getItem(SKEY);
  var demoBypass = new URLSearchParams(location.search).get('demo') === '1';

  if(demoBypass && !acct){
    acct = 'T1 演示账号';
    localStorage.setItem(SKEY, acct);
  }

  // 登录页、方案对比页可公开访问；广告主控制台需要登录态。
  if(!acct && path.indexOf('login')<0 && path.indexOf('compare')<0){
    location.replace('login.html?app=' + role);
    return;
  }
  acct = acct || 'T1 Demo 广告主';

  window.SESSION = { role: role, account: acct };
  window.logout = function(){
    localStorage.removeItem(SKEY);
    location.replace('login.html?app=' + role);
  };

  function enhance(){
    // 用登录账号替换侧边栏用户名，并移除 ID 小字
    var nameEl = document.querySelector('.user-card .meta b');
    if(nameEl) nameEl.textContent = acct;
    var sub = document.querySelector('.user-card .meta small');
    if(sub) sub.remove();

    // 退出按钮注入侧边栏用户卡片（账号头像旁）
    var card = document.querySelector('.user-card');
    if(card && !card.querySelector('[data-logout]')){
      var b = document.createElement('button');
      b.className = 'icon-btn';
      b.title = '退出登录';
      b.setAttribute('data-logout','');
      b.style.marginLeft = 'auto';
      b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>';
      b.onclick = window.logout;
      card.appendChild(b);
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enhance);
  else enhance();
})();
