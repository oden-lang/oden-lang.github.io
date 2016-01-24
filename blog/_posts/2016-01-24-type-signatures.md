---
layout: post
title:  Type Signatures
date:   2016-01-24 16:00:00 +0100
author: Oskar Wickström
categories: compiler
comments: true
---

In the spirit of making Oden code more understandable and to help the developer
writing the code, support for type signatures has been added in [Oden
0.2.1-RC1](https://github.com/oden-lang/oden/releases/tag/0.2.1-RC1).

Type signatures are optional but recommended to use. Read more about defining
functions and type signatures in the [Language
Reference](/user-guide/language-reference/forms.html#functions).

{% highlight clojure %}
(: incr (int -> int))
(def (incr n) (+ n 1))

(: twice ((#a -> #a) -> (#a -> #a)))
(def (twice f x) (f (f x)))

(: two int)
(def two (twice incr 0))
{% endhighlight %}

Please try the feature out [in the Oden
Playground](http://playground.oden-lang.org/) and don't hesitate to [report
issues on GitHub](https://github.com/oden-lang/oden/issues).
