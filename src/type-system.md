# Type System

Oden aims to be a flexible and powerful functional language. The
type system should help ensure the correctness of your programs
without getting in the way. Oden builds on an extended typed lambda
calculus and performs type inference on your code.

## Built-in Types

Just like in Go, there are some built in types:

* `boolean`
* `int`
* `string`
* `unit`

### Unit

The `unit` type represents *no value*. It is used for functions that
causes side effects and have no useful return value.

Unit is also used for interopability with functions in Go that has no
return value at all. For example, the Go expression `func (s string) {
fmt.Println(s) }` would have the type `(string -> unit)` in Oden.

The literal `unit` has the type `unit`.

## Type Variables

Polymorphic function types can contain of *type variables*. These are like
placeholders for the types used when applying the polymorphic function. A
type variable *a* is notated `#a`.

```scheme
;; type of the identity fn
(#a -> #a)
```

When applying the identity function to an int the *instantiated* type
of identity will be `(int -> int)`. In other words, all occurences of `#a` are
substituted for `int`.

*Currently all type variables are generated automatically by the type inference
process. Explicit type signatures and annotations will hopefully be supported
some day.*

## Functions

The type of a function $$f\colon A \to B$$ is written `(A -> B)`.

### Currying

Oden supports [*currying*](https://en.wikipedia.org/wiki/Currying)
by default. The type of a function $$f\colon X \to (Y \to Z)$$ is
written `(X -> (Y -> Z))` which reflects that it is actually a
curried function.

Oden lets you write `(fn (x y z) x)` but that gets translated
to `(fn (x) (fn (y) (fn (z) x)))` and the inferred type
becomes `(a -> (b -> (c -> a)))`.

### No-argument Functions

Functions that take no argument, often used to introduce lazyness, are written
in a similary way. A function that takes no argument and returns an `int` is
written `(-> int)`.

### Go Functions

When import functions written in Go the type system treats them differently.
They do not support currying by default but the application of such functions
look the same, i.e. `(f a1 a2 a3 ...)`.

Oden also supports calling variadic Go functions.

```clojure
(pkg main)

;; import the fmt package from Go
(import fmt)

;; apply the variadic Go func "fmt.Println" to three strings
(def (main) (fmt.Println "foo" "bar" "baz"))
```
