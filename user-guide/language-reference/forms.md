---
layout: page
title: Forms
---

Oden is very simple and supports only a small set of forms. This document
describes those forms and how you can compose programs with them.

## Number Literals

The only supported number literal right now is that of the `int` type.

{% highlight go %}
123
-588
{% endhighlight %}

## Boolean Literals

There are two boolean literals, `true` and `false`, just as in Go.

{% highlight go %}
true
false
{% endhighlight %}

## String Literals

{% highlight go %}
"hello"
""
"\nomg\nnewlines"
{% endhighlight %}

## Operators

There are unary and binary operators in Oden.

{% highlight go %}
+y
-(1 - 2)
1 + 2
1 - 2
2 * 2
4 / 2
(100 - 50) / 2
100 * (50 + 25)
1 == 2
1 != 2
"Foo" ++ "Bar"
!x && (true || (1 == 2))
{% endhighlight %}

*Currently it is not possible to use these operators as first-class values,
passing them to functions or using them in a let, e.g. `map + numbers`. One
could however wrap them in a standard function and pass that to a
higher-order function.*

## Functions

A function is created using a `fn` expression. It supports zero or
more arguments and a single expression as the body.

{% highlight go %}
fn x -> x + 1
{% endhighlight %}

Functions can be defined at the top level just like values are defined, using
`def` and function expressions. However, as defining functions is a common
task, a shorthand can be used.

{% highlight go %}
identity = fn x -> x
// can be written using the shorthand:
identity x -> x
{% endhighlight %}

It is recommended to add an explicit type signature to definitions. Type
signatures must be written before the definition. A type signature without a
corresponding definition causes an error.

{% highlight go %}
// a type signature for `identity`, specifying the type to be (#a -> #a)
identity :: #a -> #a
identity x -> x

// the same thing but also declaring the type variables using forall
identity :: forall #a. #a -> #a
identity x -> x

anotherFunction :: #b -> #a
// missing definition here, so we will get an error message when compiling
{% endhighlight %}

### Recursion

Defined functions can call themselves recursively. There is currently no
*tail call optimization* being done in Oden, so be careful with these.

{% highlight go %}
factorial n -> if n < 2 then 1 else n * factorial(n - 1)
{% endhighlight %}

## Control Flow

The `if` expression has the type `bool -> #a -> #a -> #a`.

{% highlight go %}
if 10 + 20 == 30 then 1 else 0
{% endhighlight %}

## Let Binding

The let expression binds identifiers for a set of expressions, used
in the body expression.

{% highlight go %}
let x = 1 in x + 2
{% endhighlight %}

Let supports sequential binding, which means that expressions can
use the identifiers of previous bindings.

{% highlight go %}
let x = 1
    y = 1 + x
    in y / 2

{% endhighlight %}

Shadowing names are not allowed and will result in a compile error.

{% highlight go %}
let x = 1
    x = x * 2 // not ok as x is already defined
    in x * 2
{% endhighlight %}

## Function Application

Functions are applied using parenthesis and by separating parameters with
commas.

{% highlight go %}
f(x, y, z, ...)
{% endhighlight %}

Here we call our newly created `square` function with the argument `4`.

{% highlight go %}
let square = fn x -> x * 2 in square(4)
{% endhighlight %}

Oden also supports functions which take no arguments.

{% highlight go %}
let makeNum = fn -> 3 in makeNum() * makeNum()
{% endhighlight %}

## Blocks

A block is an expression containing *zero or more* expressions. A block
expression evaluates to the last expression in the block. Blocks can be used to
perform side-effects.

{% highlight go %}
x = {
  fmt.Println("Calculating...")
  9 * 1000
}
{% endhighlight %}

Disregarding the value of an expression, of any type other than `()`, causes an
error.

{% highlight go %}
x = {
  ()       // ok to disregard as it's of type ()
  9 * 1000 // causes an error
  fmt.Println("Done wasting CPU.")
}
{% endhighlight %}

Blocks may not be empty.

## Slices

A slice is a collection of values typed only by the element type, not the
length of the collection.

{% highlight go %}
names = []{"Sarah", "Joe", "Maxime"}

numbers :: []{int}
numbers = []{1, 2, 3, 4, 5}
{% endhighlight %}

## Tuples

A tuple is an immutable finite ordered collection of values. Unlike slices, the
values in a tuple can have different types.

{% highlight go %}
// lets first create some tuples representing people by storing the name and
// age
jessica = ("Jessica", 31)
frank = ("Frank", 26)

// as these tuples have the same type (string, int) we can store them in a
// slice that get's the type []{(string, int)}
people = []{jessica, frank, ("Maxime", 25)}
{% endhighlight %}
