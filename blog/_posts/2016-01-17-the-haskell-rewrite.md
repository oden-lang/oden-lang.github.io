---
layout: post
title:  The Haskell Rewrite
date:   2016-01-18 06:00:00 +0100
author: Oskar Wickström
categories: compiler
comments: true
excerpt: >
  During December 2015 the Oden compiler was rewritten in Haskell. This post
  explains the motivation for moving away from Racket.
---

The process of writing the Oden compiler started with the type inferencer. This
was a subject I had been thinking a lot about and I was starting to grasp how
one might implement a Hindley-Milner type inference system. Most of the papers
and examples that I found used a mutating implementation. I wanted a functional
immutable one.

Previous explorations of [*core.typed* examples](
https://github.com/clojure/core.logic/wiki/Examples#a-type-inferencer-for-the-simply-typed-lambda-calculus)
suggested that logic programming was a nice way forward. Having just read up on
Racket and the ability to compile and package self-contained executables I
decided to use [*miniKanren*](http://minikanren.org/).

## Racket and miniKanren

Starting out with Racket and miniKanren was great! I do not regret this
decision one bit. I kept a fast pace implementing the type inference. The code
was very clear. The AST for Oden was simple Scheme data which made
"pattern-matching" with miniKanren easy as pie. The following is an excerpt of
the *infero* function, the heart of the inferencer.

{% highlight scheme %}
(define (infero expr env t)
  (conde
   ...
   ;; type-annotation
   [(fresh (s st te-ignore te)
           (== `(,s : ,st) expr)
           (== `(,te-ignore : ,st) te)
           (infero s env te)
   ;; symbol
   [(fresh (x)
           (symbolo expr)
           (lookupo expr env x)
           (== `(,expr : ,x) t))]
   ;; fn
   [(fresh (x b bt b-ignore r d wd ft)
           (symbolo x)
           (conde
            ;; if no type is specified wrap with 'unbound'
            [(== `(fn (,x) ,b) expr)
             (== `(unbound ,d) wd)]
            ;; if type is specified just use that
            [(== `(fn ([,x : ,d]) ,b) expr)
             (== d wd)])

           (infero b `((,x : ,wd) . ,env) bt)
           (== `(,b-ignore : ,r) bt)
           (== `((fn ([,x : ,d]) ,bt) : (,d -> ,r)) t))]
   ;; application
   [(fresh (f ft f-ignore a at a-ignore x et)
           (== `(,f ,a) expr)
           (infero f env ft)
           (infero a env at)
           (== `(,f-ignore : (,x -> ,et)) ft)
           (== `(,a-ignore : ,x) at)
           (== `((,ft ,at) : ,et) t))]
   ...
   ))
{% endhighlight %}

The infero relation accepted the same kind of data as input as it "returned".
To be clear, it didn't return the typed expression, it unified the logic
variable `t` with the typed expression. Inferring the explictly typed
expression `(123 : int)` would unify with `t` with `(123 : int)` - the same
value. In other words, the inference process just added explicit type
annotations where they were missing. The structure was the same.

Using this simple model tests were easy to write as well. Here's the test case
asserting that the type of the identify function is `(_.0 -> _.0)`.

{% highlight scheme %}
(test-case "identity fn"
  (check-equal?
   (run* (q)
         (fresh (_)
                (infero '(fn (x) x) '() `(,_ : ,q))))
   '((_.0 -> _.0))))
{% endhighlight %}

OK, but what is `_.0`? That's an unbound logic variable in miniKanren.
Depending on how functions were used these could be bound to auto-generated
type variables, e.g. for top-level definitions. The type of
`(define (identity x) x)` would be something like `(#g123 -> #g123)` where
`#g123` is a type variable.

## So what was the problem?

Was this not the perfect setup for writing the Oden compiler? For me, no.
There were some things annoying me, some more than others, that made me rewrite
the compiler in Haskell.

### Evolution and Uncertainty

As the compiler grew, involving quite tricky transformations such as
monomorphization both at the top-level and in let-bound definitions, I started
to get a bit anxious that I wasn't covering all cases for the AST. The error
messages in miniKanren, or lack thereof, drove me away from implementing other
parts of the compiler in miniKanren. It just took too much time and energy to
find out what was going on when stuff started to break.

The lack of static typing in Racket also made me uncertain in my refactorings
and changes. Yes, there's Typed Racket and I tried it to begin with, but I got
stuck almost immediately with getting stuff to type check and found very little
help online. I admit to being extremely fond of static typing, but hey, I am
writing a statically typed language after all...

### Oh Monad, Where Art Thou?

When I wanted to add error messages for the Oden inference, I got stuck.
Thinking about it for quite some time, I realized that I had the logic monad
(miniKanren in this case) and needed to combine it with an error handling
monad. Oden was was craving for [*monad
transformers*](https://wiki.haskell.org/Monad_Transformers_Explained). There
may very well be nice ways to do these things with miniKanren and Racket but I
did not find any satisfying solution. The [webyrd/error-handling-relational-interpreter](
https://github.com/webyrd/error-handling-relational-interpreter/blob/master/error-interp-specific-all.scm)
was really the only thing I found and it was not the direction I wanted to go
in.

### miniKanren Implementations

I'm not sure why, but the state of miniKanren seems to be kind of in flux.
There are different implementations with more or less the same name, with
different sets of functions and often no documentation at all. It almost seems
as if everyone has their own custom version lying around on their drive,
copy-pasted into the project when needed. I'm not sure what's going on but
it's confusing to me.

### Racket REPL and Emacs

Another issue I had with the setup was working with the Racket REPL and Geiser
in Emacs. While evaluating expressions, running tests suites and so on, I
experienced the execution time gradually increasing for each run. Eventually I
had to restart the Racket process completely. I have no idea what caused this
behaviour or if anyone else has these problems.

### Racket Overhead

The compiled Racket executable worked beautifully on OS X, Linux and Windows.
However, the overhead in execution time generally was ~400ms on my modern
laptops. This was not a big problem in itself, but nonetheless it influenced my
decision to move to Haskell.

## Going Haskell

With these Racket, miniKanren and dynamic typing itches, I decided to go for a
Haskell implementation. The process was basically the same as when writing the
first version - start with the inferencer, do the least amount of
transformation possible and write a simple Go backend.

### WYAH

To begin with, I want to give a big shout-out to the great work done by Stephen
Diehl. The inferencer in Oden is still merely an adaptation and extension of
the code from [Chapter 7: Hindley-Milner
Inference](http://dev.stephendiehl.com/fun/006_hindley_milner.html) in his
book [Write You a Haskell](http://dev.stephendiehl.com/fun/index.html).

### Leaning on the Compiler

This time around I had the benefit of learning a thing or two from my previous
mistakes. One thing I wanted to do differently was to have separate, clearly
defined ASTs for each transformation step. This may seem obvious but Haskell
lends itself so well for that kind of modelling. The following is the type
signature for *monomorph*, a function that takes polymorphically typed
expressions and returns monomorphically typed expressions.

{% highlight haskell %}
monomorph :: Core.Expr Poly.Type -> Monomorph (Core.Expr Mono.Type)
{% endhighlight %}

I think that type signature clearly states what the function does. The *Expr*
type is the core AST in Oden and looks something like this (at the time of
writing):

{% highlight haskell %}
data Expr t = Symbol Identifier t
            | Application (Expr t) (Expr t) t
            | NoArgApplication (Expr t) t
            | GoFuncApplication (Expr t) [Expr t] t
            | Fn Name (Expr t) t
            | NoArgFn (Expr t) t
            | Let Name (Expr t) (Expr t) t
            | Literal Literal t
            | Slice [Expr t] t
            | If (Expr t) (Expr t) (Expr t) t
            deriving (Eq, Ord)
{% endhighlight %}

Having these canonical representations, cleary defining what can be
represented, together with GHC warnings and
[*hlint*](https://hackage.haskell.org/package/hlint) makes me feel very
confident when making big changes.

### Reduced Overhead

The runtime overhead of the compiled Haskell binary is ~7ms on my systems. This
may not seem like a big deal but being able to build scripts and tools directly
on top of the Oden compiler, not having to write complex daemons with network
protocols between, really excites me.

## Summary

Looking back on the original implementation, as previosly mentioned, I do not
regret choosing Racket and miniKanren. Both for me personally, and for the
project, it was a very good choice. I wrote more tests in the Racket
implementation, perhaps because I needed more tests to be confident but maybe
also because it was so easy to write quoted Oden syntax directly in Racket.
This is something I miss when writing tests in Haskell. Anyway, I recommend
learning both Racket and miniKanren.

Moving to Haskell was very rewarding. It took 3-4 weeks to rewrite the compiler
and getting the regression test suite to pass. It was a lot of fun and I really
enjoy working in the new codebase! The Haskell version is running in the
[Playground](http://playground.oden-lang.org) and [it's available on
GitHub](https://github.com/oden-lang/oden/releases/0.2.0).

