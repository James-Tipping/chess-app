/* eslint-disable no-restricted-globals */
import { Chess } from 'chess.js';
import { evaluateBoard } from './Utils';
import { WorkerMessage, WorkerResponse } from '../types/WorkerTypes';

let positionsEvaluated = 0;

function minimax(
  game: Chess,
  depth: number,
  isMaximizingPlayer: boolean,
  alpha: number,
  beta: number,
): [number, string] {
  positionsEvaluated++;

  if (depth === 0 || game.isGameOver()) {
    if (game.isCheckmate()) {
      return [isMaximizingPlayer ? -100000 : 100000, ''];
    }
    if (game.isDraw()) {
      return [0, ''];
    }
    return [evaluateBoard(game), ''];
  }

  let bestMove = '';
  if (isMaximizingPlayer) {
    let bestScore = -Infinity;
    const moves = game.moves();

    for (const move of moves) {
      game.move(move);
      const [score] = minimax(game, depth - 1, false, alpha, beta);
      game.undo();

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
      /* eslint-disable-next-line no-param-reassign */
      alpha = Math.max(alpha, bestScore);
      if (beta <= alpha) {
        break;
      }
    }
    return [bestScore, bestMove];
  }
  let bestScore = Infinity;
  const moves = game.moves();

  for (const move of moves) {
    game.move(move);
    const [score] = minimax(game, depth - 1, true, alpha, beta);
    game.undo();

    if (score < bestScore) {
      bestScore = score;
      bestMove = move;
    }
    /* eslint-disable-next-line no-param-reassign */
    beta = Math.min(beta, bestScore);
    if (beta <= alpha) {
      break;
    }
  }
  return [bestScore, bestMove];
}

function getBestMove(
  fen: string | undefined,
  depth: number = 3,
): [string | null, number] {
  positionsEvaluated = 0;
  const game = new Chess(fen);
  const isMaximizingPlayer = game.turn() === 'b';
  const [, bestMove] = minimax(
    game,
    depth,
    isMaximizingPlayer,
    -Infinity,
    Infinity,
  );
  return [bestMove, positionsEvaluated];
}

// Only set up the message handler if running in a worker context
if (typeof self !== 'undefined' && typeof self.postMessage === 'function') {
  self.onmessage = (e: MessageEvent<WorkerMessage>) => {
    const { fen, depth } = e.data;
    const [bestMove, positions] = getBestMove(fen, depth);
    self.postMessage({
      bestMove,
      positionsEvaluated: positions,
    } as WorkerResponse);
  };
}
