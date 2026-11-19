const levels = [
  "要求分析・設計",
  "HTML・CSS",
  "JavaScript",
  "3D空間",
  "STL・座標変換",
  "部品操作",
  "データ設計",
  "組立アニメーション",
  "アップロード",
  "テスト・公開"
];

const container = document.getElementById("levels");

levels.forEach((name, index) => {
  const div = document.createElement("div");
  div.className = "level";

  div.textContent = `${index + 1}. ${name}`;

  container.appendChild(div);
});