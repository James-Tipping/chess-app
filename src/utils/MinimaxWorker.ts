/* eslint-disable no-restricted-globals */
// Copyright (C) <2025>  <James Tipping> <github.com/James-Tipping>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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

function getBestMove(pgn: string, depth: number = 3): [string | null, number] {
  positionsEvaluated = 0;
  const game = new Chess();
  game.loadPgn(pgn);
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
    const { pgn, depth } = e.data;
    const [bestMove, positions] = getBestMove(pgn, depth);
    self.postMessage({
      bestMove,
      positionsEvaluated: positions,
    } as WorkerResponse);
  };
}
