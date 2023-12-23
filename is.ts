import { Expect, Equal } from "./equal"
function isBoolean(val: unknown): val is boolean {
  if (typeof val === 'boolean') return true
  return false
}

function isString(val: unknown): val is string {
  if (typeof val === 'string') return true
  return false
}

type Case = [
  Expect<Equal<ReturnType<typeof isBoolean>, boolean>>,
  Expect<Equal<ReturnType<typeof isString>, boolean>>
]


