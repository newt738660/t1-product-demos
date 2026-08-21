/* ===================================================================
   共享主题控制：深色模式切换 + localStorage 持久化
   被 index / ssp / dsp 三个页面共用
   =================================================================== */
(function(){
  const KEY = 'ht-theme';

  /* ---------- 白标品牌：公司名 / Logo / 皮肤色 ---------- */
  function clamp(n){ return Math.max(0, Math.min(255, n)); }
  function shade(hex, pct){ // pct<0 变暗，pct>0 变亮
    const h = hex.replace('#',''); if(h.length<6) return hex;
    const r=parseInt(h.slice(0,2),16), g=parseInt(h.slice(2,4),16), b=parseInt(h.slice(4,6),16);
    const f = pct/100;
    const ch = c => clamp(Math.round(c + (pct<0 ? c*f : (255-c)*f)));
    return '#' + [ch(r),ch(g),ch(b)].map(c=>c.toString(16).padStart(2,'0')).join('');
  }
  function hexA(hex, a){
    const h = hex.replace('#',''); if(h.length<6) return hex;
    return `rgba(${parseInt(h.slice(0,2),16)},${parseInt(h.slice(2,4),16)},${parseInt(h.slice(4,6),16)},${a})`;
  }
  window.Branding = {
    shade, hexA,
    apply(p){
      if(!p) return;
      const bs = document.body.style;
      if(p.accent){
        bs.setProperty('--accent', p.accent);
        bs.setProperty('--accent-strong', shade(p.accent, -18));
        bs.setProperty('--accent-soft', hexA(p.accent, document.body.classList.contains('dark') ? .18 : .12));
      }
      const name = document.querySelector('.brand .name');
      if(name && name.childNodes[0] && p.company) name.childNodes[0].nodeValue = p.company;
      const logo = document.querySelector('.brand .logo');
      if(logo){
        if(p.logo) logo.innerHTML = `<img src="${p.logo}" alt="logo" style="width:100%;height:100%;object-fit:cover;border-radius:inherit">`;
        else if(logo.querySelector('img')) logo.innerHTML = '54';
      }
      if(p.lang) document.documentElement.lang = p.lang;
    }
  };

  const sun = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const moon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  // 先应用已保存的主题，避免闪烁
  if(localStorage.getItem(KEY) === 'dark') document.body.classList.add('dark');

  function isDark(){ return document.body.classList.contains('dark'); }
  function sync(){
    document.querySelectorAll('[data-theme-btn]').forEach(b => b.innerHTML = isDark()? sun : moon);
  }
  window.toggleTheme = function(){
    document.body.classList.toggle('dark');
    localStorage.setItem(KEY, isDark()? 'dark':'light');
    sync();
    // 主题切换后重绘图表以更新网格色
    if(window.App && App.cur && App['after_'+App.cur]) App['after_'+App.cur]();
  };

  function mount(){
    const bar = document.querySelector('.topbar');
    if(bar){
      const btn = document.createElement('button');
      btn.className = 'icon-btn';
      btn.title = '切换深色模式';
      btn.setAttribute('data-theme-btn','');
      btn.onclick = window.toggleTheme;
      const spacer = bar.querySelector('.spacer');
      bar.insertBefore(btn, spacer ? spacer.nextSibling : null);
    } else {
      // 门户页：右上角浮动按钮
      const btn = document.createElement('button');
      btn.className = 'icon-btn';
      btn.title = '切换深色模式';
      btn.setAttribute('data-theme-btn','');
      btn.style.cssText = 'position:fixed;top:22px;right:24px;background:var(--surface);border:1px solid var(--border);box-shadow:var(--shadow-sm);z-index:50';
      btn.onclick = window.toggleTheme;
      document.body.appendChild(btn);
    }
    sync();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
