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
0.2.1-RC1](#). They are optional but recommended to use.

{% highlight clojure %}
(: identity (int -> int))
(def (incr n) (+ n 1))

(: twice ((#a -> #a) -> (#a -> #a)))
(def (twice f x) (f (f x)))

(: two int)
(def two (twice incr 0))
{% endhighlight %}

If you find any issues please [report them on GitHub](https://github.com/oden-lang/oden/issues).
