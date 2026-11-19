// このファイルに機能を積み上げる

export function initialState() {
  return { parts: [], steps: [], selectedId: null, screen: 'home' };
}

export function makePartRecord(id, name) {
  return { id, name, color: '#55c6d9', opacity: 1, visible: true, position: [0,0,0], rotation: [0,0,0] };
}

export function renameRecord(record, name) {
  return { ...record, name: name.trim() || record.name };
}

export function setSelected(state, id) {
  return { ...state, selectedId: id };
}

export function setScreen(state, screen) {
  if (!['home', 'workshop'].includes(screen)) throw new Error('不明な画面です');
  return { ...state, screen };
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function messageFor(count) {
  return count === 0 ? 'STLを登録してください' : count + '個の部品を読み込みました';
}

export function nextId(parts) {
  const numbers = parts.map(p => Number(String(p.id).replace('part-', '')) || 0);
  return 'part-' + (Math.max(0, ...numbers) + 1);
}
