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

When calling a function imported from Go the function gets curried, so you can
partially apply it just like you can with Oden functions.

<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

## Records

Records are used to group related data into a composite structure. They are
quite similar to objects in Javascript, but are statically typed by their
fields. The order of fields in a record is not significant - two records are
considered equal if they have the same set of fields with the same types.

### Polymorphic Records

A record type can be polymorphic, i.e. it can allow extra unknown fields. This
is useful when you want to write a function that accepts some record value that
has a certain field, but you don't care if has extra fields or not. This can be
expressed in the type system using a *row varible*. The concept of *rows* is
the underlying construct on which records are built upon.

The following type signature says that `getName` takes any record with **at
least** the field `name` with type `string`. When instantiated with a concrete
record type the row variable `r` will be bound to a row contain all other
fields.

{% highlight go %}
getName : forall r. { name : string | r } -> string
{% endhighlight %}

For more information on these concepts, see the work that Oden records is
based on:

* *A Polymorphic Type System for Extensible Records and Variants*, Benedict R.
  Gaster and Mark P. Jones ([PDF](http://www.cs.cmu.edu/~aldrich/courses/819/papers/row-poly.pdf))
* *Extensible records with scoped labels*, Daan Leijen ([PDF](http://research.microsoft.com/pubs/65409/scopedlabels.pdf))
