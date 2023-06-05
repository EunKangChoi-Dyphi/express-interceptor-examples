const log = console.log;
const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 25000 },
  { name: '바지', price: 35000 },
  { name: '당근', price: 800 },
  { name: '토마토', price: 1500 },
];

// 특정조건에 맞는 데이터만 갖고오도록함.
let f1 = [];
for (const p of products) {
  if (p.price < 20000) f1.push(p);
}
log(...f1);

let filter1 = (f, iter) => {
  let res = [];
  for (const p of iter) {
    if (f(p)) res.push(p);
  }
  return res;
};
log(...filter1((p) => p.price < 2000, products));

log(filter1((n) => n % 2 === 0, [1, 2, 3, 4]));
log(
  filter1(
    (n) => n % 2 === 0,
    (function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
      yield 6;
    })()
  )
);
