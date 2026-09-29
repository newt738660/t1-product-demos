/* Demo-only persistence boundary. Must execute before session/review/app scripts. */
(()=>{
 const match=location.pathname.match(/\/versions\/([a-z0-9.-]+)\//i);if(!match)return;
 const prefix='t1-demo-version:'+match[1]+':',proto=Storage.prototype;
 const original={get:proto.getItem,set:proto.setItem,remove:proto.removeItem,key:proto.key,length:Object.getOwnPropertyDescriptor(proto,'length').get};
 const keys=storage=>{const list=[];for(let i=0;i<original.length.call(storage);i++){const key=original.key.call(storage,i);if(key.startsWith(prefix))list.push(key)}return list};
 proto.getItem=function(k){return original.get.call(this,prefix+String(k))};
 proto.setItem=function(k,v){return original.set.call(this,prefix+String(k),v)};
 proto.removeItem=function(k){return original.remove.call(this,prefix+String(k))};
 proto.key=function(i){return keys(this)[Number(i)>>>0]?.slice(prefix.length)||null};
 proto.clear=function(){for(const k of keys(this))original.remove.call(this,k)};
 Object.defineProperty(proto,'length',{configurable:true,enumerable:true,get(){return keys(this).length}});
 window.T1_DEMO_VERSION=match[1];
})();
