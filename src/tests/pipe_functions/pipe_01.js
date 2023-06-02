// pipe exam
// [references]
console.log('Pipe 함수 example');

console.log('::: 일반 forEach문');
const scores = [90, 100, 40, 50, 10];
let total = 0;

scores.forEach((score) => (total += score));
console.log(total);

// reduce function
console.log('::: reduce() 문으로 for-loops');
/**
 * acc: 90, curr: 100 => 90+100 => acc: 190
 * acc: 190, curr: 40 => 190+40 => acc: 230
 * acc: 230, curr: 50 => 230+50 => acc: 280
 * acc: 280, curr: 10 => 280+10 => acc: 290
 * acc: 290을 리턴
 */
const total2 = scores.reduce((acc, curr) => acc + curr, 0);
console.log(total2);

/**
 * :: acc: 90 :: curr: 100 => 90>100 100을 리턴  -> acc: 100으로함.
 * :: acc: 100 :: curr: 40 => 100>40 100을 리턴
 * :: acc: 100 :: curr: 50 => 100>50 100을 리턴
 * :: acc: 100 :: curr: 10
 * acc: 100을 리턴
 *
 * result2 = 100
 */
let result2 = scores.reduce((acc, curr) => {
  console.log(`:: acc: ${acc} :: curr: ${curr}`);
  return acc > curr ? acc : curr;
});
console.log(result2);

/**
 * :: acc: 90 :: curr: 100 -> 90>100 -> acc: 100
 * :: acc: 100 :: curr: 40 -> 100>40 -> acc: 100
 * :: acc: 100 :: curr: 150 -> 100>150 -> acc: 150
 * :: acc: 150 :: curr: 10 -> 150>10 -> acc:150
 * acc: 150을 리턴.
 */
result2 = [90, 100, 40, 150, 10].reduce((acc, curr) => {
  console.log(`:: acc: ${acc} :: curr: ${curr}`);
  return acc > curr ? acc : curr;
});
console.log(result2);

// acc: 반환될 값.
// curr: 원본배열에서 현재 참조하고 있는 값.

// const pipe = (v, func) => {
//   return func.reduce((res, func) => {
//     return func(res);
//   }, v);
// };

// 클로져가 뭐지?

// 클로져를 이용하면 파이프는 다음과 같이 변모한다.
console.log(':::: closure을 사용한 pipe()');
const pipe =
  (...funcs) =>
  (v) => {
    return funcs.reduce((res, func) => {
      return func(res);
    }, v);
  };
const subtract = (v) => v - 5;
console.log(pipe(subtract)(10));

const minusFive = (v) => v - 5;
const addFour = (v) => v + 4;
const multiplyByTen = (v) => v * 10;
const identity = (v) => v;
let res = pipe(minusFive, addFour, multiplyByTen, Math.abs)(0);
console.log(res);
