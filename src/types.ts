
export type ExactMatch<A, B> = [A] extends [B] ? [B] extends [A] ? true : false : false

export type ToBool<T> = [T] extends [never] ? false : true

export type HasOptionals<T extends object> = undefined extends T[keyof T] ? T : never

export type TupleToUnion<T extends Array<any>> = T extends Array<infer ITEMS> ? ITEMS : never

export type UnionToIntersection<T> = (T extends any ? (a: T) => void : never) extends ((a: infer ITEM) => void) ? ITEM : never

export type Distributed<T> = T extends any ? [T] : never

export type NonDistributed<T> = [T] extends any ? [T] : never

type D1 = Distributed<'a' | 'b'>
type D2 = NonDistributed<'a' | 'b'>

// returns never if union has at least 2 types which are not never
export type NotAUnionType<T> = ExactMatch<Distributed<T>, NonDistributed<T>> extends true ? T : never

type D3a = number | string & boolean
type D3 = NotAUnionType<D3a>
type D4 = NotAUnionType<'a' | {x: 1}>
type D5 = NonDistributed<string | number | boolean>
type D6 = Distributed<string | number | boolean>
type D7 = ExactMatch<never, never>

export type UnionOfProperties<T extends object> =
    [T] extends [NotAUnionType<T>] ?
    {
        [K in keyof T]: [K, T[K]]
    }[keyof T]
    : never

type X1 = UnionOfProperties<{a: string, b: 2}>
type X2 = UnionOfProperties<{a: string, b: 2} | {a: 3, y: 2}>
