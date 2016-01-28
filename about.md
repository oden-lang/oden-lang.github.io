---
layout: page
title: About
permalink: /about/
---

Oden is an experimental, statically typed, functional programming language,
built for the Go ecosystem. It aims to leverage the great features of Go
&mdash; static linking, cross-compilation, goroutines, channels and the
great set of libraries and tools &mdash; and enable higher-level
abstractions, generics and a safer yet more flexible type system.

## Goals

These are the primary goals and tradeoffs as well as non-goals for the
first iterations of Oden. To be extra clear, *this is currently an
experimental language and it might change drastically*.

* A functional language **inspired by Haskell, LISP and Go** compiling
  to Go.
* Oden should feature a safe but versatile type system - more flexible than the
  one in Go and at least as safe.
  - Generics (parametric polymorphism).
  - Heavy type inference.
  - Support for type annotations on top-level forms.
  - Polymorphic user-defined compound types.
* Immutable data structures.
* Higher-level abstractions for error handling, nil checking etc.
* Pattern matching with exhaustiveness checking.
* Support the built-in types of Go and provide simple interoperability. Oden
  should be *another language for the Go ecosystem*.
* The prototype compiler should be easy to change.
* **Fun to program in!**

### Shortcuts/Tradeoffs

The first versions of Oden should **not** focus on:

* A fast compiler. Emphasis lies on a simple implementation with
  correct semantics, not compilation speed.
* Easy workflow. After running the Oden compiler the user might
  have to step in to a directory of output Go files and run `go build`
  etc.
* Producing beautiful Go code.
* Easy Go-to-Oden interopability (calling Oden code from Go). It
  might turn out easy after all, but that is not an explicit goal.

### Non-goals

* A "Go backend" for Scheme or Clojure. There's no compatibility with
  any existing LISP, or any other language for that matter.
* A Haskell-clone.
* Macros. Might be considered in the future, but not a focus for now.

## Contributing

We are committed to providing a welcoming and inspiring community for all and
expect our [Code of Conduct](/code-of-conduct/) to be
honored. Anyone who violates this code of conduct may be banned from the
community.

If you find this project interesting and want to help work on it, you
can submit bug reports, suggestions and change requests at
[the GitHub issues page](https://github.com/oden-lang/oden/issues).

Please start by posting an issue even if you have a pull request ready,
so we can begin with a discussion.

