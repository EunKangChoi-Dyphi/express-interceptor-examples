/**
 *
 * 사용자 정의 이터러블 => 이터러블에 대해서 정확하게 알아내기
 */
const log = console.log;
const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false };
      },
      [Symbol.iterator]() {
        // 자기자신또한 이터러블이면서
        // 심볼이터러블을 실행했을때 자기자신을 리턴하면서
        // 이전까지 진행한상태에서 next() 할 수 있도록
        {
          return this; // 이터레이터를 반환. 이터러블을 이터레이터를 만들어서 순회.
        }
      },
    };
  },
};

let iterator = iterable[Symbol.iterator]();
log(iterator.next());
log(iterator.next());
log(iterator.next());
log(iterator.next());

for (const a of iterable) log(a);

log(':::::arr2 순회');
const arr2 = [1, 2, 3];
let iter2 = arr2[Symbol.iterator]();
iter2.next(); // {value: 1, done: false}
log(iter2[Symbol.iterator]() == iter2); // true , iter2[Symbol.iterator]()은 iter2 자기자신을 가리킨다. => well formed iterator/iterable
for (const a of iter2) log(a); // 2,3 만 출력

// well-formed iterator: 순회가 되도록 할 수 있는 이터러블/이터레이터.
// 순회가 가능한 형태.

// 전개연산자: ...
// 전개연산자도 iterator/iterable 프로토콜을 다른다.
const a = [1, 2];
log(a[Symbol.iterator]);
log(a[Symbol.iterator]());
let iter = a[Symbol.iterator]();
log(iter);
log(iter.next());
// a[Symbol.iterator] = null; // => 이터레이터를 null로하면 a는 이터러블이 아니라고 뜬다.
log([...a, ...[3, 4], ...[1, 2, 3, 4, 5]]);
