---
layout: page
title: Blocks
---

A block is an expression containing *one or more* expressions - it cannot be
empty. A block expression evaluates to the value of the last expression in the
block. Blocks can be used to perform side-effects.

{% highlight go %}
x = {
  println("Calculating...")
  9 * 1000
}
// x will be 9000
{% endhighlight %}

Discarding the value of an expression, of any type other than `()`, causes an
error.

{% highlight go %}
x = {
  ()       // ok to discard as it's of type ()
  9 * 1000 // causes an error
  println("Done wasting CPU.")
}
{% endhighlight %}

