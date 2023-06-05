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

const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

// 가격을 뽑는 map 함수
map((p) => p.price, products);

//금액을 뽑는데 -> 특정이하의 금액의 상품만 뽑고싶다.
filter((p) => p <= 2000, products); // 2천원 이하상품

const add = (a, b) => a + b;
log(
  reduce(
    //더한다
    add,
    map(
      (p) => p.price, //가격을 뽑는다.
      filter((p) => p.price <= 2000, products) // 뽑은 가격중에서 2000원 이하
    )
  )
);

log(
  reduce(
    add,
    filter(
      (p) => p < 2000,
      map((p) => p.price, products)
    )
  )
);
