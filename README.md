# webpro_06

## このプログラムについて

## ファイル一覧

ファイル名 | 説明
-|-
app5.js | プログラム本体
public/janken.html | じゃんけんの開始画面
views/janken.ejs |　じゃんけんのテンプレートファイル



1. ```app5.js```を起動する
1. Webブラウザで```localhost:8080/public/ janken.html```にアクセスする
1. 自分の手を入力する

/luck
機能説明
/luckエンドポイントは,ランダムに運勢を決定し,結果を表示する機。

ランダムな数値を生成: 1から6の間でランダムな数値（num）を生成します。

1: 大吉
2: 中吉
3-6: それ以外（運勢は設定されていませんが、今後追加することができます）
運勢の表示: 運勢は日本の「おみくじ」の形式で表示され、console.log にも出力されます。

使用手順
/luck にアクセスすると、ランダムに決まった運勢が表示されます（運勢の結果はコンソールにも出力されます）。

```mermaid
flowchart TD;
  start["開始"]
  end1["終了"]
  start --> end1;

```




###### 占いの流れ
```mermaid
flowchart TD;
  start["開始"]
  random_choice["ランダムに運勢を選ぶ"]
  fortune["運勢を表示"]
  end1["終了"]

  start --> random_choice
  random_choice --> fortune
  fortune --> end1
```

######　ジャンケンの流れ
```mermaid
flowchart TD;
  start["開始"];
  player_choice["プレイヤーが手を選ぶ (グー、チョキ、パー)"]
  cpu_choice["コンピュータが手を選ぶ"]
  compare["プレイヤーとコンピュータの手を比較"]
  draw["引き分け"]
  win["勝ち"]
  lose["負け"]
  end1["終了"]

  start --> player_choice
  player_choice --> cpu_choice
  cpu_choice --> compare
  compare -->|引き分け| draw
  compare -->|プレイヤー勝ち| win
  compare -->|コンピュータ勝ち| lose
  draw --> end1
  win --> end1
  lose --> end1

```

######　あっち向いてホイの流れ
```mermaid
flowchart TD;
  start["開始"]
  player_choice["プレイヤーが指す方向 (右、左、上、下)"]
  cpu_choice["コンピュータが指す方向 (右、左、上、下)"]
  compare["プレイヤーとコンピュータの方向を比較"]
  win["勝ち"]
  lose["負け"]
  end1["終了"]

  start --> player_choice
  player_choice --> cpu_choice
  cpu_choice --> compare
  compare -->|勝ち| win
  compare -->|負け| lose
  win --> end1
  lose --> end1
```

######　数字当てゲームの流れ
```mermaid
flowchart TD;
  start["開始"]
  player_guess["プレイヤーが数字を選ぶ (1-10)"]
  cpu_guess["コンピュータが数字を選ぶ"]
  compare["プレイヤーとコンピュータの数字を比較"]
  win["勝ち"]
  lose["負け"]
  end1["終了"]

  start --> player_guess
  player_guess --> cpu_guess
  cpu_guess --> compare
  compare -->|勝ち| win
  compare -->|負け| lose
  win --> end1
  lose --> end1
```

