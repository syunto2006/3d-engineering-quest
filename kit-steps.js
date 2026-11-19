// 新しい課題を載せる際も、利用者が前の課題で書いた内容を保持する。
export function prepareInitial(lesson,previous){
 if(lesson.mode!=='replace')return previous+'\n'+lesson.starter;
 if(lesson.file.endsWith('.json')){try{const own=JSON.parse(previous||'{}'),template=JSON.parse(lesson.starter);for(const [key,value]of Object.entries(template))if(!Object.hasOwn(own,key))own[key]=value;return JSON.stringify(own,null,2)}catch{return lesson.starter}}
 if(lesson.file.endsWith('.html'))return previous||lesson.starter;
 return lesson.starter;
}
export function applyLessonSolution(initial,lesson){
 if(lesson.mode!=='replace')return initial.slice(0,Math.max(0,initial.length-lesson.starter.length))+lesson.solution;
 if(lesson.file.endsWith('.json')){try{const own=JSON.parse(initial),template=JSON.parse(lesson.solution),key=Object.keys(template).at(-1);own[key]=template[key];return JSON.stringify(own,null,2)}catch{return lesson.solution}}
 if(lesson.file.endsWith('.html')){const a=lesson.starter,b=lesson.solution;let front=0,back=0;while(front<a.length&&front<b.length&&a[front]===b[front])front++;while(back<a.length-front&&back<b.length-front&&a[a.length-1-back]===b[b.length-1-back])back++;const addition=b.slice(front,b.length-back);const marker='<!-- ここに画面を追加 -->';if(initial.includes(marker))return initial.replace(marker,addition+marker);if(initial.includes('</body>'))return initial.replace('</body>',addition+'</body>');return initial+'\n'+addition}
 return lesson.solution;
}
