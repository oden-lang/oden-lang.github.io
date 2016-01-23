---
layout: page
title: Forms
---

Oden is very simple and supports only a small set of forms. This document
describes those forms and how you can compose programs with them.

## Lists

Drawing inspiration from Lisps, Oden is built on lists. Lists are used for
special forms and function application. A list is written `(x y z ...)` where
`x`, `y`, `z` and so on are elements in the list.

*Note that there is no support for lists in runtime yet.*

## Number Literals

The only supported number literal right now is that of the `int` type.

{% highlight clojure %}
123
-588
{% endhighlight %}

## Boolean Literals

There are two boolean literals, `true` and `false`, just as in Go.

{% highlight clojure %}
true
false
{% endhighlight %}

## String Literals

{% highlight clojure %}
"hello"
""
"\nomg\nnewlines"
{% endhighlight %}

## (> prefix infix)

The syntax of Oden favors prefix over infix notation. For that reason, some of
the infix operators of Go are called as regular functions in Oden.

{% highlight clojure %}
(+ 1 2)
(- 1 2)
(* 2 2)
(/ 4 2)
(/ (- 100 50) 2)
(+ 100 (+ 50 25))
(== 1 2)
(!= 1 2)
(++ "Foo" "Bar")
(and (not false) (or true (== 1 2)))
{% endhighlight %}

*Currently it is not possible to use these operator functions as first-class
values, passing them to functions or using them in a let,
e.g. `(map + numbers)`. One could however wrap them in a standard function and
pass that to a higher-order function.*

## Boolean Logic

Boolean logic functions `not`, `and` and `or` correspond to the Go operators
`!`, `&&` and `||` respectively, but are written with prefix notation as all
other function applications.

## Functions

A function is created using a `fn` expression. It supports zero or
more arguments and a single expression as the body.

{% highlight clojure %}
(fn (x) (+ x 1))
{% endhighlight %}

Functions can be defined at the top level just like values are defined, using
`def` and function expressions. However, as defining functions is a common
task, a shorthand can be used.

{% highlight clojure %}
(def identity (fn (x) x))
;; can be written using the shorthand:
(def (identity x) x)
{% endhighlight %}

It is recommended to add an explicit type signature to definitions. Type
signatures must be written before the definition. A type signature without a
corresponding definition causes and error.

{% highlight clojure %}
;; a type signature for `identity`, specifying the type to be (#a -> #a)
(: identity (#a -> #a))
(def (identity x) x)

(: another-function (#b -> #a))
;; no def here, so we will get an error message when compiling
{% endhighlight %}

### Recursion

Defined functions can call themselves recursively. There is currently no
*tail call optimization* being done in Oden, so be careful with these.

{% highlight clojure %}
(def (factorial n)
  (if (< n 2)
      1
      (* n (factorial (- n 1)))))
{% endhighlight %}

## Control Flow

The `if` expression has the type `(bool -> (#a -> (#a -> #a)))`.

{% highlight clojure %}
(if (== (+ 10 20) 30) 1 0)
{% endhighlight %}

## Let Binding

The let expression binds identifiers for a set of expressions, used
in the body expression.

{% highlight clojure %}
(let ([x 1]) (+ x 2))
{% endhighlight %}

Let supports sequential binding, which means that expressions can
use the identifiers of previous bindings, as well as shadowing
previous names.

{% highlight clojure %}
(let ([x 1]
      [y (+ 1 x)])
  (/ y 2))

(let ([x 1]
	  ;; here x gets rebound based on the previous x
	  [x (+ x 1)])
  (* x 2))
{% endhighlight %}

## Function Application

Functions are applied using lists; the first element of the list is the
function and the rest of the elements are the arguments.

{% highlight clojure %}
(f x y z ...)
{% endhighlight %}

Here we call our newly created `square` function with the argument `4`.

{% highlight clojure %}
(let ([square (fn (x) (* x 2))])
  (square 4))
{% endhighlight %}

Oden also supports functions which take no arguments.

{% highlight clojure %}
(let ([make-num (fn () 3)])
  (* (make-num) (make-num)))
{% endhighlight %}
