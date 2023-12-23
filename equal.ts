export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false
export type Expect<T extends true> = T

type a = {a: string} extends {readonly a: string} ? true : false; // true
type b = {readonly a: string} extends {a: string} ? true : false; // true
type c = {a: string} extends {a?: string} ? true : false; // true
type d = {a?: string} extends {a: string} ? true : false; // false

type A = {
  value: string
  value1: boolean
}
type B = {
  value: string
  value1: boolean
  value2: boolean
}

interface IA {
  value: string
  value1: boolean
}

type Case = [
  Expect<Equal<A, IA>>,
  Expect<Equal<A, A>>,
  // @ts-expect-error
  Expect<Equal<A, B>>,
  Expect<Equal<boolean, boolean>>
]

