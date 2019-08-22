
export type Pair1<A,B> = [A] extends any ? [B] extends any ? [A, B] : never : never

export type Pair2<A,B> = A extends any ? [B] extends any ? [A, B] : never : never

export type Pair3<A,B> = [A] extends any ? B extends any ? [A, B] : never : never

export type Pair4<A,B> = A extends any ? B extends any ? [A, B] : never : never

type P1 = Pair1<'a' | 'b', 'x' | 'y'>
type P2 = Pair2<'a' | 'b', 'x' | 'y'>
type P3 = Pair3<'a' | 'b', 'x' | 'y'>
type P4 = Pair4<'a' | 'b', 'x' | 'y'>
