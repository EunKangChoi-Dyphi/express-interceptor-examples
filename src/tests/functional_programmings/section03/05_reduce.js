const log = console.log;

// reduce=> 축약하는 함수

const nums = [1, 2, 3, 4, 5];

let total = 0;
for (const n of nums) {
  total += n;
}
log(total);

const reduce = (f, acc, iter) => {
  for (const e of iter) {
    acc = f(acc, e);
  }
  return acc;
};

const add = (a, b) => a + b;

// log(reduce(add, 0, [1, 2, 3, 4, 5]));

// 재귀적으로 실행.
// log(reduce(add(add(add(add(add(0, 1), 2), 3), 4), 5)));

const reduce2 = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const e of iter) {
    acc = f(acc, e);
  }

  return acc;
};

//----------------------------------------------------------

const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 25000 },
  { name: '바지', price: 35000 },
  { name: '당근', price: 800 },
  { name: '토마토', price: 1500 },
];

// 특정한 값으로 축약을 할 수 있다.
log(reduce((total_price, product) => total_price + product.price, 0, products));
