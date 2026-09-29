/* Decorative DOM adaptation only. No changes to business actions or data. */
(()=>{
 if(typeof App!=='undefined'){
  const draw=App.mkChart;
  App.mkChart=function(id,type,data,opts={}){
   const style=getComputedStyle(document.body),scales={};
   if(type==='line'||type==='bar')for(const axis of ['x','y']){
    const original=opts.scales?.[axis]||{};
    scales[axis]={...original,grid:{color:style.getPropertyValue('--border').trim(),...(axis==='x'?{display:false}:{}),...original.grid},ticks:{color:style.getPropertyValue('--text-2').trim(),font:{size:11},...original.ticks}};
   }
   return draw.call(this,id,type,data,{...opts,...(Object.keys(scales).length?{scales:{...opts.scales,...scales}}:{})});
  };
 }
 const logo='<img class="t1-brand-logo" src="assets/t1-logo.svg" alt="T1 广告投放平台" width="60" height="46">';
 function mount(){
  const brand=document.querySelector('.sidebar .brand');
  if(brand)brand.innerHTML=logo;
  const auth=document.querySelector('.auth-logo');
  if(auth){auth.innerHTML=logo;const corner=document.createElement('img');corner.src='assets/t1-logo.svg';corner.alt='T1';corner.className='auth-corner-brand';document.body.append(corner);}
  const title=document.querySelector('#auth-login .auth-head h1');if(title)title.textContent='欢迎来到 T1 Ads';
  const icons=['<path d="m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 10 9-5M3 8l9 5v9"/>','<ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)"/>','<rect x="9" y="2" width="6" height="6" rx="1"/><path d="M12 8v5M5 16v-3h14v3"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/>'];
  document.querySelectorAll('.auth-points li').forEach((li,i)=>li.insertAdjacentHTML('afterbegin',`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${icons[i]}</svg>`));
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
