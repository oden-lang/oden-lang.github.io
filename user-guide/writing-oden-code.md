---
layout: page
title: Writing Oden Code
---

In Oden the following rules apply:

* Every source file corresponds to a single package.
* Source files must begin with the `pkg` declaration. The declaration should,
  unlike in Go, specify the complete name, e.g. `package a/b/c`.
* Source files may use zero or more `import` declarations after the `package`
  declaration.
* Source files may, after `package` and any `import` declarations, define zero or
  more functions and values.

## Example

{% highlight go %}
// package declaration
package main

// import declaration
import fmt

// function definition can also use the function shorthand
// and type signatures
shout :: string -> string
shout s -> s ++ "!"

// value definition
result = shout("hello, world")

// main function definition, must have type: -> unit
main -> fmt.Println(result)
{% endhighlight %}
