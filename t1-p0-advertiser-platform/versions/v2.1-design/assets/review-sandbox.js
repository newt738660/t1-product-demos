/* Review-only storage namespace. Never overwrites the normal prototype's data. */
(()=>{if(new URLSearchParams(location.search).get('review')!=='1')return;
 const proto=Storage.prototype,get=proto.getItem,set=proto.setItem,remove=proto.removeItem;
 const owned=k=>/^(t1[-_]|54ads_session_dsp)/.test(String(k)),prefix='t1-scope-review:';
 window.T1_REVIEW=true;
 proto.getItem=function(k){return this===localStorage&&owned(k)?get.call(sessionStorage,prefix+k):get.call(this,k);};
 proto.setItem=function(k,v){return this===localStorage&&owned(k)?set.call(sessionStorage,prefix+k,v):set.call(this,k,v);};
 proto.removeItem=function(k){return this===localStorage&&owned(k)?remove.call(sessionStorage,prefix+k):remove.call(this,k);};
})();
