---
layout: page
title: Slices
---

A slice is a collection of values typed only by the element type, not the
length of the collection.

{% highlight go %}
names = []{"Sarah", "Joe", "Maxime"}

numbers : []{int}
numbers = []{1, 2, 3, 4, 5}
{% endhighlight %}

Slice elements can be accessed with square brackets:

{% highlight go %}
greeting = "Hello, " ++ names[0]

twoLevelSlice = []{[]{1, 2, 3}, []{4, 5, 6}}
isSix = twoLevelSlice[1][2] == 6
{% endhighlight %}
