// 选择对象中的某些 key
const value = {
  first: "hello",
  second: 1,
  third: true,
  fourth: {
    other: "world"
  }
}

type Value = typeof value
// 1. 联合类型中选择特定的
type MyExtract<T, U extends T> = T extends U ? T : never;
// 2. 联合类型中选择特定的
type MyExclude<T, U extends T> = T extends U ? never : T;
// 3. 选择特定的
type MyPick<T, K extends keyof T> = {
  [key in keyof T as key extends K ? key : never]: T[key]
}
type MyPick1<T, K extends keyof T> = {
  [P in K]: T[P]
}
// 4. 删除特定的
type MyOmit<T, K extends keyof T> = MyPick<T, MyExclude<keyof T, K>>;
// 5. 获取数组的长度
type Length<T extends []> = T['length']
// 6. 获取返回值的类型
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
// 7. 增加修饰符
type MyReadonly<T> = { +readonly [P in keyof T]: T[P]}
// 8. 增加修饰符
type MyPartial<T> = { [P in keyof T]+?: T[P] | null }

type TestPick = MyPick<Value, 'first' | 'second'>
type TextExtract = MyExtract<keyof Value, 'first' | 'second'>
type TestExclude = MyExclude<keyof Value, 'first' | 'second'>
type TestOmit = MyOmit<Value, 'first'>
type TestReturnType = MyReturnType<typeof setInterval>
type TestReadonly = MyReadonly<Value>
type TestPartial = MyPartial<Value>
