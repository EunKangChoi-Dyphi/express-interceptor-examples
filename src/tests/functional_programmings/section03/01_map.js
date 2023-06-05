// map

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

let names = [];
for (const p of products) {
  names.push(p.name);
}

log(names);

const map = (f, _iter) => {
  let res = [];
  for (const e of _iter) {
    res.push(f(e));
  }
  return res; // 리스트를 아예 리턴.
};
// 함수를 값으로 전달.

log(map((p) => p.name, products));

// let prices = [];
// for (const p of products) {
//   prices.push(p.price);
// }

// log(prices);

log(map((p) => p.price, products));
