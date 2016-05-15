---
layout: page
title: Records
---

Records are used to create a composite value of named values &mdash; they're
like a mix of objects in Javascript and structs in Go.
You can read more about record types in the [Type System](/user-guide/language-reference/type-system.html#records)
documentation.

To create a record you use curly brackets enclosing a comma-separated list of
field names and values to initialize the record value with.

{% highlight go %}
player = {
  health = 100,
  attack = {
    cooldown = 3,
    damage = 5
  },
  armor = 30
}
{% endhighlight %}

The type of the value `player` is:

{% highlight go %}
{ health : int, attack : { cooldown : int, damage : int }, armor: int }
{% endhighlight %}

### Record Fields

Fields of records can be accessed using the dot operator.

{% highlight go %}
damagePerMinute(p) = p.attack.damage * 60 / p.attack.cooldown
{% endhighlight %}

A function definition like `damagePerMinute` gets inferred to take a value `p`
of type `{ attack : { damage : int, cooldown : int | b } | a }` where `a` and
`b` are row variables. This is described in detail in the [Type System](
/user-guide/language-reference/type-system.html#records) documentation.
