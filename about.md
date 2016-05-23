---
layout: page
title: About
permalink: /about/
---

Oden is an experimental, statically typed, functional programming language,
built for the Go ecosystem. It aims to leverage the great features of Go
&mdash; static linking, cross-compilation, goroutines, channels and the
great set of libraries and tools &mdash; and enable higher-level
abstractions, polymorphism and a safer yet more flexible type system.

## Goals

These are the primary goals and tradeoffs as well as non-goals for the
first iterations of Oden. To be extra clear, *this is currently an
experimental language and it might change drastically*.

* A functional language inspired by Haskell, LISP and Go compiling
  to Go.
* Oden should feature a safe but versatile type system - more flexible than the
  one in Go and at least as safe.
  - Polymorphism (parametric and ad hoc).
  - Heavy type inference.
  - Support for type annotations on top-level forms.
  - Polymorphic user-defined compound types.
  - Higher-kinded types.
* Immutable data structures.
* Higher-level abstractions for error handling, nil checking etc.
* Pattern matching with exhaustiveness checking.
* Support the built-in types of Go and provide simple interoperability. Oden
  should be *another language for the Go ecosystem*.
* The compiler should be easy to change and hack on.
* **Fun to program in!**

### Shortcuts/Tradeoffs

The first versions of Oden should **not** focus on the following objectives.
They may be achieved anyway, but that should be regarded as a bonus.

* A fast compiler. Emphasis lies on a simple implementation with
  correct semantics, not compilation speed.
* Easy workflow. After running the Oden compiler the user might
  have to step in to a directory of output Go files and run `go build`
  etc.
* Producing beautiful Go code.
* Easy Go-to-Oden interopability (calling Oden code from Go). It
  might turn out easy after all, but that is not an explicit goal.

### Non-goals

* A "Go backend" for another existing language. Oden is a language on its own.
* A Haskell-clone. Great ideas from Haskell and other languages do influence
  Oden but it's really not a Haskell clone.
* Macros. Might be considered in the future, but not a focus for now.

## Community

<img src="/img/oden-logo@3x.png" alt="Oden Logo" style="float: right; margin-left: 10px;" width="144" height="120">

We are committed to providing a welcoming and inspiring community for all and
expect our [Code of Conduct](/code-of-conduct/) to be
honored. Anyone who violates this code of conduct may be banned from the
community.

### Spaces

The following spaces are ideal for asking questions, discussing language design
and high-level ideas, as well as keeping up to date with the project:

* Mailing List: [oden-lang](https://groups.google.com/forum/#!forum/oden-lang)
* IRC: [#oden at Freenode](irc://freenode.net/oden)

### Contributing

If you find the Oden project interesting and want to help work on it, you can
submit bug reports and change requests at [the GitHub issues
page](https://github.com/oden-lang/oden/issues).

