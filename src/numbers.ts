export type Zero = []
export type Succ<T> = [T]

type Add_<A, B> =
    A extends Zero ? {result: B} :
    A extends Succ<infer R> ? {result: Add_<R, Succ<B>>['result'] } : never

export type Add<A, B> =
    A extends any ?
    B extends any ?
    Add_<A, B>['result']
    : never
    : never

type Mult_<A, B, Result> =
    A extends Zero ? {result: Result} :
    A extends Succ<infer R> ? {result: Mult_<R, B, Add<B, Result>>['result'] } : never

export type Mult<A, B> =
    A extends any ?
    B extends any ?
    Mult_<A, B, Zero>['result']
    : never
    : never

export type Less_<A, B> =
    B extends Zero
        ? {result: false}
        : A extends Zero
            ? {result: true}
            : A extends Succ<infer R>
                ? B extends Succ<infer Q>
                    ? {result: Less_<R, Q>['result'] }
                    : {result: false}
                : {result: false}


type Sum1 = Add<Succ<Zero>, Succ<Zero>>
type Less<A, B> = Less_<A, B>['result']
type One = Succ<Zero>
type Two = Succ<One>
type Three = Succ<Two>
type Four = Succ<Three>
type Five = Add<One, Four>

type Z1 = Less<Succ<Succ<Zero>>, Succ<Succ<Succ<Zero>>>>
type Z2 = Less<Four, Five>
type Z3 = Less<Four, Two>
type Z4 = Less<Four, Two|Five>

type Z5 = Add<One|Five, One>
type Z6 = Add<One, One|Five>

type M1 = Mult<Two, One|Two|Three>
