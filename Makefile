build:
	jekyll build

deploy: build
	aws s3 sync _site/ s3://oden-lang.org --acl=public-read
