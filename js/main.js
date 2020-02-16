'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');

  /**
   * 問題のセット
   * @type {object[string, string[]]}
   */
  const quizSet = [
    {q: 'What is A?', c: ['A0', 'A1', 'A2']},
    {q: 'What is B?', c: ['B0', 'B1', 'B2']},
    {q: 'What is C?', c: ['C0', 'C1', 'C2']},
  ];

  /**
   * 現在までの問題数
   * @type {number}
   */
  let currentNum = 0;

  /**
   * すでに回答をした場合、true
   * @type {boolean}
   */
  let isAnswered = false;


  let score = 0;

  /**
   * フィッシャー・イェーツのシャッフル。
   * シャッフルしたい配列が引数。シャッフルした配列を返す。
   * @param {any[]} arr 
   * @return {any[]}
   */
  function shuffle(arr) {
    let i = arr.length -1;
    for (let i = arr.length - 1; i > 0; i--) {
      // 適当な位置を選ぶ
      const j = Math.floor(Math.random() * (i + 1));
      // 配列の最後の要素と選択された位置の要素を入れ替える
      // 分割代入
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }


  /**
   * 選択した回答の正誤を判定する
   * @param {HTMLLIElement} li 
   */
  function checkAnswer(li) {
    // 一度回答したらその後の処理はしない(一度しか回答できない)
    if (isAnswered) {
      return;
    }
    // 回答したフラグを立てる
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]){
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }
  /**
   * 問題と選択肢を取り出して画面に表示する
   */
  function setQuiz() {
    // 回答していない状態に設定
    isAnswered = false;
    // 問題を取り出して画面に表示
    question.textContent = quizSet[currentNum].q;
  
    // 選択肢をシャッフルする
    // 関数の引数にオブジェクトを渡すと、オブジェクトの参照が渡されるので
    // 引数に変更をくわえると、元のオブジェクトも書き変わってしまう。
    // 今回は、困るので、スプリット演算子(...)により、配列を展開し
    // []を付けることで、新たな配列を作成して、引数とする
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    
    // 選択肢を追加する前に、すでに選択肢が
    // 設定されていたら、それらの選択肢を削除する
    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    // シャッフルした選択肢を画面に表示
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      // 選択肢をクリックした場合、正誤判定を実施
      li.addEventListener('click', () => {
        // 正誤判定プログラムの呼び出し
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'show score';
    }
  }

  setQuiz();

  // nextボタンをクリックしたら、次の問題に進む
  btn.addEventListener('click', () => {
    // nextボタンがdisabled(無効)状態のときは処理をしない
    if (btn.classList.contains('disabled')) {
      return;
    }
    // nextボタンをdisabled状態にして次の問題を表示
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      console.log(`Score: ${score} / ${quizSet.length}`);
    } else {
      currentNum++;
      setQuiz();
    }
  });

}