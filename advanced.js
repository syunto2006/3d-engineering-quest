// 参考ビューアの体験を自分の実装へつなぐ、追加の16課題。
// 形やソースを複製せず、表示モードと状態遷移を小さな純粋関数へ分けます。
export const extraChapters = [
  {title:'伝わる組立ガイドにする',description:'組立・部品・説明・写真・推奨視点をまとめ、参考ビューアのような体験を自作する。',icon:'◉'},
  {title:'ミッションと遠隔操作',description:'8フェーズの模式表示、時間管理、操作、到達判定、保存まで実装する。',icon:'⌁'}
];
export const extraLessons = [];
function drill(chapter,file,name,args,title,body,test,intro,task,hints,question,terms,builds){
  extraLessons.push({id:64+extraLessons.length,chapter,title,file,intro,task,
    starter:`// ${task}\nexport function ${name}(${args}) {\n  // TODO: 下の説明とテスト条件を手がかりに実装しよう\n  return null;\n}\n`,
    solution:`export function ${name}(${args}) {\n${body}\n}\n`,mode:'append',test,hints,terms,
    question:{text:question[0],options:question[1],answer:question[2],explain:question[3]},
    reference:'https://ysntera.github.io/cansat-assembly-viewer/',builds});
}

drill(8,'presentation.js','modes','','使う目的で画面を分ける',
`  return ['assembly', 'parts', 'mission', 'edit'];`,
`const m=await load('presentation.js');const a=m.modes();assert(Array.isArray(a)&&a.join(',')==='assembly,parts,mission,edit','組立・部品・ミッション・編集の4つを順番どおり返そう');a.push('test');assert(m.modes().length===4,'呼ぶたびに独立した配列を返そう');`,
'参考のCanSatビューアは、組み立てを追う操作、部品を調べる操作、ミッションを見る操作を分けて理解できます。全部の操作を一度に並べず、利用者の目的で画面を切り替える考え方です。\n\nこのキットではassembly（組立）、parts（部品）、mission（ミッション）、edit（編集）という内部名を使います。表示する日本語と、プログラムが使う名前を分けると、見出しを変えても状態の判定を壊しにくくなります。app.jsが部品を作り、experience.jsが4つの体験をつなぐ責任分担です。',
'4つの内部モード名を、assembly・parts・mission・editの順で配列にして返す。',
['角括弧で4つの文字列を並べ、returnする。','内部名は小文字で、順番は画面タブの順に合わせる。','新しい配列を関数の中で作ると、呼び出した側の変更が次回へ残りません。'],
['画面をモードで分ける主な理由は？',['利用者の目的ごとに操作を整理する','STLの三角形を減らす','必ず読み込み速度が上がる'],0,'同時に見せる情報を整理し、今したい作業へ集中しやすくします。'],['状態','配列','責任分担'],'目的別の4つの表示モード');

drill(8,'presentation.js','visibleParts','parts, steps, index','まだ取り付けない部品を隠す',
`  return parts.filter(part => {
    const first = steps.findIndex(step => step.partId === part.id);
    return part.visible !== false && first >= 0 && first <= index;
  }).map(part => part.id);`,
`const m=await load('presentation.js');const p=[{id:'a',visible:true},{id:'b',visible:true},{id:'c',visible:false},{id:'d',visible:true}];const s=[{partId:'a'},{partId:'b'},{partId:'c'}];assert(m.visibleParts(p,s,0).join()==='a','最初の部品だけを表示しよう');assert(m.visibleParts(p,s,2).join()==='a,b','未来の部品・未登録の部品・非表示指定を区別しよう');assert(m.visibleParts(p,s,-1).length===0,'開始前は組立部品を表示しないようにしよう');`,
'組立ガイドでは、完成形を常に全部見せると、今どの部品を取り付けたのか分かりにくくなります。現在の手順までに登場した部品だけ表示し、まだ先の部品は隠します。CADの表示切替を、手順の番号に結びつける設計です。\n\nfindIndexは条件に合う最初の番号を返し、見つからないと−1になります。同じ部品が複数の手順に登場しても、初登場より後は表示を続けます。利用者がvisible:falseにした部品は、その設定を優先します。戻すのはMeshではなくID一覧なので、描画せずテストできます。',
'現在の手順までに初登場し、visible:falseではない部品のID配列を返す。',
['partsをfilterし、各部品の最初のsteps番号をfindIndexで調べる。','first>=0かつfirst<=indexなら、組立ガイドに登場済みです。','最後にmapで部品のidだけを取り出す。'],
['同じ部品が手順0と手順3にある場合、初登場は？',['0','3','毎回ランダム'],0,'findIndexで最初の一致を探し、表示開始を決めます。'],['ID','visible','配列'],'手順に連動した部品の表示');

drill(8,'presentation.js','assemblyPose','part, steps, index, t','1手順ずつ取り付けを見せる',
`  const related = steps.map((step, i) => ({ step, i })).filter(item => item.step.partId === part.id);
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
  return { visible: part.visible !== false, position };`,
`const m=await load('presentation.js');const p={id:'a',visible:true,position:[0,0,0]};const s=[{partId:'a',from:[0,100,0],to:[0,0,0]},{partId:'b',from:[0,100,0],to:[0,0,0]},{partId:'a',from:[0,0,0],to:[20,0,0]}];const mid=m.assemblyPose(p,s,0,.5);assert(mid.visible&&mid.position[1]===50,'現在手順の途中をなめらかに補間しよう');assert(m.assemblyPose(p,s,1,.5).position[1]===0,'完了した部品は到着位置を保とう');assert(m.assemblyPose(p,s,2,.5).position[0]===10,'同じ部品の後の手順も扱おう');assert(!m.assemblyPose({id:'b',position:[0,0,0]},s,0,.5).visible,'未来の部品は隠そう');assert(p.position[1]===0,'元の配置データは書き換えないようにしよう');`,
'前章のprojectAtは全体の連続した時間軸でした。ここでは「現在の手順番号index」と「その手順の進み具合t」を受け、次へ・前へボタンで見る組立ガイドを作ります。開始位置→取り付け位置を短く動かすと、作業の方向が伝わります。\n\n現在の部品は補間し、以前に付いた部品は最後のtoを保ち、未来の部品は隠します。同じ部品の未来手順で現在の位置を上書きしないことが重要です。計算結果だけを返し、experience.js側でmesh.positionとmesh.visibleへ反映します。',
'現在手順をsmoothstepで補間し、完了済みは最後のto、未来は非表示の{visible,position}を返す。',
['部品に対応する手順へ元の番号iを付け、現在・過去・未来を分類する。','現在の手順ではtを0〜1に制限し、x*x*(3-2*x)で補間する。','現在がなければindexより前の最後のtoを使い、元のpart.positionは変更しない。'],
['未来の手順で位置を毎回上書きすると何が起こる？',['今の取り付け動作が飛んでしまう','描画が必ず速くなる','部品名が自動で付く'],0,'手順の時間順と、今までに終わった位置を保つ必要があります。'],['補間','状態','時間軸'],'段階ごとの取り付けアニメーション');

drill(8,'presentation.js','explodePosition','position, index, amount','部品を分解して見やすくする',
`  let direction = [...position];
  let length = Math.hypot(...direction);
  if (length < 1) {
    direction = [Math.cos(index*2.4), 0.5, Math.sin(index*2.4)];
    length = Math.hypot(...direction);
  }
  return position.map((value, i) => value + direction[i]/length*amount);`,
`const m=await load('presentation.js');const p=[3,4,0];const out=m.explodePosition(p,0,10);assert(Math.abs(out[0]-9)<1e-9&&Math.abs(out[1]-12)<1e-9,'方向を長さ1にして指定距離だけ離そう');assert(m.explodePosition([3,4,0],0,0).join()==='3,4,0','量0では元の位置へ戻そう');const a=m.explodePosition([0,0,0],0,50),b=m.explodePosition([0,0,0],1,50);assert(a.every(Number.isFinite)&&Math.abs(Math.hypot(...a)-50)<1e-8&&a.join()!==b.join(),'原点の部品も別の方向へ分解しよう');assert(p.join()==='3,4,0','基準の組立位置は残そう');`,
'分解表示は、部品を一時的に離して重なりを減らす見せ方です。CADの分解図と同じ目的ですが、ここでは原点から外向きの簡単なルールで動かします。正しい組立位置そのものは保存しておき、量を0にすれば戻せるようにします。\n\nベクトルの長さは√(x²+y²+z²)。各成分を長さで割ると、方向を保った長さ1のベクトルになります。原点は長さ0で割れないので、部品番号から別の方向を用意します。これは説明用の配置で、干渉や組立可能性を保証する計算ではありません。',
'元の位置から外向きへamountだけ離した新しい位置を返し、原点付近は番号別の方向を使う。',
['Math.hypot(x,y,z)で長さを求め、方向の成分を長さで割る。','原点付近では[cos(index*2.4),0.5,sin(index*2.4)]を方向に使う。','元のpositionに、単位方向ベクトル×amountを足す。'],
['基準位置を毎回書き換えて分解量を加えると？',['操作するたびに部品が遠ざかってしまう','必ず元へ戻る','STLが小さくなる'],0,'元の組立位置から表示位置を毎回計算する設計が必要です。'],['ベクトル','正規化','分離設計'],'スライダーで戻せる分解表示');

drill(8,'presentation.js','partDescription','part','部品の役割を説明する',
`  const count = Number(part.count);
  return {
    name: String(part.name || '名称未設定'),
    role: String(part.role || '役割は未設定です'),
    material: String(part.material || '未設定'),
    count: Number.isFinite(count) && count > 0 ? Math.max(1, Math.floor(count)) : 1
  };`,
`const m=await load('presentation.js');const a=m.partDescription({name:'基板',role:'制御する',material:'FR-4',count:2});assert(a.name==='基板'&&a.role==='制御する'&&a.material==='FR-4'&&a.count===2,'説明メタデータを残そう');const b=m.partDescription({});assert(typeof b.name==='string'&&b.name.length>0&&b.role.length>0&&b.material.length>0&&b.count===1,'説明がまだなくても画面を壊さないようにしよう');assert(m.partDescription({count:-2}).count===1,'不正な個数を補おう');`,
'形を眺めるだけでは、初めて見る人には「この部品は何をするのか」が伝わりません。部品名・役割・材質・個数を形とは別のデータとして持ち、部品一覧の説明カードへ出します。参考ビューアのように、3Dと文章を一緒に見る体験へ近づけます。\n\nこのような説明情報をメタデータと呼びます。STLから役割や材質を正確に自動確定できるわけではないので、編集画面から利用者が記入します。未入力のときもundefinedと表示せず、何が未設定か伝える既定値を返します。',
'name・role・material・countを持つ説明データを返し、未設定の文章と不正な個数を補う。',
['文字項目はString(part.name || "名称未設定")のように既定値を付ける。','個数は有限な正の数を許可し、Math.floorで整数にする。','役割と材質はSTLの形から推測せず、記入された値を利用する。'],
['STLだけで正しい部品の役割が分かる？',['通常は分からないので説明を別に入力する','必ず分かる','色を青にすれば分かる'],0,'幾何形状と、その意味や役割は別の情報です。'],['レコード','Material','初期値'],'部品の説明カード');

drill(8,'presentation.js','stepDetails','step','写真とコツで手順を伝える',
`  return {
    title: String(step.title || '取り付け手順'),
    text: String(step.text || '部品を所定の位置へ取り付けます。'),
    fastening: String(step.fastening || '未設定'),
    tip: String(step.tip || ''),
    photo: typeof step.photo === 'string' ? step.photo : ''
  };`,
`const m=await load('presentation.js');const s={title:'ふたを固定',text:'位置を合わせる',fastening:'M3ねじ',tip:'対角に締める',photo:'data:image/png;base64,AA=='};const r=m.stepDetails(s);assert(Object.keys(r).sort().join()==='fastening,photo,text,tip,title'&&r.photo===s.photo&&r.fastening==='M3ねじ','説明・固定方法・写真を別の項目で扱おう');const d=m.stepDetails({});assert(d.title.length>0&&d.text.length>0&&d.fastening.length>0&&d.tip===''&&d.photo==='','未入力の手順でも案内を表示しよう');`,
'手順は「何を動かすか」だけでなく、「どう固定するか」「気を付ける点」「実物の写真」があると伝わりやすくなります。文章・写真・3Dは得意な説明が違うため、組み合わせます。\n\nstepにtitle・text・fastening・tip・photoを持たせます。photoは画像のURLや、ファイルを文字列として保存するデータURLです。写真は大きいと保存JSONも重くなるので、登録側で容量を制限します。ここでは表示用の情報を整える責任だけを担当します。',
'手順名・説明・固定方法・コツ・写真の5項目を返し、未入力の既定値を設定する。',
['titleとtextには、何もなくても読める短い文章を既定値にする。','tipとphotoは、未設定なら空文字で構いません。','写真のファイル読込と、この説明データの整形は別の関数に分ける。'],
['写真もJSONへ入れる場合の注意点は？',['写真が大きいと保存データも大きくなる','JSONでは画像の説明が不要になる','写真だけで固定方法が必ず分かる'],0,'容量制限と、写真を登録しなかったときの表示を考えます。'],['JSON','レコード','メモリ'],'固定方法・コツ・写真付き手順');

drill(8,'presentation.js','recommendedView','step, fallback','手順ごとにおすすめ視点を保存',
`  const vector = value => Array.isArray(value) && value.length === 3 && value.every(Number.isFinite);
  const camera = step && step.camera;
  if (camera && vector(camera.position) && vector(camera.target)) {
    return { position: [...camera.position], target: [...camera.target] };
  }
  return fallback;`,
`const m=await load('presentation.js');const f={position:[200,100,200],target:[0,0,0]};const s={camera:{position:[1,2,3],target:[4,5,6]}};const a=m.recommendedView(s,f);assert(a.position.join()==='1,2,3'&&a.target.join()==='4,5,6','保存されたカメラと注視点を返そう');a.position[0]=99;assert(s.camera.position[0]===1,'保存視点の配列を共有しないようコピーしよう');assert(m.recommendedView({camera:{position:[1,2],target:[0,0,0]}},f)===f&&m.recommendedView({},f)===f,'不正または未設定なら通常視点へ戻そう');`,
'同じ部品でも、取り付け面が見える方向は手順ごとに違います。カメラの位置positionと、注目する点targetを手順に保存すれば、「この角度で見ると分かりやすい」を再現できます。CADの名前付きビューに近い使い方です。\n\n座標は3つの有限な数であることを検証します。利用者が自由に視点を動かした後も、おすすめ視点に戻すボタンを残すと操作しやすくなります。experience.jsではカメラ操作開始を検知し、手動操作中に勝手に視点を戻さないよう管理します。',
'camera.positionとcamera.targetが有効な3要素配列ならコピーし、違えばfallbackを返す。',
['Array.isArray、length===3、every(Number.isFinite)でベクトルを確認する。','positionとtargetの両方が正しい場合だけ採用する。','[...camera.position]でコピーし、利用者の操作で保存データを壊さないようにする。'],
['カメラ位置だけでなくtargetも保存する理由は？',['どこを見るかも再現するため','色を変えるため','三角形を増やすため'],0,'同じ場所にいても、向いている先が違えば別の見え方になります。'],['Camera','ベクトル','コピー'],'手順ごとの推奨カメラ視点');

drill(8,'presentation.js','canNavigate','index, count, delta','前へ・次へを境界で止める',
`  if (!Number.isInteger(index) || !Number.isInteger(count) || !Number.isInteger(delta)) return false;
  const next = index + delta;
  return count > 0 && index >= 0 && index < count && next >= 0 && next < count;`,
`const m=await load('presentation.js');assert(m.canNavigate(0,3,1)&&m.canNavigate(2,3,-1),'範囲内の移動を許可しよう');assert(!m.canNavigate(0,3,-1)&&!m.canNavigate(2,3,1)&&!m.canNavigate(0,0,1),'先頭・最後・空一覧を越えないようにしよう');assert(!m.canNavigate(.5,3,1),'番号は整数として扱おう');`,
'配列は0から数えるため、3手順なら有効な番号は0・1・2です。「前へ」「次へ」を押す前に、移動先がこの範囲かを調べます。ボタンを無効にするだけでなく、キーボード操作でも同じ関数を使えば、境界のルールが1か所にまとまります。\n\nこの章で作ったpresentation.jsは、表示する部品・位置・説明・視点・移動できるかを計算します。experience.jsの画面切替→組立パネル→前後ボタン→位置の反映、という流れを追い、どの計算がこの章の関数へ移せるか確認しましょう。データの計算と、画面に反映する処理を分けるのがポイントです。',
'index+deltaが0以上count未満で、現在の番号も有効な整数ならtrueを返す。',
['最終番号はcountではなくcount-1。比較はnext<countにする。','手順が0件なら、どちらへも進めません。','クリックと左右キーの両方から同じ判定を呼ぶ設計にする。'],
['手順が3個あるとき最後の配列番号は？',['2','3','4'],0,'0から始めるので、最後は個数−1です。'],['配列','if','分離設計'],'安全な手順ナビゲーション');

drill(9,'mission.js','phaseList','','8フェーズの説明を設計する',
`  const titles = ['収納','放出','開傘・降下','着地','エンベロープ分離','スタビライザ展開','GNSS誘導','カメラ誘導'];
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
  return titles.map((title, i) => ({ title, text: texts[i], duration: 4 }));`,
`const m=await load('mission.js');const a=m.phaseList();assert(a.length===8&&a.map(p=>p.title).join('|')==='収納|放出|開傘・降下|着地|エンベロープ分離|スタビライザ展開|GNSS誘導|カメラ誘導','8段階の順番を決めよう');assert(a.every(p=>typeof p.text==='string'&&p.text.length>0&&p.duration===4),'各段階に説明と秒数を付けよう');a[0].title='変更';assert(m.phaseList()[0].title==='収納','初期データを毎回独立して作ろう');`,
'組立ガイドは「どう作るか」、ミッション表示は「作ったものがどう使われるか」を伝えます。参考ビューアのCanSatミッションを手がかりに、収納から誘導までを8段階のデータへ分けます。\n\nここで作るのは説明用の模式アニメーションです。実際の落下速度、空力、GNSS測位、画像認識、制御性能を計算・検証するものではありません。フェーズの名前・文章・表示時間をデータにしておくと、コードを書き直さず説明を編集できます。',
'指定された8フェーズを、title・text・duration:4の配列として返す。',
['まず8つのタイトルを配列で順番どおりに書く。','同じ順番の説明文を用意し、mapで1フェーズ分のオブジェクトへまとめる。','durationは説明表示に使う秒数で、実機の所要時間ではありません。'],
['このミッション表示で保証するのは？',['説明用の状態遷移と動き','実際のGNSS誘導性能','実機の安全な降下速度'],0,'説明を分かりやすく見せる機能と、物理・制御の検証は別です。'],['配列','データ設計','状態'],'説明文を編集できる8段階ミッション');

drill(9,'mission.js','phaseAt','phases, seconds','秒数からフェーズを決める',
`  if (!Array.isArray(phases) || phases.length === 0) return { index: 0, progress: 0 };
  const durations = phases.map(p => Math.max(0.001, Number(p.duration) || 4));
  const total = durations.reduce((sum, value) => sum + value, 0);
  let elapsed = Math.min(total, Math.max(0, Number(seconds) || 0));
  for (let i = 0; i < durations.length; i++) {
    if (elapsed < durations[i]) return { index: i, progress: elapsed/durations[i] };
    elapsed -= durations[i];
  }
  return { index: phases.length-1, progress: 1 };`,
`const m=await load('mission.js');const p=[{duration:2},{duration:6}];assert(m.phaseAt(p,1).index===0&&m.phaseAt(p,1).progress===.5,'最初のフェーズ内の割合を求めよう');assert(m.phaseAt(p,2).index===1&&m.phaseAt(p,5).progress===.5,'秒数が違っても正しいフェーズへ進もう');assert(m.phaseAt(p,100).index===1&&m.phaseAt(p,100).progress===1&&m.phaseAt(p,-1).progress===0,'開始前と終了後を範囲内へ制限しよう');assert(m.phaseAt([],2).progress===0,'空のデータでも結果を返そう');`,
'進捗の割合と秒数は別です。2秒のフェーズと6秒のフェーズがある場合、全体4秒地点は「第2フェーズが2秒進んだところ」、そのフェーズ内では2÷6です。\n\n先頭から各durationを引き、今の秒数が収まる段階を探します。その中の経過秒÷durationが0〜1のprogressになります。動画の時間表示やスライドの自動送りでも、同じ考え方が使えます。',
'各durationを考慮し、経過秒に対応する{index,progress}を返す。',
['秒数を先頭のdurationと比べ、超えていればその秒数を引いて次へ進む。','該当フェーズでは残り秒÷durationが進捗率です。','全時間を超えたら最終フェーズのprogress:1で止める。'],
['durationが2秒と6秒のとき全体5秒地点は？',['第2フェーズの半分','第1フェーズの半分','必ず全体の5%'],0,'2秒を引いた3秒が、第2フェーズの6秒の半分です。'],['時間軸','配列','clamp'],'時間の長さを反映した自動再生');

drill(9,'mission.js','missionPose','index, t','フェーズを模式的な動きへ写す',
`  const x = Math.min(1, Math.max(0, t));
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
  };`,
`const m=await load('mission.js');assert(m.missionPose(0,0).position[1]===500&&m.missionPose(0,0).carrier,'収納時は上空のキャリアを表示しよう');assert(m.missionPose(1,.5).position[1]===375,'放出の途中を計算しよう');assert(m.missionPose(2,.5).chute&&m.missionPose(2,1).position[1]===0,'開傘と着地までの降下を表そう');assert(!m.missionPose(4,0).envelope&&m.missionPose(5,0).stabilizer,'分離と展開の状態を切り替えよう');assert(m.missionPose(6,1).position.join()==='450,0,-300'&&m.missionPose(7,1).position.join()==='610,0,-410','後半の模式経路をつなごう');`,
'状態の番号を、見せる位置と補助モデルの表示へ対応させます。収納・放出ではキャリア、開傘・降下ではパラシュート、分離後はエンベロープを隠し、展開後はスタビライザを表示します。\n\n位置は簡単な直線補間です。たとえば降下はy=250(1−t)で、高さ250から0へ移ります。後半は地面上の経路を見せます。GNSSの電波やカメラ画像を実際に処理しているわけではないので、画面にも「模式表示」と明示します。',
'指定フェーズのpositionとenvelope・chute・carrier・stabilizerの真偽値を返す。',
['先にtを0〜1に収め、ifでindexごとの位置を設定する。','パラシュートはindex===2、スタビライザはindex>=5。','位置の計算と、補助モデルを見せる条件を別々の項目にする。'],
['降下の式y=250(1−t)でt=1の高さは？',['0','250','500'],0,'終了時に250×0となり、地面の高さへ到達します。'],['ベクトル','補間','真偽値'],'ミッションの位置と補助モデルの表示');

drill(9,'mission.js','drivePose','pose, command, dt, speed = 120','遠隔操作を時間ベースで動かす',
`  const delta = Math.max(0, Number(dt) || 0);
  let heading = Number(pose.heading) || 0;
  const position = [...pose.position];
  if (command === 'left') heading += delta;
  if (command === 'right') heading -= delta;
  if (command === 'forward' || command === 'back') {
    const direction = command === 'forward' ? 1 : -1;
    position[0] -= Math.sin(heading)*delta*speed*direction;
    position[2] -= Math.cos(heading)*delta*speed*direction;
  }
  return { ...pose, position, heading };`,
`const m=await load('mission.js');const p={position:[0,0,0],heading:0};const a=m.drivePose(p,'forward',.5);assert(Math.abs(a.position[2]+60)<1e-8&&a.position[1]===0,'0.5秒×120の距離だけ前進しよう');const b=m.drivePose(p,'back',.5);assert(Math.abs(b.position[2]-60)<1e-8,'後退は逆方向へ進もう');assert(m.drivePose(p,'left',1).heading===1&&m.drivePose(p,'right',1).heading===-1,'左右で向きを変えよう');const turned=m.drivePose({position:[0,0,0],heading:Math.PI/2},'forward',1,10);assert(Math.abs(turned.position[0]+10)<1e-8&&Math.abs(turned.position[2])<1e-8,'向きに応じてxzへ分解しよう');assert(p.position[2]===0&&m.drivePose(p,'stop',1).position[2]===0,'基準データを残し、停止時は動かさないようにしよう');`,
'1フレームごとに一定距離を進めると、描画の速い端末ほど速く走ってしまいます。経過秒dt×速度speedで距離を決めれば、フレーム数が違っても同じ時間で同じ距離を進めます。\n\n向きheadingに対し、前進をxへ−sinθ、zへ−cosθに分解します。この座標系ではheading=0で−z方向へ進みます。左右は角度を増減、後退は前進の逆向きです。ブラウザのボタンやWASDキーはcommandを変える入口で、運動の計算は同じ関数へまとめます。',
'left・rightでheadingを変え、forward・backで向きに沿ってdt×speedだけ移動した新しい姿勢を返す。',
['pose.positionをコピーし、元のデータを書き換えない。','前進はx-=sin(heading)*dt*speed、z-=cos(heading)*dt*speed。','後退では同じ移動量に−1を掛け、stopでは位置を変えない。'],
['端末の描画速度に左右されにくくするには？',['経過秒dtを速度に掛ける','毎フレーム同じ距離を足す','速い端末だけを使う'],0,'距離=速度×時間という関係で動かします。'],['ラジアン','ベクトル','フレーム'],'前後進・旋回の遠隔操作');

drill(9,'mission.js','reachedGoal','position, goal, radius','目標へ到達したか判定する',
`  const vector = value => Array.isArray(value) && value.length === 3 && value.every(Number.isFinite);
  if (!vector(position) || !vector(goal) || !Number.isFinite(radius) || radius < 0) return false;
  const distance = Math.hypot(...position.map((value, i) => value-goal[i]));
  return distance <= radius;`,
`const m=await load('mission.js');assert(m.reachedGoal([3,4,0],[0,0,0],5),'半径ちょうどの距離も到達としよう');assert(!m.reachedGoal([3,4,0],[0,0,0],4.9),'半径より遠ければ未到達にしよう');assert(m.reachedGoal([1,2,3],[1,2,3],0),'半径0でも一致点は到達です');assert(!m.reachedGoal([0,0],[0,0,0],3)&&!m.reachedGoal([0,0,0],[0,0,0],-1),'不正な座標や半径を拒否しよう');`,
'目標点との距離が一定以下になったら到達、とする簡単な判定を作ります。3D空間では距離=√((x−gx)²+(y−gy)²+(z−gz)²)。CADの2点間距離と同じ考え方です。\n\n半径を設けると、1点へ完全一致させなくても到達として扱えます。ただしこれは幾何的な距離だけの判定。センサーの誤差、障害物、実機の停止距離を考慮する誘導システムではありません。見せるための基準と、実物の制御要件を区別しましょう。',
'2点間の3D距離がradius以下ならtrueを返し、不正な座標や半径はfalseにする。',
['各成分の差を配列にし、Math.hypotで長さを求める。','距離===radiusも到達なので、比較は<=。','半径が負や座標が3つの有限数でない場合を先に除外する。'],
['(3,4,0)と原点との距離は？',['5','7','12'],0,'√(3²+4²)=√25=5です。'],['ベクトル','if','検証'],'距離によるゴール判定');

drill(9,'mission.js','nextPhase','index, count, autoplay, progress','自動送りと手動操作を分ける',
`  if (autoplay && progress >= 1 && index >= 0 && index < count-1) return index+1;
  return index;`,
`const m=await load('mission.js');assert(m.nextPhase(0,8,true,1)===1,'再生完了で次へ進もう');assert(m.nextPhase(0,8,false,1)===0&&m.nextPhase(0,8,true,.9)===0,'手動時と未完了では進まないようにしよう');assert(m.nextPhase(7,8,true,1)===7,'最後のフェーズで止めよう');assert(m.nextPhase(0,0,true,1)===0,'空の一覧でも勝手に増やさないようにしよう');`,
'自動再生は、現在のフェーズが完了したときだけ次の番号へ進みます。手動の次へボタンと同じルールを混ぜ込むと、見ている途中で勝手に進むなどの挙動になります。\n\nこの関数は番号を決めるだけ。次の番号になったときに時計を0へ戻し、説明パネルを描き直す処理はexperience.jsが行います。遠隔操作中に自動で動かしたくない場合は、呼び出し側でautoplayをfalseとして扱います。',
'autoplayが有効でprogress>=1、かつ最終段階でないときだけindex+1を返す。',
['autoplay、progress>=1、index<count-1を同時に確認する。','どれかが違えば現在のindexをそのまま返す。','この関数で時計や画面を直接触らず、番号の計算だけを担当する。'],
['次へ進んだ後、呼び出し側が行うことは？',['フェーズ内の時計を0へ戻す','元STLを消す','全部品名を変える'],0,'次のフェーズの進捗を最初から計算し、説明も更新します。'],['if','状態','分離設計'],'最後で止まるミッション自動再生');

drill(9,'mission.js','validateMission','phases','編集したミッションを検証する',
`  return Array.isArray(phases) && phases.length === 8 && phases.every(phase =>
    phase && typeof phase.title === 'string' && phase.title.trim().length > 0 &&
    typeof phase.text === 'string' && Number.isFinite(phase.duration) && phase.duration > 0
  );`,
`const m=await load('mission.js');const a=m.phaseList();assert(m.validateMission(a),'8フェーズの正しいデータを許可しよう');assert(!m.validateMission(a.slice(1))&&!m.validateMission(null),'段階数と配列を確認しよう');const b=m.phaseList();b[2].duration=Infinity;assert(!m.validateMission(b),'有限な秒数だけを許可しよう');b[2].duration=0;assert(!m.validateMission(b),'0秒を拒否しよう');b[2].duration=4;b[1].title=' ';assert(!m.validateMission(b),'空のタイトルを拒否しよう');`,
'ミッションの文章や時間をJSONから編集できると、別の機体の説明にも応用できます。しかし自由に入力できることと、どんな値でも受け入れることは違います。\n\n8段階であること、タイトルと説明の型、秒数が有限で正であることを確認します。0秒を許すと、進捗=経過秒÷0という計算が壊れます。検証に失敗したときは、今までの正しいデータを残し、理由を表示して修正してもらいます。',
'8件の配列で、各titleが空でない文字列、textが文字列、durationが有限な正数ならtrueを返す。',
['Array.isArray(phases)とlength===8を先に確認する。','everyで各フェーズのtitle・text・durationを確認する。','duration>0だけでなくNumber.isFiniteも使い、Infinityを拒否する。'],
['0秒のフェーズを拒否する理由は？',['時間割合の計算で0除算を防ぐため','JSONは0を保存できないため','画面の背景が変わるため'],0,'表示時間という要件から、有効な数値の範囲を決めます。'],['検証','every','0除算'],'再編集できるミッションの入力検証');

drill(9,'mission.js','projectEnvelope','project','説明とミッションもまとめて保存',
`  const data = { version: 1, parts: project.parts, steps: project.steps, mission: project.mission };
  return JSON.parse(JSON.stringify(data, (key, value) => {
    if (key === 'mesh' || key === 'geometry') return undefined;
    if (value && (value.isObject3D || value.isBufferGeometry)) return undefined;
    return value;
  }));`,
`const m=await load('mission.js');const mesh={isObject3D:true};mesh.self=mesh;const p={parts:[{id:'a',name:'基板',role:'制御',material:'FR-4',count:2,source:'c3Rs',position:[0,0,0],mesh}],steps:[{partId:'a',title:'固定',text:'合わせる',fastening:'ねじ',tip:'対角',photo:'data:image/png;base64,AA==',camera:{position:[1,2,3],target:[0,0,0]}}],mission:m.phaseList()};const e=m.projectEnvelope(p);const roundtrip=JSON.parse(JSON.stringify(e));assert(e.version===1&&roundtrip.parts[0].source==='c3Rs'&&roundtrip.parts[0].role==='制御','元STLの保存用文字列と部品の説明を残そう');assert(!('mesh' in e.parts[0])&&e.steps[0].camera.position[0]===1&&e.steps[0].photo===p.steps[0].photo&&e.mission.length===8,'実行用Meshを除き、手順の写真・視点・ミッションを保とう');e.parts[0].name='変更';assert(p.parts[0].name==='基板','保存データは元データと独立させよう');`,
'完成したのは、形を表示するだけのビューアではありません。部品の役割、取り付け説明、固定方法、写真、推奨視点、組立順、ミッションの文章と時間を、後から編集できるアプリです。これらを保存して初めて、次に開くときも説明体験を再現できます。\n\n保存へ渡すprojectは、元STLのバイト列をbase64などの文字列sourceへ変換した部品データです。MeshやGeometryは描画装置の実行中の情報なので、丸ごとJSONへ入れません。app.jsのpackageProjectが形と設定を保存用にまとめ、この関数がparts・steps・missionを1つの形式へ包みます。\n\n最後に自分で配線を追いましょう。STL登録→部品説明を編集→手順の説明・写真・視点を設定→組立を前後移動→部品の分解表示→8フェーズのミッションと遠隔操作→保存→別のタブで復元。presentation.jsとmission.jsの計算をexperience.jsが画面へ反映する道筋を説明できたら、参考体験を自分の設計として組み直す準備ができています。',
'version:1とparts・steps・missionを独立した保存データへまとめ、MeshやGeometryを除いてメタデータとsourceを残す。',
['先に{version:1,parts,steps,mission}という保存の外箱を作る。','JSON.stringifyの第2引数へ関数を渡すと、保存しない項目をundefinedで除けます。','保存用sourceは文字列を渡す。元のArrayBufferはapp.jsのpackageProjectで変換する責任分担です。'],
['保存JSONに含めるべきものは？',['STLの保存用データと設定・説明・手順','Rendererの内部状態すべて','表示中のMeshだけ'],0,'形を再構築できるデータと、再現したい設定を保存します。'],['JSON','シリアライズ','責任分担'],'参考体験まで再編集できるプロジェクト保存');
