const products = [
    { name: '반팔티', price: 15000 },
    { name: '긴팔티', price: 20000 },
    { name: '핸드폰케이스', price: 15000 },
    { name: '후드티', price: 25000 },
    { name: '바지', price: 35000 },
    { name: '당근', price: 800 },
    { name: '토마토', price: 1500 },
  ];
const log = console.log
const add = (a,b) => a+b


const curry = func => (a, ...args) => args.length ? func(a, ...args) : (...args) =>  func(a, ...args)
const reduce = curry((func, acc, iter) => {
    if(!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for(const e of iter) {
        acc = func(acc, e)
    }
    return acc;
})
const filter = curry((f, iter) => {
    let res = []
    for(const e of iter) {
        if( f(e) ){
            res.push(e)
        }
    }
    return res
})
const map = curry((f, iter) => {
    let res = []
    for(const e of iter) {
        res.push(f(e))
    }

    return res;
})

const go = (...funcs) =>  reduce( (a, func) => func(a), funcs)
const pipe = (...funcs) => (a) => go(a, ...funcs)


// go(
//     products,
//     products => filter(p => p.price < 20000, products),
//     products => map(p => p.price, products),
//     prices => reduce(add, prices),
//     log
//   )
go(
    products,
    filter(p => p.price < 20000),
    map(p => p.price) ,
    reduce(add),
    log
  )


  //curry : 인자개수만큼 받으면 -> 함수를 실행
  // 받아둔 함수를 내가원하는 시점에 평가.
  // 함수를 받아서 -> 함수 리턴
  // 인자를 받아서 -> 인자를 받는다 -> 원하는 개수의 인자를 받았다면 -> 받아둔 함수를 나중에 평가

  // 인자의 2개이상 전달됐다면 -> func(a, ...args) 바로실행
  // 아니라면 -> 함수를 리턴한다.
//   const curry = func => (a, ...args) => args.length ? func(a, ...args) : (...args) =>  func(a, ...args)

  const mult = curry( (a,b) => a*b);
  log(mult(1))
  log(mult(1)(2))
  

  // 함수조합으로 함수 만들기
  // 중복제거
  const total_price = pipe(
    map(p => p.price),
    reduce(add)
  )


const base_total_price = predi => pipe(
    filter(predi),
    total_price
)

// go(
//     products,
//     filter(p => p.price < 20000),
//     map(p => p.price) ,
//     reduce(add),
//     log
//   )

  go(
    products,
    base_total_price(p => p.price<20000),
    log
  )

//   go(
//     products,
//     filter(p => p.price >= 20000),
//     map(p => p.price) ,
//     reduce(add),
//     log
//   )

go(
    products,
    base_total_price(p => p.price >= 20000),
    log
)