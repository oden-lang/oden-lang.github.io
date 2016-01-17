---
layout: page
title: Compiling
---

In Oden the compiler is called `odenc`. It compiles Oden source
files to single file packages in Go. The following is a simple
example of how compiling with `odenc` works.


{% highlight bash %}
$ mkdir -p src/hello-world/
$ cat << EOF >> src/hello-world/main.oden
(pkg hello-world/main)
(import fmt)

(def (main)
  (fmt.Println "Hello, world!"))
EOF
$ odenc --out-path=./out
$ GOPATH=$PWD/out go build -o hello-world hello-world/main
$ ./hello_world
Hello, world!
{% endhighlight %}
