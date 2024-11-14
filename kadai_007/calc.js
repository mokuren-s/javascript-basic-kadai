// 変数numに1～30までのランダムな整数を代入する
let num = Math.floor(Math.random() * 30) + 1;

// 変数numの値を出力する
console.log(num);

// 変数numの値によって、出力する文字列を切り替える
if (num % 3 === 0 && num % 5 === 0) {
  console.log('3と5の倍数です');
}
else if (num % 3 === 0) {
  console.log('3の倍数です');
}
else if (num % 5 === 0) {
  console.log('5の倍数です');
}
else {
    console.log(num);
}
