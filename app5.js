const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});


app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number(req.query.win) || 0;
  let total = Number(req.query.total) || 0;

  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  if (num == 1) cpu = 'グー';
  else if (num == 2) cpu = 'チョキ';
  else cpu = 'パー';

  let judgement = '';
  if (hand === cpu) {
    judgement = '引き分け';
  } else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち';
    win += 1;  
  } else {
    judgement = '負け';
  }
  total += 1;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render('janken', display);
});




// あっち向いてホイのルート
app.get("/attimuite", (req, res) => {
  let direction = req.query.direction;  // プレイヤーが指す方向
  let win = Number(req.query.win) || 0;  // 勝利数
  let total = Number(req.query.total) || 0;  // 合計プレイ数

  // ランダムにCPUの指す方向を決定
  // ランダムにCPUの指す方向を決定
const num = Math.floor(Math.random() * 4);  // 0 から 3 までの数字を生成
let cpu = '';
if (num === 0) cpu = '右';
else if (num === 1) cpu = '左';
else if (num === 2) cpu = '上';
else if (num === 3) cpu = '下';


  // 勝敗判定
  let judgement = '';
  if (direction === cpu) {
    judgement = '勝ち';
    win += 1;
  } else {
    judgement = '負け';
  }
  total += 1;

  // 結果をオブジェクトにまとめる
  const display = {
    yourDirection: direction,
    cpuDirection: cpu,
    judgement: judgement,
    win: win,
    total: total,
    winRate: ((win / total) * 100).toFixed(2) + '%' // 勝率を追加
  };

  // 結果をテンプレートに渡してレンダリング
  res.render('attimuite', display);
});


app.get("/number-guess", (req, res) => {
  let playerGuess = Number(req.query.guess);  // プレイヤーが選んだ数字
  let win = Number(req.query.win) || 0;  // 勝利数
  let total = Number(req.query.total) || 0;  // 合計プレイ数

  // ランダムにコンピューターの数字を生成 (1から10まで)
  const cpuGuess = Math.floor(Math.random() * 10) + 1;

  // 勝敗判定
  let judgement = '';
  if (playerGuess === cpuGuess) {
    judgement = '勝ち';
    win += 1;
  } else {
    judgement = '負け';
  }
  total += 1;

  // 結果をオブジェクトにまとめる
  const display = {
    playerGuess: playerGuess,
    cpuGuess: cpuGuess,
    judgement: judgement,
    win: win,
    total: total,
    winRate: ((win / total) * 100).toFixed(2) + '%'  // 勝率を追加
  };

  // 結果をテンプレートに渡してレンダリング
  res.render('number-guess', display);
});


// サーバーを起動
app.listen(8080, () => console.log("Example app listening on port 8080!"));
