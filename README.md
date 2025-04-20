# \<chess-app>

This web component provides a playable chess game, including AI capabilities. It follows the [open-wc](https://github.com/open-wc/open-wc) recommendations.

The only dependencies are Lit (a lightweight framework for creating web components), and chess.js, which is used for move validation.

A minimax algorithm is used to find the best move for the AI. An AI vs AI mode is provided to demonstrate the AI capabilities.

## Installation

```bash
npm i chess-component
```

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm run start
```

To run a local development server that serves the basic demo located in `demo/index.html`
