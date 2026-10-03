// --- HTMLの要素を取得 ---
const display = document.getElementById("display");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");

// --- 計測に必要な変数を準備 ---
let startTime = 0;
let elapsedTime = 0;
let timerId = null;

// --- ボタンの活性・非活性を一度に切り替える関数 ---
function setButtonState(startDisabled, stopDisabled, resetDisabled) {
  startButton.disabled = startDisabled;
  stopButton.disabled = stopDisabled;
  resetButton.disabled = resetDisabled;
}

// --- 時間の表示を更新する関数 ---
function updateDisplay() {
  elapsedTime = Date.now() - startTime;

  // 時間h, 分m, 秒s, ミリ秒ms を計算
  const h = Math.floor(elapsedTime / (1000 * 60 * 60));
  const m = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  const ms = elapsedTime % 1000;

  // 桁数を調整
  const hours = String(h).padStart(2, "0");
  const minutes = String(m).padStart(2, "0");
  const seconds = String(s).padStart(2, "0");
  const milliseconds = String(ms).padStart(3, "0");

  display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// --- スタートボタンがクリックされたとき ---
startButton.addEventListener("click", () => {
  // ボタンの状態を変更：
  // 計測中は「スタート」は押せない、「ストップ」は押せる、「リセット」は押せない
  setButtonState(true, false, false);

  // これまでの経過時間を引いてスタート時刻を調整
  startTime = Date.now() - elapsedTime;

  // 表示を更新
  updateDisplay();

  // 10ミリ秒ごとに更新
  timerId = setInterval(updateDisplay, 10);
});

// --- ストップボタンがクリックされたとき ---
stopButton.addEventListener("click", () => {
  // ボタンの状態を変更：
  // 一時停止中は「スタート」を押して再開可能、「ストップ」は押せない、「リセット」で初期化可能
  setButtonState(false, true, false);

  // ストップした瞬間の時間を反映
  updateDisplay();

  // タイマーを停止
  clearInterval(timerId);
  timerId = null;
});

// --- リセットボタンがクリックされたとき ---
resetButton.addEventListener("click", () => {
  // 計測中でも停止する
  clearInterval(timerId);
  timerId = null;

  // ボタンの状態を変更：
  // 初期状態に戻るため、「スタート」のみ押せる状態に戻す
  setButtonState(false, true, true);

  // 経過時間を0に戻す
  elapsedTime = 0;

  // 画面の表示を初期状態に戻す
  display.textContent = "00:00:00.000";
});