//기존에 달라진 ES6에서의 리스트 순회
const log = console.log;

// ES5
const list = [1, 2, 3, 4, 5];
for (let i = 0; i < list.length; i++) {
  log(list[i]);
}

const str = 'abc';
for (let i = 0; i < str.length; i++) {
  log(str[i]);
}

// ES6
for (const a of list) {
  log(a);
}
for (const a of str) {
  log(a);
}
