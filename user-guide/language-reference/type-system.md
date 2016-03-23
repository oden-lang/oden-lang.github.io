---
layout: page
title: Type System
---

Oden aims to be a flexible and powerful functional language. The
type system should help ensure the correctness of your programs
without getting in the way. Oden builds on an extended typed lambda
calculus and performs type inference on your code.

## Basic Types

The basic types are built-in special types:

* `boolean`
* `int`
* `string`
* `()`

### Unit

*Unit*, written `()`, is a built-in type that has only one value. It is mostly
used for functions that causes side effects and have no useful return value.

Unit is also used for interoperability with functions in Go that has no
return value at all. For example, the Go expression `func (s string) {
fmt.Println(s) }` would have the type `string -> ()` in Oden.

The literal `()` has the type `()` and is the only value for that type.

## Type Variables

Polymorphic function types can contain *type variables*. These are like
placeholders for the types used when applying the polymorphic function. A
type variable *a* is introduced using `forall`. This is called *universal
quantification*.

{% highlight go %}
// type of the identity function
forall a. a -> a
{% endhighlight %}

When applying the identity function to an int the *instantiated* type
of identity will be `int -> int`. In other words, all occurences of `a` are
substituted for `int`. These substitutions must match - `a -> a` cannot be
instantiated to `int -> string`, for example.

## Functions

The type of a function $$f\colon A \to B$$ is written `A -> B`.

### Currying

Oden supports [*currying*](https://en.wikipedia.org/wiki/Currying)
by default. The type of a function $$f\colon X \to (Y \to Z)$$ can be
written `X -> (Y -> Z)`. To make it more readable you can also write the same
type as `X -> Y -> Z`.

{% highlight go %}
// oden lets you write
(x, y, z) -> x
// but that gets translated to
(x) -> (y) -> (z) -> x
// and the inferred type becomes
forall a b c. a -> b -> c -> a
{% endhighlight %}

### No-argument Functions

Types of functions that take no argument, often used to introduce lazyness, are
written in a similary way - you just omit the parameter type before the arrow.
The type of a function that takes no argument and returns an `int` is written
`-> int`.

### Go Functions

When importing functions written in Go the type system treats them differently.
They do not support currying by default but the application of such functions
looks the same, i.e. `f(a1, a2, a3, ..., aN)`.

Oden also supports calling variadic Go functions.

{% highlight go %}
package main

// import the fmt package from Go
import fmt

// apply the variadic Go func "Println" to three strings
main -> fmt.Println("foo", "bar", "baz")
{% endhighlight %}

<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
