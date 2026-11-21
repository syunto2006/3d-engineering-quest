// 第9章で実装します

export function modes() {
  return ['assembly', 'parts', 'mission', 'edit'];
}

export function visibleParts(parts, steps, index) {
  return parts.filter(part => {
    const first = steps.findIndex(step => step.partId === part.id);
    return part.visible !== false && first >= 0 && first <= index;
  }).map(part => part.id);
}

export function assemblyPose(part, steps, index, t) {
  const related = steps.map((step, i) => ({ step, i })).filter(item => item.step.partId === part.id);
  const first = related[0];
  if (!first || first.i > index) return { visible: false, position: [...part.position] };
  const active = related.find(item => item.i === index);
  const done = related.filter(item => item.i < index).at(-1);
  let position = [...(done ? done.step.to : part.position)];
  if (active) {
    const x = Math.min(1, Math.max(0, t));
    const ease = x*x*(3-2*x);
    position = active.step.from.map((value, j) => value + (active.step.to[j]-value)*ease);
  }
  return { visible: part.visible !== false, position };
}

export function explodePosition(position, index, amount) {
  let direction = [...position];
  let length = Math.hypot(...direction);
  if (length < 1) {
    direction = [Math.cos(index*2.4), 0.5, Math.sin(index*2.4)];
    length = Math.hypot(...direction);
  }
  return position.map((value, i) => value + direction[i]/length*amount);
}

export function partDescription(part) {
  const count = Number(part.count);
  return {
    name: String(part.name || '名称未設定'),
    role: String(part.role || '役割は未設定です'),
    material: String(part.material || '未設定'),
    count: Number.isFinite(count) && count > 0 ? Math.max(1, Math.floor(count)) : 1
  };
}

export function stepDetails(step) {
  return {
    title: String(step.title || '取り付け手順'),
    text: String(step.text || '部品を所定の位置へ取り付けます。'),
    fastening: String(step.fastening || '未設定'),
    tip: String(step.tip || ''),
    photo: typeof step.photo === 'string' ? step.photo : ''
  };
}

export function recommendedView(step, fallback) {
  const vector = value => Array.isArray(value) && value.length === 3 && value.every(Number.isFinite);
  const camera = step && step.camera;
  if (camera && vector(camera.position) && vector(camera.target)) {
    return { position: [...camera.position], target: [...camera.target] };
  }
  return fallback;
}

export function canNavigate(index, count, delta) {
  if (!Number.isInteger(index) || !Number.isInteger(count) || !Number.isInteger(delta)) return false;
  const next = index + delta;
  return count > 0 && index >= 0 && index < count && next >= 0 && next < count;
}
