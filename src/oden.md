# Oden

Oden is a LISP-inspired language with static typing that compiles
to native code using Go. The current implementation is working draft
and **should be considered highly experimental**.

[The source is available on GitHub.](https://github.com/oden-lang/oden)

```scheme
(pkg fibonacci)

(define (fib n)
  (if (== n 1)
    0
    (if (== n 2)
      1
      (+ (fib (- n 1)) (fib (- n 2))))))
```
