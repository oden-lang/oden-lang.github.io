---
layout: post
title:  "Overloaded Operators and float64"
date:   2016-05-23 19:00:00 +0100
author:
  name: Oskar Wickström
  url: https://wickstrom.tech
categories: news
comments: true
---

Finally, with Oden 0.3.1, overloaded operators are here! As soon as the first
*Protocol* support was completed I started working on operators being aliases for
built-in protocols methods, thus making it possible to overload them just like
you would do with regular protocol methods.

And by having this new feature, Oden finally supports the `float64` type from
Go. It couldn't be added in a proper way until the operator overloading worked
as it does now, that's why it took a while. The following program uses the
`math.Pi` constant from Go, which is a floating point number.

<div class="playground-runnable">
{% highlight go %}
package main

import math

main() = println(math.Pi)
{% endhighlight %}
</div>

Oden 0.3.1. is available in the [Playground](https://playground.oden-lang.org/)
and the I've just added a new [section on
Protocols](/user-guide/latest/the-language/protocols.html) in the User Guide.

