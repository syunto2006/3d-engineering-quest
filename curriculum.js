export const chapters = [
  {
    "title": "設計の地図をつくる",
    "description": "要求分析・要件定義・受入条件・フローチャート。何を作るかを決める8課題。",
    "icon": "◇"
  },
  {
    "title": "画面を一から組む",
    "description": "HTMLとCSSで、ホーム・作業場・操作パネルを組み立てる。",
    "icon": "▧"
  },
  {
    "title": "動くアプリの考え方",
    "description": "変数・配列・オブジェクト・関数でアプリの状態を管理する。",
    "icon": "{}"
  },
  {
    "title": "3D空間を立ち上げる",
    "description": "Scene・Camera・Renderer・光・材質・描画ループを実装する。",
    "icon": "◈"
  },
  {
    "title": "CADの形を連れてくる",
    "description": "STL解析・座標変換・境界・複数ファイル読み込みを実装する。",
    "icon": "▱"
  },
  {
    "title": "部品と会話できるUI",
    "description": "部品一覧・透明化・色・表示切替・Raycaster選択を実装する。",
    "icon": "⌖"
  },
  {
    "title": "組立手順を編集する",
    "description": "順番・補間・時間軸で、変更できる組立アニメーションを作る。",
    "icon": "▷"
  },
  {
    "title": "作品として持ち出す",
    "description": "JSON保存・復元・検証・README・GitHub公開まで仕上げる。",
    "icon": "✧"
  }
];
export const lessons = [
  {
    "id": 0,
    "chapter": 0,
    "title": "作りたいものを一文にする",
    "file": "requirements.json",
    "intro": "要求分析は「欲しいもの」を見つける作業です。CADなら、いきなり寸法を入れる前に、何に使う部品なのかを考えます。今回はSTLから部品を表示し、組立手順を編集・再生できる道具を作ります。\n\nJSONは名前と値の組を保存する形式。文字列は二重引用符で囲みます。まずgoalという名前に、達成したいことを書きましょう。",
    "task": "goalにSTLを含む目的を書く。",
    "starter": "{\n  \"goal\": \"TODO\"\n}",
    "solution": "{\n  \"goal\": \"STLを登録し組立手順を編集して再生する\"\n}",
    "test": "assert(JSON.parse(files['requirements.json']).goal.includes('STL'), \"goalにSTLを含む目的を書く。\");",
    "hints": [
      "目的は「何を使い、何ができるか」で表す。",
      "前の項目は残し、今回の項目だけを編集する。",
      "カンマ・二重引用符・括弧の対応を確認しよう。"
    ],
    "terms": [
      "要求分析",
      "JSON",
      "文字列"
    ],
    "question": {
      "text": "今回の設計書は何に使う？",
      "options": [
        "目的と合格条件を共有する",
        "STLの三角形を増やす",
        "画面を自動的に美しくする"
      ],
      "answer": 0,
      "explain": "設計書は実装と確認の基準になります。"
    },
    "builds": "アプリの仕様書",
    "mode": "replace",
    "reference": "https://developer.mozilla.org/ja/docs/Learn_web_development/Getting_started/Your_first_website/What_will_your_website_look_like"
  },
  {
    "id": 1,
    "chapter": 0,
    "title": "誰が使うかを決める",
    "file": "requirements.json",
    "intro": "同じアプリでも、設計する人と組み立てる人では必要な画面が違います。使う人を具体的に書くと、必要な機能を判断しやすくなります。\n\n複数の値は配列で表せます。[\"CAD設計者\", \"組立手順を見る人\"]のように角括弧で囲み、カンマで区切ります。",
    "task": "usersに2種類以上の利用者を書く。",
    "starter": "{\n  \"goal\": \"STLを登録し組立手順を編集して再生する\",\n  \"users\": \"TODO\"\n}",
    "solution": "{\n  \"goal\": \"STLを登録し組立手順を編集して再生する\",\n  \"users\": [\n    \"CAD設計者\",\n    \"組立手順を見る人\"\n  ]\n}",
    "test": "const list=JSON.parse(files[\"requirements.json\"])[\"users\"];assert(Array.isArray(list)&&list.every(x=>typeof x===\"string\"&&x.trim().length>0),\"項目は空でない文字列の配列にしよう\");assert(JSON.parse(files['requirements.json']).users.length>=2, \"usersに2種類以上の利用者を書く。\");",
    "hints": [
      "usersは文字列1つではなく、角括弧の配列にする。",
      "前の項目は残し、今回の項目だけを編集する。",
      "カンマ・二重引用符・括弧の対応を確認しよう。"
    ],
    "terms": [
      "利用者",
      "配列",
      "ユースケース"
    ],
    "question": {
      "text": "今回の設計書は何に使う？",
      "options": [
        "目的と合格条件を共有する",
        "STLの三角形を増やす",
        "画面を自動的に美しくする"
      ],
      "answer": 0,
      "explain": "設計書は実装と確認の基準になります。"
    },
    "builds": "アプリの仕様書",
    "mode": "replace",
    "reference": "https://developer.mozilla.org/ja/docs/Learn_web_development/Getting_started/Your_first_website/What_will_your_website_look_like"
  },
  {
    "id": 2,
    "chapter": 0,
    "title": "利用の流れを言葉にする",
    "file": "requirements.json",
    "intro": "ユースケースは、利用者が目的を達成する一連の使い方です。「ボタンがある」より「STLを登録して、部品を並べ、再生する」と書くと、作業のつながりが分かります。\n\nCADの操作履歴のように、動詞で手順を並べましょう。ここで書いた流れが、後で作る画面や機能の順番になります。",
    "task": "useCasesに4つ以上の作業を書く。",
    "starter": "{\n  \"goal\": \"STLを登録し組立手順を編集して再生する\",\n  \"users\": [\n    \"CAD設計者\",\n    \"組立手順を見る人\"\n  ],\n  \"useCases\": \"TODO\"\n}",
    "solution": "{\n  \"goal\": \"STLを登録し組立手順を編集して再生する\",\n  \"users\": [\n    \"CAD設計者\",\n    \"組立手順を見る人\"\n  ],\n  \"useCases\": [\n    \"STLを複数登録する\",\n    \"部品を選んで位置を変える\",\n    \"組立順を変える\",\n    \"再生する\"\n  ]\n}",
    "test": "const list=JSON.parse(files[\"requirements.json\"])[\"useCases\"];assert(Array.isArray(list)&&list.every(x=>typeof x===\"string\"&&x.trim().length>0),\"項目は空でない文字列の配列にしよう\");assert(JSON.parse(files['requirements.json']).useCases.length>=4, \"useCasesに4つ以上の作業を書く。\");",
    "hints": [
      "読み込み・編集・順番変更・再生を1項目ずつ書く。",
      "前の項目は残し、今回の項目だけを編集する。",
      "カンマ・二重引用符・括弧の対応を確認しよう。"
    ],
    "terms": [
      "ユースケース",
      "動詞",
      "操作フロー"
    ],
    "question": {
      "text": "今回の設計書は何に使う？",
      "options": [
        "目的と合格条件を共有する",
        "STLの三角形を増やす",
        "画面を自動的に美しくする"
      ],
      "answer": 0,
      "explain": "設計書は実装と確認の基準になります。"
    },
    "builds": "アプリの仕様書",
    "mode": "replace",
    "reference": "https://developer.mozilla.org/ja/docs/Learn_web_development/Getting_started/Your_first_website/What_will_your_website_look_like"
  },
  {
    "id": 3,
    "chapter": 0,
    "title": "合格の条件を先に書く",
    "file": "requirements.json",
    "intro": "要件定義は、欲しいものを確かめられる条件に変える作業です。「使いやすい」だけでは合格か判定できません。「3つのSTLが一覧に出る」なら実際に試せます。\n\nこの条件を受入条件と呼びます。後のテストで、その通りに動くか確認するための約束です。",
    "task": "acceptanceに確認可能な条件を3つ書く。",
    "starter": "{\n  \"goal\": \"STLを登録し組立手順を編集して再生する\",\n  \"users\": [\n    \"CAD設計者\",\n    \"組立手順を見る人\"\n  ],\n  \"useCases\": [\n    \"STLを複数登録する\",\n    \"部品を選んで位置を変える\",\n    \"組立順を変える\",\n    \"再生する\"\n  ],\n  \"acceptance\": \"TODO\"\n}",
    "solution": "{\n  \"goal\": \"STLを登録し組立手順を編集して再生する\",\n  \"users\": [\n    \"CAD設計者\",\n    \"組立手順を見る人\"\n  ],\n  \"useCases\": [\n    \"STLを複数登録する\",\n    \"部品を選んで位置を変える\",\n    \"組立順を変える\",\n    \"再生する\"\n  ],\n  \"acceptance\": [\n    \"3つのSTLを一覧に表示できる\",\n    \"順番変更が再生に反映される\",\n    \"保存JSONを再読込すると設定が戻る\"\n  ]\n}",
    "test": "const list=JSON.parse(files[\"requirements.json\"])[\"acceptance\"];assert(Array.isArray(list)&&list.every(x=>typeof x===\"string\"&&x.trim().length>0),\"項目は空でない文字列の配列にしよう\");assert(JSON.parse(files['requirements.json']).acceptance.length>=3, \"acceptanceに確認可能な条件を3つ書く。\");",
    "hints": [
      "入力と観察できる結果をセットで書く。",
      "前の項目は残し、今回の項目だけを編集する。",
      "カンマ・二重引用符・括弧の対応を確認しよう。"
    ],
    "terms": [
      "要件定義",
      "受入条件",
      "テスト"
    ],
    "question": {
      "text": "今回の設計書は何に使う？",
      "options": [
        "目的と合格条件を共有する",
        "STLの三角形を増やす",
        "画面を自動的に美しくする"
      ],
      "answer": 0,
      "explain": "設計書は実装と確認の基準になります。"
    },
    "builds": "アプリの仕様書",
    "mode": "replace",
    "reference": "https://developer.mozilla.org/ja/docs/Learn_web_development/Getting_started/Your_first_website/What_will_your_website_look_like"
  },
  {
    "id": 4,
    "chapter": 0,
    "title": "フローチャートを考える",
    "file": "requirements.json",
    "intro": "フローチャートは処理の分かれ道を図にしたものです。開始 → ファイル選択 → 形式は正しい？ → はい：表示 / いいえ：エラー表示、と考えます。\n\n成功の一本道だけでなく、失敗したときの戻り道も設計します。このJSONではまず箱のラベルを配列にします。メモに矢印と分岐を書いてみましょう。",
    "task": "flowに「形式を検証」を含む6段階以上の処理を書く。",
    "starter": "{\n  \"goal\": \"STLを登録し組立手順を編集して再生する\",\n  \"users\": [\n    \"CAD設計者\",\n    \"組立手順を見る人\"\n  ],\n  \"useCases\": [\n    \"STLを複数登録する\",\n    \"部品を選んで位置を変える\",\n    \"組立順を変える\",\n    \"再生する\"\n  ],\n  \"acceptance\": [\n    \"3つのSTLを一覧に表示できる\",\n    \"順番変更が再生に反映される\",\n    \"保存JSONを再読込すると設定が戻る\"\n  ],\n  \"flow\": \"TODO\"\n}",
    "solution": "{\n  \"goal\": \"STLを登録し組立手順を編集して再生する\",\n  \"users\": [\n    \"CAD設計者\",\n    \"組立手順を見る人\"\n  ],\n  \"useCases\": [\n    \"STLを複数登録する\",\n    \"部品を選んで位置を変える\",\n    \"組立順を変える\",\n    \"再生する\"\n  ],\n  \"acceptance\": [\n    \"3つのSTLを一覧に表示できる\",\n    \"順番変更が再生に反映される\",\n    \"保存JSONを再読込すると設定が戻る\"\n  ],\n  \"flow\": [\n    \"開始\",\n    \"STLを選ぶ\",\n    \"形式を検証\",\n    \"成功なら表示\",\n    \"失敗なら理由を表示\",\n    \"部品を編集\",\n    \"保存\"\n  ]\n}",
    "test": "const list=JSON.parse(files[\"requirements.json\"])[\"flow\"];assert(Array.isArray(list)&&list.every(x=>typeof x===\"string\"&&x.trim().length>0),\"項目は空でない文字列の配列にしよう\");assert(JSON.parse(files['requirements.json']).flow.includes('形式を検証')&&JSON.parse(files['requirements.json']).flow.length>=6, \"flowに「形式を検証」を含む6段階以上の処理を書く。\");",
    "hints": [
      "検証は、読み込み前に形式や大きさを調べる段階。",
      "前の項目は残し、今回の項目だけを編集する。",
      "カンマ・二重引用符・括弧の対応を確認しよう。"
    ],
    "terms": [
      "フローチャート",
      "分岐",
      "検証"
    ],
    "question": {
      "text": "今回の設計書は何に使う？",
      "options": [
        "目的と合格条件を共有する",
        "STLの三角形を増やす",
        "画面を自動的に美しくする"
      ],
      "answer": 0,
      "explain": "設計書は実装と確認の基準になります。"
    },
    "builds": "アプリの仕様書",
    "mode": "replace",
    "reference": "https://developer.mozilla.org/ja/docs/Learn_web_development/Getting_started/Your_first_website/What_will_your_website_look_like"
  },
  {
    "id": 5,
    "chapter": 0,
    "title": "ファイルの役割を分ける",
    "file": "requirements.json",
    "intro": "ファイル構成は、道具を引き出しごとに分ける考え方です。全部を1つに書くと、透明化を直したいのに保存処理まで探すことになります。\n\nHTMLは画面の骨格、CSSは見た目、JavaScriptは動作。JavaScriptもSTL・UI・手順計算の責任ごとに分けます。依存関係はapp.jsが各機能をつなぐ形にします。このキットではapp.jsの配線コードを同梱し、各章で自作する関数を順に接続します。未実装の機能は、必要な関数ができるまで使えません。最後にapp.jsを読み、イベントから関数を呼ぶつながりを追ってみましょう。",
    "task": "filesに5ファイル以上の役割を書き、parts.jsも含める。",
    "starter": "{\n  \"goal\": \"STLを登録し組立手順を編集して再生する\",\n  \"users\": [\n    \"CAD設計者\",\n    \"組立手順を見る人\"\n  ],\n  \"useCases\": [\n    \"STLを複数登録する\",\n    \"部品を選んで位置を変える\",\n    \"組立順を変える\",\n    \"再生する\"\n  ],\n  \"acceptance\": [\n    \"3つのSTLを一覧に表示できる\",\n    \"順番変更が再生に反映される\",\n    \"保存JSONを再読込すると設定が戻る\"\n  ],\n  \"flow\": [\n    \"開始\",\n    \"STLを選ぶ\",\n    \"形式を検証\",\n    \"成功なら表示\",\n    \"失敗なら理由を表示\",\n    \"部品を編集\",\n    \"保存\"\n  ],\n  \"files\": \"TODO\"\n}",
    "solution": "{\n  \"goal\": \"STLを登録し組立手順を編集して再生する\",\n  \"users\": [\n    \"CAD設計者\",\n    \"組立手順を見る人\"\n  ],\n  \"useCases\": [\n    \"STLを複数登録する\",\n    \"部品を選んで位置を変える\",\n    \"組立順を変える\",\n    \"再生する\"\n  ],\n  \"acceptance\": [\n    \"3つのSTLを一覧に表示できる\",\n    \"順番変更が再生に反映される\",\n    \"保存JSONを再読込すると設定が戻る\"\n  ],\n  \"flow\": [\n    \"開始\",\n    \"STLを選ぶ\",\n    \"形式を検証\",\n    \"成功なら表示\",\n    \"失敗なら理由を表示\",\n    \"部品を編集\",\n    \"保存\"\n  ],\n  \"files\": {\n    \"index.html\": \"画面の構造\",\n    \"style.css\": \"見た目\",\n    \"app.js\": \"機能をつなぐ\",\n    \"parts.js\": \"STLを扱う\",\n    \"sequence.js\": \"組立手順を計算する\"\n  }\n}",
    "test": "assert(Object.keys(JSON.parse(files['requirements.json']).files).includes('parts.js')&&Object.keys(JSON.parse(files['requirements.json']).files).length>=5, \"filesに5ファイル以上の役割を書き、parts.jsも含める。\");",
    "hints": [
      "filesの中にも { \"ファイル名\": \"役割\" } を書ける。",
      "前の項目は残し、今回の項目だけを編集する。",
      "カンマ・二重引用符・括弧の対応を確認しよう。"
    ],
    "terms": [
      "責任分担",
      "ファイル構成",
      "モジュール"
    ],
    "question": {
      "text": "今回の設計書は何に使う？",
      "options": [
        "目的と合格条件を共有する",
        "STLの三角形を増やす",
        "画面を自動的に美しくする"
      ],
      "answer": 0,
      "explain": "設計書は実装と確認の基準になります。"
    },
    "builds": "アプリの仕様書",
    "mode": "replace",
    "reference": "https://developer.mozilla.org/ja/docs/Learn_web_development/Getting_started/Your_first_website/What_will_your_website_look_like"
  },
  {
    "id": 6,
    "chapter": 0,
    "title": "性能と制約を決める",
    "file": "requirements.json",
    "intro": "非機能要件は、機能の品質や制約の約束です。大きなSTLを無制限に読み込むと、ブラウザのメモリを使い切ることがあります。この教材は1ファイル20MB、30部品までを目安にします。\n\nSTLは通常、単位を記録しません。数値100を100mmとして扱う、とアプリ側で決めます。trueは真、falseは偽を表す値です。",
    "task": "limitsにmaxFileMB:20とunit:\"mm\"を書く。",
    "starter": "{\n  \"goal\": \"STLを登録し組立手順を編集して再生する\",\n  \"users\": [\n    \"CAD設計者\",\n    \"組立手順を見る人\"\n  ],\n  \"useCases\": [\n    \"STLを複数登録する\",\n    \"部品を選んで位置を変える\",\n    \"組立順を変える\",\n    \"再生する\"\n  ],\n  \"acceptance\": [\n    \"3つのSTLを一覧に表示できる\",\n    \"順番変更が再生に反映される\",\n    \"保存JSONを再読込すると設定が戻る\"\n  ],\n  \"flow\": [\n    \"開始\",\n    \"STLを選ぶ\",\n    \"形式を検証\",\n    \"成功なら表示\",\n    \"失敗なら理由を表示\",\n    \"部品を編集\",\n    \"保存\"\n  ],\n  \"files\": {\n    \"index.html\": \"画面の構造\",\n    \"style.css\": \"見た目\",\n    \"app.js\": \"機能をつなぐ\",\n    \"parts.js\": \"STLを扱う\",\n    \"sequence.js\": \"組立手順を計算する\"\n  },\n  \"limits\": \"TODO\"\n}",
    "solution": "{\n  \"goal\": \"STLを登録し組立手順を編集して再生する\",\n  \"users\": [\n    \"CAD設計者\",\n    \"組立手順を見る人\"\n  ],\n  \"useCases\": [\n    \"STLを複数登録する\",\n    \"部品を選んで位置を変える\",\n    \"組立順を変える\",\n    \"再生する\"\n  ],\n  \"acceptance\": [\n    \"3つのSTLを一覧に表示できる\",\n    \"順番変更が再生に反映される\",\n    \"保存JSONを再読込すると設定が戻る\"\n  ],\n  \"flow\": [\n    \"開始\",\n    \"STLを選ぶ\",\n    \"形式を検証\",\n    \"成功なら表示\",\n    \"失敗なら理由を表示\",\n    \"部品を編集\",\n    \"保存\"\n  ],\n  \"files\": {\n    \"index.html\": \"画面の構造\",\n    \"style.css\": \"見た目\",\n    \"app.js\": \"機能をつなぐ\",\n    \"parts.js\": \"STLを扱う\",\n    \"sequence.js\": \"組立手順を計算する\"\n  },\n  \"limits\": {\n    \"maxFileMB\": 20,\n    \"maxParts\": 30,\n    \"unit\": \"mm\",\n    \"localOnly\": true\n  }\n}",
    "test": "assert(JSON.parse(files['requirements.json']).limits.maxFileMB===20&&JSON.parse(files['requirements.json']).limits.unit==='mm', \"limitsにmaxFileMB:20とunit:\\\"mm\\\"を書く。\");",
    "hints": [
      "数字20には引用符を付けない。mmは文字列なので付ける。",
      "前の項目は残し、今回の項目だけを編集する。",
      "カンマ・二重引用符・括弧の対応を確認しよう。"
    ],
    "terms": [
      "非機能要件",
      "単位",
      "メモリ"
    ],
    "question": {
      "text": "今回の設計書は何に使う？",
      "options": [
        "目的と合格条件を共有する",
        "STLの三角形を増やす",
        "画面を自動的に美しくする"
      ],
      "answer": 0,
      "explain": "設計書は実装と確認の基準になります。"
    },
    "builds": "アプリの仕様書",
    "mode": "replace",
    "reference": "https://developer.mozilla.org/ja/docs/Learn_web_development/Getting_started/Your_first_website/What_will_your_website_look_like"
  },
  {
    "id": 7,
    "chapter": 0,
    "title": "できない自動判定も設計する",
    "file": "requirements.json",
    "intro": "STLが教えてくれるのは三角形の形です。「この部品は基板」「この順番が正しい」という意味は通常入っていません。分からないことを決めつけず、利用者が修正できるUIを作ります。\n\n前提条件を書くと、アプリが保証することと、人が決めることが明確になります。要求→要件→受入条件の3つを自分の言葉で説明してから次へ進みましょう。",
    "task": "assumptionsに自動判定の限界と利用者の修正を2項目で書く。",
    "starter": "{\n  \"goal\": \"STLを登録し組立手順を編集して再生する\",\n  \"users\": [\n    \"CAD設計者\",\n    \"組立手順を見る人\"\n  ],\n  \"useCases\": [\n    \"STLを複数登録する\",\n    \"部品を選んで位置を変える\",\n    \"組立順を変える\",\n    \"再生する\"\n  ],\n  \"acceptance\": [\n    \"3つのSTLを一覧に表示できる\",\n    \"順番変更が再生に反映される\",\n    \"保存JSONを再読込すると設定が戻る\"\n  ],\n  \"flow\": [\n    \"開始\",\n    \"STLを選ぶ\",\n    \"形式を検証\",\n    \"成功なら表示\",\n    \"失敗なら理由を表示\",\n    \"部品を編集\",\n    \"保存\"\n  ],\n  \"files\": {\n    \"index.html\": \"画面の構造\",\n    \"style.css\": \"見た目\",\n    \"app.js\": \"機能をつなぐ\",\n    \"parts.js\": \"STLを扱う\",\n    \"sequence.js\": \"組立手順を計算する\"\n  },\n  \"limits\": {\n    \"maxFileMB\": 20,\n    \"maxParts\": 30,\n    \"unit\": \"mm\",\n    \"localOnly\": true\n  },\n  \"assumptions\": \"TODO\"\n}",
    "solution": "{\n  \"goal\": \"STLを登録し組立手順を編集して再生する\",\n  \"users\": [\n    \"CAD設計者\",\n    \"組立手順を見る人\"\n  ],\n  \"useCases\": [\n    \"STLを複数登録する\",\n    \"部品を選んで位置を変える\",\n    \"組立順を変える\",\n    \"再生する\"\n  ],\n  \"acceptance\": [\n    \"3つのSTLを一覧に表示できる\",\n    \"順番変更が再生に反映される\",\n    \"保存JSONを再読込すると設定が戻る\"\n  ],\n  \"flow\": [\n    \"開始\",\n    \"STLを選ぶ\",\n    \"形式を検証\",\n    \"成功なら表示\",\n    \"失敗なら理由を表示\",\n    \"部品を編集\",\n    \"保存\"\n  ],\n  \"files\": {\n    \"index.html\": \"画面の構造\",\n    \"style.css\": \"見た目\",\n    \"app.js\": \"機能をつなぐ\",\n    \"parts.js\": \"STLを扱う\",\n    \"sequence.js\": \"組立手順を計算する\"\n  },\n  \"limits\": {\n    \"maxFileMB\": 20,\n    \"maxParts\": 30,\n    \"unit\": \"mm\",\n    \"localOnly\": true\n  },\n  \"assumptions\": [\n    \"STLから部品の役割や正しい組立順は自動確定できない\",\n    \"組立位置と順番は利用者が修正できる\"\n  ]\n}",
    "test": "const list=JSON.parse(files[\"requirements.json\"])[\"assumptions\"];assert(Array.isArray(list)&&list.every(x=>typeof x===\"string\"&&x.trim().length>0),\"項目は空でない文字列の配列にしよう\");assert(JSON.parse(files['requirements.json']).assumptions.length>=2, \"assumptionsに自動判定の限界と利用者の修正を2項目で書く。\");",
    "hints": [
      "「形」と「意味」を分けて考える。",
      "前の項目は残し、今回の項目だけを編集する。",
      "カンマ・二重引用符・括弧の対応を確認しよう。"
    ],
    "terms": [
      "前提条件",
      "設計判断",
      "STL"
    ],
    "question": {
      "text": "今回の設計書は何に使う？",
      "options": [
        "目的と合格条件を共有する",
        "STLの三角形を増やす",
        "画面を自動的に美しくする"
      ],
      "answer": 0,
      "explain": "設計書は実装と確認の基準になります。"
    },
    "builds": "アプリの仕様書",
    "mode": "replace",
    "reference": "https://developer.mozilla.org/ja/docs/Learn_web_development/Getting_started/Your_first_website/What_will_your_website_look_like"
  },
  {
    "id": 8,
    "chapter": 1,
    "title": "ホーム画面に目的を置く",
    "file": "index.html",
    "intro": "HTMLのタグは、画面の部品に名前を付ける印です。<h2>は見出し、<p>は段落、<button>はボタン。開始タグと終了タグで中身を挟みます。\n\nidは画面の中で1つだけの識別名。CADの部品名のように、後からJavaScriptがその部品を見つける手がかりになります。",
    "task": "homeというidのsectionとopen-workshopボタンを追加する。",
    "starter": "<!doctype html>\n<html lang=\"ja\">\n<head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>組立ビューア</title><link rel=\"stylesheet\" href=\"style.css\"><script type=\"importmap\">{\"imports\":{\"three\":\"https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js\",\"three/addons/\":\"https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/\"}}</script></head>\n<body>\n<h1>組立ビューア</h1>\n<div id=\"app\"></div>\n<!-- ここに画面を追加 -->\n<script type=\"module\" src=\"app.js\"></script>\n</body>\n</html>",
    "solution": "<!doctype html>\n<html lang=\"ja\">\n<head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>組立ビューア</title><link rel=\"stylesheet\" href=\"style.css\"><script type=\"importmap\">{\"imports\":{\"three\":\"https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js\",\"three/addons/\":\"https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/\"}}</script></head>\n<body>\n<h1>組立ビューア</h1>\n<div id=\"app\"></div>\n<section id=\"home\"><h2>STLから組立手順をつくろう</h2><p>部品を登録し、並べて再生する作業場です。</p><button id=\"open-workshop\">作業場を開く</button></section>\n<!-- ここに画面を追加 -->\n<script type=\"module\" src=\"app.js\"></script>\n</body>\n</html>",
    "test": "assert(document.getElementById(\"home\"),\"homeの要素が必要です\");",
    "hints": [
      "<!-- ここに画面を追加 -->の直前に新しいタグを書く。",
      "idのスペルはJavaScriptとの接続口なので、そのまま合わせる。",
      "既存のhead・body・app.jsの読み込みは残す。"
    ],
    "terms": [
      "HTML",
      "タグ",
      "id"
    ],
    "question": {
      "text": "idの役割は？",
      "options": [
        "その要素を識別する名前",
        "文字を太くする記号",
        "画像形式"
      ],
      "answer": 0,
      "explain": "JavaScriptやCSSから特定の要素を指定できます。"
    },
    "builds": "ホームと作業場のHTML",
    "mode": "replace",
    "reference": "https://developer.mozilla.org/ja/docs/Learn_web_development/Core/Structuring_content"
  },
  {
    "id": 9,
    "chapter": 1,
    "title": "作業場と3Dの置き場",
    "file": "index.html",
    "intro": "画面を別のsectionに分けると、ホームと作業場を切り替えられます。hidden属性は要素を隠す印です。今はまだボタンを押しても動きません。動作は次の章で作ります。\n\n3Dはcanvasという描画面に映ります。まずcanvasを入れる空のdivを作ります。図面で機器の設置スペースを確保する段階に似ています。",
    "task": "workshopと、その中にviewportのdivを追加する。",
    "starter": "<!doctype html>\n<html lang=\"ja\">\n<head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>組立ビューア</title><link rel=\"stylesheet\" href=\"style.css\"><script type=\"importmap\">{\"imports\":{\"three\":\"https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js\",\"three/addons/\":\"https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/\"}}</script></head>\n<body>\n<h1>組立ビューア</h1>\n<div id=\"app\"></div>\n<section id=\"home\"><h2>STLから組立手順をつくろう</h2><p>部品を登録し、並べて再生する作業場です。</p><button id=\"open-workshop\">作業場を開く</button></section>\n<!-- ここに画面を追加 -->\n<script type=\"module\" src=\"app.js\"></script>\n</body>\n</html>",
    "solution": "<!doctype html>\n<html lang=\"ja\">\n<head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>組立ビューア</title><link rel=\"stylesheet\" href=\"style.css\"><script type=\"importmap\">{\"imports\":{\"three\":\"https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js\",\"three/addons/\":\"https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/\"}}</script></head>\n<body>\n<h1>組立ビューア</h1>\n<div id=\"app\"></div>\n<section id=\"home\"><h2>STLから組立手順をつくろう</h2><p>部品を登録し、並べて再生する作業場です。</p><button id=\"open-workshop\">作業場を開く</button></section>\n<section id=\"workshop\" hidden><h2>組立作業場</h2><button id=\"back-home\">ホームへ戻る</button><div id=\"viewport\" aria-label=\"3Dビュー\"></div></section>\n<!-- ここに画面を追加 -->\n<script type=\"module\" src=\"app.js\"></script>\n</body>\n</html>",
    "test": "assert(document.getElementById(\"viewport\"),\"viewportの要素が必要です\");",
    "hints": [
      "<!-- ここに画面を追加 -->の直前に新しいタグを書く。",
      "idのスペルはJavaScriptとの接続口なので、そのまま合わせる。",
      "既存のhead・body・app.jsの読み込みは残す。"
    ],
    "terms": [
      "section",
      "hidden",
      "canvas"
    ],
    "question": {
      "text": "idの役割は？",
      "options": [
        "その要素を識別する名前",
        "文字を太くする記号",
        "画像形式"
      ],
      "answer": 0,
      "explain": "JavaScriptやCSSから特定の要素を指定できます。"
    },
    "builds": "ホームと作業場のHTML",
    "mode": "replace",
    "reference": "https://developer.mozilla.org/ja/docs/Learn_web_development/Core/Structuring_content"
  },
  {
    "id": 10,
    "chapter": 1,
    "title": "複数STLの入口をつくる",
    "file": "index.html",
    "intro": "inputは利用者から値を受け取る入口。type=\"file\"でファイル選択、multipleで複数選択、accept=\".stl\"で選ぶ形式の目安を指定できます。acceptだけで内容の安全性や形式は保証できないので、後で検証します。\n\nlabelは入力欄の説明。role=\"status\"は結果のお知らせであることを支援技術へ伝えます。見た目だけでなく、何を操作するのか伝わる画面を作ります。",
    "task": "multiple付きのstl-files入力とstatus表示を追加する。",
    "starter": "<!doctype html>\n<html lang=\"ja\">\n<head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>組立ビューア</title><link rel=\"stylesheet\" href=\"style.css\"><script type=\"importmap\">{\"imports\":{\"three\":\"https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js\",\"three/addons/\":\"https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/\"}}</script></head>\n<body>\n<h1>組立ビューア</h1>\n<div id=\"app\"></div>\n<section id=\"home\"><h2>STLから組立手順をつくろう</h2><p>部品を登録し、並べて再生する作業場です。</p><button id=\"open-workshop\">作業場を開く</button></section>\n<section id=\"workshop\" hidden><h2>組立作業場</h2><button id=\"back-home\">ホームへ戻る</button><div id=\"viewport\" aria-label=\"3Dビュー\"></div></section>\n<!-- ここに画面を追加 -->\n<script type=\"module\" src=\"app.js\"></script>\n</body>\n</html>",
    "solution": "<!doctype html>\n<html lang=\"ja\">\n<head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>組立ビューア</title><link rel=\"stylesheet\" href=\"style.css\"><script type=\"importmap\">{\"imports\":{\"three\":\"https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js\",\"three/addons/\":\"https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/\"}}</script></head>\n<body>\n<h1>組立ビューア</h1>\n<div id=\"app\"></div>\n<section id=\"home\"><h2>STLから組立手順をつくろう</h2><p>部品を登録し、並べて再生する作業場です。</p><button id=\"open-workshop\">作業場を開く</button></section>\n<section id=\"workshop\" hidden><h2>組立作業場</h2><button id=\"back-home\">ホームへ戻る</button><div id=\"viewport\" aria-label=\"3Dビュー\"></div></section>\n<section id=\"file-panel\"><label>STLファイル <input id=\"stl-files\" type=\"file\" accept=\".stl\" multiple></label><button id=\"sample\">練習用CubeSatを開く</button><p id=\"status\" role=\"status\">ファイルを選んでください</p></section>\n<!-- ここに画面を追加 -->\n<script type=\"module\" src=\"app.js\"></script>\n</body>\n</html>",
    "test": "assert(document.getElementById(\"stl-files\"),\"stl-filesの要素が必要です\");assert(document.getElementById(\"stl-files\").multiple,\"multipleで複数選択にしよう\");",
    "hints": [
      "<!-- ここに画面を追加 -->の直前に新しいタグを書く。",
      "idのスペルはJavaScriptとの接続口なので、そのまま合わせる。",
      "既存のhead・body・app.jsの読み込みは残す。"
    ],
    "terms": [
      "input",
      "属性",
      "アクセシビリティ"
    ],
    "question": {
      "text": "idの役割は？",
      "options": [
        "その要素を識別する名前",
        "文字を太くする記号",
        "画像形式"
      ],
      "answer": 0,
      "explain": "JavaScriptやCSSから特定の要素を指定できます。"
    },
    "builds": "ホームと作業場のHTML",
    "mode": "replace",
    "reference": "https://developer.mozilla.org/ja/docs/Learn_web_development/Core/Structuring_content"
  },
  {
    "id": 11,
    "chapter": 1,
    "title": "部品一覧と時間軸の置き場",
    "file": "index.html",
    "intro": "CADのツリーと同じように、部品一覧と選択中の部品の設定欄を分けます。手順は順番が大切なのでol（順序付きリスト）を使います。\n\n表示するデータはまだありません。最初に画面の受け皿を用意し、その後でJavaScriptから中身を流し込む作り方です。",
    "task": "part-list・inspector・steps・play・timelineを持つ操作パネルを追加する。",
    "starter": "<!doctype html>\n<html lang=\"ja\">\n<head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>組立ビューア</title><link rel=\"stylesheet\" href=\"style.css\"><script type=\"importmap\">{\"imports\":{\"three\":\"https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js\",\"three/addons/\":\"https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/\"}}</script></head>\n<body>\n<h1>組立ビューア</h1>\n<div id=\"app\"></div>\n<section id=\"home\"><h2>STLから組立手順をつくろう</h2><p>部品を登録し、並べて再生する作業場です。</p><button id=\"open-workshop\">作業場を開く</button></section>\n<section id=\"workshop\" hidden><h2>組立作業場</h2><button id=\"back-home\">ホームへ戻る</button><div id=\"viewport\" aria-label=\"3Dビュー\"></div></section>\n<section id=\"file-panel\"><label>STLファイル <input id=\"stl-files\" type=\"file\" accept=\".stl\" multiple></label><button id=\"sample\">練習用CubeSatを開く</button><p id=\"status\" role=\"status\">ファイルを選んでください</p></section>\n<!-- ここに画面を追加 -->\n<script type=\"module\" src=\"app.js\"></script>\n</body>\n</html>",
    "solution": "<!doctype html>\n<html lang=\"ja\">\n<head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>組立ビューア</title><link rel=\"stylesheet\" href=\"style.css\"><script type=\"importmap\">{\"imports\":{\"three\":\"https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js\",\"three/addons/\":\"https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/\"}}</script></head>\n<body>\n<h1>組立ビューア</h1>\n<div id=\"app\"></div>\n<section id=\"home\"><h2>STLから組立手順をつくろう</h2><p>部品を登録し、並べて再生する作業場です。</p><button id=\"open-workshop\">作業場を開く</button></section>\n<section id=\"workshop\" hidden><h2>組立作業場</h2><button id=\"back-home\">ホームへ戻る</button><div id=\"viewport\" aria-label=\"3Dビュー\"></div></section>\n<section id=\"file-panel\"><label>STLファイル <input id=\"stl-files\" type=\"file\" accept=\".stl\" multiple></label><button id=\"sample\">練習用CubeSatを開く</button><p id=\"status\" role=\"status\">ファイルを選んでください</p></section>\n<aside id=\"part-panel\"><h2>部品一覧</h2><div id=\"part-list\"></div><div id=\"inspector\"></div></aside><section id=\"timeline-panel\"><h2>組立手順</h2><ol id=\"steps\"></ol><button id=\"play\">再生</button><button id=\"stop\">停止</button><input id=\"timeline\" type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" value=\"0\" aria-label=\"再生位置\"></section>\n<!-- ここに画面を追加 -->\n<script type=\"module\" src=\"app.js\"></script>\n</body>\n</html>",
    "test": "assert(document.getElementById(\"part-list\"),\"part-listの要素が必要です\");assert(document.querySelector(\"#timeline[type=range]\")&&document.querySelector(\"#steps\")&&document.querySelector(\"#inspector\"),\"操作パネルの要素を揃えよう\");",
    "hints": [
      "<!-- ここに画面を追加 -->の直前に新しいタグを書く。",
      "idのスペルはJavaScriptとの接続口なので、そのまま合わせる。",
      "既存のhead・body・app.jsの読み込みは残す。"
    ],
    "terms": [
      "DOM",
      "ol",
      "range"
    ],
    "question": {
      "text": "idの役割は？",
      "options": [
        "その要素を識別する名前",
        "文字を太くする記号",
        "画像形式"
      ],
      "answer": 0,
      "explain": "JavaScriptやCSSから特定の要素を指定できます。"
    },
    "builds": "ホームと作業場のHTML",
    "mode": "replace",
    "reference": "https://developer.mozilla.org/ja/docs/Learn_web_development/Core/Structuring_content"
  },
  {
    "id": 12,
    "chapter": 1,
    "title": "暗い作業場の配色",
    "file": "style.css",
    "intro": "CSSは見た目を指定する言語。body { ... }はbody全体への指定です。プロパティ: 値; を並べます。HTMLが機械の骨格なら、CSSは塗装・余白・配置です。\n\n#080e18は赤・緑・青の強さを16進数で表した色。暗い背景に明るい文字を置き、コントラストを保ちます。",
    "task": "bodyの背景色を#080e18にする。",
    "starter": "/* TODO: bodyの背景色を#080e18にする。 */\n",
    "solution": "body { margin: 0; background: #080e18; color: #dde8f4; font-family: sans-serif; font-size: 16px; }\n",
    "test": "assert(getComputedStyle(document.body).backgroundColor===\"rgb(8, 14, 24)\",\"bodyの背景色を#080e18にする。\");",
    "hints": [
      "セレクター { プロパティ: 値; } の形で書く。",
      "数値の後のpx・vhと、行末のセミコロンを確かめる。",
      "追加したCSSはプレビュー全体へ反映されます。"
    ],
    "terms": [
      "CSS",
      "プロパティ",
      "色"
    ],
    "question": {
      "text": "paddingはどこの余白？",
      "options": [
        "要素の内側",
        "STLの中空部分",
        "ファイル名の前"
      ],
      "answer": 0,
      "explain": "枠線と中身の間がpaddingです。"
    },
    "builds": "操作しやすい画面のCSS",
    "mode": "append",
    "reference": "https://developer.mozilla.org/ja/docs/Learn_web_development/Core/Structuring_content"
  },
  {
    "id": 13,
    "chapter": 1,
    "title": "ボタンを押しやすくする",
    "file": "style.css",
    "intro": "セレクターbuttonはすべてのbuttonを選びます。paddingは内側の余白、borderは枠線、border-radiusは角の丸み。単位pxは画面上の長さです。\n\n操作対象を44px以上の高さにすると、小さなボタンより押しやすくなります。CADの寸法と同様に、見た目を数値で調整します。",
    "task": "buttonのmin-heightを44px以上にする。",
    "starter": "/* TODO: buttonのmin-heightを44px以上にする。 */\n",
    "solution": "button { min-height: 44px; padding: 10px 16px; border: 1px solid #40516a; border-radius: 6px; background: #b5f46b; color: #152009; cursor: pointer; }\n",
    "test": "assert(parseFloat(getComputedStyle(document.querySelector(\"button\")).minHeight)>=44,\"buttonのmin-heightを44px以上にする。\");",
    "hints": [
      "セレクター { プロパティ: 値; } の形で書く。",
      "数値の後のpx・vhと、行末のセミコロンを確かめる。",
      "追加したCSSはプレビュー全体へ反映されます。"
    ],
    "terms": [
      "セレクター",
      "padding",
      "px"
    ],
    "question": {
      "text": "paddingはどこの余白？",
      "options": [
        "要素の内側",
        "STLの中空部分",
        "ファイル名の前"
      ],
      "answer": 0,
      "explain": "枠線と中身の間がpaddingです。"
    },
    "builds": "操作しやすい画面のCSS",
    "mode": "append",
    "reference": "https://developer.mozilla.org/ja/docs/Learn_web_development/Core/Structuring_content"
  },
  {
    "id": 14,
    "chapter": 1,
    "title": "3D画面の大きさを確保",
    "file": "style.css",
    "intro": "#viewportというセレクターは、そのidの要素だけを選びます。%は親の大きさに対する割合、vhは表示画面の高さに対する割合です。60vhは画面の高さの60%。\n\ncanvasは描画する解像度とCSS上の表示サイズが別です。ここでは置き場を決め、後でRenderer側も同じサイズへ合わせます。",
    "task": "viewportにmin-height:420pxとheight:60vhを指定する。",
    "starter": "/* TODO: viewportにmin-height:420pxとheight:60vhを指定する。 */\n",
    "solution": "#viewport { width: 100%; min-height: 420px; height: 60vh; background: #0c1727; }\n#viewport canvas { display: block; width: 100%; height: 100%; }\n",
    "test": "assert(parseFloat(getComputedStyle(document.querySelector(\"#viewport\")).minHeight)>=420,\"viewportにmin-height:420pxとheight:60vhを指定する。\");",
    "hints": [
      "セレクター { プロパティ: 値; } の形で書く。",
      "数値の後のpx・vhと、行末のセミコロンを確かめる。",
      "追加したCSSはプレビュー全体へ反映されます。"
    ],
    "terms": [
      "vh",
      "canvas",
      "レスポンシブ"
    ],
    "question": {
      "text": "paddingはどこの余白？",
      "options": [
        "要素の内側",
        "STLの中空部分",
        "ファイル名の前"
      ],
      "answer": 0,
      "explain": "枠線と中身の間がpaddingです。"
    },
    "builds": "操作しやすい画面のCSS",
    "mode": "append",
    "reference": "https://developer.mozilla.org/ja/docs/Learn_web_development/Core/Structuring_content"
  },
  {
    "id": 15,
    "chapter": 1,
    "title": "パネルの余白と折り返し",
    "file": "style.css",
    "intro": "Flexboxは要素を横や縦に並べる仕組み。gapは部品間の間隔、flex-wrap:wrapは入らないものを次の行へ回します。CADの自動整列に近い発想です。\n\n@mediaは画面幅による条件分岐。小さい画面では余白を減らします。hiddenは画面切替に使うので、他のdisplay指定で打ち消されないようにします。",
    "task": "part-listをflexで並べ、wrapで折り返す。",
    "starter": "/* TODO: part-listをflexで並べ、wrapで折り返す。 */\n",
    "solution": "section, aside { padding: 20px; }\n#part-list { display: flex; gap: 8px; flex-wrap: wrap; }\ninput, select { font: inherit; max-width: 100%; }\n[hidden] { display: none !important; }\n@media (max-width: 600px) { section, aside { padding: 12px; } }\n",
    "test": "assert(getComputedStyle(document.querySelector(\"#part-list\")).display===\"flex\"&&getComputedStyle(document.querySelector(\"#part-list\")).flexWrap===\"wrap\",\"part-listをflexで並べ、wrapで折り返す。\");",
    "hints": [
      "セレクター { プロパティ: 値; } の形で書く。",
      "数値の後のpx・vhと、行末のセミコロンを確かめる。",
      "追加したCSSはプレビュー全体へ反映されます。"
    ],
    "terms": [
      "Flexbox",
      "メディアクエリ",
      "余白"
    ],
    "question": {
      "text": "paddingはどこの余白？",
      "options": [
        "要素の内側",
        "STLの中空部分",
        "ファイル名の前"
      ],
      "answer": 0,
      "explain": "枠線と中身の間がpaddingです。"
    },
    "builds": "操作しやすい画面のCSS",
    "mode": "append",
    "reference": "https://developer.mozilla.org/ja/docs/Learn_web_development/Core/Structuring_content"
  },
  {
    "id": 16,
    "chapter": 2,
    "title": "状態をオブジェクトにまとめる",
    "file": "state.js",
    "intro": "状態はアプリが今どうなっているかの記録。CADで「どの部品が選ばれ、どの画面を見ているか」をまとめたものです。\n\nconstは名前付きの値を作ります。関数は処理を名前付きでまとめる道具。exportすると別ファイルから呼べます。nullは、まだ何も選んでいないことを表します。",
    "task": "空のparts配列、selectedId:null、screen:\"home\"を返す。",
    "starter": "// 空のparts配列、selectedId:null、screen:\"home\"を返す。\nexport function initialState() {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function initialState() {\n  return { parts: [], selectedId: null, screen: 'home' };\n}\n",
    "test": "const m=await load(\"state.js\");const s=m.initialState();assert(Array.isArray(s.parts)&&s.parts.length===0&&s.selectedId===null&&s.screen===\"home\",\"部品なし・未選択・ホームの初期状態にしよう\");",
    "hints": [
      "return { parts: [], selectedId: null, screen: \"home\" };",
      "関数 initialState の引数は なし。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "状態",
      "関数",
      "export"
    ],
    "question": {
      "text": "オブジェクトは何に似ている？",
      "options": [
        "名前付きの項目をまとめた部品表",
        "1枚の画像",
        "保存ボタン"
      ],
      "answer": 0,
      "explain": "名前と値を組にして扱うデータです。"
    },
    "builds": "アプリの初期状態",
    "mode": "append",
    "reference": "https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide"
  },
  {
    "id": 17,
    "chapter": 2,
    "title": "部品レコードを作る",
    "file": "state.js",
    "intro": "レコードは1件分の記録。形のデータと、名前・位置・色などの設定を分けます。同じ形でも設定を変えれば違う表示になります。\n\n関数の丸括弧に並ぶidとnameは引数です。呼び出す側が渡した値を、そのまま部品の記録へ入れます。{ id }は{ id: id }の省略形です。",
    "task": "id・nameと初期の色・透明度・表示・位置・回転を返す。",
    "starter": "// id・nameと初期の色・透明度・表示・位置・回転を返す。\nexport function makePartRecord(id, name) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function makePartRecord(id, name) {\n  return { id, name, color: '#55c6d9', opacity: 1, visible: true, position: [0,0,0], rotation: [0,0,0] };\n}\n",
    "test": "const m=await load(\"state.js\");const p=m.makePartRecord(\"p1\",\"基板\");assert(p.id===\"p1\"&&p.name===\"基板\"&&p.opacity===1&&p.position.length===3&&p.rotation.length===3,\"部品の設定項目を揃えよう\");",
    "hints": [
      "positionとrotationは3要素の配列。opacityは1、visibleはtrue。",
      "関数 makePartRecord の引数は id, name。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "レコード",
      "引数",
      "配列"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "部品のデータ形式",
    "mode": "append",
    "reference": "https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide"
  },
  {
    "id": 18,
    "chapter": 2,
    "title": "名前を安全に変更する",
    "file": "state.js",
    "intro": "...recordは記録の項目をコピーする書き方。後からnameを置くと、その項目だけ上書きできます。元の記録を残すので、変更前後を比べやすくなります。\n\ntrim()は両端の空白を除きます。||は左側が空なら右側を使う書き方。名前が空なら、元の名前を保ちます。",
    "task": "前後の空白を除いた名前へ変更し、元のrecordは変更しない。",
    "starter": "// 前後の空白を除いた名前へ変更し、元のrecordは変更しない。\nexport function renameRecord(record, name) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function renameRecord(record, name) {\n  return { ...record, name: name.trim() || record.name };\n}\n",
    "test": "const m=await load(\"state.js\");const p={id:\"a\",name:\"旧名\",opacity:.5};const r=m.renameRecord(p,\" 基板 \");assert(r.name===\"基板\"&&r.opacity===.5&&p.name===\"旧名\"&&m.renameRecord(p,\" \").name===\"旧名\",\"元の記録を残し、空白だけの名前を防ごう\");",
    "hints": [
      "{ ...record, name: name.trim() || record.name } を返す。",
      "関数 renameRecord の引数は record, name。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "スプレッド構文",
      "trim",
      "非破壊更新"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "部品名の編集",
    "mode": "append",
    "reference": "https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide"
  },
  {
    "id": 19,
    "chapter": 2,
    "title": "選択している部品を記録",
    "file": "state.js",
    "intro": "部品をクリックしたら、「選択した」という事実を状態へ記録します。見た目を変える処理と、どれを選んだかの記録は分けると理解しやすくなります。\n\nCADの選択ハイライトも、対象が決まってから見た目が変わります。この関数は記録の更新だけを担当します。",
    "task": "selectedIdだけを更新した新しい状態を返す。",
    "starter": "// selectedIdだけを更新した新しい状態を返す。\nexport function setSelected(state, id) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function setSelected(state, id) {\n  return { ...state, selectedId: id };\n}\n",
    "test": "const m=await load(\"state.js\");const s=m.initialState();const n=m.setSelected(s,\"part-1\");assert(n.selectedId===\"part-1\"&&s.selectedId===null,\"元の状態を変えず選択IDを更新しよう\");",
    "hints": [
      "stateをコピーし、selectedIdをidに上書きする。",
      "関数 setSelected の引数は state, id。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "選択状態",
      "ID",
      "コピー"
    ],
    "question": {
      "text": "オブジェクトは何に似ている？",
      "options": [
        "名前付きの項目をまとめた部品表",
        "1枚の画像",
        "保存ボタン"
      ],
      "answer": 0,
      "explain": "名前と値を組にして扱うデータです。"
    },
    "builds": "選択状態の管理",
    "mode": "append",
    "reference": "https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide"
  },
  {
    "id": 20,
    "chapter": 2,
    "title": "画面切替のルールを作る",
    "file": "state.js",
    "intro": "ifは「もし条件が成り立つなら」の分岐です。includesは配列の中に値があるか調べます。!は真偽を反転する記号。\n\n知らない画面名を受け取ったときはthrow new Errorで理由を伝えます。入力ミスを黙って無視するより、壊れた場所を見つけやすくなります。",
    "task": "homeとworkshopだけを許可し、それ以外はErrorを投げる。",
    "starter": "// homeとworkshopだけを許可し、それ以外はErrorを投げる。\nexport function setScreen(state, screen) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function setScreen(state, screen) {\n  if (!['home', 'workshop'].includes(screen)) throw new Error('不明な画面です');\n  return { ...state, screen };\n}\n",
    "test": "const m=await load(\"state.js\");assert(m.setScreen(m.initialState(),\"workshop\").screen===\"workshop\",\"作業場へ切り替えよう\");let rejected=false;try{m.setScreen(m.initialState(),\"unknown\")}catch{rejected=true}assert(rejected,\"存在しない画面名はエラーにしよう\");",
    "hints": [
      "配列にscreenが含まれなければthrowし、含まれればコピーして返す。",
      "関数 setScreen の引数は state, screen。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "if",
      "throw",
      "includes"
    ],
    "question": {
      "text": "ifはどんな処理？",
      "options": [
        "条件による分岐",
        "繰り返し描画専用",
        "ファイル保存"
      ],
      "answer": 0,
      "explain": "条件が真のときに処理を行います。"
    },
    "builds": "ホームと作業場の切替規則",
    "mode": "append",
    "reference": "https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide"
  },
  {
    "id": 21,
    "chapter": 2,
    "title": "数値を範囲内に収める",
    "file": "state.js",
    "intro": "透明度は0〜1の範囲。マイナスや2を受け取ったときに、最小値・最大値へ丸めるのがclampです。CADの寸法の下限・上限チェックに似ています。\n\nMath.max(min,value)で下限を守り、その結果をMath.min(max,...)で上限に収めます。式を内側から順に読んでみましょう。",
    "task": "valueをmin以上max以下に制限する。",
    "starter": "// valueをmin以上max以下に制限する。\nexport function clamp(value, min, max) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function clamp(value, min, max) {\n  return Math.min(max, Math.max(min, value));\n}\n",
    "test": "const m=await load(\"state.js\");assert(m.clamp(-2,0,1)===0&&m.clamp(3,0,1)===1&&m.clamp(.4,0,1)===.4,\"上下の限界を超えないようにしよう\");",
    "hints": [
      "Math.maxで下限、Math.minで上限を制限する。",
      "関数 clamp の引数は value, min, max。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "clamp",
      "Math.min",
      "Math.max"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "安全な数値入力",
    "mode": "append",
    "reference": "https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide"
  },
  {
    "id": 22,
    "chapter": 2,
    "title": "部品数を文章にする",
    "file": "state.js",
    "intro": "===は値が等しいかを調べる記号。=は代入なので役割が違います。条件 ? A : Bは、条件が真ならA、偽ならBを選ぶ短い分岐です。\n\n数と文字列を+でつなぐと文章になります。利用者に「今何が起こったか」を伝えるのも、機能の一部です。",
    "task": "0件なら登録案内、1件以上なら件数入りの文章を返す。",
    "starter": "// 0件なら登録案内、1件以上なら件数入りの文章を返す。\nexport function messageFor(count) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function messageFor(count) {\n  return count === 0 ? 'STLを登録してください' : count + '個の部品を読み込みました';\n}\n",
    "test": "const m=await load(\"state.js\");assert(m.messageFor(0).includes(\"STL\")&&m.messageFor(3).includes(\"3\"),\"0件と3件で案内を変えよう\");",
    "hints": [
      "count === 0 ? 案内 : count + 件数メッセージ",
      "関数 messageFor の引数は count。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "条件演算子",
      "比較",
      "文字列"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "状態のお知らせ",
    "mode": "append",
    "reference": "https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide"
  },
  {
    "id": 23,
    "chapter": 2,
    "title": "重複しない部品ID",
    "file": "state.js",
    "intro": "表示名は利用者が変えますが、IDは内部の対応を保つ名前です。「基板」が2つあっても、IDが違えば区別できます。\n\nmapは配列の各要素を変換します。既存IDの最大番号に1を足せば、途中の部品を削除しても重複しません。配列の長さ+1だけでは、削除後に同じIDになることがあります。",
    "task": "既存のpart-Nの最大番号+1を文字列で返す。",
    "starter": "// 既存のpart-Nの最大番号+1を文字列で返す。\nexport function nextId(parts) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function nextId(parts) {\n  const numbers = parts.map(p => Number(String(p.id).replace('part-', '')) || 0);\n  return 'part-' + (Math.max(0, ...numbers) + 1);\n}\n",
    "test": "const m=await load(\"state.js\");assert(m.nextId([])===\"part-1\"&&m.nextId([{id:\"part-1\"},{id:\"part-3\"}])===\"part-4\",\"削除で番号に穴があっても重複しないIDにしよう\");",
    "hints": [
      "mapで番号を取り出し、Math.max(0,...numbers)+1を使う。",
      "関数 nextId の引数は parts。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "map",
      "識別子",
      "重複"
    ],
    "question": {
      "text": "配列の先頭の番号は？",
      "options": [
        "0",
        "1",
        "-1"
      ],
      "answer": 0,
      "explain": "JavaScriptの配列は0から数えます。CADの部品番号とは別の規則です。"
    },
    "builds": "部品の一意な識別",
    "mode": "append",
    "reference": "https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide"
  },
  {
    "id": 24,
    "chapter": 3,
    "title": "3Dの舞台を作る",
    "file": "world.js",
    "intro": "Sceneは3Dの舞台。部品・照明・補助線などを置きます。まだカメラも描画装置もないので、舞台を作っただけでは画面に映りません。\n\nimportは別のファイルやライブラリの機能を使う宣言。THREEという名前でThree.jsの道具箱を読み込みます。newは設計図から新しい実体を作る書き方です。",
    "task": "背景色#0c1727のTHREE.Sceneを返す。",
    "starter": "import * as THREE from 'three';\n// 背景色#0c1727のTHREE.Sceneを返す。\nexport function createScene() {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "import * as THREE from 'three';\nexport function createScene() {\n  const scene = new THREE.Scene();\n  scene.background = new THREE.Color('#0c1727');\n  return scene;\n}\n",
    "test": "const m=await load(\"world.js\");const s=m.createScene();assert(s.isScene&&s.background.getHexString()===\"0c1727\",\"背景色付きSceneを返そう\");",
    "hints": [
      "new THREE.Scene()を作りbackgroundにnew THREE.Colorを設定。",
      "関数 createScene の引数は なし。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "Scene",
      "import",
      "new"
    ],
    "question": {
      "text": "Sceneは何？",
      "options": [
        "物体や光を置く空間",
        "画像の保存形式",
        "CSSの色名"
      ],
      "answer": 0,
      "explain": "3Dの登場人物をまとめる舞台です。"
    },
    "builds": "3D空間",
    "mode": "append",
    "reference": "https://threejs.org/manual/#en/fundamentals"
  },
  {
    "id": 25,
    "chapter": 3,
    "title": "見る位置を決める",
    "file": "world.js",
    "intro": "PerspectiveCameraは遠い物ほど小さく見える透視投影のカメラ。45は画角、aspectは横幅÷高さ、0.1と5000は見える距離の手前と奥です。\n\nCADの等角図は平行投影を使うこともありますが、ここでは立体感が分かる透視投影を使います。位置(x,y,z)を置き、lookAtで原点へ向けます。",
    "task": "画角45度・指定aspectのカメラを作り(220,170,260)へ置く。",
    "starter": "// 画角45度・指定aspectのカメラを作り(220,170,260)へ置く。\nexport function createCamera(aspect) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function createCamera(aspect) {\n  const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 5000);\n  camera.position.set(220, 170, 260);\n  camera.lookAt(0, 0, 0);\n  return camera;\n}\n",
    "test": "const m=await load(\"world.js\");const c=m.createCamera(2);assert(c.isPerspectiveCamera&&c.aspect===2&&c.near>0&&c.far>1000&&c.position.length()>100,\"カメラの種類・縦横比・位置を設定しよう\");",
    "hints": [
      "PerspectiveCamera(45,aspect,0.1,5000)を作る。",
      "関数 createCamera の引数は aspect。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "透視投影",
      "Camera",
      "aspect"
    ],
    "question": {
      "text": "aspectは何を表す？",
      "options": [
        "横幅÷高さ",
        "部品の重さ",
        "三角形の数"
      ],
      "answer": 0,
      "explain": "画面の縦横比に合わせます。"
    },
    "builds": "3Dカメラ",
    "mode": "append",
    "reference": "https://threejs.org/manual/#en/fundamentals"
  },
  {
    "id": 26,
    "chapter": 3,
    "title": "描画装置を置く",
    "file": "world.js",
    "intro": "Rendererは3Dを画面の画素へ変える描画装置。WebGLというブラウザの仕組みでGPUを使います。domElementはRendererが持つcanvasです。\n\nantialiasは輪郭のギザギザを減らす設定。高密度画面の解像度は上限2にして、負荷が増えすぎないようにします。appendChildは画面へ要素を追加する処理です。",
    "task": "WebGLRendererを作り、containerへcanvasを追加する。",
    "starter": "// WebGLRendererを作り、containerへcanvasを追加する。\nexport function createRenderer(container) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function createRenderer(container) {\n  const renderer = new THREE.WebGLRenderer({ antialias: true });\n  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));\n  container.appendChild(renderer.domElement);\n  return renderer;\n}\n",
    "test": "const m=await load(\"world.js\");const d=document.createElement(\"div\");const r=m.createRenderer(d);assert(r.isWebGLRenderer&&d.querySelector(\"canvas\"),\"canvasをコンテナへ追加しよう\");r.dispose();",
    "hints": [
      "container.appendChild(renderer.domElement)で描画面を挿入する。",
      "関数 createRenderer の引数は container。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "Renderer",
      "WebGL",
      "GPU"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "3Dの描画面",
    "mode": "append",
    "reference": "https://threejs.org/manual/#en/fundamentals"
  },
  {
    "id": 27,
    "chapter": 3,
    "title": "光を当てる",
    "file": "world.js",
    "intro": "材質があっても光がなければ暗くなります。HemisphereLightは空と地面からの柔らかい光、DirectionalLightは太陽のように方向のそろった光です。\n\nCADのシェーディング表示でも、面の向きと光の関係で明暗が変わります。scene.addで舞台に追加すると、描画対象になります。",
    "task": "HemisphereLightとDirectionalLightをsceneに追加する。",
    "starter": "// HemisphereLightとDirectionalLightをsceneに追加する。\nexport function addLights(scene) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function addLights(scene) {\n  scene.add(new THREE.HemisphereLight(0xcceeff, 0x334455, 2));\n  const light = new THREE.DirectionalLight(0xffffff, 3);\n  light.position.set(100, 200, 150);\n  scene.add(light);\n}\n",
    "test": "const m=await load(\"world.js\");const s=m.createScene();m.addLights(s);assert(s.children.some(o=>o.isHemisphereLight)&&s.children.some(o=>o.isDirectionalLight),\"環境を照らす光と方向のある光を追加しよう\");",
    "hints": [
      "scene.add(new THREE.HemisphereLight(...))と方向光を使う。",
      "関数 addLights の引数は scene。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "照明",
      "法線",
      "DirectionalLight"
    ],
    "question": {
      "text": "StandardMaterialが真っ暗なとき確認するのは？",
      "options": [
        "照明",
        "READMEの長さ",
        "ボタンの文字"
      ],
      "answer": 0,
      "explain": "物理的な材質の見え方には光が必要です。"
    },
    "builds": "立体の陰影",
    "mode": "append",
    "reference": "https://threejs.org/manual/#en/fundamentals"
  },
  {
    "id": 28,
    "chapter": 3,
    "title": "表面の材質を決める",
    "file": "world.js",
    "intro": "Geometryは形、Materialは表面の性質です。同じSTLでも色・粗さ・金属らしさを変えられます。形を編集する操作とは別です。\n\n引数の=は、値が省略された場合の初期値です。roughnessは粗さ、metalnessは金属らしさを0〜1で指定します。これは本物の材料強度の計算ではありません。",
    "task": "指定color、roughness:0.4、metalness:0.3の材質を返す。",
    "starter": "// 指定color、roughness:0.4、metalness:0.3の材質を返す。\nexport function createMaterial(color = '#55c6d9') {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function createMaterial(color = '#55c6d9') {\n  return new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.3 });\n}\n",
    "test": "const m=await load(\"world.js\");const a=m.createMaterial(\"#ff9933\");assert(a.isMeshStandardMaterial&&a.color.getHexString()===\"ff9933\"&&a.roughness===.4,\"指定色のStandardMaterialを作ろう\");",
    "hints": [
      "new THREE.MeshStandardMaterial({color,roughness:0.4,metalness:0.3})",
      "関数 createMaterial の引数は color = '#55c6d9'。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "Geometry",
      "Material",
      "初期値"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "部品の材質",
    "mode": "append",
    "reference": "https://threejs.org/manual/#en/fundamentals"
  },
  {
    "id": 29,
    "chapter": 3,
    "title": "形と材質を合わせる",
    "file": "world.js",
    "intro": "Meshは形と材質を組み合わせた、画面に置ける物体です。Geometryだけでは色がなく、Materialだけでは形がありません。\n\n「部品の形」と「塗装・表面」を合わせて、1つの表示対象にする、と考えましょう。同じGeometryを複数のMeshで使うこともできます。",
    "task": "geometryとmaterialを持つMeshを返す。",
    "starter": "// geometryとmaterialを持つMeshを返す。\nexport function createMesh(geometry, material) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function createMesh(geometry, material) {\n  return new THREE.Mesh(geometry, material);\n}\n",
    "test": "const m=await load(\"world.js\");const T=await load(\"three\");const g=new T.BoxGeometry(1,1,1);const a=m.createMaterial();const mesh=m.createMesh(g,a);assert(mesh.isMesh&&mesh.geometry===g&&mesh.material===a,\"受け取った形と材質を組み合わせよう\");",
    "hints": [
      "new THREE.Mesh(geometry,material)を返す。",
      "関数 createMesh の引数は geometry, material。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "Mesh",
      "参照",
      "インスタンス"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "画面に置ける部品",
    "mode": "append",
    "reference": "https://threejs.org/manual/#en/fundamentals"
  },
  {
    "id": 30,
    "chapter": 3,
    "title": "画面サイズへ追従する",
    "file": "world.js",
    "intro": "ウィンドウが変わると、canvasの解像度とカメラの縦横比も変える必要があります。CSSだけ広げると、映像が伸びたりぼやけたりします。\n\n投影行列は3Dの座標を画面へ写す計算の表です。aspectを変えたらupdateProjectionMatrixで計算表を更新します。高さ0で割らないよう下限を1にします。",
    "task": "サイズを設定し、aspectと投影行列を更新する。",
    "starter": "// サイズを設定し、aspectと投影行列を更新する。\nexport function resizeView(renderer, camera, width, height) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function resizeView(renderer, camera, width, height) {\n  const w = Math.max(1, width);\n  const h = Math.max(1, height);\n  renderer.setSize(w, h);\n  camera.aspect = w / h;\n  camera.updateProjectionMatrix();\n}\n",
    "test": "const m=await load(\"world.js\");let size;let updated=false;const r={setSize:(w,h)=>size=[w,h]};const c={updateProjectionMatrix:()=>updated=true};m.resizeView(r,c,800,400);assert(c.aspect===2&&size[0]===800&&updated,\"描画サイズ・縦横比・投影行列を更新しよう\");m.resizeView(r,c,0,0);assert(Number.isFinite(c.aspect),\"0除算を防ごう\");",
    "hints": [
      "renderer.setSize、camera.aspect、camera.updateProjectionMatrixの3つを使う。",
      "関数 resizeView の引数は renderer, camera, width, height。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "投影行列",
      "リサイズ",
      "0除算"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "サイズ変更への対応",
    "mode": "append",
    "reference": "https://threejs.org/manual/#en/fundamentals"
  },
  {
    "id": 31,
    "chapter": 3,
    "title": "毎フレーム描く",
    "file": "world.js",
    "intro": "アニメーションは、少し状態を変えて描くことの繰り返しです。動画のコマ送りと同じ発想。setAnimationLoopがブラウザの描画タイミングに合わせて呼び出します。\n\nコールバックは「後で呼んでもらう関数」。updateで操作や手順を更新し、renderでその瞬間の3Dを描きます。ここで3Dの基本部品が揃いました。",
    "task": "setAnimationLoop内でupdateを呼び、sceneをcameraでrenderする。",
    "starter": "// setAnimationLoop内でupdateを呼び、sceneをcameraでrenderする。\nexport function startLoop(renderer, scene, camera, update) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function startLoop(renderer, scene, camera, update) {\n  renderer.setAnimationLoop((time) => {\n    if (update) update(time);\n    renderer.render(scene, camera);\n  });\n}\n",
    "test": "const m=await load(\"world.js\");let loop,rendered=false,updated=false;const r={setAnimationLoop:f=>loop=f,render:()=>rendered=true};m.startLoop(r,{}, {},()=>updated=true);assert(typeof loop===\"function\",\"描画ループを登録しよう\");loop(100);assert(updated&&rendered,\"更新してから描画しよう\");",
    "hints": [
      "更新→描画の順にコールバックの中へ書く。",
      "関数 startLoop の引数は renderer, scene, camera, update。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "コールバック",
      "フレーム",
      "描画ループ"
    ],
    "question": {
      "text": "アニメーションは何の繰り返し？",
      "options": [
        "状態を少し変えて描く",
        "STLを毎回削除する",
        "CSSを保存する"
      ],
      "answer": 0,
      "explain": "連続した静止画で動きを見せます。"
    },
    "builds": "3D描画ループ",
    "mode": "append",
    "reference": "https://threejs.org/manual/#en/fundamentals"
  },
  {
    "id": 32,
    "chapter": 4,
    "title": "STLの三角形を読む",
    "file": "parts.js",
    "intro": "STLは表面を三角形で表します。STLLoaderはASCII形式やバイナリ形式を解析し、Three.jsで使うGeometryへ変換します。ArrayBufferはファイルの生のバイト列です。\n\n解析できたように見えても頂点がない場合を確認します。position属性には頂点のxyzが並びます。NaNやInfinityの座標を拒否すると、カメラの計算が壊れるのを防げます。",
    "task": "bufferをSTLLoaderで解析し、三角形と有限な座標を確認して返す。",
    "starter": "import * as THREE from 'three';\nimport { STLLoader } from 'three/addons/loaders/STLLoader.js';\n// bufferをSTLLoaderで解析し、三角形と有限な座標を確認して返す。\nexport function parseSTL(buffer) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "import * as THREE from 'three';\nimport { STLLoader } from 'three/addons/loaders/STLLoader.js';\nexport function parseSTL(buffer) {\n  const geometry = new STLLoader().parse(buffer);\n  const a = geometry.getAttribute('position');\n  if (!a || a.count < 3) throw new Error('STLの三角形がありません');\n  for (let i=0;i<a.array.length;i++) if (!Number.isFinite(a.array[i])) throw new Error('座標が不正です');\n  return geometry;\n}\n",
    "test": "const m=await load(\"parts.js\");const text=\"solid t\\nfacet normal 0 0 1\\nouter loop\\nvertex 0 0 0\\nvertex 1 0 0\\nvertex 0 1 0\\nendloop\\nendfacet\\nendsolid t\";const g=m.parseSTL(new TextEncoder().encode(text).buffer);assert(g.isBufferGeometry&&g.getAttribute(\"position\").count===3,\"STLの頂点をGeometryに変換しよう\");let rejected=false;try{m.parseSTL(new TextEncoder().encode(\"not an STL\").buffer)}catch{rejected=true}assert(rejected,\"空のSTLを拒否しよう\");",
    "hints": [
      "parse後にgetAttribute(\"position\")とNumber.isFiniteで検証する。",
      "関数 parseSTL の引数は buffer。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "STLLoader",
      "ArrayBuffer",
      "頂点"
    ],
    "question": {
      "text": "STLに通常入っていないものは？",
      "options": [
        "三角形の座標",
        "正しい組立順",
        "面の情報"
      ],
      "answer": 1,
      "explain": "意味や組立順はアプリ側で補う必要があります。"
    },
    "builds": "STL解析",
    "mode": "append",
    "reference": "https://threejs.org/docs/#examples/en/loaders/STLLoader"
  },
  {
    "id": 33,
    "chapter": 4,
    "title": "原点と中心を区別する",
    "file": "parts.js",
    "intro": "原点は座標(0,0,0)、中心は物体の真ん中です。CADで原点から離れた形を出力すると、ブラウザでも離れた位置に来ます。center()は形の中心を原点へ移します。\n\nただし部品を共通座標で出力した組立データは、個別にcenterすると位置関係が壊れます。単品を見やすくする場合と、組立座標を保つ場合を使い分けます。",
    "task": "geometry.center()を呼び、同じgeometryを返す。",
    "starter": "// geometry.center()を呼び、同じgeometryを返す。\nexport function centerGeometry(geometry) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function centerGeometry(geometry) {\n  geometry.center();\n  return geometry;\n}\n",
    "test": "const m=await load(\"parts.js\");const T=await load(\"three\");const g=new T.BoxGeometry(2,2,2);g.translate(10,20,30);m.centerGeometry(g);g.computeBoundingBox();const c=g.boundingBox.getCenter(new T.Vector3());assert(c.length()<.0001,\"中心を原点へ移そう\");",
    "hints": [
      "center()は位置関係を変えるので、複数部品へ無条件に使わない。",
      "関数 centerGeometry の引数は geometry。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "原点",
      "ローカル座標",
      "バウンディングボックス"
    ],
    "question": {
      "text": "共通CAD座標の部品を全部個別centerすると？",
      "options": [
        "組立位置がずれる場合がある",
        "部品名が自動で付く",
        "寸法が必ず正確になる"
      ],
      "answer": 0,
      "explain": "各部品の中心が同じ原点へ移るためです。"
    },
    "builds": "単品の中心合わせ",
    "mode": "append",
    "reference": "https://threejs.org/docs/#examples/en/loaders/STLLoader"
  },
  {
    "id": 34,
    "chapter": 4,
    "title": "部品を平行移動する",
    "file": "parts.js",
    "intro": "位置はベクトル(x,y,z)。この教材ではxが横、yが上、zが奥行きです。CADの上方向と異なる場合は、回転して合わせます。\n\n平行移動はp′=p+t。例えば(1,2,3)+(10,0,0)=(11,2,3)です。mesh.positionは形の頂点を直接書き換えず、物体の配置を変えます。",
    "task": "meshのpositionを(x,y,z)に設定する。",
    "starter": "// meshのpositionを(x,y,z)に設定する。\nexport function setPosition(mesh, x, y, z) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function setPosition(mesh, x, y, z) {\n  mesh.position.set(x, y, z);\n  return mesh;\n}\n",
    "test": "const m=await load(\"parts.js\");const T=await load(\"three\");const a=new T.Object3D();m.setPosition(a,10,20,-5);assert(a.position.x===10&&a.position.y===20&&a.position.z===-5,\"xyzを指定位置へ設定しよう\");",
    "hints": [
      "mesh.position.set(x,y,z)を使う。",
      "関数 setPosition の引数は mesh, x, y, z。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "ベクトル",
      "平行移動",
      "座標"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "部品の位置編集",
    "mode": "append",
    "reference": "https://threejs.org/docs/#examples/en/loaders/STLLoader"
  },
  {
    "id": 35,
    "chapter": 4,
    "title": "度をラジアンへ変換",
    "file": "parts.js",
    "intro": "画面入力は度、Three.jsの回転はラジアンを使います。180度=πラジアンなので、度×π÷180で変換できます。\n\n線形代数の回転行列に出てくるsinとcosも、JavaScriptではラジアンを受け取ります。90とMath.PI/2を混同しないのが大切です。",
    "task": "度数をラジアンで返す。",
    "starter": "// 度数をラジアンで返す。\nexport function radians(degrees) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function radians(degrees) {\n  return degrees * Math.PI / 180;\n}\n",
    "test": "const m=await load(\"parts.js\");assert(Math.abs(m.radians(180)-Math.PI)<1e-9&&Math.abs(m.radians(90)-Math.PI/2)<1e-9,\"180度=πを使って変換しよう\");",
    "hints": [
      "degrees * Math.PI / 180",
      "関数 radians の引数は degrees。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "ラジアン",
      "π",
      "回転行列"
    ],
    "question": {
      "text": "90度は何ラジアン？",
      "options": [
        "Math.PI / 2",
        "90",
        "Math.PI * 2"
      ],
      "answer": 0,
      "explain": "180度がπなので、その半分です。"
    },
    "builds": "角度の単位変換",
    "mode": "append",
    "reference": "https://threejs.org/docs/#examples/en/loaders/STLLoader"
  },
  {
    "id": 36,
    "chapter": 4,
    "title": "3軸の回転を設定する",
    "file": "parts.js",
    "intro": "3Dの回転は順番によって結果が変わります。X→YとY→Xでは同じ向きにならないことがあります。既定のEuler角の順番はXYZです。\n\n回転行列は、座標ベクトルへ掛ける3×3の表です。例えばZ軸回転はx′=cosθ·x−sinθ·y、y′=sinθ·x+cosθ·y。ここではThree.jsに計算を任せます。",
    "task": "x,y,zを度からラジアンへ変換してmesh.rotationに設定する。",
    "starter": "// x,y,zを度からラジアンへ変換してmesh.rotationに設定する。\nexport function setRotation(mesh, x, y, z) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function setRotation(mesh, x, y, z) {\n  mesh.rotation.set(radians(x), radians(y), radians(z));\n  return mesh;\n}\n",
    "test": "const m=await load(\"parts.js\");const T=await load(\"three\");const a=new T.Object3D();m.setRotation(a,90,180,0);assert(Math.abs(a.rotation.x-Math.PI/2)<1e-9&&Math.abs(a.rotation.y-Math.PI)<1e-9,\"度をラジアンへ変換してから回転を設定しよう\");",
    "hints": [
      "前のradians関数を3回使う。",
      "関数 setRotation の引数は mesh, x, y, z。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "Euler角",
      "回転順序",
      "線形代数"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "部品の回転編集",
    "mode": "append",
    "reference": "https://threejs.org/docs/#examples/en/loaders/STLLoader"
  },
  {
    "id": 37,
    "chapter": 4,
    "title": "全体の大きさを測る",
    "file": "parts.js",
    "intro": "バウンディングボックスは、物体をすっぽり包む軸に平行な箱。CADの外形寸法のように、全体を画面へ収めるカメラ計算に使います。\n\nBox3は最小座標と最大座標を持ちます。幅=max.x−min.x、中心=(max+min)/2。回転した形の箱は、元の部品寸法より大きくなる場合があります。",
    "task": "ワールド座標を更新し、Box3でmeshの境界を返す。",
    "starter": "// ワールド座標を更新し、Box3でmeshの境界を返す。\nexport function boundsOf(mesh) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function boundsOf(mesh) {\n  mesh.updateMatrixWorld(true);\n  return new THREE.Box3().setFromObject(mesh);\n}\n",
    "test": "const m=await load(\"parts.js\");const T=await load(\"three\");const a=new T.Mesh(new T.BoxGeometry(10,20,30));a.position.x=40;const b=m.boundsOf(a);const s=b.getSize(new T.Vector3());assert(Math.abs(s.x-10)<.001&&Math.abs(s.y-20)<.001&&Math.abs(b.getCenter(new T.Vector3()).x-40)<.001,\"配置を反映した境界を返そう\");",
    "hints": [
      "new THREE.Box3().setFromObject(mesh)",
      "関数 boundsOf の引数は mesh。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "Box3",
      "ワールド座標",
      "行列"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "カメラ調整のための境界",
    "mode": "append",
    "reference": "https://threejs.org/docs/#examples/en/loaders/STLLoader"
  },
  {
    "id": 38,
    "chapter": 4,
    "title": "複数ファイルを順に読む",
    "file": "parts.js",
    "intro": "FileListは選択したファイルの集まりです。Array.fromで普通の配列に変えます。for...ofで1つずつ取り出し、awaitで読み込みの完了を待ちます。\n\nasync関数は非同期処理を返します。ファイル名だけでなく、サイズと解析結果も確認します。sourceを残すと、後で元のSTLをJSONや作品ファイルへ持ち出せます。",
    "task": "30部品・各20MB以内のSTLを読み、name・geometry・sourceを返す。",
    "starter": "export async function loadFiles(fileList) {\n  // TODO: 各ファイルを検証し、読み込む\n  return [];\n}\n",
    "solution": "export async function loadFiles(fileList) {\n  const list=Array.from(fileList);\n  if(list.length>30) throw new Error('30部品までです');\n  const result=[];\n  for(const file of list){\n    if(!/\\.stl$/i.test(file.name)) throw new Error('STL形式を選んでください');\n    if(file.size>20*1024*1024) throw new Error('1ファイル20MBまでです');\n    const source=await file.arrayBuffer();\n    const geometry=parseSTL(source);\n    result.push({name:file.name.replace(/\\.stl$/i,''),geometry,source});\n  }\n  return result;\n}\n",
    "test": "const m=await load(\"parts.js\");let bad=false;try{await m.loadFiles([{name:\"bad.txt\",size:1}])}catch{bad=true}assert(bad,\"STL以外を拒否しよう\");const text=\"solid t\\nfacet normal 0 0 1\\nouter loop\\nvertex 0 0 0\\nvertex 1 0 0\\nvertex 0 1 0\\nendloop\\nendfacet\\nendsolid t\";const b=new TextEncoder().encode(text).buffer;const out=await m.loadFiles([{name:\"board.stl\",size:b.byteLength,arrayBuffer:async()=>b}]);assert(out[0].name===\"board\"&&out[0].geometry.isBufferGeometry&&out[0].source instanceof ArrayBuffer,\"形と元ファイルを一緒に返そう\");",
    "hints": [
      "Array.from、for...of、await file.arrayBuffer()を組み合わせる。",
      "拡張子は末尾の.stlを大文字小文字を区別せず確認し、サイズは20*1024*1024で判定する。",
      "centerGeometryは呼ばず、CAD共通座標を保つ。"
    ],
    "terms": [
      "async",
      "await",
      "FileList"
    ],
    "question": {
      "text": "awaitは何をする？",
      "options": [
        "非同期の完了を待つ",
        "ページを公開する",
        "ファイルを消す"
      ],
      "answer": 0,
      "explain": "読み込み結果が使えるまで、その関数内の処理を待ちます。"
    },
    "builds": "STLの複数登録",
    "mode": "append",
    "reference": "https://threejs.org/docs/#examples/en/loaders/STLLoader"
  },
  {
    "id": 39,
    "chapter": 4,
    "title": "練習用CubeSatを生成する",
    "file": "parts.js",
    "intro": "練習データも自分で作れます。今回は100の箱、70×4×70の基板、上に置くふたの3部品。実機の規格や内部構造を再現するものではありません。\n\ngeometryは各部品の形、positionはその部品の配置です。ふたのレコードへposition:[0,55,0]を指定し、形そのものと配置を分けて管理します。",
    "task": "本体・基板・ふたのGeometryとpositionを配列で返し、ふたをy=55へ置く。",
    "starter": "// 本体・基板・ふたのGeometryとpositionを配列で返し、ふたをy=55へ置く。\nexport function makeSampleParts() {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function makeSampleParts() {\n  const body=new THREE.BoxGeometry(100,100,100);\n  const board=new THREE.BoxGeometry(70,4,70);\n  const lid=new THREE.BoxGeometry(100,4,100);\n  return [{name:'本体',geometry:body,position:[0,0,0]},{name:'基板',geometry:board,position:[0,0,0]},{name:'ふた',geometry:lid,position:[0,55,0]}];\n}\n",
    "test": "const m=await load(\"parts.js\");const a=m.makeSampleParts();assert(a.length===3&&a.every(p=>p.name&&p.geometry.isBufferGeometry),\"本体・基板・ふたの3部品を返そう\");assert(a[2].position[1]===55,\"ふたは上側の共通座標へ置こう\");",
    "hints": [
      "ふたのpositionを[0,55,0]にする。",
      "関数 makeSampleParts の引数は なし。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "BoxGeometry",
      "position",
      "練習データ"
    ],
    "question": {
      "text": "配列の先頭の番号は？",
      "options": [
        "0",
        "1",
        "-1"
      ],
      "answer": 0,
      "explain": "JavaScriptの配列は0から数えます。CADの部品番号とは別の規則です。"
    },
    "builds": "単純なCubeSatの3部品",
    "mode": "append",
    "reference": "https://threejs.org/docs/#examples/en/loaders/STLLoader"
  },
  {
    "id": 40,
    "chapter": 5,
    "title": "HTMLの部品を探す",
    "file": "ui.js",
    "intro": "DOMはHTMLをプログラムから扱うための木構造です。CADの部品ツリーのように、親子で要素が並びます。documentは現在のページを表します。\n\ngetElementByIdはidから1つの要素を探します。見つからない場合はnull。存在するつもりで呼ぶ前に、HTMLのidと一致しているか確認しましょう。",
    "task": "document.getElementById(id)の結果を返す。",
    "starter": "import * as THREE from 'three';\n// document.getElementById(id)の結果を返す。\nexport function byId(id) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "import * as THREE from 'three';\nexport function byId(id) {\n  return document.getElementById(id);\n}\n",
    "test": "const m=await load(\"ui.js\");const e=document.createElement(\"div\");e.id=\"qa-target\";document.body.append(e);assert(m.byId(\"qa-target\")===e&&m.byId(\"missing-qa\")===null,\"idからDOM要素を取得しよう\");e.remove();",
    "hints": [
      "document.getElementByIdをそのまま使う。",
      "関数 byId の引数は id。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "DOM",
      "document",
      "null"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "画面要素へのアクセス",
    "mode": "append",
    "reference": "https://threejs.org/docs/#api/en/core/Raycaster"
  },
  {
    "id": 41,
    "chapter": 5,
    "title": "部品一覧を作る",
    "file": "ui.js",
    "intro": "createElementはHTML要素を新しく作る処理。部品の数だけボタンを作り、textContentに名前を入れます。名前をHTMLとして解釈させず、文字として表示できます。\n\nクリック時の処理はaddEventListenerで登録します。onSelectは呼び出し元から受け取った関数。部品一覧は「どれが押されたか」だけを通知します。",
    "task": "partsの各nameをボタンにし、クリックでonSelect(id)を呼ぶ。",
    "starter": "// partsの各nameをボタンにし、クリックでonSelect(id)を呼ぶ。\nexport function renderPartList(container, parts, onSelect) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function renderPartList(container, parts, onSelect) {\n  container.replaceChildren();\n  for(const part of parts){\n    const button=document.createElement('button');\n    button.textContent=part.name;\n    button.addEventListener('click',()=>onSelect(part.id));\n    container.appendChild(button);\n  }\n}\n",
    "test": "const m=await load(\"ui.js\");const c=document.createElement(\"div\");let id;m.renderPartList(c,[{id:\"a\",name:\"基板\"},{id:\"b\",name:\"ふた\"}],v=>id=v);assert(c.querySelectorAll(\"button\").length===2,\"部品ごとにボタンを作ろう\");c.querySelectorAll(\"button\")[1].click();assert(id===\"b\",\"クリックした部品IDを通知しよう\");m.renderPartList(c,[],()=>{});assert(c.children.length===0,\"再描画で古い一覧を残さないようにしよう\");",
    "hints": [
      "replaceChildrenで消してから、for...ofでボタンを追加する。",
      "関数 renderPartList の引数は container, parts, onSelect。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "createElement",
      "textContent",
      "イベント"
    ],
    "question": {
      "text": "部品名を文字として表示するのは？",
      "options": [
        "textContent",
        "eval",
        "JSON.parse"
      ],
      "answer": 0,
      "explain": "入力された文字をHTMLとして実行しない表示方法です。"
    },
    "builds": "クリックできる部品一覧",
    "mode": "append",
    "reference": "https://threejs.org/docs/#api/en/core/Raycaster"
  },
  {
    "id": 42,
    "chapter": 5,
    "title": "半透明にする",
    "file": "ui.js",
    "intro": "opacityは不透明度。0なら透明、1なら不透明、0.35なら不透明度35%です。transparentをtrueにしないと、期待した半透明表示になりません。\n\ndepthWriteは奥行きの記録。半透明な面でfalseにすると、奥の部品を隠す問題を軽減できます。複雑な透明面の重なりには、描画順など別の課題もあります。",
    "task": "不透明度を0〜1に制限し、transparent・opacity・depthWriteを設定する。",
    "starter": "// 不透明度を0〜1に制限し、transparent・opacity・depthWriteを設定する。\nexport function setOpacity(mesh, value) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function setOpacity(mesh, value) {\n  const alpha=Math.min(1,Math.max(0,Number(value)));\n  mesh.material.transparent=alpha<1;\n  mesh.material.opacity=alpha;\n  mesh.material.depthWrite=alpha===1;\n  mesh.material.needsUpdate=true;\n}\n",
    "test": "const m=await load(\"ui.js\");const T=await load(\"three\");const a=new T.Mesh(new T.BoxGeometry(),new T.MeshStandardMaterial());m.setOpacity(a,.35);assert(a.material.transparent&&Math.abs(a.material.opacity-.35)<.001&&!a.material.depthWrite,\"透明表示と不透明度を設定しよう\");m.setOpacity(a,3);assert(a.material.opacity===1&&!a.material.transparent,\"範囲外の入力を制限しよう\");",
    "hints": [
      "alpha<1でtransparentをtrue、alpha===1でdepthWriteをtrueに。",
      "関数 setOpacity の引数は mesh, value。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "透明化",
      "opacity",
      "深度"
    ],
    "question": {
      "text": "不透明度35%はどの値？",
      "options": [
        "0.35",
        "35",
        "3.5"
      ],
      "answer": 0,
      "explain": "割合を0〜1で表します。"
    },
    "builds": "部品の透明度編集",
    "mode": "append",
    "reference": "https://threejs.org/docs/#api/en/core/Raycaster"
  },
  {
    "id": 43,
    "chapter": 5,
    "title": "部品の表示を切り替える",
    "file": "ui.js",
    "intro": "非表示は透明化とは違います。visible=falseにすると、その物体は描画されません。部品自体をデータから削除する処理でもありません。\n\nCADのツリーの目のアイコンと同じ用途です。Booleanは値を真か偽に変換します。チェックボックスのcheckedは最初から真偽値です。",
    "task": "mesh.visibleをBoolean(value)にする。",
    "starter": "// mesh.visibleをBoolean(value)にする。\nexport function setVisible(mesh, value) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function setVisible(mesh, value) {\n  mesh.visible=Boolean(value);\n}\n",
    "test": "const m=await load(\"ui.js\");const a={visible:true};m.setVisible(a,false);assert(a.visible===false,\"非表示へ切り替えよう\");m.setVisible(a,true);assert(a.visible===true,\"表示へ戻そう\");",
    "hints": [
      "visibleというプロパティへ代入する。",
      "関数 setVisible の引数は mesh, value。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "visible",
      "真偽値",
      "表示切替"
    ],
    "question": {
      "text": "オブジェクトは何に似ている？",
      "options": [
        "名前付きの項目をまとめた部品表",
        "1枚の画像",
        "保存ボタン"
      ],
      "answer": 0,
      "explain": "名前と値を組にして扱うデータです。"
    },
    "builds": "部品の表示と非表示",
    "mode": "append",
    "reference": "https://threejs.org/docs/#api/en/core/Raycaster"
  },
  {
    "id": 44,
    "chapter": 5,
    "title": "選択部品の色を変える",
    "file": "ui.js",
    "intro": "input type=\"color\"が返す値は#55c6d9のような文字列です。Three.jsのColor.setは、この形式を読み取れます。\n\n部品ごとに別のMaterialを用意すると、選択した1部品だけの色を変更できます。全員が同じMaterialを共有していると、まとめて色が変わるので注意します。",
    "task": "mesh.material.color.set(value)で色を設定する。",
    "starter": "// mesh.material.color.set(value)で色を設定する。\nexport function setColor(mesh, value) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function setColor(mesh, value) {\n  mesh.material.color.set(value);\n}\n",
    "test": "const m=await load(\"ui.js\");const T=await load(\"three\");const a=new T.Mesh(new T.BoxGeometry(),new T.MeshStandardMaterial());m.setColor(a,\"#ff9933\");assert(a.material.color.getHexString()===\"ff9933\",\"材質の色を指定値へ変えよう\");",
    "hints": [
      "material.colorそのものを文字列にせず、setを呼ぶ。",
      "関数 setColor の引数は mesh, value。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "Color",
      "共有",
      "Material"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "部品ごとの着色",
    "mode": "append",
    "reference": "https://threejs.org/docs/#api/en/core/Raycaster"
  },
  {
    "id": 45,
    "chapter": 5,
    "title": "画面座標を正規化する",
    "file": "ui.js",
    "intro": "マウスの位置は画面左上からのピクセル数。Raycasterは中心(0,0)、左右−1〜1、上下−1〜1の座標を使います。これをNDCと呼びます。\n\nx=(clientX−left)/width×2−1。yは画面が下向きに増えるので符号を反転します。線形変換で、異なる大きさの画面を同じ座標系へ写しています。",
    "task": "eventとrectから、左上(-1,1)、中心(0,0)のVector2を返す。",
    "starter": "// eventとrectから、左上(-1,1)、中心(0,0)のVector2を返す。\nexport function pointerNDC(event, rect) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function pointerNDC(event, rect) {\n  return new THREE.Vector2(\n    (event.clientX-rect.left)/rect.width*2-1,\n    -((event.clientY-rect.top)/rect.height)*2+1\n  );\n}\n",
    "test": "const m=await load(\"ui.js\");const r={left:100,top:50,width:200,height:100};const c=m.pointerNDC({clientX:200,clientY:100},r);const a=m.pointerNDC({clientX:100,clientY:50},r);assert(Math.abs(c.x)<1e-9&&Math.abs(c.y)<1e-9&&a.x===-1&&a.y===1,\"中心(0,0)、左上(-1,1)へ変換しよう\");",
    "hints": [
      "横は割合×2−1、縦は−割合×2+1。",
      "関数 pointerNDC の引数は event, rect。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "NDC",
      "正規化",
      "線形変換"
    ],
    "question": {
      "text": "NDCで画面中心の座標は？",
      "options": [
        "(0,0)",
        "(1,1)",
        "(100,100)"
      ],
      "answer": 0,
      "explain": "画面サイズに依存しない座標へ変換します。"
    },
    "builds": "クリック位置の座標変換",
    "mode": "append",
    "reference": "https://threejs.org/docs/#api/en/core/Raycaster"
  },
  {
    "id": 46,
    "chapter": 5,
    "title": "光線で部品を選ぶ",
    "file": "ui.js",
    "intro": "Raycasterは、カメラからクリック方向へ見えない光線を飛ばし、どの三角形に当たるか調べる道具です。3Dゲームの照準や、CADのクリック選択と似た計算です。\n\nintersectObjectsは近い順に交点を返します。先頭が手前の部品。何も当たらなければnullを返し、アプリ側で「未選択」を扱います。",
    "task": "Raycasterで最も手前の表示中meshを調べ、その部品レコードかnullを返す。",
    "starter": "// Raycasterで最も手前の表示中meshを調べ、その部品レコードかnullを返す。\nexport function pickPart(event, canvas, camera, parts) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function pickPart(event, canvas, camera, parts) {\n  const raycaster=new THREE.Raycaster();\n  raycaster.setFromCamera(pointerNDC(event,canvas.getBoundingClientRect()),camera);\n  const meshes=parts.filter(p=>p.mesh && p.mesh.visible).map(p=>p.mesh);\n  const hit=raycaster.intersectObjects(meshes,false)[0];\n  return hit ? parts.find(p=>p.mesh===hit.object) || null : null;\n}\n",
    "test": "const m=await load(\"ui.js\");const T=await load(\"three\");const camera=new T.PerspectiveCamera(45,1,.1,100);camera.position.z=5;camera.lookAt(0,0,0);camera.updateMatrixWorld();const mesh=new T.Mesh(new T.BoxGeometry(1,1,1),new T.MeshBasicMaterial());mesh.updateMatrixWorld();const p={id:\"a\",mesh};const c={getBoundingClientRect:()=>({left:0,top:0,width:100,height:100})};assert(m.pickPart({clientX:50,clientY:50},c,camera,[p])===p,\"画面中心の光線で箱を選択しよう\");assert(m.pickPart({clientX:0,clientY:0},c,camera,[p])===null,\"外れたときはnullを返そう\");",
    "hints": [
      "setFromCameraで光線、intersectObjects(...)[0]で最初の交点を取得。",
      "関数 pickPart の引数は event, canvas, camera, parts。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "Raycaster",
      "交点",
      "光線"
    ],
    "question": {
      "text": "交点が複数あるとき手前を選ぶには？",
      "options": [
        "近い順の先頭を使う",
        "配列を全部削除する",
        "カメラを消す"
      ],
      "answer": 0,
      "explain": "Raycasterの交点は距離順です。"
    },
    "builds": "3D画面からの部品選択",
    "mode": "append",
    "reference": "https://threejs.org/docs/#api/en/core/Raycaster"
  },
  {
    "id": 47,
    "chapter": 5,
    "title": "ボタンの処理をつなぐ",
    "file": "ui.js",
    "intro": "機能をつなぐ最後の配線はイベントです。クリックしたら何をするかを登録し、画面を作り直すときは解除できるようにします。\n\n同じイベントを何度も登録すると、1回押したのに2回動くことがあります。removeEventListenerには、登録したものと同じ関数を渡します。",
    "task": "クリックを登録し、解除用の関数を返す。",
    "starter": "// クリックを登録し、解除用の関数を返す。\nexport function bindClick(element, callback) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function bindClick(element, callback) {\n  if(!element) throw new Error('ボタンが見つかりません');\n  element.addEventListener('click',callback);\n  return () => element.removeEventListener('click',callback);\n}\n",
    "test": "const m=await load(\"ui.js\");const b=document.createElement(\"button\");let n=0;const unbind=m.bindClick(b,()=>n++);b.click();assert(n===1,\"クリックでコールバックを呼ぼう\");assert(typeof unbind===\"function\",\"解除する関数も返そう\");unbind();b.click();assert(n===1,\"解除後は呼ばないようにしよう\");",
    "hints": [
      "return () => element.removeEventListener(\"click\",callback)",
      "関数 bindClick の引数は element, callback。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "イベントリスナー",
      "解除",
      "関数を返す"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "ボタンと機能の接続",
    "mode": "append",
    "reference": "https://threejs.org/docs/#api/en/core/Raycaster"
  },
  {
    "id": 48,
    "chapter": 6,
    "title": "組立手順をデータにする",
    "file": "sequence.js",
    "intro": "組立手順をコードに直接固定せず、データとして保存します。すると、後から順番や方向を変えられます。動画編集のタイムラインと同じ考え方です。\n\nfromとtoは絶対位置のベクトル。例えば上方120から原点へ降ろします。実際の部品の組立位置に応じてtoを調整します。durationはこの手順にかける秒数です。",
    "task": "partIdとfrom:[0,120,0]、to:[0,0,0]、duration:1の手順を返す。",
    "starter": "// partIdとfrom:[0,120,0]、to:[0,0,0]、duration:1の手順を返す。\nexport function createStep(partId) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function createStep(partId) {\n  return { partId, from: [0,120,0], to: [0,0,0], duration: 1 };\n}\n",
    "test": "const m=await load(\"sequence.js\");const s=m.createStep(\"part-2\");assert(s.partId===\"part-2\"&&s.from[1]===120&&s.to.every(v=>v===0)&&s.duration===1,\"対象・開始位置・終了位置・秒数を記録しよう\");",
    "hints": [
      "return { partId, from:[0,120,0], to:[0,0,0], duration:1 }",
      "関数 createStep の引数は partId。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "タイムライン",
      "データ設計",
      "絶対位置"
    ],
    "question": {
      "text": "オブジェクトは何に似ている？",
      "options": [
        "名前付きの項目をまとめた部品表",
        "1枚の画像",
        "保存ボタン"
      ],
      "answer": 0,
      "explain": "名前と値を組にして扱うデータです。"
    },
    "builds": "編集できる組立手順",
    "mode": "append",
    "reference": "https://threejs.org/docs/#api/en/math/MathUtils"
  },
  {
    "id": 49,
    "chapter": 6,
    "title": "手順の順番を変更する",
    "file": "sequence.js",
    "intro": "slice()は配列のコピー、spliceは要素の取り出しや挿入です。先にコピーしてから編集すると、元の手順を壊さず変更できます。\n\nここではドラッグ操作や上へ・下へボタンが、from番号とto番号をこの関数へ渡します。見た目の操作と順序計算を分けると、テストも簡単です。",
    "task": "stepsのfrom番をto番へ移した新しい配列を返す。",
    "starter": "// stepsのfrom番をto番へ移した新しい配列を返す。\nexport function moveStep(steps, from, to) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function moveStep(steps, from, to) {\n  const result=steps.slice();\n  if(from<0||to<0||from>=result.length||to>=result.length) return result;\n  const [step]=result.splice(from,1);\n  result.splice(to,0,step);\n  return result;\n}\n",
    "test": "const m=await load(\"sequence.js\");const a=[\"A\",\"B\",\"C\"];const b=m.moveStep(a,0,2);assert(b.join()===\"B,C,A\"&&a.join()===\"A,B,C\",\"元の配列を残して順序を変えよう\");assert(m.moveStep(a,-1,1).join()===a.join(),\"範囲外は変更しないようにしよう\");",
    "hints": [
      "splice(from,1)で取り出し、splice(to,0,step)で挿入する。",
      "関数 moveStep の引数は steps, from, to。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "slice",
      "splice",
      "並べ替え"
    ],
    "question": {
      "text": "配列の先頭の番号は？",
      "options": [
        "0",
        "1",
        "-1"
      ],
      "answer": 0,
      "explain": "JavaScriptの配列は0から数えます。CADの部品番号とは別の規則です。"
    },
    "builds": "組立順の変更",
    "mode": "append",
    "reference": "https://threejs.org/docs/#api/en/math/MathUtils"
  },
  {
    "id": 50,
    "chapter": 6,
    "title": "直線の途中を求める",
    "file": "sequence.js",
    "intro": "補間は、2つの値の間を埋める計算。lerpは線形補間です。a+(b−a)tで、t=0ならa、t=1ならb、t=0.5なら真ん中です。\n\n10から30へ半分進むなら10+(30−10)×0.5=20。位置や透明度など、連続して変わる値に使えます。",
    "task": "aとbの間の割合tの値を返す。",
    "starter": "// aとbの間の割合tの値を返す。\nexport function lerp(a, b, t) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function lerp(a, b, t) {\n  return a + (b-a)*t;\n}\n",
    "test": "const m=await load(\"sequence.js\");assert(m.lerp(10,30,0)===10&&m.lerp(10,30,.5)===20&&m.lerp(10,30,1)===30,\"開始・中間・終了を計算しよう\");",
    "hints": [
      "a + (b-a)*t",
      "関数 lerp の引数は a, b, t。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "補間",
      "lerp",
      "線形"
    ],
    "question": {
      "text": "t=0.5はどこ？",
      "options": [
        "aとbの中間",
        "必ず原点",
        "終了の2倍"
      ],
      "answer": 0,
      "explain": "開始から終了への進み具合が半分です。"
    },
    "builds": "アニメーションの補間",
    "mode": "append",
    "reference": "https://threejs.org/docs/#api/en/math/MathUtils"
  },
  {
    "id": 51,
    "chapter": 6,
    "title": "動きに加減速を付ける",
    "file": "sequence.js",
    "intro": "等速で急に始まり急に止まる動きは、機械的に見えます。イージングは進み具合のtを別の曲線へ変換して、加減速を付けます。\n\nsmoothstepは3t²−2t³。両端の傾きが0になるので、ゆっくり出発し、ゆっくり止まります。動画編集のキーフレームにも似た調整があります。",
    "task": "tを0〜1へ制限し、t²(3−2t)を返す。",
    "starter": "// tを0〜1へ制限し、t²(3−2t)を返す。\nexport function ease(t) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function ease(t) {\n  const x=Math.min(1,Math.max(0,t));\n  return x*x*(3-2*x);\n}\n",
    "test": "const m=await load(\"sequence.js\");assert(m.ease(0)===0&&m.ease(1)===1&&Math.abs(m.ease(.5)-.5)<1e-9&&m.ease(-1)===0&&m.ease(2)===1&&m.ease(.25)<.25,\"端でゆっくり、中間で速い曲線にしよう\");",
    "hints": [
      "x*x*(3-2*x)",
      "関数 ease の引数は t。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "イージング",
      "smoothstep",
      "傾き"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "自然な加減速",
    "mode": "append",
    "reference": "https://threejs.org/docs/#api/en/math/MathUtils"
  },
  {
    "id": 52,
    "chapter": 6,
    "title": "位置ベクトルを補間する",
    "file": "sequence.js",
    "intro": "ベクトルの補間は、x・y・zをそれぞれ同じ割合で計算します。p(t)=(1−t)a+t bという線形結合でも表せます。\n\nfrom.map((value,i)=>...)のiは要素の番号。to[i]で同じ軸の値を取り出します。3つの成分をまとめて計算し、新しい配列で返します。",
    "task": "fromの各成分とtoの同じ軸をlerpで計算する。",
    "starter": "// fromの各成分とtoの同じ軸をlerpで計算する。\nexport function positionAt(from, to, t) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function positionAt(from, to, t) {\n  return from.map((value,i)=>lerp(value,to[i],t));\n}\n",
    "test": "const m=await load(\"sequence.js\");const p=m.positionAt([0,100,-10],[20,0,10],.5);assert(p[0]===10&&p[1]===50&&p[2]===0,\"xyzそれぞれを補間しよう\");",
    "hints": [
      "from.map((value,i)=>lerp(value,to[i],t))",
      "関数 positionAt の引数は from, to, t。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "ベクトル補間",
      "map",
      "線形結合"
    ],
    "question": {
      "text": "配列の先頭の番号は？",
      "options": [
        "0",
        "1",
        "-1"
      ],
      "answer": 0,
      "explain": "JavaScriptの配列は0から数えます。CADの部品番号とは別の規則です。"
    },
    "builds": "3D位置の途中の計算",
    "mode": "append",
    "reference": "https://threejs.org/docs/#api/en/math/MathUtils"
  },
  {
    "id": 53,
    "chapter": 6,
    "title": "1つの手順を再生する",
    "file": "sequence.js",
    "intro": "部品の姿勢をその時刻に求める関数です。この教材では位置だけを動かします。回転の滑らかな補間へ進むなら、Quaternionという表現が便利です。\n\n小さな関数を組み合わせると、長い式を1回で書かずに済みます。easeで進み具合を整え、positionAtで位置を計算する順番です。",
    "task": "ease(t)を使ってstep.fromからstep.toの位置を返す。",
    "starter": "// ease(t)を使ってstep.fromからstep.toの位置を返す。\nexport function stepPose(step, t) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function stepPose(step, t) {\n  return positionAt(step.from,step.to,ease(t));\n}\n",
    "test": "const m=await load(\"sequence.js\");const s={from:[0,120,0],to:[10,0,0]};assert(m.stepPose(s,0)[1]===120&&m.stepPose(s,1)[0]===10&&m.stepPose(s,.5)[1]===60,\"イージングした位置を返そう\");",
    "hints": [
      "positionAt(step.from,step.to,ease(t))",
      "関数 stepPose の引数は step, t。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "合成",
      "姿勢",
      "Quaternion"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "1手順分の位置計算",
    "mode": "append",
    "reference": "https://threejs.org/docs/#api/en/math/MathUtils"
  },
  {
    "id": 54,
    "chapter": 6,
    "title": "全手順の時間軸を計算",
    "file": "sequence.js",
    "intro": "全体のprogressは0〜手順数です。0.5なら第1手順の半分、1.5なら第2手順の半分。再生側はdurationの秒数を見て、この進み具合を計算します。\n\n各部品は最初の対応手順のfrom位置で待ちます。開始時刻を迎えた手順だけを適用し、t=progress−indexを0〜1へ制限します。未来の手順を適用すると、今の動きが上書きされるので注意。同じ部品へ次の手順を追加するときは、前のtoと次のfromをつなぐと自然に動きます。",
    "task": "partsの各部品へ、その手順の進み具合に応じたpositionを付けて返す。",
    "starter": "// partsの各部品へ、その手順の進み具合に応じたpositionを付けて返す。\nexport function projectAt(parts, steps, progress) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function projectAt(parts, steps, progress) {\n  return parts.map(part=>{\n    const first=steps.find(step=>step.partId===part.id);\n    let position=[...(first ? first.from : part.position)];\n    steps.forEach((step,index)=>{\n      if(step.partId===part.id && index<=progress){\n        const t=Math.min(1,Math.max(0,progress-index));\n        position=stepPose(step,t);\n      }\n    });\n    return {...part,position};\n  });\n}\n",
    "test": "const m=await load(\"sequence.js\");const p=[{id:\"a\",position:[0,0,0]},{id:\"b\",position:[9,9,9]}];const s=[{partId:\"a\",from:[0,120,0],to:[0,0,0],duration:1}];assert(m.projectAt(p,s,.5)[0].position[1]===60&&m.projectAt(p,s,1)[0].position[1]===0&&m.projectAt(p,s,.5)[1].position[0]===9&&p[0].position[1]===0,\"対象部品だけを動かし、元データを保とう\");const repeated=[{partId:\"a\",from:[0,120,0],to:[0,0,0],duration:1},{partId:\"a\",from:[0,0,0],to:[20,0,0],duration:1}];const early=m.projectAt(p,repeated,.5)[0].position;const later=m.projectAt(p,repeated,1.5)[0].position;assert(early[1]===60&&early[0]===0,\"未来の同部品手順で現在の動きを上書きしないようにしよう\");assert(later[0]===10&&later[1]===0,\"同じ部品の次の手順も時間順に適用しよう\");assert(m.projectAt(p,repeated,0)[0].position[1]===120&&m.projectAt(p,repeated,2)[0].position[0]===20,\"開始前の待機位置と全手順完了の位置を確認しよう\");",
    "hints": [
      "最初のfromで待機し、index<=progressの手順だけstepPoseで計算する。",
      "関数 projectAt の引数は parts, steps, progress。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "時間軸",
      "map",
      "分離設計"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "複数部品の組立再生",
    "mode": "append",
    "reference": "https://threejs.org/docs/#api/en/math/MathUtils"
  },
  {
    "id": 55,
    "chapter": 6,
    "title": "壊れた手順を見つける",
    "file": "sequence.js",
    "intro": "保存データは必ず正しいとは限りません。削除した部品のID、0秒の手順、座標の文字列などを見つけて、再生前に知らせます。\n\neveryは全要素が条件を満たすか調べます。検証は「とりあえず描いてみる」前に、計算できるデータか確認する入口です。",
    "task": "部品IDの存在、3つの有限座標、正のdurationを検証する。",
    "starter": "// 部品IDの存在、3つの有限座標、正のdurationを検証する。\nexport function validateSteps(steps, partIds) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function validateSteps(steps, partIds) {\n  if(!Array.isArray(steps)||!Array.isArray(partIds)) return false;\n  const vector=v=>Array.isArray(v)&&v.length===3&&v.every(Number.isFinite);\n  return steps.every(s=>partIds.includes(s.partId)&&vector(s.from)&&vector(s.to)&&Number.isFinite(s.duration)&&s.duration>0);\n}\n",
    "test": "const m=await load(\"sequence.js\");assert(m.validateSteps([{partId:\"a\",from:[0,1,0],to:[0,0,0],duration:1}],[\"a\"]),\"正しい手順を許可しよう\");assert(!m.validateSteps([{partId:\"missing\",from:[0,0,0],to:[0,0,0],duration:1}],[\"a\"])&&!m.validateSteps([{partId:\"a\",from:[0,0,0],to:[0,0,0],duration:0}],[\"a\"]),\"存在しない部品と0秒を拒否しよう\");",
    "hints": [
      "steps.everyで全項目を調べ、1つでも不正ならfalse。",
      "関数 validateSteps の引数は steps, partIds。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "バリデーション",
      "every",
      "受入条件"
    ],
    "question": {
      "text": "検証はいつ行う？",
      "options": [
        "読み込みや再生の前",
        "公開後にだけ",
        "一度も行わない"
      ],
      "answer": 0,
      "explain": "不正データを早い段階で見つけます。"
    },
    "builds": "組立手順の検証",
    "mode": "append",
    "reference": "https://threejs.org/docs/#api/en/math/MathUtils"
  },
  {
    "id": 56,
    "chapter": 7,
    "title": "プロジェクトをJSONへ",
    "file": "storage.js",
    "intro": "JSON.stringifyはJavaScriptのデータを文字列へ変換します。ファイルは文字列やバイト列を保存するので、オブジェクトをそのまま置くのではなく変換します。\n\nnull,2は2文字の字下げで読みやすくする指定。MeshやGeometryは巨大な内部状態を持つため、ID・設定・元STLの文字列表現など、保存に必要なデータだけを渡します。",
    "task": "projectを2文字インデントのJSON文字列へ変換する。",
    "starter": "// projectを2文字インデントのJSON文字列へ変換する。\nexport function serializeProject(project) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function serializeProject(project) {\n  return JSON.stringify(project,null,2);\n}\n",
    "test": "const m=await load(\"storage.js\");const p={version:1,parts:[{id:\"a\",name:\"基板\"}],steps:[]};const text=m.serializeProject(p);assert(typeof text===\"string\"&&JSON.parse(text).parts[0].name===\"基板\",\"日本語の部品名も保存しよう\");",
    "hints": [
      "JSON.stringify(project,null,2)",
      "関数 serializeProject の引数は project。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "JSON.stringify",
      "シリアライズ",
      "保存形式"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "プロジェクト書き出し",
    "mode": "append",
    "reference": "https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site"
  },
  {
    "id": 57,
    "chapter": 7,
    "title": "JSONから復元する",
    "file": "storage.js",
    "intro": "JSON.parseは文字列をデータへ戻す処理。stringifyと逆向きです。JSONでは文字列の引用符は二重、末尾の余分なカンマやコメントは書けません。\n\n文法を読めたことと、中身が正しいことは別。parseの後で、部品や手順の形式を別の関数で検証します。これはCADファイルの読み込みと形状チェックが別なのと似ています。",
    "task": "textをJSON.parseして返す。",
    "starter": "// textをJSON.parseして返す。\nexport function parseProject(text) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function parseProject(text) {\n  return JSON.parse(text);\n}\n",
    "test": "const m=await load(\"storage.js\");assert(m.parseProject(JSON.stringify({version:1,parts:[],steps:[]})).version===1,\"JSONをデータへ戻そう\");let bad=false;try{m.parseProject(\"{\")}catch{bad=true}assert(bad,\"壊れたJSONではエラーを返そう\");",
    "hints": [
      "JSON.parse(text)を返す。",
      "関数 parseProject の引数は text。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "JSON.parse",
      "構文エラー",
      "復元"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "保存データの読み込み",
    "mode": "append",
    "reference": "https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site"
  },
  {
    "id": 58,
    "chapter": 7,
    "title": "ファイルをダウンロード",
    "file": "storage.js",
    "intro": "Blobはブラウザ内でファイルのように扱えるデータ。createObjectURLで一時URLを作り、a要素のdownload属性で保存名を指定します。\n\n使い終わったURLはrevokeObjectURLで解放します。メモリを使い続けないための後片付けです。自分の端末でJSONを保存できるようになります。",
    "task": "Blobを作り、一時URLを使ってnameで保存する。",
    "starter": "// Blobを作り、一時URLを使ってnameで保存する。\nexport function downloadText(name, text) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function downloadText(name, text) {\n  const blob=new Blob([text],{type:'application/json'});\n  const url=URL.createObjectURL(blob);\n  const a=document.createElement('a');\n  a.href=url;a.download=name;a.click();\n  setTimeout(()=>URL.revokeObjectURL(url),1000);\n}\n",
    "test": "const m=await load(\"storage.js\");assert(typeof m.downloadText===\"function\",\"downloadTextをexportしよう\");const old=HTMLAnchorElement.prototype.click;let clicked=false;HTMLAnchorElement.prototype.click=function(){clicked=this.download===\"test.json\"&&this.href.startsWith(\"blob:\")};try{m.downloadText(\"test.json\",\"{}\")}finally{HTMLAnchorElement.prototype.click=old}assert(clicked,\"BlobのURLとdownload名を設定してクリックしよう\");",
    "hints": [
      "a.href=url、a.download=name、a.click()の順。",
      "関数 downloadText の引数は name, text。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "Blob",
      "オブジェクトURL",
      "ダウンロード"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "JSONのファイル保存",
    "mode": "append",
    "reference": "https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site"
  },
  {
    "id": 59,
    "chapter": 7,
    "title": "ブラウザ内にも保存する",
    "file": "storage.js",
    "intro": "localStorageはこのサイト用のブラウザ内保存場所。文字列だけを保存するので、JSONへ変換します。keyは引き出しのラベルです。\n\nこれはクラウド同期ではありません。同じブラウザ・同じサイトで使えますが、端末変更やデータ削除に備えてJSONファイルも保存しましょう。練習プレビューでは隔離により保存できない場合があるため、採点は保存APIへの渡し方を確認します。",
    "task": "keyを使ってvalueをJSON文字列で保存する。",
    "starter": "// keyを使ってvalueをJSON文字列で保存する。\nexport function saveLocal(key, value) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function saveLocal(key, value) {\n  localStorage.setItem(key,JSON.stringify(value));\n}\n",
    "test": "const m=await load(\"storage.js\");const old=Object.getOwnPropertyDescriptor(globalThis,\"localStorage\");let stored;Object.defineProperty(globalThis,\"localStorage\",{configurable:true,value:{setItem:(k,v)=>stored=[k,v]}});try{m.saveLocal(\"test\",{value:7})}finally{if(old)Object.defineProperty(globalThis,\"localStorage\",old);else delete globalThis.localStorage}assert(stored[0]===\"test\"&&JSON.parse(stored[1]).value===7,\"キーを付けてJSON文字列を保存しよう\");",
    "hints": [
      "localStorage.setItem(key,JSON.stringify(value))",
      "関数 saveLocal の引数は key, value。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "localStorage",
      "キー",
      "永続化"
    ],
    "question": {
      "text": "localStorageはどこに保存される？",
      "options": [
        "そのブラウザ内",
        "必ずGitHub",
        "すべての端末に自動同期"
      ],
      "answer": 0,
      "explain": "端末をまたぐには書き出しやサーバーが必要です。"
    },
    "builds": "自動保存の入口",
    "mode": "append",
    "reference": "https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site"
  },
  {
    "id": 60,
    "chapter": 7,
    "title": "保存がない場合も扱う",
    "file": "storage.js",
    "intro": "初めて開いたときは保存データがありません。getItemは見つからないとnullを返します。これを想定すると、初回からエラーになるのを防げます。\n\n保存できなかった場合や、古い形式のデータだった場合も考えます。呼び出し元でtry/catchし、利用者へ理由を伝えてから新規開始を選べるようにします。",
    "task": "getItemがnullならnull、それ以外はJSON.parseしたデータを返す。",
    "starter": "// getItemがnullならnull、それ以外はJSON.parseしたデータを返す。\nexport function restoreLocal(key) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function restoreLocal(key) {\n  const text=localStorage.getItem(key);\n  return text===null ? null : JSON.parse(text);\n}\n",
    "test": "const m=await load(\"storage.js\");const old=Object.getOwnPropertyDescriptor(globalThis,\"localStorage\");Object.defineProperty(globalThis,\"localStorage\",{configurable:true,value:{getItem:k=>k===\"exists\"?JSON.stringify({value:7}):null}});try{assert(m.restoreLocal(\"exists\").value===7&&m.restoreLocal(\"missing\")===null,\"初回はnull、保存済みならデータを返そう\")}finally{if(old)Object.defineProperty(globalThis,\"localStorage\",old);else delete globalThis.localStorage}",
    "hints": [
      "text===null ? null : JSON.parse(text)",
      "関数 restoreLocal の引数は key。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "初回起動",
      "null",
      "try/catch"
    ],
    "question": {
      "text": "return の役割は？",
      "options": [
        "画面を閉じる",
        "関数の結果を呼び出し元へ返す",
        "ファイルを公開する"
      ],
      "answer": 1,
      "explain": "returnの右側が関数の計算結果になります。"
    },
    "builds": "ブラウザ保存からの復元",
    "mode": "append",
    "reference": "https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site"
  },
  {
    "id": 61,
    "chapter": 7,
    "title": "プロジェクト全体を検証",
    "file": "storage.js",
    "intro": "保存形式は将来変わるのでversionを記録します。古いアプリが新しい形式を無理に読むと壊れるため、対応するバージョンだけ受け入れます。\n\nSetは重複しない値の集まり。IDの重複や、手順が存在しない部品を参照していないかも確認します。要求分析で書いた受入条件へ、実装が戻ってきました。",
    "task": "version:1、30部品以内、部品の設定、ID重複、手順の参照と座標・時間を検証する。",
    "starter": "// version:1、30部品以内、部品の設定、ID重複、手順の参照と座標・時間を検証する。\nexport function validateProject(project) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function validateProject(project) {\n  if(!project||project.version!==1||!Array.isArray(project.parts)||!Array.isArray(project.steps)||project.parts.length>30) return false;\n  const ids=new Set();\n  const vec=v=>Array.isArray(v)&&v.length===3&&v.every(Number.isFinite);\n  for(const p of project.parts){\n    if(!p||typeof p.id!=='string'||!p.id||ids.has(p.id)||typeof p.name!=='string'||!vec(p.position)||!vec(p.rotation)||!Number.isFinite(p.opacity)||p.opacity<0||p.opacity>1||typeof p.visible!=='boolean'||typeof p.color!=='string'||!/^#[0-9a-f]{6}$/i.test(p.color)) return false;\n    ids.add(p.id);\n  }\n  return project.steps.every(s=>s&&ids.has(s.partId)&&vec(s.from)&&vec(s.to)&&Number.isFinite(s.duration)&&s.duration>0);\n}\n",
    "test": "const m=await load(\"storage.js\");const p={version:1,parts:[{id:\"a\",name:\"本体\",position:[0,0,0],rotation:[0,0,0],opacity:1,visible:true,color:\"#55c6d9\"}],steps:[]};assert(m.validateProject(p),\"正しい保存形式を許可しよう\");assert(!m.validateProject({...p,version:2})&&!m.validateProject({...p,parts:[...p.parts,...p.parts]})&&!m.validateProject({...p,steps:[{partId:\"missing\",from:[0,0,0],to:[0,0,0],duration:1}]}),\"不明バージョン・重複ID・不明部品を拒否しよう\");",
    "hints": [
      "partsをfor...ofで検証しSetへIDを追加、最後にsteps.everyで参照を確認。",
      "関数 validateProject の引数は project。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "スキーマ",
      "Set",
      "バージョン"
    ],
    "question": {
      "text": "versionを保存する理由は？",
      "options": [
        "形式変更を識別するため",
        "部品を回転するため",
        "画面を大きくするため"
      ],
      "answer": 0,
      "explain": "互換性を判断する印です。"
    },
    "builds": "読み込みデータの全体検証",
    "mode": "append",
    "reference": "https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site"
  },
  {
    "id": 62,
    "chapter": 7,
    "title": "公開前の確認を一覧にする",
    "file": "storage.js",
    "intro": "最後は実際の利用の流れでテストします。複数STLを登録→1部品の位置と色を変更→順番変更→再生→JSON保存→再読み込み。この流れが通れば、部品単体のテストだけより確かな確認になります。\n\nGitHubでは作業用ブランチを作り、コミットで変更を記録し、PRのFiles changedで差分を確認します。まずREADMEを変更してpractice/goalブランチへ保存し、PRを作ってmainへ取り込んでみましょう。",
    "task": "parts数・steps数と、両方1件以上ならready:trueを返す。",
    "starter": "// parts数・steps数と、両方1件以上ならready:trueを返す。\nexport function projectSummary(project) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function projectSummary(project) {\n  return { parts: project.parts.length, steps: project.steps.length, ready: project.parts.length>0 && project.steps.length>0 };\n}\n",
    "test": "const m=await load(\"storage.js\");const a=m.projectSummary({parts:[{}],steps:[{}]});assert(a.parts===1&&a.steps===1&&a.ready===true&&!m.projectSummary({parts:[],steps:[]}).ready,\"部品数・手順数・準備状態を返そう\");",
    "hints": [
      "project.parts.lengthとproject.steps.lengthを使う。",
      "関数 projectSummary の引数は project。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "結合テスト",
      "コミット",
      "プルリクエスト"
    ],
    "question": {
      "text": "コミットと公開は同じ？",
      "options": [
        "違う。履歴保存と配信は別",
        "必ず同じ",
        "どちらもSTLの操作"
      ],
      "answer": 0,
      "explain": "GitHub Pagesの公開処理がコミット後に別途動きます。"
    },
    "builds": "公開前の状態確認",
    "mode": "append",
    "reference": "https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site"
  },
  {
    "id": 63,
    "chapter": 7,
    "title": "READMEを書き作品を公開",
    "file": "storage.js",
    "intro": "READMEは次に開く自分や、作品を使う人の説明書です。起動方法、操作手順、保存方法、制約を書きます。作った機能を自分の言葉で説明できることも、完成の条件です。\n\n「自分のキットを書き出す」からファイルを保存し、GitHubのmy-viewer/へ同じ構成でアップロードします。Settings→Pages→Deploy from a branch→main / (root)を選択。教材はルート、自分の作品は/my-viewer/で開けます。Actionsの公開処理が成功してからURLを確認しましょう。HTMLのダブルクリックはSTL読み込みが制限されるので、ローカルならpython -m http.server 8000を使います。\n\n合格後は、解答例なしで1機能を追加してみよう。例えば部品の並べ替え、カメラの視点保存、回転アニメーション。今回の関数の責任分担を使って、どのファイルへ置くか考えます。app.jsは同梱の配線コードです。今回書いたstate・world・parts・ui・sequence・storageの関数をどこで呼ぶか読み、1つのボタンのイベントから状態更新・描画までを自分の言葉で説明しましょう。",
    "task": "titleから始まり、STL・JSON・GitHub Pagesの説明を含むREADME文字列を返す。",
    "starter": "// titleから始まり、STL・JSON・GitHub Pagesの説明を含むREADME文字列を返す。\nexport function makeReadme(title) {\n  // TODO: ここに処理を書こう\n  return null;\n}\n",
    "solution": "export function makeReadme(title) {\n  return '# '+title+'\\n\\nSTLを登録し、部品の位置・色・透明度と組立手順を編集するアプリです。\\n\\n## 起動\\nGitHub PagesまたはローカルHTTPサーバーで開いてください。\\n\\n## 使い方\\nSTLを複数選択→部品を編集→組立順を変更→再生→JSON保存。\\n\\n## 保存\\nJSONと元STLを保管してください。ブラウザ内保存は端末間で自動同期されません。\\n\\n## 制約\\nSTLは単位や正しい組立順を通常持ちません。このアプリではmmとし、利用者が位置・順番を確認します。\\n';\n}\n",
    "test": "const m=await load(\"storage.js\");const text=m.makeReadme(\"自分のCubeSat\");assert(text.startsWith(\"# 自分のCubeSat\")&&text.includes(\"STL\")&&text.includes(\"JSON\")&&text.includes(\"GitHub Pages\"),\"作品名・使い方・保存・起動方法を書こう\");",
    "hints": [
      "文字列の改行は\\n。# の後にtitleをつなげる。",
      "関数 makeReadme の引数は title。受け取った値と戻り値を紙に書いて追ってみよう。",
      "解答例を開いたら、一度閉じて書き直し、別の入力でも結果を予想しよう。"
    ],
    "terms": [
      "README",
      "GitHub Pages",
      "HTTPサーバー"
    ],
    "question": {
      "text": "STLをfetchするとき推奨する開き方は？",
      "options": [
        "HTTPサーバーやGitHub Pages",
        "HTMLのダブルクリックだけ",
        "ファイル名をPNGへ変える"
      ],
      "answer": 0,
      "explain": "file://ではブラウザの読み込み制限があるためです。"
    },
    "builds": "自分で公開できる作品の説明書",
    "mode": "append",
    "reference": "https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site"
  }
];
