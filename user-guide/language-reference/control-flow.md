---
layout: page
title: Control Flow
---

The `if` expression has the type `forall a. bool -> a -> a -> a`.

{% highlight go %}
if 10 + 20 == 30 then 1 else 0
{% endhighlight %}

If the clauses get big you might consider using blocks around expressions, even
if you have only a single expression in each clause.

{% highlight go %}
if 10 + 20 == 30 then {
  thisFunctionCallIsVeryLength()
} else {
  andPerhapsThisOneAlso()
}
{% endhighlight %}

