---
layout: page
title: Functions
---

A function is created using an parameter list followed by an arrow. The
parameter list can contain zero or more arguments and a single expression as
the body.

{% highlight go %}
(x) -> x + 1
{% endhighlight %}

The body can be a [block](/user-guide/language-reference/blocks).

{% highlight go %}
(x) -> {
  println("Read more about blocks below.")
  x + 1
}
{% endhighlight %}

Functions can be defined at the top level just like values are defined, using
names and function expressions. However, as defining functions is such a common
task, the function definition shorthand can be used.

{% highlight go %}
identity = (x) -> x
// can be written using the shorthand:
identity(x) = x
// ah, doesn't that read nicely?
{% endhighlight %}

It is recommended to add an explicit type signature to definitions. Type
signatures must be written before the definition. A type signature without a
corresponding definition causes an error.

{% highlight go %}
// a type signature for `identity`, specifying the type to be a -> a
// where `a` is a type variable
identity : forall a. a -> a
identity(x) = x

anotherFunction : forall a b. a -> b -> a
// missing definition here, so we will get an error message when compiling
{% endhighlight %}

### Function Application

Functions are applied using parenthesis and by separating parameters with
commas.

{% highlight go %}
f(x, y, z, ...)
{% endhighlight %}

Here we call our newly created `square` function with the argument `4`.

{% highlight go %}
let square = (x) -> x * 2 in square(4)
{% endhighlight %}

Oden also supports functions which take no arguments.

{% highlight go %}
let makeNum = () -> 3 in makeNum() * makeNum()
{% endhighlight %}

### Recursion

Top-level functions can call themselves recursively. There is currently no
*tail call optimization* being done in Oden, so be careful with these.

{% highlight go %}
factorial(n) = if n < 2 then 1 else n * factorial(n - 1)
{% endhighlight %}
