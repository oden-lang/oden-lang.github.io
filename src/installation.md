# Installation

To run Oden you need Go installed and setup. Follow the instructions in
[How to Write Go Code](https://golang.org/doc/code.html).

## Binaries

Oden binaries are available at [Releases](https://github.com/oden-lang/oden/releases) on
GitHub. Choose the version, preferrably the latest, and download the ZIP file for your
operating system.

*There may be biniaries missing for some major operating systems.*

## Building From Source

### Getting the Code

Go to https://github.com/oden-lang/oden and `git clone` or download a ZIP file
with the source. ZIP files with source code are available in the
[Releases](https://github.com/oden-lang/oden/releases) as well.

### Build

When you have the source you can create a distribution of Oden by following the
instructions in the `BUILD.md` file in the root of the source code tree.

### Docs

This documentation can be built if you have NodeJS and Make.

```bash
$ git clone git@github.com:oden-lang/oden-lang.github.io.git
$ cd oden-lang.github.io
$ make deps
$ make docs
$ open index.html
```

## Playground

If you just want to try writing some Oden, check out [the Oden Playground](
http://playground.oden-lang.org/).
