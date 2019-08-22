
export type Nil = []

export type Cons<H, T extends Array<any>> =
    T extends Array<any> ?
        [(x: H, ...xs: T) => void] extends [(...args: infer ITEMS) => void] ? ITEMS
        : never
    : never

type C1 = Cons<'a' | 'b', ['b', 'c'] | ['x', 'y']>
type C2 = Head<C1>
type C3 = Tail<C1>

export type Head<L extends [any, ...Array<any>]> =
    L extends Array<any> ?
    [(...args: L) => void] extends [(x: infer H, ...xs: any) => void] ? H : never
    : never

export type Tail<L extends [any, ...Array<any>]> =
    L extends Array<any> ?
    [(...args: L) => void] extends [(x: any, ...xs: infer T) => void] ? T : never
    : never

export type IsNil<L extends Array<any>> =
    L extends [] ? true : false

export type Reverse_<L extends Array<any>, R extends Array<any>> =
    L extends [] ?
        {r: R} :
        L extends [any, ...Array<any>] ?
            {r: Reverse_<Tail<L>, Cons<Head<L>, R>>['r'] } :
            never

export type Reverse<L extends Array<any>> = Reverse_<L, []>['r']

export type AppendTuple<L extends Array<any>, R extends Array<any>> =
    Reverse<L> extends infer IL ?
        IL extends Array<any> ? Reverse_<IL, R>['r'] : never :
        never


type W1 = Reverse<Cons<'a', Cons<'b', Nil>>>
type W2 = Reverse<[1, 2, 3, 4, 5] | ['a', 'b']>
type AA11 = AppendTuple<['a', 'b'] | ['x'], ['c', 'd']>
type AA12 = AppendTuple<['a', 'b'], ['c', 'd'] | ['y']>
type AA13 = AppendTuple<['a', 'b'] | ['x'], ['c', 'd'] | ['y']>
type AA2 = AppendTuple<['a', 'b'], [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]>

type AA21 = AppendTuple<AA12, AA13>

export type Zip<A extends Array<any>, B extends Array<any>> = Zip_<A, B>['r']

export type Zip_<A extends Array<any>, B extends Array<any>> =
    A extends [infer X1, ...Array<any>] ?
        B extends [infer X2, ...Array<any>] ?
            {r: Cons<[X1, X2], Zip_<Tail<A>, Tail<B>>['r']> } :
            {r: []} :
        {r: []}

type U = Zip<[1, 2, 3] | [99, 100], [5, 6, 7] | [44, 55]>

type Map_TEMPLATE<A extends Array<any>> = Map_TEMPLATE_<A>['r']

type Map_TEMPLATE_<A extends Array<any>> =
    A extends [infer X1, ...Array<any>] ?
        {r: Cons<F_TEMPLATE<X1>, Map_TEMPLATE_<Tail<A>>['r']> } :
        {r: Nil}

type F_TEMPLATE<T> = T
