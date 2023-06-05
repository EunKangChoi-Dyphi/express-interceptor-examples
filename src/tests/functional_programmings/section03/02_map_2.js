const log = console.log;

const map = (f, _iter) => {
  let res = [];
  for (const e of _iter) {
    res.push(f(e));
  }
  return res; // 리스트를 아예 리턴.
};

log([1, 2, 3].map((a) => a + 1));

// generator을 사용하여 yield
function* gen() {
  yield 2;
  yield 3;
  yield 4;
}

log(map((a) => a * a, gen()));

//--------------------------------------------------------------------------------

let m = new Map();
m.set('a', 10);
m.set('b', 20);
m.set('c', 30);
let iter = m[Symbol.iterator]();
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());

log(map(([k, v]) => [k, v * 2], m));
let result = map(([k, v]) => [k, v * 2], m);
log(new Map(result));
