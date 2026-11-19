// このファイルに機能を積み上げる

import * as THREE from 'three';
export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#0c1727');
  return scene;
}

export function createCamera(aspect) {
  const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 5000);
  camera.position.set(220, 170, 260);
  camera.lookAt(0, 0, 0);
  return camera;
}

export function createRenderer(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  return renderer;
}

export function addLights(scene) {
  scene.add(new THREE.HemisphereLight(0xcceeff, 0x334455, 2));
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(100, 200, 150);
  scene.add(light);
}

export function createMaterial(color = '#55c6d9') {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.3 });
}

export function createMesh(geometry, material) {
  return new THREE.Mesh(geometry, material);
}

export function resizeView(renderer, camera, width, height) {
  const w = Math.max(1, width);
  const h = Math.max(1, height);
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

export function startLoop(renderer, scene, camera, update) {
  renderer.setAnimationLoop((time) => {
    if (update) update(time);
    renderer.render(scene, camera);
  });
}
