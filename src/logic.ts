import {Cons, Zip, Tail} from './tuple'

export type And<A extends boolean, B extends boolean> =
    A extends true ? B extends true ? true : false : false

export type Or<A extends boolean, B extends boolean> =
    A extends false ? B extends false ? false : true : true

export type Not<A extends boolean> =
    A extends true ? false : true

export type XOr<A extends boolean, B extends boolean> =
    Or<And<A, Not<B>>, And<Not<A>, B>>


type X = XOr<false, true>

type Q1 = 'a' extends ('a' | 'b') ? true : false
type Q2 = 'a' & 'b' extends 'a' ? true : false
type Q3 = 'a' & 'b' extends 'a' | 'c' ? true : false



type HalfAdd<A, B, C> =
    [A, B, C] extends [true,  true,  true]  ? [true, true]  :
    [A, B, C] extends [true,  true,  false] ? [true, false] :
    [A, B, C] extends [true,  false, true]  ? [true, false] :
    [A, B, C] extends [true,  false, false] ? [false, true] :
    [A, B, C] extends [false, true,  true]  ? [true, false] :
    [A, B, C] extends [false, true,  false] ? [false, true] :
    [A, B, C] extends [false, false, true]  ? [false, true] :
    [A, B, C] extends [false, false, false] ? [false, false]  :
    never

type Bits = Array<boolean>
type ZipBits = Array<[boolean, boolean]>

type Adder_<B extends ZipBits, O extends boolean> =
        B extends [[infer X, infer Y], ...Array<any>] ?
            (HalfAdd<X, Y, O> extends [infer O2, infer R] ?
                O2 extends boolean ?
                    Tail<B> extends Array<any> ?
                    {r: Cons<R, Adder_<Tail<B>, O2>['r']>} :
                    never : never : never) :
            B extends [] ? {r: [O]} :
            never

type Adder<B extends ZipBits> = Adder_<B, false>['r']

type B1 = [true, false, false]
type B2 = [true, true, false]
type X6 = Adder<Zip<B1, B2>>
