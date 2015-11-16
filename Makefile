GITBOOK=node_modules/.bin/gitbook

.PHONY: all
all: docs

$(GITBOOK):
	npm install gitbook-cli

.PHONY: deps
deps: $(GITBOOK)
	$(GITBOOK) install src

.PHONY: docs
docs: src/*.md src/styles/*.css src/logo.png $(GITBOOK)
	$(GITBOOK) build src target
	cp -R target/* ./

.PHONY: watch-docs
watch-docs: $(GITBOOK)
	$(GITBOOK) serve src target
