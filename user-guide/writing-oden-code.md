---
layout: page
title: Writing Oden Code
---

In Oden the following rules apply:

* Every source file corresponds to a single package.
* Source files must begin with the `pkg` declaration. The declaration should,
  unlike in Go, specify the complete name, e.g. `(pkg a/b/c)`.
* Source files may use zero or more `import` declarations after the `pkg`
  declaration.
* Source files may, after `pkg` and any `import` declarations, define zero or
  more functions and values using `def`. The order of definitions does not matter
  - a value `foo` can be the last defined value even if it's referenced before.

## Example

{% highlight scheme %}
;; package declaration
(pkg main)

;; import declaration
(import fmt)

;; value definition
(def result (++ (identity-string "Hello") ", world!"))

;; function definition can also use the function shorthand (like Scheme)
;; and type signatures
(: identity-string (string -> string))
(def (identity-string x) x)

;; main function definition, must have type (-> unit)
(def (main) (fmt.Println result))

{% endhighlight %}
