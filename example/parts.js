// このファイルに機能を積み上げる

import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
export function parseSTL(buffer) {
  const geometry = new STLLoader().parse(buffer);
  const a = geometry.getAttribute('position');
  if (!a || a.count < 3) throw new Error('STLの三角形がありません');
  for (let i=0;i<a.array.length;i++) if (!Number.isFinite(a.array[i])) throw new Error('座標が不正です');
  return geometry;
}

export function centerGeometry(geometry) {
  geometry.center();
  return geometry;
}

export function setPosition(mesh, x, y, z) {
  mesh.position.set(x, y, z);
  return mesh;
}

export function radians(degrees) {
  return degrees * Math.PI / 180;
}

export function setRotation(mesh, x, y, z) {
  mesh.rotation.set(radians(x), radians(y), radians(z));
  return mesh;
}

export function boundsOf(mesh) {
  mesh.updateMatrixWorld(true);
  return new THREE.Box3().setFromObject(mesh);
}

export async function loadFiles(fileList) {
  const list=Array.from(fileList);
  if(list.length>30) throw new Error('30部品までです');
  const result=[];
  for(const file of list){
    if(!/\.stl$/i.test(file.name)) throw new Error('STL形式を選んでください');
    if(file.size>20*1024*1024) throw new Error('1ファイル20MBまでです');
    const source=await file.arrayBuffer();
    const geometry=parseSTL(source);
    result.push({name:file.name.replace(/\.stl$/i,''),geometry,source});
  }
  return result;
}

export function makeSampleParts() {
  const body=new THREE.BoxGeometry(100,100,100);
  const board=new THREE.BoxGeometry(70,4,70);
  const lid=new THREE.BoxGeometry(100,4,100);
  return [{name:'本体',geometry:body,position:[0,0,0]},{name:'基板',geometry:board,position:[0,0,0]},{name:'ふた',geometry:lid,position:[0,55,0]}];
}
