// このファイルに機能を積み上げる

export function serializeProject(project) {
  return JSON.stringify(project,null,2);
}

export function parseProject(text) {
  return JSON.parse(text);
}

export function downloadText(name, text) {
  const blob=new Blob([text],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=name;a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

export function saveLocal(key, value) {
  localStorage.setItem(key,JSON.stringify(value));
}

export function restoreLocal(key) {
  const text=localStorage.getItem(key);
  return text===null ? null : JSON.parse(text);
}

export function validateProject(project) {
  if(!project||project.version!==1||!Array.isArray(project.parts)||!Array.isArray(project.steps)||project.parts.length>30) return false;
  const ids=new Set();
  const vec=v=>Array.isArray(v)&&v.length===3&&v.every(Number.isFinite);
  for(const p of project.parts){
    if(!p||typeof p.id!=='string'||!p.id||ids.has(p.id)||typeof p.name!=='string'||!vec(p.position)||!vec(p.rotation)||!Number.isFinite(p.opacity)||p.opacity<0||p.opacity>1||typeof p.visible!=='boolean'||typeof p.color!=='string'||!/^#[0-9a-f]{6}$/i.test(p.color)) return false;
    ids.add(p.id);
  }
  return project.steps.every(s=>s&&ids.has(s.partId)&&vec(s.from)&&vec(s.to)&&Number.isFinite(s.duration)&&s.duration>0);
}

export function projectSummary(project) {
  return { parts: project.parts.length, steps: project.steps.length, ready: project.parts.length>0 && project.steps.length>0 };
}

export function makeReadme(title) {
  return '# '+title+'\n\nSTLを登録し、部品の位置・色・透明度と組立手順を編集するアプリです。\n\n## 起動\nGitHub PagesまたはローカルHTTPサーバーで開いてください。\n\n## 使い方\nSTLを複数選択→部品を編集→組立順を変更→再生→JSON保存。\n\n## 保存\nJSONと元STLを保管してください。ブラウザ内保存は端末間で自動同期されません。\n\n## 制約\nSTLは単位や正しい組立順を通常持ちません。このアプリではmmとし、利用者が位置・順番を確認します。\n';
}
