// 実行するソースは同一オリジン権限を持たないsandbox iframe内で動く。
const safeJSON=v=>JSON.stringify(v).replace(/</g,'\\u003c');
export function runProject(frame,files,test='',run=0){
const html=files['index.html']||'<div id="app"></div>';
const clean=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<link[^>]+(?:href=["']style.css["'])[^>]*>/gi,'');
const boot=`
const files=${safeJSON(files)};const run=${run};
const send=(type,data={})=>parent.postMessage({scope:'quest-runner',type,run,...data},'*');
const output=(...args)=>send('log',{message:args.map(v=>typeof v==='string'?v:JSON.stringify(v)).join(' ')});
console.log=output;console.warn=output;console.error=output;
addEventListener('error',e=>send('error',{message:e.message+' ('+(e.lineno||'?')+')'}));
addEventListener('unhandledrejection',e=>send('error',{message:e.reason?.message||String(e.reason)}));
const urls={},loading=new Set();
async function load(path){if(!path.startsWith('./')&&!path.endsWith('.js')&&!path.endsWith('.json'))return import(path);if(path.startsWith('./'))path=path.slice(2);if(urls[path])return import(urls[path]);if(!(path in files))throw Error('ファイルがありません: '+path);if(loading.has(path))throw Error('循環したimportです: '+path);loading.add(path);let source=files[path];const refs=[...source.matchAll(/(?:from\\s*|import\\s*)['"](\\.\\/[^'"]+)['"]/g)];for(const m of refs){const dep=m[1].slice(2);await prepare(dep);source=source.replaceAll(m[1],urls[dep])}const url=URL.createObjectURL(new Blob([source+'\\n//# sourceURL='+path],{type:'text/javascript'}));urls[path]=url;loading.delete(path);return import(url)}
async function prepare(path){if(urls[path])return;if(loading.has(path))throw Error('循環したimport: '+path);if(!(path in files))throw Error('ファイルがありません: '+path);loading.add(path);let source=files[path];for(const m of [...source.matchAll(/(?:from\\s*|import\\s*)['"](\\.\\/[^'"]+)['"]/g)]){const dep=m[1].slice(2);await prepare(dep);source=source.replaceAll(m[1],urls[dep])}urls[path]=URL.createObjectURL(new Blob([source+'\\n//# sourceURL='+path],{type:'text/javascript'}));loading.delete(path)}
const memory=Object.create(null);Object.assign(memory,${safeJSON(JSON.parse(localStorage.getItem('quest-preview-storage')||'{}'))});try{Object.defineProperty(globalThis,'localStorage',{value:{getItem:k=>memory[k]??null,setItem:(k,v)=>{memory[k]=String(v);send('storage',{values:memory})},removeItem:k=>{delete memory[k];send('storage',{values:memory})},clear:()=>{for(const k of Object.keys(memory))delete memory[k];send('storage',{values:memory})}},configurable:true})}catch{}
const tests=[];function assert(condition,message){tests.push({ok:!!condition,message});if(!condition)throw Error(message)}
try{await load('app.js');send('rendered');${test?`await new Promise(r=>setTimeout(r,40));await (async()=>{${test}\n})();send('result',{ok:true,tests});`:''}}catch(error){send(${test?"'result'":"'error'"},{ok:false,tests,message:error.message,stack:String(error.stack||'').slice(0,1500)})}
`;
frame.srcdoc=clean.replace('</head>','<style>'+String(files['style.css']||'').replace(/<\/style/gi,'<\\/style')+'</style></head>')+`<script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/"}}</script><script type="module">${boot.replace(/<\/script/gi,'<\\/script')}</script>`;
}
