const log = console.log;
export const reduce = (func, acc, iter) => {
    if(!iter) {
        // 이터레이터가 아니라면
        // acc의 이터레이터로한다.?
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
        
    }

    for(const e of iter) {
        acc = func(acc, e);
    }

    return acc;
}

/**
 * const arr = [0,1,2,3,4,5]
 * iter: [0,1,2,3,4,5]
 * const add = (a,b) => a+b
 * const acc =0(초기값)
 * reduce( add , acc, iter:[0,1,2,3,4,5])
 */
const add = (a,b) => a+b;
const arr = [0,1,2,3,4,5];
log(reduce(add, 0, arr))





// 인자들을 통해서 하나의 값으로 축약
// 연속적으로 하나의 일을 한다. 
//=> reduce를 사용하여 축약하여 하나의 값으로 만들어 나간다.
export const go = (...args) => reduce( (a,f) => f(a) , args);


go (0, a=> a+1, a=> a+10 , a=> a+100, log) // 111
/**
 * 
 * args: 0, a => a+1, a=> a+10, a=> a+100, log
 * 
 * 1) a: 0 , f: a => a+1
 * f(0)=0+1 => 다음 a가 됨.
 * args: a=> a+10, a=> a+100, log
 * 
 * 
 * 2) a: 1, f: a=> a+10
 * f(1)=1+10 => 다음 a가 됨
 * args: a => a+100, log
 * 
 * 3) a: 11, f: a=>a+100
 * f(11)=11+100 => 다음a가 됨
 * args: log
 * 
 * 4) a: 111, f: log
 * f(a)=console.log(111) => 111출력
 * 다음a가 곧 결과가 됨.
 */



// 함수를 리턴하는 함수
// 내부에서 go를 사용
export const pipe = (...funcs) => (a) => go(a, ...funcs)
const pipe2 = (f, ...funcs) => (...a) => go(f(...a), ...funcs)

const _f = pipe(
    a=> a+1,
    a=> a+10,
    a=> a+100
);

log(_f(0))

const f = pipe2(
    (a,b) => a+b,
    a=> a+1,
    a=> a+10,
    a=> a+100
);
log(f(0,-1));



