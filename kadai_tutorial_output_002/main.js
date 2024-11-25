// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const countTimer = document.getElementById('countTimer');
const scoreDisplay = document.getElementById('score');

// 複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?','Nice to meet you',
  'I want to buy my bicycle',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  "Let's strat programming"
];

// ランダムなテキストを表示
const createText = () => {

  // 正タイプした文字列をクリア
  typed = '';
  typedfield.textContent = typed;

  // 配列のインデックス数からランダムな数値を生成する
  let random = Math.floor(Math.random() * textLists.length);

  // 配列からランダムにテキストを取得し画面に表示する
  untyped = textLists[random];
  untypedfield.textContent = untyped;

};

// キー入力の判定
const keyPress = e => {

  // 誤タイプの場合
  if (e.key !== untyped.substring(0,1)) {
    wrap.classList.add('typo');
    // 500ms後に背景色を元に戻す
    setTimeout(() => {
      wrap.classList.remove('typo');
    }, 500);
    return;
  }

  // 正タイプの場合
  wrap.classList.remove('typo');
  typed += untyped.substring(0,1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;
  // スコアのインクリメント
  score++;

  // スコアを表示
  scoreDisplay.textContent = score;

  // 未入力のテキストが無くなったら新しいテキストを表示
  if (untyped === '') {
    createText();
  }
};



// タイピングスキルのランクを判定
const rankCheck = score => {

  // テキストを格納する変数を作る
  let text = '';

  // スコアに応じて異なるメッセージを変数textに格納する
  if (score < 100) {
    text = `あなたのランクはＣです。\nＢランクまであと${100 - score}文字です。`;
  } else if (score < 200) {
    text = `あなたのランクはＢです。\nＡランクまであと${200 - score}文字です。`;
  } else if (score < 300) {
    text = `あなたのランクはＡです。\nＳランクまであと${300 - score}文字です。`;
  } else if (score >= 300) {
    text = `あなたのランクはＳです。\nおめでとうございます！`;
  }

  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました！\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
  clearInterval(id);

  // 既存の要素を使って終了メッセージを表示
  untypedfield.textContent = 'タイムアップ！'; // untypedフィールドに表示
  typedfield.textContent = ''; //typedフィールドを空にする

  // 終了して１秒後にスコアを表示
  setTimeout(() => {
    const result = confirm(rankCheck(score));
    
      // OKボタンをクリックされたらリロードする
      if (result == true) {
      window.location.reload();
    }
  }, 10);
};

// カウントダウンタイマー
const timer = () => {

  // タイマー部分のHTML要素（p要素）を取得する
  let time = countTimer.textContent;

  const id = setInterval(() =>  {

    // カウントダウンする
    time--;
    countTimer.textContent = time;

    // カウントが0になったらタイマーを停止する
    if (time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {

  // カウントダウンタイマーを開始する
  timer();
  
  // ランダムなテキストを表示する
  createText();

  // 「スタート」ボタンを非表示にする
  start.style.display = 'none';

  // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始！';
