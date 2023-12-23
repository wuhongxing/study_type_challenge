import type { Expect, Equal } from "./equal"

// 数组变成联合类型
type ArrayToUnion<T extends unknown[]> = T[number]
type UnionToIntersection<T> = (T extends object ? (k: T) => void : never) extends (k: infer U) => void ? U : never;
type LastInUnion<U> = UnionToIntersection<
  U extends unknown ? (x: U) => 0 : never
> extends (x: infer L) => 0
  ? L
  : never
type UnionToArray<T, L = LastInUnion<T>> = [T] extends [never] ? [] : [...UnionToArray<Exclude<T, L>>, L]

// 数组转化成对象
type ArrayToObject<T extends PropertyKey[]> = { [P in T[number]]: P }

// string 转 array
type StringToArray<T extends string> = T extends `${infer F}${infer L}` ? [F , ...StringToArray<L>] : []

// string 转联合类型
type StringToUnion<T extends string> = ArrayToUnion<StringToArray<T>>

// 数组转 string - 这里使用到了一个技巧判断数组是不是空 T['length'] extends 0
type ArrayToString<T extends unknown[], U extends string | number> = T extends [infer F extends string, ...infer L] ? L['length'] extends 0 ? `${F}` : `${F}${U}${Join<L, U>}` : ''

// 获取数组的长度
type ArrayLength<T extends unknown[]> = T['length']

// 联合类型减法
type MyExclude<T, U extends T> = T extends U ? never : T

// 判断数组中的每一项，所有项都匹配才会返回 true，否则返回 false
type IsNumberArray<T extends unknown[]> = T[number] extends number ? true : false

// 判断是不是 never
type IsNever<T> = [T] extends [never] ? true : false
// 提取对象中指定类型的 key，以下两种方法均可以
type MyExtractKeys<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T]
type MyExtractKeys1<T, U> = keyof { [K in keyof T as T[K] extends U ? K : never]: T[K] };

type Case = [
  Expect<Equal<ArrayToUnion<[1, 2, 3]>, 1 | 2 | 3>>,
  Expect<Equal<UnionToArray<1 | 2 | 3>, [1, 2, 3]>>,
  Expect<Equal<ArrayToObject<[1, 2]>, { 1: 1, 2: 2 }>>,
  Expect<Equal<StringToArray<'abc'>, ['a', 'b', 'c']>>,
  Expect<Equal<StringToUnion<'abc'>, 'a' | 'b' | 'c'>>,
  Expect<Equal<ArrayLength<[1, 2, 3]>, 3>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<IsNumberArray<[1, 2, 3]>, true>>,
  Expect<Equal<IsNumberArray<[1, 2, 'b']>, false>>,
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<any>, false>>,
  Expect<Equal<UnionToIntersection<1 | 2 | 3>, 1 & 2 & 3>>
]
