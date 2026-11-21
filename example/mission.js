// 第10章で実装します

export function phaseList() {
  const titles = ['収納','放出','開傘・降下','着地','エンベロープ分離','スタビライザ展開','GNSS誘導','カメラ誘導'];
  const texts = [
    'キャリア内に機体を収納します。',
    '機体をキャリアから放出します。',
    'パラシュートを開き、降下します。',
    '着地して停止します。',
    '外側の保護材を分離します。',
    '姿勢を安定させる部材を展開します。',
    '位置情報を使った誘導の流れを模式表示します。',
    '画像を使った近距離の目標への接近を模式表示します。'
  ];
  return titles.map((title, i) => ({ title, text: texts[i], duration: 4 }));
}

export function phaseAt(phases, seconds) {
  if (!Array.isArray(phases) || phases.length === 0) return { index: 0, progress: 0 };
  const durations = phases.map(p => Math.max(0.001, Number(p.duration) || 4));
  const total = durations.reduce((sum, value) => sum + value, 0);
  let elapsed = Math.min(total, Math.max(0, Number(seconds) || 0));
  for (let i = 0; i < durations.length; i++) {
    if (elapsed < durations[i]) return { index: i, progress: elapsed/durations[i] };
    elapsed -= durations[i];
  }
  return { index: phases.length-1, progress: 1 };
}

export function missionPose(index, t) {
  const x = Math.min(1, Math.max(0, t));
  let position = [0, 0, 0];
  if (index === 0) position = [0, 500, 0];
  if (index === 1) position = [0, 500-250*x, 0];
  if (index === 2) position = [0, 250*(1-x), 0];
  if (index === 6) position = [450*x, 0, -300*x];
  if (index === 7) position = [450+160*x, 0, -300-110*x];
  return {
    position,
    envelope: index < 4,
    chute: index === 2,
    carrier: index < 2,
    stabilizer: index >= 5
  };
}

export function drivePose(pose, command, dt, speed = 120) {
  const delta = Math.max(0, Number(dt) || 0);
  let heading = Number(pose.heading) || 0;
  const position = [...pose.position];
  if (command === 'left') heading += delta;
  if (command === 'right') heading -= delta;
  if (command === 'forward' || command === 'back') {
    const direction = command === 'forward' ? 1 : -1;
    position[0] -= Math.sin(heading)*delta*speed*direction;
    position[2] -= Math.cos(heading)*delta*speed*direction;
  }
  return { ...pose, position, heading };
}

export function reachedGoal(position, goal, radius) {
  const vector = value => Array.isArray(value) && value.length === 3 && value.every(Number.isFinite);
  if (!vector(position) || !vector(goal) || !Number.isFinite(radius) || radius < 0) return false;
  const distance = Math.hypot(...position.map((value, i) => value-goal[i]));
  return distance <= radius;
}

export function nextPhase(index, count, autoplay, progress) {
  if (autoplay && progress >= 1 && index >= 0 && index < count-1) return index+1;
  return index;
}

export function validateMission(phases) {
  return Array.isArray(phases) && phases.length === 8 && phases.every(phase =>
    phase && typeof phase.title === 'string' && phase.title.trim().length > 0 &&
    typeof phase.text === 'string' && Number.isFinite(phase.duration) && phase.duration > 0
  );
}

export function projectEnvelope(project) {
  const data = { version: 1, parts: project.parts, steps: project.steps, mission: project.mission };
  return JSON.parse(JSON.stringify(data, (key, value) => {
    if (key === 'mesh' || key === 'geometry') return undefined;
    if (value && (value.isObject3D || value.isBufferGeometry)) return undefined;
    return value;
  }));
}
