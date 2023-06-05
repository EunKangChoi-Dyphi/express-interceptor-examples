const log = console.log;
const arr = [1, 2, 3, 3, 3, 4, 5];
const str = 'abra-kadabra-alakazam-megaAlakazam-grachamp';

log(':::: ::::::::::: ES5');
// Array 순회
log('::::Arrray');
log(`arr[0]: ${arr[0]}`);
let iter = arr[Symbol.iterator];
log(iter);

iter = arr[Symbol.iterator](); // Array Iterator
log(iter);
log(iter.next()); //{ value: 1, done: false }
log(iter.next()); //{ value: 2, done: false }
log(iter.next()); //{ value: 3, done: false }
log(iter.next()); //{ value: 3, done: false }
log(iter.next()); //{ value: 3, done: false }
log(iter.next()); //{ value: 4, done: false }
log(iter.next()); //{ value: 5, done: false }
log(iter.next()); // {value: undefined, done: true}
// done: true가 되면 for-of 루프를 빠져나가도록 한다.

// for (const a of arr) log(a);

// arr[Symbol.iterator] = null;
// log(arr[Symbol.iterator]);

// Set 순회
log('::::Set');
const _set = new Set(arr);
log(_set);
log(`_set[0]: ${_set[0]}`); // undefined

// array가 이터러블
// array Symbol.iterator => 이터레이터를 리턴
// for...of 로 순회 => 이터러블/이터레이터 프로토콜을 따른다.
for (const a of _set) log(a);

iter = _set[Symbol.iterator];
log(iter);

iter = _set[Symbol.iterator]();
log(iter); // Set Iterator
log(iter.next()); //{ value: 1, done: false }
log(iter.next()); //{ value: 2, done: false }
log(iter.next()); //{ value: 3, done: false }
log(iter.next()); //{ value: 4, done: false }
log(iter.next()); //{ value: 5, done: false }
log(iter.next()); //{ value: undefined, done: true }

// Map 순회
log('::::::::::::Map');
const _map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);
log(_map);
log(`_map['a']: ${_map['a']}`); // undefined
for (const a of _map) log(a);
iter = _map[Symbol.iterator];
log(iter);

iter = _map[Symbol.iterator](); // Map Entries
log(iter);
// log(iter.next()); //{ value: [ 'a', 1 ], done: false }
// log(iter.next()); //{ value: [ 'b', 2 ], done: false }
// log(iter.next()); //{ value: [ 'c', 3 ], done: false }
// log(iter.next()); //{ value: undefined, done: true }

log(':::: iter2 = iter[Symbol.iterator]()');
let iter2 = iter[Symbol.iterator]();
log(iter2);
log(iter2.next());

log('::::: map.key::::');
// Map.keys는 이터레이터를 리턴한다. => value에 key 만 남게된다.
for (const key of _map.keys()) log(key);
iter = _map.keys()[Symbol.iterator]();
log(iter); // Map Iterator {'a' , 'b', 'c'}

// Map.values 또한 이터레이터를 리턴한다. => value에 value만 남겐된다.
for (const v of _map.values()) log(v);
iter = _map.values()[Symbol.iterator]();
log(iter);

// entry : key+value
for (const e of _map.entries()) log(e);

// Symbol : 객체의 키로 사용될 수 있다.
// 이터러블/이터레이터 프로토콜
// array, set, map => 내장객체, 이터러블/이터레이터 프로토콜을 따르고 있다.

// [이터러블]
// 이터러블은 이터레이터를 리턴하는 Symbol.iterator 메소드를 가진 값이다.
// array, set, map은 이터러블이다.

// [이터레이터]
// value, done 객체를 리턴하는 next() 메소드를 가진 값을 의미한다.

// [이터러블/이터레이터 프로토콜]
// 이터러블을 for ... of , 전개 연산자 등과 함께 동작하도록한 규약을 의미한다.
