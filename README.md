## Chess App (work in progress)

A chess app using a minimax algorithm (not yet completed). The only dependencies are Lit (a lightweight framework for making web components), and chess.js for chess move validation.

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

## Quickstart

To get started:

```sh
npm init @open-wc
# requires node 10 & npm 6 or higher
```

## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `test` runs your test suite with Web Test Runner
- `lint` runs the linter for your project

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.