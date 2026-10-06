/* Review chrome only; this is not a T1 product feature or an account switcher. */
(()=>{
 const root=new URL('../',document.currentScript.src),review=new URLSearchParams(location.search).get('review')==='1';
 const ready=document.readyState==='loading'?new Promise(r=>document.addEventListener('DOMContentLoaded',r,{once:true})):Promise.resolve();
 if(!review)return;
 Promise.all([ready,fetch(new URL('versioning/versions.json',root),{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('版本目录加载失败');return r.json()})]).then(([,catalog])=>{
  const id=window.T1_DEMO_VERSION||catalog.rootAlias,current=catalog.versions.find(v=>v.id===id);if(!current)return;
  document.title=current.label+' · '+document.title;
  let panel=document.getElementById('scopeReviewTools');
  if(!panel){panel=document.createElement('details');panel.id='demoVersionTools';panel.className='demo-version-tools';const summary=document.createElement('summary');summary.textContent='演示工具 · 非产品功能';panel.append(summary);document.body.append(panel)}
  const style=document.createElement('style');style.textContent='.demo-version-field{display:flex;flex-direction:column;gap:6px;margin:10px 0;font:12px/1.5 "PingFang SC",sans-serif;color:var(--text-2,#5b6b80)}.demo-version-field select{width:100%;min-height:34px;padding:6px 8px;border:1px solid var(--border,#e9edf2);border-radius:6px;background:var(--surface,#fff);color:var(--text,#0f1b2d);font:inherit}.demo-version-note{font:11px/1.6 "PingFang SC",sans-serif;color:var(--text-3,#94a3b5);margin:6px 0}.demo-version-tools{position:fixed;left:16px;bottom:16px;width:min(250px,calc(100vw - 32px));padding:12px;background:var(--surface,#fff);border:1px solid var(--border,#e9edf2);border-radius:10px;z-index:100;font:12px/1.5 sans-serif}.demo-version-tools summary{cursor:pointer}.scope-review-tools>summary{font-size:11px}';document.head.append(style);
  const label=document.createElement('label');label.className='demo-version-field';label.textContent='Demo版本（非产品功能）';const select=document.createElement('select');select.id='demoVersionSelect';select.setAttribute('aria-label','Demo版本');for(const v of catalog.versions){const option=document.createElement('option');option.value=v.id;option.textContent=v.label;option.selected=v.id===id;select.append(option)}label.append(select);
  const note=document.createElement('p');note.id='demoVersionNote';note.className='demo-version-note';note.textContent=current.note;
  panel.querySelector('summary').textContent='演示工具 · '+(id==='v2.2'?'V2.2开发稿':id==='v2.1-design'?'V2.1设计对接稿':'冻结评审基线');
  const summary=panel.querySelector('summary');summary.after(label,note);
  // Replace only the outdated scope explanation in reviewer chrome, never app content.
  for(const p of panel.querySelectorAll(':scope > p'))if(p.textContent.startsWith('当前范围：'))p.textContent='版本范围以评审清单为准；下方选择器仅用于切换样例状态。';
  select.addEventListener('change',()=>{
   const target=catalog.versions.find(v=>v.id===select.value);if(!target||target.id===id)return;
   const dirty=typeof App!=='undefined'&&(App.ufInitialDirty||App.ufWorking||App.editFlow);
   if(dirty&&!confirm('切换Demo版本会离开当前页面，尚未提交的编辑不会保存。是否继续？')){select.value=id;return}
   const page=location.pathname.endsWith('/login.html')?'login.html':'dsp.html',url=new URL(target.path+page,root);url.searchParams.set('review','1');if(page==='dsp.html')url.searchParams.set('demo','1');location.assign(url.href);
  });
 }).catch(error=>{console.error('Demo version selector:',error.message)});
})();
