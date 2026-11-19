# 3D Engineering Quest

STLとJavaScriptで3Dビューアを自作する、日本語の10段階ドリルです。

## 公開する

`dist/` 内のすべてのファイルをGitHubのmainブランチのルートへ配置します。
Settings → Pages → Deploy from a branch → main / (root) → Save。

学習サイト： https://syunto2006.github.io/3d-engineering-quest/

## 学ぶ内容

STL・HTML・CSS・JavaScriptの役割、GitHubのコミットとPR、Three.jsの基本、色・透明化・回転・STL読み込み・イベント、Pages公開。

コード演習は隔離iframeで実行して実際の値を採点します。ブラウザ内保存とJSONによる記録の持ち出しに対応。GitHubの実操作は自己確認です。

## 自分のビューア

`starter.html` を `my-viewer/index.html` として保存し、同じフォルダに `cubesat.stl` を置くと、教材と並べて自分の作品を公開できます。コード内のコメントが仕組みを説明します。

## ローカルで開く

Pythonがある場合、distディレクトリで `python -m http.server 8000` を実行し http://localhost:8000 を開きます。
HTMLのダブルクリックによるfile://での利用は、STLの読み込み制限があるため非対応です。

Three.js 0.170.0はjsDelivr CDNから取得します。ネット接続、JavaScript、WebGL、import map対応ブラウザが必要です。

## 模型

`cubesat.stl` は100×100×100の閉じた箱（12三角形）です。単位のないSTL座標をmmとして扱う学習用模型で、実機のCubeSat規格を保証しません。内部基板はJavaScriptが別に作っています。

## 参考

- https://threejs.org/manual/#en/fundamentals
- https://threejs.org/docs/#examples/en/loaders/STLLoader
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

進捗は端末のブラウザ内だけに保存。記録の読み込みは同じ形式のJSONに対応し、現在の記録を置き換えます。新しい端末では「学習記録を保存」から書き出したファイルを読み込んでください。
