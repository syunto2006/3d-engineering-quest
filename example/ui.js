// このファイルに機能を積み上げる

import * as THREE from 'three';
export function byId(id) {
  return document.getElementById(id);
}

export function renderPartList(container, parts, onSelect) {
  container.replaceChildren();
  for(const part of parts){
    const button=document.createElement('button');
    button.textContent=part.name;
    button.addEventListener('click',()=>onSelect(part.id));
    container.appendChild(button);
  }
}

export function setOpacity(mesh, value) {
  const alpha=Math.min(1,Math.max(0,Number(value)));
  mesh.material.transparent=alpha<1;
  mesh.material.opacity=alpha;
  mesh.material.depthWrite=alpha===1;
  mesh.material.needsUpdate=true;
}

export function setVisible(mesh, value) {
  mesh.visible=Boolean(value);
}

export function setColor(mesh, value) {
  mesh.material.color.set(value);
}

export function pointerNDC(event, rect) {
  return new THREE.Vector2(
    (event.clientX-rect.left)/rect.width*2-1,
    -((event.clientY-rect.top)/rect.height)*2+1
  );
}

export function pickPart(event, canvas, camera, parts) {
  const raycaster=new THREE.Raycaster();
  raycaster.setFromCamera(pointerNDC(event,canvas.getBoundingClientRect()),camera);
  const meshes=parts.filter(p=>p.mesh && p.mesh.visible).map(p=>p.mesh);
  const hit=raycaster.intersectObjects(meshes,false)[0];
  return hit ? parts.find(p=>p.mesh===hit.object) || null : null;
}

export function bindClick(element, callback) {
  if(!element) throw new Error('ボタンが見つかりません');
  element.addEventListener('click',callback);
  return () => element.removeEventListener('click',callback);
}
