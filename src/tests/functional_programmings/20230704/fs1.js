const add = (a, b) => a + b;
const log = console.log;
const products = [
  { name: '반바지', price: 55000, quantity: 1 },
  { name: '흰바지', price: 15000, quantity: 1 },
  { name: '검정바지', price: 45000, quantity: 2 },
  { name: '청바지', price: 15500, quantity: 3 },
];

/** map , filter, reduce 복습 */
/** map */
let map = (func, _iter) => {
  let res = [];
  for (const e of _iter) {
    // func(e) 를 원소로 추가
    res.push(func(e));
  }

  return res;
};

/** filter */
let filter = (func, _iter) => {
  let res = [];
  for (const e of _iter) {
    // func(e)에 부합되면 해당 원소를 추가
    if (func(e)) res.push(e);
  }

  return res;
};

const nums = [1, 2, 3, 4, 5];
let total = 0;
for (const num of nums) {
  total = total + num;
}

/** reduce */
// func: 보조함수
// acc: 누적값
// iter: 이터러블(array)
// 누적하면서 하나의 값으로 귀결시켜주는 함수

/**
 *reduce( add(0, [1,2,3,4,5]) )
 *reduce( add(1, [2,3,4,5]) )
 *reduce( add(3, [3,4,5]) )
 *
 *
 *
 */
// const reduce = ( func, acc, iter) => {
//     for(const e of iter) {
//         acc = func(acc, e)
//     }
//     return acc;
// }
let reduce = (func, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const e of iter) {
    acc = func(acc, e);
  }
  return acc;
};

console.log(
  reduce((total_price, product) => total_price + product.price, 0, products)
);

// 읽기가 개어려움.
// price만을 뽑아서
// 20000원 미만의 가격만 추출
console.log(
  reduce(
    add, // 3. 2에 만족하는 price들의 가격들을 reduce함수로 가격합을 구한다.
    map(
      (p) => p.price, // 2. 그 물건데이터중에서 price 필드만을 추출하여
      filter((p) => p.price < 20000, products) // 1. products들중 가격이 20000원 미만의 물건을 추출하고
    )
  )
);

console.log(
  reduce(
    add, // 3. 더한다.
    filter(
      (price) => price <= 20000, // 2. 그 가격들중에서 20000원 미만인 값들만 추출하고
      map((p) => p.price, products) // 1. 가격을 추출하고
    )
  )
);

// go, pipe는 코드를 값으로 다루어 표현력을 높인다.
// 함수 중첩이 되어있다.
// 함수형 프로그래밍은 코드를 값으로 다룬다. 코드를 함수로받아서 평가하는 시점을 원하는대로 다를 수 있기 때문에 코드의 표현력을 높일 수 있다.
// 코드를 값으로 다루는 함수를 만든다.
// 함수 중첩이 되면 => 코드읽고 이해하기가 어렵다
// 읽기 편하게 변화시키기.

/** go */
// a: 현재결과값, 현재함수, args 나머지함수들
// const go = (...args) => reduce((a, f) => f(a), args);
// args를 축약해서 하나의 값으로 나타내려면 => 연속적으로 한개의 일을한다  => reduce
let go = (...args) => reduce((a, f) => f(a), args);

// 원하는 값으로 출력을 한다.

// 연속적으로 실행하여 원하는 값으로 출력하도록 함.
// 순서대로 실행
// 인자들 순서로 하나의 값으로 귀결시킬수 있도록함.
go(
  0, // 시작값
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100,
  log
); // 111

/** pipe */
// go => 즉시 어떤값을 평가
// pipe => 함수들이 나열되어있는 합성합수를 나타냄. => 함수를 리턴하는 함수
let pipe =
  (...funcs) =>
  (arg) =>
    go(arg, ...funcs);

let pipe2 =
  (func, ...funcs) =>
  (...args) =>
    go(func(...args), ...funcs);

const f = pipe(
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100
);

go(
  add(0, 1),
  (a) => a + 10,
  (a) => a + 100,
  log
);

const _f = pipe2(
  (a, b) => a + b,
  (a) => a + 10,
  (a) => a + 100
);

log(_f(0, 1));

/** go+curry 를 사용하여 더 읽기 좋은 코드로 만들기 */
console.log(
  reduce(
    add, // 3. 더한다.
    filter(
      (price) => price <= 20000, // 2. 그 가격들중에서 20000원 미만인 값들만 추출하고
      map((p) => p.price, products) // 1. 가격을 추출하고
    )
  )
);

// 위에서부터 아래방향으로 표현하도록함.
go(
  products,
  (products) => filter((p) => p.price < 20000, products), // 20000원 미만의 값을 가진 물건들을 추출
  (products) => map((p) => p.price, products), // 그물건들중 price 필드만을 갖고와서
  (prices) => reduce(add, prices), // price들을 더한다.
  log // 출력한다.
);

// curry 함수를 만들기
// 함수를 값으로 다루면서, 받아둔 함수를 내가 원하는 시점에 평가할 수 있도록 하는 함수
// 함수를 받아서 함수를 리턴
// 인자를 받아서 인자를 원하는 개수만큼 들어왔을때, 받아놓은 함수들을 나중에 평가.

const curry = (func) => {
  // 함수를 받아서 함수를 리턴
  return (a, ..._) => {
    // 인자가 2개이상인가?
    // 왼쪽(true)      =>  받아둔 함수를 즉시 실행
    // 오른쪽(false)    =>  함수를 다시 리턴후 그 이후에 받은 인자들을 합쳐서 실행.
    return _.length ? func(a, ..._) : (..._) => func(a, ..._);
  };
};

const mult = curry((a, b) => a * b);
log(mult); // 인자가 없으므로 => 함수를 리턴
log(mult(1)); // 인자가 1개이므로,
log(mult(1)(2)); // 인자가 1개이므로,

const mult3 = mult(3); // 인자 3
log(mult3(2)); // 3*2 =6
log(mult3(5)); // 3*5 =15
log(mult3(3)); // 3*3 =9

/**
 * curry함수로 map/filter/reduce 개선하기
 */
/** map */
map = curry((func, _iter) => {
  let res = [];
  for (const e of _iter) {
    // func(e) 를 원소로 추가
    res.push(func(e));
  }

  return res;
});

/** filter */
filter = curry((func, _iter) => {
  let res = [];
  for (const e of _iter) {
    // func(e)에 부합되면 해당 원소를 추가
    if (func(e)) res.push(e);
  }

  return res;
});

/** reduce */
reduce = curry((func, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const e of iter) {
    acc = func(acc, e);
  }
  return acc;
});

// 간결하게 표현하기
go(
  products,
  filter((p) => p.price < 20000), // 20000원 미만의 값을 가진 물건들을 추출
  map((p) => p.price), // 그물건들중 price 필드만을 갖고와서
  reduce(add), // price들을 더한다.
  log // 출력한다.
);
