---
layout: page
title: Let Bindings
---

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

