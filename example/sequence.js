// このファイルに機能を積み上げる

export function createStep(partId) {
  return { partId, from: [0,120,0], to: [0,0,0], duration: 1 };
}

export function moveStep(steps, from, to) {
  const result=steps.slice();
  if(from<0||to<0||from>=result.length||to>=result.length) return result;
  const [step]=result.splice(from,1);
  result.splice(to,0,step);
  return result;
}

export function lerp(a, b, t) {
  return a + (b-a)*t;
}

export function ease(t) {
  const x=Math.min(1,Math.max(0,t));
  return x*x*(3-2*x);
}

export function positionAt(from, to, t) {
  return from.map((value,i)=>lerp(value,to[i],t));
}

export function stepPose(step, t) {
  return positionAt(step.from,step.to,ease(t));
}

export function projectAt(parts, steps, progress) {
  return parts.map(part=>{
    const first=steps.find(step=>step.partId===part.id);
    let position=[...(first ? first.from : part.position)];
    steps.forEach((step,index)=>{
      if(step.partId===part.id && index<=progress){
        const t=Math.min(1,Math.max(0,progress-index));
        position=stepPose(step,t);
      }
    });
    return {...part,position};
  });
}

export function validateSteps(steps, partIds) {
  if(!Array.isArray(steps)||!Array.isArray(partIds)) return false;
  const vector=v=>Array.isArray(v)&&v.length===3&&v.every(Number.isFinite);
  return steps.every(s=>partIds.includes(s.partId)&&vector(s.from)&&vector(s.to)&&Number.isFinite(s.duration)&&s.duration>0);
}
