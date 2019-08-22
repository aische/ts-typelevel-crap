type App<A, B> = ["App", A, B]
type Abs<Name extends string, Body> = ["Abs", Name, Body]

type Subst<Name extends string, Value, Expr> =
    Expr extends Name ? {r: Value} :
    Expr extends App<infer A, infer B> ? {r: App<Subst<Name, Value, A>['r'], Subst<Name, Value, B>['r']>} :
    Expr extends Abs<infer N, infer Body> ?
        N extends Name ? {r: Abs<N, Body>} :
        {r: Abs<N, Subst<Name, Value, Body>['r']> } :
    {r: Expr}

type Eval<Expr> =
    // Expr extends App<infer A, infer B> ? {r: Apply<Eval<A>['r'], Eval<B>['r']>['r'] } :
    Expr extends App<infer A, infer B> ? {r: Apply<Eval<A>['r'], B>['r'] } :
    {r: Expr}

type Apply<F, A> =
    F extends Abs<infer Name, infer Body> ? Eval<Subst<Name, A, Body>['r']> :
    never

type Evaluate<Expr> = Eval<Expr>['r']

type Expr1 = App<App<Abs<"x", Abs<"y", "x">>, 1>, 2>
type Result1 = Evaluate<Expr1>
