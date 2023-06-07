const log = console.log;
const curry =
  (func) =>
  (a, ..._) => {
    // log(..._);
    return _.length
      ? func(a, ..._)
      : (..._) => {
          //   log(..._);
          return func(a, ..._);
        };
  };

const mult = curry((a, b) => {
  //   log(a, b);
  return a * b;
});

const mult3 = mult(3)(1, 2, 3);
log(mult3);

const mult4 = mult(4, 5);

/// map
const map = curry((func, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(func(a));
  }

  return res;
});

/// filter
const filter = curry((func, iter) => {
  let res = [];
  for (const a of iter) {
    if (func(a)) {
      res.push(a);
    }
  }

  return res;
});

// reduce
const reduce = curry((func, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();

    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = func(acc, a);
  }

  return acc;
});

// go
const go = (...args) => reduce((a, f) => f(a), args);
const pipe =
  (...fs) =>
  (a) =>
    go(a, ...fs);

// sample
const products = [
  { name: '반팔티', price: 15000, quantity: 1, is_selected: true },
  { name: '긴팔티', price: 20000, quantity: 2, is_selected: false },
  { name: '핸드폰케이스', price: 15000, quantity: 3, is_selected: true },
  { name: '후드티', price: 30000, quantity: 4, is_selected: false },
  { name: '바지', price: 25000, quantity: 5, is_selected: false },
];

const add = (a, b) => a + b;
const totalQuantity = (products) =>
  go(
    products,
    map((products) => products.quantity),
    reduce(add)
  );
log(totalQuantity(products));

const gpx = {
  $: { version: '1.1', creator: 'DYPHI Inc.' },
  metadata: [{ name: ['Prescription ID'] }],
  trk: [
    {
      trkseg: [
        {
          trkpt: [
            { $: [Object], time: [Array], desc: [Array] },
            { $: [Object], time: [Array], desc: [Array] },
            { $: [Object], time: [Array], desc: [Array] },
          ],
        },
      ],
    },
  ],
};
