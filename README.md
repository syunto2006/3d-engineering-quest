# 3D Engineering Quest — 開発キット

CAD以外は初めての人向けに、STL組立エディターを作る8章・64ドリルを用意しました。

学習サイト: https://syunto2006.github.io/3d-engineering-quest/

- index.html: 鍵付きの学習マップ
- drill.html: 個別課題・ファイル編集・コード実行・実行テスト・3段階ヒント
- workshop.html: 学習中の自分のプロジェクト
- workshop.html?mode=reference: 完成見本の組立エディター
- guide.html: 用語集・設計の考え方・GitHub公開手順

各課題で書いたコードは、合格すると次へ引き継がれます。全ソースをZIPで書き出せます。app.jsは機能をつなぐコードとして同梱し、その中から呼び出す機能をドリルで自作する構成です。

完成見本は、複数STLの読み込み、部品名・位置・回転・色・不透明度・表示の編集、クリック選択、組立順の並べ替え、開始位置・到着位置・秒数編集、再生・スクラブ、STL込みJSON保存・復元に対応します。

AI/APIは使用しません。コードの実行はsandbox iframe内。進捗とコードはブラウザ内保存、JSONバックアップで持ち運べます。Three.js 0.170.0をjsDelivr CDNから取得するため、ネット接続とWebGL対応ブラウザが必要です。

ローカルではこのフォルダで `python -m http.server 8000` を実行し http://localhost:8000 を開きます。

学習記録は新しい `quest-kit-v2` に保存し、旧10問版の記録は削除しません。サンプルは学習用の単純なCubeSat風の箱・基板・ふたです。実機の規格や正しい組立順は保証しません。
