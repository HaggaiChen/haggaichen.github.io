#!/bin/bash

set -e
set -u

bundle exec jekyll serve --host 0.0.0.0 --port 4000
