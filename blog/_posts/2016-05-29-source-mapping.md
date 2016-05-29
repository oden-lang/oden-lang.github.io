---
layout: post
title:  "Source Mapping"
date:   2016-05-29 08:00:00 +0100
author:
  name: Oskar Wickström
  url: https://wickstrom.tech
categories: compiler
comments: true
---

The Go compiler supports mapping between original source information and
generated Go code with the [line compiler directive](
https://golang.org/cmd/compile/#hdr-Compiler_Directives). Using this technique
Oden source information is now available in stack traces and when debugging
compiled programs. This feature just landed on the master branch and will be
available in the 0.3.3 release.

Given an Oden program like the following:

{% highlight go %}
package dbg/main

shout : string -> ()
shout(s) = println(s ++ "!")

main : -> ()
main() = 
  let msg = "Debug me"
  in shout(msg)
{% endhighlight %}

When compiled the Go output looks like this:

{% highlight go %}
package main

import fmt "fmt"

//line <predefined>:0
func print(x interface{}) {
	fmt.Print(x)
}

//line <predefined>:0
func println(x interface{}) {
	fmt.Println(x)
}

//line src/dbg.oden:7
func main() {
	//line src/dbg.oden:8
	func() struct{} {
		//line src/dbg.oden:8
		var msg string = "Debug me"
		//line src/dbg.oden:9
		return shout(msg)
	}()
}

//line src/dbg.oden:4
func shout(s string) struct{} {
	//line src/dbg.oden:4
	return func(_g0 string) struct{} {
		//line src/dbg.oden:4
		return func() struct{} {
			//line src/dbg.oden:4
			println(_g0)
			//line src/dbg.oden:4
			return struct{}{}
		}()
	}((s + "!"))
}
{% endhighlight %}

And a short transcript from a `gdb` session:

{% highlight none %}
(gdb) list
1       package dbg/main
2
3       shout : string -> ()
4       shout(s) = println(s ++ "!")
5
6       main : -> ()
7       main() =
8         let msg = "Debug me"
9         in shout(msg)
(gdb) break 4
Breakpoint 1 at 0x2110: /Users/owi/Projects/oden-path/src/dbg.oden:4. (3 locations)
(gdb) run
Starting program: /Users/owi/Projects/oden-path/main
[New Thread 0x1713 of process 48301]
[New Thread 0x1803 of process 48301]
[New Thread 0x1903 of process 48301]

Thread 1 hit Breakpoint 1, main.shout (s=..., ~r1=...) at src/dbg.oden:4
4       shout(s) = println(s ++ "!")
(gdb) info args
s = 0x107490 "Debug me"
~r1 = {<No data fields>}
(gdb) clear
Deleted breakpoint 1
(gdb) continue
Continuing.
Debug me!
[Inferior 1 (process 48301) exited normally]
{% endhighlight %}

As a side note, when looking at the Go output you might notice there's a lot of
useless function wrapping. This is planned to be stripped away in the codegen
phase of the compiler. As stated in the goals of the project, *"emphasis lies
on a simple implementation with correct semantics, not compilation or runtime
speed"*.
