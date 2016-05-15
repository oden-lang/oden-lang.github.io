---
layout: page
title: Control Flow
---

The only control flow mechanism available right now is the `if` expression.

{% highlight go %}
if 10 + 20 == 30 then 1 else 0
{% endhighlight %}

If the clauses get big you might consider using blocks around expressions, even
if you have only a single expression in each clause.

{% highlight go %}
if 10 + 20 == 30 then {
  thisFunctionCallIsVeryLengthy()
} else {
  andPerhapsThisOneAlso()
}
{% endhighlight %}

The `if` expression has the type `forall a. bool -> a -> a -> a`.

### Other Constructs

The plan is to support pattern matching as a central way to do control flow.
Other constructs may appear in the future as well, like `cond` from LISPs or
*Guards* from Erlang and Haskell.
