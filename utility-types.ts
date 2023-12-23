type MyExtractKeys<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];
type MyExtractKeys1<T, U> = keyof { [K in keyof T as T[K] extends U ? K : never]: T[K] };

type A = MyExtractKeys<{
  name: string,
  name1: string,
  age: number,
}, string>


